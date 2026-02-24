<script module lang="ts">
  import Quill from "quill";
  import Embed from "quill/blots/embed";
  import ImageResize from "@mgreminger/quill-image-resize-module";
  import { MathfieldElement } from "mathlive";

  class Formula extends Embed {
    static blotName = 'formula';
    static className = 'ql-formula';
    static tagName = 'SPAN';

    static create(value: string) {

      const node = super.create(value) as Element;
      if (typeof value === 'string') {
        const mathField = new MathfieldElement({minFontScale: 0.75});
        mathField.value = value;
        mathField.readOnly = true;
        mathField.className = "doc-field-math";
        mathField.tabIndex = -1;
        node.setAttribute('data-value', value);
        node.appendChild(mathField);
      }
      return node;
    }

    static value(domNode: Element) {
      return domNode.getAttribute('data-value');
    }

    html() {
      const { formula } = this.value();
      return `<span>${formula}</span>`;
    }
  }

  Quill.register({
    'formats/formula': Formula,
    'modules/imageResize': ImageResize
  }, true);

</script>

<script lang="ts">
  import type { Delta, Range } from "quill";
  import { onMount } from "svelte";
  import appState from "./stores.svelte";

  interface Props {
    hideToolbar: boolean;
    quill: Quill;
    shiftEnter: () => void;
    modifierEnter: () => void;
    update: (arg: {detail: {delta: Delta}}) => void;
  }

  let {
    hideToolbar = true,
    quill = $bindable(),
    shiftEnter,
    modifierEnter,
    update
  }: Props = $props();
  
  let editorDiv;

  export function setContents(newContents) {
    quill.setContents(newContents);
  }

  onMount(() => {
    const bindings = {
      tab: {
        key: 'Tab', // dissable tab key so that tab can be used for focus
        handler: function() {
          return true;
        }
      },
      custom1: {
        key: 'Enter', // for shift-enter, don't do anthing here and re-dispatch event to window (otherwise quill eats the event)
        shiftKey: true,
        handler: function() {
          shiftEnter();
          return false;
        }
      },
      custom2: {
        key: 'Enter', // for meta-enter, don't do anthing here and re-dispatch event to window (otherwise quill eats the event)
        [appState.modifierKey]: true,
        handler: function() {
          modifierEnter();
          return false;
        }
      },
      custom3: {
        key: 'e',
        [appState.modifierKey]: true,
        handler: function(range: Range) {
          const formulaButton = document.querySelector('div.quill-wrapper:focus-within button.ql-formula');
          if (formulaButton instanceof HTMLButtonElement) {
            formulaButton.click();
          }
          return false;
        }
      },
    };

    quill = new Quill(editorDiv, {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{ 'color': [] }, { 'background': [] }],
          [{list: 'ordered'}, {list: 'bullet'}],
          ['link', 'image', 'formula'],
          ['clean']
        ], 
        keyboard: {
          bindings: bindings
        },
        imageResize: {
          altTextContainerStyles: {
            zIndex: "10",
          }
        },
      },
      theme: 'snow'  // or 'bubble'
    });

    quill.on('text-change', (delta, oldDelta, source) => {
      update({detail: {delta: quill.getContents()}});
    });
  });

</script>

<style>
  /* Hack to make quill not overflow bottom of flexbox */
  /* From: https://codepen.io/justinpincar/pen/gWdeRJ */
  div.quill-wrapper {
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

    div.quill-wrapper {
      display: block;
      height: fit-content;
    }
  }

  :global(div.quill-wrapper div.ql-toolbar) {
    transition: 0.3s;
    transition-delay: .1s;
    max-height: 99px;
    overflow: visible;
    opacity: 1;
  }

  :global(math-field.doc-field-math) {
    border: none;
    padding: 0px;
  }

  :global(math-field.doc-field-math::part(content)) {
    padding: 1px;
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

  :global(div.quill-wrapper .ql-container:focus-within) {
    outline: 5px auto Highlight;
  }

  :global(div.quill-wrapper .ql-snow .ql-tooltip) {
    /* make sure url tooltip is above other elements (specifically, the button bar) */
    z-index: 100;
  }

  :global(div.quill-wrapper .ql-snow .ql-editor) {
    padding: 2px;
    font-size: 16px;
    overflow-y: visible;
    height: fit-content;
  }

  :global(div.quill-wrapper .ql-snow .ql-editor h1) {
    font-size: 1.625em;
  }

  :global(div.quill-wrapper .ql-snow .ql-editor h2) {
    font-size: 1.4375em;
  }

  :global(div.quill-wrapper .ql-snow .ql-editor h3) {
    font-size: 1.25em;
  }

  :global(div.quill-wrapper .ql-snow .ql-editor p) {
    font-size: 1em;
  }

  @media print {
    :global(div.quill-wrapper .ql-toolbar) {
      display: none;
    }

    :global(div.quill-wrapper .ql-container.ql-snow) {
      border: none;
    }    
  }

</style>


<div
  class="quill-wrapper" 
  class:hideToolbar 
>
  <div class="editor" bind:this={editorDiv}></div>
</div>