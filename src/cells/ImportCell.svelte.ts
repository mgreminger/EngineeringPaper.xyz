import { BaseCell, type DatabaseImportCell } from "./BaseCell";


export default class ImportCell extends BaseCell {
  static nextId = 0;

  imports: string[] = $state();

  constructor (arg?: DatabaseImportCell) {
    super("import", arg?.id);

    if (arg === undefined) {
      this.imports = [];
    } else {
      this.imports = [...arg.imports];
    }
  }

  serialize(): DatabaseImportCell {
    return {
      type: "import",
      id: this.id,
      imports: [...this.imports]
    };
  }
}