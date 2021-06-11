<script>
  import { addMathCell, addDocumentationCell } from "./stores.js";

  import AddAlt16 from "carbon-icons-svelte/lib/AddAlt16";
  import AddComment16 from "carbon-icons-svelte/lib/AddComment16";

  export let index;

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
    background: lightgray;
  }

  div.outer-container {
    display: flex;
  }

  hr {
    width: 95%;
    border: 0;
    height: 2px;
    border-radius: 1px;
    background: none;
  }

  button:hover ~ hr {
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

<div class="outer-container">
  <button title="Insert Math Cell Here" on:click={() => addMathCell(index)}>
    <div class="icon">
      <AddAlt16 />
    </div>
  </button>
  <button title="Insert Documentation Cell Here" on:click={() => addDocumentationCell(index)}>
    <div class="icon">
      <AddComment16 />
    </div>
  </button>
  <hr>
</div>