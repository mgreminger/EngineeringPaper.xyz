import { unit } from "mathjs";


export function arraysEqual(a, b) {
  return a.length === b.length && a.every((item, i) => item === b[i]);
}

export function unitsEquivalent(units1, units2) {
  try {
    if (arraysEqual(unit(units1).dimensions, unit(units2).dimensions)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    // One of the units not recognized by mathjs
    // Units cannot be used so mark them as not matching
    console.warn(`Units not recognized, either ${units1} or ${units2}`);
    return false;
  }
}