import type MathCell from "./cells/MathCell";
import type MathCellElement from "./MathCell.svelte";
import type { SystemDefinition } from "./cells/SystemCell";
import type { Statement } from "./parser/types";
import type { MathField } from "./cells/MathField";

export type ModalInfo = {
  state: "uploadSheet" | "uploadPending" | "success" | "error" | "requestPersistentStorage" |
         "retrieving" | "restoring" | "bugReport" | "supportedUnits" | "opening" | "saving" |
         "termsAndConditions" | "newVersion" | "insertSheet" | "keyboardShortcuts" |
         "updateAvailable" | "sheetSettings" | "generateCode" | "customMatrix";
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

export type CustomBaseUnits = {
  mass: string;
  length: string;
  time: string;
  current: string;
  temperature: string;
  luminous_intensity: string;
  amount_of_substance: string;
  force: string;
  area: string;
  volume: string;
  energy: string;
  power: string;
  pressure: string;
  charge: string;
  capacitance: string;
  electric_potential: string;
  resistance: string;
  inductance: string;
  conductance: string;
  magnetic_flux: string;
  magnetic_flux_density: string;
  angle: string;
  information: string;
}

export type StatementsAndSystems = {
  statements: Statement[];
  systemDefinitions: SystemDefinition[];
  customBaseUnits?: CustomBaseUnits;
}


