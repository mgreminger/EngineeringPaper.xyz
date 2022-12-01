<script lang="ts">
  import { activeMathField } from "./stores";
  import type { Keyboards, Buttons, Button } from "./keyboard/Keyboard";
  import MathField from "./MathField.svelte";
  
  export let keyboards: Keyboards;
  export let nested = false;

  let content: Buttons | Keyboards;

  $: tabs = keyboards.keyboards.map( item => item.tabText );
  $: content = keyboards.keyboards[keyboards.selectedTab].content;

</script>

<style>
  button.keyboard-button {
    margin: 0;
    cursor: pointer;
    padding: 0px;
  }
  
  :global(button.keyboard-button span) {
    cursor: pointer;
    padding: 0px;
  }

  button.keyboard-button:hover {
    background-color: #ddd;
  }

  button.tab-button {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 2px 2px;
    transition: 0.3s;
    margin: 0;
    border-radius: 0;
  }

  button.tab-button:hover {
    background-color: #ddd;
  }

  button.tab-button.selected {
    background-color: #ccc;
  }
  
  div.tab-content {
    display: grid;
    grid-auto-flow: row;
    padding: 2px 2px;
    border: 1px solid #ccc;
    border-top: none;
    height: 100%;
    overflow: auto;
  }

  div.button-row {
    display: grid;
    grid-auto-flow: column;
  }

  div.container {
    display: flex;
    flex-direction: column;
    width: 95vw;
    max-width: 400px;
    height: 180px;
  }



  @media print {
    div.container {
      display: none;
    }
  }
</style>

<div class="container">
  <div class="tabs">
    {#each tabs as tab, i (tab)}
      <button
        class={keyboards.selectedTab === i ? "selected tab-button" : "tab-button"}
        on:click={() => (keyboards.selectedTab = i)}
        on:mousedown={(event) => event.preventDefault()}
      >
        {tab}
      </button>
    {/each}
  </div>

  <div class="tab-content">
    {#if content.type === "Keyboards"}
      <svelte:self keyboards={content} nested={true} />
    {:else }
      {#each content.buttons as buttonRow}
        <div 
          class="button-row"
          style={`grid-template-columns:${buttonRow.map((button) => button.size)
                                                   .reduce((accum, value) => accum+' '+value)};`}
        >
          {#each buttonRow as button (button.id)}
            {#if button.type === "Button"}
              <button
                class="keyboard-button" 
                on:click={() => button.click($activeMathField)}
                on:mousedown={(event) => event.preventDefault()}
              >
                <MathField selectable={false} latex={button.buttonText}/>
              </button>
            {:else}
              <div class="blank"></div>
            {/if}
          {/each}
        </div>
      {/each}
    {/if}
  </div>

</div>

