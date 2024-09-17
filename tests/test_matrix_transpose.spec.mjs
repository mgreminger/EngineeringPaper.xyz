import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Matrix transpose numeric using function', async () => {
  await page.setLatex(0, String.raw`\mathrm{transpose}\left(\begin{bmatrix}1 & 2\\ 3 & 4\end{bmatrix}\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}`);
});

test('Matrix tranpose with units using transpose notation', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}1\left\lbrack m\right\rbrack & 2\left\lbrack m\right\rbrack\\ 3\left\lbrack m\right\rbrack & 4\left\lbrack m\right\rbrack\end{bmatrix}^{\mathrm{T}}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1\left\lbrack m\right\rbrack  & 3\left\lbrack m\right\rbrack  \\ 2\left\lbrack m\right\rbrack  & 4\left\lbrack m\right\rbrack  \end{bmatrix}`);
});

test('Matrix transpose with mixed units', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}1\left\lbrack m\right\rbrack & 2\left\lbrack m^2\right\rbrack\\ 3\left\lbrack m^3\right\rbrack & 4\left\lbrack m^4\right\rbrack\end{bmatrix}^{\mathrm{T}}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1\left\lbrack m\right\rbrack  & 3\left\lbrack m^3\right\rbrack  \\ 2\left\lbrack m^2\right\rbrack  & 4\left\lbrack m^{4}\right\rbrack  \end{bmatrix}`);
});

test('Matrix transpose with variable matrix and using keyboard shortcut', async () => {
  await page.setLatex(0, String.raw`A=\begin{bmatrix}1 & 2\\ 3 & 4\end{bmatrix}`);
  await page.locator('#add-math-cell').click();
  await page.locator('#cell-1 >> math-field.editable').type("A'=");

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}`);
});

test('Column and row matrix transpose', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a\\ b\end{bmatrix}^{\mathrm{T}}\times\begin{bmatrix}c & d\end{bmatrix}^{\mathrm{T}}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe('\\begin{bmatrix} a \\cdot c + b \\cdot d \\end{bmatrix}');
});