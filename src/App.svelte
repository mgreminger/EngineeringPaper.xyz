<script>
	
	import MathField from "./MathField.svelte";

	import antlr4 from "antlr4";
	import LatexLexer from "./parser/LatexLexer.js"
	import LatexParser from "./parser/LatexParser.js"
	import { LatexToSympy, LatexErrorListener } from "./parser/LatexToSympy.js"

	let cells = [{latex: "", parsingError: "", statement: null}]

	function addCell() {
		cells.push({latex: "", parsingError: "", statement: null});
		cells = cells;
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