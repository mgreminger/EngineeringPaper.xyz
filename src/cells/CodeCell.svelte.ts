import { loadMathJax } from "../utility";
import { BaseCell, type DatabaseCodeCell } from "./BaseCell";
import { MathField } from "./MathField.svelte";

export type CodeCellDims = CodeCellDimsSpecific | CodeCellDimsAny | CodeCellDimsRender;

export type CodeCellDimsSpecific = {
  type: "specific",
  dims: number[],
  offset: number,
  scaleFactor: number
}

export type CodeCellDimsAny = {
  type: "any"
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
  dims: CodeCellDims[][],
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

const availableModules = {
  numpy: {
    pyodideName: "numpy",
    version: "2.0.2",
  },
  sympy: {
    pyodideName: "sympy",
    version: "1.13.3",
  },
  scipy: {
    pyodidName: "scipy",
    version: "1.14.1",
  },
  CoolProp: {
    pyodideName: "coolprop",
    version: "6.6.0",
  },
  sklearn: {
    pyodideName: "scikit-learn",
    version: "1.6.1",
  },
  matplotlib: {
    pyodideName: "matplotlib",
    version: "3.8.4",
  },
};

const availableModulesRegExp = new RegExp(Object.keys(availableModules).join("|"), "g");


export default class CodeCell extends BaseCell {
  //@ts-ignore
  static DOMPurify: typeof import('dompurify').default; 
  static marked: typeof import('marked').marked;

  static nextFuncId = 1;
  code: string;
  sympyMode: boolean = $state();
  mathField: MathField = $state();
  neededPyodidePackages: Set<string> = new Set(['numpy']);

  constructor (arg?: DatabaseCodeCell) {
    super("code", arg?.id);
    if (arg === undefined) {
      this.code = this.getInitialCode();
      this.sympyMode = false;
      this.mathField = new MathField(this.getInitialLatex(), "code_func_def");
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
    let mathJaxPromise = null;
    if (!document.querySelector("#MathJax-script")) {
      mathJaxPromise = loadMathJax();
    }

    let domPurifyPromise = null;
    if (!CodeCell.DOMPurify) {
      domPurifyPromise = import('dompurify');
    }

    let markedPromise = null;
    if (!CodeCell.marked) {
      markedPromise = import('marked');
    }

    if (mathJaxPromise) {
      await mathJaxPromise;
    }

    if (domPurifyPromise) {
      CodeCell.DOMPurify = (await domPurifyPromise).default;
      CodeCell.DOMPurify.addHook('afterSanitizeAttributes', function(node) {
        if (node.nodeName === 'use' && node.hasAttribute('xlink:href')) {
          // Allow internal references that begin with a hash
          if (!node.getAttribute('xlink:href').startsWith('#')) {
            node.removeAttribute('xlink:href');
          }
        }
      });
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
      latex: this.mathField.latex,
      code: this.code,
      sympyMode: this.sympyMode
    };
  }

  get parsePending() {
    return this.mathField.parsePending;
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

  getCodeCellFunction(): CodeCellFunction | null {
    if (!this.mathField.parsingError && this.mathField.statement.type === "codeCellFunction") {
      return {
        name: this.mathField.statement.name,
        code: this.code,
        inputDims: this.mathField.statement.inputDims,
        outputDims: this.mathField.statement.outputDims,
        sympyMode: this.sympyMode,
        neededPyodidePackages: [...this.neededPyodidePackages]
      }
    } else {
      return null;
    }
  }

  updateNeededPyodidePackages() {
    this.neededPyodidePackages = new Set(this.code.match(availableModulesRegExp) || []);
    this.neededPyodidePackages.add('numpy');
  }

}