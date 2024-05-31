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

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";

  export let index: number;
  export let fluidCell: FluidCell;

  let error = false;
  let containerDiv: HTMLDivElement;
  let fluidGroups: [string, {category: string, keys: string[]}][] = [];
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
    let previousGroup = "";
    let collector: string[] = [];
    for (const [key, value] of FluidCell.FLUIDS) {
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

  $: if ($activeCell === index) {
      focus();
    }
  
</script>


<style>

  div.math-field {
    display: flex;
    align-items: center;
  }

</style>


<div
  class="container"
  bind:this={containerDiv}
>
  <label>
    Fluid:
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
  </label>

  {#if FluidCell.FLUIDS.get(fluidCell.fluid).longDescription}
    <div>{FluidCell.FLUIDS.get(fluidCell.fluid).longDescription}</div>
  {/if}

  {#if FluidCell.FLUIDS.get(fluidCell.fluid)?.incompressibleMixture}
    <label>
      Concentration:
      <input
        bind:value={fluidCell.incompMixConc}
        min={FluidCell.FLUIDS.get(fluidCell.fluid).minConcentration}
        max={FluidCell.FLUIDS.get(fluidCell.fluid).maxConcentration}
        on:change={handleUpdate}
        step="0.01"
        type="number"
      />  
    </label>
  {/if}

  <label>
    Output:
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
  </label>

  <label>
    Input 1:
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
  </label>

  <label>
    Input 2:
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
  </label>

  {#if fluidCell.fluid === "HumidAir"}
    <label>
      Input 3:
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
    </label>
  {/if}

  <div class="math-field">
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
    {#if fluidCell.mathField.parsingError}
      <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">{fluidCell.mathField.parsingErrorMessage}</span>
        <Error class="error"/>
      </TooltipIcon>
    {/if}
  </div>

  {#if fluidCell.error}
    <div class="error"><Error class="error"/>{fluidCell.errorMessage}</div>
  {/if}
</div>
