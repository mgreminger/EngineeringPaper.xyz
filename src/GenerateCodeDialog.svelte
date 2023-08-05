<script lang="ts">
  import { onMount } from 'svelte';
  import { results, cells, mathCellChanged } from './stores';
  import type { CodeFunctionQueryStatement } from './parser/types';
  import type { Cell } from './cells/Cells';
  import MathCell from './cells/MathCell';
  import type { FiniteImagResult, Result, MatrixResult, PlotResult } from './resultTypes';
  import { InlineLoading, CodeSnippet } from 'carbon-components-svelte';

  export let pyodidePromise: Promise<any>;
  export let index: number;

  let cell: Cell | undefined;
  let result: Result | FiniteImagResult | MatrixResult | PlotResult[];
  let statement: CodeFunctionQueryStatement | null = null;

  onMount(() => {
    if (statement) {
      statement.generateCode = true;

      $cells = $cells;
      $mathCellChanged = true;
    }
  });
  
  $: cell = $cells[index]

  $: result = $results[index];

  $: if (cell instanceof MathCell && cell.mathField.statement &&
        cell.mathField.statement.type === "query" && 
        cell.mathField.statement.isCodeFunctionQuery) {
      statement = cell.mathField.statement;
    } else {
      statement = null;
    }
</script>


{#await pyodidePromise}
  <InlineLoading description="Generating Python Code..."/>
{:then promiseReturn}
  {#if result && "generatedCode" in result}
    <CodeSnippet type="multi" code={result.generatedCode} expanded />
  {/if}
{:catch promiseError}
  <InlineLoading status="error" description={promiseError}/>
{/await}