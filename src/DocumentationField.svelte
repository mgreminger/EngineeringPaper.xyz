<script>
  import Quill from "quill";
  import { onMount, createEventDispatcher } from "svelte";

  export let hideToolbar = true;
  export let quill;

  export function setContents(newContents) {
    quill.setContents(newContents);
  }

  let editorDiv;


  const dispatch = createEventDispatcher();

  onMount(() => {
    quill = new Quill(editorDiv, {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{list: 'ordered'}, {list: 'bullet'}],
          ['link', 'image'],
          ['clean']
        ]
      },
      theme: 'snow'  // or 'bubble'
    });

    quill.on('text-change', (delta, oldDelta, source) => {
      dispatch('update', {
          json: quill.getContents()
      });
    });
  });

</script>

<style>
  /* Hack to make quill not overflow bottom of flexbox */
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

  @media screen {
    .hideToolbar :global(.ql-toolbar.ql-snow + .ql-container) {
      border-top-width: 1px;
      border-top-style: solid;
      border-top-color: rgb(204, 204, 204);
    }
  }

  :global(.ql-container:focus-within) {
    box-shadow: #8bd 0 0 1px 2px, inset #6ae 0 0 2px 0;
    border-color: #709AC0;
  }

  :global(div.ql-editor) {
    padding: 2px;
  }

  @media print {
    :global(.ql-toolbar) {
      display: none;
    }

    :global(.ql-container.ql-snow) {
      border: none;
    }    
  }

</style>


<div id="wrap" class:hideToolbar>
  <div id="editor" bind:this={editorDiv} />
</div>