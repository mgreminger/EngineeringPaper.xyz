import { BaseCell, type DatabaseMathCell } from "./BaseCell";
import PlotCell from "./PlotCell";
import { MathField } from "./MathField";

export default class MathCell extends BaseCell {
  mathField: MathField;

  constructor (arg?: DatabaseMathCell | PlotCell) {
    if (arg === undefined) {
      super("math");
      this.mathField = new MathField("");
    } else if (arg instanceof PlotCell) {
      super("math", arg.id);
      this.mathField = new MathField(arg.mathFields[0].latex);
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