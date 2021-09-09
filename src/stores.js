import { writable, get } from 'svelte/store';

import antlr4 from "antlr4";
import LatexLexer from "./parser/LatexLexer.js";
import LatexParser from "./parser/LatexParser.js";
import { LatexToSympy, LatexErrorListener } from "./parser/LatexToSympy.js";

const defaultTitle = 'New Sheet';

export const cells = writable([]);
export const title = writable(defaultTitle);
export const results = writable([]);
export const nextId = writable(0);
export const sheetId = writable('');

export const history = writable([]);

export const prefersReducedMotion = writable(true);
export const activeCell = writable(0);

export const debug = writable(false);


export function addMathCell(index) {
  addCell(index, "math");
}

export function addDocumentationCell(index) {
  addCell(index, "documentation");
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

export function parseLatex(latex, cellNum, subCellNum = 0, isPlot = false) {
  const currentCells = get(cells);

  if (!isPlot) {
    currentCells[cellNum].data.latex = latex;
    currentCells[cellNum].extra.pendingNewLatex = false;
  } else {
    currentCells[cellNum].data.latexs[subCellNum] = latex;
    currentCells[cellNum].extra.pendingNewLatexs[subCellNum] = false;
  }

  const input = new antlr4.InputStream(latex + ";");
  const lexer = new LatexLexer(input);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new LatexParser(tokens);

  parser.removeErrorListeners(); // remove ConsoleErrorListener
  parser.addErrorListener(new LatexErrorListener());

  parser.buildParseTrees = true;

  const tree = parser.statement();

  let parsingError = parser._listeners[0].count > 0;

  if (!parsingError) {
    if (!isPlot) {
      currentCells[cellNum].extra.parsingError = false;
      currentCells[cellNum].extra.parsingErrorMessage = '';
    } else {
      currentCells[cellNum].extra.parsingErrors[subCellNum] = false;
      currentCells[cellNum].extra.parsingErrorMessages[subCellNum] = '';      
    }

    const visitor = new LatexToSympy(latex + ";", currentCells[cellNum].data.id, subCellNum, isPlot);

    if (!isPlot) {
      currentCells[cellNum].extra.statement = visitor.visit(tree);
    } else {
      currentCells[cellNum].extra.statements[subCellNum] = visitor.visit(tree);
    }

    if (visitor.parsingError) {
      if (!isPlot) {
        currentCells[cellNum].extra.parsingError = true;
        currentCells[cellNum].extra.parsingErrorMessage = visitor.parsingErrorMessage;
      } else {
        currentCells[cellNum].extra.parsingErrors[subCellNum] = true;
        currentCells[cellNum].extra.parsingErrorMessages[subCellNum] = visitor.parsingErrorMessage;
      }
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
      if (!isPlot) {
        currentCells[cellNum].extra.pendingNewLatex = true;
        currentCells[cellNum].extra.newLatex = newLatex;
      } else {
        currentCells[cellNum].extra.pendingNewLatexs[subCellNum] = true;
        currentCells[cellNum].extra.newLatexs[subCellNum] = newLatex;
      }
    }
  } else {
    if(!isPlot) {
      currentCells[cellNum].extra.statement = null;
      currentCells[cellNum].extra.parsingError = true;
      currentCells[cellNum].extra.parsingErrorMessage = "Invalid Syntax";
    } else {
      currentCells[cellNum].extra.statements[subCellNum] = null;
      currentCells[cellNum].extra.parsingErrors[subCellNum] = true;
      currentCells[cellNum].extra.parsingErrorMessages[subCellNum] = "Invalid Syntax";
    }
  }

  cells.set(currentCells);
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

  if (currentCells[cellNum] && currentCells[cellNum].data.type !== "plot" &&
      currentCells[cellNum].extra.pendingNewLatex) {
    currentCells[cellNum].extra.mathFieldInstance.setLatex(
      currentCells[cellNum].extra.newLatex
    );
    currentCells[cellNum].extra.pendingNewLatex = false;
  }

  cells.set(currentCells);
}