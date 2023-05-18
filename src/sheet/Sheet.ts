import type { DatabaseCell } from "../cells/BaseCell"
import type { Result, FiniteImagResult, PlotResult, SystemResult } from "../resultTypes";

export type Sheet = {
  config?: Config; // early sheets did not have a config property
  cells: DatabaseCell[];
  title: string;
  results: (Result | FiniteImagResult | PlotResult[])[];
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
    mathCellConfig: {
      symbolicOutput: false,
      formatOptions: {
        notation: "auto",
        precision: 15,
        lowerExp: -3,
        upperExp: 5,
      }
    }
  }
}