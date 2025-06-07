<script lang="ts">
  import { basicSetup } from "codemirror";
  import { EditorView, keymap } from "@codemirror/view";
  import { indentWithTab } from "@codemirror/commands";
  import { python } from "@codemirror/lang-python";
  import { indentUnit } from "@codemirror/language";
  import { linter, forceLinting, type Diagnostic } from "@codemirror/lint";
  import { onMount } from "svelte";
  import type { CodeCellResult } from "./resultTypes";

  let editorDiv: HTMLDivElement = $state();

  interface Props {
    code: string;
    codeCellResult: CodeCellResult | null;
    update: (arg: { code: string }) => void;
  }

  let { code, codeCellResult, update }: Props = $props();

  let editor: EditorView;

  let needsLinterRefresh = false;

  $effect(() => {
    if (codeCellResult && editor && !needsLinterRefresh) {
      needsLinterRefresh = true;
      editor.dispatch({});
      forceLinting(editor);
    }
  });

  onMount(async () => {
    const errorLinter = linter(diagnostics, { needsRefresh: () => needsLinterRefresh});

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
      editor.focus();
    }
  }

  function getLineRange(view: EditorView, startLine: number, endLine: number) {
    const line1 = view.state.doc.line(startLine);
    const line2 = view.state.doc.line(endLine);
    return { from: line1.from, to: line2.to };
  }

  function getColumnRange(view: EditorView,
                          startLine: number, endLine: number,
                          startCol: number, endCol: number) {
    const line1 = view.state.doc.line(startLine);
    const line2 = view.state.doc.line(endLine);
    return { from: line1.from + startCol, to: line2.from + endCol };
  }

  function diagnostics(view: EditorView) {
    needsLinterRefresh = false;
    const result: Diagnostic[] = [];
    
    if (!codeCellResult) {
      return result;
    }

    for (const error of codeCellResult.errors) {
      let from: number;
      let to: number;
      if (error.startLine && error.endLine && error.startCol !== null && error.endCol !== null) {
        ({ from, to } = getColumnRange(view, error.startLine, error.endLine, error.startCol, error.endCol));
      } else if (error.startLine && error.endLine) {
        ({ from, to } = getLineRange(view, error.startLine, error.endLine));
      } else if (error.startLine) {
        ({ from, to } = getLineRange(view, error.startLine, error.startLine));
      } else {
        continue;
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
