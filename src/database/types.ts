export interface HistoryItem {
  url: string;
  hash: string;
  creation: string;
}

export type History = HistoryItem[];

export interface SheetPostBody {
  title: string;
  document: string;
  history: History;
}