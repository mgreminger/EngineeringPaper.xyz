import { BaseCell, type DatabaseDataTableCell } from "./BaseCell";
import { MathField } from "./MathField.svelte";
import type { Statement, UnitsStatement } from "../parser/types";
import QuickLRU from "quick-lru";
import { arraysEqual, getArraySI } from "../utility";
import { convertLatexToAsciiMath } from "mathlive";

type XLSX = typeof import("xlsx");

type InterpolationDefinition = {
  type: "polyfit" | "interpolation",
  nameField: MathField,
  numInputs: number,
  inputs: number[],
  output: number,
  order: number
};

export type InterpolationFunction = {
  type: "polyfit" | "interpolation",
  name: string,
  numInputs: number,
  inputValues: number[][],
  outputValues: number[],
  inputDims: number[][],
  outputDims: number[],
  order: number
};

export type GridInterpolationFunction = {
  type: "gridInterpolation",
  name: string,
  numInputs: number,
  inputValues: number[][],
  outputValues: number[][],
  inputDims: number[][],
  outputDims: number[],
  order: number
};

export default class DataTableCell extends BaseCell {
  static XLSX: XLSX;

  static nextParameterId = 1;
  static nextInterpolationDefId = 1;
  static nextPolyfitDefId = 1;

  static spreadsheetExtensions = ".csv,.xlsx,.ods,.xls";

  parameterFields: MathField[] = $state();
  combinedFields: MathField[];
  parameterUnitFields: MathField[] = $state();
  columnData: string[][] = $state();
  columnStatements: (Statement | null)[];
  columnIds: (string | null)[];
  columnErrors: string[] = $state();
  columnIsOutput: boolean[] = $state();
  columnOutputUnits: string[] = $state();

  interpolationDefinitions: InterpolationDefinition[] = $state();
  interpolationFunctions: (InterpolationFunction | GridInterpolationFunction)[] = $state();

  cache: QuickLRU<string, {statement: Statement, parsingError: boolean}>;

  constructor (arg?: DatabaseDataTableCell) {
    super("dataTable", arg?.id);
    if (arg === undefined) {
      this.parameterFields = [new MathField(DataTableCell.getNextColName(), 'data_table_expression'), 
                              new MathField(DataTableCell.getNextColName(), 'data_table_expression')];
      this.combinedFields = [new MathField('', 'data_table_assign'), new MathField('', 'data_table_assign')];
      this.parameterUnitFields = [new MathField('', 'units'), new MathField('', 'units')];
      this.columnData = [['', ''], ['', '']];
      this.columnStatements = [null, null];
      this.columnIds = [null, null];
      this.columnErrors = ['', ''];
      this.columnOutputUnits = ['', ''];
      this.columnIsOutput = [false, false];
      this.interpolationDefinitions = [];
      this.interpolationFunctions = [];
      this.cache = new QuickLRU<string, {statement: Statement, parsingError: boolean}>({maxSize: 100});
    } else {
      this.parameterFields = arg.parameterLatexs.map((latex) => new MathField(latex, 'data_table_expression'));
      if (arg.nextParameterId > DataTableCell.nextParameterId) {
        DataTableCell.nextParameterId = arg.nextParameterId;
      }
      if (arg.nextInterpolationDefId > DataTableCell.nextInterpolationDefId) {
        DataTableCell.nextInterpolationDefId = arg.nextInterpolationDefId;
      }
      if (arg.nextPolyfitDefId > DataTableCell.nextPolyfitDefId) {
        DataTableCell.nextPolyfitDefId = arg.nextPolyfitDefId;
      }
      this.parameterUnitFields = arg.parameterUnitLatexs.map((latex) => new MathField(latex, 'units'));
      this.combinedFields = arg.parameterLatexs.map((latex) => new MathField('', 'data_table_assign'));
      this.columnData = arg.columnData;
      this.columnStatements = Array(this.columnData.length).fill(null);
      this.columnIds = Array(this.columnData.length).fill(null);
      this.columnErrors = Array(this.columnData.length).fill('');
      this.columnOutputUnits = Array(this.columnData.length).fill('');
      this.columnIsOutput = Array(this.columnData.length).fill(false);

      this.interpolationDefinitions = [];
      for (const definition of arg.interpolationDefinitions) {
        if ("inputs" in definition) {
          this.interpolationDefinitions.push({
            nameField: new MathField(definition.nameLatex, 'parameter'),
            numInputs: definition.numInputs,
            inputs: definition.inputs,
            output: definition.output,
            type: definition.type,
            order: definition.order
          });
        } else {
          this.interpolationDefinitions.push({
            nameField: new MathField(definition.nameLatex, 'parameter'),
            numInputs: 1,
            inputs: [definition.input,],
            output: definition.output,
            type: definition.type,
            order: definition.order
          });
        }
      }
      this.interpolationFunctions = [];

      this.cache = new QuickLRU<string, {statement: Statement, parsingError: boolean}>({maxSize: 100});
    }
  }

