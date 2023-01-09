import fs from "fs";
import fetch from "node-fetch";

const sheetsFile = process.argv[2];
const targetUrl = process.argv[3];
const targetApiKey = process.env.MANUAL_SAVE_KEY;
const sourceUrl = "https://engineeringpaper.herokuapp.com";

const sheets = JSON.parse(fs.readFileSync(sheetsFile));

let count = 1;
for (const sheet of sheets) {
  const id = sheet[0];
  
  console.log(`${count++}: Sheet ${id}`);

  // get sheet from heroku
  let response = await fetch(`${sourceUrl}/documents/${id}`);
  if (!response.ok) {
    throw new Error(`Error retrieving ${id}`);
  }
  const data = (await response.json()).data;

  const dbObject = {
    apiKey: targetApiKey,
    id: id,
    title: sheet[1],
    creation: (new Date(sheet[2]+'Z')).toISOString(),
    access: (new Date(sheet[3]+'Z')).toISOString(),
    creationIp: sheet[4],
    dataHash: sheet[5],
    history: sheet[6],
    numReads: sheet[7],
    data: data,
  }

  // put sheet into cloudflare
  response = await fetch(`${targetUrl}/documents/manual-save`, {
    method: "POST",
    headers: new Headers({"Content-Type": "application/json"}),
    body: JSON.stringify(dbObject)
  });

  if (!response.ok) {
    throw new Error(`Error saving ${id}`);
  }
}