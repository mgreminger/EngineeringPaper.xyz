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
  div.tabs:not(.nested) {
    border-radius: 6px 6px 0px 0px;
    border: 1px solid #ccc;
    border-bottom: none;
  }

  button.keyboard {
    margin: 1px;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    padding: 0px;
  }
  
  :global(button.keyboard span) {
    cursor: pointer;
    padding: 0px;
  }

  button.keyboard:hover {
    background-color: #ddd;
  }

  button.tab {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 6px 6px;
    transition: 0.3s;
    margin: 0;
    border-radius: 6px 6px 0px 0px;
  }

  button.tab.nested {
    padding: 4px 4px;
  }

  button.tab:hover {
    background-color: #ddd;
  }

  button.tab.selected {
    background-color: #ccc;
  }
  
  div.tab-content {
    display: grid;
    grid-auto-flow: row;
    border: 1px solid #ccc;
    border-radius: 0px 0px 6px 6px;
    height: 100%;
    padding: 1px;
  }

  div.tab-content.nested {
    padding: 0px;
    border: none;
    border-radius: 0px;
    overflow: auto;
  }

  div.button-row {
    display: grid;
    grid-auto-flow: column;
  }

  div.container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    max-width: 400px;
    padding: 10px 0px;
  }

  div.container:not(.nested) {
    overflow-y: auto;
  }

  div.container.nested {
    height: 100%;
    width: 100%;
    min-width: 0px;
    padding: 0px;
  }

  @media print {
    div.container {
      display: none;
    }
  }
</style>

<div class="container" class:nested>
  <div class="tabs" class:nested>
    {#each tabs as tab, i (tab)}
      <button
        class="tab"
        class:nested
        class:selected={keyboards.selectedTab === i}
        on:click={() => (keyboards.selectedTab = i)}
        tabindex="-1"
      >
        {tab}
      </button>
    {/each}
  </div>

  <div class="tab-content" class:nested>
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
                class="keyboard" 
                on:click={() => button.click($activeMathField)}
                style={button.fontSize ? `font-size: ${button.fontSize};` : ''}
                tabindex="-1"
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

