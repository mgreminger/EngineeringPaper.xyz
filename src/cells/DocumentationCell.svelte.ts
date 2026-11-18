import { BaseCell, type DatabaseDocumentationCell } from "./BaseCell";
import Quill, { Delta, type Op } from "quill";


export default class DocumentationCell extends BaseCell {
  ops: Op[] = $state();

  constructor (arg?: DatabaseDocumentationCell) {
    super("documentation", arg?.id);
    if (arg === undefined) {
      this.ops = [];
    } else {
      // Old database entries used the whole Delta objects rather the the ops array
      // Need to use the Delta constructor to handle both cases 
      this.ops = new Delta(structuredClone(arg.json)).ops;
    }
  }

  serialize(): DatabaseDocumentationCell {
    return {
      type: "documentation",
      id: this.id,
      json: $state.snapshot(this.ops)
    };
  }
}