import type { SvelteComponent } from "svelte";

import { CharStream, CommonTokenStream } from "antlr4";
import LatexLexer from "../parser/LatexLexer.js";
import LatexParser from "../parser/LatexParser.js";
import { LatexToSympy, LatexErrorListener } from "../parser/LatexToSympy";
import { type Statement, type FieldTypes, type Insertion, type Replacement,
              isInsertion, isReplacement } from "../parser/types";


export class MathField {
  latex: string;
  type: FieldTypes;
  id: number;
  static nextId = 0; 
  parsingError = true;
  parsingErrorMessage = "Invalid Syntax";
  statement: Statement | null = null;
  element: SvelteComponent | null = null;
  pendingNewLatex = false;
  newLatex:string;

  constructor (latex = "", type: FieldTypes ="math") {
    this.latex = latex;
    this.type = type;
    this.id = MathField.nextId++;
  };

  setPendingLatex(): void {
    if (this.pendingNewLatex && this.element) {
      this.element.setLatex(this.newLatex, false);
      this.pendingNewLatex = false;
    }
  }

  parseLatex(latex: string) {
    this.latex = latex;

    const result = parseLatex(latex, this.id, this.type);

    this.pendingNewLatex = result.pendingNewLatex;
    this.newLatex = result.newLatex;
    this.parsingError = result.parsingError;
    this.parsingErrorMessage = result.parsingErrorMessage;
    this.statement = result.statement;
  }
}

type ParsingResult = {
  pendingNewLatex: boolean;
  newLatex: string;
  parsingError: boolean;
  parsingErrorMessage: string;
  statement: Statement | null;
}

function parseLatex(latex: string, id: number, type: FieldTypes): ParsingResult {
  const result  = {
    pendingNewLatex: false,
    newLatex: "",
    statement: null,
    parsingError: false,
    parsingErrorMessage: "",
  }

  const input = new CharStream(latex);
  const lexer = new LatexLexer(input);
  const tokens = new CommonTokenStream(lexer);
  const parser = new LatexParser(tokens);

  parser.removeErrorListeners(); // remove ConsoleErrorListener
  parser.addErrorListener(new LatexErrorListener());

  parser.buildParseTrees = true;

  const tree = parser.statement();
  //@ts-ignore
  let parsingError = Boolean(parser._syntaxErrors);

  if (!parsingError) {
    result.parsingError = false;
    result.parsingErrorMessage = '';

    const visitor = new LatexToSympy(latex, id, type);

    result.statement = visitor.visitStatement(tree);

    if (visitor.parsingError) {
      result.parsingError = true;
      result.parsingErrorMessage = visitor.parsingErrorMessage;
    }

    if (visitor.pendingEdits.length > 0) {
      try {
        result.newLatex = applyEdits(latex, visitor.pendingEdits);
        result.pendingNewLatex = true;
      } catch (e) {
        console.error(`Error auto updating latex: ${e}`);
        result.pendingNewLatex = false; // safe fallback
      }
    }

    if (result.statement.type === "immediateUpdate") {
      result.statement = null;
      result.parsingError = true; // we're in an intermediate state, can't send to sympy just yet
    }

  } else {
    result.statement = null;
    result.parsingError = true;
    result.parsingErrorMessage = "Invalid Syntax";
  }

  return result;
}


function applyEdits(source: string, pendingEdits: (Insertion | Replacement)[]): string {
  let newString: string = source;
  
  const insertions = pendingEdits.filter(isInsertion)
                                 .sort((a,b) => a.location - b.location);

  // check for insertion collisions
  const insertionLocations = new Set(insertions.map( (insertion) => insertion.location));
  if (insertionLocations.size < insertions.length) {
    throw new Error("Insertion collision");
  }

  const replacements = pendingEdits.filter(isReplacement)
                                   .sort((a,b) => a.location - b.location);

  // Perform replacements first, update insertion locations as necessary
  // Also, check for overlapping replacements and replacement insertion collisions
  let runningReplacementOffset = 0;
  let insertionCursor = 0;
  for (const [index, replacement] of replacements.entries()) {
    if (replacements[index+1]) {
      const nextLocation = replacements[index+1].location;
      if (nextLocation >= replacement.location && nextLocation < replacement.location + replacement.deletionLength) {
        throw new Error("Overlapping replacements");      
      }
    }

    newString = newString.slice(0, replacement.location + runningReplacementOffset) + replacement.text +
                newString.slice(replacement.location + runningReplacementOffset + replacement.deletionLength);

    const currentReplacementOffset = replacement.text.length - replacement.deletionLength;
    runningReplacementOffset += currentReplacementOffset

    let cursorMoved = false;
    for (const [insertionIndex, insertion] of insertions.slice(insertionCursor).entries()) {
      if (insertion.location >= replacement.location && insertion.location < replacement.location + replacement.deletionLength) {
        throw new Error("Replacement/Insertion collision");      
      }

      if (insertion.location >= replacement.location) {
        if (!cursorMoved) {
          insertionCursor = insertionIndex;
          cursorMoved = true; 
        }
        insertion.location += currentReplacementOffset;
      }
    }
  }

  // finally, perform insertions in order
  const segments = [];
  let previousInsertLocation = 0;
  for (const insert of insertions) {
    segments.push(newString.slice(previousInsertLocation, insert.location) + insert.text);
    previousInsertLocation = insert.location;
  }
  
  segments.push(newString.slice(previousInsertLocation));

  newString = segments.reduce( (accum, current) => accum+current, '');

  return newString;
}