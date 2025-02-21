import type { MathCellConfig } from "../sheet/Sheet";
import { BaseCell, type DatabaseMathCell } from "./BaseCell";
import { MathField } from "./MathField.svelte";

export default class MathCell extends BaseCell {
  mathField: MathField = $state();
  config: MathCellConfig | null = $state();

  constructor (arg?: DatabaseMathCell) {
    super("math", arg?.id);
    if (arg === undefined) {
      this.mathField = new MathField("");
      this.config = null;
    } else {
      
      this.mathField = new MathField(arg.latex);
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
      latex: this.mathField.latex,
      config: this.config
    };
  }
}