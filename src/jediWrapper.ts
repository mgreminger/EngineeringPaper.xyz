export type CodeContextRequest = {
  code: string;
  line: number;
  col: number;
};

export type AutocompleteSuggestion = {
  label: string;
  type: string;
  detail: string;
  prefixLength: number;
};

export type CodeContextResult = {
  autocompleteSuggestions: AutocompleteSuggestion[];
  hoverText: string;
};

export class JediWrapper {
  resolvers: ((result: CodeContextResult) => void)[] = [];
  worker: Worker;

  constructor() {
    this.worker = new Worker("jediWorker.js");

    this.worker.onmessage = (e) => {
      const resolver = this.resolvers.shift();
      resolver(e.data as CodeContextResult);
    };
  }

  getCodeContextResult(request: {
    codeContextRequest: CodeContextRequest;
    neededPyodidePackages: string[];
  }): Promise<CodeContextResult> {
    return new Promise((resolve, reject) => {
      this.resolvers.push(resolve);
      this.worker.postMessage(request);
    });
  }
}
