<script lang="ts">
  import { onMount, untrack } from "svelte";
  import { bignumber, format, unaryMinus, type BigNumber, type FormatOptions } from "mathjs";
  import appState from "./stores.svelte";
  import { isFiniteImagResult, type Result, type FiniteImagResult,
           type PlotResult, type MatrixResult, isMatrixResult, 
           type DataTableResult, 
           isDataTableResult} from "./resultTypes";
  import type { Statement, CodeFunctionQueryStatement, QueryStatement, SubQueryStatement } from "./parser/types";
  import { convertUnits, unitsValid } from "./utility";
  import type { MathCellConfig } from "./sheet/Sheet";
  import type MathCell from "./cells/MathCell.svelte";
  import PlotCell from "./cells/PlotCell.svelte";
  import MathField from "./MathField.svelte";
  import IconButton from "./IconButton.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import SettingsAdjust from "carbon-icons-svelte/lib/SettingsAdjust.svelte";
  import LogoPython from "carbon-icons-svelte/lib/LogoPython.svelte";
  import { applyEdits, createSubQuery, type Replacement } from "./parser/utility";

  interface Props {
    index: number;
    mathCell: MathCell;
    updateNumberFormat: (arg: {detail: {mathCell: MathCell, setNumberConfig: (input: MathCellConfig) => void}}) => void;
    generateCode: (arg: {detail: {index: number}}) => void;
    insertMathCellAfter: (arg: {detail: {index: number}}) => void;
    insertInsertCellAfter: (arg: {detail: {index: number}}) => void;
    mathCellChanged: () => void;
  }

  let {
      index,
      mathCell,
      updateNumberFormat,
      generateCode,
      insertMathCellAfter,
      insertInsertCellAfter,
      mathCellChanged
    }: Props = $props(); 

  let result = $derived(appState.results[index]);
  let numberConfig = $derived(getNumberConfig());

  let error = $state("");
  let resultLatex = $state("");
  let resultUnits = $state("");
  let resultUnitsLatex = $state("");
  let numericResult = $state(false);

  export function getMarkdown() {
    const queryStatement = Boolean(mathCell.mathField?.statement?.type === "query");
    let errorMessage = "";

    if (mathCell.mathField.parsingError) {
      errorMessage = '\\quad \\text{Error: } \\text{Invalid Syntax}';
    } else if (error && queryStatement) {
      errorMessage = `\\quad \\text{Error: } \\text{${error}}`;
    }

    const result = queryStatement ? `${resultLatex} ${resultUnitsLatex}` : "";

    return `$$ ${mathCell.mathField.latex} ${result} ${errorMessage} $$\n\n`;
  }

  export function setNumberConfig(mathCellConfig: MathCellConfig) {
    mathCell.config = mathCellConfig;
  }

  function getNumberConfig() {
    return mathCell?.config ? mathCell.config : appState.config.mathCellConfig;
  }

  function handleUpdateNumberFormat() {
    updateNumberFormat({detail: { mathCell: mathCell, setNumberConfig: setNumberConfig }});
  }

  function handleGenerateCode() {
    generateCode({detail: {index: index}});
  }

  onMount( () => {
    if (appState.activeCell === index) {
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
    appState.cells[index] = appState.cells[index];
    mathCellChanged();
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

  function getLatexResult(statement: QueryStatement | CodeFunctionQueryStatement | SubQueryStatement, 
                          result: Result | FiniteImagResult | MatrixResult,
                          numberConfig: MathCellConfig) {
    let error = "";
    let numericResult = false;
    let resultLatex = "";
    let resultUnits = "";
    let resultUnitsLatex = "";
    let unitsMismatchErrorMessage = "";

    if (!isMatrixResult(result)) {
      numericResult = result.numeric;

      if (!unitsValid(result.units)) {
        return {
          error: result.units,
          resultLatex: "",
          resultUnits: "",
          resultUnitsLatex: "",
          numericResult: numericResult
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
          resultUnitsLatex: resultUnitsLatex,
          numericResult: numericResult
        };
      }
      
      if ( numberConfig.symbolicOutput && result.symbolicValue ) {
        return {
          error: "",
          resultLatex: result.symbolicValue,
          resultUnits: result.units,
          resultUnitsLatex: result.unitsLatex,
          numericResult: numericResult
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
        resultUnitsLatex: resultUnitsLatex,
        numericResult: numericResult
      };
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
          const currentResultLatex = getLatexResult(statement, currentResult, numberConfig);
          currentLatexRow.push(currentResultLatex.resultLatex + currentResultLatex.resultUnitsLatex);
          errors.add(currentResultLatex.error);              
        }
        latexRows.push(currentLatexRow);
      }
      error = Array.from(errors).filter(error => error !== "").join(", ");
      resultUnits = ""; // not used with matrices since each item has its own units
      resultUnitsLatex = "";
      resultLatex = String.raw`\begin{bmatrix} ${latexRows.map(row => row.join(' & ')).join(' \\\\ ')} \end{bmatrix}`;
      
      return {
        error,
        resultLatex,
        resultUnits,
        resultUnitsLatex,
        numericResult
      };
    }
  }

  function splitEquals(input: string): string[] {
    const results = [];
    let openParensCount = 0;
    let start = 0;
    let pos = 0;
    for(const char of input) {
      switch (char) {
        case "(":
          openParensCount++;
          break;
        case ")":
          openParensCount--;
          break;
        case "=":
          if (openParensCount === 0) {
            results.push(input.slice(start,pos));
            start = pos+1;
          }
          break;
      }

      pos++;
    }
    results.push(input.slice(start));
    return results;
  }

  function inParensOrBrackets(latex: string, replacement: Replacement): boolean {
    const matchSpacesLeftRight = /\ |\\:|\\ |\\right|\\left/gi;
    
    let before = latex.slice(0,replacement.location).replaceAll(matchSpacesLeftRight, '');
    let after = latex.slice(replacement.location+replacement.deletionLength).replaceAll(matchSpacesLeftRight, '');

    const parensBefore = before.endsWith('(');
    const parensAfter = after.startsWith(')');

    const bracketsBefore = before.endsWith('{');
    const bracketsAfter = after.startsWith('}');

    return (parensBefore && parensAfter) || (bracketsBefore && bracketsAfter);
  }

  function getIntermediateLatex(startingLatex: string,
                                statement: QueryStatement,
                                subResults: Map<string,(Result | FiniteImagResult | MatrixResult)>
                               ): string {

    const subQueryReplacements = statement.subQueryReplacements;

    // if there are no variables in the query, there is no need for intermediate results
    if (subQueryReplacements.length === 0) {
      return "";
    }

    let impactedSegment: string;
    let segments = splitEquals(startingLatex);
    if (segments.length === 3) {
      impactedSegment = segments[1];
    } else if (segments.length === 2) {
      impactedSegment = segments[0];
    } else {
      return "";
    }

    // if the query exactly matches one variable, there is no need for intermediate results
    if (subQueryReplacements.length === 1) {
      if (impactedSegment.replaceAll(/\ |\\:|\\ /g,'') === subQueryReplacements[0][1].text) {
        return "";
      }
    }

    const replacements: Replacement[] = [];

    for (const [sympyVar, replacement] of subQueryReplacements) {
      if (subResults.has(sympyVar)) {
        const currentResultLatex = getLatexResult(createSubQuery(sympyVar), subResults.get(sympyVar), numberConfig);
        let newLatex: string;
        if (currentResultLatex.error) {
          newLatex = String.raw`\text{${currentResultLatex.error.startsWith("Dimension Error:") ? "Dimension Error" : currentResultLatex.error}}`;
        } else {
          newLatex = ` ${currentResultLatex.resultLatex}${currentResultLatex.resultUnitsLatex} `;
        }

        if (startingLatex.slice(replacement.location, replacement.location+replacement.deletionLength).replace(/[ \\{}]/g, '') === 
            newLatex.trim().replace(/[ \\{}]/g, '')) {
          continue;
        }

        if (!inParensOrBrackets(startingLatex, replacement) && replacement.text[0] !== "{") {
          newLatex = `\\left(${newLatex}\\right)`
        }

        if (replacement.text[0] === "{") {
          newLatex = `{${newLatex}}`;
        }
        
        replacements.push({...replacement, text: newLatex});
      }
    }

    if (replacements.length === 0) {
      return "";
    } else {
      const finalLatex = applyEdits(startingLatex, replacements);
      
      segments = splitEquals(finalLatex);
      if (segments.length === 3) {
        return segments[1];
      } else if (segments.length === 2) {
        return segments[0];
      } else {
        return "";
      }
    }
  }

  $effect(() => {
    if (appState.activeCell === index) {
      focus();
    }
  }); 

  $effect(() => {
    if(mathCell.mathField.statement) {
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
            appState.cells = [...appState.cells.slice(0,index), new PlotCell(mathCell), ...appState.cells.slice(index+1)];
          }
        })();
      }
    }
  });


  // format output and perform unit conversions to user specified units if necessary
  $effect(() => {
    const statement = mathCell.mathField.statement;
    
    if (result && !(result instanceof Array) && !isDataTableResult(result) &&
         statement && statement.type === "query") {
      if (statement.isRange === false && statement.isDataTableQuery === false) { 
        ( {error, resultLatex, resultUnits, resultUnitsLatex, numericResult} = getLatexResult(statement, result, numberConfig) );
        if (untrack(() => error)) {
          resultLatex = "";
          resultUnitsLatex = "";
        }

        if (numberConfig.showIntermediateResults && "subQueries" in statement) {
          const intermediateResult = getIntermediateLatex(mathCell.mathField.latex, statement, appState.sub_results);
          if (intermediateResult) {
            resultLatex = `${intermediateResult} = ${untrack(() => resultLatex)}`;
          }
        }

        if (statement.units) {
          resultLatex = "=" + untrack(() => resultLatex);
        }
      }
    }
  });
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
    span.container {
      flex-wrap: wrap;
    }

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
    update={(e) => parseLatex(e.latex, index)}
    enter={() => insertMathCellAfter({detail: {index: index}})}
    shiftEnter={() => insertMathCellAfter({detail: {index: index}})}
    modifierEnter={() => insertInsertCellAfter({detail: {index: index}})}
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
      {#if resultLatex.trim()}
        <span class="hidden" id="{`result-value-${index}`}">{resultLatex}</span>
        <span class="hidden" id="{`result-units-${index}`}">{resultUnits}</span>
        <MathField
          hidden={appState.resultsInvalid}
          latex={`${resultLatex}${resultUnitsLatex}`}
        />
      {/if}
      {#if error}
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
          click={handleGenerateCode}
        >
          <LogoPython />
        </IconButton>
      {/if}

      <IconButton
        title="Edit Cell Number Format"
        statusDotTitle="Edit Cell Number Format (Modified)"
        id={`number-format-${index}`}
        click={handleUpdateNumberFormat}
        statusDot={Boolean(mathCell.config)}
      >
        <SettingsAdjust />
      </IconButton>

    </span>
    {/if}
  
</span>

