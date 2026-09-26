<script module lang="ts">
  import Quill from "quill";
  import Embed from "quill/blots/embed";
  import ImageResize from "@mgreminger/quill-image-resize-module";
  import { MathfieldElement } from "mathlive";
  import { DOMPurify } from "./stores.svelte";

  const BaseImageFormat = Quill.import('formats/image') as any;

  // Modern replacement for decoding Base64 with Unicode support
  function decodeBase64ToUTF8(base64: string): string {
    const binString = atob(base64);
    const bytes = new Uint8Array(binString.length);
    for (let i = 0; i < binString.length; i++) {
      bytes[i] = binString.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  }

  // Modern replacement for encoding Base64 with Unicode support
  function encodeUTF8ToBase64(text: string): string {
    const bytes = new TextEncoder().encode(text);
    let binString = '';
    for (let i = 0; i < bytes.length; i++) {
      binString += String.fromCharCode(bytes[i]);
    }
    return btoa(binString);
  }

  class CustomImage extends BaseImageFormat {
    static sanitize(url: string) {
      if (url.startsWith('data:image/svg+xml;base64,')) {
        try {
          // 1. Extract the base64 payload
          const base64Data = url.split(',')[1];
          
          // 2. Safely decode Base64 to a UTF-8 string (Modern)
          const rawSvg = decodeBase64ToUTF8(base64Data);
          
          // 3. Run DOMPurify specifically in SVG mode
          const cleanSvg = DOMPurify.sanitize(rawSvg, {
            USE_PROFILES: { svg: true },
            ADD_TAGS: ['use'], // global hook only allows local # links for use and xlink
            ADD_ATTR: ['xlink:href']
          });
          
          // 4. Safely re-encode the clean SVG string back to Base64 (Modern)
          const cleanBase64 = encodeUTF8ToBase64(cleanSvg);
          
          return `data:image/svg+xml;base64,${cleanBase64}`;
        } catch (error) {
          console.error("SVG sanitization failed", error);
          return '//:0'; // Fallback to Quill's default broken link behavior
        }
      }
      
      // Fallback to Quill's default behavior for standard images and URLs
      return BaseImageFormat.sanitize(url);
    }
  }

  class Formula extends Embed {
    static blotName = 'formula';
    static className = 'ql-formula';
    static tagName = 'SPAN';

    static create(value: string) {
      const node = super.create(value) as HTMLElement;
      if (typeof value === 'string') {
        node.setAttribute('data-value', value);
        node.style.position = 'relative';
        node.style.display = 'inline-block';

        const mathField = new MathfieldElement({minFontScale: 0.75});
        mathField.value = value;
        mathField.readOnly = true;
        mathField.className = "doc-field-math";
        mathField.tabIndex = -1;
        mathField.menuItems = [];

        node.appendChild(mathField);
      }
      return node;
    }

    static value(domNode: Element) {
      return domNode.getAttribute('data-value');
    }

    html() {
      const node = this.domNode as HTMLElement; 
      
      const formula = node.getAttribute('data-value') || '';
      const mathField = node.querySelector('math-field');
      let contentForExternalApps = `$$${formula}$$`; 
      
      if (mathField && typeof (mathField as any).getValue === 'function') {
        const mathML = (mathField as any).getValue('math-ml');
        if (mathML) {
          contentForExternalApps = mathML;
        }
      }

      return `<span class="ql-formula" data-value="${formula}">${contentForExternalApps}</span>`;
    }

    private clickHandler = (e: MouseEvent) => {
      if (e.button === 0) {
        const event = new CustomEvent('request-formula-edit', {
          bubbles: true,
          detail: { blot: this }
        });
        this.domNode.dispatchEvent(event);
      }
    };

    attach() {
      super.attach();
      this.domNode.addEventListener('click', this.clickHandler, {capture: true});
    }

    detach() {
      this.domNode.removeEventListener('click', this.clickHandler, {capture: true});
      super.detach();
    }
  }

  Quill.register({
    'formats/formula': Formula,
    'formats/image': CustomImage, 
    'modules/imageResize': ImageResize
  }, true);

</script>

<script lang="ts">
  import type { Delta, Range } from "quill";
  import type { Blot } from "parchment";
  import { onMount } from "svelte";
  import appState from "./stores.svelte";

  interface Props {
    hideToolbar: boolean;
    quill: Quill;
    update: (arg: {detail: {delta: Delta}}) => void;
  }

  let {
    hideToolbar = true,
    quill = $bindable(),
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
        toolbar: {
          container: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'color': [] }, { 'background': [] }],
            [{list: 'ordered'}, {list: 'bullet'}, {'align': []}],
            ['link', 'image', 'formula'],
            ['clean']
          ],
          handlers: {
            image: function() {
              const quillInstance = (this as any).quill;
              let fileInput = this.container.querySelector('input.ql-custom-image[type=file]');
              
              if (fileInput == null) {
                fileInput = document.createElement('input');
                fileInput.setAttribute('type', 'file');
                fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon, image/svg+xml');
                fileInput.classList.add('ql-custom-image');
                fileInput.style.display = 'none';
                
                fileInput.addEventListener('change', () => {
                  if (fileInput.files != null && fileInput.files[0] != null) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      const base64 = e.target?.result as string;
                      if (base64) {
                        const range = quillInstance.getSelection(true);
                        // If no range is selected, default to the end of the document
                        const index = range ? range.index : quillInstance.getLength();
                        quillInstance.insertEmbed(index, 'image', base64, 'user');
                        quillInstance.setSelection(index + 1, 'user');
                      }
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                  }
                  // Reset so the same file can be selected again
                  fileInput.value = ""; 
                });
                this.container.appendChild(fileInput);
              }
              fileInput.click();
            },
            formula: function() {
              const quillInstance = (this as any).quill;
              const tooltip = quillInstance.theme.tooltip;
              // Pass true to force focus and ensure we have an active range
              const range = quillInstance.getSelection(true); 
              let currentValue = '';
              
              if (range) {
                // Ask the Delta model directly what is located at this exact index
                const delta = quillInstance.getContents(range.index, 1);
                const op = delta.ops[0];
                
                // Check if the data at this index is our formula embed
                if (op && op.insert && typeof op.insert === 'object' && op.insert.formula) {
                   currentValue = op.insert.formula; // Safely extract the LaTeX
                }
              }
              
              tooltip.edit('formula');
              tooltip.textbox.value = currentValue;
            }
          }
        }, 
        keyboard: {
          bindings: bindings
        },
        imageResize: {
          altTextContainerStyles: {
            zIndex: "10",
          }
        },
      },
      theme: 'snow'
    });

    quill.on('text-change', (delta, oldDelta, source) => {
      update({detail: {delta: quill.getContents()}});
    });

    quill.on('selection-change', (range) => {
      // Defer the DOM mutation so it doesn't interrupt the browser's active backward selection loop
      requestAnimationFrame(() => {
        const allFormulas = editorDiv.querySelectorAll('.ql-formula');

        allFormulas.forEach(node => {
          const blot = Quill.find(node) as Blot;
          let shouldHighlight = false;

          // Check if this specific formula falls within the active selection
          if (blot && range && range.length > 0) {
            const index = quill.getIndex(blot);
            if (index !== null && index >= range.index && index < range.index + range.length) {
              shouldHighlight = true;
            }
          }

          // Only mutate the DOM if the state actually needs to change
          if (shouldHighlight) {
            if (!node.classList.contains('is-selected')) {
              node.classList.add('is-selected');
            }
          } else {
            if (node.classList.contains('is-selected')) {
              node.classList.remove('is-selected');
            }
          }
        });
      });
    });

    // Tooltip save override to replace instead of duplicate
    const tooltip = (quill as any).theme.tooltip;
    const originalSave = tooltip.save.bind(tooltip);
    
    tooltip.save = function() {
      if (this.root.getAttribute('data-mode') === 'formula') {
        const value = this.textbox.value;
        const range = this.quill.getSelection(true);
        
        if (range) {
          // Again, check the Delta data model
          const delta = this.quill.getContents(range.index, 1);
          const op = delta.ops[0];
          
          // If the selection is exactly 1 unit long and it IS a formula, replace it
          if (range.length === 1 && op && op.insert && typeof op.insert === 'object' && op.insert.formula) {
            this.quill.deleteText(range.index, 1, 'user');
            this.quill.insertEmbed(range.index, 'formula', value, 'user');
            this.quill.setSelection(range.index + 1, 0, 'user');
            this.hide();
            return; // Bypass original save
          }
        }
      }
      originalSave(); // Run default save if we are inserting a brand-new formula
    };

    // --- Custom Event Listener (unchanged from the refactor) ---
    editorDiv.addEventListener('request-formula-edit', (ev: Event) => {
      const customEv = ev as CustomEvent;
      const blot = customEv.detail.blot;
      
      const index = quill.getIndex(blot);
      
      if (index !== null && index !== undefined) {
        quill.setSelection(index, 1);
        
        const toolbar = quill.getModule('toolbar');
        if (toolbar && typeof (toolbar as any).handlers.formula === 'function') {
          (toolbar as any).handlers.formula.call(toolbar);
        }
      }
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
    position: sticky;
    top: -8px;
    z-index: 50;
    background-color: white;
  }

  :global(math-field.doc-field-math) {
    border: none;
    padding: 0px;
  }

  :global(math-field.doc-field-math::part(content)) {
    padding: 1px;
  }

  :global(span.ql-formula.is-selected) {
    background-color: Highlight;
    color: HighlightText;
  }

  :global(span.ql-formula.is-selected math-field.doc-field-math) {
    background-color: Highlight;
    color: HighlightText;
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