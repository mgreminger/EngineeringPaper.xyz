import { BaseCell, type DatabasePiecewiseCell } from "./BaseCell";
import { MathField } from "./MathField";
import type { Statement } from "../parser/types";

export default class PiecewiseCell extends BaseCell {
  parameterField: MathField;
  expressionFields: MathField[];
  conditionFields: MathField[];
  piecewiseStatement: Statement | null;

  constructor (arg?: DatabasePiecewiseCell) {
    if (arg === undefined) {
      super("piecewise");
      this.parameterField = new MathField('', 'parameter');
      this.expressionFields = [new MathField('', 'expression_no_blank'), new MathField('', 'expression_no_blank')];
      this.conditionFields = [new MathField('', 'condition'), ];
      this.piecewiseStatement = null;
    } else {
      super("piecewise", arg.id);
      this.parameterField = new MathField(arg.parameterLatex, 'parameter');
      this.expressionFields = arg.expressionLatexs.map((latex) => new MathField(latex, "expression_no_blank"));
      this.conditionFields = arg.conditionLatexs.map((latex) => new MathField(latex, "condition"));
      this.piecewiseStatement = null;
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
  
  parsePiecewiseStatement() {
    if (!(this.parameterField.parsingError || 
          this.expressionFields.some(value => value.parsingError) ||
          this.conditionFields.some(value => value.parsingError))) {
      let args = this.expressionFields
                    .slice(0,-1)
                    .map((exp, index) => `(${exp.latex},${this.conditionFields[index].latex}),`)
                    .reduce((accum, value) => accum + value, '');
      const latex = `${this.parameterField.latex} = piecewise( ${args}(${this.expressionFields.slice(-1)[0].latex}, 1>0) )`;

      const mathField = new MathField(latex, 'piecewise');

      mathField.parseLatex(latex);

      this.piecewiseStatement =  mathField.statement;
    } else {
      this.piecewiseStatement = null;
    }
  }


  addRow() {
    this.expressionFields = [...this.expressionFields.slice(0,-1),
                             new MathField('', "expression_no_blank"),
                             ...this.expressionFields.slice(-1)
                            ];
    this.conditionFields = [...this.conditionFields, new MathField('', "condition")];
  }


  deleteRow(rowIndex: number) {
    this.expressionFields = [...this.expressionFields.slice(0,rowIndex),
                             ...this.expressionFields.slice(rowIndex+1)];

    this.conditionFields = [...this.conditionFields.slice(0,rowIndex),
                            ...this.conditionFields.slice(rowIndex+1)];
  }

}