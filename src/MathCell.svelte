<script lang="ts">
  import { onMount, createEventDispatcher, SvelteComponent } from "svelte";
  import { get_current_component } from "svelte/internal";
  import { bignumber, format, unaryMinus, type BigNumber, type FormatOptions } from "mathjs";
  import { cells, results, activeCell, mathCellChanged, config } from "./stores";
  import { isFiniteImagResult, type Result, type FiniteImagResult,
           type PlotResult, type MatrixResult, isMatrixResult } from "./resultTypes";
           import type { QueryStatement } from "./parser/types";
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

  let result: (Result | FiniteImagResult | MatrixResult | PlotResult[] | null) = null

  let numberConfig = getNumberConfig();

  let error = "";
  let resultLatex = "";
  let resultUnits = "";
  let resultUnitsLatex = "";

  const dispatch = createEventDispatcher<{updateNumberFormat: {mathCell: MathCell, target: SvelteComponent}}>();

  const self = get_current_component();

  export function setNumberConfig(mathCellConfig: MathCellConfig) {
    mathCell.config = mathCellConfig;
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

  function getLatexResult(statement: QueryStatement, 
                          result: Result | FiniteImagResult,
                          numberConfig: MathCellConfig, 
                          inMatrix = false) {
    let resultLatex = "";
    let resultUnits = "";
    let resultUnitsLatex = "";
    let unitsMismatchErrorMessage: string = "";

    if (result.units === "Dimension Error" ||
        result.units === "Exponent Not Dimensionless") {
      return {
        error: result.units,
        resultLatex: "",
        resultUnits: "",
        resultUnitsLatex: ""
      };
    }

    if ( statement.units_valid &&
         statement.units ) {
      // unit conversion required to user supplied units
      resultUnitsLatex = statement.unitsLatex;
      resultUnits = statement.units;

      if (result.numeric && result.real && result.finite && !numberConfig.symbolicOutput) {
        const {newValue: localNewValue, unitsMismatch: localUnitsMismatch} = convertUnits(result.value, result.units, statement.units);

        if (!localUnitsMismatch) {
          resultLatex = customFormat(localNewValue, numberConfig.formatOptions);
          if (!inMatrix) {
            resultLatex = "=" + resultLatex;
          }
        } else {
          unitsMismatchErrorMessage = "Units Mismatch";
        }
      } else if (isFiniteImagResult(result) && !numberConfig.symbolicOutput) {
        // handle unit conversion for imaginary number
        const {newValue: newRealValue, unitsMismatch: realUnitsMismatch} = 
                convertUnits(result.realPart, result.units, statement.units);
        const {newValue: newImagValue, unitsMismatch: imagUnitsMismatch} = 
                convertUnits(result.imagPart, result.units, statement.units);

        if (!realUnitsMismatch && !imagUnitsMismatch) {
          resultLatex = formatImag(newRealValue, newImagValue, numberConfig);
          if (!inMatrix) {
            resultLatex = "=" + resultLatex;
          }
        } else {
          unitsMismatchErrorMessage = "Units Mismatch";
        }
      } else {
        // unit conversions not support for symbolic results
        unitsMismatchErrorMessage = "User Units Not Supported for Symbolic Results";
      }

      return {
        error: unitsMismatchErrorMessage,
        resultLatex: resultLatex,
        resultUnits: resultUnits,
        resultUnitsLatex: resultUnitsLatex
      };
    }
    
    if ( numberConfig.symbolicOutput && result.symbolicValue ) {
      return {
        error: "",
        resultLatex: result.symbolicValue,
        resultUnits: result.units,
        resultUnitsLatex: result.unitsLatex,
      };
    }

    resultUnits = result.units;
    resultUnitsLatex = result.unitsLatex;
    
    if (result.numeric && result.real && result.finite) {
      resultLatex = customFormat(bignumber(result.value), numberConfig.formatOptions);
    } else if (isFiniteImagResult(result)) {
      resultLatex = formatImag(bignumber(result.realPart), bignumber(result.imagPart), numberConfig);
    } else {
      resultLatex = result.symbolicValue ?? result.value;
    }

    return {
      error: unitsMismatchErrorMessage,
      resultLatex: resultLatex,
      resultUnits: resultUnits,
      resultUnitsLatex: resultUnitsLatex
    };
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

  $: if (mathCell.config || $config.mathCellConfig) {
    numberConfig = getNumberConfig();;
  }

  $: result = $results[index];

  // perform unit conversions on results if user specified units
  $: if (result && !(result instanceof Array) &&
         mathCell.mathField.statement &&
         mathCell.mathField.statement.type === "query") {
      const statement = mathCell.mathField.statement;
      if (statement.isRange === false) { 
        if (!isMatrixResult(result)) {
          ({error, resultLatex, resultUnits, resultUnitsLatex} = getLatexResult(statement, result, numberConfig) );
        } else {
          // matrix result, loop over rows
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

  span.settings-button {
    margin-inline-start: auto;
  }

  @media print {
    span.settings-button {
      display: none;
    }
  }

  :global(.bx--tooltip__trigger) {
    margin-left: 0.5rem;
  }

</style>

<span class="container">
  <MathField
    editable={true}
    on:update={(e) => parseLatex(e.detail.latex, index)}
    mathField={mathCell.mathField}
    parsingError={mathCell.mathField.parsingError}
    bind:this={mathCell.mathField.element}
    latex={mathCell.mathField.latex}
  />
  {#if mathCell.mathField.parsingError}
    <TooltipIcon direction="right" align="end">
      <span slot="tooltipText">{mathCell.mathField.parsingErrorMessage}</span>
      <Error class="error"/>
    </TooltipIcon>
  {:else if result && mathCell.mathField.statement &&
      mathCell.mathField.statement.type === "query"}
    {#if !(result instanceof Array)}
      {#if !error}
        <span class="hidden" id="{`result-value-${index}`}">{resultLatex}</span>
        <span class="hidden" id="{`result-units-${index}`}">{resultUnits}</span>
        <MathField
          latex={`${resultLatex}${resultUnitsLatex}`}
        />
      {:else}
        <TooltipIcon direction="right" align="end">
          <span slot="tooltipText">{error}</span>
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

  {#if mathCell.mathField.statement?.type === "query"}
    <span class="settings-button">
      <IconButton
        title="Edit Cell Number Format"
        statusDotTitle="Edit Cell Number Format (Modified)"
        id={`number-format-${index}`}
        on:click={handleUpdateNumberFormat}
        statusDot={Boolean(mathCell.config)}
      >
        <SettingsAdjust />
      </IconButton>
    </span>
  {/if}

</span>

