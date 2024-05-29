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
    fluidCell.mathField.element.setLatex(fluidCell.getSuggestedName());
    console.log(fluidCell.mathField.statement);
    error = fluidCell.errorCheck();
    $mathCellChanged = true;
    $cells[index] = $cells[index];
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
      {#each FluidCell.FLUIDS as [key, info] (key)}
        <option value={key}>
          {info.menuName}
        </option>
      {/each}
    </select>
  </label>

  <label>
    Output:
    <select
      id={`output-selector-${index}`}
      bind:value={fluidCell.output}
      on:change={handleUpdate}
    >
      {#each FluidCell.FLUID_PROPS_PARAMETERS as [key, info] (key)}
        <option value={key}>
          {info.idName} - {info.description}
        </option>
      {/each}
    </select>
  </label>
  <div>{FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output)?.units}</div>

  <label>
    Input 1:
    <select
      disabled={FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output)?.trivial}
      id={`input1-selector-${index}`}
      bind:value={fluidCell.input1}
      on:change={handleUpdate}
    >
      {#each FluidCell.FLUID_PROPS_PARAMETERS as [key, info] (key)}
        {#if info.input}
          <option value={key}>
            {info.idName} - {info.description}
          </option>
        {/if}
      {/each}
    </select>
  </label>
  <div>{FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output)?.trivial ? "" : 
        FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.input1)?.units}</div>

  <label>
    Input 2:
    <select
      disabled={FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output)?.trivial}
      id={`input2-selector-${index}`}
      bind:value={fluidCell.input2}
      on:change={handleUpdate}
    >
      {#each FluidCell.FLUID_PROPS_PARAMETERS as [key, info] (key)}
        {#if info.input}
          <option value={key}>
            {info.idName} - {info.description}
          </option>
        {/if}
      {/each}
    </select>
  </label>
  <div>{FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output)?.trivial ? "" : 
    FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.input2)?.units}</div>

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
