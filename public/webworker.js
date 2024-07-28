"use strict";

self.importScripts('pyodide/pyodide.js');

let pyodide_ready = false;
let py_funcs;
let recursionError = false;
let pyodide;
let coolpropLoaded = false;
let numpyLoaded = false;

async function setup() { 
  try {
    pyodide = await self.loadPyodide({indexURL: 'pyodide/', packages: ['sympy']});
    const response = await fetch("dimensional_analysis.py");
    const data = await response.text();
    py_funcs = await pyodide.runPythonAsync(data);
    console.log('Python Ready');
    pyodide_ready = true
    self.postMessage("pyodide_loaded");
  } catch(e) {
    console.error('Pyodide failed to load.');
    console.log(e);
    self.postMessage("pyodide_not_available");
  }
}

const setupPromise = setup();

self.onmessage = async function(e){
  if (e.data.cmd === "sheet_solve") {
    await setupPromise;

    if (!pyodide_ready) {
      self.postMessage("pyodide_not_available");
      return;
    }
    if (recursionError) {
      self.postMessage("max_recursion_exceeded");
      return;
    }
    try {
      if (e.data.needCoolprop && !coolpropLoaded) {
        await pyodide.loadPackage("coolprop");
        coolpropLoaded = true;
      }

      if (e.data.needNumpy && !coolpropLoaded && !numpyLoaded) {
        await pyodide.loadPackage("numpy");
        numpyLoaded = true;
      }

      const result = py_funcs.solveSheet(e.data.data);

      self.postMessage(JSON.parse(result));
    } catch (e) {
      // recursion is instance of InternalError (not standard, so cannot use) in Firefox and RangeError in Chrome
      if (e instanceof RangeError) {
        recursionError = true;
        self.postMessage("max_recursion_exceeded");
        return;
      } else {
        self.postMessage({error: `Unhandled exception occurred during Python call. ${e}`, results: []})
      }
    }
  }
}