<script>
  import { onMount } from 'svelte';
  import { cells, activeCell, handleFocusIn } from "./stores.ts";
  import DocumentationField from "./DocumentationField.svelte";

  export let index;

  let hideToolbar = true;
  let quill = null;

  $: hideToolbar = !($activeCell === index);
  $: $cells[index].extra.richTextInstance = quill;

  onMount(() => {
    if ($cells[index].data.json || $cells[index].data.json === "") { 
      quill.setContents($cells[index].data.json);
    }
  });
</script>


<div on:focusin={() => handleFocusIn(index)} >
  <DocumentationField
    hideToolbar={hideToolbar}
    bind:quill
    on:update={(e) => $cells[index].data.json = e.detail.json}
  />
</div>