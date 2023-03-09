export type Result = {
  value: string;
  units: string;
  unitsLatex: string;
  numeric: boolean;
  real: boolean;
  finite: boolean;
  userUnitsValueDefined?: boolean; // optional properties are added in TS and not present in json from Python
  userUnitsValue?: number | string;
  unitsMismatch?: boolean;
};

export type FiniteImagResult = Omit<Result, "real" | "finite" | "numeric"> & {
  real: false;
  finite: true;
  numeric: true,
  realPart: string;
  imagPart: string;
};

export function isFiniteImagResult(result: Result | FiniteImagResult): result is FiniteImagResult {
  return result.numeric && !result.real && result.finite;
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
  inputName: string;
  outputUnits: string;
  outputUnitsLatex: string;
  outputName: string;
  unitsMismatch?: boolean; // optional properties are added in TS and not present in json from Python
  displayInput?: number[];
  displayInputUnits?: string;
  unitsMismatchReason?: string;
  displayOutput?: number[];
  displayOutputUnits?: string;
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
  results: (Result | FiniteImagResult | PlotResult[])[];
  systemResults: SystemResult[];
};