import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Matrix addition', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\end{bmatrix}+\begin{bmatrix}5 & 6\\ 7 & 8\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} a + 5 & b + 6 \\ c + 7 & d + 8 \end{bmatrix}`);

  // add some numbers for variables that define first matrix
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`a=1,b=2,c=3,d=4`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 6 & 8 \\ 10 & 12 \end{bmatrix}`);
});

test('Matrix subtraction', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\end{bmatrix}-\begin{bmatrix}5 & 6\\ 7 & 8\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} a - 5 & b - 6 \\ c - 7 & d - 8 \end{bmatrix}`);

  // add some numbers for variables that define first matrix
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`a=1,b=2,c=3,d=4`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} -4 & -4 \\ -4 & -4 \end{bmatrix}`);
});

test('Matrix addition with units', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\end{bmatrix}+\begin{bmatrix}5\left\lbrack m\right\rbrack & 6\left\lbrack s\right\rbrack\\ 7\left\lbrack kg\right\rbrack & 8\left\lbrack radian\right\rbrack\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} a + 5 & b + 6 \\ c + 7 & d + 8 \end{bmatrix}`);

  // add some numbers for variables that define first matrix
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`a=1\left\lbrack m\right\rbrack,b=2\left\lbrack s\right\rbrack,c=3\left\lbrack kg\right\rbrack,d=4\left\lbrack radian\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 6\left\lbrack m\right\rbrack  & 8\left\lbrack s\right\rbrack  \\ 10\left\lbrack kg\right\rbrack  & 12\left\lbrack rad\right\rbrack  \end{bmatrix}`);
});

test('Matrix addition with incompatible units', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\end{bmatrix}+\begin{bmatrix}5\left\lbrack m\right\rbrack & 6\left\lbrack s\right\rbrack\\ 7\left\lbrack kg\right\rbrack & 8\left\lbrack radian\right\rbrack\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} a + 5 & b + 6 \\ c + 7 & d + 8 \end{bmatrix}`);

  // add some numbers for variables that define first matrix
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`a=1\left\lbrack s\right\rbrack,b=2\left\lbrack s\right\rbrack,c=3\left\lbrack kg\right\rbrack,d=4\left\lbrack radian\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeAttached();
});

test('Test subtraction with units', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\end{bmatrix}-\begin{bmatrix}5\left\lbrack m\right\rbrack & 6\left\lbrack s\right\rbrack\\ 7\left\lbrack kg\right\rbrack & 8\left\lbrack radian\right\rbrack\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} a - 5 & b - 6 \\ c - 7 & d - 8 \end{bmatrix}`);

  // add some numbers for variables that define first matrix
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`a=1\left\lbrack m\right\rbrack,b=2\left\lbrack s\right\rbrack,c=3\left\lbrack kg\right\rbrack,d=4\left\lbrack radian\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} -4\left\lbrack m\right\rbrack  & -4\left\lbrack s\right\rbrack  \\ -4\left\lbrack kg\right\rbrack  & -4\left\lbrack rad\right\rbrack  \end{bmatrix}`);
});

test('Incompatible size addition', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\\ e & f\end{bmatrix}+\begin{bmatrix}5\left\lbrack m\right\rbrack & 6\left\lbrack s\right\rbrack\\ 7\left\lbrack kg\right\rbrack & 8\left\lbrack radian\right\rbrack\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('.status-footer >> text=ShapeError')).toBeVisible();
});

test('nonsquare addition', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\\ e_0 & f\end{bmatrix}+\begin{bmatrix}1\left\lbrack m\right\rbrack & 2\left\lbrack s\right\rbrack\\ 3\left\lbrack kg\right\rbrack & 4\left\lbrack radian\right\rbrack\\ 5\left\lbrack kelvin\right\rbrack & 6\left\lbrack ampere\right\rbrack\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} a + 1 & b + 2 \\ c + 3 & d + 4 \\ e_{0} + 5 & f + 6 \end{bmatrix}`);

  // add some numbers for variables that define first matrix
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`a=6\left\lbrack m\right\rbrack,\:b=5\left\lbrack s\right\rbrack,\:c=4\left\lbrack kg\right\rbrack,d=3\left\lbrack radian\right\rbrack,e_0=2\left\lbrack K\right\rbrack,f=1\left\lbrack A\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 7\left\lbrack m\right\rbrack  & 7\left\lbrack s\right\rbrack  \\ 7\left\lbrack kg\right\rbrack  & 7\left\lbrack rad\right\rbrack  \\ 7\left\lbrack K\right\rbrack  & 7\left\lbrack A\right\rbrack  \end{bmatrix}`);
});

test('Addition with literal and variable matrices', async () => {
  await page.setLatex(0, String.raw`A+\begin{bmatrix}5\left\lbrack m\right\rbrack & 6\left\lbrack s\right\rbrack\\ 7\left\lbrack kg\right\rbrack & 8\left\lbrack radian\right\rbrack\end{bmatrix}=`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`$$ A=\begin{bmatrix}a & b\\ c & d\end{bmatrix} $$`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} a + 5 & b + 6 \\ c + 7 & d + 8 \end{bmatrix}`);

  // add some numbers for variables that define first matrix
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`a=1\left\lbrack m\right\rbrack,b=2\left\lbrack s\right\rbrack,c=3\left\lbrack kg\right\rbrack,d=4\left\lbrack radian\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 6\left\lbrack m\right\rbrack  & 8\left\lbrack s\right\rbrack  \\ 10\left\lbrack kg\right\rbrack  & 12\left\lbrack rad\right\rbrack  \end{bmatrix}`);
});

test('Addition with two variable matrices', async () => {
  await page.setLatex(0, String.raw`A+B=`);
  
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`A=\begin{bmatrix}a & b\\ c & d\end{bmatrix}`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`B=\begin{bmatrix}5\left\lbrack m\right\rbrack & 6\left\lbrack s\right\rbrack\\ 7\left\lbrack kg\right\rbrack & 8\left\lbrack radian\right\rbrack\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} a + 5 & b + 6 \\ c + 7 & d + 8 \end{bmatrix}`);

  // add some numbers for variables that define first matrix
  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`a=1\left\lbrack m\right\rbrack,b=2\left\lbrack s\right\rbrack,c=3\left\lbrack kg\right\rbrack,d=4\left\lbrack radian\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 6\left\lbrack m\right\rbrack  & 8\left\lbrack s\right\rbrack  \\ 10\left\lbrack kg\right\rbrack  & 12\left\lbrack rad\right\rbrack  \end{bmatrix}`);
});

test('Addition scalar and variable matrix', async () => {
  // Ideally would generate an error, however sympy generates a symbolic result
  // sympy won't generate a numerical result so it will be clear to the user what is happening
  await page.setLatex(0, String.raw`1+A=`);
  
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`A=\begin{bmatrix}1 & 2\\ 3 & 4\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`1 + \left[\begin{matrix}1 & 2\\3 & 4\end{matrix}\right]`);
});

test('Addition scalar and literal matrix', async () => {
  // Ideally would generate an error, however sympy generates a symbolic result
  // sympy won't generate a numerical result so it will be clear to the user what is happening
  await page.setLatex(0, String.raw`1+\begin{bmatrix}1 & 2\\ 3 & 4\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`1 + \left[\begin{matrix}1 & 2\\3 & 4\end{matrix}\right]`);
});
