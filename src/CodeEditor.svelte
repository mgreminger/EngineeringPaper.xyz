<script module lang="ts">
  type basicSetupType = typeof import("codemirror").basicSetup;
  type EditorViewType = typeof import("@codemirror/view").EditorView;
  type keymapType = typeof import("@codemirror/view").keymap;
  type indentWithTabType = typeof import("@codemirror/commands").indentWithTab;
  type pythonType = typeof import("@codemirror/lang-python").python;
  type indentUnitType = typeof import("@codemirror/language").indentUnit;
  type linterType = typeof import("@codemirror/lint").linter;
  type forceLintingType = typeof import("@codemirror/lint").forceLinting;
  type Diagnostic = import("@codemirror/lint").Diagnostic;

  let basicSetup: basicSetupType;
  let EditorView: EditorViewType;
  let keymap: keymapType;
  let indentWithTab: indentWithTabType;
  let python: pythonType;
  let indentUnit: indentUnitType;
  let linter: linterType;
  let forceLinting: forceLintingType;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import type { CodeCellResult } from "./resultTypes";

  let editorDiv: HTMLDivElement = $state();

  interface Props {
    code: string;
    codeCellResult: CodeCellResult | null;
    update: (arg: { code: string }) => void;
  }

  let { code, codeCellResult, update }: Props = $props();

  let editor: EditorViewType;

  let needsLinterRefresh = false;

  $effect(() => {
    if (codeCellResult && editor && !needsLinterRefresh) {
      needsLinterRefresh = true;
      //@ts-ignore
      editor.dispatch({});
      //@ts-ignore
      forceLinting(editor);
    }
  });

  onMount(async () => {
    if (!basicSetup) {
      ({ basicSetup } = await import("codemirror"));
      ({ EditorView, keymap } = await import("@codemirror/view"));
      ({ indentWithTab } = await import("@codemirror/commands"));
      ({ python } = await import("@codemirror/lang-python"));
      ({ indentUnit } = await import("@codemirror/language"));
      ({ linter, forceLinting } = await import("@codemirror/lint"));
    }

    //@ts-ignore
    const errorLinter = linter(diagnostics, { needsRefresh: () => needsLinterRefresh});

    //@ts-ignore
    editor = new EditorView({
      doc: code,
      extensions: [
        basicSetup,
        indentUnit.of("    "),
        keymap.of([indentWithTab]),
        python(),
        EditorView.updateListener.of((viewUpdate) => {
          if (viewUpdate.docChanged) {
            update({ code: viewUpdate.state.doc.toString() });
          }
        }),
        errorLinter
      ],
      parent: editorDiv,
    });
  });

  export function focus() {
    if (editor) {
      //@ts-ignore
      editor.focus();
    }
  }

  function getLineRange(view: EditorViewType, lineNumber: number) {
    //@ts-ignore
    const line = view.state.doc.line(lineNumber);
    return { from: line.from, to: line.to };
  }

  function getColumnRange(view: EditorViewType, lineNumber: number, startCol: number, endCol: number) {
    //@ts-ignore
    const line = view.state.doc.line(lineNumber);
    return { from: line.from + (startCol-1), to: line.from + (endCol-1) };
  }

  function diagnostics(view: EditorViewType) {
    needsLinterRefresh = false;
    const result: Diagnostic[] = [];
    
    if (!codeCellResult) {
      return result;
    }

    for (const error of codeCellResult.errors) {
      if (!error.line) {
        continue;
      }
      let from: number;
      let to: number;
      if (error.line && error.startCol && error.endCol) {
        ({ from, to } = getColumnRange(view, error.line, error.startCol, error.endCol));
      } else {
        ({ from, to } = getLineRange(view, error.line));
      }
      result.push({
        from: from,
        to: to,
        severity: "error",
        message: error.message,
      });
    }

    return result;
  }

</script>

<div bind:this={editorDiv}></div>
