<script lang="ts">
  import appState, { dataTableToSelectorTable, mathCellChanged, triggerSaveNeeded } from "./stores.svelte";

  import { isFiniteImagResult, type Result,
           type MatrixResult, isDataTableResult} from "./resultTypes";

  import type { QueryStatement, UnitsStatement } from "./parser/types";

  import { onMount, tick, untrack } from "svelte";

  import { format } from "mathjs";

  import { arraysEqual, convertArrayUnits, getArraySI, prepLatexForMarkdown, unitsEquivalent, unitsValid } from "./utility.js";

  import DataTableCell, { excelColName } from "./cells/DataTableCell.svelte";

  import MathField from "./MathField.svelte";
  import DataTableInput from "./DataTableInput.svelte";
  import TextButton from "./TextButton.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import ErrorIcon from "carbon-icons-svelte/lib/Error.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import Grid from "carbon-icons-svelte/lib/Grid.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import ColumnDelete from "carbon-icons-svelte/lib/ColumnDelete.svelte";
  import RowCollapse from "carbon-icons-svelte/lib/RowCollapse.svelte";
  import AddComment from "carbon-icons-svelte/lib/AddComment.svelte";
  import ChatOff from "carbon-icons-svelte/lib/ChatOff.svelte";
  import IconButton from "./IconButton.svelte";
  import Copy from "carbon-icons-svelte/lib/Copy.svelte";
  import SettingsAdjust from "carbon-icons-svelte/lib/SettingsAdjust.svelte";
  import type { ModalInfo } from "./types";
  import type { Statement, SubQueryStatement } from "./parser/types";
  import type { CellStatements } from "./types";
  import type { SystemDefinition } from "./cells/SystemCell.svelte";
  import type { FluidFunction } from "./cells/FluidCell.svelte";
  import type { CodeCellFunction } from "./cells/CodeCell.svelte";
  import { gridDetector, type GridInterpolationFunction, type InterpolationFunction } from "./cells/DataTableCell.svelte";
  import { getBlankStatement, getInitialParsingState, type ParsingState } from "./parser/utility";
  import type { NumberFormatOptions } from "./sheet/Sheet";
  import { convertLatexToAsciiMath } from "mathlive";
  import { SvelteMap } from "svelte/reactivity";

  interface Props {
    index: number;
    dataTableCell: DataTableCell;
    modal: (arg: {detail: {modalInfo: ModalInfo}}) => void;
    updateDataTableNumberFormat: (dataTableCell: DataTableCell, colNumber: number) => void;
  }

  let {
    index,
    dataTableCell = $bindable(),
    modal,
    updateDataTableNumberFormat
  }: Props = $props();

  let numColumns = $derived(dataTableCell.columnData.length);
  let numRows = $derived(dataTableCell.columnData[0].length);
  let numInterpolationDefs = $derived(dataTableCell.interpolationDefinitions.length);

  let columnIdLocationMap = $derived.by(() => {
      const map = new SvelteMap<number, number>();
      if (dataTableCell.columnIds) {
        for (const [i, id] of dataTableCell.columnIds.entries()) {
          map.set(id, i);
        }
      }
      return map;
    });

  let columnIdentifiers: Record<number, string | null> = $state(
    // svelte-ignore state_referenced_locally
    Object.fromEntries(dataTableCell.columnIds.map(id => [id, null]))
  );

  let columnErrors: Record<number, string | null> = $state(
    // svelte-ignore state_referenced_locally
    Object.fromEntries(dataTableCell.columnIds.map(id => [id, '']))
  );

  let columnOutputUnits: Record<number, string> = $state(
    // svelte-ignore state_referenced_locally
    Object.fromEntries(dataTableCell.columnIds.map(id => [id, '']))
  );

  let columnIsOutput: Record<number, boolean> = $state(
    // svelte-ignore state_referenced_locally
    Object.fromEntries(dataTableCell.columnIds.map(id => [id, false]))
  );

  let numInputs = $derived(dataTableCell.columnIds.filter(id => !columnIsOutput[id]).length);
  let result = $derived(appState.results[index]);
  let columnFormatOptions = $derived(dataTableCell.columnFormatOptions.map((value) => value === null ? appState.config.mathCellConfig.formatOptions : value));
  let containerDiv: HTMLDivElement;
  let copyButtonText = $state("Copy Data");
  let descOffset = $derived(dataTableCell.showDescriptions ? 1 : 0);
  let nameLatexElement: MathField[] = $state([]);

  let colVars = $state<string[]>([]);
  $effect(() => {
    const nextColVars = dataTableCell.columnIds.map((id) => columnIdentifiers[id]).filter(value => value !== null);
    if (!arraysEqual(colVars, nextColVars)) {
      colVars = nextColVars;
    }
  });

  let parameterParsingStates: Record<number, ParsingState> = $state(
    // svelte-ignore state_referenced_locally
    Object.fromEntries(dataTableCell.columnIds.map(id => [id, getInitialParsingState()]))
  );

  let parameterUnitParsingStates: Record<number, ParsingState> = $state(
    // svelte-ignore state_referenced_locally
    Object.fromEntries(dataTableCell.columnIds.map(id => [id, getInitialParsingState()]))
  );

  let parserIds: Record<number, number> = $state(
    // svelte-ignore state_referenced_locally
    Object.fromEntries(dataTableCell.columnIds.map(id => [id, appState.nextParserId++]))
  );

  let columnStatements: Record<number, Statement | null> = $state(
    // svelte-ignore state_referenced_locally
    Object.fromEntries(dataTableCell.columnIds.map(id => [id, null]))
  );

  // svelte-ignore state_referenced_locally
  let nameParsingStates: ParsingState[] = $state(Array.from({ length: numInterpolationDefs }, () => getInitialParsingState()));

  let columnParsePendingCount = $state(0);

  const columnParserTimeouts: Map<number, {timeout: number, resolvers: (() => void)[]}> = new Map();
  const columnParseRuns: Map<number, number> = new Map();
  let inColumnParseDebouncer = $state(false);

  $effect.pre(() => {
    for (const id of dataTableCell.columnIds) {
      if (!parameterParsingStates[id]) {
        parameterParsingStates[id] = getInitialParsingState();
      }
      if (!parameterUnitParsingStates[id]) {
        parameterUnitParsingStates[id] = getInitialParsingState();
      }
      if (!parserIds[id]) {
        parserIds[id] = appState.nextParserId++;
      }
      if (columnStatements[id] === undefined) {
        columnStatements[id] = null;
      }
      if (columnIdentifiers[id] === undefined) {
        columnIdentifiers[id] = null;
      }
      if (columnErrors[id] === undefined) {
        columnErrors[id] = "";
      }
      if (columnOutputUnits[id] === undefined) {
        columnOutputUnits[id] = "";
      }
      if (columnIsOutput[id] === undefined) {
        columnIsOutput[id] = false;
      }
    }
    
    if (nameParsingStates.length !== dataTableCell.interpolationDefinitions.length) {
      const newLength = dataTableCell.interpolationDefinitions.length;
      nameParsingStates = Array.from({ length: newLength }, (_, i) => nameParsingStates[i] || getInitialParsingState());
    }
  });

  let parsingError = $derived.by(() => {
    return dataTableCell.columnIds.some(id => parameterParsingStates[id]?.parsingError ?? false) ||
           dataTableCell.columnIds.some(id => parameterUnitParsingStates[id]?.parsingError ?? false) ||
           nameParsingStates.some(value => value.parsingError);
  });

  let parsePending = $derived.by(() => {
    return columnParsePendingCount > 0 ||
           dataTableCell.columnIds.some(id => parameterParsingStates[id]?.parsePending ?? false) ||
           dataTableCell.columnIds.some(id => parameterUnitParsingStates[id]?.parsePending ?? false) ||
           nameParsingStates.some(value => value.parsePending)
           inColumnParseDebouncer;
  });

  let cellStatements: CellStatements = $derived.by(() => {
    const statements: (Statement | SubQueryStatement)[] = [];
    const endStatements: (Statement | SubQueryStatement)[] = [];
    const subQueries: Map<string,SubQueryStatement> = new Map();
    const systemDefinitions: SystemDefinition[] = [];
    const fluidFunctions: FluidFunction[] = [];
    const codeCellFunctions: CodeCellFunction[] = [];
    const interpolationFunctions: (InterpolationFunction | GridInterpolationFunction)[] = [];

    let queryCount = 0;
    
    for (const id of dataTableCell.columnIds) {
      const statement = $state.snapshot(columnStatements[id]);
      if (statement) {
        if (statement.type === "query") {
          if (statement.isDataTableQuery) {
            statement.cellNum = index
            statements.push(statement);
            queryCount++;
          }
          if (statement.assignment) {
            endStatements.push(statement.assignment);
          }
        } else {
          endStatements.push(statement);
        }
      }
    }
    if (queryCount === 0) {
      statements.push(getBlankStatement());
    }
    interpolationFunctions.push(...dataTableCell.interpolationFunctions.filter(value => value !== undefined));

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
    return parsePending;
  }

  export function getParsingError() {
    return parsingError;
  }

  export function getCellStatements() {
    return cellStatements;
  }

  export async function getMarkdown(centerEquations: boolean) {
    const rows = await getSheetRows(true, columnFormatOptions);
    const colDef = Array(rows[0].length).fill(':----');
    const table = [rows[0], colDef, ...rows.slice(1)];
    return table.map(row => '|' + row.join('|') + '|').join('\n') + '\n\n';
  }

  onMount(() => {
    if (appState.activeCell === index) {
      focus();
    }
  });

  function handleUpdateNumberFormat(colNumber: number) {
    updateDataTableNumberFormat(dataTableCell, colNumber);
  }

  function focus() {
    if ( containerDiv && containerDiv.parentElement &&
         !containerDiv.parentElement.contains(document.activeElement) ) {
      const inputElement: HTMLInputElement = document.querySelector(`#data-table-input-${index}-0-0`);
      if (inputElement) {
        inputElement.focus();
      }
    }
  }

  async function addRow() {
    dataTableCell.addRow();
    await tick();
    triggerSaveNeeded();
  }

  function addColumn() {
    dataTableCell.addColumn();
    triggerSaveNeeded();
    appState.resultsInvalid = true;
    mathCellChanged();
  }

  async function deleteRow(rowIndex: number) {
    appState.resultsInvalid = true;
    dataTableCell.deleteRow(rowIndex);
    triggerSaveNeeded(true);
    for (let i = 0; i < dataTableCell.columnData.length; i++) {
      await debounceParseColumn(dataTableCell.columnIds[i]);
    }
    mathCellChanged();
  }

  function deleteEmptyRows() {
    dataTableCell.deleteEmptyRows();
    triggerSaveNeeded();
  }

  async function deleteColumn(colIndex: number) {
    dataTableCell.deleteColumn(colIndex);
    fixInterpolationCols();
    appState.resultsInvalid = true;
    triggerSaveNeeded(true);
    mathCellChanged();
  }

  async function handleEnter(row: number) {
    if (row == numRows-1) {
      await addRow();
    }
    if (dataTableCell.showDescriptions) {
      const descElement = document.querySelector(`#descriptions-input-${index}-${row+1}`) as HTMLDivElement | null;
      if (descElement) {
        descElement.focus();
      }
    } else {
      const firstInputColumn = dataTableCell.columnIds.map(id => columnIsOutput[id]).findIndex(isOutput => !isOutput);
      const fieldElement = document.querySelector(`#data-table-input-${index}-${row+1}-${firstInputColumn}`) as HTMLDivElement | null;
      if (fieldElement) {
        fieldElement.focus();
      }
    }
  }

  async function parseParameterField(column: number, topLevel = true) {
    const id = dataTableCell.columnIds[column];
    
    columnStatements[id] = null;

    if (!parameterParsingStates[id].parsingError) {
      columnErrors[id] = "";
      
      let newId = null;

      if (parameterParsingStates[id].statement?.type === "parameter") {
        columnIsOutput[id] = false;
        newId = parameterParsingStates[id].statement.name;
        await debounceParseColumn(id);
      } else {
        columnIsOutput[id] = true;
        if ("assignment" in parameterParsingStates[id].statement && parameterParsingStates[id].statement.assignment) {
          newId = parameterParsingStates[id].statement.assignment.name;
        }
        columnStatements[id] = (parameterParsingStates[id].statement as QueryStatement);
      }

      if (columnIdentifiers[id] !== newId) {
        columnIdentifiers[id] = newId;
      }
    } else {
      columnErrors[id] = parameterParsingStates[id].parsingErrorMessage;
      columnIsOutput[id] = false;
    }

    appState.resultsInvalid = true;
  }

  async function parseUnitField(column: number) {
    const colId = dataTableCell.columnIds[column];
    if (!columnIsOutput[colId]) {
      await debounceParseColumn(colId);
    }
    appState.resultsInvalid = true;
  }

  async function parseDataField(column: number) {
    triggerSaveNeeded(true);

    const colId = dataTableCell.columnIds[column];
    if (!columnIsOutput[colId]) {
      await debounceParseColumn(colId);
    }

    appState.resultsInvalid = true;
    mathCellChanged();
  }

  function handleDescUpdate() {
    triggerSaveNeeded();
  }

  function setColumnResult(colId: number, colResult: MatrixResult) {
    if (!columnIdLocationMap.has(colId)) {
      return;
    }
    let colNum = columnIdLocationMap.get(colId);
    columnErrors[colId] = "";
    columnOutputUnits[colId] = "";
    columnIsOutput[colId] = true;
    
    const currentCol = dataTableCell.columnData[colNum];
    currentCol.fill('');

    let newColData: number[] = [];

    if (colResult.results[0].length !== 1) {
      columnErrors[colId] = "Only column vectors can be placed in a data table";
      return;
    }

    const statement = columnStatements[colId];
    if (!statement) {
      columnErrors[colId] = "Parsing Error (mismatch between expression and result)";
      return;
    }

    if (statement.type !== "query"){
      columnErrors[colId] = "Parsing Error (mismatch between expression and result)";
      return;
    }

    let resultUnits = "";
    let resultUnitsLatex = "";
    let firstResult: Result;

    let resultUnitSet: Set<string> = new Set();

    for (const [i, resultRow] of colResult.results.entries()) {
      for (const [j, result] of resultRow.entries()) {
        if (isFiniteImagResult(result)) {
          columnErrors[colId] = "Some results evaluate to an imaginary number, which cannot be displayed in a data table";
          return;
        } else if (!(result.numeric && result.finite)) {
          columnErrors[colId] = "Some results do not evaluate to a finite real value, which cannot be displayed in a data table";
          return;
        } else {
          if (i === 0 && j === 0) {
            resultUnits = result.units;
            resultUnitsLatex = result.unitsLatex;
            firstResult = result;
          }
          newColData.push(Number(result.value));
          resultUnitSet.add(result.units);
        }
      }
    }

    if (resultUnitSet.size > 1) {
      columnErrors[colId] = "All entries in the column vector must have the same units";
      return;
    }

    if (!unitsValid(firstResult.units)) {
      columnErrors[colId] = "Dimension Error";
      return;
    }

    if ( statement.units || firstResult.customUnitsLatex) {
      const startingUnits = resultUnits;

      if (statement.units) {
        resultUnitsLatex = statement.unitsLatex;
        resultUnits = statement.units;
      } else {
        resultUnitsLatex = firstResult.customUnitsLatex;
        resultUnits = firstResult.customUnits;
      } 

      if (unitsEquivalent(resultUnits, startingUnits)) {
        newColData = convertArrayUnits(newColData, startingUnits, resultUnits);
      } else {
        columnErrors[colId] = "Units Mismatch";
        return;
      } 
    }

    for (const [i, value] of newColData.entries()) {
      currentCol[i] = String(value);
    }

    columnOutputUnits[colId] = resultUnitsLatex;

    const paddingNeeded = dataTableCell.padColumns();
    if (paddingNeeded) {
      appState.cells[index] = appState.cells[index];
    }
  }

  function clearOutputColumns() {
    for (const [i, column] of dataTableCell.columnData.entries()) {
      if (columnIsOutput[dataTableCell.columnIds[i]]) {
        column.fill('');
      }
    }
  }

  function handleAddInterpolationFunction(type: "interpolation" | "polyfit") {
    let input = -1;
    let output = -1;

    for (const [loc, id] of dataTableCell.columnIds.entries()) {
      if (!columnIsOutput[id]) {
        if (input < 0) {
          input = loc;
        } else if (output < 0) {
          output = loc;
          break;
        }
      }
    }
    if (input === -1 || output === -1) {
      return;
    }

    dataTableCell.addInterpolationDefinition(type, input, output);

    appState.cells[index] = appState.cells[index];
    triggerSaveNeeded();
    mathCellChanged();
  }

  async function parseInterpolationDefNameField(column: number) {
    setInterpolationFunctions();
    appState.resultsInvalid = true;
    triggerSaveNeeded(true);
    mathCellChanged();
  }

  function handleInputOutputChange(defIndex: number) {
    setInterpolationFunctions();
    triggerSaveNeeded();
    mathCellChanged();
  }

  function handlePolyOrderChange(defIndex: number) {
    setInterpolationFunctions();
    triggerSaveNeeded();
    mathCellChanged();
  }

  function handleNumInputsChange(defIndex: number) {
    setInterpolationFunctions();
    triggerSaveNeeded();
    mathCellChanged();
  }

  function handleDeleteInterpoloationDef(defIndex: number) {
    dataTableCell.deleteInterpolationDefinition(defIndex);
    nameParsingStates = [...nameParsingStates.slice(0,defIndex), ...nameParsingStates.slice(defIndex+1)];
    setInterpolationFunctions();
    triggerSaveNeeded();
    mathCellChanged();
  }

  async function handleLoadSpreadsheet() {
    try {
      modal({detail: {modalInfo: {state: "importingSpreadsheet", modalOpen: true, heading: 'Importing Spreadsheet'}}});
      await selectAndLoadSpreadsheetFile();
      modal({detail: {modalInfo: {state: "importingSpreadsheet", modalOpen: false, heading: 'Importing Spreadsheet'}}});
      
      triggerSaveNeeded();
      mathCellChanged();
    } catch (e) {
      modal({detail: {modalInfo: {state: "error", modalOpen: true, error: e, heading: 'Importing Spreadsheet'}}});
    }
  }

  async function handleExportCSV() {
    await exportAsCSV(appState.title);
  }

  async function copyData() {
    const clipboardData = await getClipboardData();

    if (clipboardData === "") {
      copyButtonText = "No data to copy";
    } else {
      try {
        await navigator.clipboard.writeText(clipboardData);
        copyButtonText = "Copied!";
      } catch (e) {
        copyButtonText = "Copy failed, check browser settings";
      }
    }

    setTimeout(() => copyButtonText="Copy Data", 2000);
  }

  function convertToSelectorTable() {
    dataTableCell.padColumns();
    dataTableToSelectorTable(index, dataTableCell.serialize(columnIsOutput, columnOutputUnits));
    triggerSaveNeeded();
    mathCellChanged(); 
  }

  function debounceParseColumn(columnId: number, timeout = 300): Promise<void> {
    inColumnParseDebouncer = true;
    return new Promise((resolve, _reject) => {
      let resolvers: (() => void)[] = [];

      if (columnParserTimeouts.has(columnId)) {
        const pendingCalls = columnParserTimeouts.get(columnId);
        clearTimeout(pendingCalls.timeout);
        resolvers = pendingCalls.resolvers;
      }
      
      resolvers.push(resolve);

      const newTimeout = setTimeout(async () => {
        columnParserTimeouts.delete(columnId);
        try {
          await parseColumn(columnId);
        } finally {
          for (const resolver of resolvers) {
            resolver();
          }
          if (columnParserTimeouts.size === 0) {
            inColumnParseDebouncer = false;
          }
        }
      }, timeout);

      columnParserTimeouts.set(columnId, {timeout: newTimeout, resolvers});
    });
  }

  
  async function parseColumn(columnId: number) {
    if (!columnIdLocationMap.has(columnId)) {
      return;
    }
    let column = columnIdLocationMap.get(columnId);

    const isInterpolationCol = dataTableCell.isInterpolationCol(column);

    if (columnIsOutput[columnId]) {
      if (isInterpolationCol) {
        fixInterpolationCols();
      }
      return;
    }

    const runId = (columnParseRuns.get(columnId) || 0) + 1;
    columnParseRuns.set(columnId, runId);

    columnErrors[columnId] = "";

    let endIndex = dataTableCell.columnData[column].findIndex(value => value.trim() === '' || isNaN(Number(value)));
    if (endIndex === -1) {
      endIndex = undefined;
    }
    let columnValues = dataTableCell.columnData[column].slice(0, endIndex);
    
    if (columnValues.length > 0 && 
        parameterUnitParsingStates[columnId]?.statement && 
        parameterUnitParsingStates[columnId]?.statement.type !== "error") {

      let combinedLatex: string;

      if (parameterUnitParsingStates[columnId].statement.type === "blank" || 
        !arraysEqual([0,0,0,0,1,0,0,0,0], (parameterUnitParsingStates[columnId].statement as UnitsStatement).dimensions)) {
        combinedLatex = String.raw`${dataTableCell.parameterLatexs[column]} = \begin{bmatrix} ${columnValues.join(' \\\\ ')} \end{bmatrix}`;
        
        if (parameterUnitParsingStates[columnId].statement.type !== "blank" ) {
          combinedLatex += String.raw` \cdot 1 ${dataTableCell.parameterUnitLatexs[column]}`;
        }
      } else {
        columnValues = columnValues.map((value) => `${value} ${dataTableCell.parameterUnitLatexs[column]}`);
        combinedLatex = String.raw`${dataTableCell.parameterLatexs[column]} = \begin{bmatrix} ${columnValues.join(' \\\\ ')} \end{bmatrix}`;
      }

      let parsingError = false;
      let statement: Statement;

      columnParsePendingCount++;
      let parsingResult;
      try {
        parsingResult = await appState.parserWrapper.parseLatex(combinedLatex, parserIds[columnId], 'data_table_assign');
      } finally {
        columnParsePendingCount--;
      }

      if (columnParseRuns.get(columnId) !== runId) {
        return; 
      }

      if (!columnIdLocationMap.has(columnId)) {
        return;
      }
      column = columnIdLocationMap.get(columnId);

      statement = parsingResult.statement;
      parsingError = parsingResult.parsingError;

      columnStatements[columnId] = statement;
      mathCellChanged();

      if (parsingError) {
        columnErrors[columnId] = "Error parsing column data, check that all column number entries are either decimal numbers or integer numbers";
        columnStatements[columnId] = null;
      }
    } else {
      columnStatements[columnId] = null;
      mathCellChanged();
    }

    if (isInterpolationCol) {
      setInterpolationFunctions();
    }
  }

  function setInterpolationFunctions() {
    dataTableCell.interpolationFunctions = [];
    fixInterpolationCols();

    definitionLoop: for(const [defIndex, def] of dataTableCell.interpolationDefinitions.entries()) {
      if (nameParsingStates[defIndex].statement?.type !== "parameter") {
        console.warn('Interpolation function name parsing error');
        continue definitionLoop;
      }

      const endIndexInputs = [];
      for (const [i, input] of def.inputs.entries()) {
        endIndexInputs[i] = dataTableCell.columnData[input].findIndex(value => value.trim() === '' || isNaN(Number(value)));
        if (endIndexInputs[i] === -1) {
          endIndexInputs[i] = dataTableCell.columnData[input].length;
        }
      }

      let endIndexOutput = dataTableCell.columnData[def.output].findIndex(value => value.trim() === '' || isNaN(Number(value)));
      if (endIndexOutput === -1) {
        endIndexOutput = dataTableCell.columnData[def.output].length;
      }

      const endIndex = Math.min(...endIndexInputs, endIndexOutput);

      if (endIndex === 0) {
        console.warn('Zero length input for interpolation function');
        continue definitionLoop;
      }

      const inputUnitsList: Statement[] = [];
      for (const input of def.inputs) {
        const inputId = dataTableCell.columnIds[input];
        inputUnitsList.push(parameterUnitParsingStates[inputId]?.statement);
      }
      
      const outputId = dataTableCell.columnIds[def.output];
      let outputUnits: Statement = parameterUnitParsingStates[outputId]?.statement;

      for (const [i, inputUnits] of inputUnitsList.entries()) {
        if (inputUnits?.type === "blank") {
          inputUnitsList[i] = {
            type: "units",
            dimensions: Array(9).fill(0),
            units: "",
            unitsValid: true,
            unitsLatex: ""
          }
        }
      }

      if (outputUnits?.type === "blank") {
        outputUnits = {
          type: "units",
          dimensions: Array(9).fill(0),
          units: "",
          unitsValid: true,
          unitsLatex: ""
        }
      }
      
      for (const inputUnits of inputUnitsList) {
        if (!(inputUnits?.type === "units" && inputUnits.unitsValid)) {
          console.warn('Attempt to define interpolation function with an input units error');
          continue definitionLoop;
        }
      }

      if (!(outputUnits?.type === "units" && outputUnits.unitsValid)) {
        console.warn('Attempt to define interpolation function with an output units error');
        continue definitionLoop;
      }

      const inputValuesList: string[][] = [];
      for (const input of def.inputs) {
        inputValuesList.push(dataTableCell.columnData[input].slice(0, endIndex));
      }
      let outputValues = dataTableCell.columnData[def.output].slice(0, endIndex);

      let inputValuesSIList: number[][] = [];
      let outputValuesSI: number[];

      try {
        for (const [i, inputValues] of inputValuesList.entries()) {
          inputValuesSIList.push(getArraySI(inputValues, (inputUnitsList[i] as UnitsStatement).units));
        }
        outputValuesSI = getArraySI(outputValues, outputUnits.units);
      } catch (e) {
        console.warn('Error obtaining SI array for interpolation function');
        continue definitionLoop;
      }
      
      dataTableCell.interpolationFunctions[defIndex] = gridDetector({
        type: def.type,
        name: nameParsingStates[defIndex].statement.name,
        numInputs: def.numInputs,
        inputValues: inputValuesSIList,
        outputValues: outputValuesSI,
        inputDims: (inputUnitsList as UnitsStatement[]).map(inputUnits => inputUnits.dimensions),
        outputDims: outputUnits.dimensions,
        order: def.order
      });
    }
  }

  async function getSheetRows(forMarkdown = false, columnFormatOptions?: NumberFormatOptions[]): Promise<string[][]> {
    dataTableCell.padColumns(); // important that all columns are the same length

    let headers: string[]
    
    if (forMarkdown) {
      headers = dataTableCell.parameterLatexs.map(field => prepLatexForMarkdown(field.split("=")[0]));
    } else {
      headers = [...dataTableCell.parameterLatexs];
    }

    if (forMarkdown) {
      headers = headers.map(header => `$${header.trim()}$`);
    } else {
      headers = headers.map(header => convertLatexToAsciiMath(header));
    }

    if (dataTableCell.showDescriptions) {
      headers.unshift(dataTableCell.descriptionsHeader);
    }

    let units = dataTableCell.columnIds.map((id, j) => columnIsOutput[id] ? columnOutputUnits[id] : dataTableCell.parameterUnitLatexs[j]);
    const hasUnits = !units.every(value => value.trim() === "");

    if (hasUnits) {
      if (forMarkdown) {
        units = units.map((currentUnits) => currentUnits.trim() !== "" ? `$${currentUnits.trim()}$` : "");
      } else {
        for (const [i, currentUnits] of units.entries()){
          const parsingResult = await appState.parserWrapper.parseLatex(currentUnits, 0, "units");
          if (parsingResult.statement.type === "units") {
            units[i] = `[${parsingResult.statement.units}]`;
          } else {
            units[i] = currentUnits;
          }
        }
      }
      if (dataTableCell.showDescriptions) {
        units.unshift('');
      }
    }

    const descriptionsOffset = dataTableCell.showDescriptions ? 1 : 0;

    let data: string[][] = Array(dataTableCell.columnData[0].length).fill(0).map(_ => Array(dataTableCell.columnData.length + descriptionsOffset));

    if (dataTableCell.showDescriptions) {
      for (const [i, row] of data.entries()) {
        row[0] = dataTableCell.descriptions[i];
      }
    }

    for (const [i, row] of data.entries()) {
      for(const [j, col] of dataTableCell.columnData.entries()) {
        if (forMarkdown && col[i] !== '') {
          row[j+descriptionsOffset] = format(parseFloat(col[i]), columnFormatOptions[j]);
        } else {
          row[j+descriptionsOffset] = col[i];
        }
      }
    }

    let sheetRows: string[][];
    if (hasUnits) {
      sheetRows = [headers, units, ...data];
    } else {
      sheetRows = [headers, ...data];
    }
    return sheetRows;
  }

  async function exportAsCSV(name: string) {
    const workbook = DataTableCell.XLSX.utils.book_new();
    const sheet = DataTableCell.XLSX.utils.aoa_to_sheet(await getSheetRows());
    DataTableCell.XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
    DataTableCell.XLSX.writeFile(workbook, `${name}.csv`);
  }

  async function getClipboardData(): Promise<string> {
    return (await getSheetRows()).map(value => value.join('\t')).join('\n');
  }

  function selectAndLoadSpreadsheetFile(): Promise<void> {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = DataTableCell.spreadsheetExtensions;
      input.onchange = (event) => {
        loadFile(input.files[0])
          .then(() => resolve())
          .catch(error => reject(error));
      };
      input.oncancel = (event) => resolve();
      input.click();
    });
  }

  export function loadFile(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      if (file.size > 0) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            populateTable(event);
            resolve();
          } catch (e) {
            reject(e);
          }
        }
        reader.readAsArrayBuffer(file);
      } else {
        reject(new Error('Attempt to load empty file'));
      }
    });
  }

  function populateTable(fileReader: ProgressEvent<FileReader>){
    const data = new Uint8Array(fileReader.target.result as ArrayBuffer);
    const workbook = DataTableCell.XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    let inputRows = DataTableCell.XLSX.utils.sheet_to_json(worksheet, {header: 1}) as any[][];

    if (inputRows.length < 1) {
      throw new Error('Imported spreadsheet must contain a least one row of numerical data');
    }

    let longestRow = 0;
    for (const row of inputRows) {
      if (row.length > longestRow) {
        longestRow = row.length;
      }
    }

    if (longestRow === 0) {
      throw new Error('Imported spreadsheet must contain a least one column of data');
    }

    let hasDescriptions = false;
    let descriptionsHeader = "";
    let descriptions: string[] = [];
    if (longestRow > 1 && inputRows.length > 1) {
      if (inputRows.map(row => row[0]).every(value => (isNaN(Number(value)) || value?.toString().trim() === ""))) {
        longestRow = longestRow - 1;
        hasDescriptions = true;
        descriptionsHeader = inputRows[0][0];
        descriptions = inputRows.slice(1).map(row => row[0]);
        inputRows = inputRows.map(row => row.slice(1));
      }
    }

    let parameterNamesRow: string[];
    let unitsRow: string[];
    let dataRows: string[][];

    if (inputRows[0].some(value => value !== undefined && isNaN(Number(value)))) {
      parameterNamesRow = inputRows[0].map(value => String(value ?? ""));

      if (inputRows.length < 2) {
        throw new Error("Imported spreadsheet must contain a least one row of numerical data");
      }

      let secondRowContainsUnits = inputRows[1].some(value => value !== undefined && isNaN(Number(value)));

      if (secondRowContainsUnits) {
        unitsRow = inputRows[1].map(value => String(value ?? ""));
        dataRows = inputRows.slice(2);
        if (hasDescriptions) {
          descriptions.shift();
        }
      } else {
        unitsRow = Array(longestRow).fill('');
        dataRows = inputRows.slice(1);
      }
    } else {
      // first row is numeric, need to add column parameter names
      dataRows = inputRows;
      parameterNamesRow = Array(longestRow).fill(0).map((value, j) => excelColName(j));
      unitsRow = Array(longestRow).fill('');
      if (hasDescriptions) {
        descriptions.unshift(descriptionsHeader);
        descriptionsHeader = 'Row Labels';
      }
    }

    if (parameterNamesRow.length < 1) {
      throw new Error('Imported spreadsheet must contain a least one entry in the first row');
    }

    const numRows = dataRows.length;

    if (numRows < 1) {
      throw new Error('Imported spreadsheet must contain a least one row of numerical data');
    }

    dataTableCell.parameterLatexs = [];
    dataTableCell.parameterUnitLatexs = [];
    dataTableCell.columnData = [];
    for (let col = 0; col < longestRow; col++) {
      let parameterName: string;
      if ((parameterNamesRow[col] ?? "").trim() === "") {
        parameterName = excelColName(col);
      } else {
        parameterName = parameterNamesRow[col];
      }
      dataTableCell.parameterLatexs.push(parameterName)

      let units: string;
      units = unitsRow[col] ?? '';
      if ( !( /.*\[.*\].*/.test(units) || /.*\\lbrack.*\\rbrack.*/.test(units) ) ) {
        if (units.trim() === "") {
          units = "";
        } else {
          units = `[${units}]`;
        }
      }
      dataTableCell.parameterUnitLatexs.push(units);
      dataTableCell.columnData.push(Array(numRows).fill(''));
    }

    for (const [i,row] of dataRows.entries()) {
      for (const [j, value] of row.entries()) {
        dataTableCell.columnData[j][i] = String(value ?? "");
      }
    }

    dataTableCell.columnFormatOptions = Array(dataTableCell.columnData.length).fill(null);
    dataTableCell.interpolationDefinitions = [];
    dataTableCell.interpolationFunctions = [];

    dataTableCell.columnIds = [];
    for (let col = 0; col < dataTableCell.columnData.length; col++) {
      dataTableCell.columnIds[col] = dataTableCell.getNextColId();
    }

    if (hasDescriptions) {
      dataTableCell.showDescriptions = true;
      dataTableCell.descriptionsHeader = descriptionsHeader;
      dataTableCell.descriptions = descriptions;
    } else {
      dataTableCell.showDescriptions = false;
      dataTableCell.descriptionsHeader = 'Row Labels';
      dataTableCell.descriptions = Array(numRows).fill('');
    }

    parameterParsingStates = Object.fromEntries(dataTableCell.columnIds.map(id => [id, getInitialParsingState()]));
    parameterUnitParsingStates = Object.fromEntries(dataTableCell.columnIds.map(id => [id, getInitialParsingState()]));
    parserIds = Object.fromEntries(dataTableCell.columnIds.map(id => [id, appState.nextParserId++]));
    columnStatements = Object.fromEntries(dataTableCell.columnIds.map(id => [id, null]));
    nameParsingStates = [];
  }

  function fixInterpolationCols() {
    const dataCols = new Set(dataTableCell.columnIds.map(id => columnIsOutput[id]).map((value, i) => value ? -1 : i).filter(value => value >= 0));
    if (dataCols.size < 2) {
      // not enough cols to perform interpolation
      dataTableCell.interpolationDefinitions = [];
      return;
    }

    for (const def of dataTableCell.interpolationDefinitions) {
      if (dataCols.size < def.numInputs + 1) {
        def.numInputs = dataCols.size - 1;
      }

      def.inputs.length = def.numInputs;

      for (const [i, inputCol] of def.inputs.entries()) {
        let valid = true;
        if (def.inputs.slice(0,i).includes(inputCol)) {
          valid = false;
        } else if (!dataCols.has(inputCol)) {
          valid = false;
        }

        if (!valid) {
          for (const dataCol of dataCols) {
            if (!def.inputs.slice(0,i).includes(dataCol)) {
              def.inputs[i] = dataCol;
              break;
            }
          }
        }
      }

      if (!dataCols.has(def.output) || def.inputs.includes(def.output)) {
        for (const dataCol of dataCols) {
          if (!(def.inputs.includes(dataCol))) {
            def.output = dataCol;
            break;
          }
        }
      }
    }
  }

  $effect( () => {
    if (appState.activeCell === index) {
        focus();
    }
  });

  $effect( () => {
    let currentResult = result;
    let resultsInvalid = appState.resultsInvalid;

    untrack(() => {
      if (currentResult && isDataTableResult(currentResult) && !resultsInvalid) {
        for (const [colId, colResult] of Object.entries(currentResult.colData)) {
          setColumnResult(Number(colId), colResult);
        }
      } else {
        clearOutputColumns();
      }
    })
  });

