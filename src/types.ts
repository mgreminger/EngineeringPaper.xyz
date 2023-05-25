import type { SystemDefinition } from "./cells/SystemCell";
import type { Statement } from "./parser/types";

export type ModalInfo = {
  state: "uploadSheet" | "uploadPending" | "success" | "error" | "requestPersistentStorage" |
         "retrieving" | "restoring" | "bugReport" | "supportedUnits" | "opening" | "saving" |
         "termsAndConditions" | "newVersion" | "insertSheet" | "keyboardShortcuts" |
         "updateAvailable" | "sheetSettings",
  modalOpen: boolean,
  heading: string,
  url?: string,
  error?: string,
  insertionLocation?: number
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
  title: string
}

export type RecentSheets = Map<string, RecentSheetUrl | RecentSheetFile>;

export type StatementsAndSystems = {
  statements: Statement[],
  systemDefinitions: SystemDefinition[]
}


