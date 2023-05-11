<script lang="ts">
  import { onMount } from "svelte";
  import { onMobile, activeMathField } from "./stores";
  import { renderMathInElement } from "mathlive";
  import type { Button } from "./keyboard/Keyboard";

  export let button: Button

  let buttonElement: HTMLButtonElement;

  onMount(() => {
    renderMathInElement(buttonElement);
  });
</script>

<style>
  button.keyboard {
    font-size: 16px;
    margin: 1px;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    padding: 0px;
    transition: 0.3s;
  }
  
  :global(button.keyboard span) {
    cursor: pointer;
    padding: 0px;
  }

  button.keyboard:hover:not(.mobile) {
    background-color: #ddd;
  }


</style>

<button
  class="keyboard"
  class:mobile={$onMobile}
  bind:this={buttonElement}
  on:click={ () => button.click($activeMathField) }
  style={button.fontSize ? `font-size: ${button.fontSize};` : ''}
  tabindex="-1"
>
  {button.rawText ? button.buttonText : `\\(${button.buttonText}\\)`}
</button>