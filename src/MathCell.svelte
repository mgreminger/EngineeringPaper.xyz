<script lang="ts">
  import { onMount, createEventDispatcher, SvelteComponent } from "svelte";
  import { get_current_component } from "svelte/internal";
  import { bignumber, format, unaryMinus, type BigNumber, type FormatOptions } from "mathjs";
  import { cells, results, resultsInvalid, activeCell, mathCellChanged, config } from "./stores";
  import { isFiniteImagResult, type Result, type FiniteImagResult,
           type PlotResult, type MatrixResult, isMatrixResult } from "./resultTypes";
           import type { CodeFunctionQueryStatement, QueryStatement } from "./parser/types";
  import { convertUnits } from "./utility";
  import type { MathCellConfig } from "./sheet/Sheet";
  import type MathCell from "./cells/MathCell";
  import PlotCell from "./cells/PlotCell";
  import MathField from "./MathField.svelte";
  import IconButton from "./IconButton.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import SettingsAdjust from "carbon-icons-svelte/lib/SettingsAdjust.svelte";
  import LogoPython from "carbon-icons-svelte/lib/LogoPython.svelte";

  export let index: number;
  export let mathCell: MathCell;

  let result: (Result | FiniteImagResult | MatrixResult | PlotResult[] | null) = null

  let numberConfig = getNumberConfig();

  let error = "";
  let resultLatex = "";
  let resultUnits = "";
  let resultUnitsLatex = "";
  let numericResult = false;

  export function getMarkdown() {
    const queryStatement = Boolean(mathCell.mathField?.statement?.type === "query");
    let errorMessage = "";

    if (mathCell.mathField.parsingError) {
      errorMessage = '\\quad \\text{Error: } \\text{Invalid Syntax}';
    } else if (error && queryStatement) {
      errorMessage = `\\quad \\text{Error: } \\text{${error}}`;
    }

    const result = (!errorMessage && queryStatement) ? `${resultLatex} ${resultUnitsLatex}` : "";

    return `$$ ${mathCell.mathField.latex} ${result} ${errorMessage} $$\n\n`;
  }

  const dispatch = createEventDispatcher<{
    updateNumberFormat: {mathCell: MathCell, target: SvelteComponent};
    generateCode: {index: number};
    insertMathCellAfter: {index: number};
    insertInsertCellAfter: {index: number};
  }>();

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

  function handleGenerateCode() {
    dispatch("generateCode", {index: index});
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
    $cells[index] = $cells[index];
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

  function getLatexResult(statement: QueryStatement | CodeFunctionQueryStatement, 
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

    if ( statement.units || result.customUnitsDefined) {
      // unit conversion required to user supplied units or sheet level user default units
      // user supplied units in the statement takes precedence over sheet level user default units 

      if (statement.units) {
        resultUnitsLatex = statement.unitsLatex;
        resultUnits = statement.units;
      } else {
        resultUnitsLatex = result.customUnitsLatex;
        resultUnits = result.customUnits;
      } 

      if (result.numeric && result.real && result.finite && !numberConfig.symbolicOutput) {
        const {newValue: localNewValue, unitsMismatch: localUnitsMismatch} = convertUnits(result.value, result.units, resultUnits);

        if (!localUnitsMismatch) {
          resultLatex = customFormat(localNewValue, numberConfig.formatOptions);
          if (!inMatrix && statement.units) {
            resultLatex = "=" + resultLatex;
          }
        } else {
          unitsMismatchErrorMessage = "Units Mismatch";
        }
      } else if (isFiniteImagResult(result) && !numberConfig.symbolicOutput) {
        // handle unit conversion for imaginary number
        const {newValue: newRealValue, unitsMismatch: realUnitsMismatch} = 
                convertUnits(result.realPart, result.units, resultUnits);
        const {newValue: newImagValue, unitsMismatch: imagUnitsMismatch} = 
                convertUnits(result.imagPart, result.units, resultUnits);

        if (!realUnitsMismatch && !imagUnitsMismatch) {
          resultLatex = formatImag(newRealValue, newImagValue, numberConfig);
          if (!inMatrix && statement.units) {
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
    if(("isRange" in mathCell.mathField.statement && mathCell.mathField.statement.isRange) ||
       mathCell.mathField.statement.type === "scatterQuery" ||
       mathCell.mathField.statement.type ==="parametricRange"
      ) {
      // user entered range into a math cell, turn this cell into a plot cell
      (async () => {
        await PlotCell.init();

        // make sure situation hasn't change after plotly is loaded
        if (mathCell.mathField.statement &&
            (("isRange" in mathCell.mathField.statement && 
            mathCell.mathField.statement.isRange) ||
            mathCell.mathField.statement.type === "scatterQuery" ||
            mathCell.mathField.statement.type === "parametricRange")
           ) {
          $cells = [...$cells.slice(0,index), new PlotCell(mathCell), ...$cells.slice(index+1)];
        }
      })();
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
          numericResult = result.numeric;
          ({error, resultLatex, resultUnits, resultUnitsLatex} = getLatexResult(statement, result, numberConfig) );
        } else {
          // assemble latex of matrix result
          const latexRows: (string[])[] = [];
          const errors = new Set<string>();
          numericResult = true;
          // matrix result, loop over rows
          for (const row of result.results) {
            const currentLatexRow: string[] = [];
            for (const currentResult of row) {
              numericResult = numericResult && currentResult.numeric;
              const currentResultLatex = getLatexResult(statement, currentResult, numberConfig, true);
              currentLatexRow.push(currentResultLatex.resultLatex + currentResultLatex.resultUnitsLatex);
              errors.add(currentResultLatex.error);              
            }
            latexRows.push(currentLatexRow);
          }
          error = Array.from(errors).filter(error => error !== "").join(", ");
          resultUnits = ""; // not used with matrices since each item has its own units
          resultUnitsLatex = "";
          resultLatex = String.raw`\begin{bmatrix} ${latexRows.map(row => row.join(' & ')).join(' \\\\ ')} \end{bmatrix}`;
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

  span.extra-buttons {
    margin-inline-start: auto;
    display: flex;
    gap: 6px;
  }

  span.info {
    display: flex
  }

  @media print {
    span.extra-buttons, span.info {
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
    on:enter={() => dispatch("insertMathCellAfter", {index: index})}
    on:shiftEnter={() => dispatch("insertMathCellAfter", {index: index})}
    on:modifierEnter={() => dispatch("insertInsertCellAfter", {index: index})}
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
    {#if result && !(result instanceof Array)}
      <MathField
        hidden={true}
        latex={`${resultLatex}${resultUnitsLatex}`}
      />
    {/if}
  {:else if result && mathCell.mathField.statement &&
      mathCell.mathField.statement.type === "query"}
    {#if !(result instanceof Array)}
      {#if !error}
        <span class="hidden" id="{`result-value-${index}`}">{resultLatex}</span>
        <span class="hidden" id="{`result-units-${index}`}">{resultUnits}</span>
        <MathField
          hidden={$resultsInvalid}
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
    <span class="info">
      <TooltipIcon direction="right">
        <span slot="tooltipText">This field must contain an assignment (e.g., x=y*z) or a query (e.g., x=). To delete an unwanted math cell, click the trash can on the right.</span>
        <Information />
      </TooltipIcon>
    </span>
  {/if}

  {#if mathCell.mathField.statement?.type === "query"}
    <span class="extra-buttons">
      
      {#if numericResult && mathCell.mathField.statement?.isCodeFunctionQuery && !error}
        <IconButton
          title="Generate Python code for this function"
          id={`code-gen-${index}`}
          on:click={handleGenerateCode}
        >
          <LogoPython />
        </IconButton>
      {/if}

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

