<script lang="ts">
  import { modifierKey } from "./stores";

  export let checked = false;
  export let title = "";
</script>

<style>
  label > input[type="checkbox"] {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
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
  <input type="checkbox" bind:checked />
  <span
    class:checked
    class="main"
  >
    <span class="bullet" class:notchecked={!checked}>&bull;</span>
    <slot />
  </span>
</label>