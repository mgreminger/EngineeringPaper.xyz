import type MathCell from "./cells/MathCell.svelte";
import type { SystemDefinition } from "./cells/SystemCell.svelte";
import type { FluidFunction } from "./cells/FluidCell.svelte";
import type { Statement, SubQueryStatement } from "./parser/types";
import type { MathField } from "./cells/MathField.svelte";
import type { CustomBaseUnits, MathCellConfig } from "./sheet/Sheet";
import type { InterpolationFunction } from "./cells/DataTableCell.svelte";

export type ModalInfo = {
  state: "uploadSheet" | "uploadPending" | "success" | "error" | "requestPersistentStorage" |
         "retrieving" | "restoring" | "bugReport" | "tryEpxyz" | "supportedUnits" | 
         "opening" | "saving" | "termsAndConditions" | "newVersion" | "insertSheet" |
         "keyboardShortcuts" | "updateAvailable" | "sheetSettings" | "generateCode" |
         "customMatrix" | "generatingDocument" | "downloadDocument" | "importingSpreadsheet";
  modalOpen: boolean;
  heading: string;
  url?: string;
  error?: string;
  insertionLocation?: number;
  mathCell?: MathCell;
  setCellNumberConfig?: (input: MathCellConfig) => void;
  codeGenerationIndex?: number;
  targetMathField?: MathField;
}

export type RecentSheetUrl = {
  url: string;
  accessTime: Date;
  title: string;
};

export type RecentSheetFile = {
  fileName: string;
  fileHandle: FileSystemFileHandle;
  accessTime: Date;
  title: string;
}

export type RecentSheets = Map<string, RecentSheetUrl | RecentSheetFile>;

export type StatementsAndSystems = {
  statements: (Statement | SubQueryStatement)[];
  systemDefinitions: SystemDefinition[];
  fluidFunctions: FluidFunction[];
  interpolationFunctions: InterpolationFunction[];
  customBaseUnits?: CustomBaseUnits;
  simplifySymbolicExpressions: boolean;
  convertFloatsToFractions: boolean;
}


