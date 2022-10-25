<script lang="ts">
  import { onMount } from 'svelte';
  import { activeCell, handleFocusIn } from "./stores";
  import type DocumentationCell from "./cells/DocumentationCell";
  import DocumentationField from "./DocumentationField.svelte";

  export let index: number;
  export let documentationCell: DocumentationCell;

  let hideToolbar = true;

  onMount(() => {
    if (documentationCell.documentationField.json || documentationCell.documentationField.json === "") { 
      (documentationCell.documentationField.richTextInstance as any).setContents(documentationCell.documentationField.json);
    }

    if ($activeCell === index) {
      focus();
    }
  });

  function focus() {
    if (documentationCell.documentationField.richTextInstance) {
      documentationCell.documentationField.richTextInstance.focus();
    }
  }

  function blur() {
    if (documentationCell.documentationField.richTextInstance) {
      documentationCell.documentationField.richTextInstance.blur();
    }
  }

  $: hideToolbar = !($activeCell === index);

  $: if ($activeCell === index) {
      focus();
    } else {
      blur();
    }

</script>


<div on:focusin={() => handleFocusIn(index)} >
  <DocumentationField
    hideToolbar={hideToolbar}
    bind:quill={documentationCell.documentationField.richTextInstance}
    on:update={(e) => documentationCell.documentationField.json = e.detail.json}
  />
</div>