import { loadMathJax } from "../utility";
import { BaseCell, type DatabasePlotCell } from "./BaseCell";
import MathCell from "./MathCell.svelte";

type Plotly = typeof import("plotly.js-basic-dist");

export default class PlotCell extends BaseCell {
  static Plotly: Plotly;
  
  latexs: string[] = $state();
  logX: boolean = $state();
  logY: boolean = $state();
  squareAspectRatio: boolean = $state();

  constructor (arg?: DatabasePlotCell | MathCell) {
    super("plot", arg?.id);
    if (arg === undefined) {
      this.latexs = ["", ];
      this.logX = false;
      this.logY = false;
      this.squareAspectRatio = false;
    } else if (arg instanceof MathCell) {
      this.latexs = [arg.latex, ];
      this.logX = false;
      this.logY = false;
      this.squareAspectRatio = false;
    } else {
      // from database
      this.latexs = [...arg.latexs];
      this.logX = Boolean(arg.logX);
      this.logY = Boolean(arg.logY);
      this.squareAspectRatio = Boolean(arg.squareAspectRatio)

      // In older versions, database will have included an empty math field at end of list
      // Remove it if it exists, don't remove if it is the first entry
      if (this.latexs.length > 1 && this.latexs.slice(-1)[0] === "" ) {
        this.latexs = this.latexs.slice(0,-1);
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
      latexs: this.latexs,
      logX: this.logX,
      logY: this.logY,
      squareAspectRatio: this.squareAspectRatio
    };
  }

  addRow() {
    this.latexs = [...this.latexs, ""];
  }


  deleteRow(rowIndex: number) {
    this.latexs = [...this.latexs.slice(0,rowIndex),
                       ...this.latexs.slice(rowIndex+1)];
  }

}