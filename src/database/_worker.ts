import { getHash, API_GET_PATH, API_SAVE_PATH } from "./utility";

const spaUrl = "https://engineeringpaper.xyz";
const maxSize = 2000000; // max length of byte string that represents sheet

interface Env {
  ASSETS: Fetcher;
  SHEETS: KVNamespace;
  TABLES: D1Database;
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
        d1: env.TABLES
      });
    } else if (path.startsWith(API_GET_PATH)) {
      // Get method, return sheet
      return await getSheet({ requestHash: path.replace(API_GET_PATH, ''), kv: env.SHEETS });
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
  const existingEntry = (await kv.get(previousSaveId, {type: "json"}) as DatabaseEntry | null);

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
  // if there is an id collision (or other error adding the row to the table), 
  // this function needs to throw an exception
}

function getNewId(): string {
  return crypto.randomUUID().replaceAll('-', '').slice(0, 22);
}

async function postSheet({ requestHash, requestBody, requestIp, kv, d1 }:
  {
    requestHash: string,
    requestBody: SheetPostBody,
    requestIp: string,
    kv: KVNamespace,
    d1: D1Database
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

    // TODO: must check if kv put fails
    // if so, must remove entry that was added to table above
    // and return an error to user
    await kv.put(id, JSON.stringify(dbEntry));

    await addSheetToD1Table(id, dbEntry, d1);
  }

  return new Response(JSON.stringify({
    url: `${spaUrl}/#${id}`,
    hash: id,
    history: JSON.stringify(dbEntry.history) // TODO: Don't stringify this, will need to update App.svelte as well
  }));
}

async function getSheet({ requestHash, kv }: { requestHash: string, kv: KVNamespace }): Promise<Response> {

  // TODO: need to update sheet access count table

  const document = await kv.get(requestHash, { type: "json", cacheTtl: 31557600 }) as DatabaseEntry;

  if (!document) {
    return new Response("Document not found", { status: 404 });
  } else {
    return new Response(JSON.stringify({
      data: document.data,
      history: JSON.stringify(document.history)
    }))
  }
}
