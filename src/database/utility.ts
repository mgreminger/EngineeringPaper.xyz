export const API_SAVE_PATH = "/documents/save/";
export const API_GET_PATH = "/documents/get/";

const encoder = new TextEncoder();
export async function getHash(input: string) {
  const hash = await crypto.subtle.digest('SHA-512', encoder.encode(`${input}math`));
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}