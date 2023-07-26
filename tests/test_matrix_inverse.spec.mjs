import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Matrix inverse numeric', async () => {
    await page.setLatex(0, String.raw`\mathrm{inv}\left(\begin{bmatrix}2 & 3\\ 1 & 2\end{bmatrix}\right)=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    let content = await page.textContent(`#result-value-0`);
    expect(content).toBe(String.raw`\begin{bmatrix} 2 & -3 \\ -1 & 2 \end{bmatrix}`);
  });

  test('Matrix inverse numeric with units', async () => {
    await page.setLatex(0, String.raw`\mathrm{inv}\left(\begin{bmatrix}2\left\lbrack m\right\rbrack & 3\left\lbrack m\right\rbrack\\ 1\left\lbrack m\right\rbrack & 2\left\lbrack m\right\rbrack\end{bmatrix}\right)=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    let content = await page.textContent(`#result-value-0`);
    expect(content).toBe(String.raw`\begin{bmatrix} 2\left\lbrack \frac{1}{m}\right\rbrack  & -3\left\lbrack \frac{1}{m}\right\rbrack  \\ -1\left\lbrack \frac{1}{m}\right\rbrack  & 2\left\lbrack \frac{1}{m}\right\rbrack  \end{bmatrix}`);
  });

  test('Matrix exponent inverse numeric with units', async () => {
    await page.setLatex(0, String.raw`\begin{bmatrix}2\left\lbrack m\right\rbrack & 3\left\lbrack m\right\rbrack\\ 1\left\lbrack m\right\rbrack & 2\left\lbrack m\right\rbrack\end{bmatrix}^{-1}=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    let content = await page.textContent(`#result-value-0`);
    expect(content).toBe(String.raw`\begin{bmatrix} 2\left\lbrack \frac{1}{m}\right\rbrack  & -3\left\lbrack \frac{1}{m}\right\rbrack  \\ -1\left\lbrack \frac{1}{m}\right\rbrack  & 2\left\lbrack \frac{1}{m}\right\rbrack  \end{bmatrix}`);
  });

  test('Matrix inverse with variable matrix', async () => {
    await page.setLatex(0, String.raw`inv\left(A\right)=`);
    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`A^{-1}=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    let content = await page.textContent(`#result-value-1`);
    expect(content).toBe(String.raw`\begin{bmatrix} 2 & -3 \\ -1 & 2 \end{bmatrix}`);
  });

  test('Matrix exponent inverse with variable matrix', async () => {
    await page.setLatex(0, String.raw`A=\begin{bmatrix}2 & 3\\ 1 & 2\end{bmatrix}`);
    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`A^{-1}=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    let content = await page.textContent(`#result-value-1`);
    expect(content).toBe(String.raw`\begin{bmatrix} 2 & -3 \\ -1 & 2 \end{bmatrix}`);
  });

  test('Matrix inverse with mixed units', async () => {
    await page.setLatex(0, String.raw`\mathrm{inv}\left(\begin{bmatrix}2\left\lbrack m\right\rbrack & 3\left\lbrack s\right\rbrack\\ 1\left\lbrack m\right\rbrack & 2\left\lbrack s\right\rbrack\end{bmatrix}\right)=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    let content = await page.textContent(`#result-value-0`);
    expect(content).toBe(String.raw`\begin{bmatrix} 2\left\lbrack \frac{1}{m}\right\rbrack  & -3\left\lbrack \frac{1}{m}\right\rbrack  \\ -1\left\lbrack Hz\right\rbrack  & 2\left\lbrack Hz\right\rbrack  \end{bmatrix}`);
  });
  
  test('Matrix inverse exponent with mixed units', async () => {
    await page.setLatex(0, String.raw`\begin{bmatrix}2\left\lbrack m\right\rbrack & 3\left\lbrack s\right\rbrack\\ 1\left\lbrack m\right\rbrack & 2\left\lbrack s\right\rbrack\end{bmatrix}^{-1}=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    let content = await page.textContent(`#result-value-0`);
    expect(content).toBe(String.raw`\begin{bmatrix} 2\left\lbrack \frac{1}{m}\right\rbrack  & -3\left\lbrack \frac{1}{m}\right\rbrack  \\ -1\left\lbrack Hz\right\rbrack  & 2\left\lbrack Hz\right\rbrack  \end{bmatrix}`);
  });

  test('Matrix inverse with inconsistent units', async () => {
    await page.setLatex(0, String.raw`\mathrm{inv}\left(\begin{bmatrix}2\left\lbrack m\right\rbrack & 3\left\lbrack s\right\rbrack\\ 1\left\lbrack s\right\rbrack & 2\left\lbrack s\right\rbrack\end{bmatrix}\right)=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeAttached();
  });

  test('Matrix inverse exponent with inconsistent units', async () => {
    await page.setLatex(0, String.raw`\begin{bmatrix}2\left\lbrack m\right\rbrack & 3\left\lbrack s\right\rbrack\\ 1\left\lbrack s\right\rbrack & 2\left\lbrack s\right\rbrack\end{bmatrix}^{-1}=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeAttached();
  });

  test('Matrix inverse keyboard entry', async () => {
    await page.locator('#cell-0 >> math-field.editable').type('1[m]*inv([2,2');
    await page.locator('#cell-0 >> math-field.editable').press('Enter');
    await page.locator('#cell-0 >> math-field.editable').type('2');
    await page.locator('#cell-0 >> math-field.editable').press('Tab');
    await page.locator('#cell-0 >> math-field.editable').type('3');
    await page.locator('#cell-0 >> math-field.editable').press('Tab');
    await page.locator('#cell-0 >> math-field.editable').type('1');
    await page.locator('#cell-0 >> math-field.editable').press('Tab');
    await page.locator('#cell-0 >> math-field.editable').type('2');
    await page.locator('#cell-0 >> math-field.editable').press('Tab');
    await page.locator('#cell-0 >> math-field.editable').press('Tab');

    await page.locator('#cell-0 >> math-field.editable').type('@');

    await page.locator('#cell-0 >> math-field.editable').type('[2,2');
    await page.locator('#cell-0 >> math-field.editable').press('Enter');
    await page.locator('#cell-0 >> math-field.editable').type('2[m]');
    await page.locator('#cell-0 >> math-field.editable').press('Tab');
    await page.locator('#cell-0 >> math-field.editable').type('-3[m]');
    await page.locator('#cell-0 >> math-field.editable').press('Tab');
    await page.locator('#cell-0 >> math-field.editable').type('-1[m]');
    await page.locator('#cell-0 >> math-field.editable').press('Tab');
    await page.locator('#cell-0 >> math-field.editable').type('2[m]');

    await page.locator('#cell-0 >> math-field.editable').press('ArrowRight');
    await page.locator('#cell-0 >> math-field.editable').type('^-1');

    await page.locator('#cell-0 >> math-field.editable').press('Tab');
    await page.locator('#cell-0 >> math-field.editable').type('=');

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    let content = await page.textContent(`#result-value-0`);
    expect(content).toBe(String.raw`\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}`);
  });



