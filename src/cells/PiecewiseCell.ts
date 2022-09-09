import { BaseCell, type DatabasePiecewiseCell } from "./BaseCell";
import { MathField, type Statement } from "./MathField";

export default class PiecewiseCell extends BaseCell {
  parameterField: MathField;
  expressionFields: MathField[];
  conditionFields: MathField[];

  constructor (arg?: DatabasePiecewiseCell) {
    if (arg === undefined) {
      super("piecewise");
      this.parameterField = new MathField('', 'parameter');
      this.expressionFields = [new MathField('', 'expression'), new MathField('Var2', 'expression')];
      this.conditionFields = [new MathField('', 'condition'), ];
    } else {
      super("piecewise", arg.id);
      this.parameterField = new MathField(arg.parameterLatex, 'parameter');
      this.expressionFields = arg.expressionLatexs.map((latex) => new MathField(latex, "expression"));
      this.expressionFields = arg.conditionLatexs.map((latex) => new MathField(latex, "condition"));
    }
  }

  serialize(): DatabasePiecewiseCell {
    return {
      type: "piecewise",
      id: this.id,
      parameterLatex: this.parameterField.latex,
      expressionLatexs: this.expressionFields.map((field) => field.latex),
      conditionLatexs: this.conditionFields.map((field) => field.latex)
    };
  }
  
  parsePiecewiseStatement(cellNum: number): Statement {
    let args = this.expressionFields
                   .slice(0,-1)
                   .map((exp, index) => `(${exp.latex},${this.conditionFields[index].latex}),`)
                   .reduce((accum, value) => accum + value, '');
    const latex = `Piecewise(${args}(${this.expressionFields.slice(-1)[0].latex}, True)`;
                   
    const mathField = new MathField(latex, 'piecewise');

    mathField.parseLatex(latex, cellNum);

    return mathField.statement;
  }


  addRow() {
    this.expressionFields = [...this.expressionFields, new MathField('', "expression")];
    this.conditionFields = [...this.conditionFields, new MathField('', "condition")];
  }


  deleteRow(rowIndex: number) {
    this.expressionFields = [...this.expressionFields.slice(0,rowIndex),
                             ...this.expressionFields.slice(rowIndex+1)];

    this.conditionFields = [...this.conditionFields.slice(0,rowIndex),
                            ...this.conditionFields.slice(rowIndex+1)];
  }

}