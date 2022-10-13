import { BaseCell, type DatabaseMathCell } from "./BaseCell";
import { MathField } from "./MathField";

export default class MathCell extends BaseCell {
  mathField: MathField;

  constructor (arg?: DatabaseMathCell) {
    if (arg === undefined) {
      super("math");
      this.mathField = new MathField("");
    } else {
      super("math", arg.id);
      this.mathField = new MathField(arg.latex);
    }
  } 

  serialize(): DatabaseMathCell {
    return {
      type: "math",
      id: this.id,
      latex: this.mathField.latex
    };
  }
}