</script>


<style>
  div.container {
    display: grid;
    width: max-content;
    padding-top: 10px;
    padding-bottom: 10px;
    break-inside: avoid;
  }

  div.item {
    border: solid 1px;
    margin: 0 -1px -1px 0;
    display: flex;
    justify-content: left;
    padding: 7px;
    min-width: 170px;
  }

  div.item.math-field, div.item.data-field {
    display: flex;
    align-items: center;
  }

  div.item.data-field {
    min-height: 43.2px;
  }

  div.item.math-field.calculated {
    padding-inline-start: 0px;
  }

  div.item.data-field.calculated {
    padding-inline-start: 12px;
  }

  div.vertical {
    display: flex;
    flex-direction: column;
  }

  div.horizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  div.horizontal.spread, div.item.spread {
    justify-content: space-between;
  }

  .margin-left {
    margin-left: 5px;
  }

  .margin-right {
    margin-right: 10px;
  }

  .padding-bottom {
    padding-bottom: 4px;
  }

  div.top-buttons {
    display: flex;
    flex-wrap: wrap;
    row-gap: 5px;
    column-gap: 3px;
  }

  div.bottom-buttons {
    margin-top: 1px;
  }

  div.delete-columns {
    justify-self: center;
  }

  div.buttons {
    margin-left: 1px;
    margin-right: 1px;
    align-self: center;
  }

  div.buttons.align-start {
    align-self: start;
  }

  div.buttons.justify-right {
    display: flex;
    justify-content: end;
  }

  div.error-place-holder {
    width: 24px;
  }

  @media print {
    div.buttons, div.bottom-buttons, div.error-place-holder, div.info-tooltip, div.settings-button {
      display: none !important;
    }

    div.item {
      min-width: auto;
    }
  }

