import { BaseCell, type DatabasePiecewiseCell } from "./BaseCell";
import { MathField } from "./MathField.svelte";
import type { Statement } from "../parser/types";

export default class PiecewiseCell extends BaseCell {
  parameterField: MathField = $state();
  expressionFields: MathField[] = $state();
  conditionFields: MathField[] = $state();
  piecewiseStatement: Statement | null;
  piecewiseParser = new MathField('', 'piecewise');

  constructor (arg?: DatabasePiecewiseCell) {
    super("piecewise", arg?.id);
    if (arg === undefined) {
      this.parameterField = new MathField('', 'parameter');
      this.expressionFields = [new MathField('', 'expression_no_blank'), new MathField('', 'expression_no_blank')];
      this.conditionFields = [new MathField('', 'condition'), ];
      this.piecewiseStatement = null;
    } else {
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

  get parsePending() {
    return this.parameterField.parsePending ||
           this.expressionFields.reduce((accum, value) => accum || value.parsePending, false) ||
           this.conditionFields.reduce((accum, value) => accum || value.parsePending, false);
  }
  
  async parsePiecewiseStatement() {
    if (!(this.parameterField.parsingError || 
          this.expressionFields.some(value => value.parsingError) ||
          this.conditionFields.some(value => value.parsingError))) {
      let args = this.expressionFields
                    .slice(0,-1)
                    .map((exp, index) => `(${exp.latex},${this.conditionFields[index].latex}),`)
                    .reduce((accum, value) => accum + value, '');
      const latex = `${this.parameterField.latex} = piecewise( ${args}(${this.expressionFields.slice(-1)[0].latex}, 1>0) )`;

      await this.piecewiseParser.parseLatex(latex);

      this.piecewiseStatement =  this.piecewiseParser.statement;
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