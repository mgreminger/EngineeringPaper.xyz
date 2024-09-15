import type MathFieldElement from "../MathField.svelte";

import { parseLatex } from "../parser/LatexToSympy";
import type { Statement, FieldTypes, DataTableInfo } from "../parser/types";


export class MathField {
  latex: string;
  type: FieldTypes;
  id: number;
  static nextId = 0; 
  parsingError = true;
  parsingErrorMessage = "Invalid Syntax";
  statement: Statement | null = null;
  element: MathFieldElement | null = null;
  pendingNewLatex = false;
  newLatex:string;

  constructor (latex = "", type: FieldTypes ="math") {
    this.latex = latex;
    this.type = type;
    this.id = MathField.nextId++;
  };

  setPendingLatex(): void {
    if (this.pendingNewLatex && this.element) {
      this.element.setLatex(this.newLatex, false);
      this.pendingNewLatex = false; // needed to prevent the unlikely scenario where an immediateUpdate leads to an infinite loop
    }
  }

  parseLatex(latex: string, dataTableInfo?: DataTableInfo) {
    this.latex = latex;

    const result = parseLatex(latex, this.id, this.type, dataTableInfo);

    this.pendingNewLatex = result.pendingNewLatex;
    this.newLatex = result.newLatex;
    this.parsingError = result.parsingError;
    this.parsingErrorMessage = result.parsingErrorMessage;
    this.statement = result.statement;

    if (result.immediateUpdate && this.element) {
      let startingPosition = this.element.getMathField().position;
      this.setPendingLatex();
      if (startingPosition > this.element.getMathField().lastOffset) {
        startingPosition = this.element.getMathField().lastOffset;
      }
      this.element.getMathField().position = startingPosition;
    }
  }
}
