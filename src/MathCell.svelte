<script lang="ts">
  import { onMount, createEventDispatcher, SvelteComponent } from "svelte";
  import { get_current_component } from "svelte/internal";
  import { bignumber, format, unaryMinus, type BigNumber, type FormatOptions } from "mathjs";
  import { cells, results, activeCell, mathCellChanged, config } from "./stores";
  import { isFiniteImagResult, type Result, type FiniteImagResult, type PlotResult } from "./resultTypes";
  import { convertUnits, unitsValid } from "./utility";
  import type { MathCellConfig } from "./sheet/Sheet";
  import type MathCell from "./cells/MathCell";
  import PlotCell from "./cells/PlotCell";
  import MathField from "./MathField.svelte";
  import IconButton from "./IconButton.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import SettingsAdjust from "carbon-icons-svelte/lib/SettingsAdjust.svelte";

  export let index: number;
  export let mathCell: MathCell;

  let result: (Result | FiniteImagResult | PlotResult[] | null) = null

  let numberConfig = getNumberConfig();

  let userUnitsValueDefined = false;
  let userUnitsValue: string;
  let unitsMismatch: boolean;

  const dispatch = createEventDispatcher<{updateNumberFormat: {mathCell: MathCell, target: SvelteComponent}}>();

  const self = get_current_component();

  export function setNumberConfig() {
    numberConfig = getNumberConfig();
  }

  function getNumberConfig() {
    return mathCell?.config ? mathCell.config : $config.mathCellConfig;
  }

  function handleUpdateNumberFormat() {
    dispatch("updateNumberFormat", { mathCell: mathCell, target: self });
  }

  onMount( () => {
    if ($activeCell === index) {
      focus();
    }
  });

  function focus() {
    if (mathCell.mathField.element?.focus) {
        mathCell.mathField.element.focus();
      }
  }

  function parseLatex(latex: string, index: number) {
    mathCell.mathField.parseLatex(latex);
    $mathCellChanged = true;
    $cells = $cells;
  }

  function scientificToLatex(value: string): string {
    if (value.includes('e')) {
      return value.replace('e', '\\times 10^{').replace('+', '') + '}';
    } else {
      return value;
    }
  }

  function customFormat(input: BigNumber, options: FormatOptions): string {
    return scientificToLatex(format(input, options));
  }

  function formatImag(realPart: BigNumber, imagPart: BigNumber, numberConfig: MathCellConfig) {
    let formatted: string;

    const realPartNumber = realPart.toNumber();
    const imagPartNumber = imagPart.toNumber();

    if (realPartNumber === 0) {
      if (imagPartNumber === 1) {
        formatted = `i`;
      } else if (imagPartNumber === -1) {
        formatted = `-i`;
      } else {
        formatted = `${customFormat(imagPart, numberConfig.formatOptions)}\\cdot i`;
      }
    } else if (imagPartNumber === 1) {
      formatted = `${customFormat(realPart, numberConfig.formatOptions)} + i`;
    } else if (imagPartNumber === -1) {
      formatted = `${customFormat(realPart, numberConfig.formatOptions)} - i`;
    } else if (imagPartNumber >= 0) {
      formatted = `${customFormat(realPart, numberConfig.formatOptions)} + ${customFormat(imagPart, numberConfig.formatOptions)}\\cdot i`;
    } else {
      formatted = `${customFormat(realPart, numberConfig.formatOptions)} - ${customFormat(unaryMinus(imagPart), numberConfig.formatOptions)}\\cdot i`;
    }

    return formatted;
  }

  $: if ($activeCell === index) {
      focus();
    }

  $: if(mathCell.mathField.statement) {
    if("isRange" in mathCell.mathField.statement && mathCell.mathField.statement.isRange) {
      // user entered range into a math cell, turn this cell into a plot cell
      $cells = [...$cells.slice(0,index), new PlotCell(mathCell), ...$cells.slice(index+1)];
   }
  }

  $: result = $results[index];

  // perform unit conversions on results if user specified units
  $: if (result) {
      userUnitsValueDefined = false;
      if (
        !(result instanceof Array) &&
        mathCell.mathField.statement &&
        mathCell.mathField.statement.type === "query" &&
        mathCell.mathField.statement.units_valid &&
        mathCell.mathField.statement.units && 
        unitsValid(result.units)
      ) {
        const statement = mathCell.mathField.statement;
        if (result.numeric && result.real && result.finite && !numberConfig.symbolicOutput) {
          const {newValue: localNewValue, unitsMismatch: localUnitsMismatch} = convertUnits(result.value, result.units, statement.units);

          if (!localUnitsMismatch) {
            userUnitsValueDefined = true;
            userUnitsValue = customFormat(localNewValue, numberConfig.formatOptions);
            unitsMismatch = false;
          } else {
            unitsMismatch = true;
          }
        } else if (isFiniteImagResult(result) && !numberConfig.symbolicOutput) {
          // handle unit conversion for imaginary number
          const {newValue: newRealValue, unitsMismatch: realUnitsMismatch} = 
                  convertUnits(result.realPart, result.units, statement.units);
          const {newValue: newImagValue, unitsMismatch: imagUnitsMismatch} = 
                  convertUnits(result.imagPart, result.units, statement.units);

          if (!realUnitsMismatch && !imagUnitsMismatch) {
            userUnitsValueDefined = true;
            userUnitsValue = formatImag(newRealValue, newImagValue, numberConfig);
            unitsMismatch = false;
          } else {
            unitsMismatch = true;
          }
        } else {
          // unit conversions not support for symbolic results
          unitsMismatch = true;
        }
      }
    }


