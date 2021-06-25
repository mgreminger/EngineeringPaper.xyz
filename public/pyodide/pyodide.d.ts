/**
 * Load the main Pyodide wasm module and initialize it.
 *
 * Only one copy of Pyodide can be loaded in a given Javascript global scope
 * because Pyodide uses global variables to load packages. If an attempt is made
 * to load a second copy of Pyodide, :any:`loadPyodide` will throw an error.
 * (This can be fixed once `Firefox adopts support for ES6 modules in webworkers
 * <https://bugzilla.mozilla.org/show_bug.cgi?id=1247687>`_.)
 *
 * @param {{ indexURL : string, fullStdLib? : boolean = true }} config
 * @param {string} config.indexURL - The URL from which Pyodide will load
 * packages
 * @param {boolean} config.fullStdLib - Load the full Python standard library.
 * Setting this to false excludes following modules: distutils.
 * Default: true
 * @returns The :ref:`js-api-pyodide` module.
 * @memberof globalThis
 * @async
 */
export function loadPyodide(config: {
    indexURL: string;
    fullStdLib?: boolean;
}): Promise<{
    globals: import("./pyproxy.gen").PyProxy;
    pyodide_py: import("./pyproxy.gen").PyProxy;
    version: string;
    loadPackage: typeof loadPackage;
    loadPackagesFromImports: typeof import("./api").loadPackagesFromImports;
    loadedPackages: any;
    isPyProxy: typeof import("./pyproxy.gen").isPyProxy;
    pyimport: typeof import("./api").pyimport;
    runPython: typeof import("./api").runPython;
    runPythonAsync: typeof import("./api").runPythonAsync;
    registerJsModule: typeof registerJsModule;
    unregisterJsModule: typeof import("./api").unregisterJsModule;
    setInterruptBuffer: typeof import("./api").setInterruptBuffer;
    toPy: typeof import("./api").toPy;
    registerComlink: typeof import("./api").registerComlink;
    PythonError: typeof import("./api").PythonError;
    PyBuffer: typeof import("./pyproxy.gen").PyBuffer;
}>;
export type PyProxy = import('./pyproxy.gen').PyProxy;
export type PyProxyWithLength = import('./pyproxy.gen').PyProxyWithLength;
export type PyProxyWithGet = import('./pyproxy.gen').PyProxyWithGet;
export type PyProxyWithSet = import('./pyproxy.gen').PyProxyWithSet;
export type PyProxyWithHas = import('./pyproxy.gen').PyProxyWithHas;
export type PyProxyIterable = import('./pyproxy.gen').PyProxyIterable;
export type PyProxyIterator = import('./pyproxy.gen').PyProxyIterator;
export type PyProxyAwaitable = import('./pyproxy.gen').PyProxyAwaitable;
export type PyProxyBuffer = import('./pyproxy.gen').PyProxyBuffer;
export type PyProxyCallable = import('./pyproxy.gen').PyProxyCallable;
export type Py2JsResult = import('./pyproxy.gen').Py2JsResult;
export type TypedArray = import('./pyproxy.gen').TypedArray;
export type PyBuffer = import('./pyproxy.gen').PyBuffer;
import { loadPackage } from "./load-pyodide";
import { registerJsModule } from "./api";
