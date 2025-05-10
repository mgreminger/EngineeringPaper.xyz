import { parseLatex } from "./LatexToSympy";
import { createCustomUnits } from "../utility";

createCustomUnits();

self.onmessage = function(e) {
    self.postMessage(parseLatex(e.data.latex, e.data.id, 0, e.data.type, e.data.dataTableInfo));
}