import { BaseCell, type DatabaseDocumentationCell } from "./BaseCell";


class DocumentationField {
  json: any = $state();
  richTextInstance: HTMLElement | null = null;

  constructor (json?: any) {
    if (json === undefined) {
      json = {ops: [{insert: "\n"},]};
    }
    this.json = json;
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
      json: this.documentationField.json
    };
  }
}