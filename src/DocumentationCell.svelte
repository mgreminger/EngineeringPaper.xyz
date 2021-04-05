<script>
  import { cells, debug, activeCell, activeCellFlowDown } from "./stores.js";
  import Quill from "quill";
  import { onMount, createEventDispatcher } from "svelte";

  export let index;

  let editorDiv;
  let quill;
  let hideToolbar = true;

  const dispatch = createEventDispatcher();

  onMount(() => {
    quill = new Quill(editorDiv, {
      theme: 'snow'
    });

    quill.on('text-change', (delta, oldDelta, source) => {
      $cells[index].data.json = quill.getContents();
    });
  });

  function handleFocusIn() {
    const previousActiveCell = $activeCell;
    $activeCell = index;

    if (($activeCell - previousActiveCell) !== 0) {
      $activeCellFlowDown = ($activeCell - previousActiveCell) > 0 ? true : false;
    }
  }

  $: $cells[index].extra.richTextInstance = quill;

  $: hideToolbar = !($activeCell === index);

</script>

<style>
  /* Hack to make mathquill not overflow bottom of flexbox */
  /* From: https://codepen.io/justinpincar/pen/gWdeRJ */
  #wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #editor {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
  }

  .hideToolbar :global(.ql-toolbar) {
    display: none;
  }
</style>

<svelte:head>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
</svelte:head>

<div id="wrap" class:hideToolbar>
  <div id="editor" bind:this={editorDiv} on:focusin={handleFocusIn}/>
  {#if $debug}
    <div>{JSON.stringify($cells[index].data.json)}</div>
  {/if}
</div>

