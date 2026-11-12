import { BaseCell, type DatabaseDocumentationCell } from "./BaseCell";
import Quill, { Delta } from "quill";


export default class DocumentationCell extends BaseCell {
  delta: Delta = $state();

  constructor (arg?: DatabaseDocumentationCell) {
    super("documentation", arg?.id);
    if (arg === undefined) {
      this.delta = new Delta();
    } else {
      this.delta = new Delta(structuredClone(arg.json));
    }
  }

  serialize(): DatabaseDocumentationCell {
    return {
      type: "documentation",
      id: this.id,
      json: this.delta
    };
  }
}