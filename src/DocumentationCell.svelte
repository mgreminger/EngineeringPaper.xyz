<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { activeCell, nonMathCellChanged } from "./stores";
  import type DocumentationCell from "./cells/DocumentationCell";
  import DocumentationField from "./DocumentationField.svelte";
  import { deltaToMarkdown } from "quill-delta-to-markdown";

  export let index: number;
  export let documentationCell: DocumentationCell;

  let hideToolbar = true;

  const dispatch = createEventDispatcher<{
    insertMathCellAfter: {index: number};
    insertInsertCellAfter: {index: number};
  }>();

  export function getMarkdown(): string {
    return deltaToMarkdown((documentationCell.documentationField.json as any)?.ops ?? "") + "\n";
  }

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


  $: hideToolbar = !($activeCell === index);

  $: if ($activeCell === index) {
      focus();
    }

</script>


<div
  spellcheck={$activeCell === index}
>
  <DocumentationField
    hideToolbar={hideToolbar}
    bind:quill={documentationCell.documentationField.richTextInstance}
    on:update={(e) => {
       documentationCell.documentationField.json = e.detail.json;
       $nonMathCellChanged = true;
    }}
    on:shiftEnter={() => dispatch("insertMathCellAfter", {index: index})}
    on:modifierEnter={() => dispatch("insertInsertCellAfter", {index: index})}
  />
</div>