import { parseLatex } from "./LatexToSympy";

self.onmessage = function(e) {
    self.postMessage(parseLatex(e.data.latex, e.data.id, e.data.type, e.data.dataTableInfo));
}