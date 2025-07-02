
globalThis.importScripts('pyodide/pyodide.js');

let pyodide_ready = false;
let py_funcs;
let pyodide;
let loadedPyodidePackages: Set<string> = new Set(['jedi']);

async function setup() { 
  try {
    pyodide = await globalThis.loadPyodide({indexURL: 'pyodide/', packages: ['jedi']});
    const response = await fetch("jedi_code_analysis.py");
    const data = await response.text();
    py_funcs = await pyodide.runPythonAsync(data);
    console.log('Jedi Python Ready');
    pyodide_ready = true
  } catch(e) {
    console.error('Jedi Pyodide failed to load.');
    console.log(e);
  }
}

const setupPromise = setup();

globalThis.onmessage = async function(e){
    await setupPromise;

    if (!pyodide_ready) {
      console.log('Jedi Pyodide not available')
      return;
    }

    try {
      const neededPackages = (new Set(e.data.neededPyodidePackages as string[])).difference(loadedPyodidePackages)
      if (neededPackages.size > 0) {
        await pyodide.loadPackage([...neededPackages]);
        loadedPyodidePackages = loadedPyodidePackages.union(neededPackages);
      }

      const codeContextResult = JSON.parse(py_funcs.get_code_context(JSON.stringify(e.data.codeContextRequest)));

      globalThis.postMessage(codeContextResult);
    } catch (e) {
      console.warn(`Unhandled jedi code analysis exception: ${e}`)
      globalThis.postMessage({autocompleteSuggestions: [], hoverText: ''})
    }
}