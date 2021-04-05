<script>
  import { cells, results, debug, activeCell, activeCellFlowDown } from "./stores.js";
  import MathField from "./MathField.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";

  import antlr4 from "antlr4";
  import LatexLexer from "./parser/LatexLexer.js";
  import LatexParser from "./parser/LatexParser.js";
  import { LatexToSympy, LatexErrorListener } from "./parser/LatexToSympy.js";

  export let index;

  let mathFieldInstance;

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
      const visitor = new LatexToSympy(latex + ";", $cells[cellNum].data.id);

      $cells[cellNum].extra.statement = visitor.visit(tree);

      if (visitor.dimError || visitor.assignError) {
        parsingError = true;
      }
    } else {
      $cells[cellNum].extra.statement = null;
    }

    $cells[cellNum].extra.parsingError = parsingError;
  }

  function handleVirtualKeyboard(event) {
    if (event.detail.write) {
      mathFieldInstance.getMathField().write(event.detail.command);
    } else {
      mathFieldInstance.getMathField().cmd(event.detail.command);
    }
    mathFieldInstance.getMathField().focus();
    if ( event.detail.command.slice(-1) === ')' ) {
      mathFieldInstance.getMathField().keystroke("Left");
    }
  }

  function handleFocusIn() {
    const previousActiveCell = $activeCell;
    $activeCell = index;

    if (($activeCell - previousActiveCell) !== 0) {
      $activeCellFlowDown = ($activeCell - previousActiveCell) > 0 ? true : false;
    }
  }

  $: $cells[index].extra.mathFieldInstance = mathFieldInstance;

</script>

<style>
  .hidden {
    display: none;
  }

</style>

{#if index === $activeCell && $activeCellFlowDown}
  <div class="keyboard">
    <VirtualKeyboard on:clickButton={handleVirtualKeyboard}/>
  </div>
{/if}

<span on:focusin={handleFocusIn}>
  <MathField
    editable={true}
    on:update={(e) => parseLatex(e.detail.latex, index)}
    parsingError={$cells[index].extra.parsingError}
    bind:this={mathFieldInstance}
  />
</span>
{#if $results[index] && $cells[index].extra.statement &&
    $cells[index].extra.statement.type === "query"}
  {#if $results[index].units !== "Dimension Error" && $results[index].units !== "Exponent Not Dimensionless"}
    {#if $results[index].userUnitsValueDefined}
      <span class="hidden" id="{`result-value-${index}`}">{$results[index].userUnitsValue}</span>
      <span class="hidden" id="{`result-units-${index}`}">{$cells[index].extra.statement.units}</span>
      <MathField
        latex={`=${$results[index].userUnitsValue}${$cells[index].extra.statement.unitsLatex}`}
      />
    {:else if !$results[index].unitsMismatch}
      <span class="hidden" id="{`result-value-${index}`}">{$results[index].value}</span>
      <span class="hidden" id="{`result-units-${index}`}">{$results[index].units}</span>
      <MathField
        latex={`${$results[index].value}\\ ${$results[index].unitsLatex}`}
      />
    {:else}
      <span id="{`result-units-${index}`}">Units Mismatch</span>
    {/if}
  {:else}
    <span id="{`result-units-${index}`}">{$results[index].units}</span>
  {/if}
{/if}

{#if index === $activeCell && !$activeCellFlowDown}
  <div class="keyboard">
    <VirtualKeyboard on:clickButton={handleVirtualKeyboard}/>
  </div>
{/if}

{#if $debug}
  <div>{$cells[index].data.latex}</div>
  {#if $cells[index].extra.statement}
    <div>{$cells[index].extra.statement.type}</div>
    {#if $cells[index].extra.statement.type === "query"}
      <div>{$cells[index].extra.statement.sympy}={$cells[index].extra.statement.units}</div>
      {#if $results[index] }
        <div>{`value=${$results[index].value}, units=${$results[index].unitsLatex}`}</div>
      {/if}
    {:else}
      <div>{$cells[index].extra.statement.name}={$cells[index].extra.statement.sympy}</div>
    {/if}
  {/if}
{/if}