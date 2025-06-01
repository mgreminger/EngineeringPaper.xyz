import { BaseCell, type DatabaseCodeCell } from "./BaseCell";
import { MathField } from "./MathField.svelte";

export type CodeCellDims = CodeCellDimsSpecific | CodeCellDimsAny;

export type CodeCellDimsSpecific = {
  type: "specific",
  dims: number[],
  offset: number,
  scaleFactor: number
}

export type CodeCellDimsAny = {
  type: "any"
}

export type ScalarCodeCellDims = {
  type: "scalar",
  dims: CodeCellDims,
}

export type MatrixCodeCellDims = {
  type: "matrix",
  dims: CodeCellDims[][],
}

export type CodeCellInputOutputDims = ScalarCodeCellDims | MatrixCodeCellDims;

export type CodeCellFunction = {
  name: string,
  code: string,
  inputDims: CodeCellInputOutputDims[],
  outputDims: CodeCellInputOutputDims,
  sympyMode: boolean
}

export default class CodeCell extends BaseCell {
  static nextFuncId = 1;
  code: string;
  sympyMode: boolean = $state();
  mathField: MathField = $state();

  constructor (arg?: DatabaseCodeCell) {
    super("code", arg?.id);
    if (arg === undefined) {
      const names = this.getNextFuncNames();
      this.code = this.getInitialCode(names.pythonName);
      this.sympyMode = false;
      this.mathField = new MathField(this.getInitialLatex(names.latexName), "code_func_def");
    } else {
      if (arg.nextFuncId > CodeCell.nextFuncId) {
        CodeCell.nextFuncId = arg.nextFuncId;
      }
      this.code = arg.code;
      this.sympyMode = arg.sympyMode;
      this.mathField = new MathField(arg.latex, "code_func_def");
    }
  }

  static async init() {

  }

  serialize(): DatabaseCodeCell {
    return {
      type: "code",
      id: this.id,
      nextFuncId: CodeCell.nextFuncId,
      latex: this.mathField.latex,
      code: this.code,
      sympyMode: this.sympyMode
    };
  }

  get parsePending() {
    return this.mathField.parsePending;
  }

  getNextFuncNames() {
    const id = CodeCell.nextFuncId++;
    return {
      latexName: `CodeFunc${id}`,
      pythonName: `code_func_${id}`
    };
  }

  getInitialLatex(funcName: string) {
    return String.raw`\mathrm{${funcName}}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`;
  }

  getInitialCode(funcName: string) {
    return `def ${funcName}(input):
    output = 2*input
    return output
`;
  }

  getCodeCellFunction(): CodeCellFunction | null {
    if (!this.mathField.parsingError && this.mathField.statement.type === "codeCellFunction") {
      return {
        name: this.mathField.statement.name,
        code: this.code,
        inputDims: this.mathField.statement.inputDims,
        outputDims: this.mathField.statement.outputDims,
        sympyMode: this.sympyMode
      }
    } else {
      return null;
    }
  }
}