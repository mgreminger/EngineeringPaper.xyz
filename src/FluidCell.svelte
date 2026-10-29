<script lang="ts">
  import appState from "./stores.svelte";

  import { unit } from 'mathjs';

  import { onMount } from "svelte";

  import FluidCell, { type FluidFunction } from "./cells/FluidCell.svelte";

  import MathField from "./MathField.svelte";
  import IconButton from "./IconButton.svelte";

  import { TooltipIcon } from "carbon-components-svelte";

  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Copy from "carbon-icons-svelte/lib/Copy.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import { getInitialParsingState } from "./parser/utility";
  import type { FluidConfig } from "./sheet/Sheet";
  import type { AssignmentStatement } from "./parser/types";
  import type { Statement, SubQueryStatement } from "./parser/types";
  import type { CellStatements } from "./types";
  import type { SystemDefinition } from "./cells/SystemCell.svelte";
  import type { CodeCellFunction } from "./cells/CodeCell.svelte";
  import { gridDetector, type GridInterpolationFunction, type InterpolationFunction } from "./cells/DataTableCell.svelte";

  interface Props {
    index: number;
    fluidCell: FluidCell;
    mathCellChanged: () => void;
    triggerSaveNeeded: (pendingMathCellChange?: boolean) => void;
  }

  let {
    index,
    fluidCell,
    mathCellChanged,
    triggerSaveNeeded
  }: Props = $props();

  let containerDiv: HTMLDivElement;
  let fluidGroups: {category: string, keys: string[]}[] = $state([]);
  let mixtureComponents: [string, string][] = $state([]);
  let outputMenuItems: {category: string, items: [string, string][]}[] = $state([]);
  let inputMenuItems: {category: string, items: [string, string][]}[] = $state([]);

  let fluidConfig = $derived(fluidCell.useSheetFluid ? appState.config.fluidConfig : fluidCell.fluidConfig);

  let parsingState = $state(getInitialParsingState());

  let mathFieldElement: MathField =  $state();

  let cellStatements: CellStatements = $derived.by(() => {
    const statements: (Statement | SubQueryStatement)[] = [];
    const endStatements: (Statement | SubQueryStatement)[] = [];
    const subQueries: Map<string,SubQueryStatement> = new Map();
    const systemDefinitions: SystemDefinition[] = [];
    const fluidFunctions: FluidFunction[] = [];
    const codeCellFunctions: CodeCellFunction[] = [];
    const interpolationFunctions: (InterpolationFunction | GridInterpolationFunction)[] = [];

    const {fluidFunction, statement} = getFluidFunction(appState.config.fluidConfig);
    if (fluidFunction) {
      fluidFunctions.push(fluidFunction);
      if (statement) {
        endStatements.push(statement);
      }
    }

    return {
      statements,
      endStatements,
      subQueries,
      systemDefinitions,
      fluidFunctions,
      codeCellFunctions,
      interpolationFunctions,
    };
  });

  export function getParsePending() {
    return parsingState.parsePending;
  }

  export function getParsingError() {
    return fluidCell.error;
  }

  export function getCellStatements() {
    return cellStatements;
  }

  export function getMarkdown(centerEquations: boolean) {
    return "";
  }

  onMount(() => {
    if (appState.activeCell === index) {
      focus();
    }
    getFluidGroups();
    getMenuItems();
    errorCheck(appState.config.fluidConfig);
  });

  function focus() {
    if ((containerDiv && !containerDiv.contains(document.activeElement))) {
      const selector: HTMLSelectElement = document.querySelector(`#fluid-selector-${index}`)
      if (selector) {
        selector.focus();
      }
    }
  }

  async function handleLatexUpdate() {
    errorCheck(appState.config.fluidConfig);
  }

  function handleUpdate() {
    clampConcentration();
    getMenuItems();
    fluidCell.nameLatex = fluidCell.getSuggestedName(appState.config.fluidConfig);
    errorCheck(appState.config.fluidConfig);
    appState.cells[index] = appState.cells[index];

    triggerSaveNeeded();
    mathCellChanged();
  }

  function handleFluidConfigUpdate() {
    if (fluidCell.useSheetFluid && fluidCell.useFluidInName) {
      fluidCell.useFluidInName = false;
    }

    handleUpdate();
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
        fluidGroups.push({category: value.category, keys: collector});
      }
      collector.push(key);
    }
  }

  function getMenuItems() {
    inputMenuItems = [];
    outputMenuItems = [];

    let previousOutputGroup = "";
    let outputCollector: [string, string][] = [];
    let previousInputGroup = "";
    let inputCollector: [string, string][] = [];

    if (fluidConfig.fluid === "HumidAir") {
      for (const [key, category] of FluidCell.FLUID_HA_PROPS_PARAMETERS_ORDER) {
        const parameter = FluidCell.FLUID_HA_PROPS_PARAMETERS.get(key);
        if (parameter.output) {
          if (category !== previousOutputGroup) {
            previousOutputGroup = category;
            outputCollector = [];
            outputMenuItems.push({category: category, items: outputCollector})
          }
          if (parameter.units) {
            outputCollector.push([key, `${parameter.idName} - ${parameter.description} - [${parameter.units}]`]);
          } else {
            outputCollector.push([key, `${parameter.idName} - ${parameter.description}`]);
          }
        }
        if (parameter.input) {
          if (category !== previousInputGroup) {
            previousInputGroup = category;
            inputCollector = [];
            inputMenuItems.push({category: category, items: inputCollector})
          }
          if (parameter.units) {
            inputCollector.push([key, `${parameter.idName} - ${parameter.description} - [${parameter.units}]`]);
          } else {
            inputCollector.push([key, `${parameter.idName} - ${parameter.description}`]);
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

    } else if (FluidCell.FLUIDS.get(fluidConfig.fluid).incompressible) {
      for (const [key, category] of FluidCell.FLUID_PROPS_PARAMETERS_ORDER) {
        const parameter = FluidCell.FLUID_PROPS_PARAMETERS.get(key);
        if (parameter.incompressibleOutput) {
          if (category !== previousOutputGroup) {
            previousOutputGroup = category;
            outputCollector = [];
            outputMenuItems.push({category: category, items: outputCollector})
          }
          if (parameter.units) {
            outputCollector.push([key, `${parameter.idName} - ${parameter.description} - [${parameter.units}]`]);
          } else {
            outputCollector.push([key, `${parameter.idName} - ${parameter.description}`]);
          }
        }
        if (parameter.incompressibleInput) {
          if (category !== previousInputGroup) {
            previousInputGroup = category;
            inputCollector = [];
            inputMenuItems.push({category: category, items: inputCollector})
          }
          if (parameter.units) {
            inputCollector.push([key, `${parameter.idName} - ${parameter.description} - [${parameter.units}]`]);
          } else {
            inputCollector.push([key, `${parameter.idName} - ${parameter.description}`]);
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
      for (const [key, category] of FluidCell.FLUID_PROPS_PARAMETERS_ORDER) {
        const parameter = FluidCell.FLUID_PROPS_PARAMETERS.get(key);
        if (parameter.output) {
          if (category !== previousOutputGroup) {
            previousOutputGroup = category;
            outputCollector = [];
            outputMenuItems.push({category: category, items: outputCollector})
          }
          if (parameter.units) {
            outputCollector.push([key, `${parameter.idName} - ${parameter.description} - [${parameter.units}]`]);
          } else {
            outputCollector.push([key, `${parameter.idName} - ${parameter.description}`]);
          }
        }
        if (parameter.input) {
          if (category !== previousInputGroup) {
            previousInputGroup = category;
            inputCollector = [];
            inputMenuItems.push({category: category, items: inputCollector})
          }
          if (parameter.units) {
            inputCollector.push([key, `${parameter.idName} - ${parameter.description} - [${parameter.units}]`]);
          } else {
            inputCollector.push([key, `${parameter.idName} - ${parameter.description}`]);
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
    if (FluidCell.FLUIDS.get(fluidConfig.fluid)?.incompressibleMixture) {
      if (fluidConfig.incompMixConc < FluidCell.FLUIDS.get(fluidConfig.fluid).minConcentration) {
        fluidConfig.incompMixConc = FluidCell.FLUIDS.get(fluidConfig.fluid).minConcentration;
      } else if (fluidConfig.incompMixConc > FluidCell.FLUIDS.get(fluidConfig.fluid).maxConcentration) {
        fluidConfig.incompMixConc = FluidCell.FLUIDS.get(fluidConfig.fluid).maxConcentration;
      }
    }
  }


  function errorCheck(sheetFluidConfig: FluidConfig) {
    const fluidConfig = fluidCell.useSheetFluid ? sheetFluidConfig : fluidCell.fluidConfig;

    const errors: string[] = [];

    if (parsingState.parsingError) {
      if (FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output)?.trivial) {
        errors.push("Invalid constant name");
      } else {
        errors.push("Invalid function name");
      }
    }

    if (!FluidCell.FLUIDS.has(fluidConfig.fluid)) {
      errors.push(`Unknown fluid ${fluidConfig.fluid}`);
    } else if (fluidConfig.fluid !== "HumidAir") {
      if (!FluidCell.FLUID_PROPS_PARAMETERS.has(fluidCell.output)) {
        errors.push(`Unknown output ${fluidCell.output}`);
      } else if (!FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output).output) {
        errors.push(`${FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output).idName} cannot be used as an output`);
      } else {
        const output = FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output);

        if (FluidCell.FLUIDS.get(fluidConfig.fluid).incompressible && output &&
            !output.incompressibleOutput) {
          errors.push(`Output ${fluidCell.output} is not valid for incompressible fluid model`);
        }

        if (!output.trivial) {
          // 2 unique and valid inputs are required
          if (fluidCell.input1 === fluidCell.input2) {
            errors.push("Two unique inputs are required");
          }
          if (fluidCell.input1 === fluidCell.output) {
            errors.push("Input 1 must differ from the output");
          }
          if (fluidCell.input2 === fluidCell.output) {
            errors.push("Input 2 must differ from the output");
          }
          if (!FluidCell.FLUID_PROPS_PARAMETERS.has(fluidCell.input1)) {
            errors.push(`Unknown input ${fluidCell.input1}`)
          } else if (!FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.input1).input) {
            errors.push(`${FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.input1).idName} cannot be used as an input`);
          }
          if (!FluidCell.FLUID_PROPS_PARAMETERS.has(fluidCell.input2)) {
            errors.push(`Unknown input ${fluidCell.input2}`)
          } else if (!FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.input2).input) {
            errors.push(`${FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.input2).idName} cannot be used as an input`);
          }
          if (FluidCell.FLUIDS.get(fluidConfig.fluid).incompressible) {
            if (!FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.input1)?.incompressibleInput) {
              errors.push(`Input 1 ${fluidCell.input1} is not valid for incompressible fluid model`);
            }
            if (!FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.input2)?.incompressibleInput) {
              errors.push(`Input 2 ${fluidCell.input2} is not valid for incompressible fluid model`);
            }
          }
        }
      }

      if (FluidCell.FLUIDS.get(fluidConfig.fluid).incompressibleMixture) {
        if (typeof fluidConfig.incompMixConc !== "number") {
          errors.push('Concentration must be a number');
        } else if (fluidConfig.incompMixConc < FluidCell.FLUIDS.get(fluidConfig.fluid).minConcentration) {
          errors.push(`Concentration must be greater than or equal to ${FluidCell.FLUIDS.get(fluidConfig.fluid).minConcentration}`);
        } else if (fluidConfig.incompMixConc > FluidCell.FLUIDS.get(fluidConfig.fluid).maxConcentration) {
          errors.push(`Concentration must be less than or equal to ${FluidCell.FLUIDS.get(fluidConfig.fluid).maxConcentration}`);
        }
      }

      if (fluidConfig.fluid === 'CustomMixture') {
        const total = fluidConfig.customMixture.reduce( (accum, value) => accum + value.moleFraction, 0.0);
        if (Math.abs(total - 1.0) > 1.0e-6) {
          errors.push('All mole fractions must add up to 1.0 for a user defined mixture');
        }

        if ((new Set(fluidConfig.customMixture.map(value => value.fluid))).size < fluidConfig.customMixture.length) {
          errors.push('Duplicate components are not allowed for user defined mixture');
        }

        for (const {fluid, moleFraction} of fluidConfig.customMixture) {
          if (!FluidCell.FLUIDS.has(fluid)) {
            errors.push(`Unknown fluid ${fluid} in custom mixture`);
          } else if (!FluidCell.FLUIDS.get(fluid).compressibleMixtureComponent) {
            errors.push(`Invalid fluid ${fluid} in custom mixture`);
          }
        }
      }

    } else {
      if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.has(fluidCell.output)) {
        errors.push(`Unknown output ${fluidCell.output}`);
      } else if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.output).output) {
        errors.push(`${FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.output).idName} cannot be used as an output`);
      } else {
        const output = FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.output);

        // 3 unique and valid inputs are required
        if (fluidCell.input1 === fluidCell.input2 || fluidCell.input1 === fluidCell.input3 ||
            fluidCell.input2 === fluidCell.input3) {
          errors.push("Three unique inputs are required");
        }
        if (fluidCell.input1 === fluidCell.output) {
          errors.push("Input 1 must differ from the output");
        }
        if (fluidCell.input2 === fluidCell.output) {
          errors.push("Input 2 must differ from the output");
        }
        if (fluidCell.input3 === fluidCell.output) {
          errors.push("Input 3 must differ from the output");
        }

        // one of the inputs must be pressure
        if (fluidCell.input1 !== "P" && fluidCell.input2 !== "P" && fluidCell.input3 !== "P") {
          errors.push("One of the inputs must be pressure for the HumidAir fluid model");
        }

        if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.has(fluidCell.input1)) {
          errors.push(`Unknown input ${fluidCell.input1}`)
        } else if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.input1).input) {
          errors.push(`${FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.input1).idName} cannot be used as an input`);
        }
        if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.has(fluidCell.input2)) {
          errors.push(`Unknown input ${fluidCell.input2}`)
        } else if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.input2).input) {
          errors.push(`${FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.input2).idName} cannot be used as an input`);
        }
        if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.has(fluidCell.input3)) {
          errors.push(`Unknown input ${fluidCell.input3}`)
        } else if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.input3).input) {
          errors.push(`${FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.input3).idName} cannot be used as an input`);
        }
      }
    }

    fluidCell.errorMessage = errors.join(", ");
    fluidCell.error = Boolean(fluidCell.errorMessage);

    return fluidCell.error;
  }

  function getFluidFunction(sheetFluidConfig: FluidConfig): {fluidFunction: FluidFunction | null, statement: AssignmentStatement | null} {
    const fluidConfig = fluidCell.useSheetFluid ? sheetFluidConfig : fluidCell.fluidConfig;

    if (fluidCell.error || parsingState.statement?.type !== "parameter") {
      return {fluidFunction: null, statement: null};
    }

    let fluidName: string;

    if (fluidConfig.fluid === "CustomMixture") {
      const mixtureDefinition = fluidConfig.customMixture.map(value => `${value.fluid}[${value.moleFraction}]`).join('&');
      fluidName = `HEOS::${mixtureDefinition}`;
    } else if (FluidCell.FLUIDS.get(fluidConfig.fluid).incompressibleMixture) {
      fluidName = `${fluidConfig.fluid}[${fluidConfig.incompMixConc}]`;
    } else {
      fluidName = fluidConfig.fluid;
    }

    if (FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output)?.trivial) {
      const fluidFuncName = `_fluid_func_${fluidCell.id}`;
      return {
        fluidFunction: {
          name: fluidFuncName,
          fluid: fluidName,
          output: fluidCell.output,
          outputDims: unit(FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output).units).dimensions,
          input1: "",
          input1Dims: unit("").dimensions,
          input2: "",
          input2Dims: unit("").dimensions,
        },
        statement: {
          type: "assignment",
          name: parsingState.statement.name,
          sympy: `${fluidFuncName}(0,0)`,
          params: [],
          variableNameMap: parsingState.statement.variableNameMap,
          isFunctionArgument: false,
          isFunction: false,
          implicitParams: [],
          functions: [],
          arguments: [],
          localSubs: [],
          isFromPlotCell: false,
          isRange: false,
          isDataTableQuery: false,
          isCodeFunctionQuery: false,
          isCodeFunctionRawQuery: false
        }
      };
    } else if (fluidConfig.fluid === "HumidAir") {
      return { 
        fluidFunction: {
          name: parsingState.statement.name,
          fluid: fluidConfig.fluid,
          output: fluidCell.output,
          outputDims: unit(FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.output).units).dimensions,
          input1: fluidCell.input1,
          input1Dims: unit(FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.input1).units).dimensions,
          input2: fluidCell.input2,
          input2Dims: unit(FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.input2).units).dimensions,
          input3: fluidCell.input3,
          input3Dims: unit(FluidCell.FLUID_HA_PROPS_PARAMETERS.get(fluidCell.input3).units).dimensions,
        },
        statement: null,
      };
    } else {
      return { 
        fluidFunction: {
          name: parsingState.statement.name,
          fluid: fluidName,
          output: fluidCell.output,
          outputDims: unit(FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output).units).dimensions,
          input1: fluidCell.input1,
          input1Dims: unit(FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.input1).units).dimensions,
          input2: fluidCell.input2,
          input2Dims: unit(FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.input2).units).dimensions,
        },
        statement: null,
      };
    }
  }


  function deleteRow(index: number) {
    fluidConfig.customMixture = [...fluidConfig.customMixture.slice(0,index),
                                 ...fluidConfig.customMixture.slice(index+1)];
    handleUpdate();
  }

  function addRow() {
    const total = fluidConfig.customMixture.reduce( (accum, value) => accum + value.moleFraction, 0.0);
    const moleFraction = 1.0-total > 0.0 ? 1.0-total : 0.0;

    fluidConfig.customMixture = [...fluidConfig.customMixture, {fluid: "", moleFraction}];
    handleUpdate();
  }

  $effect(() => {
    if (appState.activeCell === index) {
      focus();
    }
  });
  
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

  div.info {
    display: flex;
    flex: 1;
    justify-content: end;
    align-self: end;
  }

  span.tooltip > a {
    color: white;
    text-decoration: underline;
  }

  span.tooltip > a:hover {
    font-weight: bold;
  }

  div.align-end {
    display: flex;
    align-self: end;
  }

  input[type="number"] {
    width: 110px;
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
        bind:value={fluidConfig.fluid}
        onchange={handleUpdate}
      >
        {#each fluidGroups as value (value.category)}
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

    {#if FluidCell.FLUIDS.get(fluidConfig.fluid)?.incompressibleMixture}
      <div>
        <label for={`concentration-input-${index}`}>
          Concentration:
        </label>
        <input
          bind:value={fluidConfig.incompMixConc}
          oninput={handleUpdate}
          id={`concentration-input-${index}`}
          min={FluidCell.FLUIDS.get(fluidConfig.fluid).minConcentration}
          max={FluidCell.FLUIDS.get(fluidConfig.fluid).maxConcentration}
          step="0.01"
          type="number"
        />  
      </div>
    {/if}

    <div class="align-end">
      <input
        id={`use-sheet-fluid-${index}`}
        type="checkbox"
        bind:checked={fluidCell.useSheetFluid}
        onchange={handleFluidConfigUpdate}
      />
      <label for={`use-sheet-fluid-${index}`}>
        Use sheet fluid
      </label>
    </div>

  </div>

  {#if FluidCell.FLUIDS.get(fluidConfig.fluid).longDescription}
    <div>{FluidCell.FLUIDS.get(fluidConfig.fluid).longDescription}</div>
  {/if}

  {#if fluidConfig.fluid === "CustomMixture"}
    {#each fluidConfig.customMixture as component, i}
      <div class="row">
        <div>
          <label for={`fluid-component-selector-${index}-${i}`}>
            Mixture Component {i+1}:
          </label>
          <select
            id={`fluid-component-selector-${index}-${i}`}
            bind:value={component.fluid}
            onchange={handleUpdate}
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
              oninput={handleUpdate}
              min="0.0"
              max="1.0"
              step="0.01"
              type="number"
            />
            {#if fluidConfig.customMixture.length > 2}
              <IconButton
                click={() => deleteRow(i)}
                title="Delete Mixture Component"
                id={`delete-row-${index}-${i}`}
              >
                <RowDelete />
              </IconButton>
            {/if}
            {#if i === fluidConfig.customMixture.length - 1}
              <IconButton
                click={addRow}
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
      onchange={handleUpdate}
    >
      {#each outputMenuItems as value (value.category)}
        <optgroup label={value.category}>
          {#each value.items as [key, description] (key)}
            <option value={key}>
              {description}
            </option>
          {/each}
        </optgroup>
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
      onchange={handleUpdate}
    >
      {#each inputMenuItems as value (value.category)}
        <optgroup label={value.category}>
          {#each value.items as [key, description] (key)}
            <option value={key}>
              {description}
            </option>
          {/each}
        </optgroup>
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
      onchange={handleUpdate}
    >
      {#each inputMenuItems as value (value.category)}
        <optgroup label={value.category}>
          {#each value.items as [key, description] (key)}
            <option value={key}>
              {description}
            </option>
          {/each}
        </optgroup>
      {/each}
    </select>
  </div>

  <div>
    {#if fluidConfig.fluid === "HumidAir"}
      <label for={`input3-selector-${index}`}>
        Input 3:
      </label>
      <select
        id={`input3-selector-${index}`}
        bind:value={fluidCell.input3}
        onchange={handleUpdate}
      >
        {#each inputMenuItems as value (value.category)}
          <optgroup label={value.category}>
            {#each value.items as [key, description] (key)}
              <option value={key}>
                {description}
              </option>
            {/each}
          </optgroup>
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
        type="function_name"
        update={handleLatexUpdate}
        bind:latex={fluidCell.nameLatex}
        bind:parsingState={parsingState}
        bind:this={mathFieldElement}
      />
      {#if fluidCell.error}
        {#if !parsingState.parsingError || !parsingState.parsePending}
          <div class="error"><Error class="error"/>{fluidCell.errorMessage}</div>
        {/if}
      {:else}
        <IconButton
          click={() => mathFieldElement?.getMathField()?.executeCommand('copyToClipboard')}
          title={`Copy ${FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output)?.trivial ? "Constant" : "Function"} Name to Clipboard`}
          id={`copy-fluid-symbol-name-${index}`}
        >
          <Copy />
        </IconButton>
        <input
          id={`use-fluid-name-in-symbol-${index}`}
          type="checkbox"
          bind:checked={fluidCell.useFluidInName}
          onchange={handleUpdate}
        />
        <label for={`use-fluid-name-in-symbol-${index}`}>
          {`Use fluid name in ${FluidCell.FLUID_PROPS_PARAMETERS.get(fluidCell.output)?.trivial ? "constant" : "function"} name`}
        </label>
      {/if}
      <div class="info">
        <TooltipIcon direction="left">
          <span class="tooltip" slot="tooltipText">
            The fluid models in EngineeringPaper.xyz are powered by the CoolProp library. For 
            more information on these models, see the 
            <a href="http://coolprop.org/" target="_blank">CoolProp documentation</a>.
          </span>
          <Information />
        </TooltipIcon>
      </div>
    </div>
  </div>

</div>
