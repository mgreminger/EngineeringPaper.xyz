import { BaseCell, type DatabaseSystemCell } from "./BaseCell";
import { MathField, type Statement } from "./MathField";


export type SystemDefinition = {
  statements: Statement[],
  variables: string[] 
};

export default class SystemCell extends BaseCell {
  parameterListField: MathField;
  expressionFields: MathField[];

  constructor (arg?: DatabaseSystemCell) {
    if (arg === undefined) {
      super("system");
      this.parameterListField = new MathField('', 'id_list');
      this.expressionFields = [new MathField('', 'equality'), ];
    } else {
      super("system", arg.id);
      this.parameterListField = new MathField(arg.parameterListLatex, 'id_list');
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
  
  getSystemDefinition(): SystemDefinition | null {
    const statements = [];
    
    for (const expression of this.expressionFields) {
      if (expression.parsingError) {
        return null;
      } else {
        statements.push(expression.statement);
      }
    }

    let variables: string[];
    if (this.parameterListField.parsingError) {
      return null;
    } else {
      variables = ((this.parameterListField.statement as any) as string[]); 
    }
    
    return {statements: statements, variables: variables};
  }


  addRow() {
    this.expressionFields = [...this.expressionFields, new MathField('', "equality")];
  }


  deleteRow(rowIndex: number) {
    this.expressionFields = [...this.expressionFields.slice(0,rowIndex),
                             ...this.expressionFields.slice(rowIndex+1)];
  }
}