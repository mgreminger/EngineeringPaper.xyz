import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos, e} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Test finite sum with no units', async () => {
    await page.setLatex(0, String.raw`\sum_{n=0}^4\left(n\cdot2\right)=`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-0');
    expect(parseLatexFloat(content)).toBeCloseTo(20, precision);
    content = await page.textContent('#result-units-0');
    expect(content).toBe('');
  });

  test('Test finite sum with units', async () => {
    await page.setLatex(0, String.raw`\sum_{n=1}^3\left(n\cdot2\left\lbrack m\right\rbrack\right)=`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-0');
    expect(parseLatexFloat(content)).toBeCloseTo(12, precision);
    content = await page.textContent('#result-units-0');
    expect(content).toBe('m');
  });

  test('Test infinte sum with factorial', async () => {
    await page.setLatex(0, String.raw`\sum_{n=0}^{\infty}\left(\frac{2}{n!}\right)=`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-0');
    expect(parseLatexFloat(content)).toBeCloseTo(2*e, precision);
    content = await page.textContent('#result-units-0');
    expect(content).toBe('');
  });

  test('Test sum over vector without units', async () => {
    await page.setLatex(0, String.raw`\sum_{n=1}^{\mathrm{count}\left(B\right)}\left(B_{n,1}\right)=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`B=\begin{bmatrix}1\\ 2\\ 3\end{bmatrix}`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-0');
    expect(parseLatexFloat(content)).toBeCloseTo(6, precision);
    content = await page.textContent('#result-units-0');
    expect(content).toBe('');
  });

  test('Test sum over vector with units', async () => {
    await page.setLatex(0, String.raw`\sum_{n=1}^{\mathrm{count}\left(B\right)}\left(B_{n,1}\right)=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`B=\begin{bmatrix}1\\ 2\\ 3\end{bmatrix}\cdot1\left\lbrack m\right\rbrack=`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-0');
    expect(parseLatexFloat(content)).toBeCloseTo(6, precision);
    content = await page.textContent('#result-units-0');
    expect(content).toBe('m');
  });

  test('Test sum over vector with inconsistent units', async () => {
    await page.setLatex(0, String.raw`\sum_{n=1}^3\left(A_{n,1}\right)=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`A=\begin{bmatrix}1\left\lbrack m\right\rbrack\\ 2\left\lbrack s\right\rbrack\\ 3\left\lbrack kg\right\rbrack\end{bmatrix}`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeVisible();
  });

  test('Test finite sum with consistent limit units', async () => {
    await page.setLatex(0, String.raw`\sum_{n=1\left\lbrack m\right\rbrack}^{3\left\lbrack m\right\rbrack}\left(n^2\cdot1\left\lbrack m\right\rbrack\right)=`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-0');
    expect(parseLatexFloat(content)).toBeCloseTo(14, precision);
    content = await page.textContent('#result-units-0');
    expect(content).toBe('m^3');
  });

  test('Test finite sum with inconsistent limit units', async () => {
    await page.setLatex(0, String.raw`\sum_{n=1\left\lbrack m\right\rbrack}^{3\left\lbrack s\right\rbrack}\left(n^2\cdot1\left\lbrack m\right\rbrack\right)=`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeVisible();
  });

  test('Test sum over vector with limit units', async () => {
    await page.setLatex(0, String.raw`\sum_{n=1\left\lbrack m\right\rbrack}^{3\left\lbrack m\right\rbrack}\left(A_{n,1}\right)=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`A=\begin{bmatrix}1\\ 2\\ 3\end{bmatrix}`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeVisible();
  });

  test('Test finite sum with dummy variable in exponent', async () => {
    await page.setLatex(0, String.raw`\sum_{n=1\left\lbrack m\right\rbrack}^{3\left\lbrack m\right\rbrack}\left(2^{n}\right)=`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeVisible();
  });

  test('Test nested sum', async () => {
    await page.setLatex(0, String.raw`\sum_{i=1}^{\mathrm{count}\left(A\right)}\left(\sum_{j=1}^{\mathrm{count}\left(B\right)}\left(A_{i,1}\cdot B_{1,j}\right)\right)=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`A=\begin{bmatrix}a\\ b\end{bmatrix}`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(2, String.raw`B=\begin{bmatrix}c & d\end{bmatrix}`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-0');
    expect(content).toBe(String.raw`a \cdot c + a \cdot d + b \cdot c + b \cdot d`);
  });

