import type { BaseCell, DatabaseCell } from "./BaseCell";
import type { Config } from "../sheet/Sheet";
import MathCell from "./MathCell";
import PlotCell from "./PlotCell";
import TableCell from "./TableCell";
import DataTableCell from "./DataTableCell";
import DocumentationCell from "./DocumentationCell";
import PiecewiseCell from "./PiecewiseCell";
import SystemCell from "./SystemCell";
import FluidCell from "./FluidCell";
import type DeletedCell from "./DeletedCell";
import type InsertCell from "./InsertCell";

export type Cell = MathCell | PlotCell | TableCell | DocumentationCell |
                   PiecewiseCell | SystemCell | DeletedCell | InsertCell | DataTableCell;

export async function cellFactory(databaseCell: DatabaseCell, config: Config): 
    Promise<MathCell | DocumentationCell | PlotCell | TableCell | 
            PiecewiseCell | SystemCell | FluidCell | DataTableCell> {
  switch(databaseCell.type) {
    case "math":
      return new MathCell(databaseCell);
    case "documentation":
      return new DocumentationCell(databaseCell);
    case "plot":
      await PlotCell.init();
      return new PlotCell(databaseCell);
    case "table":
      return new TableCell(databaseCell);
    case "dataTable":
      await DataTableCell.init();
      return new DataTableCell(databaseCell);
    case "piecewise":
      return new PiecewiseCell(databaseCell);
    case "system":
      return new SystemCell(databaseCell);
    case "fluid":
      await FluidCell.init();
      return new FluidCell(config.fluidConfig, databaseCell);
    default:
      const _exhaustiveCheck: never = databaseCell;
      return _exhaustiveCheck;
  }
}
