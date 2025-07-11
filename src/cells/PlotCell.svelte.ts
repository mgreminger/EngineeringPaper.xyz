import { loadMathJax } from "../utility";
import { BaseCell, type DatabasePlotCell } from "./BaseCell";
import MathCell from "./MathCell.svelte";
import { MathField } from "./MathField.svelte";

type Plotly = typeof import("plotly.js-basic-dist");

export default class PlotCell extends BaseCell {
  static Plotly: Plotly;
  
  mathFields: MathField[] = $state();
  logX: boolean = $state();
  logY: boolean = $state();
  squareAspectRatio: boolean = $state();

  constructor (arg?: DatabasePlotCell | MathCell) {
    super("plot", arg?.id);
    if (arg === undefined) {
      this.mathFields = [new MathField("", "plot"), ];
      this.logX = false;
      this.logY = false;
      this.squareAspectRatio = false;
    } else if (arg instanceof MathCell) {
      this.mathFields = [new MathField(arg.mathField.latex, "plot"), ];
      this.logX = false;
      this.logY = false;
      this.squareAspectRatio = false;
    } else {
      // from database
      this.mathFields = arg.latexs.map((latex) => new MathField(latex, "plot"));
      this.logX = Boolean(arg.logX);
      this.logY = Boolean(arg.logY);
      this.squareAspectRatio = Boolean(arg.squareAspectRatio)

      // In older versions, database will have included an empty math field at end of list
      // Remove it if it exists, don't remove if it is the first entry
      if (this.mathFields.length > 1 && this.mathFields.slice(-1)[0].latex === "" ) {
        this.mathFields = this.mathFields.slice(0,-1);
      }
    }
  }

  static async init() {
    if (!this.Plotly) {
      if (!document.querySelector("#MathJax-script")) {
        await loadMathJax();
      }

      this.Plotly = await import("plotly.js-basic-dist");
    } 
  }

  serialize(): DatabasePlotCell {
    return {
      type: "plot",
      id: this.id,
      latexs: this.mathFields.map((item) => item.latex),
      logX: this.logX,
      logY: this.logY,
      squareAspectRatio: this.squareAspectRatio
    };
  }

  get parsePending() {
    return this.mathFields.reduce((accum, value) => accum || value.parsePending, false);
  }

  addRow() {
    this.mathFields = [...this.mathFields, new MathField('', "plot")];
  }


  deleteRow(rowIndex: number) {
    this.mathFields = [...this.mathFields.slice(0,rowIndex),
                       ...this.mathFields.slice(rowIndex+1)];
  }

}