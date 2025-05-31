<script module lang="ts">
  type basicSetupType = typeof import("codemirror").basicSetup;
  type EditorViewType = typeof import("@codemirror/view").EditorView;
  type keymapType = typeof import("@codemirror/view").keymap;
  type indentWithTabType = typeof import("@codemirror/commands").indentWithTab;
  type pythonType = typeof import("@codemirror/lang-python").python;
  type indentUnitType = typeof import("@codemirror/language").indentUnit;

  let basicSetup: basicSetupType;
  let EditorView: EditorViewType;
  let keymap: keymapType;
  let indentWithTab: indentWithTabType;
  let python: pythonType;
  let indentUnit: indentUnitType;
</script>

<script lang="ts">
	import { onMount } from "svelte";
		
	let editorDiv: HTMLDivElement = $state();
	
	interface Props {
		code: string;
		update: (arg: {code: string}) => void;
	}
	
	let {code, update}: Props = $props();
	
  let editor: EditorViewType;

	onMount(async () => {
    if (!basicSetup) {
      ({ basicSetup } = await import("codemirror"));
      ({ EditorView, keymap } = await import("@codemirror/view"));
      ({ indentWithTab } = await import("@codemirror/commands"));
      ({ python } = await import("@codemirror/lang-python"));
      ({ indentUnit } = await import("@codemirror/language"));
    }

    //@ts-ignore
		editor = new EditorView({
			doc: code,
		  extensions: [
				basicSetup,
				indentUnit.of("    "),
				keymap.of([indentWithTab]),
				python(),
				EditorView.updateListener.of(viewUpdate => {
					update({code: viewUpdate.state.doc.toString()});
				})
			],
		  parent: editorDiv
		});
	});

	export function focus() {
		if (editor) {
      //@ts-ignore
			editor.focus();
		}
	}
</script>

<div bind:this={editorDiv}>	
</div>


