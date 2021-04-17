self.languagePluginUrl = 'pyodide/';
importScripts('pyodide/pyodide.js');

let pyodide_ready = false;
let interruptBuffer = new Int8Array(1);
let py_funcs;

pyodide_promise = languagePluginLoader
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

onmessage = async function(e){
  await pyodide_promise;

  if (e.data.cmd === "solve") {
    if (!pyodide_ready) {
      postMessage("pyodide_not_available");
      return;
    }
    result = py_funcs.getQueryValues(e.data.data);
    postMessage(JSON.parse(result));
  }
}