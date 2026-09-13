<script lang="ts">
  import { onMount } from 'svelte';
  import type { Delta } from 'quill';
  import appState from "./stores.svelte";
  import type DocumentationCell from "./cells/DocumentationCell.svelte";
  import DocumentationField from "./DocumentationField.svelte";
  import { deltaToMarkdown } from "quill-delta-to-markdown";

  interface Props {
    index: number;
    documentationCell: DocumentationCell;
    triggerSaveNeeded: () => void;
  }

  let {
    index,
    documentationCell,
    triggerSaveNeeded
  }: Props = $props();

  let hideToolbar = $derived(!(appState.activeCell === index));

  export function getMarkdown(centerEquations: boolean): string {
    return deltaToMarkdown(documentationCell.documentationField.delta?.ops ?? "");
  }

  onMount(() => {
    if (documentationCell.documentationField.delta) { 
      documentationCell.documentationField.richTextInstance.setContents(documentationCell.documentationField.delta);
    }

    if (appState.activeCell === index) {
      focus();
    }
  });

  function focus() {
    if (documentationCell.documentationField.richTextInstance) {
      documentationCell.documentationField.richTextInstance.focus();
    }
  }

  $effect(() => {
    if (appState.activeCell === index) {
      focus();
    }
  });

</script>


<div
  spellcheck={appState.activeCell === index}
>
  <DocumentationField
    hideToolbar={hideToolbar}
    bind:quill={documentationCell.documentationField.richTextInstance}
    update={(e: {detail: {delta: Delta}}) => {
       documentationCell.documentationField.delta = e.detail.delta;
       triggerSaveNeeded();
    }}
  />
</div>