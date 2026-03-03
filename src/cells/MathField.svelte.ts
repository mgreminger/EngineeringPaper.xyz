import type MathFieldElement from "../MathField.svelte";

import { LatexParserWrapper } from "../parser/parserWrapper";
import type { Statement, FieldTypes, DataTableInfo } from "../parser/types";
import type { ParsingResult } from "../parser/LatexToSympy";
import appState from "../stores.svelte";

function setParsePending(parsePending: boolean) {
  appState.parsePending = parsePending;
}

const parserWrapper = new LatexParserWrapper(setParsePending);

export class MathField {
  latex: string = $state();
  type: FieldTypes;
  id: number;
  static nextId = 0;
  parsePending = $state(true);
  parsingError = $state(true);
  parsingErrorMessage = $state("Invalid Syntax");
  statement: Statement | null = $state(null);
  element: MathFieldElement | null = null;
  pendingNewLatex = false;
  newLatex:string;

  parsingPromise: Promise<ParsingResult>;

  constructor (latex = "", type: FieldTypes ="math") {
    this.latex = latex;
    this.type = type;
    this.id = MathField.nextId++;
  };

  async setPendingLatex(immediate = false): Promise<void> {
    await this.parsingPromise;
    if (this.pendingNewLatex && this.element) {

      let startingPosition = this.element.getMathField().position;
      this.element.setLatex(this.newLatex, false);

      if (immediate) {
        if (startingPosition > this.element.getMathField().lastOffset) {
          startingPosition = this.element.getMathField().lastOffset;
        }
        this.element.getMathField().position = startingPosition;
      }

      this.pendingNewLatex = false; // needed to prevent the unlikely scenario where an immediateUpdate leads to an infinite loop
    }
  }

  async parseLatex(latex: string, dataTableInfo?: DataTableInfo) {
    this.latex = latex;

    this.parsePending = true;
    this.parsingPromise = parserWrapper.parseLatex(latex, this.id, this.type, dataTableInfo);
    const result = await this.parsingPromise;
    this.parsePending = false;

    this.pendingNewLatex = result.pendingNewLatex;
    this.newLatex = result.newLatex;
    this.parsingError = result.parsingError;
    this.parsingErrorMessage = result.parsingErrorMessage;
    this.statement = result.statement;

    if (result.immediateUpdate && this.element) {
      this.setPendingLatex(true);
    }
  }
}
