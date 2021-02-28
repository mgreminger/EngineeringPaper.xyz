<script>
  import MathField from "./MathField.svelte";

  import { onDestroy } from "svelte";

  import { unit } from "mathjs";

  import antlr4 from "antlr4";
  import LatexLexer from "./parser/LatexLexer.js";
  import LatexParser from "./parser/LatexParser.js";
  import { LatexToSympy, LatexErrorListener } from "./parser/LatexToSympy.js";

  // start webworker for python calculations
  const pyodideWorker = new Worker("webworker.js");
  onDestroy(() => pyodideWorker.terminate());

  let cells = [{ latex: "", parsingError: true, statement: null }];
  let results = null;

  let pyodidePromise = null;

  function addCell() {
    cells.push({ latex: "", parsingError: true, statement: null });
    cells = cells;
  }

  function getResults() {
    return new Promise((resolve, reject) => {
      function handleWorkerMessage(e) {
        if (e.data === "pyodide_not_available") {
          // pyodide didn't load properly
          reject("Pyodide not available for calculations");
        } else {
          resolve(e.data);
        }
      }
      pyodideWorker.onmessage = handleWorkerMessage;
      pyodideWorker.postMessage([cells.map((cell) => cell.statement)]);
    });
  }

  async function handleCellUpdate() {
    await pyodidePromise;
    if (!cells.reduce((acum, current) => acum || current.parsingError, false)) {
      pyodidePromise = getResults().then((data) => {
        results = data.results;
      });
    } else {
      results = null;
    }
  }

  function parseLatex(latex, cellNum) {
    cells[cellNum].latex = latex;

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
      const visitor = new LatexToSympy(cellNum);

      cells[cellNum].statement = visitor.visit(tree);

      if (visitor.dimError) {
        parsingError = true;
      }
    } else {
      cells[cellNum].statement = null;
    }

    cells[cellNum].parsingError = parsingError;
  }

  function arraysEqual(a, b) {
    return a.length === b.length && a.every((item, i) => item === b[i]);
  }

  $: if (cells) {
    handleCellUpdate();
  }

  $: if (results) {
    results.forEach((result, i) => {
      const statement = cells[i].statement;
      if (
        statement &&
        statement.type === "query" &&
        statement.units_valid &&
        result.units &&
        result.units !== "Dimension Error"
      ) {
        const resultUnits = unit(result.value, result.units);
        const userUnits = unit(statement.units);
        if (arraysEqual(resultUnits.dimensions, userUnits.dimensions)) {
          result.userUnitsValue = resultUnits.toNumber(statement.units);
          result.unitsMismatch = false;
        } else {
          result.unitsMismatch = true;
        }
      }
    });
  }
</script>

<button on:click={addCell}>Add Cell</button>

{#each cells as cell, i}
  <div>
    <MathField
      on:update={(e) => parseLatex(e.detail.latex, i)}
      parsingError={cell.parsingError}
    />
    {#if cell.statement && cell.statement.type === "query" && results}
      {#if results[i].units !== "Dimension Error"}
        {#if results[i].userUnitsValue}
          <span>{results[i].userUnitsValue} {cells[i].statement.units}</span>
        {:else if !results[i].unitsMismatch}
          <span>{results[i].value} {results[i].units}</span>
        {:else}
          <span>Units Mismatch</span>
        {/if}
      {:else}
        <span>{results[i].units}</span>
      {/if}
    {/if}
    <div>{cell.latex}</div>
    {#if cell.statement}
      <div>{cell.statement.type}</div>
      {#if cell.statement.type === "query"}
        <div>{cell.statement.sympy}={cell.statement.units}</div>
      {:else}
        <div>{cell.statement.name}={cell.statement.sympy}</div>
      {/if}
    {/if}
  </div>
{/each}

<div>JSON Output:</div>
<div>
  {JSON.stringify(cells.map((cell) => cell.statement))}
</div>

<style>
</style>
