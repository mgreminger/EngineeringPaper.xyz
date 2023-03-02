import { BaseCell, type DatabaseSystemCell } from "./BaseCell";
import { MathField } from "./MathField";
import type { EqualityStatement, GuessAssignmentStatement } from "../parser/types";

export type SystemDefinition = ExactSystemDefinition | NumericalSystemDefinition;

type ExactSystemDefinition = {
  statements: EqualityStatement[],
  variables: string[], 
  numericalSolve: false,
  selectedSolution: number
};

type NumericalSystemDefinition = Omit<ExactSystemDefinition, "numericalSolve"> & { 
  numericalSolve: true,
  guesses: string[],
  guessStatements: GuessAssignmentStatement[],
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
    const statements: EqualityStatement[] = [];
    
    for (const expression of this.expressionFields) {
      if (expression.parsingError || expression.statement.type !== "equality") {
        return null;
      } else {
        statements.push(expression.statement);
      }
    }

    let system: SystemDefinition | null = null;

    if (this.parameterListField.parsingError) {
      return null;
    } else {
      const statement = this.parameterListField.statement;
      if (statement.type === "unknowns" && statement.numericalSolve === false) {
        system = {
          statements: statements,
          variables: statement.ids,
          numericalSolve: false,
          selectedSolution: this.selectedSolution
        }
      } else if (statement.type === "unknowns") {
        this.selectedSolution = 0;
        system = {
          statements: statements,
          variables: statement.ids,
          numericalSolve: true,
          selectedSolution: this.selectedSolution,
          guesses: statement.guesses,
          guessStatements: statement.statements
        }
      }
    }

    return system;
  }


  addRow() {
    this.expressionFields = [...this.expressionFields, new MathField('', "equality")];
  }


  deleteRow(rowIndex: number) {
    this.expressionFields = [...this.expressionFields.slice(0,rowIndex),
                             ...this.expressionFields.slice(rowIndex+1)];
  }
}