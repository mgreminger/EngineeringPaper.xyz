/**
 * Load the main Pyodide wasm module and initialize it.
 *
 * Only one copy of Pyodide can be loaded in a given Javascript global scope
 * because Pyodide uses global variables to load packages. If an attempt is made
 * to load a second copy of Pyodide, :any:`loadPyodide` will throw an error.
 * (This can be fixed once `Firefox adopts support for ES6 modules in webworkers
 * <https://bugzilla.mozilla.org/show_bug.cgi?id=1247687>`_.)
 *
 * @param {{ indexURL : string, fullStdLib? : boolean = true, stdin?: () => string, stdout?: (text: string) => void, stderr?: (text: string) => void }} config
 * @param {string} config.indexURL - The URL from which Pyodide will load
 * packages
 * @param {boolean} config.fullStdLib - Load the full Python standard library.
 * Setting this to false excludes following modules: distutils.
 * Default: true
 * @param {undefined | (() => string)} config.stdin - Override the standard input callback. Should ask the user for one line of input.
 * Default: undefined
 * @param {undefined | ((text: string) => void)} config.stdout - Override the standard output callback.
 * Default: undefined
 * @param {undefined | ((text: string) => void)} config.stderr - Override the standard error output callback.
 * Default: undefined
 * @returns The :ref:`js-api-pyodide` module.
 * @memberof globalThis
 * @async
 */
export function loadPyodide(config: {
    indexURL: string;
    fullStdLib?: boolean;
    stdin?: () => string;
    stdout?: (text: string) => void;
    stderr?: (text: string) => void;
}): Promise<{
    globals: import("./pyproxy.gen.js").PyProxy;
    FS: any;
    pyodide_py: import("./pyproxy.gen.js").PyProxy;
    version: string;
    loadPackage: typeof loadPackage;
    loadPackagesFromImports: typeof import("./api.js").loadPackagesFromImports;
    loadedPackages: any;
    isPyProxy: typeof import("./pyproxy.gen.js").isPyProxy;
    pyimport: typeof import("./api.js").pyimport;
    runPython: typeof import("./api.js").runPython;
    runPythonAsync: typeof import("./api.js").runPythonAsync;
    registerJsModule: typeof registerJsModule;
    unregisterJsModule: typeof import("./api.js").unregisterJsModule;
    setInterruptBuffer: typeof import("./api.js").setInterruptBuffer;
    toPy: typeof import("./api.js").toPy;
    registerComlink: typeof import("./api.js").registerComlink;
    PythonError: typeof import("./api.js").PythonError;
    PyBuffer: typeof import("./pyproxy.gen.js").PyBuffer;
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
import { loadPackage } from "./load-pyodide.js";
import { registerJsModule } from "./api.js";
