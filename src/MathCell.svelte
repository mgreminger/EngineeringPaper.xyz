<script>
  import { cells, results, debug, activeCell, handleFocusIn, prefersReducedMotion } from "./stores.js";
  import MathField from "./MathField.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";

  import antlr4 from "antlr4";
  import LatexLexer from "./parser/LatexLexer.js";
  import LatexParser from "./parser/LatexParser.js";
  import { LatexToSympy, LatexErrorListener } from "./parser/LatexToSympy.js";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error16 from "carbon-icons-svelte/lib/Error16";

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

    let parsingError = parser._listeners[0].count > 0;

    if (!parsingError) {
      $cells[cellNum].extra.parsingError = false;

      const visitor = new LatexToSympy(latex + ";", $cells[cellNum].data.id);

      $cells[cellNum].extra.statement = visitor.visit(tree);

      if (visitor.dimError || visitor.assignError) {
        $cells[cellNum].extra.parsingError = true;
        $cells[cellNum].extra.dimError = visitor.dimError;
        $cells[cellNum].extra.assignError = visitor.assignError;
      }
    } else {
      $cells[cellNum].extra.statement = null;
      $cells[cellNum].extra.parsingError = true;
    }
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

  $: $cells[index].extra.mathFieldInstance = mathFieldInstance;

</script>

<style>
  span.hidden {
    display: none;
  }

  span.container {
    display: flex;
    align-items: center;
  }

  :global(.bx--tooltip__trigger) {
    margin-left: 0.5rem;
  }

  :global(svg.error) {
    fill: #da1e28;
  }

</style>

<span class="container">
  <span on:focusin={() => handleFocusIn(index)}>
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
        <TooltipIcon direction="right" align="end">
          <span id="{`result-units-${index}`}" slot="tooltipText">Units Mismatch</span>
          <Error16 class="error"/>
        </TooltipIcon>
      {/if}
    {:else}
      <TooltipIcon direction="right" align="end">
        <span id="{`result-units-${index}`}" slot="tooltipText">{$results[index].units}</span>
        <Error16 class="error"/>
      </TooltipIcon>
    {/if}
  {:else if $cells[index].extra.parsingError}
    {#if $cells[index].extra.dimError}
      <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">Unknown dimension</span>
        <Error16 class="error"/>
      </TooltipIcon>
    {:else if $cells[index].extra.assignError}
      <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">Attempt to reassign reserved variable name</span>
        <Error16 class="error"/>
      </TooltipIcon>
    {:else}
      <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">Invalid syntax</span>
        <Error16 class="error"/>
      </TooltipIcon>
    {/if}
  {/if}
</span>

{#if index === $activeCell}
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