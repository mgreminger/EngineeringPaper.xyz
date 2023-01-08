import { getHash, API_GET_PATH, API_SAVE_PATH } from "./utility";

const spaUrl = "https://engineeringpaper.xyz";
const maxSize = 2000000; // max length of byte string that represents sheet

export const API_MANUAL_SAVE_PATH = "/documents/manual-save/";

type Flag = "0" | "1" | 0 | 1 | undefined;

interface Env {
  ASSETS: Fetcher;
  SHEETS: KVNamespace;
  TABLES: D1Database;
  ENABLE_MANUAL_SAVE: Flag;
  MANUAL_SAVE_KEY: string | undefined;
  ENABLE_D1: Flag;
}

interface SheetPostBody {
  title: string;
  document: string;
  history: History;
}

interface DatabaseEntry {
  title: string;
  data: string;
  dataHash: string;
  creation: string;
  creationIp: string;
  history: History;
}

interface HistoryItem {
  url: string;
  hash: string;
  creation: string;
}

type History = HistoryItem[];

function checkFlag(flag: Flag): boolean {
  return flag !== undefined && (flag === 1 || flag === "1");
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path.startsWith(API_SAVE_PATH)) {
      // Store sheet
      return await postSheet({
        requestHash: path.replace(API_SAVE_PATH, ''),
        requestBody: await request.json(),
        requestIp: request.headers.get("CF-Connecting-IP") || "",
        kv: env.SHEETS,
        d1: env.TABLES,
        useD1: checkFlag(env.ENABLE_D1)
      });
    } else if (path.startsWith(API_GET_PATH)) {
      // Get method, return sheet
      return await getSheet({ 
        requestHash: path.replace(API_GET_PATH, ''),
        kv: env.SHEETS,
        d1: env.TABLES,
        useD1: checkFlag(env.ENABLE_D1)
       });
    } else if (checkFlag(env.ENABLE_MANUAL_SAVE) 
               && path.startsWith(API_MANUAL_SAVE_PATH) 
               && env.MANUAL_SAVE_KEY !== undefined) {
      return await manualSaveSheet({
        requestBody: await request.json(),
        apiKey: env.MANUAL_SAVE_KEY,
        kv: env.SHEETS, d1: env.TABLES,
        useD1: checkFlag(env.ENABLE_D1)
      });
    } else if (!path.includes('.') && !path.slice(1).includes('/') && path !== "/" && path.length === 23) {
      const mainPage = await fetch(`${url.origin}/index.html`)
      return new HTMLRewriter()
        .on('meta[name="googlebot"', new IndexIfEmbedded())
        .transform(mainPage);
    } else {
      return await env.ASSETS.fetch(request);
    }
  }
};


class IndexIfEmbedded {
  element(element: Element) {
    element.setAttribute("content", "noindex,indexifembedded");
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

function getNewId(): string {
  return crypto.randomUUID().replaceAll('-', '').slice(0, 22);
}

async function postSheet({ requestHash, requestBody, requestIp, kv, d1, useD1 }:
  {
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
      { status: 404 });
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
  if (dbEntry.history[0] && await checkIfAlreadyExists(dbEntry.history[0].hash, data, kv)) {
    // document already exists and hasn't been changed, no need to resave
    // use existing id
    createNewDocument = false;
    id = dbEntry.history[0].hash;
  }

  if (createNewDocument) {
    // update document history to include latest version
    dbEntry.history.unshift({
      url: `${spaUrl}/#${id}`,
      hash: id,
      creation: dbEntry.creation
    });

    await kv.put(id, JSON.stringify(dbEntry));

    if (useD1) {
      await addSheetToD1Table(id, dbEntry, d1);
    }
  }

  return new Response(JSON.stringify({
    url: `${spaUrl}/#${id}`,
    hash: id,
    history: JSON.stringify(dbEntry.history) // TODO: Don't stringify this, will need to update App.svelte as well
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
      history: JSON.stringify(document.history)
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
      const { success } = await d1.prepare(`
          INSERT OR REPLACE INTO Sheets(id, title, dataHash, creation, creationIp)
          VALUES(?1, ?2, ?3, ?4, ?5);
          
          INSERT OR REPLACE INTO NumReads(id, access, numReads) VALUES(?1, ?6, ?7);
          `)
          .bind(requestBody.id, requestBody.title, requestBody.dataHash, requestBody.creation,
                  requestBody.creationIp, requestBody.access, requestBody.numReads)
          .run();
      if (!success) {
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
