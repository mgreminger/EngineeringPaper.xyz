import { BaseCell, type DatabaseSystemCell } from "./BaseCell";
import { MathField, type Statement } from "./MathField";

export default class SystemCell extends BaseCell {
  parameterListField: MathField;
  expressionFields: MathField[];

  constructor (arg?: DatabaseSystemCell) {
    if (arg === undefined) {
      super("system");
      this.parameterListField = new MathField('', 'idlist');
      this.expressionFields = [new MathField('', 'equality'), ];
    } else {
      super("system", arg.id);
      this.parameterListField = new MathField(arg.parameterListLatex, 'idlist');
      this.expressionFields = arg.expressionLatexs.map((latex) => new MathField(latex, "equality"));
    }
  }

  serialize(): DatabaseSystemCell {
    return {
      type: "system",
      id: this.id,
      parameterListLatex: this.parameterListField.latex,
      expressionLatexs: this.expressionFields.map((field) => field.latex)
    };
  }
  
  parseSystemStatement(cellNum: number): Statement {

  }


  addRow() {
    this.expressionFields = [...this.expressionFields, new MathField('', "equality")];
  }


  deleteRow(rowIndex: number) {
    this.expressionFields = [...this.expressionFields.slice(0,rowIndex),
                             ...this.expressionFields.slice(rowIndex+1)];
  }
}