<script lang="ts">
  import Quill from "quill";
  import { onMount, createEventDispatcher } from "svelte";
  import { modifierKey } from "./stores";

  export let hideToolbar = true;
  export let quill;

  export function setContents(newContents) {
    quill.setContents(newContents);
  }

  let editorDiv;

  const dispatch = createEventDispatcher<{
    update: {json: any};
    shiftEnter: null;
    modifierEnter: null;
  }>();

  onMount(() => {
    const bindings = {
      tab: {
        key: 9, // dissable tab key so that tab can be used for focus
        handler: function() {
          return true;
        }
      },
      custom1: {
        key: 13, // for shift-enter, don't do anthing here and re-dispatch event to window (otherwise quill eats the event)
        shiftKey: true,
        handler: function() {
          dispatch('shiftEnter');
          return false;
        }
      },
      custom2: {
        key: 13, // for meta-enter, don't do anthing here and re-dispatch event to window (otherwise quill eats the event)
        [$modifierKey]: true,
        handler: function() {
          dispatch('modifierEnter')
          return false;
        }
      },
    };

    quill = new Quill(editorDiv, {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{list: 'ordered'}, {list: 'bullet'}],
          ['link', 'image'],
          ['clean']
        ], 
        keyboard: {
          bindings: bindings
        },
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
  div.wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  div.editor {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    height: fit-content;
  }

  @media print {
    div.editor {
      display: block;
    }

    div.wrap {
      display: block;
      height: fit-content;
    }
  }

  :global(div.wrap div.ql-toolbar) {
    transition: 0.3s;
    transition-delay: .1s;
    max-height: 66px;
    overflow: visible;
    opacity: 1;
  }

  div.hideToolbar :global(.ql-toolbar) {
    max-height: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
    overflow: clip;
    opacity: 0;
  }

  @media screen {
    .hideToolbar :global(.ql-toolbar.ql-snow + .ql-container) {
      border-top-width: 1px;
      border-top-style: solid;
      border-top-color: gray;
      border-radius: 2px;
    }
  }

  :global(.ql-toolbar.ql-snow + .ql-container) {
    border: 1px solid gray;
    border-radius: 0px 0px 2px 2px;
  }

  :global(.ql-toolbar.ql-snow) {
    border: 1px solid gray !important;
    border-radius: 2px 2px 0px 0px;
  }

  :global(div.wrap .ql-container:focus-within) {
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
  }

  :global(div.wrap .ql-snow .ql-tooltip) {
    /* make sure url tooltip is above other elements (specifically, the button bar) */
    z-index: 100;
  }

  :global(div.wrap .ql-snow .ql-editor) {
    padding: 2px;
    font-size: 16px;
    overflow-y: visible;
    height: fit-content;
  }

  :global(div.wrap .ql-snow .ql-editor h1) {
    font-size: 1.625em;
  }

  :global(div.wrap .ql-snow .ql-editor h2) {
    font-size: 1.4375em;
  }

  :global(div.wrap .ql-snow .ql-editor h3) {
    font-size: 1.25em;
  }

  :global(div.wrap .ql-snow .ql-editor p) {
    font-size: 1em;
  }

  @media print {
    :global(div.wrap .ql-toolbar) {
      display: none;
    }

    :global(div.wrap .ql-container.ql-snow) {
      border: none;
    }    
  }

</style>


<div
  class="wrap" 
  class:hideToolbar 
>
  <div class="editor" bind:this={editorDiv} />
</div>