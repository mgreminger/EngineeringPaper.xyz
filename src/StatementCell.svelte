<script>
  import { cells, results, debug } from "./stores.js";
  import MathField from "./MathField.svelte";

  import antlr4 from "antlr4";
  import LatexLexer from "./parser/LatexLexer.js";
  import LatexParser from "./parser/LatexParser.js";
  import { LatexToSympy, LatexErrorListener } from "./parser/LatexToSympy.js";

  export let index;

  function parseLatex(latex, cellNum) {
    $cells[cellNum].data.latex = latex;

    const input = new antlr4.InputStream(latex + ";");
    const lexer = new LatexLexer(input);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new LatexParser(tokens);

    parser.removeErrorListeners(); // remove ConsoleErrorListener
    parser.addErrorListener(new LatexErrorListener());

    parser.buildParseTrees = true;

    const tree = parser.statement();

    let parsingError = parser._listeners[0].count > 0 ? true : false;

    if (!parsingError) {
      const visitor = new LatexToSympy(latex + ";", $cells[cellNum].id);

      $cells[cellNum].data.statement = visitor.visit(tree);

      if (visitor.dimError || visitor.assignError) {
        parsingError = true;
      }
    } else {
      $cells[cellNum].data.statement = null;
    }

    $cells[cellNum].data.parsingError = parsingError;
  }

</script>

<style>
  .hidden {
    display: none;
  }
</style>

<MathField
  on:update={(e) => parseLatex(e.detail.latex, index)}
  parsingError={$cells[index].data.parsingError}
/>
{#if $results[index] && $cells[index].data.statement &&
     $cells[index].data.statement.type === "query"}
  {#if $results[index].units !== "Dimension Error"}
    {#if $results[index].userUnitsValueDefined}
      <span class="hidden" id="{`result-value-${index}`}">{$results[index].userUnitsValue}</span>
      <span class="hidden" id="{`result-units-${index}`}">{$cells[index].data.statement.units}</span>
      <MathField editable={false} latex={`=${$results[index].userUnitsValue}${$cells[index].data.statement.unitsLatex}`} />
    {:else if !$results[index].unitsMismatch}
      <span class="hidden" id="{`result-value-${index}`}">{$results[index].value}</span>
      <span class="hidden" id="{`result-units-${index}`}">{$results[index].units}</span>
      <MathField editable={false} latex={`${$results[index].value}\\ ${$results[index].unitsLatex}`}/>
    {:else}
      <span id="{`result-units-${index}`}">Units Mismatch</span>
    {/if}
  {:else}
    <span id="{`result-units-${index}`}">{$results[index].units}</span>
  {/if}
{/if}
{#if $debug}
<div>{$cells[index].data.latex}</div>
{#if $cells[index].data.statement}
  <div>{$cells[index].data.statement.type}</div>
  {#if $cells[index].data.statement.type === "query"}
    <div>{$cells[index].data.statement.sympy}={$cells[index].data.statement.units}</div>
    {#if $results[index] }
      <div>{`value=${$results[index].value}, units=${$results[index].unitsLatex}`}</div>
    {/if}
  {:else}
    <div>{$cells[index].data.statement.name}={$cells[index].data.statement.sympy}</div>
  {/if}
{/if}
{/if}