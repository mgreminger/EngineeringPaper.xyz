<script lang="ts">
  import appState from "./stores.svelte";

  interface Props {
    title: string;
    triggerSaveNeeded: () => void;
  }

  let {
    title = $bindable(),
    triggerSaveNeeded
  }: Props = $props();

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
  onfocus={() => {appState.activeCell = -1; spellcheck = true}}
  onblur={() => spellcheck = false}
  contenteditable="true"
  bind:textContent={title}
  oninput={() => triggerSaveNeeded()}
  {spellcheck}
>
</h1>