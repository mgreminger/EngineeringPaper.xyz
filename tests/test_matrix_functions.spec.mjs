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