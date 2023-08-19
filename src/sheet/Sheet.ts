import type { DatabaseCell } from "../cells/BaseCell"
import type { Result, FiniteImagResult, PlotResult, 
              MatrixResult, SystemResult } from "../resultTypes";

export type Sheet = {
  config?: Config; // early sheets did not have a config property
  cells: DatabaseCell[];
  title: string;
  results: (Result | FiniteImagResult | MatrixResult | PlotResult[])[];
  system_results: (SystemResult)[];
  nextId: number;
  sheetId: string;
  insertedSheets?: InsertedSheet[]; // early sheets did not have an insertedSheets property  
};

export type InsertedSheet = {
  title: string;
  url: string;
  insertion: Date;
};

export type Config = {
  mathCellConfig: MathCellConfig;
};

type Notation = "auto" | "fixed" | "exponential" | "engineering";

export type MathCellConfig = {
  symbolicOutput: boolean;
  formatOptions: FormatOptions;
};

type FormatOptions = {
  notation: Notation;
  precision: number;
  lowerExp: number;
  upperExp: number;
};

export function getDefaultConfig(): Config {
  return {
    mathCellConfig: getDefaultMathCellConfig(),
  };
}

function getDefaultMathCellConfig(): MathCellConfig {
  return {
    symbolicOutput: false,
    formatOptions: {
      notation: "auto",
      precision: 15,
      lowerExp: -3,
      upperExp: 5,
    }
  };
}

export const defaultMathConfig = getDefaultMathCellConfig();

export const mathConfigLimits = {
  precisionUpper: 64,
  lowerExpLower: -12,
  lowerExpUpper: -2,
  upperExpLower: 2,
  upperExpUpper: 12
};

export function isDefaultMathConfig(config: MathCellConfig): boolean {
  return (
    config.symbolicOutput === defaultMathConfig.symbolicOutput &&
    config.formatOptions.notation === defaultMathConfig.formatOptions.notation &&
    config.formatOptions.precision === defaultMathConfig.formatOptions.precision &&
    config.formatOptions.lowerExp === defaultMathConfig.formatOptions.lowerExp &&
    config.formatOptions.upperExp === defaultMathConfig.formatOptions.upperExp
  )
}

export function isDefaultConfig(config: Config): boolean {
  return isDefaultMathConfig(config.mathCellConfig);
}

export function copyMathConfig(input: MathCellConfig): MathCellConfig {
  if (input === null) {
    return null;
  }

  return {
    symbolicOutput: input.symbolicOutput,
    formatOptions: {...input.formatOptions}
  };
}

export function getSafeMathConfig(config: MathCellConfig): MathCellConfig {
  const safeConfig = copyMathConfig(config);

  // clamp precision
  if (config.formatOptions.precision === null) {
    safeConfig.formatOptions.precision = defaultMathConfig.formatOptions.precision;
  } else if(config.formatOptions.precision > mathConfigLimits.precisionUpper) {
    safeConfig.formatOptions.precision = mathConfigLimits.precisionUpper;
  } else if(config.formatOptions.precision < (config.formatOptions.notation === "fixed" ? 0 : 1)) {
    safeConfig.formatOptions.precision = config.formatOptions.notation === "fixed" ? 0 : 1;
  }

  // clamp lowerExp
  if (config.formatOptions.lowerExp === null) {
    safeConfig.formatOptions.lowerExp = defaultMathConfig.formatOptions.lowerExp;
  } else if(config.formatOptions.lowerExp > mathConfigLimits.lowerExpUpper) {
    safeConfig.formatOptions.lowerExp = mathConfigLimits.lowerExpUpper;
  } else if(config.formatOptions.lowerExp < mathConfigLimits.lowerExpLower) {
    safeConfig.formatOptions.lowerExp = mathConfigLimits.lowerExpLower;
  }

  // clamp upperExp
  if (config.formatOptions.upperExp === null) {
    safeConfig.formatOptions.upperExp = defaultMathConfig.formatOptions.upperExp;
  } else if(config.formatOptions.upperExp > mathConfigLimits.upperExpUpper) {
    safeConfig.formatOptions.upperExp = mathConfigLimits.upperExpUpper;
  } else if(config.formatOptions.upperExp < mathConfigLimits.upperExpLower) {
    safeConfig.formatOptions.upperExp = mathConfigLimits.upperExpLower;
  }

  return safeConfig;
}