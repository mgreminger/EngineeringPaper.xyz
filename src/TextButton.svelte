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
	
	button:focus {
    box-shadow: #8bd 0 0 1px 2px, inset #6ae 0 0 2px 0;
    border-color: #709AC0;
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