<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import appState from "./stores.svelte";

  interface Props {
    id: string;
    textContent: string;
    enter: () => void;
    shiftEnter: () => void;
    modifierEnter: () => void;
    oninput: FormEventHandler<HTMLDivElement>;
  }

 let {
  id,
  textContent=$bindable(),
  enter,
  shiftEnter,
  modifierEnter,
  oninput
 }: Props = $props();

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key == 'Enter') {
      e.preventDefault();
      if(e.shiftKey) {
        shiftEnter();
      } else if(e[appState.modifierKey]) {
        modifierEnter();
      } else {
        enter();
      }
    }
  }
</script>

<style>
  div.editable {
    margin-bottom: 0px;
    margin-left: 7px;
    min-width: 12rem;
    width: fit-content;
    border: 1px solid gray;
    border-radius: 2px;
  }

  @media print {
    div.editable {
      border: none;
    }
  }
</style>

<div
  role="textbox"
  tabindex="0"
  class="editable"
  contenteditable="true"
  onkeydown={handleKeyDown}
  id={id}
  bind:textContent
  {oninput}
>
</div>