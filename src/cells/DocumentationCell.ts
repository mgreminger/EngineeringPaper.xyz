import { BaseCell, type DatabaseDocumentationCell } from "./BaseCell";


class DocumentationField {
  json: string;
  richTextInstance: HTMLElement | null = null;

  constructor (json="") {
    this.json = json;
  }
}


export default class DocumentationCell extends BaseCell {
  documentationField: DocumentationField;

  constructor (arg?: DatabaseDocumentationCell) {
    if (arg === undefined) {
      super("documentation");
      this.documentationField = new DocumentationField("");
    } else {
      super("documentation", arg.id);
      this.documentationField = new DocumentationField(arg.json);
    }
  }

  serialize(): DatabaseDocumentationCell {
    return {
      type: "documentation",
      id: this.id,
      json: this.documentationField.json
    };
  }
}