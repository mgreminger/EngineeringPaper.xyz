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

  let nextId = 0
  let cells = [{ id: nextId++, latex: "", parsingError: true, statement: null }];
  let results = null;
  let debug = false;
  let error = null;

  let refreshCounter = BigInt(1);
  let pyodidePromise = null;

  function addCell() {
    cells.push({ id: nextId++, latex: "", parsingError: true, statement: null });
    cells = cells;
    results = null;
  }

  function moveUp(index) {
    if (index > 0) {
      let newCells = cells.slice(0,index-1);
      newCells.push(cells[index]);
      newCells.push(cells[index-1]);
      newCells = newCells.concat(cells.slice(index+1, cells.length+1));
      cells = newCells;
      results = null;
    }
  }

  function moveDown(index) {
    if (index < cells.length-1) {
      let newCells = cells.slice(0, index);
      newCells.push(cells[index+1]);
      newCells.push(cells[index]);
      newCells = newCells.concat(cells.slice(index+2, cells.length+1));
      cells = newCells;
      results = null;
    }
  }

  function deleteCell(index) {
    cells = cells.filter((cell,i) => i !== index);
    results = null;
  }

  function getResults() {
    return new Promise((resolve, reject) => {
      function handleWorkerMessage(e) {
        if (e.data === "pyodide_not_available") {
          // pyodide didn't load properly
          reject("Pyodide failed to load.");
        } else {
          resolve(e.data);
        }
      }
      pyodideWorker.onmessage = handleWorkerMessage;
      pyodideWorker.postMessage([cells.map((cell) => cell.statement)]);
    });
  }

  async function handleCellUpdate() {
    const myRefreshCount = ++refreshCounter;
    results = null;
    await pyodidePromise;
    if (myRefreshCount === refreshCounter &&
        !cells.reduce((acum, current) => acum || current.parsingError, false)) {
      pyodidePromise = getResults()
      .then((data) => {
        results = data.results;
        error = data.error;
      })
      .catch((errorMessage) => error=errorMessage);
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
      const visitor = new LatexToSympy(cells[cellNum].id);

      cells[cellNum].statement = visitor.visit(tree);

      if (visitor.dimError || visitor.assignError) {
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

  $: if (results && results.length === cells.length) {
    results.forEach((result, i) => {
      const statement = cells[i].statement;
      if (
        statement &&
        statement.type === "query" &&
        statement.units_valid &&
        statement.units &&
        result.units !== "Dimension Error" &&
        result.numeric
      ) {
        if (result.real && result.finite) {
          const resultUnits = unit(`${result.value} ${result.units}`);
          const userUnits = unit(statement.units);
          if (arraysEqual(resultUnits.dimensions, userUnits.dimensions)) {
            result.userUnitsValue = resultUnits.toNumber(statement.units);
            result.unitsMismatch = false;
          } else {
            result.unitsMismatch = true;
          }
        } else {
          // unit conversions not support for complex numbers
          result.unitsMismatch = true;
        }
      }
    });
  }
</script>

<style>
</style>

<button id="add-cell" on:click={addCell}>Add Cell</button>
<label>
  <input id="debug" type="checkbox" bind:checked={debug}>
  Enable Debugging Mode
</label>


{#each cells as cell, i (cell.id)}
  <div>
    <button id="{`up-${i}`}" on:click={()=>moveUp(i)}><img src="./icons/chevron-up.svg" width="20" height="20" alt="Move Up"></button>
    <button id="{`down-${i}`}" on:click={()=>moveDown(i)}><img src="./icons/chevron-down.svg" width="20" height="20" alt="Move Down"></button>
    <button id="{`delete-${i}`}" on:click={()=>deleteCell(i)}><img src="./icons/trash.svg" width="20" height="20" alt="Delete"></button>
    <MathField
      on:update={(e) => parseLatex(e.detail.latex, i)}
      parsingError={cell.parsingError}
    />
    {#if results && results.length === cells.length && 
         cell.statement && cell.statement.type === "query"}
      {#if results[i].units !== "Dimension Error"}
        {#if results[i].userUnitsValue}
          <span id="{`result-value-${i}`}">{results[i].userUnitsValue}</span> <span id="{`result-units-${i}`}">{cell.statement.units}</span>
        {:else if !results[i].unitsMismatch}
          <span id="{`result-value-${i}`}">{results[i].value}</span> <span id="{`result-units-${i}`}">{results[i].units}</span>
        {:else}
          <span id="{`result-units-${i}`}">Units Mismatch</span>
        {/if}
      {:else}
        <span id="{`result-units-${i}`}">{results[i].units}</span>
      {/if}
    {/if}
    {#if debug}
      <div>{cell.latex}</div>
      {#if cell.statement}
        <div>{cell.statement.type}</div>
        {#if cell.statement.type === "query"}
          <div>{cell.statement.sympy}={cell.statement.units}</div>
        {:else}
          <div>{cell.statement.name}={cell.statement.sympy}</div>
        {/if}
      {/if}
    {/if}
  </div>
{/each}

{#if error}
  <div>Error: <span id="error-message">{error}</span></div>
{/if}

{#if debug}
  <div>JSON Output:</div>
  <div>
    {JSON.stringify(cells.map((cell) => cell.statement))}
  </div>
{/if}