  static getNextColName() {
    return `Col${DataTableCell.nextParameterId++}`
  }

  static async init() {
    if (!this.XLSX) {
      this.XLSX = await import("xlsx");
    } 
  }

  serialize(): DatabaseDataTableCell {
    return {
      type: "dataTable",
      id: this.id,
      parameterLatexs: this.parameterFields.map((field) => field.latex),
      nextParameterId: DataTableCell.nextParameterId,
      nextInterpolationDefId: DataTableCell.nextInterpolationDefId,
      nextPolyfitDefId: DataTableCell.nextPolyfitDefId,
      parameterUnitLatexs: this.parameterUnitFields.map((parameter) => parameter.latex),
      columnData: this.columnData,
      interpolationDefinitions: this.interpolationDefinitions.map(definition => {return {
            nameLatex: definition.nameField.latex,
            type: definition.type,
            numInputs: definition.numInputs,
            inputs: definition.inputs,
            output: definition.output,
            order: definition.order
          }
        }),
    };
  }

  isInterpolationCol(column: number) {
    const interpolationColSet = new Set();
    for(const def of this.interpolationDefinitions) {
      for (const currentColumn of def.inputs) {
        interpolationColSet.add(currentColumn);
      }
      interpolationColSet.add(def.output);
    }

    return interpolationColSet.has(column);
  }

  parseColumn(column: number) {
    const isInterpolationCol = this.isInterpolationCol(column);

    if (this.columnIsOutput[column]) {
      if (isInterpolationCol) {
        this.fixInterpolationCols();
      }
      return;
    }

    this.columnErrors[column] = "";

    let endIndex = this.columnData[column].findIndex(value => value.trim() === '' || isNaN(Number(value)));
    if (endIndex === -1) {
      endIndex = undefined;
    }
    let columnValues = this.columnData[column].slice(0, endIndex);
    if (columnValues.length > 0 && 
        this.parameterUnitFields[column].statement && 
        this.parameterUnitFields[column].statement.type !== "error") {

      let combinedLatex: string;

      if (this.parameterUnitFields[column].statement.type === "blank" || 
        !arraysEqual([0,0,0,0,1,0,0,0,0], (this.parameterUnitFields[column].statement as UnitsStatement).dimensions)) {
        combinedLatex = String.raw`${this.parameterFields[column].latex} = \begin{bmatrix} ${columnValues.join(' \\\\ ')} \end{bmatrix}`;
        
        if (this.parameterUnitFields[column].statement.type !== "blank" ) {
          combinedLatex += String.raw` \cdot 1 ${this.parameterUnitFields[column].latex}`;
        }
      } else {
        // special handling of a pure temperature unit since scaling approach won't work
        columnValues = columnValues.map((value) => `${value} ${this.parameterUnitFields[column].latex}`);
        combinedLatex = String.raw`${this.parameterFields[column].latex} = \begin{bmatrix} ${columnValues.join(' \\\\ ')} \end{bmatrix}`;
      }

      let parsingError = false;
      let statement: Statement;

      if (this.cache.has(combinedLatex)) {
        ({statement, parsingError} = this.cache.get(combinedLatex));
      } else {
        this.combinedFields[column].parseLatex(combinedLatex);
        statement = this.combinedFields[column].statement;
        parsingError = this.combinedFields[column].parsingError
        this.cache.set(combinedLatex, {statement: statement, parsingError: parsingError});
      }

      this.columnStatements[column] = statement;

      if (parsingError) {
        this.columnErrors[column] = "Error parsing column data, check that all column number entries are either decimal numbers or integer numbers";
        this.columnStatements[column] = null;
      }
    } else {
      this.columnStatements[column] = null;
    }

    if (isInterpolationCol) {
      this.setInterpolationFunctions();
    }
  }

  addRow() {
    for(const column of this.columnData) {
      column.push('');
    }
  }

