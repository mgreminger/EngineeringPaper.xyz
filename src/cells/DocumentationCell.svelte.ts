import { BaseCell, type DatabaseDocumentationCell } from "./BaseCell";
import Quill, { Delta } from "quill";

class DocumentationField {
  delta: Delta = $state();
  richTextInstance: Quill | null = null;

  constructor (delta?: Delta) {
    if (delta === undefined) {
      delta = new Delta();
    }
    this.delta = delta;
  }
}


export default class DocumentationCell extends BaseCell {
  documentationField: DocumentationField = $state();

  constructor (arg?: DatabaseDocumentationCell) {
    super("documentation", arg?.id);
    if (arg === undefined) {
      this.documentationField = new DocumentationField();
    } else {
      this.documentationField = new DocumentationField(arg.json);
    }
  }

  serialize(): DatabaseDocumentationCell {
    return {
      type: "documentation",
      id: this.id,
      json: this.documentationField.delta
    };
  }
}