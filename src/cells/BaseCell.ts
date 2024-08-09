import type { MathCellConfig, FluidConfig } from "../sheet/Sheet";

export type CellTypes = "math" | "documentation" | "plot" | "table" | "piecewise" | "system" |
                        "deleted" | "insert" | "fluid" | "dataTable";

export type DatabaseCell = DatabaseMathCell | DatabaseDocumentationCell |
                           DatabasePlotCell | DatabaseTableCell | DatabasePiecewiseCell | 
                           DatabaseSystemCell | DatabaseFluidCell | DatabaseDataTableCell;

export type DatabaseMathCell = {
  type: "math",
  id: number,
  latex: string,
  config: MathCellConfig | null | undefined  // config might be undefined for old database entries
};

export type DatabasePlotCell = {
  type: "plot",
  id: number,
  latexs: string[],
  logX: boolean | undefined, // logX, logY, and squareAspectRatio might be undefined for old database entries
  logY: boolean | undefined,
  squareAspectRatio: boolean | undefined
};

export type DatabaseDocumentationCell = {
  type: "documentation",
  id: number,
  json: any // quill Delta object
}

export type DatabaseTableCell = {
  type: "table",
  id: number,
  rowLabels: string[],
  nextRowLabelId: number,
  parameterLatexs: string[],
  nextParameterId: number,
  parameterUnitLatexs: string[],
  rhsLatexs: string[][],
  selectedRow: number,
  hideUnselected: boolean,
  rowJsons: string[]
}

type DatabaseInterpolationDefinition = {
  type: "polyfit" | "interpolation",
  nameLatex: string,
  input: number,
  output: number,
  order: number
}

export type DatabaseDataTableCell = {
  type: "dataTable",
  id: number,
  parameterLatexs: string[],
  nextParameterId: number,
  nextInterpolationDefId: number,
  nextPolyfitDefId: number,
  parameterUnitLatexs: string[],
  columnData: string[][],
  interpolationDefinitions: DatabaseInterpolationDefinition[]
}

export type DatabasePiecewiseCell = {
  type: "piecewise",
  id: number,
  parameterLatex: string,
  expressionLatexs: string[],
  conditionLatexs: string[] 
}

export type DatabaseSystemCell = {
  type: "system",
  id: number,
  parameterListLatex: string,
  expressionLatexs: string[],
  selectedSolution: number
}

export type DatabaseFluidCell = {
  type: "fluid",
  id: number,
  fluidConfig: FluidConfig,
  useSheetFluid: boolean,
  useFluidInName: boolean,
  output: string,
  input1: string,
  input2: string,
  input3: string,
  latex: string,
};

export abstract class BaseCell {
  readonly type: CellTypes;
  id: number;
  static nextId = 0;

  abstract serialize(): DatabaseCell | null;

  constructor(type: CellTypes, index?: number) {
    if (index !== undefined) {
      this.id = index;
    } else {
      this.id = BaseCell.nextId++;
    }    
    this.type = type;
  }
}