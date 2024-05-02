<script lang="ts">
  import { onMount } from 'svelte';
  import { unit } from 'mathjs';
  import { results, cells, mathCellChanged } from './stores';
  import type { CodeFunctionQueryStatement } from './parser/types';
  import type { Cell } from './cells/Cells';
  import MathCell from './cells/MathCell';
  import { type FiniteImagResult, type Result, type MatrixResult, isMatrixResult } from './resultTypes';
  import { PYTHON_RESERVED } from './utility';
  import { InlineLoading, CodeSnippet } from 'carbon-components-svelte';
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  
  export let pyodidePromise: Promise<any>;
  export let index: number;

  let cell: Cell | undefined;
  let result: Result | FiniteImagResult | MatrixResult | null = null;
  let statement: CodeFunctionQueryStatement | null = null;
  let generatedCode = "";

  onMount(() => {
    if (statement) {
      statement.generateCode = true;

      $mathCellChanged = true;
    }
  });
  
  function getUnitsDescription(unitsString: string): string {
    if (unitsString === "") {
      return "is unitless.";
    } else {
      return `has units of [${unit(unitsString).formatUnits()}].`;
    }
  }

  function getMatrixUnitsResult(result: MatrixResult, userUnit: string) {
    const resultUnitRows = [];
    
    if (userUnit) {
      const formattedUserUnit = unit(userUnit).formatUnits();
      for (const [i, row] of result.results.entries()) {
        const resultUnitRow = [];
        resultUnitRows.push(resultUnitRow);
        for (const[j, _] of row.entries()) {
          resultUnitRow.push(formattedUserUnit);
        }
      }
    } else {
      for (const [i, row] of result.results.entries()) {
        const resultUnitRow = [];
        resultUnitRows.push(resultUnitRow);
        for (const[j, value] of row.entries()) {
          if (value.units) {
            resultUnitRow.push(unit(value.units).formatUnits());
          } else {
            resultUnitRow.push("unitless");
          }
        }
      }
    }

    return `is a matrix with units [[${resultUnitRows.map(row => row.join(", ")).join('], [')}]]`;
  }

  function parameterMap(name: string, index: number) {
    return `    ${name} : float\n        '${name}' ${getUnitsDescription(statement.parameterUnits[index])}`;
  }

  function parameterConversionMap(name: string, index: number) {
    const currentUnit = statement.parameterUnits[index];

    if (currentUnit === "") {
      return "";
    }
    
    const { scaleFactor, offset } = getConversionFactor(currentUnit);

    if (offset === 0) {
      if (scaleFactor === 1) {
        return "";
      } else {
        return `    ${name} = ${name} * ${scaleFactor}`;
      }
    } else {
      if (scaleFactor === 1) {
        return `    ${name} = ${name} + ${offset}`;
      } else {
        return `    ${name} = (${name} + ${offset}) * ${scaleFactor}`;
      }
    }
  }

  function getReturnConversion(outputUnit: string) {
    if (outputUnit === "") {
      return "return result";
    }
    
    const { scaleFactor, offset } = getConversionFactor(outputUnit);

    if (offset === 0) {
      if (scaleFactor === 1) {
        return `return result`;
      } else {
        return `return result / ${scaleFactor}`;
      }
    } else {
      if (scaleFactor === 1) {
        return `return result - ${offset}`;
      } else {
        return `return (result / ${scaleFactor}) - ${offset}`;
      }
    }
  }

  function getConversionFactor(startingUnits: string) {
    const currentUnit = unit(1, startingUnits);

    let offset: number = 0;
    let scaleFactor: number;

    // @ts-ignore
    if (!currentUnit._isDerived() && currentUnit.units[0].unit.offset !== 0 ) {
      offset = currentUnit.units[0].unit.offset;
      scaleFactor = currentUnit.units[0].unit.value;
    } else {
      scaleFactor = currentUnit.value;
    }

    return {
      offset: offset,
      scaleFactor: scaleFactor
    }
  }

  function getNewVariableName(variableName: string) {
    let newVariableName = variableName.replace(/_as_variable$/, "");
    let changed = true;

    if ( newVariableName === variableName || PYTHON_RESERVED.has(newVariableName) ) {
      newVariableName = variableName;
      changed = false;
    }
    
    return { variableName: newVariableName, changed: changed}
  }

  function rewriteVariables(functionName: string, parameterNames: string[], generatedCode: string) {
    let {variableName: newFunctionName, changed: _} = getNewVariableName(functionName);

    const newParameterNames = [];

    for (const parameterName of parameterNames) {
      let {variableName: newParameterName, changed} = getNewVariableName(parameterName);

      newParameterNames.push(newParameterName);

      if (changed) {
        generatedCode = generatedCode.replaceAll(parameterName, newParameterName);
      }
    }

    return { functionName: newFunctionName, parameterNames: newParameterNames, generatedCode: generatedCode}
  }

  function codeTemplate(statement: CodeFunctionQueryStatement, result: Result | FiniteImagResult | MatrixResult) {
    if (result.generatedCode.startsWith('# Error')) {
      return result.generatedCode;
    } else {
      const { functionName, parameterNames, generatedCode } = rewriteVariables(statement.functionName, statement.parameterNames, result.generatedCode);

      let userReturnUnits = "";

      if (isMatrixResult(result)) {
        let matrixUnits = new Set<string>();
        for (const row of result.results) {
          for (const value of row) {
            matrixUnits.add(value.units);
          }
        }
        if (matrixUnits.size === 1) {
          if (statement.units) {
            userReturnUnits = statement.units;
          } else if (result.results[0][0].customUnitsDefined) {
            userReturnUnits = result.results[0][0].customUnits;
          }
        }
      } else if (statement.units) {
        userReturnUnits = statement.units;
      } else if (result.customUnitsDefined) {
        userReturnUnits = result.customUnits;
      }

      return `${generatedCode.includes('numpy') ? "import numpy\n\n": ""}def ${functionName}(${parameterNames.join(", ")}):
    """
    Function '${functionName}' automatically generated by EngineeringPaper.xyz

    Parameters
    ----------
${parameterNames.map(parameterMap).join("\n")}

    Returns
    -------
    ${isMatrixResult(result) ? "numpy.array" : "float"}
        Return value ${isMatrixResult(result) ? getMatrixUnitsResult(result, userReturnUnits) : getUnitsDescription(userReturnUnits ? userReturnUnits : result.units)}
    """
${parameterNames.map(parameterConversionMap).filter(value => value !== "").map((row, i) => i === 0 ? "\n"+row : row).map(row => row+"\n").join("")}
    result = ${generatedCode}

    ${getReturnConversion(userReturnUnits)}
`
    }
  }

  $: cell = $cells[index]

  $: if (cell instanceof MathCell && cell.mathField.statement &&
        cell.mathField.statement.type === "query" && 
        cell.mathField.statement.isCodeFunctionQuery) {
      statement = cell.mathField.statement;
    } else {
      statement = null;
    }


  $: {
      const tempResult = $results[index];    
      if (tempResult && !(tempResult instanceof Array)) {
      result = tempResult;
    } else {
      result = null;
    }
  }

  $: if (statement && result && "generatedCode" in result && result.generatedCode) {
    try {
      generatedCode = codeTemplate(statement, result);
    } catch(e) {
      generatedCode = `# Error generated code: ${e} If this error persists, report to support@engineeringpaper.xyz with the sheet that generates the error.`
    }
  } else {
    generatedCode = "";
  }
</script>

<style>
  div.info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-block-end: 10px;
  }
</style>

<div class="info">
  <Information color="blue"/>
  <div>
    Always test the generated code against known values, report issues or errors to 
    <a href="mailto:support@engineeringpaper.xyz">support@engineeringpaper.xyz</a>
  </div>
</div>

{#await pyodidePromise}
  <InlineLoading description="Generating Python Code..."/>
{:then promiseReturn}
  {#if generatedCode}
    <CodeSnippet
      type="multi"
      code={generatedCode}
      expanded
      light={true}
    />
  {/if}
{:catch promiseError}
  <InlineLoading status="error" description={promiseError}/>
{/await}