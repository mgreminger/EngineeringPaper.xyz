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

  name: string;
  code: string;
  inputDims: CodeCellInputOutputDims[];
  outputDims: CodeCellInputOutputDims;

  sympyMode: boolean = $state();

  mathField: MathField = $state();

  constructor (arg?: DatabaseCodeCell) {
    super("code", arg?.id);
    if (arg === undefined) {
      const names = this.getNextFuncNames();
      this.name = names.latexName;
      this.code = this.getInitialCode(names.pythonName);
      this.inputDims = [{
        type: "scalar",
        dims: {type: "any"}
      }];
      this.outputDims = {
        type: "scalar",
        dims: {type: "any"}
      };
      this.sympyMode = false;
      this.mathField = new MathField(this.getInitialLatex(this.name), "code_func_def");
    } else {
      this.code = arg.code;
      this.sympyMode = arg.sympyMode;

      // initialize values that depend on latex, will be replaced once latex is parsed after svelte component is mounted
      this.name = "placeholder";
      this.inputDims = [{
        type: "scalar",
        dims: {type: "any"}
      }];
      this.outputDims = {
        type: "scalar",
        dims: {type: "any"}
      };
      this.mathField = new MathField(arg.latex, "code_func_def");
    }
  }

  static async init() {

  }

  serialize(): DatabaseCodeCell {
    return {
      type: "code",
      id: this.id,
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
    if (!this.mathField.parsingError) {
      return {
        name: this.name,
        code: this.code,
        inputDims: this.inputDims,
        outputDims: this.outputDims,
        sympyMode: this.sympyMode
      }
    } else {
      return null;
    }
  }
}