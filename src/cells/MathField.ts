import type { SvelteComponent } from "svelte";

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
  element: SvelteComponent | null = null;
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
      this.pendingNewLatex = false;
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
  }
}
