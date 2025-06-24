export type Result = {
  value: string;
  symbolicValue?: string; // some old database entries may not have this value
  units: string;
  unitsLatex: string;
  customUnitsDefined?: boolean; // some old database entries my not have this value
  customUnits?: string; // only defined if customUnitsDefined is true
  customUnitsLatex?: string; // only defined if customUnitsDefined is true
  numeric: boolean;
  real: boolean;
  finite: boolean;
  generatedCode?: string;
  isSubResult?: boolean; // some old database entries my not have sub query info
  subQueryName?: string;
};

export type FiniteImagResult = Omit<Result, "real" | "finite" | "numeric"> & {
  real: false;
  finite: true;
  numeric: true,
  realPart: string;
  imagPart: string;
  generatedCode?: string;
  isSubResult?: boolean; // some old database entries my not have sub query info
  subQueryName?: string;
};

export function isFiniteImagResult(result: Result | FiniteImagResult | MatrixResult): result is FiniteImagResult {
  if (isMatrixResult(result)) {
    return false;
  }
  return result.numeric && !result.real && result.finite;
}

export type MatrixResult = {
  matrixResult: true;
  results: ((Result | FiniteImagResult)[])[];
  generatedCode?: string;
  isSubResult?: boolean; // some old database entries my not have sub query info
  subQueryName?: string;
};

export type DataTableResult = {
  dataTableResult: true;
  colData: {number: MatrixResult};
}

export function isMatrixResult(result: Result | FiniteImagResult | MatrixResult | DataTableResult | RenderResult): result is MatrixResult {
  return "matrixResult" in result && result.matrixResult;
}

export function isDataTableResult(result: Result | FiniteImagResult | MatrixResult | DataTableResult | RenderResult | PlotResult[]): result is DataTableResult {
  return "dataTableResult" in result && result.dataTableResult;
}

export function isPlotResult(result: Result | FiniteImagResult | MatrixResult | DataTableResult | RenderResult | PlotResult[]): result is PlotResult[] {
  return result instanceof Array && result[0].plot;
}

export function isRenderResult(result: Result | FiniteImagResult | MatrixResult | DataTableResult | RenderResult | PlotResult[]): result is RenderResult {
  return "renderResult" in result && result.renderResult;
}

export function isMathCellResult(result: null | Result | FiniteImagResult | MatrixResult | DataTableResult | RenderResult | PlotResult[]): result is Result | FiniteImagResult | MatrixResult {
  return result && !(result instanceof Array) && !("dataTableResult" in result) && !("renderResult" in result)
}

export type PlotData = {
  numericOutput: boolean;
  numericInput: boolean;
  limitsUnitsMatch: boolean;
  input: number[];
  output: number[];
  inputReversed: boolean;
  inputUnits: string;
  inputUnitsLatex: string;
  inputCustomUnitsDefined?: boolean; // some old database entries my not have this value
  inputCustomUnits?: string; // only defined if inputCustomUnitsDefined is true
  inputCustomUnitsLatex?: string; // only defined if inputCustomUnitsDefined is true
  inputName: string;
  inputNameLatex?: string; // old versions of saved results may not have this property
  outputUnits: string;
  outputUnitsLatex: string;
  outputCustomUnitsDefined?: boolean; // some old database entries my not have this value
  outputCustomUnits?: string; // only defined if outputCustomUnitsDefined is true
  outputCustomUnitsLatex?: string; // only defined if outputCustomUnitsDefined is true
  outputName: string;
  outputNameLatex?: string; // old versions of saved results may not have this property
  isScatter?: boolean; // old versions of saved results won't have this property
  asLines?: boolean; // optional, only used for scatter plots
  scatterErrorMessage?: string; // optional, only used for scatter plots
  parametricErrorMessage?: string; // optional, only used for parametric plots
};

export type PlotResult = {
  plot: boolean;
  data: PlotData[];
};

export type SystemResult = {
  error: null | string;
  solutions: Record<string, string[]>;
  selectedSolution: number;
};

export type CodeCellError = {
  message: string;
  startLine: number | null;
  endLine: number | null;
  startCol: number | null;
  endCol: number | null;
}

export type CodeCellResult = {
  stdout: string;
  errors: CodeCellError[];
}

export type RenderResult = {
  renderResult: true;
  type: "text" | "html" | "markdown";
  value: string
}

export type Results = {
  error: null | string;
  results: (Result | FiniteImagResult | MatrixResult | DataTableResult | RenderResult | PlotResult[])[];
  systemResults: SystemResult[];
  codeCellResults: Record<string, CodeCellResult>;
};