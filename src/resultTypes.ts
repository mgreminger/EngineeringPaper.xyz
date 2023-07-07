export type Result = {
  value: string;
  symbolicValue?: string; // some old database entries may not have this value
  units: string;
  unitsLatex: string;
  numeric: boolean;
  real: boolean;
  finite: boolean;
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

export type MatrixResult = {
  matrixResult: true;
  results: ((Result | FiniteImagResult)[])[];
};

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
  inputNameLatex?: string; // old versions of saved results may not have this property
  outputUnits: string;
  outputUnitsLatex: string;
  outputName: string;
  outputNameLatex?: string; // old versions of saved results may not have this property
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
  results: (Result | FiniteImagResult | PlotResult[])[];
  systemResults: SystemResult[];
};