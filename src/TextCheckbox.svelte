<script lang="ts">
  export let checked = false;
  export let title = "";

  function handleKeyboard(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === " ") {
      checked = !checked;
      event.preventDefault();
    }
  }
</script>

<style>
  label > input[type="checkbox"] {
    display: none;
  }

  label {
    display: inline;
  }

  span {
    border-radius: 1em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    padding-bottom: 0.2em;
    border: solid 1px;
  }

  span:focus {
    box-shadow: #8bd 0 0 1px 2px, inset #6ae 0 0 2px 0;
    border-color: #709ac0;
  }

  span:active {
    background-color: #ddd !important;
  }

  span:hover {
    text-decoration: underline;
  }

  span.checked {
    background-color: #ccc;
  }
</style>


<label {title}>
  <input type="checkbox" bind:checked />
  <span tabindex="0" on:keydown={handleKeyboard} class:checked>
    <slot />
  </span>
</label>