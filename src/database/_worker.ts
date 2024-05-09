import { getHash, API_GET_PATH, API_SAVE_PATH } from "./utility";
import type { History, SheetPostBody } from "./types";

const documentPathRegEx = /^\/[a-zA-Z0-9]{22}$/;
const checkpointPathRegEx = /^\/temp-checkpoint-[a-f0-9-]{36}$/;

const maxSize = 2000000; // max length of byte string that represents sheet

const cspHeaderValue = "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src * data: blob:;";
// local dev mode requires some extra exceptions for live reload
const devCspHeaderValue = cspHeaderValue + " script-src 'self' http://localhost:35729; connect-src 'self' ws://localhost:35729;";

export const API_MANUAL_SAVE_PATH = "/documents/manual-save";

type Flag = "0" | "1" | 0 | 1 | undefined;

interface Env {
  ASSETS: Fetcher;
  SHEETS: KVNamespace;
  DOCGEN_API: String;
  TABLES: D1Database;
  ENABLE_MANUAL_SAVE: Flag;
  MANUAL_SAVE_KEY: string | undefined;
  ENABLE_D1: Flag;
  DEV: Flag;
}

interface DatabaseEntry {
  title: string;
  data: string;
  dataHash: string;
  creation: string;
  creationIp: string;
  history: History;
}


function checkFlag(flag: Flag): boolean {
  return flag !== undefined && (flag === 1 || flag === "1");
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const path = url.pathname;
    let response: Response;

    if (path.startsWith(API_SAVE_PATH) && request.method === "POST") {
      // Store sheet
      response =  await postSheet({
        origin: url.origin,
        requestHash: path.replace(API_SAVE_PATH, ''),
        requestBody: await request.json(),
        requestIp: request.headers.get("CF-Connecting-IP") || "",
        kv: env.SHEETS,
        d1: env.TABLES,
        useD1: checkFlag(env.ENABLE_D1)
      });
    } else if (path.startsWith(API_GET_PATH) && request.method === "GET") {
      // Get method, return sheet
      response = await getSheet({ 
        requestHash: path.replace(API_GET_PATH, ''),
        kv: env.SHEETS,
        d1: env.TABLES,
        useD1: checkFlag(env.ENABLE_D1)
       });
    } else if (checkFlag(env.ENABLE_MANUAL_SAVE) 
               && path.startsWith(API_MANUAL_SAVE_PATH) 
               && env.MANUAL_SAVE_KEY !== undefined 
               && request.method === "POST") {
      response = await manualSaveSheet({
        requestBody: await request.json(),
        apiKey: env.MANUAL_SAVE_KEY,
        kv: env.SHEETS, d1: env.TABLES,
        useD1: checkFlag(env.ENABLE_D1)
      });
    } else if ((documentPathRegEx.test(path) || checkpointPathRegEx.test(path)) 
               && request.method === "GET") {
      let mainPage = await env.ASSETS.fetch(request);

      const updatedHeaders = new Headers(mainPage.headers);
      updatedHeaders.set('Content-Security-Policy', checkFlag(env.DEV) ? devCspHeaderValue : cspHeaderValue);

      mainPage = new Response(mainPage.body, {
        status: mainPage.status,
        statusText: mainPage.statusText,
        headers: updatedHeaders
      });

      response = new HTMLRewriter()
        .on('meta[name="robots"]', new IndexIfEmbedded())
        .transform(mainPage);
    
    } else if ( (path === "/iframe_test.html" || path === "/iframe_test") &&
                request.method === "GET" ) {
      // don't apply CSP headers to iframe test path (dynamic resizing won't work)
      response = await env.ASSETS.fetch(request);
    } else if (path.startsWith("/docgen/")) {
      // @ts-ignore 
      response = await globalThis.fetch(`${env.DOCGEN_API}${path}`, request);
    } else {
      response = await env.ASSETS.fetch(request);

      if (response.headers.get("Content-Type")?.includes("text/html")) {
        const updatedHeaders = new Headers(response.headers);
        updatedHeaders.set('Content-Security-Policy', checkFlag(env.DEV) ? devCspHeaderValue : cspHeaderValue);

        response = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: updatedHeaders
        });
      }
    }

    if (url.hostname !== "engineeringpaper.xyz" && !url.port && 
        response.headers.get("Content-Type")?.includes("text/html")) {
      const canonicalUrl = new URL(url);
      canonicalUrl.hostname = "engineeringpaper.xyz";
      response = new HTMLRewriter()
        .on('head', new AppendCanonical(canonicalUrl.toString()))
        .transform(response); 
    }

    return response;
  }
};


class IndexIfEmbedded {
  element(element: Element) {
    element.setAttribute("content", "noindex,indexifembedded");
  }
}

class AppendCanonical {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  element(element: Element) {
    element.append(`\t<link rel="canonical" href="${this.url}">\n`, {html: true});
  }
}


