import type { BaseCell, DatabaseCell } from "./BaseCell";
import MathCell from "./MathCell";
import PlotCell from "./PlotCell";
import TableCell from "./TableCell";
import DocumentationCell from "./DocumentationCell";

export type Cell = MathCell | PlotCell | TableCell | DocumentationCell;

export function cellFactory(databaseCell: DatabaseCell): BaseCell {
  switch(databaseCell.type) {
    case "math":
      return new MathCell(databaseCell);
    case "documentation":
      return new DocumentationCell(databaseCell);
    case "plot":
      return new PlotCell(databaseCell);
    case "table":
      return new TableCell(databaseCell);
    default:
      const _exhaustiveCheck: never = databaseCell;
      return _exhaustiveCheck;
  }
}
