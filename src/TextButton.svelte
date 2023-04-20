<script>
	
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

<button on:click>
	<slot/>
</button>