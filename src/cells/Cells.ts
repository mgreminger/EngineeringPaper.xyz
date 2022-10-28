import type { BaseCell, DatabaseCell } from "./BaseCell";
import MathCell from "./MathCell";
import PlotCell from "./PlotCell";
import TableCell from "./TableCell";
import DocumentationCell from "./DocumentationCell";
import PiecewiseCell from "./PiecewiseCell";
import SystemCell from "./SystemCell";
import type DeletedCell from "./DeletedCell";
import type InsertCell from "./InsertCell";

export type Cell = MathCell | PlotCell | TableCell | DocumentationCell |
                   PiecewiseCell | SystemCell | DeletedCell | InsertCell;

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
    case "piecewise":
      return new PiecewiseCell(databaseCell);
    case "system":
      return new SystemCell(databaseCell);
    default:
      const _exhaustiveCheck: never = databaseCell;
      return _exhaustiveCheck;
  }
}
