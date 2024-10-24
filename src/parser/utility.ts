import type { SubQueryStatement } from "./types";

export type Insertion = {
  type: "insertion";
  location: number;
  text: string;
};

export function isInsertion(edit: (Insertion | Replacement)): edit is Insertion {
  return edit.type === "insertion";
}

export type Replacement = {
  type: "replacement";
  location: number;
  deletionLength: number;
  text: string
}

export function isReplacement(edit: (Insertion | Replacement)): edit is Replacement {
  return edit.type === "replacement";
}


export function applyEdits(source: string, pendingEdits: (Insertion | Replacement)[]): string {
  let newString: string = source;
  
  const insertions = pendingEdits.filter(isInsertion)
                                 .sort((a,b) => a.location - b.location);

  // check for insertion collisions
  const insertionLocations = new Set(insertions.map( (insertion) => insertion.location));
  if (insertionLocations.size < insertions.length) {
    throw new Error("Insertion collision");
  }

  const replacements = pendingEdits.filter(isReplacement)
                                   .sort((a,b) => a.location - b.location);

  // Perform replacements first, update insertion locations as necessary
  // Also, check for overlapping replacements and replacement insertion collisions
  let runningReplacementOffset = 0;
  let insertionCursor = 0;
  for (const [index, replacement] of replacements.entries()) {
    if (replacements[index+1]) {
      const nextLocation = replacements[index+1].location;
      if (nextLocation >= replacement.location && nextLocation < replacement.location + replacement.deletionLength) {
        throw new Error("Overlapping replacements");      
      }
    }

    newString = newString.slice(0, replacement.location + runningReplacementOffset) + replacement.text +
                newString.slice(replacement.location + runningReplacementOffset + replacement.deletionLength);

    const currentReplacementOffset = replacement.text.length - replacement.deletionLength;
    runningReplacementOffset += currentReplacementOffset

    let cursorMoved = false;
    for (const [insertionIndex, insertion] of insertions.slice(insertionCursor).entries()) {
      if (insertion.location >= replacement.location && insertion.location < replacement.location + replacement.deletionLength) {
        throw new Error("Replacement/Insertion collision");      
      }

      if (insertion.location >= replacement.location) {
        if (!cursorMoved) {
          insertionCursor = insertionIndex;
          cursorMoved = true; 
        }
        insertion.location += currentReplacementOffset;
      }
    }
  }

  // finally, perform insertions in order
  const segments = [];
  let previousInsertLocation = 0;
  for (const insert of insertions) {
    segments.push(newString.slice(previousInsertLocation, insert.location) + insert.text);
    previousInsertLocation = insert.location;
  }
  
  segments.push(newString.slice(previousInsertLocation));

  newString = segments.reduce( (accum, current) => accum+current, '');

  return newString;
}

export function createSubQuery(name: string): SubQueryStatement {
  return {
    type: "query",
    unitlessSubExpressions: [],
    implicitParams: [],
    params: [name],
    functions: [],
    arguments: [],
    localSubs: [],
    units: "",
    unitsLatex: "",
    isUnitlessSubExpression: false,
    isFunctionArgument: false,
    isFunction: false,
    isUnitsQuery: false,
    isEqualityUnitsQuery: false,
    isScatterXValuesQueryStatement: false,
    isScatterYValuesQueryStatement: false,
    isFromPlotCell: false,
    isSubQuery: true,
    sympy: name,
    isRange: false,
    isDataTableQuery: false,
    isCodeFunctionQuery: false,
    isCodeFunctionRawQuery: false
  };
}