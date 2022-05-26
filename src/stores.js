import { writable, get } from 'svelte/store';

import antlr4 from "antlr4";
import LatexLexer from "./parser/LatexLexer.js";
import LatexParser from "./parser/LatexParser.js";
import { LatexToSympy, LatexErrorListener } from "./parser/LatexToSympy.js";

const defaultTitle = 'New Sheet';

export const cells = writable([]);
export const title = writable(defaultTitle);
export const tableStatements = writable([]);
export const results = writable([]);
export const nextId = writable(0);
export const sheetId = writable('');


export const history = writable([]);

export const prefersReducedMotion = writable(true);
export const activeCell = writable(0);

export const debug = writable(false);

export const mathCellChanged = writable(false);

export function addMathCell(index) {
  addCell(index, "math");
}

export function addDocumentationCell(index) {
  addCell(index, "documentation");
  mathCellChanged.set(true); // results will be cleared so force refresh
}

export function addTableCell(index) {
  addCell(index, "table");
  mathCellChanged.set(true); // results will be cleared so force refresh
}

function addCell(index, type) {
  const currentCells = get(cells);

  if (index == null){
    index = currentCells.length;
  }

  let newCell;

  if (type === "math") {
    newCell = {data: {type: "math", id: get(nextId), latex: ""},
               extra: {parsingError: true, parsingErrorMessage: "Invalid Syntax", statement: null, mathFieldInstance: null}};
  } else if (type === "documentation") {
    newCell = {data: {type: "documentation", id: get(nextId), json: ""},
               extra: {richTextInstance: null}};
  } else if (type === "table") {
    newCell = {data: {type: "table", id: get(nextId), rowLabels: ["Option 1", "Option 2"],
                      parameterUnitLatexs: ['',''],
                      parameterLatexs: ['', ''], rhsLatexs: [ ['', ''], ['', '']], selectedRow: 0},
               extra: {parameterParsingErrors: [true, true], parameterParsingErrorMessages: ["Invalid Syntax", "Invalid Syntax"], 
                       parameterStatements: [null, null], parameterMathFieldInstances: [null, null],
                       parameterPendingNewLatexs: [false, false], parameterNewLatexs: ["", ""],
                       parameterUnitParsingErrors: [false, false], parameterUnitParsingErrorMessages: ["", ""], 
                       parameterUnitStatements: [null, null], parameterUnitMathFieldInstances: [null, null],
                       parameterUnitPendingNewLatexs: [false, false], parameterUnitNewLatexs: ["", ""],
                       rhsParsingErrors: [[false, false], [false, false]], rhsParsingErrorMessages: [["", ""], ["", ""]], 
                       rhsStatements: [[null, null], [null, null]], rhsMathFieldInstances: [null, null, null, null],
                       rhsPendingNewLatexs: [[false, false], [false, false]],
                       rhsNewLatexs: [["", ""], ["", ""]]
                      }
              };
  } else {
    throw new Error(`Unrecognized cell type: ${type}`);
  }

  nextId.update(id => id + 1);

  currentCells.splice(index, 0, newCell);

  cells.set(currentCells);

  results.set([]);
  activeCell.set(index);
}


export function handleFocusIn(index) {
  activeCell.set(index);
}

export function getSheetJson() {

  const sheet = {
    cells: get(cells).map(x => x.data),
    title: get(title),
    results: get(results),
    nextId: get(nextId),
    sheetId: get(sheetId)
  };

  return ' ' + JSON.stringify(sheet);
}

export function resetSheet() {
  cells.set([]);
  title.set(defaultTitle);
  results.set([]);
  nextId.set(0);
  history.set([]);
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

  parseTableStatements(cellNum);
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

  if (latex.trim() === "") {
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
    parseTableCellRhsLatex(currentCells[cellNum].extra.rhsMathFieldInstances[row*numColumns + column].getMathField().latex(), cellNum, row, column);
  }

  cells.set(currentCells);
  mathCellChanged.set(true);

  parseTableStatements(cellNum);
}

