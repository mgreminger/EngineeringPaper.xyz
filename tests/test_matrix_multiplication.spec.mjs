import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Square multiplication', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\end{bmatrix}\cdot\begin{bmatrix}5 & 6\\ 7 & 8\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 5 a + 7 b & 6 a + 8 b \\ 5 c + 7 d & 6 c + 8 d \end{bmatrix}`);

  // add some numbers for variables that define first matrix
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`a=1,b=2,c=3,d=4`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}`);

  // swap order of multiplication, should not commute
  await page.setLatex(0, String.raw`\begin{bmatrix}5 & 6\\ 7 & 8\end{bmatrix}\cdot\begin{bmatrix}a & b\\ c & d\end{bmatrix}=`);
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 23 & 34 \\ 31 & 46 \end{bmatrix}`);
});

test('Square multiplication with matrix multiplication operator', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\end{bmatrix}\times\begin{bmatrix}5 & 6\\ 7 & 8\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 5 a + 7 b & 6 a + 8 b \\ 5 c + 7 d & 6 c + 8 d \end{bmatrix}`);

  // add some numbers for variables that define first matrix
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`a=1,b=2,c=3,d=4`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}`);

  // swap order of multiplication, should not commute
  await page.setLatex(0, String.raw`\begin{bmatrix}5 & 6\\ 7 & 8\end{bmatrix}\times\begin{bmatrix}a & b\\ c & d\end{bmatrix}=`);
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 23 & 34 \\ 31 & 46 \end{bmatrix}`);
});

test('Square variable matrix times literal matrix using matrix multiplication operator', async () => {
  await page.setLatex(0, String.raw`A\times\begin{bmatrix}5 & 6\\ 7 & 8\end{bmatrix}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`A=\begin{bmatrix}a & b\\ c & d\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 5 a + 7 b & 6 a + 8 b \\ 5 c + 7 d & 6 c + 8 d \end{bmatrix}`);

  // add some numbers for variables that define first matrix
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`a=1,b=2,c=3,d=4`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}`);

  // swap order of multiplication, should not commute
  await page.setLatex(0, String.raw`\begin{bmatrix}5 & 6\\ 7 & 8\end{bmatrix}\times A=`);
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 23 & 34 \\ 31 & 46 \end{bmatrix}`);
});

test('Square variable matrix times variable matrix using matrix multiplication operator', async () => {
  await page.setLatex(0, String.raw`A\times B=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`A=\begin{bmatrix}a & b\\ c & d\end{bmatrix}`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`B=\begin{bmatrix}5 & 6\\ 7 & 8\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 5 a + 7 b & 6 a + 8 b \\ 5 c + 7 d & 6 c + 8 d \end{bmatrix}`);

  // add some numbers for variables that define first matrix
  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`a=1,b=2,c=3,d=4`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}`);

  // swap order of multiplication, should not commute
  await page.setLatex(0, String.raw`B\times A=`);
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 23 & 34 \\ 31 & 46 \end{bmatrix}`);
});

test('Units with square multiplication', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\end{bmatrix}\cdot\begin{bmatrix}5\left\lbrack kg\right\rbrack & 6\left\lbrack kg\right\rbrack\\ 7\left\lbrack kg\right\rbrack & 8\left\lbrack kg\right\rbrack\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 5 a + 7 b & 6 a + 8 b \\ 5 c + 7 d & 6 c + 8 d \end{bmatrix}`);

  // add some numbers for variables that define first matrix
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`a=1\left\lbrack\frac{1}{m^3}\right\rbrack,b=2\left\lbrack\frac{1}{m^3}\right\rbrack,c=3\left\lbrack\frac{1}{m^3}\right\rbrack,d=4\left\lbrack\frac{1}{m^3}\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 19\left\lbrack \frac{kg}{m^{3}}\right\rbrack  & 22\left\lbrack \frac{kg}{m^{3}}\right\rbrack  \\ 43\left\lbrack \frac{kg}{m^{3}}\right\rbrack  & 50\left\lbrack \frac{kg}{m^{3}}\right\rbrack  \end{bmatrix}`);
});

