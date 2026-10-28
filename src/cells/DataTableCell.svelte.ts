import { format } from "mathjs";
import { BaseCell, type DatabaseDataTableCell } from "./BaseCell";
import type { Statement, UnitsStatement } from "../parser/types";
import { arraysEqual, getArraySI, prepLatexForMarkdown } from "../utility";
import { convertLatexToAsciiMath } from "mathlive";
import type { NumberFormatOptions } from "../sheet/Sheet";

type XLSX = typeof import("xlsx");

type InterpolationDefinition = {
  type: "polyfit" | "interpolation",
  nameLatex: string,
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

  nextColumnId = 0;

  parameterLatexs: string[] = $state();
  parameterUnitLatexs: string[] = $state();
  columnData: string[][] = $state();
  columnIds: number[] = $state();
  columnFormatOptions: (NumberFormatOptions | null)[] = $state();
  columnIdLocationMap: Map<number, number>;
  columnIdentifiers: (string | null)[] = $state();
  columnErrors: string[] = $state();
  columnIsOutput: boolean[] = $state();
  columnOutputUnits: string[] = $state();
  showDescriptions: boolean = $state();
  descriptionsHeader: string = $state();
  descriptions: string[] = $state();

  interpolationDefinitions: InterpolationDefinition[] = $state();
  interpolationFunctions: (InterpolationFunction | GridInterpolationFunction)[] = $state();

  constructor (arg?: DatabaseDataTableCell) {
    super("dataTable", arg?.id);
    if (arg === undefined) {
      this.parameterLatexs = [DataTableCell.getNextColName(), DataTableCell.getNextColName()];
      this.parameterUnitLatexs = ['', ''];
      this.columnData = [['', ''], ['', '']];
      this.columnIds = [this.getNextColId(), this.getNextColId()];
      this.columnFormatOptions = [null, null];
      this.columnIdentifiers = [null, null];
      this.columnErrors = ['', ''];
      this.columnOutputUnits = ['', ''];
      this.columnIsOutput = [false, false];
      this.interpolationDefinitions = [];
      this.interpolationFunctions = [];
      this.showDescriptions = false;
      this.descriptionsHeader = "Row Labels";
      this.descriptions = ['', ''];
    } else {
      this.parameterLatexs = [...arg.parameterLatexs];
      if (arg.nextParameterId > DataTableCell.nextParameterId) {
        DataTableCell.nextParameterId = arg.nextParameterId;
      }
      if (arg.nextInterpolationDefId > DataTableCell.nextInterpolationDefId) {
        DataTableCell.nextInterpolationDefId = arg.nextInterpolationDefId;
      }
      if (arg.nextPolyfitDefId > DataTableCell.nextPolyfitDefId) {
        DataTableCell.nextPolyfitDefId = arg.nextPolyfitDefId;
      }
      this.parameterUnitLatexs = [...arg.parameterUnitLatexs];
      this.columnData = arg.columnData;

      if (arg.columnIds) {
        this.columnIds = arg.columnIds;
      } else {
        // old versions of the file won't have this property, number them sequentially to match any results in the file
        this.columnIds = [];
        for (let i = 0; i < this.columnData.length; i++) {
          this.columnIds[i] = i;
        }
      }

      if (arg.columnFormatOptions) {
        this.columnFormatOptions = arg.columnFormatOptions;
      } else {
        this.columnFormatOptions = Array(this.columnData.length).fill(null);
      }

      this.columnIdentifiers = Array(this.columnData.length).fill(null);
      this.columnErrors = Array(this.columnData.length).fill('');
      this.columnOutputUnits = Array(this.columnData.length).fill('');
      this.columnIsOutput = Array(this.columnData.length).fill(false);

      this.interpolationDefinitions = [];
      for (const definition of arg.interpolationDefinitions) {
        if ("inputs" in definition) {
          this.interpolationDefinitions.push({
            nameLatex: definition.nameLatex,
            numInputs: definition.numInputs,
            inputs: definition.inputs,
            output: definition.output,
            type: definition.type,
            order: definition.order
          });
        } else {
          this.interpolationDefinitions.push({
            nameLatex: definition.nameLatex,
            numInputs: 1,
            inputs: [definition.input,],
            output: definition.output,
            type: definition.type,
            order: definition.order
          });
        }
      }
      this.interpolationFunctions = [];

      // descriptions column needs to be added if it wasn't in the original data
      if (arg.descriptions) {
        this.showDescriptions = arg.showDescriptions;
        this.descriptionsHeader = arg.descriptionsHeader;
        this.descriptions = arg.descriptions;
      } else {
        this.showDescriptions = false;
        this.descriptionsHeader = "Row Labels";
        this.descriptions = Array(this.columnData[0].length).fill('');
      }
    }

    this.columnIdLocationMap = new Map();
    for (const [i, id] of this.columnIds.entries()) {
      this.columnIdLocationMap.set(id, i);
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

  getNextColId() {
    if (this.columnIds) {
      while(this.columnIds.includes(this.nextColumnId)) {
        this.nextColumnId++;
      }
    }
    return this.nextColumnId++;
  }

  serialize(includedComputedUnits = false): DatabaseDataTableCell {
    let parameterUnitLatexs: string[];
    
    if (includedComputedUnits) {
      parameterUnitLatexs = this.parameterUnitLatexs.map((parameter, i) => this.columnIsOutput[i] ? this.columnOutputUnits[i] : parameter);
    } else {
      parameterUnitLatexs = parameterUnitLatexs;
    }

    return {
      type: "dataTable",
      id: this.id,
      parameterLatexs: this.parameterLatexs,
      nextParameterId: DataTableCell.nextParameterId,
      nextInterpolationDefId: DataTableCell.nextInterpolationDefId,
      nextPolyfitDefId: DataTableCell.nextPolyfitDefId,
      parameterUnitLatexs,
      columnData: this.columnData,
      columnIds: this.columnIds,
      columnFormatOptions: this.columnFormatOptions,
      showDescriptions: this.showDescriptions,
      descriptionsHeader: this.descriptionsHeader,
      descriptions: this.descriptions,
      interpolationDefinitions: this.interpolationDefinitions.map(definition => {return {
            nameLatex: definition.nameLatex,
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


  addRow() {
    for(const column of this.columnData) {
      column.push('');
    }
    this.descriptions.push('');
  }

  addColumn() {
    const newVarName = DataTableCell.getNextColName();
    const newId = this.getNextColId();
    this.columnIds = [...this.columnIds, newId];
    this.columnFormatOptions = [...this.columnFormatOptions, null];
    this.columnIdLocationMap.set(newId, this.columnIds.length - 1);

    this.parameterUnitLatexs = [...this.parameterUnitLatexs, ''];
    
    this.parameterLatexs = [...this.parameterLatexs, newVarName];

    this.columnData = [...this.columnData, Array(this.columnData[0].length).fill('')];

    this.columnIdentifiers = [...this.columnIdentifiers, null];
    this.columnErrors = [...this.columnErrors, null];
    this.columnOutputUnits = [...this.columnOutputUnits, null];
    this.columnIsOutput = [...this.columnIsOutput, false];
  }

  deleteRow(rowIndex: number) {
    for(const [i, column] of this.columnData.entries()) {
      this.columnData[i] = [...column.slice(0,rowIndex), ...column.slice(rowIndex+1)];
    }
    this.descriptions = [...this.descriptions.slice(0,rowIndex), ...this.descriptions.slice(rowIndex+1)];
  }

  deleteColumn(colIndex: number) {
    this.columnIds = [...this.columnIds.slice(0,colIndex),
                      ...this.columnIds.slice(colIndex+1)];

    this.columnFormatOptions = [...this.columnFormatOptions.slice(0,colIndex),
                                ...this.columnFormatOptions.slice(colIndex+1)];

    this.columnIdLocationMap = new Map();
    for (const [i, id] of this.columnIds.entries()) {
      this.columnIdLocationMap.set(id, i);
    }

    this.parameterUnitLatexs = [...this.parameterUnitLatexs.slice(0,colIndex),
                                ...this.parameterUnitLatexs.slice(colIndex+1)];

    this.parameterLatexs = [...this.parameterLatexs.slice(0,colIndex),
                            ...this.parameterLatexs.slice(colIndex+1)];

    this.columnData = [...this.columnData.slice(0,colIndex),
                       ...this.columnData.slice(colIndex+1)];

    this.columnIdentifiers = [...this.columnIdentifiers.slice(0,colIndex),
                              ...this.columnIdentifiers.slice(colIndex+1)];

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

    if (this.showDescriptions && this.descriptions.length > numRows) {
      numRows = this.descriptions.length;
    }

    for (const column of this.columnData) {
      if (column.length < numRows) {
        paddingNeeded = true;
        column.push(...Array(numRows-column.length).fill(''));
      }
    }
    if (this.descriptions.length < numRows) {
      paddingNeeded = true;
      this.descriptions.push(...Array(numRows-this.descriptions.length).fill(''));
    }

    return paddingNeeded;
  }

  deleteEmptyRows() {
    this.padColumns(); // all columns need to be the same length
   
    let row = this.columnData[0].length - 1;

    while(row > 0 &&
          this.columnData.map(col => col[row]).reduce((accum, value) => accum && (value.trim() === ""), true) &&
          (!this.showDescriptions || this.descriptions[row].trim() === "") ) {
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
      nameLatex: functionName,
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
      // parameter names in first row
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

    this.parameterLatexs = [];
    this.parameterUnitLatexs = [];
    this.columnData = [];
    for (let col = 0; col < longestRow; col++) {
      let parameterName: string;
      if ((parameterNamesRow[col] ?? "").trim() === "") {
        parameterName = excelColName(col);
      } else {
        parameterName = parameterNamesRow[col];
      }
      this.parameterLatexs.push(parameterName)

      let units: string;
      units = unitsRow[col] ?? '';
      if ( !( /.*\[.*\].*/.test(units) || /.*\\lbrack.*\\rbrack.*/.test(units) ) ) {
        if (units.trim() === "") {
          units = "";
        } else {
          units = `[${units}]`;
        }
      }

      this.parameterUnitLatexs.push(units);

      this.columnData.push(Array(numRows).fill(''));
    }

    for (const [i,row] of dataRows.entries()) {
      for (const [j, value] of row.entries()) {
        this.columnData[j][i] = String(value ?? "");
      }
    }

    this.columnIdentifiers = Array(this.columnData.length).fill(null);
    this.columnFormatOptions = Array(this.columnData.length).fill(null);
    this.columnErrors = Array(this.columnData.length).fill('');
    this.columnOutputUnits = Array(this.columnData.length).fill('');
    this.columnIsOutput = Array(this.columnData.length).fill(false);

    this.interpolationDefinitions = [];
    this.interpolationFunctions = [];

    this.columnIds = [];
    this.columnIdLocationMap = new Map();
    for (let col = 0; col < this.columnData.length; col++) {
      this.columnIds[col] = this.getNextColId();
      this.columnIdLocationMap.set(this.columnIds[col], col);
    }

    if (hasDescriptions) {
      this.showDescriptions = true;
      this.descriptionsHeader = descriptionsHeader;
      this.descriptions = descriptions;
    } else {
      this.showDescriptions = false;
      this.descriptionsHeader = 'Row Labels';
      this.descriptions = Array(numRows).fill('');
    }
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

export function gridDetector(inputFunction: InterpolationFunction): (InterpolationFunction | GridInterpolationFunction) {
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