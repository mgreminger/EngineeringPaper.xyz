<script>
  import { activeCell, nonMathCellChanged } from "./stores.ts";

  export let title = "New Sheet";
</script>

<style>
  h1 {
    font-size: 2rem;
  }

  @media screen {
    h1 {
      padding-left: 73px;
    }

    @media (max-width: 500px) {
      h1 {
        padding-left: 34px;
      }
    }
  }

</style>

<h1
  on:focus={() => $activeCell = -1}
  contenteditable="true"
  bind:textContent={title}
  on:input={() => $nonMathCellChanged=true}
>
</h1>