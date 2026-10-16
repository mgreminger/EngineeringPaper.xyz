import type { Statement } from "../parser/types";
import { getBlankStatement } from "../parser/utility";
import type { MathCellConfig } from "../sheet/Sheet";
import { BaseCell, type DatabaseMathCell } from "./BaseCell";

type DerivedState = {
  parsePending: boolean;
  parsingError: boolean;
  parsingErrorMessage: string;
  statement: Statement;
}

export default class MathCell extends BaseCell {
  latex: string = $state();
  config: MathCellConfig | null = $state();

  derivedState:DerivedState = {
    parsePending: true,
    parsingError: false,
    parsingErrorMessage: "",
    statement: getBlankStatement()
  }

  constructor (arg?: DatabaseMathCell) {
    super("math", arg?.id);
    if (arg === undefined) {
      this.latex = "";
      this.config = null;
    } else {
      
      this.latex = arg.latex;
      if (arg.config) {
        this.config = arg.config;
        if (this.config.showIntermediateResults === undefined) {
          this.config.showIntermediateResults = false;
        }
      } else {
        this.config = null;        
      }
    }
  } 

  serialize(): DatabaseMathCell {
    return {
      type: "math",
      id: this.id,
      latex: this.latex,
      config: this.config
    };
  }
}