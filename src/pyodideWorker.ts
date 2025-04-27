globalThis.importScripts('pyodide/pyodide.js');

let pyodide_ready = false;
let py_funcs;
let recursionError = false;
let pyodide;
let coolpropLoaded = false;
let numpyLoaded = false;
let scipyLoaded = false;
let scikitLearnLoaded = false;

async function setup() { 
  try {
    pyodide = await globalThis.loadPyodide({indexURL: 'pyodide/', packages: ['sympy']});
    const response = await fetch("dimensional_analysis.py");
    const data = await response.text();
    py_funcs = await pyodide.runPythonAsync(data);
    console.log('Python Ready');
    pyodide_ready = true
    globalThis.postMessage("pyodide_loaded");
  } catch(e) {
    console.error('Pyodide failed to load.');
    console.log(e);
    globalThis.postMessage("pyodide_not_available");
  }
}

const setupPromise = setup();

globalThis.onmessage = async function(e){
  if (e.data.cmd === "sheet_solve") {
    await setupPromise;

    if (!pyodide_ready) {
      globalThis.postMessage("pyodide_not_available");
      return;
    }
    if (recursionError) {
      globalThis.postMessage("max_recursion_exceeded");
      return;
    }
    try {
      if (e.data.needScikitLearn && !scikitLearnLoaded) {
        await pyodide.loadPackage("scikit-learn");
        scikitLearnLoaded = true;
        scipyLoaded = true;
        numpyLoaded = true;
      }

      if (e.data.needCoolprop && !coolpropLoaded) {
        await pyodide.loadPackage("coolprop");
        coolpropLoaded = true;
        numpyLoaded = true;
      }

      if (e.data.needScipy && !scipyLoaded) {
        await pyodide.loadPackage("scipy");
        scipyLoaded = true;
        numpyLoaded = true;
      } 

      if (e.data.needNumpy && !numpyLoaded) {
        await pyodide.loadPackage("numpy");
        numpyLoaded = true;
      }

      const result = py_funcs.solveSheet(JSON.stringify(e.data.data));

      globalThis.postMessage(JSON.parse(result));
    } catch (e) {
      // recursion is instance of InternalError (not standard, so cannot use) in Firefox and RangeError in Chrome
      if (e instanceof RangeError) {
        recursionError = true;
        globalThis.postMessage("max_recursion_exceeded");
        return;
      } else {
        globalThis.postMessage({error: `Unhandled exception occurred during Python call. ${e}`, results: []})
      }
    }
  }
}