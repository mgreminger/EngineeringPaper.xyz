<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { modifierKey} from "./stores";

  export let id: string;
  export let textContent: string;
  export let error = false;

  const dispatch = createEventDispatcher<{
    enter: null;
    shiftEnter: null;
    modifierEnter: null;
  }>();

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key == 'Enter') {
      e.preventDefault();
      if(e.shiftKey) {
        dispatch('shiftEnter');
      } else if(e[$modifierKey]) {
        dispatch('modifierEnter');
      } else {
        dispatch('enter');
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
  on:keydown={handleKeyDown}
  id={id}
  bind:textContent
  on:input
>
</div>