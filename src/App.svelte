<script>
	import MathField from "./MathField.svelte"

	let mathFieldLatex = "x=";
</script>


<MathField bind:mathFieldLatex></MathField>
<div>{mathFieldLatex}</div>

<style>

</style>