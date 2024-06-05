<script lang="ts">
  import {
    cells,
    activeCell,
    mathCellChanged,
    modifierKey
  } from "./stores";

  import { onMount, tick, createEventDispatcher } from "svelte";

  import FluidCell from "./cells/FluidCell";
  import type { MathField as MathFieldClass } from "./cells/MathField";

  import MathField from "./MathField.svelte";
  import IconButton from "./IconButton.svelte";

  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Copy from "carbon-icons-svelte/lib/Copy.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";

  export let index: number;
  export let fluidCell: FluidCell;

  let error = false;
  let containerDiv: HTMLDivElement;
  let fluidGroups: [string, {category: string, keys: string[]}][] = [];
  let mixtureComponents: [string, string][] = [];
  let outputMenuItems: [string, string][] = [];
  let inputMenuItems: [string, string][] = [];

  export function getMarkdown() {
    return "";
  }

  const dispatch = createEventDispatcher<{
    insertMathCellAfter: {index: number};
    insertInsertCellAfter: {index: number};
  }>();

  onMount(() => {
    if ($activeCell === index) {
      focus();
    }
    getFluidGroups();
    getMenuItems();
    error = fluidCell.errorCheck();
  });

  function focus() {
    if ((containerDiv && !containerDiv.contains(document.activeElement))) {
      const selector: HTMLSelectElement = document.querySelector(`#fluid-selector-${index}`)
      if (selector) {
        selector.focus();
      }
    }
  }

  function parseLatex(latex: string, mathField: MathFieldClass) {
    mathField.parseLatex(latex);
    error = fluidCell.errorCheck();
    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function handleUpdate() {
    clampConcentration();
    getMenuItems();
    fluidCell.mathField.element.setLatex(fluidCell.getSuggestedName());
    error = fluidCell.errorCheck();
    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function getFluidGroups() {
    fluidGroups = [];
    mixtureComponents = [];
    let previousGroup = "";
    let collector: string[] = [];
    for (const [key, value] of FluidCell.FLUIDS) {
      if (value.compressibleMixtureComponent) {
        mixtureComponents.push([key, value.menuName]);
      }

      if (value.category !== previousGroup) {
        previousGroup = value.category;
        collector = [];
        fluidGroups.push([key, {category: value.category, keys: collector}]);
      }
      collector.push(key);
    }
  }

  function getMenuItems() {
    inputMenuItems = [];
    outputMenuItems = [];

    if (fluidCell.fluid === "HumidAir") {
      for (const [key, parameter] of FluidCell.FLUID_HA_PROPS_PARAMETERS) {
        if (parameter.output) {
          if (parameter.units) {
            outputMenuItems.push([key, `${parameter.idName} - ${parameter.description} - [${parameter.units}]`]);
          } else {
            outputMenuItems.push([key, `${parameter.idName} - ${parameter.description}`]);
          }
        }
        if (parameter.input) {
          if (parameter.units) {
            inputMenuItems.push([key, `${parameter.idName} - ${parameter.description} - [${parameter.units}]`]);
          } else {
            inputMenuItems.push([key, `${parameter.idName} - ${parameter.description}`]);
          }
        }
      }

      if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.has(fluidCell.output) ||
          !FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.output).output ||
          !FluidCell.FLUID_HA_PROPS_PARAMETERS.has(fluidCell.input1) ||
          !FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.input1).input ||
          !FluidCell.FLUID_HA_PROPS_PARAMETERS.has(fluidCell.input2) ||
          !FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.input2).input ||
          !FluidCell.FLUID_HA_PROPS_PARAMETERS.has(fluidCell.input3) ||
          !FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.input3).input) {
        fluidCell.output = 'H';
        fluidCell.input1 = 'T';
        fluidCell.input2 = 'W';
        fluidCell.input3 = 'P';
      }

    } else if (FluidCell.FLUIDS.get(fluidCell.fluid).incompressible) {
      for (const [key, parameter] of FluidCell.FLUID_PROPS_PARAMETERS) {
        if (parameter.incompressibleOutput) {
          if (parameter.units) {
            outputMenuItems.push([key, `${parameter.idName} - ${parameter.description} - [${parameter.units}]`]);
          } else {
            outputMenuItems.push([key, `${parameter.idName} - ${parameter.description}`]);
          }
        }
        if (parameter.incompressibleInput) {
          if (parameter.units) {
            inputMenuItems.push([key, `${parameter.idName} - ${parameter.description} - [${parameter.units}]`]);
          } else {
            inputMenuItems.push([key, `${parameter.idName} - ${parameter.description}`]);
          }
        }
      }

      if (!FluidCell.FLUID_PROPS_PARAMETERS.has(fluidCell.output) ||
          !FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output).incompressibleOutput ||
          !FluidCell.FLUID_PROPS_PARAMETERS.has(fluidCell.input1) ||
          !FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.input1).incompressibleInput ||
          !FluidCell.FLUID_PROPS_PARAMETERS.has(fluidCell.input2) ||
          !FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.input2).incompressibleInput) {
        fluidCell.output = 'D';
        fluidCell.input1 = 'T';
        fluidCell.input2 = 'P';
      }

    } else {
      for (const [key, parameter] of FluidCell.FLUID_PROPS_PARAMETERS) {
        if (parameter.output) {
          if (parameter.units) {
            outputMenuItems.push([key, `${parameter.idName} - ${parameter.description} - [${parameter.units}]`]);
          } else {
            outputMenuItems.push([key, `${parameter.idName} - ${parameter.description}`]);
          }
        }
        if (parameter.input) {
          if (parameter.units) {
            inputMenuItems.push([key, `${parameter.idName} - ${parameter.description} - [${parameter.units}]`]);
          } else {
            inputMenuItems.push([key, `${parameter.idName} - ${parameter.description}`]);
          }
        }
      }

      if (!FluidCell.FLUID_PROPS_PARAMETERS.has(fluidCell.output) ||
          !FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output).output ||
          !FluidCell.FLUID_PROPS_PARAMETERS.has(fluidCell.input1) ||
          !FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.input1).input ||
          !FluidCell.FLUID_PROPS_PARAMETERS.has(fluidCell.input2) ||
          !FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.input2).input) {
        fluidCell.output = 'D';
        fluidCell.input1 = 'T';
        fluidCell.input2 = 'P';
      }

    }
  }

  function clampConcentration() {
    if (FluidCell.FLUIDS.get(fluidCell.fluid)?.incompressibleMixture) {
      if (fluidCell.incompMixConc < FluidCell.FLUIDS.get(fluidCell.fluid).minConcentration) {
        fluidCell.incompMixConc = FluidCell.FLUIDS.get(fluidCell.fluid).minConcentration;
      } else if (fluidCell.incompMixConc > FluidCell.FLUIDS.get(fluidCell.fluid).maxConcentration) {
        fluidCell.incompMixConc = FluidCell.FLUIDS.get(fluidCell.fluid).maxConcentration;
      }
    }
  }

  function deleteRow(index: number) {
    fluidCell.customMixture = [...fluidCell.customMixture.slice(0,index),
                               ...fluidCell.customMixture.slice(index+1)];
    handleUpdate();
  }

  function addRow() {
    const total = fluidCell.customMixture.reduce( (accum, value) => accum + value.moleFraction, 0.0);
    const moleFraction = 1.0-total > 0.0 ? 1.0-total : 0.0;

    fluidCell.customMixture = [...fluidCell.customMixture, {fluid: "", moleFraction}];
    handleUpdate();
  }

  $: if ($activeCell === index) {
      focus();
    }
  