test('Units with square variable matrix times variable matrix using matrix multiplication operator', async () => {
  await page.setLatex(0, String.raw`A\times B=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`A=\begin{bmatrix}a & b\\ c & d\end{bmatrix}`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`B=\begin{bmatrix}5\left\lbrack kg\right\rbrack & 6\left\lbrack kg\right\rbrack\\ 7\left\lbrack kg\right\rbrack & 8\left\lbrack kg\right\rbrack\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 5 a + 7 b & 6 a + 8 b \\ 5 c + 7 d & 6 c + 8 d \end{bmatrix}`);

  // add some numbers for variables that define first matrix
  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`a=1\left\lbrack\frac{1}{m^3}\right\rbrack,b=2\left\lbrack\frac{1}{m^3}\right\rbrack,c=3\left\lbrack\frac{1}{m^3}\right\rbrack,d=4\left\lbrack\frac{1}{m^3}\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 19\left\lbrack \frac{kg}{m^{3}}\right\rbrack  & 22\left\lbrack \frac{kg}{m^{3}}\right\rbrack  \\ 43\left\lbrack \frac{kg}{m^{3}}\right\rbrack  & 50\left\lbrack \frac{kg}{m^{3}}\right\rbrack  \end{bmatrix}`);

  // swap order of multiplication, should not commute
  await page.setLatex(0, String.raw`B\times A=`);
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 23\left\lbrack \frac{kg}{m^{3}}\right\rbrack  & 34\left\lbrack \frac{kg}{m^{3}}\right\rbrack  \\ 31\left\lbrack \frac{kg}{m^{3}}\right\rbrack  & 46\left\lbrack \frac{kg}{m^{3}}\right\rbrack  \end{bmatrix}`);
});

test('Mixed compatible units with square variable matrix times variable matrix using matrix multiplication operator', async () => {
  await page.setLatex(0, String.raw`A\times B=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`A=\begin{bmatrix}a & b\\ c & d\end{bmatrix}`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`B=\begin{bmatrix}5\left\lbrack kg\right\rbrack & 6\left\lbrack kg\right\rbrack\\ 7\left\lbrack kg\right\rbrack & 8\left\lbrack kg\right\rbrack\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 5 a + 7 b & 6 a + 8 b \\ 5 c + 7 d & 6 c + 8 d \end{bmatrix}`);

  // add some numbers for variables that define first matrix
  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`a=1\left\lbrack\frac{1}{m^3}\right\rbrack,b=2\left\lbrack\frac{1}{m^3}\right\rbrack,c=3\left\lbrack\frac{1}{m^3}\right\rbrack,d=4\left\lbrack\frac{1}{m^3}\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 19\left\lbrack \frac{kg}{m^{3}}\right\rbrack  & 22\left\lbrack \frac{kg}{m^{3}}\right\rbrack  \\ 43\left\lbrack \frac{kg}{m^{3}}\right\rbrack  & 50\left\lbrack \frac{kg}{m^{3}}\right\rbrack  \end{bmatrix}`);

  // swap order of multiplication, should not commute
  await page.setLatex(0, String.raw`B\times A=`);
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 23\left\lbrack \frac{kg}{m^{3}}\right\rbrack  & 34\left\lbrack \frac{kg}{m^{3}}\right\rbrack  \\ 31\left\lbrack \frac{kg}{m^{3}}\right\rbrack  & 46\left\lbrack \frac{kg}{m^{3}}\right\rbrack  \end{bmatrix}`);
});

test('Incompatible units with square variable matrix times variable matrix using matrix multiplication operator', async () => {
  await page.setLatex(0, String.raw`A\times B=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`A=\begin{bmatrix}a & b\\ c & d\end{bmatrix}`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`B=\begin{bmatrix}5\left\lbrack kg\right\rbrack & 6\left\lbrack kg\right\rbrack\\ 7\left\lbrack kg\right\rbrack & 8\left\lbrack kg\right\rbrack\end{bmatrix}`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`a=1\left\lbrack\frac{1}{m^3}\right\rbrack,b=2\left\lbrack\frac{1}{m^3}\right\rbrack,c=3\left\lbrack\frac{1}{m^3}\right\rbrack,d=4\left\lbrack\frac{1}{m^2}\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeAttached();
});

test('Incompatible multiplication with matrix variables and matrix multiplication operator', async () => {
  await page.setLatex(0, String.raw`A\times B=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`A=\begin{bmatrix}a & b\\ c & d\end{bmatrix}`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`B=\begin{bmatrix}e_0\\ f\\ g\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('.status-footer >> text=ShapeError')).toBeVisible();
});

test('Incompatible multiplication with matrix literals', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\end{bmatrix}\cdot\begin{bmatrix}e_0\\ f\\ g\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('.status-footer >> text=ShapeError')).toBeVisible();
});

test('Incompatible multiplication with matrix literals and matrix multiplication operator', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\end{bmatrix}\times\begin{bmatrix}e_0\\ f\\ g\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('.status-footer >> text=ShapeError')).toBeVisible();
});