  addColumn() {
    const newVarName = DataTableCell.getNextColName();

    this.parameterUnitFields = [...this.parameterUnitFields, new MathField('', 'units')];
    
    this.parameterFields = [...this.parameterFields, new MathField(newVarName, 'data_table_expression')];

    this.combinedFields = [...this.combinedFields, new MathField('', 'data_table_assign')];

    this.columnData = [...this.columnData, Array(this.columnData[0].length).fill('')];

    this.columnStatements = [...this.columnStatements, null];
    this.columnIds = [...this.columnIds, null];
    this.columnErrors = [...this.columnErrors, null];
    this.columnOutputUnits = [...this.columnOutputUnits, null];
    this.columnIsOutput = [...this.columnIsOutput, null];
  }

  deleteRow(rowIndex: number) {
    for(const [i, column] of this.columnData.entries()) {
      this.columnData[i] = [...column.slice(0,rowIndex), ...column.slice(rowIndex+1)];
    }
  }

  deleteColumn(colIndex: number) {
    this.parameterUnitFields = [...this.parameterUnitFields.slice(0,colIndex),
                                ...this.parameterUnitFields.slice(colIndex+1)];

    this.parameterFields = [...this.parameterFields.slice(0,colIndex),
                            ...this.parameterFields.slice(colIndex+1)];

    this.combinedFields = [...this.combinedFields.slice(0,colIndex),
                           ...this.combinedFields.slice(colIndex+1)];

    this.columnData = [...this.columnData.slice(0,colIndex),
                       ...this.columnData.slice(colIndex+1)];

    this.columnStatements = [...this.columnStatements.slice(0,colIndex),
                             ...this.columnStatements.slice(colIndex+1)];

    this.columnIds = [...this.columnIds.slice(0,colIndex),
                      ...this.columnIds.slice(colIndex+1)];

    this.columnErrors = [...this.columnErrors.slice(0,colIndex),
                         ...this.columnErrors.slice(colIndex+1)];

    this.columnOutputUnits = [...this.columnOutputUnits.slice(0,colIndex),
                              ...this.columnOutputUnits.slice(colIndex+1)];

    this.columnIsOutput = [...this.columnIsOutput.slice(0,colIndex),
                           ...this.columnIsOutput.slice(colIndex+1)];
  }

  padColumns() {
    let paddingNeeded = false;
    let numRows = 0;
    for (const column of this.columnData) {
      if (column.length > numRows) {
        numRows = column.length;
      }
    }
    for (const column of this.columnData) {
      if (column.length < numRows) {
        paddingNeeded = true;
        column.push(...Array(numRows-column.length).fill(''));
      }
    }

    return paddingNeeded;
  }

  deleteEmptyRows() {
    this.padColumns(); // all columns need to be the same length
   
    let row = this.columnData[0].length - 1;

    while(row > 0 && this.columnData.map(col => col[row]).reduce((accum, value) => accum && (value.trim() === ""), true)) {
      this.deleteRow(row);
      row--;
    }
  }

  clearOutputColumns() {
    for (const [i, column] of this.columnData.entries()) {
      if (this.columnIsOutput[i]) {
        column.fill('');
      }
    }
  }

  addInterpolationDefinition(type: "polyfit" | "interpolation", input: number, output: number) {
    let functionName: string;
    if (type === "polyfit") {
      functionName = `Polyfit${DataTableCell.nextPolyfitDefId++}`;
    } else {
      functionName = `Interp${DataTableCell.nextInterpolationDefId++}`;
    }

    this.interpolationDefinitions.push({
      nameField: new MathField(functionName, 'parameter'),
      inputs: [input,],
      numInputs: 1,
      output,
      type,
      order: 1
    });
  }

  deleteInterpolationDefinition(index: number) {
    this.interpolationDefinitions = [...this.interpolationDefinitions.slice(0,index), ...this.interpolationDefinitions.slice(index+1)];
  }

