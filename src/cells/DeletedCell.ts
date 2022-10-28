import { BaseCell } from "./BaseCell";
import type { Cell } from "./Cells";


export default class DeletedCell extends BaseCell {
  deletedCell: Cell

  constructor (deletedCell: Cell) {
    super("deleted");
    this.deletedCell = deletedCell;
  }

  serialize() {
    return null
  }
}