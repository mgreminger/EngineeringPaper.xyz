<script>
  import { activeCell } from "./stores.js";

  export let title = "New Sheet";
</script>

<style>
  @media screen {
    h1 {
      padding-left: 36px;
    }
  }
</style>

<h1
  on:focus={() => $activeCell = -1}
  contenteditable="true"
  bind:textContent={title}
>
</h1>