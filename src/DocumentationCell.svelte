<script lang="ts">
  import { onMount } from 'svelte';
  import { cells, activeCell, handleFocusIn } from "./stores";
  import type { DocumentationCell } from "./Cells";
  import DocumentationField from "./DocumentationField.svelte";

  export let index;
  export let documentationCell: DocumentationCell;

  let hideToolbar = true;

  $: hideToolbar = !($activeCell === index);

  onMount(() => {
    if (documentationCell.documentationField.json || documentationCell.documentationField.json === "") { 
      (documentationCell.documentationField.richTextInstance as any).setContents(documentationCell.documentationField.json);
    }
  });
</script>


<div on:focusin={() => handleFocusIn(index)} >
  <DocumentationField
    hideToolbar={hideToolbar}
    bind:quill={documentationCell.documentationField.richTextInstance}
    on:update={(e) => documentationCell.documentationField.json = e.detail.json}
  />
</div>