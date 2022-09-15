// svelte.config.js
import { optimizeImports } from "carbon-preprocess-svelte";
import preprocess from "svelte-preprocess";

export default {
  preprocess: [preprocess(), optimizeImports()],
};