import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));


test('Determinant of matrix literal using keyboard entry', async () => {
  await page.locator('#cell-0 >> math-field.editable').type("det([2,2");
  await page.locator('#cell-0 >> math-field.editable').press("Enter");
  await page.locator('#cell-0 >> math-field.editable').type("1");
  await page.locator('#cell-0 >> math-field.editable').press("Tab");
  await page.locator('#cell-0 >> math-field.editable').type("2");
  await page.locator('#cell-0 >> math-field.editable').press("Tab");
  await page.locator('#cell-0 >> math-field.editable').type("3");
  await page.locator('#cell-0 >> math-field.editable').press("Tab");
  await page.locator('#cell-0 >> math-field.editable').type("4");
  await page.locator('#cell-0 >> math-field.editable').press("Tab");
  await page.locator('#cell-0 >> math-field.editable').press("Tab");
  await page.locator('#cell-0 >> math-field.editable').type("=");

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(-2, precision); 
});

test('Determinant of large matrix with units', async () => {
  await page.setLatex(0, String.raw`\mathrm{det}\left(\begin{bmatrix}1\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack\\ 0\left\lbrack m\right\rbrack & 1\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack\\ 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 1\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack\\ 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 1\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack\\ 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 1\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack\\ 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 1\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack\\ 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 1\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack\\ 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 1\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack\\ 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 1\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack\\ 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 0\left\lbrack m\right\rbrack & 1\left\lbrack m\right\rbrack\end{bmatrix}\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision); 
  
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^10');
});

test('Determinant of matrix literal with symbolic entries', async () => {
  await page.setLatex(0, String.raw`\mathrm{det}\left(\begin{bmatrix}a & b\\ c & d\end{bmatrix}\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe('a \\cdot d - b \\cdot c'); 
});

test('Determinant of nonsquare matrix', async () => {
  await page.setLatex(0, String.raw`\mathrm{det}\left(\begin{bmatrix}1 & 2\\ 3 & 4\\ 5 & 6\end{bmatrix}\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('text=NonSquareMatrixError')).toBeVisible();
});

test('Determinant of variable matrix', async () => {
  await page.locator('#cell-0 >> math-field.editable').type("det(A)=");
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`A=\begin{bmatrix}a & b\\ c & d\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe('a \\cdot d - b \\cdot c'); 
});

test('Determinant of variable matrix with units', async () => {
  await page.locator('#cell-0 >> math-field.editable').type("det(A)=");
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`A=\begin{bmatrix}a & b\\ c & d\end{bmatrix}`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`a=1\left\lbrack m\right\rbrack,\:b=2\left\lbrack m\right\rbrack,\:c=3\left\lbrack m\right\rbrack,\:d=4\left\lbrack m\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(-2, precision); 
  
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^2');
});

test('Determinant of variable matrix consistent mixed units', async () => {
  await page.locator('#cell-0 >> math-field.editable').type("det(A)=");
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`A=\begin{bmatrix}a & b\\ c & d\end{bmatrix}`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`a=1\left\lbrack m\right\rbrack,\:b=2\left\lbrack m^2\right\rbrack,\:c=3\left\lbrack m\right\rbrack,\:d=4\left\lbrack m^2\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(-2, precision); 
  
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^3');
});

test('Determinant of variable matrix inconsistent mixed units', async () => {
  await page.locator('#cell-0 >> math-field.editable').type("det(A)=");
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`A=\begin{bmatrix}a & b\\ c & d\end{bmatrix}`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`a=1\left\lbrack m\right\rbrack,\:b=2\left\lbrack m^2\right\rbrack,\:c=3\left\lbrack m\right\rbrack,\:d=4\left\lbrack m^3\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator("#cell-0 >> text=Dimension Error")).toBeAttached();
});