</script>


<style>

  div.row {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  div.container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border: solid gray 1px;
    padding: 10px;
    border-radius: 2px;
  }

  label {
    padding-top: 4px;
    padding-bottom: 4px;
  }

</style>


<div
  class="container"
  bind:this={containerDiv}
>
  <div class="row">
    <div>
      <label for={`fluid-selector-${index}`}>
        Fluid:
      </label>
      <select
        id={`fluid-selector-${index}`}
        bind:value={fluidCell.fluid}
        on:change={handleUpdate}
      >
        {#each fluidGroups as [key, value] (key)}
          <optgroup label={value.category}>
            {#each value.keys as key (key)}
              <option value={key}>
                {FluidCell.FLUIDS.get(key).menuName}
              </option>
            {/each}
          </optgroup>
        {/each}
      </select>
    </div>

    {#if FluidCell.FLUIDS.get(fluidCell.fluid)?.incompressibleMixture}
      <div>
        <label for={`concentration-input-${index}`}>
          Concentration:
        </label>
        <input
          bind:value={fluidCell.incompMixConc}
          on:change={handleUpdate}
          id={`concentration-input-${index}`}
          min={FluidCell.FLUIDS.get(fluidCell.fluid).minConcentration}
          max={FluidCell.FLUIDS.get(fluidCell.fluid).maxConcentration}
          step="0.01"
          type="number"
        />  
      </div>
    {/if}
  </div>

  {#if FluidCell.FLUIDS.get(fluidCell.fluid).longDescription}
    <div>{FluidCell.FLUIDS.get(fluidCell.fluid).longDescription}</div>
  {/if}

  {#if fluidCell.fluid === "CustomMixture"}
    {#each fluidCell.customMixture as component, i}
      <div class="row">
        <div>
          <label for={`fluid-component-selector-${index}-${i}`}>
            Mixture Component {i+1}:
          </label>
          <select
            id={`fluid-component-selector-${index}-${i}`}
            bind:value={component.fluid}
            on:change={handleUpdate}
          >
            {#each mixtureComponents as [key, description] (key)}
              <option value={key}>
                {description}
              </option>
            {/each}
          </select>
        </div>
        
        <div>
          <label for={`fluid-component-mole-fraction-${index}-${i}`}>
            Mole Fraction {i+1}:
          </label>
          <div class="row">
            <input
              id={`fluid-component-mole-fraction-${index}-${i}`}
              bind:value={component.moleFraction}
              on:change={handleUpdate}
              min="0.0"
              max="1.0"
              step="0.01"
              type="number"
            />
            {#if fluidCell.customMixture.length > 2}
              <IconButton
                on:click={() => deleteRow(i)}
                title="Delete Mixture Component"
                id={`delete-row-${index}-${i}`}
              >
                <RowDelete />
              </IconButton>
            {/if}
            {#if i === fluidCell.customMixture.length - 1}
              <IconButton
                on:click={addRow}
                id={`add-row-${index}`}
                title="Add Mixture Component"
              >
                <Add />
              </IconButton>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  {/if}

  <div>
    <label for={`output-selector-${index}`}>
      Output:
    </label>
    <select
      id={`output-selector-${index}`}
      bind:value={fluidCell.output}
      on:change={handleUpdate}
    >
      {#each outputMenuItems as [key, description] (key)}
        <option value={key}>
          {description}
        </option>
      {/each}
    </select>
  </div>
  

  <div>
    <label for={`input1-selector-${index}`}>
      Input 1:
    </label>
    <select
      disabled={FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output)?.trivial}
      id={`input1-selector-${index}`}
      bind:value={fluidCell.input1}
      on:change={handleUpdate}
    >
      {#each inputMenuItems as [key, description] (key)}
        <option value={key}>
          {description}
        </option>
      {/each}
    </select>
  </div>
  
  <div>
    <label for={`input2-selector-${index}`}>
      Input 2:
    </label>
    <select
      disabled={FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output)?.trivial}
      id={`input2-selector-${index}`}
      bind:value={fluidCell.input2}
      on:change={handleUpdate}
    >
      {#each inputMenuItems as [key, description] (key)}
        <option value={key}>
          {description}
        </option>
      {/each}
    </select>
  </div>

  <div>
    {#if fluidCell.fluid === "HumidAir"}
      <label for={`input3-selector-${index}`}>
        Input 3:
      </label>
      <select
        id={`input3-selector-${index}`}
        bind:value={fluidCell.input3}
        on:change={handleUpdate}
      >
        {#each inputMenuItems as [key, description] (key)}
          <option value={key}>
            {description}
          </option>
        {/each}
      </select>
    {/if}
  </div>

  <div>
    <label for={`fluid-symbol-${index}`}>
      {FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output)?.trivial ? "Constant Name:" : "Function Name:"}
    </label>
    <div id={`fluid-symbol-${index}`} class="row">
      <MathField
        editable={true}
        on:update={(e) => parseLatex(e.detail.latex, fluidCell.mathField)}
        on:enter={() => dispatch("insertMathCellAfter", {index: index})}
        on:shiftEnter={() => dispatch("insertMathCellAfter", {index: index})}
        on:modifierEnter={() => dispatch("insertInsertCellAfter", {index: index})}
        mathField={fluidCell.mathField}
        parsingError={fluidCell.mathField.parsingError}
        bind:this={fluidCell.mathField.element}
        latex={fluidCell.mathField.latex}
      />
      {#if fluidCell.error}
        <div class="error"><Error class="error"/>{fluidCell.errorMessage}</div>
      {:else}
        <IconButton
          on:click={() => fluidCell.mathField.element?.getMathField()?.executeCommand('copyToClipboard')}
          title={`Copy ${FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output)?.trivial ? "Constant" : "Function"} Name to Clipboard`}
          id={`copy-fluid-symbol-name-${index}`}
        >
          <Copy />
        </IconButton>
        <input
          id={`use-fluid-name-in-symbol-${index}`}
          type="checkbox"
          bind:checked={fluidCell.useFluidInName}
          on:change={handleUpdate}
        />
        <label for={`use-fluid-name-in-symbol-${index}`}>
          {`Use fluid name in ${FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output)?.trivial ? "constant" : "function"} name`}
        </label>
      {/if}
    </div>
  </div>

</div>
