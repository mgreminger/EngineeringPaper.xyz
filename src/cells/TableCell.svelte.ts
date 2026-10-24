import Quill, { Delta } from "quill";
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
  rowDeltas: Delta[] = $state();

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
      this.rowDeltas = [];
      this.constructedFromDataTable = false;
      this.sourceDataTableCell = null;
    } else if (arg.type === "table") {
      this.rowLabels = [...arg.rowLabels];
      this.nextRowLabelId = arg.nextRowLabelId;
      this.parameterLatexs = [...arg.parameterLatexs];
      this.nextParameterId = arg.nextParameterId;
      this.parameterUnitLatexs = [...arg.parameterUnitLatexs];
      this.rhsLatexs = structuredClone(arg.rhsLatexs);
      this.selectedRow = arg.selectedRow;
      this.hideUnselected = arg.hideUnselected;
      this.rowDeltas = structuredClone(arg.rowJsons);
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
      this.rowDeltas = [];
    }
  }

  serialize(): DatabaseTableCell {
    return {
      type: "table",
      id: this.id,
      rowLabels: this.rowLabels,
      nextRowLabelId: this.nextRowLabelId,
      parameterLatexs: this.parameterLatexs,
      nextParameterId: this.nextParameterId,
      parameterUnitLatexs: this.parameterUnitLatexs,
      rhsLatexs: this.rhsLatexs,
      selectedRow: this.selectedRow,
      hideUnselected: this.hideUnselected,
      rowJsons: this.rowDeltas
    };
  }

  addRowDocumentation() {
    this.rowDeltas = Array.from({length: this.rowLabels.length}, () => new Delta());
  }

  deleteRowDocumentation() {
    this.rowDeltas = [];
  }

  addRow() {
    const newRowId = this.nextRowLabelId++;
    this.rowLabels = [...this.rowLabels, `Option ${newRowId}`];
    
    if (this.rowDeltas.length > 0) {
      this.rowDeltas = [...this.rowDeltas, new Delta()];
    }

    let columnType: "expression" | "number";
    let newRhsRow: string[] = []; 
    for (const unitLatex of this.parameterUnitLatexs) {
      newRhsRow.push('');
    }

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

    if (this.rowDeltas.length > 0) {
      this.rowDeltas = [...this.rowDeltas.slice(0,rowIndex),
                        ...this.rowDeltas.slice(rowIndex+1)];
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