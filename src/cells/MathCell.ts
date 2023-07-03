import type { MathCellConfig } from "../sheet/Sheet";
import { BaseCell, type DatabaseMathCell } from "./BaseCell";
import { MathField } from "./MathField";

export default class MathCell extends BaseCell {
  mathField: MathField;
  config: MathCellConfig | null;

  constructor (arg?: DatabaseMathCell) {
    if (arg === undefined) {
      super("math");
      this.mathField = new MathField("");
      this.config = null;
    } else {
      super("math", arg.id);
      this.mathField = new MathField(arg.latex);
      this.config = arg.config ?? null;
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