</style>

<div class="top-buttons">
  {#if !dataTableCell.showDescriptions}
    <IconButton
      title="Show Row Labels"
      id={`show-row-labels-${index}`}
      click={() => dataTableCell.showDescriptions = true}
    >
      <AddComment />
    </IconButton>
  {:else}
    <IconButton
      title="Hide Row Labels"
      id={`hide-row-labels-${index}`}
      click={() => dataTableCell.showDescriptions = false}
    >
      <ChatOff />
    </IconButton>
  {/if}

  <TextButton
    onclick={handleLoadSpreadsheet}
  >
    Import Spreadsheet
  </TextButton>
  <TextButton
    onclick={handleExportCSV}
  >
    Export CSV
  </TextButton>
  <TextButton
    onclick={copyData}
  >
    {copyButtonText}
  </TextButton>
  
  {#if numInputs >= 2}
    <TextButton
      onclick={() => handleAddInterpolationFunction('interpolation')}
    >
      Add Interpolation
    </TextButton>
    <TextButton
      onclick={() => handleAddInterpolationFunction('polyfit')}
    >
      Add Polyfit
    </TextButton>
  {/if}
  <TextButton
    onclick={convertToSelectorTable}
  >
    Convert to Selector Table
  </TextButton>
</div>

<div
  class="container"
  bind:this= {containerDiv}
  spellcheck={appState.activeCell === index}
>
  {#if dataTableCell.parameterLatexs}
    {#if dataTableCell.showDescriptions}
      <div
        class="item data-field"
        style="grid-column: 1; grid-row: 1;"
      >
        <DataTableInput
          id="descriptions-header-input-{index}"
          bind:textContent={dataTableCell.descriptionsHeader} 
          input={handleDescUpdate}
        >
        </DataTableInput>
      </div>
    {/if}

    {#each dataTableCell.parameterLatexs as latex, j (dataTableCell.columnIds[j])}
      {@const colId = dataTableCell.columnIds[j]}
      <div
        class="item math-field"
        id={`parameter-name-${index}-${j}`}
        style="grid-column: {j + 1 + descOffset}; grid-row: 1;"
      >
        <MathField
          editable={true}
          type="data_table_expression"
          bind:latex={dataTableCell.parameterLatexs[j]}
          update={() => parseParameterField(j)}
          bind:parsingState={parameterParsingStates[colId]}
          dataTableInfo={{
            colVars,
            cellNum: j,
            colId: colId
          }}
        />
        {#if parameterParsingStates[colId]?.parsingError}
          {#if !parameterParsingStates[colId]?.parsePending}
            <TooltipIcon direction="right" align="end">
              <span slot="tooltipText">{parameterParsingStates[colId].parsingErrorMessage}</span>
              <ErrorIcon class="error"/>
            </TooltipIcon>
          {/if}
        {:else if columnErrors[colId]}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">{columnErrors[colId]}</span>
            <ErrorIcon class="error"/>
          </TooltipIcon>
        {:else if j === 0}
          <div class="info-tooltip">
            <TooltipIcon direction="right">
              <span slot="tooltipText">Place variable names or column queries in this row</span>
              <Information />
            </TooltipIcon>
          </div>
        {:else}
          <div class="error-place-holder"></div>
        {/if}
      </div>
    {/each}
  {/if}

  {#if dataTableCell.parameterUnitLatexs}
    {#if dataTableCell.showDescriptions}
      <div
        class="item data-field"
        style="grid-column: 1; grid-row: 2;"
      >
      </div>
    {/if}

    {#each dataTableCell.parameterUnitLatexs as latex, j (dataTableCell.columnIds[j])}
      {@const colId = dataTableCell.columnIds[j]}
      <div
        class="item math-field"
        class:calculated={columnIsOutput[colId]}
        id={`parameter-units-${index}-${j}`}
        style="grid-column: {j + 1 + descOffset}; grid-row: 2;"
      >
        {#if columnIsOutput[colId]}
          <MathField
            latex={columnOutputUnits[colId]}
          />
          <div class="settings-button">
            <IconButton
              title="Edit Column Number Format"
              statusDotTitle="Edit Column Number Format (Modified)"
              id={`number-format-${index}`}
              click={() => handleUpdateNumberFormat(j)}
              statusDot={Boolean(dataTableCell.columnFormatOptions[j])}
            >
              <SettingsAdjust />
            </IconButton>
          </div>
        {:else}
          <MathField
            editable={true}
            type="units"
            bind:latex={dataTableCell.parameterUnitLatexs[j]}
            update={() => parseUnitField(j)}
            bind:parsingState={parameterUnitParsingStates[colId]}
          />
          
          {#if parameterUnitParsingStates[colId]?.parsingError }
            {#if !parameterUnitParsingStates[colId]?.parsePending}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">{parameterUnitParsingStates[colId].parsingErrorMessage}</span>
                <ErrorIcon class="error"/>
              </TooltipIcon>
            {/if}
          {:else if j === 0}
            <div class="info-tooltip">
              <TooltipIcon direction="right">
                <span slot="tooltipText">Place column specific units in this row (optional)</span>
                <Information />
              </TooltipIcon>
            </div>
          {:else}
            <div class="error-place-holder"></div>
          {/if}
        {/if}
      </div>
    {/each}
  {/if}

  {#if numInterpolationDefs > 0}
    {#each dataTableCell.interpolationDefinitions as def, i}
      {#each [...Array(descOffset).fill(-1), ...dataTableCell.columnIds] as id, j (id)}
        {@const isOutput = id >= 0 ? columnIsOutput[id] : true}
        <div
          class="item spread"
          style="grid-column: {j+1}; grid-row: {i+3};"
        >
          {#if j === 0}
            <div class="vertical margin-right">
              <label
                class="padding-bottom"
                for={`interpolation-name-${index}-${i}`}
              >
                {def.type === "polyfit" ? "Polyfit Function Name:" : "Interpolation Function Name:"}
              </label>
              <div
                id={`interpolation-name-${index}-${i}`}
                class="horizontal"
              >
                <MathField
                  editable={true}
                  type="function_name"
                  bind:latex={def.nameLatex}
                  update={() => parseInterpolationDefNameField(i)}
                  bind:parsingState={nameParsingStates[i]}
                  bind:this={nameLatexElement[i]}
                />
                {#if nameParsingStates[i]?.parsingError}
                  {#if !nameParsingStates[i]?.parsePending}
                    <TooltipIcon direction="right" align="end">
                      <span slot="tooltipText">{nameParsingStates[i].parsingErrorMessage}</span>
                      <ErrorIcon class="error"/>
                    </TooltipIcon>
                  {/if}
                {:else}
                  <IconButton
                    click={() => nameLatexElement[i].getMathField()?.executeCommand('copyToClipboard')}
                    title="Copy function name to clipboard"
                    id={`copy-interpolation-function-name-${index}-${i}`}
                  >
                    <Copy />
                  </IconButton>
                {/if}
                <label class="margin-left">
                  Inputs:
                  <input
                    type="number"
                    bind:value={def.numInputs}
                    min="1"
                    max="20"
                    onchange={() => handleNumInputsChange(i)}
                  >
                </label>
                {#if def.type === "polyfit"}
                  <label class="margin-left">
                    Order:
                    <input
                      type="number"
                      bind:value={def.order}
                      min="0"
                      max="99"
                      onchange={() => handlePolyOrderChange(i)}
                    >
                  </label>
                {:else if dataTableCell.interpolationFunctions[i]?.type === "gridInterpolation"}
                  <div class="info-tooltip">
                    <TooltipIcon direction="right">
                      <span slot="tooltipText">2D grid data detected, using bilinear interpolation</span>
                      <Grid />
                    </TooltipIcon>
                  </div>
                {/if}
              </div>
            </div>
          {/if}       
          {#if !isOutput}
            <div class="vertical">
              {#each def.inputs as inputIndex, k}
                <div class="horizontal spread">
                  <label for={`input-radio-${index}-${i}-${j-descOffset}-${k}`}>
                    {def.numInputs === 1 ? "Input:" : `Input ${k+1}:`}
                  </label>
                  <input 
                    type="radio"
                    id={`input-radio-${index}-${i}-${j-descOffset}-${k}`}
                    name={`input_radio_${index}_${i}_${k}`}
                    bind:group={def.inputs[k]}
                    value={j-descOffset}
                    onchange={() => handleInputOutputChange(i)}
                  >
                </div>
              {/each}
              <div class="horizontal">
                <label for={`output-radio-${index}-${i}-${j-descOffset}`}>
                  Output:
                </label>
                <input 
                  type="radio"
                  id={`output-radio-${index}-${i}-${j-descOffset}`}
                  name={`output_radio_${index}_${i}`}
                  bind:group={def.output}
                  value={j-descOffset}
                  onchange={() => handleInputOutputChange(i)}
                >   
              </div>
            </div>
          {/if}
        </div>
      {/each}
      <div
        class="buttons"
        style="grid-column: {numColumns + 1 + descOffset}; grid-row: {i+3};"
      >
        <IconButton
          click={() => handleDeleteInterpoloationDef(i)}
          title={`Delete ${def.type === "polyfit" ? "Polyfit" : "Interpolation"} Function`}
          id={`delete-interpolation-row-${index}-${i}`}
        >
          <RowDelete />
        </IconButton>
      </div>
    {/each}
  {/if}

  {#if dataTableCell.columnData}
    {#each Array(numRows) as _, i }
      {#if dataTableCell.showDescriptions}
        <div
          class="item data-field"
          style="grid-column: 1; grid-row: {i+numInterpolationDefs+3};"
        >
          <DataTableInput
            enter={() => handleEnter(i)}
            id={`descriptions-input-${index}-${i}`}
            bind:textContent={dataTableCell.descriptions[i]} 
            input={handleDescUpdate}
          >
          </DataTableInput>
        </div>
      {/if}

      {#each Array(numColumns) as _, j }
        {@const nonNumeric = isNaN(Number(dataTableCell.columnData[j][i]))}
        {@const colId = dataTableCell.columnIds[j]}
        <div
          class="item data-field"
          class:calculated={columnIsOutput[colId]}
          id={`grid-cell-${index}-${i}-${j}`}
          style="grid-column: {j+1+descOffset}; grid-row: {i+numInterpolationDefs+3};"
        >
          {#if columnIsOutput[colId]}
            {@const value = dataTableCell.columnData[j][i]}
            {#if !appState.resultsInvalid && value !== ""}
              {format(parseFloat(value), columnFormatOptions[j])}
            {/if}
          {:else}
            <DataTableInput
              enter={() => handleEnter(i)}
              id={`data-table-input-${index}-${i}-${j}`}
              bind:textContent={dataTableCell.columnData[j][i]} 
              input={() => parseDataField(j)}
              error={nonNumeric}
            >
            </DataTableInput>
            {#if nonNumeric}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">Data table must contain numeric values</span>
                <ErrorIcon class="error"/>
              </TooltipIcon>
            {:else}
              <div class="error-place-holder"></div>
            {/if}
          {/if}
        </div>
      {/each}
    {/each}
  {/if}

  {#if numColumns > 1}
    {#each Array(numColumns) as _, j}
      <div 
        class="bottom-buttons delete-columns"
        style="grid-column: {j + 1 + descOffset}; grid-row: {numRows+numInterpolationDefs+3};"
      >
        <IconButton
          click={() => deleteColumn(j)}
          title="Delete Column"
          id={`delete-col-${index}-${j}`}
        >
          <ColumnDelete />
        </IconButton>
      </div>
    {/each}
  {/if}

  {#if numRows > 1}
    {#each Array(numRows) as _, i}
      <div 
        class="buttons"
        style="grid-column: {numColumns + 1 + descOffset}; grid-row: {i+numInterpolationDefs+3};"
      >
        <IconButton
          click={() => deleteRow(i)}
          title="Delete Row"
          id={`delete-row-${index}-${i}`}
        >
          <RowDelete />
        </IconButton>
      </div>
    {/each}
  {/if}

  <div class="buttons align-start" style="grid-column:{numColumns + 1 + descOffset}; grid-row:1">
    <IconButton
      id={`add-col-${index}`}
      click={addColumn}
      title="Add Column"
    > 
      <Add />
    </IconButton>
  </div>

  <div class="buttons" style="grid-column:1; grid-row:{numRows + numInterpolationDefs + 3}">
    <IconButton
      click={addRow}
      id={`add-row-${index}`}
      title="Add Row"
    >
      <Add />
    </IconButton>
  </div>

  {#if numRows > 1}
    <div class="buttons justify-right" style="grid-column:{numColumns + descOffset}; grid-row:{numRows + numInterpolationDefs + 3}">
      <IconButton
        click={deleteEmptyRows}
        id={`delete-blank-rows-${index}`}
        title="Delete Blank Rows"
      >
        <RowCollapse />
      </IconButton>
    </div>
  {/if}
</div>
