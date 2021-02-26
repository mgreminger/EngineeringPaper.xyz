<script>
	
	import MathField from "./MathField.svelte";

	import { onDestroy } from 'svelte';

	import antlr4 from "antlr4";
	import LatexLexer from "./parser/LatexLexer.js"
	import LatexParser from "./parser/LatexParser.js"
	import { LatexToSympy, LatexErrorListener } from "./parser/LatexToSympy.js"

  // start webworker for python calculations
  const pyodideWorker = new Worker('webworker.js');
  onDestroy(() => pyodideWorker.terminate());

	let cells = [{latex: "", parsingError: true, statement: null}]

	let pyodidePromise = null;

	let queryValues = null;
	let queryDims = null;

	function addCell() {
		cells.push({latex: "", parsingError: true, statement: null});
		cells = cells;
	}

  function getQueryValues(){
    return new Promise((resolve, reject) => {
      function handleWorkerMessage(e){
        if (e.data === "pyodide_not_available") {
          // pyodide didn't load properly
          reject('Pyodide not available for calculations');
        } else {
          resolve(e.data)
        }
      }
      pyodideWorker.onmessage = handleWorkerMessage;
      pyodideWorker.postMessage([cells.map(cell => cell.statement)]);
    });
  }

	async function handleCellUpdate() {
		await pyodidePromise;
		pyodidePromise = getQueryValues()
			.then(data => {
				queryValues = data.values;
				queryDims = data.dims;
			});
	}

	function parseLatex(latex, cellNum) {
		cells[cellNum].latex = latex;

		const input = new antlr4.InputStream(latex + ';');
		const lexer = new LatexLexer(input);
		const tokens = new antlr4.CommonTokenStream(lexer);
		const parser = new LatexParser(tokens);

		parser.removeErrorListeners(); // remove ConsoleErrorListener
    parser.addErrorListener(new LatexErrorListener());

		parser.buildParseTrees = true;

		const	tree = parser.statement();

		let parsingError = parser._listeners[0].count > 0? true : false;
		
		if (!parsingError) {
			const visitor = new LatexToSympy(cellNum);

			cells[cellNum].statement = visitor.visit(tree);

			if (visitor.dimError) {
				parsingError = true;
			}

		} else {
			cells[cellNum].statement = null;
		}

		cells[cellNum].parsingError = parsingError
	}

	$: if(!cells.reduce((acum, current) => acum || current.parsingError, false)) {
		handleCellUpdate();
	}

</script>

<button on:click={addCell}>Add Cell</button>

{#each cells as cell, i}
	<div>
		<MathField on:update={(e)=>parseLatex(e.detail.latex, i)} parsingError={cell.parsingError}></MathField>
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
	{JSON.stringify(cells.map(cell => cell.statement))}
</div>

<style>

</style>