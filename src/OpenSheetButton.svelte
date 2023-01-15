<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Upload from "carbon-icons-svelte/lib/Upload.svelte";

  let input: HTMLInputElement | undefined; 

  const dispatch = createEventDispatcher<{openFile: {file: File}}>();

  function handleFileOpenClick() {
    if (input) {
      input.click();
    }
  }

  function dispatchFileEvent() {
    dispatch('openFile', {file: input.files[0]})
  }

</script>

<style>
  input {
    display: none;
  }

  button {
    background-color: #161616;
    width: 100%;
    height: 100%;
    border: none;
  }

  button:hover {
    background-color: #353535;
  }

</style>


<input
  type="file"
  accept=".epxyz"
  bind:this={input}
  on:change={dispatchFileEvent}
/>

<button on:click={handleFileOpenClick} title="Open Sheet From File">
  <Upload size={20} fill="white"/>
</button>