test('Scalar literal times matrix literal', async () => {
  await page.setLatex(0, String.raw`5\cdot\begin{bmatrix}1 & 2\\ 3 & 4\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 5 & 10 \\ 15 & 20 \end{bmatrix}`);

  // change order of scalar-matrix multiplication, should commute
  await page.setLatex(0, String.raw`\begin{bmatrix}1 & 2\\ 3 & 4\end{bmatrix}\cdot 5=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 5 & 10 \\ 15 & 20 \end{bmatrix}`);
});

test('Units with scalar literal times matrix literal', async () => {
  await page.setLatex(0, String.raw`5\left\lbrack s\right\rbrack\cdot\begin{bmatrix}1\left\lbrack m\right\rbrack & 2\left\lbrack kg\right\rbrack\\ 3\left\lbrack radian\right\rbrack & 4\left\lbrack m^2\right\rbrack\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 5\left\lbrack m\cdot s\right\rbrack  & 10\left\lbrack kg\cdot s\right\rbrack  \\ 15\left\lbrack s\cdot rad\right\rbrack  & 20\left\lbrack m^{2}\cdot s\right\rbrack  \end{bmatrix}`);

  // change order of scalar-matrix multiplication, should commute
  await page.setLatex(0, String.raw`\begin{bmatrix}1\left\lbrack m\right\rbrack & 2\left\lbrack kg\right\rbrack\\ 3\left\lbrack radian\right\rbrack & 4\left\lbrack m^2\right\rbrack\end{bmatrix}\cdot 5\left\lbrack s\right\rbrack=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 5\left\lbrack m\cdot s\right\rbrack  & 10\left\lbrack kg\cdot s\right\rbrack  \\ 15\left\lbrack s\cdot rad\right\rbrack  & 20\left\lbrack m^{2}\cdot s\right\rbrack  \end{bmatrix}`);
});

test('Variable scalar times variable matrix', async () => {
  await page.setLatex(0, String.raw`a\cdot A=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`a=5\left\lbrack s\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`A=\begin{bmatrix}1\left\lbrack m\right\rbrack & 2\left\lbrack kg\right\rbrack\\ 3\left\lbrack radian\right\rbrack & 4\left\lbrack m^2\right\rbrack\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 5\left\lbrack m\cdot s\right\rbrack  & 10\left\lbrack kg\cdot s\right\rbrack  \\ 15\left\lbrack s\cdot rad\right\rbrack  & 20\left\lbrack m^{2}\cdot s\right\rbrack  \end{bmatrix}`);

  // change order of scalar-matrix multiplication, should commute
  await page.setLatex(0, String.raw`A\cdot a=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 5\left\lbrack m\cdot s\right\rbrack  & 10\left\lbrack kg\cdot s\right\rbrack  \\ 15\left\lbrack s\cdot rad\right\rbrack  & 20\left\lbrack m^{2}\cdot s\right\rbrack  \end{bmatrix}`);
});

test('Cross product with column vectors and variable entries', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a1\\ a2\\ a3\end{bmatrix}\times\begin{bmatrix}b1\\ b2\\ b3\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} a_{2} b_{3} - a_{3} b_{2} \\ - a_{1} b_{3} + a_{3} b_{1} \\ a_{1} b_{2} - a_{2} b_{1} \end{bmatrix}`);
});

test('Cross product with column vectors and numeric entries', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}1\\ 2\\ 3\end{bmatrix}\times\begin{bmatrix}4\\ 5\\ 6\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} -3 \\ 6 \\ -3 \end{bmatrix}`);
});

test('Cross product with column vectors and numeric entries and units', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}1\left\lbrack m\right\rbrack\\ 2\left\lbrack kg\right\rbrack\\ 3\left\lbrack sec\right\rbrack\end{bmatrix}\times\begin{bmatrix}4\left\lbrack m\right\rbrack\\ 5\left\lbrack kg\right\rbrack\\ 6\left\lbrack sec\right\rbrack\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} -3\left\lbrack kg\cdot s\right\rbrack  \\ 6\left\lbrack m\cdot s\right\rbrack  \\ -3\left\lbrack kg\cdot m\right\rbrack  \end{bmatrix}`);
});

test('Cross product with column vectors and numeric entries and incompatible units', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}1\left\lbrack m\right\rbrack\\ 2\left\lbrack kg\right\rbrack\\ 3\left\lbrack sec\right\rbrack\end{bmatrix}\times\begin{bmatrix}4\left\lbrack m\right\rbrack\\ 5\left\lbrack kg\right\rbrack\\ 6\left\lbrack m\right\rbrack\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('text=Dimension Error')).toBeAttached();
});

test('Cross product with row vectors and symbolic values', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a1 & a2 & a3\end{bmatrix}\times\begin{bmatrix}b1 & b2 & b3\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} a_{2} b_{3} - a_{3} b_{2} & - a_{1} b_{3} + a_{3} b_{1} & a_{1} b_{2} - a_{2} b_{1} \end{bmatrix}`);
});

