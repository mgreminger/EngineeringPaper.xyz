<script lang="ts">
  import { onMount } from 'svelte';
  import Quill from "quill";
  import appState from "./stores.svelte";
  import { triggerSaveNeeded } from './stores.svelte';
  import type DocumentationCell from "./cells/DocumentationCell.svelte";
  import DocumentationField from "./DocumentationField.svelte";
  import { deltaToMarkdown } from "quill-delta-to-markdown";
  import type { CellStatements } from "./types";

  interface Props {
    index: number;
    documentationCell: DocumentationCell;
  }

  let {
    index,
    documentationCell
  }: Props = $props();

  let hideToolbar = $derived(!(appState.activeCell === index));
  let richTextInstance: Quill = $state();

  let cellStatements: CellStatements = {
    statements: [],
    endStatements: [],
    subQueries: new Map(),
    systemDefinitions: [],
    fluidFunctions: [],
    codeCellFunctions: [],
    interpolationFunctions: [],
  };
  
  export function getParsePending() {
    return false;
  }

  export function getParsingError() {
    return false;
  }

  export function getCellStatements() {
    return cellStatements;
  }

  export function getMarkdown(centerEquations: boolean): string {
    return deltaToMarkdown(documentationCell.delta?.ops ?? "");
  }

  onMount(() => {
    if (appState.activeCell === index) {
      focus();
    }
  });

  function focus() {
    if (richTextInstance) {
      richTextInstance.focus();
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
    bind:quill={richTextInstance}
    bind:delta={documentationCell.delta}
    update={triggerSaveNeeded}
  />
</div>