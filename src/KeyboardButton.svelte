<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { onMobile, activeMathField } from "./stores";
  import { renderMathInElement } from "mathlive";
  import type { Button } from "./keyboard/Keyboard";
  import type { MathField } from "./cells/MathField";

  export let button: Button;
  export let flex = false;

  let buttonElement: HTMLButtonElement;

  const dispatchCustomMatrix = createEventDispatcher<{customMatrix: {targetMathField: MathField}}>();

  onMount(() => {
    renderMathInElement(buttonElement);
  });

  function handleButtonClick() {
    const event = button.click($activeMathField);
    if (event === "customMatrix") {
      dispatchCustomMatrix("customMatrix", {targetMathField: $activeMathField});
    }
  }

</script>

<style>
  button.keyboard {
    font-size: 16px;
    margin: 1px;
    border-radius: 4px;
    background-color: white;
    padding: 0px;
    transition: 0.3s;
  }
  button.flex {
    flex: 1;
  }
  
  :global(button.keyboard span) {
    padding: 0px;
  }

  button.keyboard:hover:not(.mobile) {
    background-color: #ddd;
  }


</style>

<button
  class="keyboard"
  class:mobile={$onMobile}
  class:flex
  bind:this={buttonElement}
  on:click={handleButtonClick}
  style={button.fontSize ? `font-size: ${button.fontSize};` : ''}
  tabindex="-1"
>
  {button.rawText ? button.buttonText : `\\(${button.buttonText}\\)`}
</button>