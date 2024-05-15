import { unit } from 'mathjs';

export function getDimensionsTuple(textDims: string):string {
  const dims = unit(textDims).dimensions;
  return '(' + dims.slice(1).reduce((accum, value) => `${accum}, ${value}`, `${dims[0]}`) + ')' ;
}