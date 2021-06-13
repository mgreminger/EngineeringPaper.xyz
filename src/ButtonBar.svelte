<script>
  import { addMathCell, addDocumentationCell } from "./stores.js";

  import AddAlt16 from "carbon-icons-svelte/lib/AddAlt16";
  import AddComment16 from "carbon-icons-svelte/lib/AddComment16";

  export let index;
  export let last = false;

</script>

<style>

  button {
    background: none;
    border: none;
    border-radius: 50%;
    position: relative;
    width: 20px;
    height: 20px;
  }

  button:hover {
    background: gainsboro;
  }

  div.outer-container {
    display: flex;
  }

  div.outer-container:not(.last) {
    opacity: 0;
  }

  div.outer-container:not(.last):hover {
    opacity: 1;
  }

  hr {
    width: 47.5%;
    border: 0;
    height: 2px;
    border-radius: 1px;
    background: lightgray;
  }

  div.icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    height: 16px;
    width: 16px;
  }

</style>

<div class="outer-container" class:last>
  <hr>
  <button
    title="Insert Math Cell Here"
    on:click={() => addMathCell(index)}
    id={last ? "add-math-cell" : null}  
  >
    <div class="icon">
      <AddAlt16 />
    </div>
  </button>
  <button 
    title="Insert Documentation Cell Here"
    on:click={() => addDocumentationCell(index)}
    id={last ? "add-documentation-cell" : null}  
  >
    <div class="icon">
      <AddComment16 />
    </div>
  </button>
  <hr>
</div>