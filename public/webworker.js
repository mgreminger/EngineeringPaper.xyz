"use strict";

self.importScripts('pyodide/pyodide.js');

let pyodide_ready = false;
let interruptBuffer = new Int8Array(1);
let py_funcs;
let recursionError = false;

const pyodide_promise = self.loadPyodide({indexURL: 'pyodide/'})
.then(() => self.pyodide.loadPackage('sympy'))
.then(() => fetch("dimensional_analysis.py"))
.then(response => response.text())
.then((data) => {
               py_funcs = self.pyodide.runPython(data);
               console.log('Python Ready');
               pyodide_ready = true
               self.pyodide._module.setInterruptBuffer(interruptBuffer);
             })
.catch(e => {console.error('Python loading failed.');
             console.error(e);}
)

self.onmessage = async function(e){
  await pyodide_promise;

  if (e.data.cmd === "solve") {
    if (!pyodide_ready) {
      self.postMessage("pyodide_not_available");
      return;
    }
    if (recursionError) {
      self.postMessage("max_recursion_exceeded");
      return;
    }
    try {
      const result = py_funcs.getQueryValues(e.data.data);
      self.postMessage(JSON.parse(result));
    } catch (e) {
      // recursion is instance of InternalError in Firefox and RangeError in Chrome
      if (e instanceof RangeError || e instanceof InternalError) {
        recursionError = true;
        self.postMessage("max_recursion_exceeded");
        return;
      } else {
        self.postMessage({error: "Unhandled exception occurred during Python call", results: []})
      }
    }
  }
}