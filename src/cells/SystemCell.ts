import { BaseCell, type DatabaseSystemCell } from "./BaseCell";
import { MathField, type Statement } from "./MathField";


export type SystemDefinition = {
  statements: Statement[],
  variables: string[], 
  numericalSolve: boolean,
  guesses: number[],
  guessStatements: Statement[],
  selectedSolution: number
};

export default class SystemCell extends BaseCell {
  parameterListField: MathField;
  expressionFields: MathField[];
  selectedSolution: number;

  constructor (arg?: DatabaseSystemCell) {
    if (arg === undefined) {
      super("system");
      this.parameterListField = new MathField('', 'id_list');
      this.expressionFields = [new MathField('', 'equality'), ];
      this.selectedSolution = 0;
    } else {
      super("system", arg.id);
      this.parameterListField = new MathField(arg.parameterListLatex, 'id_list');
      this.expressionFields = arg.expressionLatexs.map((latex) => new MathField(latex, "equality"));
      this.selectedSolution = arg.selectedSolution;
    }
  }

  serialize(): DatabaseSystemCell {
    return {
      type: "system",
      id: this.id,
      parameterListLatex: this.parameterListField.latex,
      expressionLatexs: this.expressionFields.map((field) => field.latex),
      selectedSolution: this.selectedSolution
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
    let guesses: number[];
    let guessStatements: Statement[];
    let numericalSolve: boolean;
    if (this.parameterListField.parsingError) {
      return null;
    } else {
      variables = ((this.parameterListField.statement as any).ids as string[]);
      guesses  = ((this.parameterListField.statement as any).guesses as number[]);
      guessStatements  = ((this.parameterListField.statement as any).statements as Statement[]);
      numericalSolve = ((this.parameterListField.statement as any).numericalSolve as boolean);
    }
    
    if (numericalSolve) {
      this.selectedSolution = 0;
    }

    return {
      statements: statements,
      variables: variables,
      selectedSolution: this.selectedSolution,
      guesses: guesses,
      guessStatements: guessStatements,
      numericalSolve: numericalSolve
    };
  }


  addRow() {
    this.expressionFields = [...this.expressionFields, new MathField('', "equality")];
  }


  deleteRow(rowIndex: number) {
    this.expressionFields = [...this.expressionFields.slice(0,rowIndex),
                             ...this.expressionFields.slice(rowIndex+1)];
  }
}