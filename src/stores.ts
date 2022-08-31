import { type Writable, writable, get } from 'svelte/store';

import { type Cell, BaseCell, MathCell, DocumentationCell, TableCell } from './Cells';
import type {MathField} from './MathField';

const defaultTitle = 'New Sheet';

export const cells: Writable<Cell[]> = writable([]);
export const title = writable(defaultTitle);
export const results = writable([]);
export const sheetId = writable('');


export const history = writable([]);
export const insertedSheets = writable([]);


export const prefersReducedMotion = writable(true);
export const activeCell: Writable<number> = writable(0);

export const debug = writable(false);

export const mathCellChanged = writable(false);


export function addCell(type: "math" | "documentation" | "table", index?: number) {
  const currentCells:Cell[] = get(cells);

  if (index === undefined){
    index = currentCells.length;
  }

  let newCell: TableCell | MathCell | DocumentationCell;

  if (type === "math") {
    newCell = new MathCell;
  } else if (type === "documentation") {
    newCell = new DocumentationCell;
  } else if (type === "table") {
    newCell = new TableCell;
  }

  currentCells.splice(index, 0, newCell);

  cells.set(currentCells);

  results.set([]);

  if (type !== "table") {
    activeCell.set(index);
  } else {
    activeCell.set(-1);
  }

  if (type === "documentation" || type === "table") {
    mathCellChanged.set(true); // results will be cleared so force refresh
  }

}

export function handleFocusIn(index: number) {
  const currentActiveCell = get(activeCell);

  if (currentActiveCell !== index)
    activeCell.set(index);
}

export function getSheetJson() {

  const sheet = {
    cells: get(cells).map(x => x.serialize()),
    title: get(title),
    results: get(results),
    nextId: BaseCell.nextId,
    sheetId: get(sheetId),
    insertedSheets: get(insertedSheets)
  };

  return ' ' + JSON.stringify(sheet);
}

export function resetSheet() {
  cells.set([]);
  title.set(defaultTitle);
  results.set([]);
  BaseCell.nextId = 0;
  history.set([]);
  insertedSheets.set([]);
  activeCell.set(0);
  sheetId.set(JSON.stringify(window.crypto.getRandomValues(new Uint32Array(10))));
}

export function parseTableCellParameterLatex(latex, cellNum, column) {
  const currentCells = get(cells);

  const data = {
    type: "parameter",
    latex: currentCells[cellNum].data.parameterLatexs[column],
    id: currentCells[cellNum].data.id,
    subId: column,
    pendingNewLatex: currentCells[cellNum].extra.parameterPendingNewLatexs[column],
    parsingError: currentCells[cellNum].extra.parameterParsingErrors[column],
    parsingErrorMessage: currentCells[cellNum].extra.parameterParsingErrorMessages[column],
    statement: currentCells[cellNum].extra.parameterStatements[column],
    newLatex: currentCells[cellNum].extra.parameterNewLatexs[column]
  };

  parseLatex(latex, data);

  currentCells[cellNum].data.parameterLatexs[column] = data.latex;
  currentCells[cellNum].extra.parameterPendingNewLatexs[column] = data.pendingNewLatex;
  currentCells[cellNum].extra.parameterParsingErrors[column] = data.parsingError;
  currentCells[cellNum].extra.parameterParsingErrorMessages[column] = data.parsingErrorMessage;
  currentCells[cellNum].extra.parameterStatements[column] = data.statement;
  currentCells[cellNum].extra.parameterNewLatexs[column] = data.newLatex;

  cells.set(currentCells);
  mathCellChanged.set(true);
}

export function parseTableCellParameterUnitLatex(latex, cellNum, column) {
  const currentCells = get(cells);

  const data = {
    type: "units",
    latex: currentCells[cellNum].data.parameterUnitLatexs[column],
    id: currentCells[cellNum].data.id,
    subId: column,
    pendingNewLatex: currentCells[cellNum].extra.parameterUnitPendingNewLatexs[column],
    parsingError: currentCells[cellNum].extra.parameterUnitParsingErrors[column],
    parsingErrorMessage: currentCells[cellNum].extra.parameterUnitParsingErrorMessages[column],
    statement: currentCells[cellNum].extra.parameterUnitStatements[column],
    newLatex: currentCells[cellNum].extra.parameterUnitNewLatexs[column]
  };

  if (latex.replaceAll('\\','').trim() === "") {
    parseBlank(latex, data);
  } else {
    parseLatex(latex, data);
  }

  currentCells[cellNum].data.parameterUnitLatexs[column] = data.latex;
  currentCells[cellNum].extra.parameterUnitPendingNewLatexs[column] = data.pendingNewLatex;
  currentCells[cellNum].extra.parameterUnitParsingErrors[column] = data.parsingError;
  currentCells[cellNum].extra.parameterUnitParsingErrorMessages[column] = data.parsingErrorMessage;
  currentCells[cellNum].extra.parameterUnitStatements[column] = data.statement;
  currentCells[cellNum].extra.parameterUnitNewLatexs[column] = data.newLatex;

  // after parsing a columns units, it's important to reparse all of the rhs values for this column
  const numColumns = currentCells[cellNum].data.parameterLatexs.length;
  for (const [row, _] of currentCells[cellNum].data.rowLabels.entries()) {
    if (currentCells[cellNum].extra.rhsMathFieldElements[`${row},${column}`]?.getMathField()) {
      parseTableCellRhsLatex(currentCells[cellNum].extra.rhsMathFieldElements[`${row},${column}`].getMathField().latex(), cellNum, row, column);
    }
  }

  cells.set(currentCells);
  mathCellChanged.set(true);
}

