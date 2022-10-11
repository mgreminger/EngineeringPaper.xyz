import { BaseCell, type DatabasePlotCell } from "./BaseCell";
import MathCell from "./MathCell";
import { MathField } from "./MathField";


export default class PlotCell extends BaseCell {
  mathFields: MathField[];
  logX: boolean;  
  logY: boolean;

  constructor (arg: DatabasePlotCell | MathCell) {
    if (arg instanceof MathCell) {
      super("plot", arg.id);
      this.mathFields = [new MathField(arg.mathField.latex, "plot"), new MathField("", "plot")];
      this.logX = false;
      this.logY = false;
    } else {
      super("plot", arg.id);
      this.mathFields = arg.latexs.map((latex) => new MathField(latex, "plot"));
      this.logX = Boolean(arg.logX);
      this.logY = Boolean(arg.logY);
    }
  } 

  serialize(): DatabasePlotCell {
    return {
      type: "plot",
      id: this.id,
      latexs: this.mathFields.map((item) => item.latex),
      logX: this.logX,
      logY: this.logY
    };
  }
}