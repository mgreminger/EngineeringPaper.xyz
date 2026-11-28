import Quill, { Delta, type Op } from "quill";
import { BaseCell, type DatabaseDataTableCell, type DatabaseTableCell } from "./BaseCell";
import type { Statement } from "../parser/types";

export default class TableCell extends BaseCell {
  rowLabels: string[] = $state();
  nextRowLabelId: number;
  parameterLatexs: string[] = $state();
  nextParameterId: number;
  parameterUnitLatexs: string[] = $state();
  rhsLatexs: string[][] = $state();
  selectedRow: number = $state();
  hideUnselected: boolean = $state();
  rowOpsArray: Op[][] = $state();

  constructedFromDataTable: boolean = $state();
  sourceDataTableCell: DatabaseDataTableCell | null = $state();

  constructor (arg?: DatabaseTableCell | DatabaseDataTableCell) {
    super("table", arg?.id);
    if (arg === undefined) {
      this.rowLabels = ["Option 1", "Option 2"];
      this.nextRowLabelId = 3;
      this.parameterLatexs = ['Var1', 'Var2'];
      this.nextParameterId = 3;
      this.parameterUnitLatexs = ['', ''];
      this.rhsLatexs = [['', ''],
                        ['', '']];
      this.selectedRow = 0;
      this.hideUnselected = false;
      this.rowOpsArray = [];
      this.constructedFromDataTable = false;
      this.sourceDataTableCell = null;
    } else if (arg.type === "table") {
      this.rowLabels = [...arg.rowLabels];
      this.nextRowLabelId = arg.nextRowLabelId;
      this.parameterLatexs = [...arg.parameterLatexs];
      this.nextParameterId = arg.nextParameterId;
      this.parameterUnitLatexs = [...arg.parameterUnitLatexs];
      this.rhsLatexs = arg.rhsLatexs.map(row => [...row]);
      this.selectedRow = arg.selectedRow;
      this.hideUnselected = arg.hideUnselected;
      // Old database entries used the whole Delta objects rather the the ops arrow
      // Need to use the Delta constructor to handle both cases 
      this.rowOpsArray = arg.rowJsons ? arg.rowJsons.map((json: any) => new Delta(structuredClone(json)).ops) : [];
      this.constructedFromDataTable = false;
      this.sourceDataTableCell = null;
    } else {
      // constructing a selector table from a data table
      this.constructedFromDataTable = true;
      this.sourceDataTableCell = arg;
      this.rowLabels = [...arg.descriptions];
      this.nextRowLabelId = arg.descriptions.length + 1;
      this.parameterLatexs = arg.parameterLatexs.map((latex) => latex.split('=')[0]);
      this.nextParameterId = arg.nextParameterId;
      this.parameterUnitLatexs = [...arg.parameterUnitLatexs];

      const numColumns = arg.columnData.length;
      const numRows = arg.columnData[0].length;
      this.rhsLatexs = Array(numRows).fill([]);
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
          this.rhsLatexs[i][j] = arg.columnData[j][i];
        }
      }

      this.selectedRow = 0;
      this.hideUnselected = false;
      this.rowOpsArray = [];
    }
  }

  serialize(): DatabaseTableCell {
    return {
      type: "table",
      id: this.id,
      rowLabels: $state.snapshot(this.rowLabels),
      nextRowLabelId: this.nextRowLabelId,
      parameterLatexs: $state.snapshot(this.parameterLatexs),
      nextParameterId: this.nextParameterId,
      parameterUnitLatexs: $state.snapshot(this.parameterUnitLatexs),
      rhsLatexs: $state.snapshot(this.rhsLatexs),
      selectedRow: this.selectedRow,
      hideUnselected: this.hideUnselected,
      rowJsons: $state.snapshot(this.rowOpsArray)
    };
  }

  addRowDocumentation() {
    this.rowOpsArray = Array.from({length: this.rowLabels.length}, () => []);
  }

  deleteRowDocumentation() {
    this.rowOpsArray = [];
  }

  addRow() {
    const newRowId = this.nextRowLabelId++;
    this.rowLabels = [...this.rowLabels, `Option ${newRowId}`];
    
    if (this.rowOpsArray.length > 0) {
      this.rowOpsArray = [...this.rowOpsArray, []];
    }

    let newRhsRow: string[] = Array(this.parameterLatexs.length).fill(''); 
    this.rhsLatexs = [...this.rhsLatexs, newRhsRow];
  }

  addColumn() {
    const newVarId = this.nextParameterId++;

    this.parameterUnitLatexs = [...this.parameterUnitLatexs, ''];
    const newVarName = `Var${newVarId}`;
    this.parameterLatexs = [...this.parameterLatexs, newVarName];

    this.rhsLatexs = this.rhsLatexs.map( row => [...row, '']);
  }

  deleteRow(rowIndex: number):boolean {
    this.rowLabels = [...this.rowLabels.slice(0,rowIndex),
                                    ...this.rowLabels.slice(rowIndex+1)];

    if (this.rowOpsArray.length > 0) {
      this.rowOpsArray = [...this.rowOpsArray.slice(0,rowIndex),
                     ...this.rowOpsArray.slice(rowIndex+1)];
    }
    
    this.rhsLatexs = [...this.rhsLatexs.slice(0,rowIndex), 
                      ...this.rhsLatexs.slice(rowIndex+1)];

    if (this.selectedRow >= rowIndex) {
      if (this.selectedRow !== 0) {
        this.selectedRow -= 1;
        return true
      }
    }

    return false
  }

  deleteColumn(colIndex: number) {
    this.parameterUnitLatexs = [...this.parameterUnitLatexs.slice(0,colIndex),
                                ...this.parameterUnitLatexs.slice(colIndex+1)];

    this.parameterLatexs = [...this.parameterLatexs.slice(0,colIndex),
                            ...this.parameterLatexs.slice(colIndex+1)];

    this.rhsLatexs = this.rhsLatexs.map( row => [...row.slice(0,colIndex), ...row.slice(colIndex+1)]);
  }

}