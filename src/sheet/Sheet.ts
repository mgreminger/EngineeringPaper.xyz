import type { DatabaseCell } from "../cells/BaseCell"
import type { Result, FiniteImagResult, PlotResult, SystemResult } from "../resultTypes";

export type Sheet = {
  cells: DatabaseCell[];
  title: string;
  results: (Result | FiniteImagResult | PlotResult[])[];
  system_results: (SystemResult)[];
  nextId: number;
  sheetId: string;
  insertedSheets: InsertedSheet[];  
};

export type InsertedSheet = {
  title: string;
  url: string;
  insertion: Date;
};