<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import appState from "./stores.svelte";

  interface Props {
    id: string;
    textContent: string;
    error: boolean;
    enter: () => void;
    shiftEnter: () => void;
    modifierEnter: () => void;
    input: FormEventHandler<HTMLDivElement>;
  }

  let {
    id,
    textContent = $bindable(),
    error = false,
    enter,
    shiftEnter,
    modifierEnter,
    input
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
    min-width: 8rem;
    width: fit-content;
    border: 1px solid gray;
    border-radius: 2px;
  }

  div.editable {
    margin: 0px 0px 0px 0px;
  }

  div.editable.error:not(:focus) {
    background-color: #f0b9b9;
  }

  @media print {
    div.editable {
      border: none;
    }
  }
</style>

<div
  role="textbox"
  inputmode="decimal"
  tabindex="0"
  class="editable"
  class:error
  contenteditable="true"
  onkeydown={handleKeyDown}
  id={id}
  bind:textContent
  oninput={input}
>
</div>