test('Cross product unit cancellation bug #240', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}1\left\lbrack N\right\rbrack\\ 0\left\lbrack N\right\rbrack\\ 0\left\lbrack N\right\rbrack\end{bmatrix}\times\begin{bmatrix}0\left\lbrack m\right\rbrack\\ 1\left\lbrack m\right\rbrack\\ 0\left\lbrack m\right\rbrack\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0\left\lbrack J\right\rbrack  \\ 0\left\lbrack J\right\rbrack  \\ 1\left\lbrack J\right\rbrack  \end{bmatrix}`);
});

test('Cross product unit cancellation bug #240 with row vectors', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}1\left\lbrack s\right\rbrack\\ 0\left\lbrack s\right\rbrack\\ 0\left\lbrack s\right\rbrack\end{bmatrix}^{\mathrm{T}}\times\begin{bmatrix}0\left\lbrack m\right\rbrack\\ 1\left\lbrack m\right\rbrack\\ 0\left\lbrack m\right\rbrack\end{bmatrix}^{\mathrm{T}}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0\left\lbrack m\cdot s\right\rbrack  & 0\left\lbrack m\cdot s\right\rbrack  & 1\left\lbrack m\cdot s\right\rbrack  \end{bmatrix}`);
});

test('Cross product with variable column vectors', async () => {
  await page.setLatex(0, String.raw`v1\times v2=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`v1\:=\:\begin{bmatrix}a1\\ a2\\ a3\end{bmatrix}`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`v2\:=\:\begin{bmatrix}b1\\ b2\\ b3\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} a_{2} b_{3} - a_{3} b_{2} \\ - a_{1} b_{3} + a_{3} b_{1} \\ a_{1} b_{2} - a_{2} b_{1} \end{bmatrix}`);
});

test('Dot product with column vectors and symbolic entries', async () => {
  await page.setLatex(0, String.raw`\mathrm{dot}\left(\begin{bmatrix}a1\\ a2\\ a3\end{bmatrix},\begin{bmatrix}b1\\ b2\\ b3\end{bmatrix}\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`a_{1} b_{1} + a_{2} b_{2} + a_{3} b_{3}`);
});

test('Dot product with variable column vectors', async () => {
  await page.setLatex(0, String.raw`\mathrm{dot}\left(v1,v2\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`\mathrm{dot}\left(v1^{\mathrm{T}},v2\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\mathrm{dot}\left(v1,v2^{\mathrm{T}}\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\mathrm{dot}\left(v1^{\mathrm{T}},v2^{\mathrm{T}}\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`v1\:=\:\begin{bmatrix}a1\\ a2\\ a3\end{bmatrix}`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`v2\:=\:\begin{bmatrix}b1\\ b2\\ b3\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`a_{1} b_{1} + a_{2} b_{2} + a_{3} b_{3}`);

  content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`a_{1} b_{1} + a_{2} b_{2} + a_{3} b_{3}`);

  content = await page.textContent(`#result-value-2`);
  expect(content).toBe(String.raw`a_{1} b_{1} + a_{2} b_{2} + a_{3} b_{3}`);
});

test('Dot product with incompatible matrix dimensions', async () => {
  await page.setLatex(0, String.raw`\mathrm{dot}\left(\begin{bmatrix}a1\\ a2\\ a3\end{bmatrix},\begin{bmatrix}b1\\ b2\end{bmatrix}\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('text=Dimensions incorrect for dot product')).toBeVisible();
});

test('Dot product with column vectors and numeric entries', async () => {
  await page.setLatex(0, String.raw`\mathrm{dot}\left(\begin{bmatrix}1\\ 2\\ 3\end{bmatrix},\begin{bmatrix}4\\ 5\\ 6\end{bmatrix}\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(32, precision); 
});

test('Dot product with column vectors and numeric entries with units', async () => {
  await page.setLatex(0, String.raw`\mathrm{dot}\left(\begin{bmatrix}1\left\lbrack m\right\rbrack\\ 2\left\lbrack m\right\rbrack\\ 3\left\lbrack m\right\rbrack\end{bmatrix},\begin{bmatrix}4\left\lbrack m\right\rbrack\\ 5\left\lbrack m\right\rbrack\\ 6\left\lbrack m\right\rbrack\end{bmatrix}\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(32, precision); 
  
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^2');
});

