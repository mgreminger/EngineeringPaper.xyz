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
        {buttonText: 'x\\cdot y', command:'\\cdot', write: false},
        {buttonText: '\\frac{x}{y}', command:'/', write: false},
        {buttonText: 'x^y', command:'^', write: false},
        {buttonText: '\\pi', command:'\\pi', write: false},
        {buttonText: '\\ln', command:'\\ln\\left([selection]\\right)', write: true},
        {buttonText: '\\log_{10}', command:'\\log\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\log_{b}', command:'\\log_{}\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\mathrm{max}', command:'\\mathrm{max}\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\mathrm{min}', command:'\\mathrm{min}\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\left|x\\right|', command:'\\left|\\right|', write: true, positionLeft: 1},
        {buttonText: 'x_a', command:'_', write: false},
        {buttonText: '\\le', command:'\\le', write: false},
        {buttonText: '<', command:'<', write: false},        
        {buttonText: '>', command:'>', write: false},
        {buttonText: '\\ge', command:'\\ge', write: false},
        {buttonText: '\\approx', command:'\\approx', write: false},
      ]
    }, 
    {
      tabText: "Trig",
      buttons: [
        {buttonText: '\\sin', command: '\\sin\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\cos', command: '\\cos\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\tan', command: '\\tan\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\arcsin', command: '\\arcsin\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\arccos', command: '\\arccos\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\arctan', command: '\\arctan\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\sec', command: '\\sec\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\csc', command: '\\csc\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\cot', command: '\\cot\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\sinh', command: '\\sinh\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\cosh', command: '\\cosh\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\tanh', command: '\\tanh\\left([selection]\\right)', write: true, positionLeft: 1},
      ]
    },
    {
      tabText: "Imag",
      buttons: [
        {buttonText: 'i', command:'i', write: false},
        {buttonText: '\\mathrm{real}', command:'\\mathrm{real}\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\mathrm{imag}', command:'\\mathrm{imag}\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\mathrm{conj}', command:'\\mathrm{conj}\\left([selection]\\right)', write: true, positionLeft: 1},
        {buttonText: '\\mathrm{angle}', command:'\\mathrm{angle}\\left([selection]\\right)', write: true, positionLeft: 1},
      ]
    },
    {
      tabText: "Calc",
      buttons: [
        {buttonText: '\\frac{\\mathrm{d}}{\\mathrm{d}x}',
         command: '\\frac{\\mathrm{d}}{\\mathrm{d}\\left(\\right)}\\left([selection]\\right)',
         write: true,
         positionLeft: 1
        },
        {buttonText: '\\frac{\\mathrm{d}^{2}}{\\mathrm{d}x^{2}}',
         command: '\\frac{\\mathrm{d}^{2}}{\\mathrm{d}\\left(\\right)^{2}}\\left([selection]\\right)',
         write: true,
         positionLeft: 1
        },
        {buttonText: '\\frac{\\mathrm{d}^{3}}{\\mathrm{d}x^{3}}',
         command: '\\frac{\\mathrm{d}^{3}}{\\mathrm{d}\\left(\\right)^{3}}\\left([selection]\\right)',
         write: true,
         positionLeft: 1
        },
        {buttonText: '\\int_{a}^{b}\\mathrm{d}x',
         command: '\\int _{ }^{ }\\left([selection]\\right)\\mathrm{d}\\left(\\right)',
         write: true,
         positionLeft: 6
        }
      ]
    },
    {
      tabText: "αβγ", 
      buttons: [
        {buttonText: '\\alpha', command: '\\alpha', write: false},
        {buttonText: '\\beta', command: '\\beta', write: false},
        {buttonText: '\\gamma', command: '\\gamma', write: false},
        {buttonText: '\\delta', command: '\\delta', write: false},
        {buttonText: '\\epsilon', command: '\\epsilon', write: false},
        {buttonText: '\\zeta', command: '\\zeta', write: false},
        {buttonText: '\\eta', command: '\\eta', write: false},
        {buttonText: '\\theta', command: '\\theta', write: false},
        {buttonText: '\\iota', command: '\\iota', write: false},
        {buttonText: '\\kappa', command: '\\kappa', write: false},
        {buttonText: '\\lambda', command: '\\lambda', write: false},
        {buttonText: '\\mu', command: '\\mu', write: false},
        {buttonText: '\\xi', command: '\\xi', write: false},
        {buttonText: '\\pi', command: '\\pi', write: false},
        {buttonText: '\\rho', command: '\\rho', write: false},
        {buttonText: '\\sigma', command: '\\sigma', write: false},
        {buttonText: '\\tau', command: '\\tau', write: false},
        {buttonText: '\\upsilon', command: '\\upsilon', write: false},
        {buttonText: '\\phi', command: '\\phi', write: false},
        {buttonText: '\\chi', command: '\\chi', write: false},
        {buttonText: '\\psi', command: '\\psi', write: false},
        {buttonText: '\\omega', command: '\\omega', write: false},
        {buttonText: '\\Gamma', command: '\\Gamma', write: false},
        {buttonText: '\\Delta', command: '\\Delta', write: false},
        {buttonText: '\\Theta', command: '\\Theta', write: false},
        {buttonText: '\\Lambda', command: '\\Lambda', write: false},
        {buttonText: '\\Xi', command: '\\Xi', write: false},
        {buttonText: '\\Pi', command: '\\Pi', write: false},
        {buttonText: '\\Sigma', command: '\\Sigma', write: false},
        {buttonText: '\\Upsilon', command: '\\Upsilon', write: false},
        {buttonText: '\\Phi', command: '\\Phi', write: false},
        {buttonText: '\\Psi', command: '\\Psi', write: false},
        {buttonText: '\\Omega', command: '\\Omega', write: false},
      ]
    }, 
  ]; 

  const dispatch = createEventDispatcher();

	function handleButtonPress(button) {
		dispatch('clickButton', {
			command: button.command,
      write: button.write,
      positionLeft: button.positionLeft
		});
	}

</script>

<style>
  .keyboard {
    display: grid;
    grid-template-columns: repeat(6, min-content);
    grid-auto-flow: row;
    justify-items: stretch;
    align-items: stretch;
  }

  button {
    margin: 0;
    cursor: pointer;
  }
  

  button:hover {
    background-color: #ddd;
  }

  :global(.keyboard button *) {
    cursor: pointer;
  }

</style>

<KeyboardTabs tabs={buttons.map(tab => tab.tabText)} bind:selectedTab >
  <div class="keyboard">
    {#each buttons[selectedTab].buttons as button (button.buttonText)}
      <button
        class="key"
        on:click={() => handleButtonPress(button)}
        on:mousedown={(event) => event.preventDefault()}
      >
        <MathField selectable={false} latex={button.buttonText}/>
      </button>
    {/each}
  </div>
</KeyboardTabs>