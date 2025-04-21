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

  test('Test finite sum with limit units', async () => {
    await page.setLatex(0, String.raw`\sum_{n=1\left\lbrack m\right\rbrack}^{3\left\lbrack m\right\rbrack}\left(n^2\cdot1\left\lbrack m\right\rbrack\right)=`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeVisible();
  });

  test('Test product with lower limit units', async () => {
    await page.setLatex(0, String.raw`\prod_{x=1\left\lbrack m\right\rbrack}^6\left(x\right)=`);
  
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

  test('Test product using virtual keyboard', async () => {
    await page.locator('button').filter({ hasText: 'n^∫Σ' }).click();
    await page.locator('button').filter({ hasText: '∏' }).click();
    await page.locator('#cell-0 math-field.editable').type('5');
    await page.locator('#cell-0 math-field.editable').press('Tab');
    await page.locator('#cell-0 math-field.editable').type('i');
    await page.locator('#cell-0 math-field.editable').press('Tab');
    await page.locator('#cell-0 math-field.editable').type('1');
    await page.locator('#cell-0 math-field.editable').press('Tab');
    await page.locator('#cell-0 math-field.editable').type('i');
    await page.locator('#cell-0 math-field.editable').press('Tab');
    await page.locator('#cell-0 math-field.editable').type('=');

    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-0');
    expect(parseLatexFloat(content)).toBeCloseTo(120, precision);
    content = await page.textContent('#result-units-0');
    expect(content).toBe('');
  });

  test('Test product with units', async () => {
    await page.setLatex(0, String.raw`\prod_{x=1}^5\left(x\cdot1\left\lbrack m\right\rbrack\right)=`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-0');
    expect(parseLatexFloat(content)).toBeCloseTo(120, precision);
    content = await page.textContent('#result-units-0');
    expect(content).toBe('m^5');
  });

  test('Test product with vector substitution and units', async () => {
    await page.setLatex(0, String.raw`x=\begin{bmatrix}1\\ 2\\ 3\end{bmatrix}\cdot1\left\lbrack m\right\rbrack,\:y=\begin{bmatrix}4\\ 5\\ 6\end{bmatrix}`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`\prod_{i=1}^{count\left(x\right)}\left(x_{i,1}\cdot y_{i,1}\right)=`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-1');
    expect(parseLatexFloat(content)).toBeCloseTo(720, precision);
    content = await page.textContent('#result-units-1');
    expect(content).toBe('m^3');
  });

  test('Test infinite symbolic product', async () => {
    await page.setLatex(0, String.raw`\prod_{n=1}^{\infty}\left(\frac{1}{x\cdot n}\right)=`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-0');
    expect(content).toBe(String.raw`\prod_{n=1}^{\infty} \frac{1}{n \cdot x}`);
  });

  test('Test infinite symbolic product with reserved variable name', async () => {
    await page.setLatex(0, String.raw`\prod_{oo=1}^{\infty}\left(\frac{1}{x\cdot oo}\right)=`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-0');
    expect(content).toBe(String.raw`\prod_{oo=1}^{\infty} \frac{1}{oo \cdot x}`);
  });

  test('Test sum with lower limit that is a number but not an integer', async () => {
    await page.setLatex(0, String.raw`\sum_{n=1.1}^5\left(n\right)=`);

    await expect(page.locator('text=Summation upper and lower limits must evalute to an integer or infinity')).toBeVisible();
  });

  test('Test sum with upper limit that is a number but not an integer', async () => {
    await page.setLatex(0, String.raw`\sum_{n=1}^{5.1}\left(n\right)=`);

    await expect(page.locator('text=Summation upper and lower limits must evalute to an integer or infinity')).toBeVisible();
  });

  test('Test product with lower limit that is a number but not an integer', async () => {
    await page.setLatex(0, String.raw`\prod_{n=1.1}^5\left(n\right)=`);

    await expect(page.locator('text=Product upper and lower limits must evalute to an integer or infinity')).toBeVisible();
  });

  test('Test product with upper limit that is a number but not an integer', async () => {
    await page.setLatex(0, String.raw`\prod_{n=1}^{5.1}\left(n\right)=`);

    await expect(page.locator('text=Product upper and lower limits must evalute to an integer or infinity')).toBeVisible();
  });

  test('Test product with vector substitution and multiple units', async () => {
    await page.setLatex(0, String.raw`A=\begin{bmatrix}1\left\lbrack m\right\rbrack\\ 5\left\lbrack s\right\rbrack\\ 3\end{bmatrix}`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`\prod_{n=1}^3\left(A_{n,1}\right)=`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-1');
    expect(parseLatexFloat(content)).toBeCloseTo(15, precision);
    content = await page.textContent('#result-units-1');
    expect(content).toBe('m^1*s^1');
  });

  test('Test nested product with units', async () => {
    await page.setLatex(0, String.raw`A=\begin{bmatrix}1\left\lbrack m\right\rbrack & 2\left\lbrack s\right\rbrack\\ 3 & 4\\ 5 & 6\end{bmatrix}`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`\prod_{i=1}^{\mathrm{numrows}\left(A\right)}\left(\prod_{j=1}^{\mathrm{numcols}\left(A\right)}\left(A_{i,j}\right)\right)=`);
  
    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-1');
    expect(parseLatexFloat(content)).toBeCloseTo(720, precision);
    content = await page.textContent('#result-units-1');
    expect(content).toBe('m^1*s^1');
  });

  test('Test summation and product with subtraction in limit calculation', async () => {
    await page.setLatex(0, String.raw`C=\begin{bmatrix}1 & 2 & 3\\ 4 & 5 & 6\end{bmatrix}\cdot1\left\lbrack m\right\rbrack`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`\sum_{j=1}^{\mathrm{numcols}\left(C\right)-1}\left(C_{2,j}\right)=`);
  
    await page.locator('#add-math-cell').click();
    await page.setLatex(2, String.raw`\prod_{j=1}^{\mathrm{numcols}\left(C\right)-1}\left(C_{2,j}\right)=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-1');
    expect(parseLatexFloat(content)).toBeCloseTo(9, precision);
    content = await page.textContent('#result-units-1');
    expect(content).toBe('m');

    content = await page.textContent('#result-value-2');
    expect(parseLatexFloat(content)).toBeCloseTo(20, precision);
    content = await page.textContent('#result-units-2');
    expect(content).toBe('m^2');
  });

  test('Test summation and no evaluation with i as iteration variable', async () => {
    await page.setLatex(0, String.raw`\sum_{i=1}^{\infty}\left(\frac{1}{i}\right)=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-0');
    expect(content).toBe('\\infty');
    content = await page.textContent('#result-units-0');
    expect(content).toBe('');
  });


