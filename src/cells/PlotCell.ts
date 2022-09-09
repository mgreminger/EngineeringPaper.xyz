import { BaseCell, type DatabasePlotCell } from "./BaseCell";
import MathCell from "./MathCell";
import { MathField } from "./MathField";


export default class PlotCell extends BaseCell {
  mathFields: MathField[];

  constructor (arg: DatabasePlotCell | MathCell) {
    if (arg instanceof MathCell) {
      super("plot", arg.id);
      this.mathFields = [new MathField(arg.mathField.latex, "plot"), new MathField("", "plot")];
    } else {
      super("plot", arg.id);
      this.mathFields = arg.latexs.map((latex) => new MathField(latex, "plot"));
    }
  } 

  serialize(): DatabasePlotCell {
    return {
      type: "plot",
      id: this.id,
      latexs: this.mathFields.map((item) => item.latex)
    };
  }
}