import type { FieldTypes, DataTableInfo } from "./types";
import type { ParsingResult } from "./LatexToSympy";
import appState from "../stores.svelte";

type ParseRequest = {
  latex: string,
  id: number,
  type: FieldTypes,
  dataTableInfo?: DataTableInfo
};

export class LatexParserWrapper {
  worker: Worker;
  requestQueue: Map<number, {request: ParseRequest, resolvers: ((input: ParsingResult) => void)[]}> = new Map();
  currentResolvers: ((input: ParsingResult) => void)[] = [];

  constructor() {
    this.worker = new Worker('parserWorker.js');

    this.worker.onmessage = (e) => {
      for (const resolver of this.currentResolvers) {
        resolver(e.data as ParsingResult);
      }
      this.currentResolvers = [];
      if (this.requestQueue.size === 0) {
        appState.parsePending = false;
      } else {
        const [key, value] = this.requestQueue.entries().next().value;
        this.currentResolvers = value.resolvers;
        this.requestQueue.delete(key);
        this.worker.postMessage(value.request);
      }
    };
  }

  parseLatex(latex: string, id: number, type: FieldTypes, dataTableInfo?: DataTableInfo): Promise<ParsingResult> {

    const newRequest: ParseRequest = {latex, id, type, dataTableInfo};

    return new Promise((resolve: (input: ParsingResult) => void, reject) => {
      if (!appState.parsePending) {
        this.worker.postMessage(newRequest);
        this.currentResolvers = [resolve, ];
      } else {
        if (this.requestQueue.has(id)) {
          const {request, resolvers} = this.requestQueue.get(id);
          resolvers.push(resolve);
          this.requestQueue.set(id, {request: newRequest, resolvers});
        } else {
          this.requestQueue.set(id, {request: newRequest, resolvers: [resolve,]})
        }
      }

      appState.parsePending = true;
    });
  }
}