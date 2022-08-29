import { type Writable, writable, get } from 'svelte/store';

import { type Cell, BaseCell, MathCell, DocumentationCell, TableCell } from './Cells';

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

export function parsePlotCellLatex(latex, cellNum, subCellNum) {
  const currentCells = get(cells);

  const data = {
    type: "plot",
    latex: currentCells[cellNum].data.latexs[subCellNum],
    id: currentCells[cellNum].data.id,
    subId: subCellNum,
    pendingNewLatex: currentCells[cellNum].extra.pendingNewLatexs[subCellNum],
    parsingError: currentCells[cellNum].extra.parsingErrors[subCellNum],
    parsingErrorMessage: currentCells[cellNum].extra.parsingErrorMessages[subCellNum],
    statement: currentCells[cellNum].extra.statements[subCellNum],
    newLatex: currentCells[cellNum].extra.newLatexs[subCellNum]
  };

  parseLatex(latex, data);

  currentCells[cellNum].data.latexs[subCellNum] = data.latex;
  currentCells[cellNum].extra.pendingNewLatexs[subCellNum] = data.pendingNewLatex;
  currentCells[cellNum].extra.parsingErrors[subCellNum] = data.parsingError;
  currentCells[cellNum].extra.parsingErrorMessages[subCellNum] = data.parsingErrorMessage;
  currentCells[cellNum].extra.statements[subCellNum] = data.statement;
  currentCells[cellNum].extra.newLatexs[subCellNum] = data.newLatex;

  cells.set(currentCells);
  mathCellChanged.set(true);
}

function parseBlank(latex, data) {
  data.latex = latex;
  data.pendingNewLatex = false;
  data.parsingError = false;
  data.parsingErrorMessage = "";
  data.statement = {};
  data.newLatex = [];
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


export function handleFocusOut(cellNum) {
  const currentCells = get(cells);

  if (currentCells[cellNum]) {
    if (currentCells[cellNum].type === "math" && currentCells[cellNum].mathField.pendingNewLatex) {
      currentCells[cellNum].mathField.element.setLatex(
        currentCells[cellNum].mathField.newLatex
      );
      currentCells[cellNum].mathField.pendingNewLatex = false;
      cells.set(currentCells);
    } else if (currentCells[cellNum].type === "plot" && 
               currentCells[cellNum].extra.pendingNewLatexs.some(item => item)) {
      currentCells[cellNum].extra.pendingNewLatexs.forEach((pendingNewLatex, index) => {
        if(pendingNewLatex) {
          currentCells[cellNum].extra.mathFieldElements[index].setLatex(
            currentCells[cellNum].extra.newLatexs[index]
          );
          currentCells[cellNum].extra.pendingNewLatexs[index] = false;
        }
      });
      cells.set(currentCells);
    } else if (currentCells[cellNum].type === "table" && 
               currentCells[cellNum].extra.parameterPendingNewLatexs.some(item => item)) {
      currentCells[cellNum].extra.parameterPendingNewLatexs.forEach((parameterPendingNewLatex, index) => {
        if(parameterPendingNewLatex) {
          currentCells[cellNum].extra.parameterMathFieldElements[index].setLatex(
          currentCells[cellNum].extra.parameterNewLatexs[index]
          );
          currentCells[cellNum].extra.parameterPendingNewLatexs[index] = false;
        }
      });
      cells.set(currentCells);
    } else if (currentCells[cellNum].type === "table" &&
      currentCells[cellNum].extra.parameterUnitPendingNewLatexs.some(item => item)) {
      currentCells[cellNum].extra.parameterUnitPendingNewLatexs.forEach((parameterUnitPendingNewLatex, index) => {
        if (parameterUnitPendingNewLatex) {
          currentCells[cellNum].extra.parameterUnitMathFieldElements[index].setLatex(
            currentCells[cellNum].extra.parameterUnitNewLatexs[index]
          );
          currentCells[cellNum].extra.parameterUnitPendingNewLatexs[index] = false;
        }
      });
      cells.set(currentCells);
    } else if (currentCells[cellNum].type === "table" &&
      currentCells[cellNum].extra.rhsPendingNewLatexs.reduce((accum, row) => accum || row.some(item=>item), false)) {
      const numColumns = currentCells[cellNum].data.parameterLatexs.length;
      for (const [rowIndex, row] of currentCells[cellNum].extra.rhsPendingNewLatexs.entries()) {
        row.forEach((rhsPendingNewLatex, colIndex) => {
          if (rhsPendingNewLatex) {
            currentCells[cellNum].extra.rhsMathFieldElements[`${rowIndex},${colIndex}`].setLatex(
              currentCells[cellNum].extra.rhsNewLatexs[rowIndex][colIndex]
            );
            currentCells[cellNum].extra.rhsPendingNewLatexs[rowIndex][colIndex] = false;
          }
        });
      }

      cells.set(currentCells);
    }
  }
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