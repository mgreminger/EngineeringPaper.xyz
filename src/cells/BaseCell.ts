export type CellTypes = "math" | "documentation" | "plot" | "table" | "piecewise" | "system" |
                        "deleted" | "insert";

export type DatabaseCell = DatabaseMathCell | DatabaseDocumentationCell |
                           DatabasePlotCell | DatabaseTableCell | DatabasePiecewiseCell | 
                           DatabaseSystemCell ;

export type DatabaseMathCell = {
  type: "math",
  id: number,
  latex: string,
};

export type DatabasePlotCell = {
  type: "plot",
  id: number,
  latexs: string[],
  logX: boolean | undefined, // logX and logY might be undefined for old database entries
  logY: boolean | undefined
};

export type DatabaseDocumentationCell = {
  type: "documentation",
  id: number,
  json: string
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

export abstract class BaseCell {
  readonly type: CellTypes;
  readonly id: number;
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