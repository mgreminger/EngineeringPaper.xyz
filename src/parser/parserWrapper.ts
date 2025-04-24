import type { FieldTypes, DataTableInfo } from "./types";
import type { ParsingResult } from "./LatexToSympy";

export class LatexParserWrapper {
  worker: Worker;
  resolveFunctionQueue: ((input: ParsingResult) => void)[] = [];

  constructor() {
    this.worker = new Worker('parserWorker.js');

    this.worker.onmessage = (e) => {
      this.resolveFunctionQueue.shift()(e.data as ParsingResult);
    };
  }

  async parseLatex(latex: string, id: number, type: FieldTypes, dataTableInfo?: DataTableInfo): Promise<ParsingResult> {
    this.worker.postMessage({latex, id, type, dataTableInfo});

    return new Promise((resolve: (input: ParsingResult) => void, reject) => {
      this.resolveFunctionQueue.push(resolve);
    });
  }
}