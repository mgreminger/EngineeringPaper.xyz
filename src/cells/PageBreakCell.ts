import { BaseCell, type DatabasePageBreakCell } from "./BaseCell";


export default class PageBreakCell extends BaseCell {

  constructor (arg?: DatabasePageBreakCell) {
    super("import", arg?.id);
  }

  serialize(): DatabasePageBreakCell {
    return {
      type: "pageBreak",
      id: this.id
    };
  }
}