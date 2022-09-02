import { MathField, type Statement } from "./MathField";

export type Cell = MathCell | PlotCell | TableCell | DocumentationCell;

type DatabaseCell = DatabaseMathCell | DatabaseDocumentationCell |
                    DatabasePlotCell | DatabaseTableCell;

type DatabaseMathCell = {
  type: "math",
  id: number,
  latex: string,
};

type DatabasePlotCell = {
  type: "plot",
  id: number,
  latexs: string[],
};

type DatabaseDocumentationCell = {
  type: "documentation",
  id: number,
  json: string
}

type DatabaseTableCell = {
  type: "table",
  id: number,
  rowLabels: string[],
  nextRowLabelId: number,
  parameterLatexs: string[],
  nextParameterId: number,
  parameterUnitLatexs: string[],
  rhsLatexs: string[][],
  selectedRow: number,
  hideUnselected: boolean,
  rowJsons: string[]
}

export type CellTypes = "math" | "documentation" | "plot" | "table";


export abstract class BaseCell {
  readonly type: CellTypes;
  readonly id: number;
  static nextId = 0;

  abstract serialize(): DatabaseCell;

  constructor(type: CellTypes, index?: number) {
    if (index !== undefined) {
      this.id = index;
    } else {
      this.id = BaseCell.nextId++;
    }    
    this.type = type;
  }
}

export function cellFactory(databaseCell: DatabaseCell): BaseCell {
  switch(databaseCell.type) {
    case "math":
      return new MathCell(databaseCell);
    case "documentation":
      return new DocumentationCell(databaseCell);
    case "plot":
      return new PlotCell(databaseCell);
    case "table":
      return new TableCell(databaseCell);
    default:
      const _exhaustiveCheck: never = databaseCell;
      return _exhaustiveCheck;
  }
}


export class MathCell extends BaseCell {
  mathField: MathField;

  constructor (arg?: DatabaseMathCell | PlotCell) {
    if (arg === undefined) {
      super("math");
      this.mathField = new MathField("");
    } else if (arg instanceof PlotCell) {
      super("math", arg.id);
      this.mathField = new MathField(arg.mathFields[0].latex);
    } else {
      super("math", arg.id);
      this.mathField = new MathField(arg.latex);
    }
  } 

  serialize(): DatabaseMathCell {
    return {
      type: "math",
      id: this.id,
      latex: this.mathField.latex
    };
  }
}


export class PlotCell extends BaseCell {
  mathFields: MathField[];

  constructor (arg: DatabasePlotCell | MathCell) {
    if (arg instanceof MathCell) {
      super("plot", arg.id);
      this.mathFields = [new MathField(arg.mathField.latex, "plot"), new MathField("", "plot")];
    } else {
      super("plot", arg.id);
      this.mathFields = arg.latexs.map((latex) => new MathField(latex, "plot"));
    }
  } 

  serialize(): DatabasePlotCell {
    return {
      type: "plot",
      id: this.id,
      latexs: this.mathFields.map((item) => item.latex)
    };
  }
}


class DocumentationField {
  json: string;
  richTextInstance: HTMLElement | null = null;

  constructor (json="") {
    this.json = json;
  }
}

export class DocumentationCell extends BaseCell {
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

export class TableRowLabelField {
  label: string;
  id: number;
  static nextId = 0;

  constructor (label = "") {
    this.label = label;
    this.id = TableRowLabelField.nextId++;
  }
}

export class TableCell extends BaseCell {
  rowLabels: TableRowLabelField[];
  nextRowLabelId: number;
  parameterFields: MathField[];
  nextParameterId: number;
  parameterUnitFields: MathField[];
  rhsFields: MathField[][];
  selectedRow: number;
  hideUnselected: boolean;
  rowJsons: string[];
  richTextInstance: HTMLElement | null;

  constructor (arg?: DatabaseTableCell) {
    if (arg === undefined) {
      super("table");
      this.rowLabels = [new TableRowLabelField("Option 1"), new TableRowLabelField("Option 2")];
      this.nextRowLabelId = 3;
      this.parameterFields = [new MathField('Var1', 'parameter'), new MathField('Var2', 'parameter')];
      this.nextParameterId = 3;
      this.parameterUnitFields = [new MathField('', 'units'), new MathField('', 'units')];
      this.rhsFields = [[new MathField('', 'expression'), new MathField('', 'expression')],
                        [new MathField('', 'expression'), new MathField('', 'expression')]];
      this.selectedRow = 0;
      this.hideUnselected = false;
      this.rowJsons = [];
      this.richTextInstance = null;
    } else {
      super("table", arg.id);
      this.rowLabels = arg.rowLabels.map((label) => new TableRowLabelField(label));
      this.nextRowLabelId = arg.nextRowLabelId;
      this.parameterFields = arg.parameterLatexs.map((latex) => new MathField(latex, 'parameter'));
      this.nextParameterId = arg.nextParameterId;
      this.parameterUnitFields = arg.parameterUnitLatexs.map((latex) => new MathField(latex, 'units'));
      this.rhsFields = arg.rhsLatexs.map((row) => row.map((latex) => new MathField(latex, 'expression')));
      this.selectedRow = arg.selectedRow;
      this.hideUnselected = arg.hideUnselected;
      this.rowJsons = arg.rowJsons;
      this.richTextInstance = null;
    }
  }

  serialize(): DatabaseTableCell {
    return {
      type: "table",
      id: this.id,
      rowLabels: this.rowLabels.map((row) => row.label),
      nextRowLabelId: this.nextRowLabelId,
      parameterLatexs: this.parameterFields.map((field) => field.latex),
      nextParameterId: this.nextRowLabelId,
      parameterUnitLatexs: this.parameterUnitFields.map((parameter) => parameter.latex),
      rhsLatexs: this.rhsFields.map((row) => row.map((field) => field.latex)),
      selectedRow: this.selectedRow,
      hideUnselected: this.hideUnselected,
      rowJsons: this.rowJsons
    };
  }

  parseUnitField (latex: string, cellIndex: number, column: number) {
    this.parameterUnitFields[column].parseLatex(latex, cellIndex, column);

    const columnType = latex.replaceAll('\\','').trim() === "" ? "expression" : "number"; 

    // the presence or absence of units impacts the parsing of the rhs values so the current 
    // column of rhs values needs to be parsed again
    for ( const row of this.rhsFields) {
      row[column].type = columnType;
      row[column].parseLatex(row[column].latex, cellIndex, column);
    }
  }

  
  parseTableStatements(cellNum: number): Statement[] {
    const rowIndex = this.selectedRow;
    const statements = [];
  
    if (!(this.parameterFields.some(value => value.parsingError) ||
          this.parameterUnitFields.some(value => value.parsingError) ||
          this.rhsFields.reduce((accum, row) => accum || row.some(value => value.parsingError), false))) {
      for (let colIndex = 0; colIndex < this.parameterFields.length; colIndex++) {
        let combinedLatex: string, mathField: MathField;
        if (this.rhsFields[rowIndex][colIndex].latex.replaceAll('\\','').trim() !== "") {
          combinedLatex = this.parameterFields[colIndex].latex + "=" +
                          this.rhsFields[rowIndex][colIndex].latex +
                          this.parameterUnitFields[colIndex].latex;

          mathField = new MathField(combinedLatex);

          mathField.parseLatex(combinedLatex, cellNum, colIndex);

          statements.push(mathField.statement);
        }
      }
    } 
  
    return statements;
  }
  
}