async function checkIfAlreadyExists(previousSaveId: string, newData: string, kv: KVNamespace): Promise<boolean> {
  const existingEntry = (await kv.get(previousSaveId, { type: "json" }) as DatabaseEntry | null);

  if (existingEntry) {
    if (existingEntry.data === newData) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}


async function addSheetToD1Table(id: string, dbEntry: DatabaseEntry, d1: D1Database) {
  const { success } = await d1.prepare(`
      INSERT INTO Sheets(id, title, dataHash, creation, creationIp)
      VALUES(?1, ?2, ?3, ?4, ?5);
      `).bind(id, dbEntry.title, dbEntry.dataHash, dbEntry.creation, dbEntry.creationIp)
        .run();
  if (!success) {
    throw new Error('Failed to add sheet entry to database table.');
  }
}

async function incrementNumReads(id: string, d1: D1Database) {
  const { success } = await d1.prepare(`
      INSERT INTO NumReads(id, access) VALUES(?1, ?2)
        ON CONFLICT(id) DO UPDATE SET numReads=numReads+1
  `).bind(id, (new Date()).toISOString()).run();

  if (!success) {
    throw new Error('Failed to increment read counter.');
  }
}

const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"; // alphabet from shortuuid python package
const idLength = 22;
function getNewId(): string {
  const randomArray = crypto.getRandomValues(new BigUint64Array(idLength));
  const alphabetLength = BigInt(alphabet.length);
  let id = '';
  for (const randomNum of randomArray) {
    id += alphabet[Number(randomNum % alphabetLength)];
  }
  if (id.length !== idLength) {
    throw new Error('Random id generation error');
  }
  return id;
}

async function postSheet({ origin, requestHash, requestBody, requestIp, kv, d1, useD1 }:
  {
    origin: string,
    requestHash: string,
    requestBody: SheetPostBody,
    requestIp: string,
    kv: KVNamespace,
    d1: D1Database,
    useD1: boolean
  }): Promise<Response> {

  const data = requestBody.document;

  if (data.length > maxSize) {
    return new Response("Sheet too large for database, reduce size of images in documentation cells.",
      { status: 413 });
  }

  const dataHash = await getHash(` ${data}`);

  if (dataHash !== requestHash) {
    return new Response("Document could not be saved.", { status: 404 });
  }

  const dbEntry = {
    title: requestBody.title,
    data: data,
    dataHash: dataHash,
    creation: (new Date()).toISOString(),
    creationIp: requestIp,
    history: requestBody.history,
  };

  let createNewDocument = true;
  let id = getNewId();
  if (dbEntry.history[0] && dbEntry.history[0].hash !== 'file' && await checkIfAlreadyExists(dbEntry.history[0].hash, data, kv)) {
    // document already exists and hasn't been changed, no need to resave
    // use existing id
    createNewDocument = false;
    id = dbEntry.history[0].hash;
  }

  if (createNewDocument) {
    // update document history to include latest version
    dbEntry.history.unshift({
      url: `${origin}/${id}`,
      hash: id,
      creation: dbEntry.creation
    });

    // check for existing key with same id to make sure there isn't an id collision
    const alreadyExists = await kv.get(id);
    if (alreadyExists) {
      return new Response("Sheet id collision, save unsuccessful. Try to save your document again. If issue persists, contact support at support@engineeringpaper.xyz", { status: 404 });
    }

    await kv.put(id, JSON.stringify(dbEntry));

    if (useD1) {
      await addSheetToD1Table(id, dbEntry, d1);
    }
  }

  return new Response(JSON.stringify({
    url: `${origin}/${id}`,
    hash: id,
    history: dbEntry.history
  }));
}

async function getSheet({ requestHash, kv, d1, useD1 } : 
                        { requestHash: string, kv: KVNamespace, d1: D1Database, useD1: boolean}): Promise<Response> {

  const document = await kv.get(requestHash, { type: "json", cacheTtl: 31557600 }) as DatabaseEntry;

  if (!document) {
    return new Response("Document not found", { status: 404 });
  } else {
    if (useD1) {
      await incrementNumReads(requestHash, d1);
    }
    return new Response(JSON.stringify({
      data: document.data,
      history: document.history
    }))
  }
}


interface ManualSaveBody {
  apiKey: string;
  id: string;
  title: string;
  creation: string;
  access: string;
  creationIp: string;
  dataHash: string;
  history: History;
  numReads: number;
  data: string;
}

async function manualSaveSheet({ requestBody, apiKey, kv, d1, useD1 }:
  {
    requestBody: ManualSaveBody,
    apiKey: string,
    kv: KVNamespace,
    d1: D1Database,
    useD1: boolean
  }): Promise<Response> {
  if (requestBody.apiKey === apiKey) {
    // first, add d1 database row for each table (replace if exists)
    if (useD1) {
      const rows = await d1.batch([
        d1.prepare(`
            INSERT OR REPLACE INTO Sheets(id, title, dataHash, creation, creationIp)
            VALUES(?1, ?2, ?3, ?4, ?5);
          `)
          .bind(requestBody.id, requestBody.title, requestBody.dataHash, requestBody.creation,
            requestBody.creationIp),
        d1.prepare(`
            INSERT OR REPLACE INTO NumReads(id, access, numReads) VALUES(?1, ?2, ?3);
          `)
          .bind(requestBody.id, requestBody.access, requestBody.numReads),
      ]);
      if (!rows.map((row) => row.success).every(value => value)) {
        throw new Error(`Failed to add sheet ${requestBody.id} entry to d1 database.`);
      }
    }

    // now add actual sheet to KV store
    const dbEntry = {
      title: requestBody.title,
      data: requestBody.data,
      dataHash: requestBody.dataHash,
      creation: requestBody.creation,
      creationIp: requestBody.creationIp,
      history: requestBody.history,
    };

    await kv.put(requestBody.id, JSON.stringify(dbEntry));

    return new Response("Success");
  } else {
    return new Response("Manual save failed", { status: 404 });
  }
}
