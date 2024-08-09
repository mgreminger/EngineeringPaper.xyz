import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));


test('Norm of vector with symbolic entries using all three notations', async () => {
  await page.setLatex(0, String.raw`||\begin{bmatrix}a\\ b\\ c\end{bmatrix}||=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`\mathrm{norm}\left(\begin{bmatrix}a\\ b\\ c\end{bmatrix}\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\left\Vert\begin{bmatrix}a\\ b\\ c\end{bmatrix}\right\Vert=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\sqrt{\left|{a}\right|^{2} + \left|{b}\right|^{2} + \left|{c}\right|^{2}}`); 
  
  content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`\sqrt{\left|{a}\right|^{2} + \left|{b}\right|^{2} + \left|{c}\right|^{2}}`); 

  content = await page.textContent(`#result-value-2`);
  expect(content).toBe(String.raw`\sqrt{\left|{a}\right|^{2} + \left|{b}\right|^{2} + \left|{c}\right|^{2}}`); 
});

test('Norm of row vector with symbolic entries', async () => {
  await page.setLatex(0, String.raw`\left\Vert\begin{bmatrix}a & b & c\end{bmatrix}\right\Vert=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\sqrt{\left|{a}\right|^{2} + \left|{b}\right|^{2} + \left|{c}\right|^{2}}`); 
});

test('Norm of row vector with numeric entries', async () => {
  await page.setLatex(0, String.raw`\left\Vert\begin{bmatrix}1\\ 2\\ 3\end{bmatrix}\right\Vert=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(sqrt(14), precision); 
});

test('Norm of row vector with numeric entries and units', async () => {
  await page.setLatex(0, String.raw`\left\Vert\begin{bmatrix}1000\left\lbrack mm\right\rbrack\\ 2000\left\lbrack mm\right\rbrack\\ 3000\left\lbrack mm\right\rbrack\end{bmatrix}\right\Vert=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(sqrt(14), precision); 

  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');
});

test('Norm of row vector with numeric entries and inconsistent units units', async () => {
  await page.setLatex(0, String.raw`\left\Vert\begin{bmatrix}1000\left\lbrack mm\right\rbrack\\ 2000\left\lbrack mm\right\rbrack\\ 3000\left\lbrack sec\right\rbrack\end{bmatrix}\right\Vert=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator("#cell-0 >> text=Dimension Error")).toBeAttached();
});

test('Norm of matrix', async () => {
  await page.setLatex(0, String.raw`\left\Vert\begin{bmatrix}1\left\lbrack m\right\rbrack & 2\left\lbrack m\right\rbrack\\ 3\left\lbrack m\right\rbrack & 4\left\lbrack m\right\rbrack\\ 5\left\lbrack m\right\rbrack & 6\left\lbrack m\right\rbrack\end{bmatrix}\right\Vert=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(sqrt(91), precision); 

  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');
});

test('Norm of scalar', async () => {
  await page.setLatex(0, String.raw`||v||=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`v=1`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator("text=object has no attribute 'norm'")).toBeVisible();
});

test('Norm of variable vector', async () => {
  await page.setLatex(0, String.raw`||v||=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`v=\begin{bmatrix}a\\ b\\ c\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\sqrt{\left|{a}\right|^{2} + \left|{b}\right|^{2} + \left|{c}\right|^{2}}`); 
});

test('Test min/max of a col vector', async () => {
  await page.setLatex(0, String.raw`max\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`min\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`x=\begin{bmatrix}1\\ 2\\ 4\\ 9\\ -1\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(9, precision); 
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  content = await page.textContent(`#result-value-1`);
  expect(parseLatexFloat(content)).toBeCloseTo(-1, precision); 
  content = await page.textContent('#result-units-1');
  expect(content).toBe('');
});

test('Test min/max of a col vector with units', async () => {
  await page.setLatex(0, String.raw`max\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`min\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`x=\begin{bmatrix}1\\ 2\\ 4\\ 9\\ -1\end{bmatrix}\cdot1\left\lbrack m\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(9, precision); 
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');

  content = await page.textContent(`#result-value-1`);
  expect(parseLatexFloat(content)).toBeCloseTo(-1, precision); 
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');
});

test('Test min/max of a col vector with incompatible units', async () => {
  await page.setLatex(0, String.raw`max\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`min\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`x=\begin{bmatrix}1\left\lbrack m\right\rbrack\\ 2\left\lbrack m\right\rbrack\\ 4\left\lbrack m\right\rbrack\\ 9\left\lbrack m\right\rbrack\\ -1\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator("#cell-0 >> text=Dimension Error")).toBeAttached();
  await expect(page.locator("#cell-1 >> text=Dimension Error")).toBeAttached();
});

test('Test min/max of a row vector', async () => {
  await page.setLatex(0, String.raw`max\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`min\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`x=\begin{bmatrix}9 & 0 & -1 & 4\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(9, precision); 
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  content = await page.textContent(`#result-value-1`);
  expect(parseLatexFloat(content)).toBeCloseTo(-1, precision); 
  content = await page.textContent('#result-units-1');
  expect(content).toBe('');
});

test('Test min/max of a row vector with units', async () => {
  await page.setLatex(0, String.raw`max\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`min\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`x=\begin{bmatrix}9\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & -1\left\lbrack m\right\rbrack & 4\left\lbrack m\right\rbrack\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(9, precision); 
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');

  content = await page.textContent(`#result-value-1`);
  expect(parseLatexFloat(content)).toBeCloseTo(-1, precision); 
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');
});

test('Test min/max of a row vector with incompatible units', async () => {
  await page.setLatex(0, String.raw`max\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`min\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`x=\begin{bmatrix}9\left\lbrack s\right\rbrack & 0\left\lbrack m\right\rbrack & -1\left\lbrack m\right\rbrack & 4\left\lbrack m\right\rbrack\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator("#cell-0 >> text=Dimension Error")).toBeAttached();
  await expect(page.locator("#cell-1 >> text=Dimension Error")).toBeAttached();
});

test('Test min/max of a matrix', async () => {
  await page.setLatex(0, String.raw`max\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`min\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`x=\begin{bmatrix}-1 & 0\\ 3 & 5\\ 5.5 & 9\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(9, precision); 
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  content = await page.textContent(`#result-value-1`);
  expect(parseLatexFloat(content)).toBeCloseTo(-1, precision); 
  content = await page.textContent('#result-units-1');
  expect(content).toBe('');
});

test('Test min/max of a matrix with units', async () => {
  await page.setLatex(0, String.raw`max\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`min\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`x=\begin{bmatrix}-1\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack\\ 3\left\lbrack m\right\rbrack & 5\left\lbrack m\right\rbrack\\ 5.5\left\lbrack m\right\rbrack & 9\left\lbrack m\right\rbrack\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(9, precision); 
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');

  content = await page.textContent(`#result-value-1`);
  expect(parseLatexFloat(content)).toBeCloseTo(-1, precision); 
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');
});

test('Test min/max of a matrix with incompatible units', async () => {
  await page.setLatex(0, String.raw`max\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`min\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`x=\begin{bmatrix}-1\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack\\ 3 & 5\left\lbrack m\right\rbrack\\ 5.5\left\lbrack m\right\rbrack & 9\left\lbrack m\right\rbrack\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator("#cell-0 >> text=Dimension Error")).toBeAttached();
  await expect(page.locator("#cell-1 >> text=Dimension Error")).toBeAttached();
});

test('Test min/max of a symbolic col vector', async () => {
  await page.setLatex(0, String.raw`max\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`min\left(x\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`x=\begin{bmatrix}a\\ b\\ c\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\max\left(a, b, c\right)`); 

  content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`\min\left(a, b, c\right)`); 
});

test('Test range with single argument', async () => {
  await page.setLatex(0, String.raw`\mathrm{range}\left(5\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \\ 4 \\ 5 \end{bmatrix}`); 
});

test('Test range with two arguments', async () => {
  await page.setLatex(0, String.raw`\mathrm{range}\left(-5,4\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} -5 \\ -4 \\ -3 \\ -2 \\ -1 \\ 0 \\ 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}`); 
});

test('Test range with three arguments', async () => {
  await page.setLatex(0, String.raw`\mathrm{range}\left(1,2,.1\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 1.1 \\ 1.2 \\ 1.3 \\ 1.4 \\ 1.5 \\ 1.6 \\ 1.7 \\ 1.8 \\ 1.9 \\ 2 \end{bmatrix}`); 
});

test('Test range with negative step', async () => {
  await page.setLatex(0, String.raw`\mathrm{range}\left(-1,-2,-.1\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} -1 \\ -1.1 \\ -1.2 \\ -1.3 \\ -1.4 \\ -1.5 \\ -1.6 \\ -1.7 \\ -1.8 \\ -1.9 \\ -2 \end{bmatrix}`); 
});

test('Test range that includes zero value multiplied by dimensioned value', async () => {
  await page.setLatex(0, String.raw`\mathrm{range}\left(0,5\right)\cdot1\left\lbrack m\right\rbrack=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0\left\lbrack m\right\rbrack  \\ 1\left\lbrack m\right\rbrack  \\ 2\left\lbrack m\right\rbrack  \\ 3\left\lbrack m\right\rbrack  \\ 4\left\lbrack m\right\rbrack  \\ 5\left\lbrack m\right\rbrack  \end{bmatrix}`); 
});

test('Test range input needs to be unitless', async () => {
  await page.setLatex(0, String.raw`\mathrm{range}\left(1\left\lbrack m\right\rbrack,2\left\lbrack m\right\rbrack,.1\left\lbrack m\right\rbrack\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator("#cell-0 >> text=Dimension Error")).toBeAttached();
});

test('Test range error handling for empty range', async () => {
  await page.setLatex(0, String.raw`\mathrm{range}\left(10,0\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator("text=Attempt to create empty range")).toBeAttached();
});

test('Test range with expression inputs', async () => {
  await page.setLatex(0, String.raw`\mathrm{range}\left(start,stop\cdot2,step\right)=`);

  await page.locator('#add-math-cell').click();

  await page.setLatex(1, String.raw`start=0,\:stop=.5,\:step=.1`);  

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0 \\ 0.1 \\ 0.2 \\ 0.3 \\ 0.4 \\ 0.5 \\ 0.6 \\ 0.7 \\ 0.8 \\ 0.9 \\ 1 \end{bmatrix}`); 
});

test('Test range that last value not included if that hit by steps', async () => {
  await page.setLatex(0, String.raw`\mathrm{range}\left(4.99999\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}`); 
});

test('Test count function for column vector', async () => {
  await page.setLatex(0, String.raw`\mathrm{count}\left(\mathrm{range}\left(4\right)\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);

  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test count function for symbolic row vector', async () => {
  await page.setLatex(0, String.raw`\mathrm{count}\left(\begin{bmatrix}a & b & c\end{bmatrix}\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test count function for matrix with units and substitution', async () => {
  await page.setLatex(0, String.raw`\mathrm{count}\left(A\right)=`);
  
  await page.locator('#add-math-cell').click();

  await page.setLatex(1, String.raw`A=\begin{bmatrix}1 & 2 & 3\\ 4 & 5 & 6\end{bmatrix}\cdot1\left\lbrack m\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);

  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test count error handling for non-matrix input', async () => {
  await page.setLatex(0, String.raw`\mathrm{count}\left(a\right)=`);
  
  await expect(page.locator('text=Count function requires a vector or matrix as input')).toBeAttached();
});

test('Test sum function for multiple scalar inputs with units', async () => {
  await page.setLatex(0, String.raw`\mathrm{sum}\left(1\left\lbrack m\right\rbrack,2\left\lbrack m\right\rbrack\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');
});

test('Test sum function for row vector with symbolic values', async () => {
  await page.setLatex(0, String.raw`\mathrm{sum}\left(\begin{bmatrix}a & b\end{bmatrix}\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe('a + b');

  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test sum function for column vector with numeric unitless values', async () => {
  await page.setLatex(0, String.raw`\mathrm{sum}\left(\begin{bmatrix}1\\ 2\end{bmatrix}\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test sum function for matrix', async () => {
  await page.setLatex(0, String.raw`\mathrm{sum}\left(\begin{bmatrix}1 & 2 & 3\\ 4 & 5 & 6\end{bmatrix}\cdot1\left\lbrack m\right\rbrack\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(21, precision);

  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');
});

test('Test sum function with inconsistent units', async () => {
  await page.setLatex(0, String.raw`\mathrm{sum}\left(\begin{bmatrix}1\\ 2\left\lbrack m\right\rbrack\end{bmatrix}\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator("#cell-0 >> text=Dimension Error")).toBeAttached();
});

test('Test average function for multiple scalar inputs without units', async () => {
  await page.setLatex(0, String.raw`average\left(1,2,3,4,5\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test average function for matrix with symbolic values', async () => {
  await page.setLatex(0, String.raw`\mathrm{average}\left(\begin{bmatrix}a & b\\ c & d\\ ee & f\end{bmatrix}\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\frac{a}{6} + \frac{b}{6} + \frac{c}{6} + \frac{d}{6} + \frac{ee}{6} + \frac{f}{6}`);

  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test average function for column vector with units', async () => {
  await page.setLatex(0, String.raw`\mathrm{average}\left(\begin{bmatrix}1\\ 2\\ 3\end{bmatrix}\cdot1\left\lbrack m\right\rbrack\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);

  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');
});

test('Test average function for row vector with units', async () => {
  await page.setLatex(0, String.raw`\mathrm{average}\left(\begin{bmatrix}1 & 2\end{bmatrix}\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(1.5, precision);

  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test average function with scalar input and inconsistent units', async () => {
  await page.setLatex(0, String.raw`\mathrm{average}\left(1,2\left\lbrack m\right\rbrack,3,4,5\right)=`);
  
  await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeAttached();
});

test('Test stdev function for column vector with units', async () => {
  await page.setLatex(0, String.raw`\mathrm{stdev}\left(\begin{bmatrix}1\\ 2\end{bmatrix}\cdot1\left\lbrack m\right\rbrack\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(sqrt(0.5), precision);

  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');
});

test('Test stdevp function for row vector without units', async () => {
  await page.setLatex(0, String.raw`stdevp\left(\begin{bmatrix}1 & 2\end{bmatrix}\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(0.5, precision);

  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test stdev function with matrix input', async () => {
  await page.setLatex(0, String.raw`\mathrm{stdev}\left(\begin{bmatrix}1 & 2 & 3\\ 4 & 5 & 6\end{bmatrix}\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(1.870828693, 9);

  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test stdevp function with scalar input and units', async () => {
  await page.setLatex(0, String.raw`stdevp\left(1\left\lbrack m\right\rbrack,2\left\lbrack m\right\rbrack,3\left\lbrack m\right\rbrack,4\left\lbrack m\right\rbrack,5\left\lbrack m\right\rbrack,6\left\lbrack m\right\rbrack\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(1.707825128, 9);

  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');
});

test('Test stdev with only one input value', async () => {
  await page.setLatex(0, String.raw`\mathrm{stdev}\left(\begin{bmatrix}1\end{bmatrix}\right)=`);
  
  await expect(page.locator('text=Must have at least 2 values to estimate standard deviation')).toBeAttached();
});
