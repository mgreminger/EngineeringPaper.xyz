<script lang="ts">
  import { onMount } from "svelte";
  import { onMobile, activeMathField } from "./stores";
  import { renderMathInElement } from "mathlive";
  import type { Button } from "./keyboard/Keyboard.svelte";
  import type { MathField } from "./cells/MathField";

  interface Props {
    button: Button;
    flex?: boolean;
    customMatrix?: (arg: {detail: {targetMathField: MathField}}) => void;
  }

  let { button, flex = false, customMatrix }: Props = $props();

  let buttonElement: HTMLButtonElement;

  onMount(() => {
    renderMathInElement(buttonElement);
  });

  function handleButtonClick() {
    const event = button.click($activeMathField);
    if (event === "customMatrix") {
      customMatrix?.( {detail: {targetMathField: $activeMathField}} );
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
  onclick={handleButtonClick}
  style={button.fontSize ? `font-size: ${button.fontSize};` : ''}
  tabindex="-1"
>
  {button.rawText ? button.buttonText : `\\(${button.buttonText}\\)`}
</button>