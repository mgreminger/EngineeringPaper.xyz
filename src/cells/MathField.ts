import type { SvelteComponent } from "svelte";

import { CharStream, CommonTokenStream } from "antlr4";
import LatexLexer from "../parser/LatexLexer.js";
import LatexParser from "../parser/LatexParser.js";
import { LatexToSympy, LatexErrorListener } from "../parser/LatexToSympy";
import type { Statement, FieldTypes } from "../parser/types";


export class MathField {
  latex: string;
  undoHistory: string[];
  undoCursor: number;
  type: FieldTypes;
  id: number;
  static nextId = 0; 
  parsingError = true;
  parsingErrorMessage = "Invalid Syntax";
  statement: Statement | null = null;
  element: SvelteComponent | null = null;
  pendingNewLatex = false;
  newLatex = [];

  constructor (latex = "", type: FieldTypes ="math") {
    this.latex = latex;
    this.undoHistory = [latex,]
    this.undoCursor = 0;
    this.type = type;
    this.id = MathField.nextId++;
  };


  setPendingLatex(): void {
    if (this.pendingNewLatex && this.element) {
      this.element.setLatex(this.newLatex);
      this.pendingNewLatex = false;
    }
  }

  updateLatex(latex: string) {
    // only push new undo history if the new value is different
    if (latex !== this.undoHistory[this.undoCursor]) {
      if (this.undoCursor < this.undoHistory.length-1) {
        // truncate undo history if there are currently redo's available
        this.undoHistory = this.undoHistory.slice(0, this.undoCursor+1);
      }
      this.undoHistory.push(latex);
      this.undoCursor = this.undoHistory.length-1;
    }
    this.latex = latex;
  }

  undo(): void {
    if (this.element && this.undoCursor > 0) {
      this.undoCursor--;
      this.element.setLatex(this.undoHistory[this.undoCursor]);
    }
  }

  redo(): void {
    if (this.element && this.undoCursor < this.undoHistory.length-1) {
      this.undoCursor++;
      this.element.setLatex(this.undoHistory[this.undoCursor]);
    }
  }

  parseLatex(latex: string, subId = 0) {
    this.updateLatex(latex);

    this.pendingNewLatex = false;
  
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
      this.parsingError = false;
      this.parsingErrorMessage = '';
  
      const visitor = new LatexToSympy(latex, this.id, subId, this.type);
  
      this.statement = visitor.visit(tree);

      if (visitor.parsingError) {
        this.parsingError = true;
        this.parsingErrorMessage = visitor.parsingErrorMessage;
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
        this.pendingNewLatex = true;
        this.newLatex = newLatex;
      }
    } else {
      this.statement = null;
      this.parsingError = true;
      this.parsingErrorMessage = "Invalid Syntax";
    }
  }; 
}