import { loadMathJax } from "../utility";
import { BaseCell, type DatabaseCodeCell } from "./BaseCell";
import pyodideInfo from "../pyodide-info.json";

const currentPyodideInfo = pyodideInfo.slice(-1)[0].info;

export type CodeCellDims = CodeCellDimsSpecific | CodeCellDimsAny | CodeCellDimsRender | CodeCellDimsDummy;

export type CodeCellDimsSpecific = {
  type: "specific",
  dims: number[],
  offset: number,
  scaleFactor: number
}

export type CodeCellDimsAny = {
  type: "any"
}

export type CodeCellDimsDummy = {
  type: "dummy"
}

export type CodeCellDimsRender = {
  type: "render",
  renderType: "text" | "html" | "markdown"
}

export type ScalarCodeCellDims = {
  type: "scalar",
  dims: CodeCellDims,
}

export type MatrixCodeCellDims = {
  type: "matrix",
  dims: (CodeCellDimsSpecific | CodeCellDimsAny)[][],
}

export type CodeCellInputOutputDims = ScalarCodeCellDims | MatrixCodeCellDims;

export type CodeCellFunction = {
  name: string,
  code: string,
  inputDims: CodeCellInputOutputDims[],
  outputDims: CodeCellInputOutputDims,
  sympyMode: boolean,
  neededPyodidePackages: string[]
}

const availableModulesRegExp = new RegExp(Object.keys(currentPyodideInfo.availablePackages).join("|"), "g");

export default class CodeCell extends BaseCell {
  //@ts-ignore
  static marked: typeof import('marked').marked;

  static nextFuncId = 1;
  code: string;
  sympyMode: boolean = $state();
  latex:string = $state();
  neededPyodidePackages: Set<string> = new Set(['numpy']);

  constructor (arg?: DatabaseCodeCell) {
    super("code", arg?.id);
    if (arg === undefined) {
      this.code = this.getInitialCode();
      this.sympyMode = false;
      this.latex = this.getInitialLatex();
    } else {
      if (arg.nextFuncId > CodeCell.nextFuncId) {
        CodeCell.nextFuncId = arg.nextFuncId;
      }
      this.code = arg.code;
      this.sympyMode = arg.sympyMode;
      this.latex = arg.latex;
    }
  }

  static async init() {
    let mathJaxPromise = null;
    if (!document.querySelector("#MathJax-script")) {
      mathJaxPromise = loadMathJax();
    }

    let markedPromise = null;
    if (!CodeCell.marked) {
      markedPromise = import('marked');
    }

    if (mathJaxPromise) {
      await mathJaxPromise;
    }
    
    if (markedPromise) {
      CodeCell.marked = (await markedPromise).marked;
    }
  }

  serialize(): DatabaseCodeCell {
    return {
      type: "code",
      id: this.id,
      nextFuncId: CodeCell.nextFuncId,
      latex: this.latex,
      code: this.code,
      sympyMode: this.sympyMode
    };
  }

  getNextFuncName() {
    return `CodeFunc${CodeCell.nextFuncId++}`;
  }

  getInitialLatex() {
    return String.raw`\mathrm{${this.getNextFuncName()}}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`;
  }

  getInitialCode() {
    return `def calculate(value):
    output = 2*value
    return output
`;
  }

  updateNeededPyodidePackages() {
    const packageMatches: string[] = this.code.match(availableModulesRegExp) || [];
    const pyodideNames = packageMatches.map(key => currentPyodideInfo.availablePackages[key].pyodideName);
    this.neededPyodidePackages = new Set(pyodideNames);
    this.neededPyodidePackages.add('numpy');
  }

}