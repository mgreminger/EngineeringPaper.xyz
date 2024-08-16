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

export function isMatrixResult(result: Result | FiniteImagResult | MatrixResult | DataTableResult): result is MatrixResult {
  return "matrixResult" in result && result.matrixResult;
}

export function isDataTableResult(result: Result | FiniteImagResult | MatrixResult | DataTableResult | PlotResult[]): result is DataTableResult {
  return "dataTableResult" in result && result.dataTableResult;
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
  unitsMismatch?: boolean; // the rest of the optional properties are added in TS and not present in json from Python
  displayInput?: number[];
  displayInputUnits?: string;
  asciiInputUnits?: string;
  unitsMismatchReason?: string;
  displayOutput?: number[];
  displayOutputUnits?: string;
  asciiOutputUnits?: string;
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

export type Results = {
  error: null | string;
  results: (Result | FiniteImagResult | MatrixResult | DataTableResult | PlotResult[])[];
  systemResults: SystemResult[];
};