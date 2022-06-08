<script>
  import { cells, activeCell, handleFocusIn } from "./stores.js";
  import DocumentationField from "./DocumentationField.svelte";

  export let index;

  let hideToolbar = true;
  let quill = null;

  $: hideToolbar = !($activeCell === index);
  $: $cells[index].extra.richTextInstance = quill;

</script>


<div on:focusin={() => handleFocusIn(index)} >
  <DocumentationField
    hideToolbar={hideToolbar}
    bind:quill
    on:update={(e) => $cells[index].data.json = e.detail.json}
  />
</div>