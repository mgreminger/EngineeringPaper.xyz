<script module lang="ts">
  import { JediWrapper } from "./jediWrapper";

  const jediWrapper = new JediWrapper;
</script>

<script lang="ts">
  import { basicSetup } from "codemirror";
  import { EditorView, keymap, hoverTooltip, hasHoverTooltips, closeHoverTooltips} from "@codemirror/view";
  import { indentWithTab } from "@codemirror/commands";
  import { python } from "@codemirror/lang-python";
  import { indentUnit } from "@codemirror/language";
  import { linter, forceLinting, type Diagnostic } from "@codemirror/lint";
  import { type CompletionContext, type CompletionResult, autocompletion } from "@codemirror/autocomplete";
  import { onMount } from "svelte";
  import type { CodeCellResult } from "./resultTypes";
  import type { CodeContextRequest } from "./jediWrapper";
  import { mode } from "mathjs";
  import type CodeCell from "./cells/CodeCell.svelte";

  let editorDiv: HTMLDivElement = $state();

  interface Props {
    code: string;
    codeCellResult: CodeCellResult | null;
    codeCell: CodeCell;
    update: (arg: { code: string }) => void;
  }

  let { code, codeCellResult, codeCell, update }: Props = $props();

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
    const errorLinter = linter(diagnostics, { needsRefresh: () => needsLinterRefresh, autoPanel: true});
    const autocompleteExtension = autocompletion({
      override: [jediAutocompleteSource],
    });

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
        errorLinter,
        autocompleteExtension,
        wordHover
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
        from = 0;
        to = 0;
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

  async function jediAutocompleteSource(context: CompletionContext): Promise<CompletionResult | null> {
    const word = context.matchBefore(/(?!\d+)\w+\.\w*/)
    if (!context.explicit && (!word || (word.from == word.to))) {
      return null;
    }

    const code = context.state.doc.toString(); // Retrieve full editor content
    const pos = context.pos; // Cursor position in the document
    const line = context.state.doc.lineAt(pos).number;
    const col = pos - context.state.doc.line(line).from;

    const codeContextRequest: CodeContextRequest = { code, line, col };

    const codeContextResult = await jediWrapper.getCodeContextResult({
      codeContextRequest,
      neededPyodidePackages: [...codeCell.neededPyodidePackages]
    });
    
    if (codeContextResult.autocompleteSuggestions.length === 0) {
      return null;
    }

    const prefixLengths = codeContextResult.autocompleteSuggestions.map((value) => value.prefixLength);
    const prefixLength = mode(prefixLengths);

    return {
      from: context.pos - prefixLength,
      options: codeContextResult.autocompleteSuggestions.map(suggestion => ({
        label: suggestion.label,
        type: suggestion.type, 
        detail: suggestion.detail,
        boost: suggestion.label.startsWith("_") ? -1 : 1
      }))
    }
  }

  const wordHover = hoverTooltip(async (view, pos, side) => {
    let {from, to, text} = view.state.doc.lineAt(pos)
    let start = pos, end = pos
    while (start > from && /\w/.test(text[start - from - 1])) start--
    while (end < to && /\w/.test(text[end - from])) end++
    if (start == pos && side < 0 || end == pos && side > 0)
      return null

    const code = view.state.doc.toString(); // Retrieve full editor content
    const line = view.state.doc.lineAt(pos).number;
    const col = pos - view.state.doc.line(line).from;

    const codeContextRequest: CodeContextRequest = { code, line, col };

    const codeContextResult = await jediWrapper.getCodeContextResult({
      codeContextRequest,
      neededPyodidePackages: [...codeCell.neededPyodidePackages]
    });

    if (!codeContextResult.hoverText) {
      return null;
    }

    return {
      pos: start,
      end,
      above: true,
      create(view) {
        let dom = document.createElement("pre")
        dom.textContent = codeContextResult.hoverText
        dom.style.fontFamily = "monospace"
        dom.style.overflowY = "scroll"
        dom.style.maxHeight = "200px"
        return {dom}
      }
    }
  })

  function handleEscape(e: KeyboardEvent) {
    if (e.key === "Escape" && hasHoverTooltips(editor.state)) {
      editor.dispatch({effects: closeHoverTooltips});
      e.preventDefault();
    }
  } 

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  onkeydown={handleEscape}
  bind:this={editorDiv}
>
</div>
