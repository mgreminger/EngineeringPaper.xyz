<script>
  import { createEventDispatcher } from 'svelte';

  import KeyboardTabs from "./KeyboardTabs.svelte";
  import MathField from "./MathField.svelte";

  let selectedTab = 0;

  const buttons = [
    {
      tabText: "Math", 
      buttons: [
        {buttonText: '\\sqrt x', command: '\\sqrt', write: false},
        {buttonText: '\\frac{x}{y}', command:'/', write: false},
        {buttonText: 'x^y', command:'^', write: false},
        {buttonText: '\\pi', command:'\\pi', write: false},
        {buttonText: '\\ln', command:'\\ln()', write: true},
        {buttonText: '\\log_{10}', command:'\\log()', write: true},
        {buttonText: '\\log_{b}', command:'\\log_{}()', write: true},
      ]}, 
    {
      tabText: "Trig",
      buttons: [
        {buttonText: '\\sin', command: '\\sin()', write: true},
        {buttonText: '\\cos', command: '\\cos()', write: true},
        {buttonText: '\\tan', command: '\\tan()', write: true},
        {buttonText: '\\arcsin', command: '\\arcsin()', write: true},
        {buttonText: '\\arccos', command: '\\arccos()', write: true},
        {buttonText: '\\arctan', command: '\\arctan()', write: true},
        {buttonText: '\\sec', command: '\\sec()', write: true},
        {buttonText: '\\csc', command: '\\csc()', write: true},
        {buttonText: '\\cot', command: '\\cot()', write: true},
        {buttonText: '\\sinh', command: '\\sinh()', write: true},
        {buttonText: '\\cosh', command: '\\cosh()', write: true},
        {buttonText: '\\tanh', command: '\\tanh()', write: true},
      ]
    }
  ]; 

  const dispatch = createEventDispatcher();

	function handleButtonPress(command, write) {
		dispatch('clickButton', {
			command: command,
      write: write
		});
	}

</script>

<style>
  .keyboard {
    display: grid;
    grid-template-columns: repeat(5, min-content);
    grid-auto-flow: row;
    justify-items: stretch;
    align-items: stretch;
  }

  button {
    margin: 0;
  }

</style>

<KeyboardTabs tabs={buttons.map(tab => tab.tabText)} bind:selectedTab >
  <div class="keyboard">
    {#each buttons[selectedTab].buttons as button (button.buttonText)}
      <button on:click={() => handleButtonPress(button.command, button.write)}><MathField latex={button.buttonText}/></button>
    {/each}
  </div>
</KeyboardTabs>