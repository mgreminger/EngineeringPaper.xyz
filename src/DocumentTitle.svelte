<script>
  import { activeCell, nonMathCellChanged } from "./stores.ts";

  export let title = "New Sheet";

  let spellcheck = false;
</script>

<style>
  h1 {
    font-size: 2rem;
    padding-left: 7px; /*only used for printing, screen padding defined below */
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
  on:focus={() => {$activeCell = -1; spellcheck = true}}
  on:blur={() => spellcheck = false}
  contenteditable="true"
  bind:textContent={title}
  on:input={() => $nonMathCellChanged=true}
  {spellcheck}
>
</h1>