export function parseTableCellRhsLatex(latex, cellNum, row, column) {
  const currentCells = get(cells);

  const data = {
    type: currentCells[cellNum].data.parameterUnitLatexs[column].trim() === "" ? "expression" : "number",
    latex: currentCells[cellNum].data.rhsLatexs[row][column],
    id: currentCells[cellNum].data.id,
    subId: column,
    pendingNewLatex: currentCells[cellNum].extra.rhsPendingNewLatexs[row][column],
    parsingError: currentCells[cellNum].extra.rhsParsingErrors[row][column],
    parsingErrorMessage: currentCells[cellNum].extra.rhsParsingErrorMessages[row][column],
    statement: currentCells[cellNum].extra.rhsStatements[row][column],
    newLatex: currentCells[cellNum].extra.rhsNewLatexs[row][column]
  };

  if (latex.trim() === "") {
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

  parseTableStatements(cellNum);
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

  parseLatex(latex, data);

  currentCells[cellNum].data.latex = data.latex;
  currentCells[cellNum].extra.pendingNewLatex = data.pendingNewLatex;
  currentCells[cellNum].extra.parsingError = data.parsingError;
  currentCells[cellNum].extra.parsingErrorMessage = data.parsingErrorMessage;
  currentCells[cellNum].extra.statement = data.statement;
  currentCells[cellNum].extra.newLatex = data.newLatex;

  cells.set(currentCells);
  mathCellChanged.set(true);
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

function parseLatex(latex, data) {
  
  data.latex = latex;
  data.pendingNewLatex = false;

  const input = new antlr4.InputStream(latex);
  const lexer = new LatexLexer(input);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new LatexParser(tokens);

  parser.removeErrorListeners(); // remove ConsoleErrorListener
  parser.addErrorListener(new LatexErrorListener());

  parser.buildParseTrees = true;

  const tree = parser.statement();

  let parsingError = parser._listeners[0].count > 0;

  if (!parsingError) {
    data.parsingError = false;
    data.parsingErrorMessage = '';

    const visitor = new LatexToSympy(latex , data.id, data.subId, data.type);

    data.statement = visitor.visit(tree);

    if (visitor.parsingError) {
      data.parsingError = true;
      data.parsingErrorMessage = visitor.parsingErrorMessage;
    }

    if (visitor.insertions.length > 0) {
      visitor.insertions.sort((a,b) => a.location - b.location);
      const segments = [];
      let previousInsertLocation = 0;
      visitor.insertions.forEach( (insert) => {
        segments.push(latex.slice(previousInsertLocation, insert.location) + insert.text);
        previousInsertLocation = insert.location;
      });
      segments.push(latex.slice(previousInsertLocation));
      const newLatex = segments.reduce( (accum, current) => accum+current, '');
      data.pendingNewLatex = true;
      data.newLatex = newLatex;
    }
  } else {
    data.statement = null;
    data.parsingError = true;
    data.parsingErrorMessage = "Invalid Syntax";
  }
}


export function handleVirtualKeyboard(event, mathFieldInstance) {
  if (event.detail.write) {
    let command = event.detail.command;
    if (command.includes("[selection]")) {
      let selection = mathFieldInstance.getMathField().getSelection();
      selection = selection === null ? "" : selection;
      command = command.replace("[selection]", selection);
    }
    mathFieldInstance.getMathField().write(command);
  } else {
    mathFieldInstance.getMathField().cmd(event.detail.command);
  }
  mathFieldInstance.getMathField().focus();
  if ( event.detail.positionLeft ) {
    for (let i=0; i < event.detail.positionLeft; i++) {
      mathFieldInstance.getMathField().keystroke("Left");
    }
  }
}


export function handleFocusOut(cellNum) {
  const currentCells = get(cells);

  if (currentCells[cellNum]) {
    if (currentCells[cellNum].data.type !== "plot" && currentCells[cellNum].extra.pendingNewLatex) {
      currentCells[cellNum].extra.mathFieldInstance.setLatex(
        currentCells[cellNum].extra.newLatex
      );
      currentCells[cellNum].extra.pendingNewLatex = false;
      cells.set(currentCells);
    } else if (currentCells[cellNum].data.type === "plot" && 
               currentCells[cellNum].extra.pendingNewLatexs.some(item => item)) {
      currentCells[cellNum].extra.pendingNewLatexs.forEach((pendingNewLatex, index) => {
        if(pendingNewLatex) {
          currentCells[cellNum].extra.mathFieldInstances[index].setLatex(
            currentCells[cellNum].extra.newLatexs[index]
          );
          currentCells[cellNum].extra.pendingNewLatexs[index] = false;
        }
      });
      cells.set(currentCells);
    } else if (currentCells[cellNum].data.type === "table" && 
               currentCells[cellNum].extra.parameterPendingNewLatexs.some(item => item)) {
      currentCells[cellNum].extra.parameterPendingNewLatexs.forEach((parameterPendingNewLatex, index) => {
        if(parameterPendingNewLatex) {
          currentCells[cellNum].extra.parameterMathFieldInstances[index].setLatex(
          currentCells[cellNum].extra.parameterNewLatexs[index]
          );
          currentCells[cellNum].extra.parameterPendingNewLatexs[index] = false;
        }
      });
      cells.set(currentCells);
    } else if (currentCells[cellNum].data.type === "table" &&
      currentCells[cellNum].extra.parameterUnitPendingNewLatexs.some(item => item)) {
      currentCells[cellNum].extra.parameterUnitPendingNewLatexs.forEach((parameterUnitPendingNewLatex, index) => {
        if (parameterUnitPendingNewLatex) {
          currentCells[cellNum].extra.parameterUnitMathFieldInstances[index].setLatex(
            currentCells[cellNum].extra.parameterUnitNewLatexs[index]
          );
          currentCells[cellNum].extra.parameterUnitPendingNewLatexs[index] = false;
        }
      });
      cells.set(currentCells);
    } else if (currentCells[cellNum].data.type === "table" &&
      currentCells[cellNum].extra.rhsPendingNewLatexs.reduce((accum, row) => accum || row.some(item=>item), false)) {
      const numColumns = currentCells[cellNum].data.parameterLatexs.length;
      for (const [rowIndex, row] of currentCells[cellNum].extra.rhsPendingNewLatexs.entries()) {
        row.forEach((rhsPendingNewLatex, colIndex) => {
          if (rhsPendingNewLatex) {
            currentCells[cellNum].extra.rhsMathFieldInstances[rowIndex*numColumns+colIndex].setLatex(
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

function parseTableStatements(cellNum) {
  const currentCells = get(cells);
  const currentTableStatements = get(tableStatements);
  const cell = currentCells[cellNum];
  const rowIndex = cell.data.selectedRow;
  const statements = [];

  if (!(cell.extra.parameterParsingErrors.some(value => value) ||
        cell.extra.parameterUnitParsingErrors.some(value => value) ||
        cell.extra.rhsParsingErrors.reduce((accum, row) => accum || row.some(value => value), false))) {
    for (let colIndex = 0; colIndex < cell.data.parameterLatexs.length; colIndex++) {
      let combinedLatex, data;
      if (cell.data.rhsLatexs[rowIndex][colIndex].trim() !== "") {
        combinedLatex = cell.data.parameterLatexs[colIndex] + 
                        cell.data.rhsLatexs[rowIndex][colIndex] +
                        cell.data.parameterUnitLatexs[colIndex];
        data = {
          latex: combinedLatex,
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

  currentTableStatements[cellNum] = statements;
  tableStatements.set(currentTableStatements);
}