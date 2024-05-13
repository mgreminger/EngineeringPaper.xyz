import { BaseCell } from "./BaseCell";
import type { Cell } from "./Cells";


export default class DeletedCell extends BaseCell {
  deletedCell: Cell
  height: number

  constructor (deletedCell: Cell, height=0) {
    super("deleted");
    this.deletedCell = deletedCell;
    this.height = height;
  }

  serialize() {
    return null
  }
}