export function parseTableCellRhsLatex(latex, cellNum, row, column) {
  const currentCells = get(cells);

  const data = {
    type: currentCells[cellNum].data.parameterUnitLatexs[column].replaceAll('\\','').trim() === "" ? "expression" : "number",
    latex: currentCells[cellNum].data.rhsLatexs[row][column],
    id: currentCells[cellNum].data.id,
    subId: column,
    pendingNewLatex: currentCells[cellNum].extra.rhsPendingNewLatexs[row][column],
    parsingError: currentCells[cellNum].extra.rhsParsingErrors[row][column],
    parsingErrorMessage: currentCells[cellNum].extra.rhsParsingErrorMessages[row][column],
    statement: currentCells[cellNum].extra.rhsStatements[row][column],
    newLatex: currentCells[cellNum].extra.rhsNewLatexs[row][column]
  };

  if (latex.replaceAll('\\','').trim() === "") {
    parseBlank(latex, data);
  } else {
    parseLatex(latex, data);
  }

  currentCells[cellNum].data.rhsLatexs[row][column] = data.latex;
  currentCells[cellNum].extra.rhsPendingNewLatexs[row][column] = data.pendingNewLatex;
  currentCells[cellNum].extra.rhsParsingErrors[row][column] = data.parsingError;
  currentCells[cellNum].extra.rhsParsingErrorMessages[row][column] = data.parsingErrorMessage;
  currentCells[cellNum].extra.rhsStatements[row][column] = data.statement;
  currentCells[cellNum].extra.rhsNewLatexs[row][column] = data.newLatex;

  cells.set(currentCells);
  mathCellChanged.set(true);
}

export function parseMathCellLatex(latex, cellNum) {
  const currentCells = get(cells);

  const data = {
    type: "math",
    latex: currentCells[cellNum].data.latex,
    id: currentCells[cellNum].data.id,
    subId: 0,
    pendingNewLatex: currentCells[cellNum].extra.pendingNewLatex,
    parsingError: currentCells[cellNum].extra.parsingError,
    parsingErrorMessage: currentCells[cellNum].extra.parsingErrorMessage,
    statement: currentCells[cellNum].extra.statement,
    newLatex: currentCells[cellNum].extra.newLatex
  };

  if (latex.replaceAll('\\','').trim() === "") {
    // give a better error message for a blank cell
    parseBlank(latex, data);

  } else {
    parseLatex(latex, data);
  }

  currentCells[cellNum].data.latex = data.latex;
  currentCells[cellNum].extra.pendingNewLatex = data.pendingNewLatex;
  currentCells[cellNum].extra.parsingError = data.parsingError;
  currentCells[cellNum].extra.parsingErrorMessage = data.parsingErrorMessage;
  currentCells[cellNum].extra.statement = data.statement;
  currentCells[cellNum].extra.newLatex = data.newLatex;

  cells.set(currentCells);
  mathCellChanged.set(true);
}

function parseLatex(latex, data) {

}



export function handleVirtualKeyboard(event, mathFieldElement) {
  if (event.detail.write) {
    let command = event.detail.command;
    if (command.includes("[selection]")) {
      let selection = mathFieldElement.getMathField().getSelection();
      selection = selection === null ? "" : selection;
      command = command.replace("[selection]", selection);
    }
    mathFieldElement.getMathField().write(command);
  } else {
    mathFieldElement.getMathField().cmd(event.detail.command);
  }
  mathFieldElement.getMathField().focus();
  if ( event.detail.positionLeft ) {
    for (let i=0; i < event.detail.positionLeft; i++) {
      mathFieldElement.getMathField().keystroke("Left");
    }
  }
}


export function handleFocusOut(mathField: MathField) {
  const currentCells = get(cells);

  mathField.setPendingLatex();

  cells.set(currentCells);
}

export function parseTableStatements(cellNum) {
  const currentCells = get(cells);
  const cell = currentCells[cellNum];
  const rowIndex = cell.data.selectedRow;
  const statements = [];

  if (!(cell.extra.parameterParsingErrors.some(value => value) ||
        cell.extra.parameterUnitParsingErrors.some(value => value) ||
        cell.extra.rhsParsingErrors.reduce((accum, row) => accum || row.some(value => value), false))) {
    for (let colIndex = 0; colIndex < cell.data.parameterLatexs.length; colIndex++) {
      let combinedLatex, data;
      if (cell.data.rhsLatexs[rowIndex][colIndex].replaceAll('\\','').trim() !== "") {
        combinedLatex = cell.data.parameterLatexs[colIndex] + "=" +
                        cell.data.rhsLatexs[rowIndex][colIndex] +
                        cell.data.parameterUnitLatexs[colIndex];
        data = {
          type: "math",
          latex: combinedLatex,
          id: cell.data.id,
          subId: colIndex,
          pendingNewLatex: false,
          parsingError: false,
          parsingErrorMessage: "",
          statement: {},
          newLatex: []
        }
        parseLatex(combinedLatex, data);
        statements.push(data.statement);
      }
    }
  } 

  return statements;
}