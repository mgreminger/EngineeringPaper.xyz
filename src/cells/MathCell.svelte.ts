import type { ParsableLatex } from "../parser/types";
import { getInitialParsableLatex } from "../parser/utility";
import type { MathCellConfig } from "../sheet/Sheet";
import { BaseCell, type DatabaseMathCell } from "./BaseCell";

export default class MathCell extends BaseCell {
  latex: ParsableLatex = $state();
  config: MathCellConfig | null = $state();

  constructor (arg?: DatabaseMathCell) {
    super("math", arg?.id);
    if (arg === undefined) {
      this.latex = getInitialParsableLatex();
      this.config = null;
    } else {
      
      this.latex = getInitialParsableLatex(arg.latex);
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
      latex: this.latex.latex,
      config: this.config
    };
  }

  get parsePending() {
    return this.latex.parsePending;
  }
}