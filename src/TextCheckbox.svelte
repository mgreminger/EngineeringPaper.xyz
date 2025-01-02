<script lang="ts">
  import type { Snippet } from "svelte";
  import appState from "./stores.svelte";

  interface Props {
    checked: boolean;
    title: string;
    children: Snippet;
    onchange: (arg: Event) => void;
  }

  let {
    checked=$bindable(false),
    title="",
    children,
    onchange
  } = $props();


  function handleKeyboard(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === " " || (event.key === "Enter" && !event.shiftKey && !event[appState.modifierKey]) ) {
      checked = !checked;
      event.preventDefault();
    }
  }
</script>

<style>
  label > input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"]:focus + span.main {
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
  }

  label {
    display: inline;
  }

  span.main {
    border-radius: 1em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    padding-bottom: 0.2em;
    border: solid 1px;
  }

  span.main:active {
    background-color: #ddd !important;
  }

  span.main:hover {
    text-decoration: underline;
  }

  span.main.checked {
    background-color: #ccc;
  }

  span.bullet.notchecked {
    display: none;
  }
</style>


<label {title}>
  <input 
    type="checkbox" 
    bind:checked
    {onchange} 
  />
  <span
    role="checkbox"
    aria-checked={checked}
    tabindex="0"
    onkeydown={handleKeyboard}
    class:checked
    class="main"
  >
    <span
      class="bullet" 
      class:notchecked={!checked}
    >
      &bull;
    </span>
    {@render children()}
  </span>
</label>