  fixInterpolationCols() {
    const dataCols = new Set(this.columnIsOutput.map((value, i) => value ? -1 : i).filter(value => value >= 0));
    if (dataCols.size < 2) {
      // not enough cols to perform interpolation
      this.interpolationDefinitions = [];
      return;
    }

    for (const def of this.interpolationDefinitions) {
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

  setInterpolationFunctions() {
    this.interpolationFunctions = [];

    this.fixInterpolationCols();

    definitionLoop: for(const [defIndex, def] of this.interpolationDefinitions.entries()) {
      if (def.nameField.statement?.type !== "parameter") {
        console.warn('Interpolation function name parsing error');
        continue definitionLoop;
      }

      const endIndexInputs = [];
      for (const [i, input] of def.inputs.entries()) {
        endIndexInputs[i] = this.columnData[input].findIndex(value => value.trim() === '' || isNaN(Number(value)));
        if (endIndexInputs[i] === -1) {
          endIndexInputs[i] = this.columnData[input].length;
        }
      }

      let endIndexOutput = this.columnData[def.output].findIndex(value => value.trim() === '' || isNaN(Number(value)));
      if (endIndexOutput === -1) {
        endIndexOutput = this.columnData[def.output].length;
      }

      const endIndex = Math.min(...endIndexInputs, endIndexOutput);

      if (endIndex === 0) {
        console.warn('Zero length input for interpolation function');
        continue definitionLoop;
      }

      const inputUnitsList: Statement[] = [];
      for (const input of def.inputs) {
        inputUnitsList.push(this.parameterUnitFields[input].statement);
      }
      let outputUnits: Statement = this.parameterUnitFields[def.output].statement;

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
        inputValuesList.push(this.columnData[input].slice(0, endIndex));
      }
      let outputValues = this.columnData[def.output].slice(0, endIndex);

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
      
      this.interpolationFunctions[defIndex] = gridDetector({
        type: def.type,
        name: def.nameField.statement.name,
        numInputs: def.numInputs,
        inputValues: inputValuesSIList,
        outputValues: outputValuesSI,
        inputDims: (inputUnitsList as UnitsStatement[]).map(inputUnits => inputUnits.dimensions),
        outputDims: outputUnits.dimensions,
        order: def.order
      });
    }
  }

  selectAndLoadSpreadsheetFile(): Promise<void> {
    return new Promise((resolve, reject) => {
      // no File System Access API, fall back to using input element
      const input = document.createElement("input");
      input.type = "file";
      input.accept = DataTableCell.spreadsheetExtensions;
      input.onchange = (event) => {
        this.loadFile(input.files[0])
          .then(() => resolve())
          .catch(error => reject(error));
      };
      input.oncancel = (event) => resolve();
      input.click();
    });
  }

  loadFile(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      if (file.size > 0) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            this.populateTable(event);
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

  populateTable(fileReader: ProgressEvent<FileReader>){
    const data = new Uint8Array(fileReader.target.result as ArrayBuffer);
    const workbook = DataTableCell.XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const inputRows = DataTableCell.XLSX.utils.sheet_to_json(worksheet, {header: 1}) as any[][];

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

    let parameterNamesRow: string[];
    let unitsRow: string[];
    let dataRows: string[][];

    if (inputRows[0].some(value => value !== undefined && isNaN(Number(value)))) {
      // parameter names in first row
      parameterNamesRow = inputRows[0].map(value => String(value ?? ""));

      if (inputRows.length < 2) {
        throw new Error("Imported spreadsheet must contain a least one row of numerical data");
      }

      let secondRowContainsUnits = inputRows[1].some(value => value !== undefined && isNaN(Number(value)));

      if (secondRowContainsUnits) {
        unitsRow = inputRows[1].map(value => String(value ?? ""));
        dataRows = inputRows.slice(2);
      } else {
        unitsRow = Array(longestRow).fill('');
        dataRows = inputRows.slice(1);
      }
    } else {
      // first row is numeric, need to add column parameter names
      dataRows = inputRows;

      parameterNamesRow = Array(longestRow).fill(0).map((value, j) => excelColName(j));
      unitsRow = Array(longestRow).fill('');
    }

    if (parameterNamesRow.length < 1) {
      throw new Error('Imported spreadsheet must contain a least one entry in the first row');
    }

    const numRows = dataRows.length;

    if (numRows < 1) {
      throw new Error('Imported spreadsheet must contain a least one row of numerical data');
    }

    this.parameterFields = [];
    this.parameterUnitFields = [];
    this.columnData = [];
    for (let col = 0; col < longestRow; col++) {
      let parameterName: string;
      if ((parameterNamesRow[col] ?? "").trim() === "") {
        parameterName = excelColName(col);
      } else {
        parameterName = parameterNamesRow[col];
      }
      this.parameterFields.push(new MathField(parameterName , 'data_table_expression'))

      let units: string;
      units = unitsRow[col] ?? '';
      if ( !( /.*\[.*\].*/.test(units) || /.*\\lbrack.*\\rbrack.*/.test(units) ) ) {
        if (units.trim() === "") {
          units = "";
        } else {
          units = `[${units}]`;
        }
      }

      this.parameterUnitFields.push(new MathField(units, 'units'));

      this.columnData.push(Array(numRows).fill(''));
    }

    for (const [i,row] of dataRows.entries()) {
      for (const [j, value] of row.entries()) {
        this.columnData[j][i] = String(value ?? "");
      }
    }

    this.combinedFields = Array(longestRow).fill(0).map((value) => new MathField('', 'data_table_assign'));

    this.columnStatements = Array(this.columnData.length).fill(null);
    this.columnIds = Array(this.columnData.length).fill(null);
    this.columnErrors = Array(this.columnData.length).fill('');
    this.columnOutputUnits = Array(this.columnData.length).fill('');
    this.columnIsOutput = Array(this.columnData.length).fill(false);

    this.interpolationDefinitions = [];
    this.interpolationFunctions = [];

    this.cache = new QuickLRU<string, {statement: Statement, parsingError: boolean}>({maxSize: 100});
  }

  exportAsCSV(name: string) {
    this.padColumns(); // important that all columns are the same length

    const workbook = DataTableCell.XLSX.utils.book_new();

    const sheet = DataTableCell.XLSX.utils.aoa_to_sheet(this.getSheetRows());
    DataTableCell.XLSX.utils.book_append_sheet(workbook, sheet, name);
    DataTableCell.XLSX.writeFile(workbook, `${name}.csv`);
  }

  getSheetRows(): string[][] {
    let headers = this.parameterFields.map(field => field.latex);

    headers = headers.map(header => convertLatexToAsciiMath(header));

    let units = this.parameterUnitFields.map((field, j) => this.columnIsOutput[j] ? this.columnOutputUnits[j] : field.latex);
    const hasUnits = !units.every(value => value.trim() === "");

    if (hasUnits) {
      const unitParser = new MathField('', 'units');
      units = units.map(currentUnits => {
        unitParser.parseLatex(currentUnits);
        if (unitParser.statement.type === "units") {
          return `[${unitParser.statement.units}]`;
        } else {
          return currentUnits;
        }
      });
    }

    const data: string[][] = Array(this.columnData[0].length).fill(0).map(_ => Array(this.columnData.length));

    for (const [i, row] of data.entries()) {
      for(const [j, col] of this.columnData.entries()) {
        row[j] = col[i];
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

  getClipboardData(): string {
    return this.getSheetRows().map(value => value.join('\t')).join('\n');
  }

}

function excelColName(index: number): string {
  if (index < 0) {
    throw new Error('Index cannot be negative');
  }

  index = index + 1;
  let name = '';

  while(index > 0) {
    const remainder = (index-1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    index = Math.floor((index-1)/26);
  }

  return name;
}

function gridDetector(inputFunction: InterpolationFunction): (InterpolationFunction | GridInterpolationFunction) {
  if (inputFunction.numInputs !== 2 || inputFunction.type !== "interpolation") {
    return inputFunction;
  }

  const x_unique = Array.from(new Set(inputFunction.inputValues[0])).sort();
  const y_unique = Array.from(new Set(inputFunction.inputValues[1])).sort();

  if (inputFunction.outputValues.length !== x_unique.length * y_unique.length) {
    return inputFunction;
  }

  const outputMap = new Map();

  for (const [i, x_value] of inputFunction.inputValues[0].entries()) {
    const y_value = inputFunction.inputValues[1][i];

    outputMap.set(JSON.stringify([x_value, y_value]), inputFunction.outputValues[i]);
  }

  if (outputMap.size !== inputFunction.outputValues.length) {
    return inputFunction;
  }

  const outputValues = [];

  for (const x of x_unique) {
    const row = [];
    for (const y of y_unique) {
      const outputValue = outputMap.get(JSON.stringify([x,y]));
      if (outputValue === undefined) {
        return inputFunction;
      }
      row.push(outputValue);
    }
    outputValues.push(row);
  }

  return {
    type: "gridInterpolation",
    name: inputFunction.name,
    numInputs: 2,
    inputValues: [x_unique, y_unique],
    outputValues: outputValues,
    inputDims: inputFunction.inputDims,
    outputDims: inputFunction.outputDims,
    order: inputFunction.order
  };;
}