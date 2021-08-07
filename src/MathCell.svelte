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
    $cells[cellNum].extra.pendingNewLatex = false;

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
      $cells[cellNum].extra.parsingErrorMessage = '';

      const visitor = new LatexToSympy(latex + ";", $cells[cellNum].data.id);

      $cells[cellNum].extra.statement = visitor.visit(tree);

      if (visitor.parsingError) {
        $cells[cellNum].extra.parsingError = true;
        $cells[cellNum].extra.parsingErrorMessage = visitor.parsingErrorMessage;
      }

      if (visitor.insertions.length > 0) {
        visitor.insertions.sort((a,b) => a.location > b.location);
        const segments = [];
        let previousInsertLocation = 0;
        visitor.insertions.forEach( (insert) => {
          segments.push(latex.slice(previousInsertLocation, insert.location) + insert.text);
          previousInsertLocation = insert.location;
        });
        segments.push(latex.slice(previousInsertLocation));
        const newLatex = segments.reduce( (accum, current) => accum+current, '');
        $cells[cellNum].extra.pendingNewLatex = true;
        $cells[cellNum].extra.newLatex = newLatex;
      }
    } else {
      $cells[cellNum].extra.statement = null;
      $cells[cellNum].extra.parsingError = true;
      $cells[cellNum].extra.parsingErrorMessage = "Invalid Syntax";
    }
  }

  function handleVirtualKeyboard(event) {
    if (event.detail.write) {
      let command = event.detail.command;
      if (command.includes("[selection]")) {
        let selection = mathFieldInstance.getMathField().getSelection();
        selection = selection === null ? "" : selection;
        command = command.replace("[selection]", selection);
      }
      mathFieldInstance.getMathField().write(command);
    } else {
      mathFieldInstance.getMathField().cmd(event.detail.command);
    }
    mathFieldInstance.getMathField().focus();
    if ( event.detail.positionLeft ) {
      for (let i=0; i < event.detail.positionLeft; i++) {
        mathFieldInstance.getMathField().keystroke("Left");
      }
    }
  }

  function handleFocusOut(cellNum) {
    if ($cells[cellNum] && $cells[cellNum].extra.pendingNewLatex) {
      $cells[cellNum].extra.mathFieldInstance.setLatex(
        $cells[cellNum].extra.newLatex
      );
      $cells[cellNum].extra.pendingNewLatex = false;
    }
  }

  $: $cells[index].extra.mathFieldInstance = mathFieldInstance;

  $: if ($activeCell === index) {
    if (mathFieldInstance) {
      mathFieldInstance.getMathField().focus();
    }
  }

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
  <span
    on:focusin={() => handleFocusIn(index)}
    on:focusout={() => handleFocusOut(index)}
  >
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
      {#if $results[index].userUnitsValueDefined && !$results[index].unitsMismatch}
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
    <TooltipIcon direction="right" align="end">
      <span slot="tooltipText">{$cells[index].extra.parsingErrorMessage}</span>
      <Error16 class="error"/>
    </TooltipIcon>
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