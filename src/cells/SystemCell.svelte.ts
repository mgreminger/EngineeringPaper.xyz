import { BaseCell, type DatabaseSystemCell } from "./BaseCell";
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
  parameterListLatex: string = $state();
  expressionLatexs: string[] = $state();
  selectedSolution: number = $state();

  constructor (arg?: DatabaseSystemCell) {
    super("system", arg?.id);
    if (arg === undefined) {
      this.parameterListLatex = '';
      this.expressionLatexs = ['',];
      this.selectedSolution = 0;
    } else {
      this.parameterListLatex = arg.parameterListLatex;
      this.expressionLatexs = [...arg.expressionLatexs];
      this.selectedSolution = arg.selectedSolution;
    }
  }

  serialize(): DatabaseSystemCell {
    return {
      type: "system",
      id: this.id,
      parameterListLatex: this.parameterListLatex,
      expressionLatexs: this.expressionLatexs,
      selectedSolution: this.selectedSolution
    };
  }

  addRow() {
    this.expressionLatexs = [...this.expressionLatexs, ''];
  }


  deleteRow(rowIndex: number) {
    this.expressionLatexs = [...this.expressionLatexs.slice(0,rowIndex),
                             ...this.expressionLatexs.slice(rowIndex+1)];
  }
}