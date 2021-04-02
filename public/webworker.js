self.languagePluginUrl = 'pyodide/';
importScripts('pyodide/pyodide.js');

pyodide_ready = false;

pyodide_promise = languagePluginLoader
.then(() => self.pyodide.loadPackage('sympy'))
.then(() => fetch("dimensional_analysis.py"))
.then(response => response.text())
.then((data) => {
               self.py_funcs = self.pyodide.runPython(data);
               console.log('Python Ready');
               self.pyodide_ready = true
             })
.catch(e => {console.error('Python loading failed.');
             console.error(e);}
)

onmessage = async function(e){
  await pyodide_promise;
  if (!self.pyodide_ready) {
    postMessage("pyodide_not_available");
    return;
  }

  result = self.py_funcs.getQueryValues(e.data);

  postMessage(JSON.parse(result));
}