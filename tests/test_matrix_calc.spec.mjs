import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Defininte integral', async () => {
  await page.setLatex(0, String.raw`\int_0^1\left(\begin{bmatrix}x & x^2\\ x^3 & x^4\end{bmatrix}\right)\mathrm{d}\left(x\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0.5 & 0.333333333333333 \\ 0.25 & 0.2 \end{bmatrix}`);
});

test('Indefininte integral', async () => {
  await page.setLatex(0, String.raw`\int\left(\begin{bmatrix}x & x^2\\ x^3 & x^4\end{bmatrix}\right)\mathrm{d}\left(x\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} \frac{x^{2}}{2} & \frac{x^{3}}{3} \\ \frac{x^{4}}{4} & \frac{x^{5}}{5} \end{bmatrix}`);
});

test('Derivative', async () => {
  await page.setLatex(0, String.raw`\frac{\mathrm{d}}{\mathrm{d}\left(x\right)}\left(\begin{bmatrix}x & x^2\\ x^3 & x^4\end{bmatrix}\right)=`);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe('\\begin{bmatrix} 1 & 2 \\cdot x \\\\ 3 \\cdot x^{2} & 4 \\cdot x^{3} \\end{bmatrix}');
});