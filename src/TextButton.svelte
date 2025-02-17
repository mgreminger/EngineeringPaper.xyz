<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
		onclick: (arg: PointerEvent) => void 
	}

	let { 
		children,
		onclick
	} = $props();

</script>

<style>
	button {														
		border-radius: 1em;
		padding-left: 0.5em;
		padding-right: 0.5em;
		padding-bottom: 0.2em;
		padding-top: 0em;
		border: solid 1px;
		background-color: #fff;
	}
	
	button:active {
		background-color: #ddd !important;
	}

	button:hover {
		text-decoration: underline;
	}
</style>

<button 
	{onclick}
>
	{@render children()}
</button>