</script>

<style>
  span.hidden {
    display: none;
  }

  span.container {
    display: flex;
    align-items: center;
  }

  :global(.bx--tooltip__trigger) {
    margin-left: 0.5rem;
  }

</style>

<span class="container">
  <span>
    <MathField
      editable={true}
      on:update={(e) => parseLatex(e.detail.latex, index)}
      mathField={mathCell.mathField}
      parsingError={mathCell.mathField.parsingError}
      bind:this={mathCell.mathField.element}
      latex={mathCell.mathField.latex}
    />
  </span>
  {#if mathCell.mathField.parsingError}
    <TooltipIcon direction="right" align="end">
      <span slot="tooltipText">{mathCell.mathField.parsingErrorMessage}</span>
      <Error class="error"/>
    </TooltipIcon>
  {:else if result && mathCell.mathField.statement &&
      mathCell.mathField.statement.type === "query"}
    {#if !(result instanceof Array)}
      {#if result.units !== "Dimension Error" && result.units !== "Exponent Not Dimensionless"}
        {#if unitsMismatch}
          <TooltipIcon direction="right" align="end">
            <span id="{`result-units-${index}`}" slot="tooltipText">Units Mismatch</span>
            <Error class="error"/>
          </TooltipIcon>
        {:else if numberConfig.symbolicOutput && result.symbolicValue}
          <span class="hidden" id="{`result-value-${index}`}">{result.symbolicValue}</span>
          <span class="hidden" id="{`result-units-${index}`}">{result.units}</span>
          <MathField
            latex={`${result.symbolicValue}${result.unitsLatex}`}
          />
        {:else if userUnitsValueDefined}
          <span class="hidden" id="{`result-value-${index}`}">{userUnitsValue}</span>
          <span class="hidden" id="{`result-units-${index}`}">{mathCell.mathField.statement.units}</span>
          <MathField
            latex={`=${userUnitsValue}${mathCell.mathField.statement.unitsLatex}`}
          />
        {:else if result.numeric && result.real && result.finite}
          {@const resultValue = customFormat(bignumber(result.value), numberConfig.formatOptions)}
          <span class="hidden" id="{`result-value-${index}`}">{resultValue}</span>
          <span class="hidden" id="{`result-units-${index}`}">{result.units}</span>
          <MathField
            latex={`${resultValue}${result.unitsLatex}`}
          />
        {:else if isFiniteImagResult(result)}
          {@const resultValue = formatImag(bignumber(result.realPart), bignumber(result.imagPart), numberConfig)}
          <span class="hidden" id="{`result-value-${index}`}">{resultValue}</span>
          <span class="hidden" id="{`result-units-${index}`}">{result.units}</span>
          <MathField
            latex={`${resultValue}${result.unitsLatex}`}
          />
        {:else}
          {@const resultValue = result.symbolicValue ?? result.value}
          <span class="hidden" id="{`result-value-${index}`}">{resultValue}</span>
          <span class="hidden" id="{`result-units-${index}`}">{result.units}</span>
          <MathField
            latex={`${resultValue}${result.unitsLatex}`}
          />
        {/if}
      {:else}
        <TooltipIcon direction="right" align="end">
          <span id="{`result-units-${index}`}" slot="tooltipText">{result.units}</span>
          <Error class="error"/>
        </TooltipIcon>
      {/if}
    {:else}
      <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">Internal error, attempt to place plot result in a math cell. Report to support@engineeringpaper.xyz</span>
        <Error class="error"/>
      </TooltipIcon>
    {/if}
  {:else if mathCell.mathField.statement && mathCell.mathField.statement.type === "blank"}
    <TooltipIcon direction="right">
      <span slot="tooltipText">This field must contain an assignment (e.g., x=y*z) or a query (e.g., x=). To delete an unwanted math cell, click the trash can on the right.</span>
      <Information />
    </TooltipIcon>
  {/if}

  {#if mathCell.mathField.statement?.type === "query" && ($activeCell === index || mathCell.config)}
    <IconButton
      title="Edit Cell Number Format"
      id={`${index}-number-format`}
      on:click={handleUpdateNumberFormat}
    >
      <SettingsAdjust />
    </IconButton>
  {/if}



</span>

