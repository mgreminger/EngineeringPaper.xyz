<script lang="ts">
  import appState, { dataTableToSelectorTable, mathCellChanged, triggerSaveNeeded } from "./stores.svelte";

  import { isFiniteImagResult, type Result,
           type MatrixResult, isDataTableResult} from "./resultTypes";

  import type { QueryStatement, UnitsStatement } from "./parser/types";

  import { onMount, tick } from "svelte";

  import { format } from "mathjs";

  import { arraysEqual, convertArrayUnits, getArraySI, prepLatexForMarkdown, unitsEquivalent, unitsValid } from "./utility.js";

  import DataTableCell from "./cells/DataTableCell.svelte";

  import MathField from "./MathField.svelte";
  import DataTableInput from "./DataTableInput.svelte";
  import TextButton from "./TextButton.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
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

  interface Props {
    index: number;
    dataTableCell: DataTableCell;
    modal: (arg: {detail: {modalInfo: ModalInfo}}) => void;
    updateDataTableNumberFormat: (dataTableCell: DataTableCell, colNumber: number) => void;
  }

  let {
    index,
    dataTableCell,
    modal,
    updateDataTableNumberFormat
  }: Props = $props();

  let numColumns = $derived(dataTableCell.columnData.length);
  let numRows = $derived(dataTableCell.columnData[0].length);
  let numInterpolationDefs = $derived(dataTableCell.interpolationDefinitions.length);
  let numInputs = $derived(dataTableCell.columnIsOutput.filter(value => !value).length);
  let result = $derived(appState.results[index]);
  let columnFormatOptions = $derived(dataTableCell.columnFormatOptions.map((value) => value === null ? appState.config.mathCellConfig.formatOptions : value));
  let containerDiv: HTMLDivElement;
  let copyButtonText = $state("Copy Data");
  let descOffset = $derived(dataTableCell.showDescriptions ? 1 : 0);
  let colVars = $derived(dataTableCell.columnIdentifiers.filter((id) => id !== null));
  let nameLatexElement: MathField = $state();

  // svelte-ignore state_referenced_locally
  let parameterParsingStates: ParsingState[] = $state(Array.from({ length: numColumns }, () => getInitialParsingState()));;
  // svelte-ignore state_referenced_locally
  let parameterUnitParsingStates: ParsingState[] = $state(Array.from({ length: numColumns }, () => getInitialParsingState()));
  // svelte-ignore state_referenced_locally
  let nameParsingStates: ParsingState[] = $state(Array.from({ length: numInterpolationDefs }, () => getInitialParsingState()));

  // svelte-ignore state_referenced_locally
  let parserIds = Array.from({length: numColumns}, () => appState.nextParserId++);
  let columnStatements: Statement[] = $state([]);
  let columnParsePending = $state(false);

  const columnParserTimeouts: Map<number, {timeout: number, resolvers: (() => void)[]}> = new Map();
  let inColumnParseDebouncer = false;

  let parsingError = $derived.by(() => {
    return parameterParsingStates.some(value => value.parsingError) ||
           parameterUnitParsingStates.some(value => value.parsingError);
  });

  let parsePending = $derived.by(() => {
    return columnParsePending ||
           parameterParsingStates.reduce((accum, value) => accum || value.parsePending, false) ||
           parameterUnitParsingStates.reduce((accum, value) => accum || value.parsePending, false) ||
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
    for (const [i, statement] of columnStatements.entries()) {
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
      // no queries, need placeholder statement
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
    appState.cells[index] = appState.cells[index];
    await tick();
    triggerSaveNeeded();
  }

  function addColumn() {
    dataTableCell.addColumn();

    columnStatements = [...columnStatements, null];
    parserIds = [...parserIds, appState.nextParserId++];

    triggerSaveNeeded();
    appState.resultsInvalid = true;
    mathCellChanged();
  }

  async function deleteRow(rowIndex: number) {
    triggerSaveNeeded(true);
    appState.resultsInvalid = true;

    dataTableCell.deleteRow(rowIndex);

    for (let i = 0; i < dataTableCell.columnData.length; i++) {
      await debounceParseColumn(dataTableCell.columnIds[i]);
    }

    appState.cells[index] = appState.cells[index];
    mathCellChanged();
  }

  function deleteEmptyRows() {
    dataTableCell.deleteEmptyRows();

    appState.cells[index] = appState.cells[index];
    triggerSaveNeeded();
  }

  async function deleteColumn(colIndex: number) {
    triggerSaveNeeded(true);

    dataTableCell.deleteColumn(colIndex);

    columnStatements = [...columnStatements.slice(0,colIndex),
                        ...columnStatements.slice(colIndex+1)];

    parserIds = [...parserIds.slice(0,colIndex),
                 ...parserIds.slice(colIndex+1)];

    appState.cells[index] = appState.cells[index];
    appState.resultsInvalid = true;
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
      const firstInputColumn = dataTableCell.columnIsOutput.findIndex(isOutput => !isOutput);
      const fieldElement = document.querySelector(`#data-table-input-${index}-${row+1}-${firstInputColumn}`) as HTMLDivElement | null;
      if (fieldElement) {
        fieldElement.focus();
      }
    }
  }

  async function parseParameterField(column: number, topLevel = true) {
    const startingIdSet = new Set(dataTableCell.columnIdentifiers);
    
    columnStatements[column] = null;

    if (!parameterParsingStates[column].parsingError) {
      dataTableCell.columnIdentifiers[column] = null;
      dataTableCell.columnErrors[column] = "";
      if (parameterParsingStates[column].statement?.type === "parameter") {
        dataTableCell.columnIsOutput[column] = false;
        dataTableCell.columnIdentifiers[column] = parameterParsingStates[column].statement.name;
        await debounceParseColumn(dataTableCell.columnIds[column]);
      } else {
        dataTableCell.columnIsOutput[column] = true;
        if ("assignment" in parameterParsingStates[column].statement && parameterParsingStates[column].statement.assignment) {
          dataTableCell.columnIdentifiers[column] = parameterParsingStates[column].statement.assignment.name;
        }
        columnStatements[column] = (parameterParsingStates[column].statement as QueryStatement);
      }
    } else {
      dataTableCell.columnErrors[column] = parameterParsingStates[column].parsingErrorMessage;
      dataTableCell.columnIsOutput[column] = false;
    }

    appState.resultsInvalid = true;
  }

  async function parseUnitField(column: number) {
    if (!dataTableCell.columnIsOutput[column]) {
      await debounceParseColumn(dataTableCell.columnIds[column]);
    }

    appState.resultsInvalid = true;
  }

  async function parseDataField(column: number) {
    triggerSaveNeeded(true);

    if (!dataTableCell.columnIsOutput[column]) {
      await debounceParseColumn(dataTableCell.columnIds[column]);
    }

    appState.cells[index] = appState.cells[index];
    appState.resultsInvalid = true;
    mathCellChanged();
  }

  function handleDescUpdate() {
    triggerSaveNeeded();
  }

  function setColumnResult(colId: number, colResult: MatrixResult) {
    if (!dataTableCell.columnIdLocationMap.has(colId)) {
      return;
    }
    let colNum = dataTableCell.columnIdLocationMap.get(colId);
    dataTableCell.columnErrors[colNum] = "";
    dataTableCell.columnOutputUnits[colNum] = "";
    dataTableCell.columnIsOutput[colNum] = true;
    
    const currentCol = dataTableCell.columnData[colNum];
    currentCol.fill('');

    let newColData: number[] = [];

    if (colResult.results[0].length !== 1) {
      dataTableCell.columnErrors[colNum] = "Only column vectors can be placed in a data table";
      return;
    }

    const statement = columnStatements[colNum];
    if (!statement) {
      dataTableCell.columnErrors[colNum] = "Parsing Error (mismatch between expression and result)";
      return;
    }

    if (statement.type !== "query"){
      dataTableCell.columnErrors[colNum] = "Parsing Error (mismatch between expression and result)";
      return;
    }

    let resultUnits = "";
    let resultUnitsLatex = "";
    let firstResult: Result;

    let resultUnitSet: Set<string> = new Set();

    for (const [i, resultRow] of colResult.results.entries()) {
      for (const [j, result] of resultRow.entries()) {
        if (isFiniteImagResult(result)) {
          dataTableCell.columnErrors[colNum] = "Some results evaluate to an imaginary number, which cannot be displayed in a data table";
          return;
        } else if (!(result.numeric && result.finite)) {
          dataTableCell.columnErrors[colNum] = "Some results do not evaluate to a finite real value, which cannot be displayed in a data table";
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
      dataTableCell.columnErrors[colNum] = "All entries in the column vector must have the same units";
      return;
    }

    if (!unitsValid(firstResult.units)) {
      dataTableCell.columnErrors[colNum] = "Dimension Error";
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
        dataTableCell.columnErrors[colNum] = "Units Mismatch";
        return;
      } 
    }

    for (const [i, value] of newColData.entries()) {
      currentCol[i] = String(value);
    }

    dataTableCell.columnOutputUnits[colNum] = resultUnitsLatex;

    const paddingNeeded = dataTableCell.padColumns();
    if (paddingNeeded) {
      appState.cells[index] = appState.cells[index];
    }
  }

  function clearOutputColumns() {
    dataTableCell.clearOutputColumns();
  }

  function handleAddInterpolationFunction(type: "interpolation" | "polyfit") {
    let input = dataTableCell.columnIsOutput.indexOf(false);
    if (input === -1) {
      return;
    }
    let output = dataTableCell.columnIsOutput.indexOf(false, input+1);
    if (output === -1) {
      return;
    }
    dataTableCell.addInterpolationDefinition(type, input, output);
    
    appState.cells[index] = appState.cells[index];
    triggerSaveNeeded();
    mathCellChanged();
  }

  async function parseInterpolationDefNameField(column: number) {
    triggerSaveNeeded(true);

    setInterpolationFunctions();

    appState.resultsInvalid = true;
    mathCellChanged();
  }

  function handleInputOutputChange(defIndex: number) {
    setInterpolationFunctions();

    appState.cells[index] = appState.cells[index];
    
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

    appState.cells[index] = appState.cells[index];

    triggerSaveNeeded();
    mathCellChanged();
  }

  function handleDeleteInterpoloationDef(defIndex: number) {
    dataTableCell.deleteInterpolationDefinition(defIndex);

    setInterpolationFunctions();

    appState.cells[index] = appState.cells[index];

    triggerSaveNeeded();
    mathCellChanged();
  }

  async function handleLoadSpreadsheet() {
    try {
      modal({detail: {modalInfo: {state: "importingSpreadsheet", modalOpen: true, heading: 'Importing Spreadsheet'}}});
      await dataTableCell.selectAndLoadSpreadsheetFile();
      modal({detail: {modalInfo: {state: "importingSpreadsheet", modalOpen: false, heading: 'Importing Spreadsheet'}}});

      appState.cells[index] = appState.cells[index];
      
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
    dataTableToSelectorTable(index, dataTableCell.serialize(true));
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

      const newTimeout = setTimeout(async () => {
        const {timeout, resolvers} = columnParserTimeouts.get(columnId);
        columnParserTimeouts.delete(columnId);
        await parseColumn(columnId);
        for (const resolver of resolvers) {
          resolver();
        }
        if (columnParserTimeouts.size === 0) {
          inColumnParseDebouncer = false;
        }
      }, timeout);

      resolvers.push(resolve);
      columnParserTimeouts.set(columnId, {timeout: newTimeout, resolvers});
    });
  }

  
  async function parseColumn(columnId: number) {
    if (!dataTableCell.columnIdLocationMap.has(columnId)) {
      return;
    }
    let column = dataTableCell.columnIdLocationMap.get(columnId);

    const isInterpolationCol = dataTableCell.isInterpolationCol(column);

    if (dataTableCell.columnIsOutput[column]) {
      if (isInterpolationCol) {
        dataTableCell.fixInterpolationCols();
      }
      return;
    }

    dataTableCell.columnErrors[column] = "";

    let endIndex = dataTableCell.columnData[column].findIndex(value => value.trim() === '' || isNaN(Number(value)));
    if (endIndex === -1) {
      endIndex = undefined;
    }
    let columnValues = dataTableCell.columnData[column].slice(0, endIndex);
    if (columnValues.length > 0 && 
        parameterUnitParsingStates[column].statement && 
        parameterUnitParsingStates[column].statement.type !== "error") {

      let combinedLatex: string;

      if (parameterUnitParsingStates[column].statement.type === "blank" || 
        !arraysEqual([0,0,0,0,1,0,0,0,0], (parameterUnitParsingStates[column].statement as UnitsStatement).dimensions)) {
        combinedLatex = String.raw`${dataTableCell.parameterLatexs[column]} = \begin{bmatrix} ${columnValues.join(' \\\\ ')} \end{bmatrix}`;
        
        if (parameterUnitParsingStates[column].statement.type !== "blank" ) {
          combinedLatex += String.raw` \cdot 1 ${dataTableCell.parameterUnitLatexs[column]}`;
        }
      } else {
        // special handling of a pure temperature unit since scaling approach won't work
        columnValues = columnValues.map((value) => `${value} ${dataTableCell.parameterUnitLatexs[column]}`);
        combinedLatex = String.raw`${dataTableCell.parameterLatexs[column]} = \begin{bmatrix} ${columnValues.join(' \\\\ ')} \end{bmatrix}`;
      }

      let parsingError = false;
      let statement: Statement;

      columnParsePending = true;
      const parsingResult = await appState.parserWrapper.parseLatex(combinedLatex, parserIds[column], 'data_table_assign');
      columnParsePending = false;

      // column location could of changed during parse
      if (!dataTableCell.columnIdLocationMap.has(columnId)) {
        return;
      }
      column = dataTableCell.columnIdLocationMap.get(columnId);

      statement = parsingResult.statement;
      parsingError = parsingResult.parsingError;

      columnStatements[column] = statement;

      if (parsingError) {
        dataTableCell.columnErrors[column] = "Error parsing column data, check that all column number entries are either decimal numbers or integer numbers";
        columnStatements[column] = null;
      }
    } else {
      columnStatements[column] = null;
    }

    if (isInterpolationCol) {
      setInterpolationFunctions();
    }
  }

  function setInterpolationFunctions() {
    dataTableCell.interpolationFunctions = [];

    dataTableCell.fixInterpolationCols();

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
        inputUnitsList.push(parameterUnitParsingStates[input].statement);
      }
      let outputUnits: Statement = parameterParsingStates[def.output].statement;

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
          console.warn('Attempt to define interpolation function with a units error');
          continue definitionLoop;
        }
      }

      if (!(outputUnits?.type === "units" && outputUnits.unitsValid)) {
        console.warn('Attempt to define interpolation function with a units error');
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
        name: def.nameLatex,
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

    let units = dataTableCell.parameterUnitLatexs.map((field, j) => dataTableCell.columnIsOutput[j] ? dataTableCell.columnOutputUnits[j] : field);
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

  $effect( () => {
    if (appState.activeCell === index) {
        focus();
    }
  });

  $effect( () => {
    if (result && isDataTableResult(result) && !appState.resultsInvalid) {
      for (const [colId, colResult] of Object.entries(result.colData)) {
        setColumnResult(Number(colId), colResult);
      }
    } else {
      clearOutputColumns();
    }
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
          bind:parsingState={parameterParsingStates[j]}
          dataTableInfo={{
            colVars,
            cellNum: j,
            colId: dataTableCell.columnIds[j]
          }}
        />
        {#if parameterParsingStates[j].parsingError}
          {#if !parameterParsingStates[j].parsePending}
            <TooltipIcon direction="right" align="end">
              <span slot="tooltipText">{parameterParsingStates[j].parsingErrorMessage}</span>
              <Error class="error"/>
            </TooltipIcon>
          {/if}
        {:else if dataTableCell.columnErrors[j]}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">{dataTableCell.columnErrors[j]}</span>
            <Error class="error"/>
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
      <div
        class="item math-field"
        class:calculated={dataTableCell.columnIsOutput[j]}
        id={`parameter-units-${index}-${j}`}
        style="grid-column: {j + 1 + descOffset}; grid-row: 2;"
      >
        {#if dataTableCell.columnIsOutput[j]}
          <MathField
            latex={dataTableCell.columnOutputUnits[j]}
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
            bind:parsingState={parameterUnitParsingStates[j]}
          />
          
          {#if parameterUnitParsingStates[j].parsingError }
            {#if !parameterUnitParsingStates[j].parsePending}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">{parameterUnitParsingStates[j].parsingErrorMessage}</span>
                <Error class="error"/>
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
      {#each [...Array(descOffset).fill(true), ...dataTableCell.columnIsOutput] as isOutput, j }
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
                  bind:this={nameLatexElement}
                />
                {#if nameParsingStates[i].parsingError}
                  {#if !nameParsingStates[i].parsePending}
                    <TooltipIcon direction="right" align="end">
                      <span slot="tooltipText">{nameParsingStates[i].parsingErrorMessage}</span>
                      <Error class="error"/>
                    </TooltipIcon>
                  {/if}
                {:else}
                  <IconButton
                    click={() => nameLatexElement.getMathField()?.executeCommand('copyToClipboard')}
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
        <div
          class="item data-field"
          class:calculated={dataTableCell.columnIsOutput[j]}
          id={`grid-cell-${index}-${i}-${j}`}
          style="grid-column: {j+1+descOffset}; grid-row: {i+numInterpolationDefs+3};"
        >
          {#if dataTableCell.columnIsOutput[j]}
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
                <Error class="error"/>
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

