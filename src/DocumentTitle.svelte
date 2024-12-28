<script lang="ts">
  import { activeCell, nonMathCellChanged } from "./stores.svelte";

  let {title = $bindable()}: {title: string} = $props();

  let spellcheck = $state(false);
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
  onfocus={() => {$activeCell = -1; spellcheck = true}}
  onblur={() => spellcheck = false}
  contenteditable="true"
  bind:textContent={title}
  oninput={() => $nonMathCellChanged=true}
  {spellcheck}
>
</h1>