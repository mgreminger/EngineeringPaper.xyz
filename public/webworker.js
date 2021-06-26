"use strict";

self.importScripts('pyodide/pyodide.js');

let pyodide_ready = false;
let py_funcs;
let recursionError = false;

async function setup() { 
  try {
    const pyodide = await self.loadPyodide({indexURL: 'pyodide/'});
    await pyodide.loadPackage('sympy');
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
  if (e.data.cmd === "solve") {
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