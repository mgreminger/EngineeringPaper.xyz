import { BaseCell, type DatabasePiecewiseCell } from "./BaseCell";

export default class PiecewiseCell extends BaseCell {
  parameterLatex: string = $state();
  expressionLatexs: string[] = $state();
  conditionLatexs: string[] = $state();

  constructor (arg?: DatabasePiecewiseCell) {
    super("piecewise", arg?.id);
    if (arg === undefined) {
      this.parameterLatex = '';
      this.expressionLatexs = ['', ''];
      this.conditionLatexs = ['', ];
    } else {
      this.parameterLatex = arg.parameterLatex;
      this.expressionLatexs = arg.expressionLatexs;
      this.conditionLatexs = arg.conditionLatexs;
    }
  }

  serialize(): DatabasePiecewiseCell {
    return {
      type: "piecewise",
      id: this.id,
      parameterLatex: this.parameterLatex,
      expressionLatexs: this.expressionLatexs,
      conditionLatexs: this.conditionLatexs
    };
  }

  addRow() {
    this.expressionLatexs = [...this.expressionLatexs.slice(0,-1),
                             '',
                             ...this.expressionLatexs.slice(-1)
                            ];
    this.conditionLatexs = [...this.conditionLatexs, ''];
  }


  deleteRow(rowIndex: number) {
    this.expressionLatexs = [...this.expressionLatexs.slice(0,rowIndex),
                             ...this.expressionLatexs.slice(rowIndex+1)];

    this.conditionLatexs = [...this.conditionLatexs.slice(0,rowIndex),
                            ...this.conditionLatexs.slice(rowIndex+1)];
  }

}