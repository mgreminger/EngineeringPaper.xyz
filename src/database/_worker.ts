import { getHash } from "./utility";

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

    if (path.startsWith('/documents/')) {
      if (request.method === "POST") {
        // Store sheet
        return await postSheet({
          requestHash: path.replace('/documents/', ''),
          requestBody: await request.json(),
          requestIp: request.headers.get("CF-Connecting-IP"),
          kv: env.SHEETS,
          d1: env.TABLES
        });
      } else if (request.method === "GET") {
        // Get method, return sheet
        return await getSheet({ requestHash: path.replace('/documents/', ''), kv: env.SHEETS });
      } else {
        return new Response("Method not allowed.", { status: 405 });
      }
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


async function addSheetToD1Table(id: string, dbEntry: DatabaseEntry,
  d1: D1Database): Promise<string | null> {
  // placeholder to add new row to D1 table
  // for now, assume doesn't exist
  // if there is an id collision (or other error adding the row to the table), 
  // this function needs to throw an exception
  return null;
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

  // define new document
  let id = getNewId(); // new sheet id, also key for kv store
  const dbEntry = {
    title: requestBody.title,
    data: data,
    dataHash: dataHash,
    creation: (new Date()).toISOString(),
    creationIp: requestIp,
    history: requestBody.history,
  };

  // see if the identical document has already been saved (provides some protection against replay attacks)
  let existingId: string;
  try {
    existingId = await addSheetToD1Table(id, dbEntry, d1);
  } catch (e) {
    // addSheetToD1Table will through if there is an id collision or if adding the table row fails
    // must abort at this point
    return new Response("Document could not be saved. Try again. If this message repeats after multiple attempts, notify the maintainers at support@engineeringpaper.xyz", { status: 404 });
  }

  let createNewDocument = true;

  if (existingId) {
    if (dbEntry.history[0]?.hash === existingId) {
      // same document already exists in db, don't save
      // return existing id to user
      id = existingId;
      createNewDocument = false;
    }
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
    kv.put(id, JSON.stringify(dbEntry));
  }

  return new Response(JSON.stringify({
    url: `${spaUrl}/#${id}`,
    hash: id,
    history: JSON.stringify(dbEntry.history) // TODO: Don't stringify this, will need to update App.svelte as well
  }));
}

async function getSheet({ requestHash, kv }: { requestHash: string, kv: KVNamespace }): Promise<Response> {

  // TODO: need to update sheet access count table

  const document = await kv.get(requestHash, { type: "json" }) as DatabaseEntry;

  if (!document) {
    return new Response("Document not found", { status: 404 });
  } else {
    return new Response(JSON.stringify({
      data: document.data,
      history: JSON.stringify(document.history)
    }))
  }
}
