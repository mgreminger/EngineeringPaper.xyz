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
        {buttonText: '\\ln', command:'\\ln\\left(\\right)', write: true},
        {buttonText: '\\log_{10}', command:'\\log\\left(\\right)', write: true},
        {buttonText: '\\log_{b}', command:'\\log_{}\\left(\\right)', write: true},
      ]}, 
    {
      tabText: "Trig",
      buttons: [
        {buttonText: '\\sin', command: '\\sin\\left(\\right)', write: true},
        {buttonText: '\\cos', command: '\\cos\\left(\\right)', write: true},
        {buttonText: '\\tan', command: '\\tan\\left(\\right)', write: true},
        {buttonText: '\\arcsin', command: '\\arcsin\\left(\\right)', write: true},
        {buttonText: '\\arccos', command: '\\arccos\\left(\\right)', write: true},
        {buttonText: '\\arctan', command: '\\arctan\\left(\\right)', write: true},
        {buttonText: '\\sec', command: '\\sec\\left(\\right)', write: true},
        {buttonText: '\\csc', command: '\\csc\\left(\\right)', write: true},
        {buttonText: '\\cot', command: '\\cot\\left(\\right)', write: true},
        {buttonText: '\\sinh', command: '\\sinh\\left(\\right)', write: true},
        {buttonText: '\\cosh', command: '\\cosh\\left(\\right)', write: true},
        {buttonText: '\\tanh', command: '\\tanh\\left(\\right)', write: true},
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
      <button on:click={() => handleButtonPress(button.command, button.write)}>
        <MathField selectable={false} latex={button.buttonText}/>
      </button>
    {/each}
  </div>
</KeyboardTabs>