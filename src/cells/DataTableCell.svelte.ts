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
      
      this.columnData = arg.columnData.map(col => [...col]);

      if (arg.columnIds) {
        this.columnIds = [...arg.columnIds];
      } else {
        // old versions of the file won't have this property, number them sequentially to match any results in the file
        this.columnIds = [];
        for (let i = 0; i < this.columnData.length; i++) {
          this.columnIds[i] = i;
        }
      }

      if (arg.columnFormatOptions) {
        this.columnFormatOptions = [...arg.columnFormatOptions];
      } else {
        this.columnFormatOptions = Array(this.columnData.length).fill(null);
      }


      this.interpolationDefinitions = [];
      for (const definition of arg.interpolationDefinitions) {
        if ("inputs" in definition) {
          this.interpolationDefinitions.push({
            nameLatex: definition.nameLatex,
            numInputs: definition.numInputs,
            inputs: [...definition.inputs],
            output: definition.output,
            type: definition.type,
            order: definition.order
          });
        } else {
          this.interpolationDefinitions.push({
            nameLatex: definition.nameLatex,
            numInputs: 1,
            inputs: [definition.input],
            output: definition.output,
            type: definition.type,
            order: definition.order
          });
        }
      }
      this.interpolationFunctions = [];

      if (arg.descriptions) {
        this.showDescriptions = arg.showDescriptions;
        this.descriptionsHeader = arg.descriptionsHeader;
        this.descriptions = [...arg.descriptions];
      } else {
        this.showDescriptions = false;
        this.descriptionsHeader = "Row Labels";
        this.descriptions = Array(this.columnData[0].length).fill('');
      }
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

serialize(columnIsOutput?: Record<number,boolean>, columnOutputUnits?: Record<number,string>): DatabaseDataTableCell {
    let newParameterUnitLatexs: string[];
    
    if (columnIsOutput && columnOutputUnits) {
      newParameterUnitLatexs = [];
      for (const [loc, id] of this.columnIds.entries()) {
        newParameterUnitLatexs.push(columnIsOutput[id] ? columnOutputUnits[id] : this.parameterUnitLatexs[loc])
      }
    } else {
      newParameterUnitLatexs = this.parameterUnitLatexs;
    }

    return {
      type: "dataTable",
      id: this.id,
      parameterLatexs: $state.snapshot(this.parameterLatexs),
      nextParameterId: DataTableCell.nextParameterId,
      nextInterpolationDefId: DataTableCell.nextInterpolationDefId,
      nextPolyfitDefId: DataTableCell.nextPolyfitDefId,
      parameterUnitLatexs: $state.snapshot(newParameterUnitLatexs),
      columnData: $state.snapshot(this.columnData),
      columnIds: $state.snapshot(this.columnIds),
      columnFormatOptions: $state.snapshot(this.columnFormatOptions),
      showDescriptions: this.showDescriptions,
      descriptionsHeader: this.descriptionsHeader,
      descriptions: $state.snapshot(this.descriptions),
      interpolationDefinitions: this.interpolationDefinitions.map(definition => {return {
          nameLatex: definition.nameLatex,
          type: definition.type,
          numInputs: definition.numInputs,
          inputs: $state.snapshot(definition.inputs),
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

    this.parameterUnitLatexs = [...this.parameterUnitLatexs, ''];
    
    this.parameterLatexs = [...this.parameterLatexs, newVarName];

    this.columnData = [...this.columnData, Array(this.columnData[0].length).fill('')];
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


    this.parameterUnitLatexs = [...this.parameterUnitLatexs.slice(0,colIndex),
                                ...this.parameterUnitLatexs.slice(colIndex+1)];

    this.parameterLatexs = [...this.parameterLatexs.slice(0,colIndex),
                            ...this.parameterLatexs.slice(colIndex+1)];

    this.columnData = [...this.columnData.slice(0,colIndex),
                       ...this.columnData.slice(colIndex+1)];
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
}

export function excelColName(index: number): string {
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
  };
}