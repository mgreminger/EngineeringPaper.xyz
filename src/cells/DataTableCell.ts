import { BaseCell, type DatabaseDataTableCell } from "./BaseCell";
import { MathField } from "./MathField";
import type { Statement } from "../parser/types";
import QuickLRU from "quick-lru";


export default class DataTableCell extends BaseCell {
  parameterFields: MathField[];
  combinedFields: MathField[];
  nextParameterId: number;
  parameterUnitFields: MathField[];
  columnData: string[][];
  columnStatements: (Statement | null)[];
  columnIds: (string | null)[];
  columnErrors: string[];
  columnIsOutput: boolean[];

  cache: QuickLRU<string, Statement>;

  constructor (arg?: DatabaseDataTableCell) {
    if (arg === undefined) {
      super("dataTable");
      this.parameterFields = [new MathField('Col1', 'data_table_expression'), new MathField('Col2', 'data_table_expression')];
      this.nextParameterId = 3;
      this.combinedFields = [new MathField(), new MathField()];
      this.parameterUnitFields = [new MathField('', 'units'), new MathField('', 'units')];
      this.columnData = [['', ''], ['', '']];
      this.columnStatements = [null, null];
      this.columnIds = [null, null];
      this.columnErrors = ['', ''];
      this.columnIsOutput = [false, false];
      this.cache = new QuickLRU<string, Statement>({maxSize: 100});
    } else {
      super("dataTable", arg.id);
      this.parameterFields = arg.parameterLatexs.map((latex) => new MathField(latex, 'data_table_expression'));
      this.nextParameterId = arg.nextParameterId;
      this.parameterUnitFields = arg.parameterUnitLatexs.map((latex) => new MathField(latex, 'units'));
      this.combinedFields = arg.parameterLatexs.map((latex) => new MathField());
      this.columnData = arg.columnData;
      this.columnStatements = Array(this.columnData.length).fill(null);
      this.columnIds = Array(this.columnData.length).fill(null);
      this.columnErrors = Array(this.columnData.length).fill('');
      this.columnIsOutput = Array(this.columnData.length).fill(false);
      this.cache = new QuickLRU<string, Statement>({maxSize: 100});
    }
  }

  serialize(): DatabaseDataTableCell {
    return {
      type: "dataTable",
      id: this.id,
      parameterLatexs: this.parameterFields.map((field) => field.latex),
      nextParameterId: this.nextParameterId,
      parameterUnitLatexs: this.parameterUnitFields.map((parameter) => parameter.latex),
      columnData: this.columnData,
    };
  }

  parseColumn(column: number) {
    let endIndex = this.columnData[column].findIndex(value => value === '');
    if (endIndex === -1) {
      endIndex = undefined;
    }
    const columnValues = this.columnData[column].slice(0, endIndex); 
    if (columnValues.length > 0) {
      let combinedLatex = String.raw`${this.parameterFields[column].latex} = \begin{bmatrix} ${columnValues.join(' \\\\ ')} \end{bmatrix}`;
      
      if (this.parameterUnitFields[column].latex.replaceAll(/\\:?/g,'').trim() !== "" ) {
        combinedLatex += String.raw` \cdot 1 ${this.parameterUnitFields[column].latex}`;
      }

      if (this.cache.has(combinedLatex)) {
        this.columnStatements[column] = this.cache.get(combinedLatex);
      } else {
        this.combinedFields[column].parseLatex(combinedLatex);
        this.columnStatements[column] = this.combinedFields[column].statement;
        this.cache.set(combinedLatex, this.combinedFields[column].statement)
      }
    } else {
      this.columnStatements[column] = null;
    }
  }

  addRow() {
    for(const column of this.columnData) {
      column.push('');
    }
  }

  addColumn() {
    const newVarId = this.nextParameterId++;

    this.parameterUnitFields = [...this.parameterUnitFields, new MathField('', 'units')];
    const newVarName = `Col${newVarId}`;
    this.parameterFields = [...this.parameterFields, new MathField(newVarName, 'data_table_expression')];

    this.combinedFields = [...this.combinedFields, new MathField()];

    this.columnData = [...this.columnData, Array(this.columnData[0].length).fill('')];

    this.columnStatements = [...this.columnStatements, null];
    this.columnIds = [...this.columnIds, null];
    this.columnErrors = [...this.columnErrors, null];
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

    this.columnIsOutput = [...this.columnIsOutput.slice(0,colIndex),
                           ...this.columnIsOutput.slice(colIndex+1)];
  }

  padColumns() {
    let numRows = 0;
    for (const column of this.columnData) {
      if (column.length > numRows) {
        numRows = column.length;
      }
    }
    for (const column of this.columnData) {
      if (column.length < numRows) {
        column.push(...Array(numRows-column.length).fill(''));
      }
    }
  }

}