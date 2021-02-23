<script>
	
	import MathField from "./MathField.svelte";

	import antlr4 from "antlr4";
	import LatexLexer from "./parser/LatexLexer.js"
	import LatexParser from "./parser/LatexParser.js"
	import LatexToSympy from "./parser/LatexToSympy.js"

	let mathFieldLatex = "x=10";
	let mathTree = "";
	let parsingError = false;

	function parseLatex(inputText) {
		const input = new antlr4.InputStream(inputText + ';');
		const lexer = new LatexLexer(input);
		const tokens = new antlr4.CommonTokenStream(lexer);
		const parser = new LatexParser(tokens);

		parser.buildParseTrees = true;

		const	tree = parser.assign();

		parsingError = parser._syntaxErrors > 0? true : false;
		
		if (!parsingError) {
			const visitor = new LatexToSympy(0);

			const expression = visitor.visit(tree);

			if (visitor.dimError) {
				parsingError = true;
			}
			
			return expression.sympy;
		} else {
			return "";
		}
	}

	$: mathTree = parseLatex(mathFieldLatex);
</script>


<MathField bind:mathFieldLatex parsingError={parsingError}></MathField>
<div>{mathFieldLatex}</div>
<div>{mathTree}</div>

<style>

</style>