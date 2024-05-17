import type MathCell from "./cells/MathCell";
import type MathCellElement from "./MathCell.svelte";
import type { SystemDefinition } from "./cells/SystemCell";
import type { FluidDefinition } from "./cells/FluidCell";
import type { Statement } from "./parser/types";
import type { MathField } from "./cells/MathField";
import type { CustomBaseUnits } from "./sheet/Sheet";

export type ModalInfo = {
  state: "uploadSheet" | "uploadPending" | "success" | "error" | "requestPersistentStorage" |
         "retrieving" | "restoring" | "bugReport" | "tryEpxyz" | "supportedUnits" | 
         "opening" | "saving" | "termsAndConditions" | "newVersion" | "insertSheet" |
         "keyboardShortcuts" | "updateAvailable" | "sheetSettings" | "generateCode" |
         "customMatrix" | "generatingDocument" | "downloadDocument";
  modalOpen: boolean;
  heading: string;
  url?: string;
  error?: string;
  insertionLocation?: number;
  mathCell?: MathCell;
  mathCellElement?: MathCellElement;
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
  statements: Statement[];
  systemDefinitions: SystemDefinition[];
  fluidDefinitions: FluidDefinition[];
  customBaseUnits?: CustomBaseUnits;
  simplifySymbolicExpressions: boolean;
  convertFloatsToFractions: boolean;
}


