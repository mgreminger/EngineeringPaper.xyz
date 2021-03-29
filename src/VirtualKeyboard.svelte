<script>
  import { createEventDispatcher } from 'svelte';

  import KeyboardTabs from "./KeyboardTabs.svelte";
  import MathField from "./MathField.svelte";

  let selectedTab = 0;

  const buttons = [
    {
      tabText: "Math", 
      buttons: [
        {buttonText: '\\sqrt x', command: '\\sqrt'},
        {buttonText: '\\frac{x}{y}', command:'\\frac'},
        {buttonText: 'x^y', command:'^'},
        {buttonText: '\\pi', command:'\\pi'},
        {buttonText: '\\ln', command:'\\ln'},
        {buttonText: '\\log_{10}', command:'\\log'},
        {buttonText: '\\log_{b}(x)', command:'\\log_{}'},
      ]}, 
    {
      tabText: "Trig",
      buttons: [
        {buttonText: '\\sin(x)', command: '\\sin'},
        {buttonText: '\\cos(x)', command: '\\cos'},
        {buttonText: '\\tan(x)', command: '\\tan'},
        {buttonText: '\\asin(x)', command: '\\asin'},
        {buttonText: '\\acos(x)', command: '\\acos'},
        {buttonText: '\\atan(x)', command: '\\atan'},
        {buttonText: '\\cot(x)', command: '\\cot'},
        {buttonText: '\\csc(x)', command: '\\csc'},
        {buttonText: '\\sinh(x)', command: '\\sinh'},
        {buttonText: '\\cosh(x)', command: '\\cosh'},
        {buttonText: '\\tanh(x)', command: '\\tanh'},
      ]
    }
  ]; 

  const dispatch = createEventDispatcher();

	function handleButtonPress(command) {
		dispatch('click', {
			command: command
		});
	}

</script>

<style>
  .keyboard {
    display: grid;
    grid-template-columns: repeat(5, min-content);
    grid-auto-flow: row;
  }

</style>

<KeyboardTabs tabs={buttons.map(tab => tab.tabText)} bind:selectedTab >
  <div class="keyboard">
    {#each buttons[selectedTab].buttons as button}
      <div class="button">
        <button on:click={() => handleButtonPress(button.command)}><MathField latex={button.buttonText}/></button>
      </div>
    {/each}
  </div>
</KeyboardTabs>