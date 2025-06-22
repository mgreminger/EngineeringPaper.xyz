import { unit, bignumber, createUnit, type Unit, type BigNumber, type Fraction } from "mathjs";
import { UNITS_WITH_OFFSET } from "./parser/constants";
import type { MathfieldElement } from "mathlive";

export function createCustomUnits() {
  createUnit({
    // absolute or dynamic viscosity
    poise: {
      prefixes: 'long',
      definition: '1 dyn*s/cm^2',
    },
    P: {
      prefixes: 'short',
      definition: '1 dyn*s/cm^2',
    },
    reyn: {
      prefixes: 'long',
      definition: '1 lbf*s*in^-2',
      aliases: ['reyns']
    },
    ureyn: {
      definition: '.000001 reyn',
      aliases: ['ureyns']
    },
    // kinematic viscosity
    stokes: {
      prefixes: 'long',
      definition: '1 cm^2/s',
      aliases: ['stoke']
    },
    St: {
      prefixes: 'short',
      definition: '1 cm^2/s'
    },
    // pressure
    kpsi: {
      definition: '1000 lbf/in^2',
      aliases: ['ksi']
    },
    Mpsi: {
      definition: '1000000 lbf/in^2',
    },
    inHg: {
      definition: '3386.38 Pa' // @ 0 degC
    },
    ftH2O: {
      definition: '2988.98 Pa' // @ 4 degC 
    },
    inH2O: {
      definition: '249.082 Pa' // @ 4 degC
    },
    // Energy
    Btu: {
      definition: '1 BTU'
    },
    // power
    tonrefrigeration: {
      definition: '12000 BTU/hr',
      aliases: ['TR', 'RT', 'TOR', 'toncooling']
    },
    boilerhp: {
      definition: '33479 BTU/hr',
      aliases: ['BHP']
    },
    MBH: {
      definition: '1000 BTU/hr'
    },
    MMBH: {
      definition: '1000000 BTU/hr'
    },
    // force
    gramforce: {
      definition: '.001 kilogramforce',
      aliases: ['gf']
    },
   });
}

export function convertUnits(value: string, startingUnits: string, userUnits: string) {
  if (startingUnits === "") {
    startingUnits = "in/in"; // only way to specify unitless for mathjs
  }
  if (userUnits === "") {
    userUnits = "in/in";
  }

  let startingValuePlusUnits: Unit;
  try {
    startingValuePlusUnits = unit(bignumber(value), startingUnits);
    unit(userUnits); // just checking that it parses for later
  } catch(e) {
    console.warn(`Units not recognized, either ${startingUnits} or ${userUnits}`);
    return { value: null, unitsMismatch: true};
  } 

  // check that dimensions are compatible for the conversion
  let newValue: BigNumber;
  try {
    newValue = startingValuePlusUnits.toNumeric(userUnits) as BigNumber;
  } catch(e) {
    return { value: null, unitsMismatch: true};
  }

  return {newValue: newValue, unitsMismatch: false }
}


export function arraysEqual(a: any[], b: any[]) {
  return a.length === b.length && a.every((item, i) => item === b[i]);
}


export function unitsEquivalent(units1: string, units2: string) {
  try {
    if (arraysEqual(unit(units1).dimensions, unit(units2).dimensions)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    // One of the units not recognized by mathjs
    // Units cannot be used so mark them as not matching
    console.warn(`Units not recognized, either '${units1}' or '${units2}' caused the error`);
    return false;
  }
}


export function convertArrayUnits(values: number[], startingUnits: string, userUnits: string) {
  if (startingUnits === "") {
    startingUnits = 'in/in';
  }
  return values.map(value => {
    return unit(value, startingUnits).toNumber(userUnits);
  });
}


export function getConversionFactor(startingUnits: string) {
  const currentUnit = unit(1, startingUnits);

  let offset: number = 0;
  let scaleFactor: number;

  // @ts-ignore
  if (!currentUnit._isDerived() && currentUnit.units[0].unit.offset !== 0 ) {
    offset = currentUnit.units[0].unit.offset;
    scaleFactor = currentUnit.units[0].unit.value;
  } else {
    scaleFactor = currentUnit.value;
  }

  return {
    offset: offset,
    scaleFactor: scaleFactor
  }
}


export function getArraySI(values: string[], units: string): number[] {
  if (units.trim() === '') {
    // no units, no need to convert
    return values.map(value => Number(value));
  } else if (UNITS_WITH_OFFSET.has(units)) {
    // need to handle temperature units differently
    return values.map(value => (unit(`${value} ${units}`).toNumeric('K') as number));
  } else {
    return values.map(value => (unit(`${value} ${units}`).value as number));
  }
}

export function unitsValid(units: string | undefined): boolean {
  return !units || !units.includes("Dimension Error");
}


export function isVisible(element: HTMLElement, container: HTMLElement) {

  const { bottom, top } = element.getBoundingClientRect();
  const { bottom: containerBottom, top: containerTop } = container.getBoundingClientRect();
  return top >= containerTop && bottom <= containerBottom;
}


// Version must be integer of form YYYYMMDD
// Assumes version date is in CST
export function versionToDateString(version: number) {
  const versionString = version.toString();
  return (new Date(`${versionString.slice(0,4)}-${versionString.slice(4,6)}-${versionString.slice(6)}T00:00:00.000-06:00`)).toLocaleDateString();
}


export function debounce(func: Function, timeout = 300){
  let timer: undefined | number;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}


export function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}


export function getBlankMatrixLatex(numRows: number, numColumns: number): string {
  let blankMatrixLatex = "\\begin{bmatrix} ";

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numColumns; col++) {
      blankMatrixLatex += "\\placeholder{} ";
      if (col < numColumns -1) {
        blankMatrixLatex += "& "
      }
    }

    if (row < numRows -1) {
      blankMatrixLatex += String.raw`\\ `
    }
  }
  blankMatrixLatex += " \\end{bmatrix}";

  return blankMatrixLatex;
}

export function saveFileBlob(fileBlob: Blob, fileName: string) {
  const sheetDataUrl = URL.createObjectURL(fileBlob);
    
  const anchor = document.createElement("a");
  anchor.href = sheetDataUrl;
  anchor.download = fileName;
  anchor.click();

  // give download a chance to complete before deleting object url
  setTimeout( () => URL.revokeObjectURL(sheetDataUrl), 5000);
}

export function inMatrix(mf: MathfieldElement): boolean {
  // @ts-ignore
  const env = mf._mathfield.model.parentEnvironment?.environmentName ?? '';
  return [
    'array',
    'matrix',
    'pmatrix',
    'bmatrix',
    'vmatrix',
    'Bmatrix',
  ].includes(env);
}

export async function loadMathJax() {
  (window as any).MathJax = {
    startup: {
      ready: () => {
          (window as any).MathJax.startup.defaultReady();
        },
      pageReady: async () => {} // prevents the initial typeSetting of the page, must return a promise
    },
    options: {
      skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'annotation', 'annotation-xml'],
    },
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']]
    }
  };

  const mathJaxScript = document.createElement("script");
  mathJaxScript.id = "MathJax-script";
  mathJaxScript.src = "build/mathjax/tex-svg.js";
  mathJaxScript.async = true;

  const loadPromise:Promise<void> = new Promise((resolve, reject) => {
    mathJaxScript.onload = () => resolve();
  });

  document.head.appendChild(mathJaxScript);
  await loadPromise;

  if ((window as any).MathJax?.startup?.promise) {
    await (window as any).MathJax.startup.promise;
  }
}