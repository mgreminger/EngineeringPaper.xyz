import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => {await newSheet(page)});

test('Indexing square and nonsquare matrix literals', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\\ e & f\end{bmatrix}_{1,1}+\begin{bmatrix}a & b\\ c & d\end{bmatrix}_{1,2}+\begin{bmatrix}a & b & c\\ d & e & f\end{bmatrix}_{2,1}+\begin{bmatrix}a & b & c\\ d & e & f\end{bmatrix}_{2,3}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`a + b + d + f`);
});

test('Indexing with variable mathematical expression indices', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\\ e & f\end{bmatrix}_{3-2,a3-a2}+\begin{bmatrix}a & b\\ c & d\end{bmatrix}_{a2-1,\frac{a8}{a4}}+\begin{bmatrix}a & b & c\\ d & e & f\end{bmatrix}_{a10\cdot\frac{a2}{a10},\frac42-1}+\begin{bmatrix}a & b & c\\ d & e & f\end{bmatrix}_{a2,a3}=`);
  await page.locator('#add-math-cell').click();

  await page.setLatex(1, String.raw`a1=1,\:a2=2,\:a3=3,\:a4=4,\:a5=5,\:a6=6,a7=7,a8=8,a9=9,a10=10`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`a + b + d + f`);
});

test('Indexing variable matrices', async () => {
  await page.setLatex(0, String.raw`A_{3-2,a3-a2}+B_{a2-1,\frac{a8}{a4}}+C_{a10\cdot\frac{a2}{a10},\frac42-1}+D_{2,3}=`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`a1=1,\:a2=2,\:a3=3,\:a4=4,\:a5=5,\:a6=6,a7=7,a8=8,a9=9,a10=10`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`A=\begin{bmatrix}a & b\\ c & d\\ e & f\end{bmatrix}`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`B=\begin{bmatrix}a & b\\ c & d\end{bmatrix}`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`C=\begin{bmatrix}a & b & c\\ d & e & f\end{bmatrix}`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`D=\begin{bmatrix}a & b & c\\ d & e & f\end{bmatrix}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`a + b + d + f`);
});

test('Indexing variable matrices with units', async () => {
  await page.setLatex(0, String.raw`A_{3-2,a3-a2}+B_{a2-1,\frac{a8}{a4}}+C_{a10\cdot\frac{a2}{a10},\frac42-1}+D_{2,3}=`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`a1=1,\:a2=2,\:a3=3,\:a4=4,\:a5=5,\:a6=6,a7=7,a8=8,a9=9,a10=10`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`A=\begin{bmatrix}a & b\\ c & d\\ e & f\end{bmatrix}`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`B=\begin{bmatrix}a & b\\ c & d\end{bmatrix}`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`C=\begin{bmatrix}a & b & c\\ d & e & f\end{bmatrix}`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`D=\begin{bmatrix}a & b & c\\ d & e & f\end{bmatrix}`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(6, String.raw`a=1\left\lbrack m\right\rbrack,\:b=2\left\lbrack m\right\rbrack,\:d=3\left\lbrack m\right\rbrack,\:f=4\left\lbrack m\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(10, precision); 
  
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');
});

test('Zero index', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\\ e & f\end{bmatrix}_{0,1}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator("text=Matrix indices must evaluate to a finite real integer and be greater than 0")).toBeVisible();
});

test('Negative index', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\\ e & f\end{bmatrix}_{1,-1}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator("text=Matrix indices must evaluate to a finite real integer and be greater than 0")).toBeVisible();
});

test('Out of range index', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\\ e & f\end{bmatrix}_{1,3}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator("text=Index out of range")).toBeVisible();
});

test('Noninteger index', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\\ e & f\end{bmatrix}_{1,1.1}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator("text=Matrix indices must evaluate to a finite real integer and be greater than 0")).toBeVisible();
});

test('Nonnumeric index', async () => {
  await page.setLatex(0, String.raw`\begin{bmatrix}a & b\\ c & d\\ e & f\end{bmatrix}_{1,z}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`{\left[\begin{matrix}a & b\\c & d\\e & f\end{matrix}\right]}_{0,z - 1}`);
});

test('Indexing with expression', async () => {
  await page.setLatex(0, String.raw`A=\begin{bmatrix}1\left\lbrack m\right\rbrack\\ 2\left\lbrack s\right\rbrack\\ 3\left\lbrack kg\right\rbrack\end{bmatrix}`);
  
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`A_{\mathrm{count}\left(A\right),1}=`);
  
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`A_{\mathrm{count}\left(A\right)-1,1}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`A_{\frac{1\left\lbrack m\right\rbrack}{1\left\lbrack m\right\rbrack},1}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`A_{\frac{1\left\lbrack m\right\rbrack}{1\left\lbrack s\right\rbrack},1}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-1`);
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision); 
  content = await page.textContent('#result-units-1');
  expect(content).toBe('kg');

  content = await page.textContent(`#result-value-2`);
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision); 
  content = await page.textContent('#result-units-2');
  expect(content).toBe('s');

  content = await page.textContent(`#result-value-3`);
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision); 
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m');

  await expect(page.locator('#cell-4 >> text=Matrix indexing value is not dimensionless')).toBeVisible();
});

test('Slicing cols with units', async () => {
  await page.setLatex(0, String.raw`A=\begin{bmatrix}1 & 2 & 3\\ 4 & 5 & 6\\ 7 & 8 & 9\\ 10 & 11 & 12\end{bmatrix}\cdot1\left\lbrack s\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`A_{2,:}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`A_{2,1:end}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`A_{end,1:end}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`A_{2,1:2:end}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`A_{3,end:-1:1}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(6, String.raw`A_{3,end:-1:2}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(7, String.raw`A_{3,end-1:-1:2}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(content).toBe(String.raw`\begin{bmatrix} 4\left\lbrack s\right\rbrack  & 5\left\lbrack s\right\rbrack  & 6\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#result-value-2');
  expect(content).toBe(String.raw`\begin{bmatrix} 4\left\lbrack s\right\rbrack  & 5\left\lbrack s\right\rbrack  & 6\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#result-value-3');
  expect(content).toBe(String.raw`\begin{bmatrix} 10\left\lbrack s\right\rbrack  & 11\left\lbrack s\right\rbrack  & 12\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#result-value-4');
  expect(content).toBe(String.raw`\begin{bmatrix} 4\left\lbrack s\right\rbrack  & 6\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#result-value-5');
  expect(content).toBe(String.raw`\begin{bmatrix} 9\left\lbrack s\right\rbrack  & 8\left\lbrack s\right\rbrack  & 7\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#result-value-6');
  expect(content).toBe(String.raw`\begin{bmatrix} 9\left\lbrack s\right\rbrack  & 8\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-7`);
  expect(parseLatexFloat(content)).toBeCloseTo(8, precision); 
  content = await page.textContent('#result-units-7');
  expect(content).toBe('s');
});

test('Slicing rows with units', async () => {
  await page.setLatex(0, String.raw`A=\begin{bmatrix}1 & 2 & 3\\ 4 & 5 & 6\\ 7 & 8 & 9\\ 10 & 11 & 12\end{bmatrix}\cdot1\left\lbrack s\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`A_{:,2}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`A_{1:end,2}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`A_{1:end,end}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`A_{1:2:end,2}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`A_{end:-1:1,3}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(6, String.raw`A_{end-1:-1:2,3}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(7, String.raw`A_{end-1:-1:3,3}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(content).toBe(String.raw`\begin{bmatrix} 2\left\lbrack s\right\rbrack  \\ 5\left\lbrack s\right\rbrack  \\ 8\left\lbrack s\right\rbrack  \\ 11\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#result-value-2');
  expect(content).toBe(String.raw`\begin{bmatrix} 2\left\lbrack s\right\rbrack  \\ 5\left\lbrack s\right\rbrack  \\ 8\left\lbrack s\right\rbrack  \\ 11\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#result-value-3');
  expect(content).toBe(String.raw`\begin{bmatrix} 3\left\lbrack s\right\rbrack  \\ 6\left\lbrack s\right\rbrack  \\ 9\left\lbrack s\right\rbrack  \\ 12\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#result-value-4');
  expect(content).toBe(String.raw`\begin{bmatrix} 2\left\lbrack s\right\rbrack  \\ 8\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#result-value-5');
  expect(content).toBe(String.raw`\begin{bmatrix} 12\left\lbrack s\right\rbrack  \\ 9\left\lbrack s\right\rbrack  \\ 6\left\lbrack s\right\rbrack  \\ 3\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#result-value-6');
  expect(content).toBe(String.raw`\begin{bmatrix} 9\left\lbrack s\right\rbrack  \\ 6\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-7`);
  expect(parseLatexFloat(content)).toBeCloseTo(9, precision); 
  content = await page.textContent('#result-units-7');
  expect(content).toBe('s');
});

test('Assembling matrices', async () => {
  await page.setLatex(0, String.raw`a=\begin{bmatrix}1\\ 2\end{bmatrix},\:b=\begin{bmatrix}3\\ 4\\ 5\end{bmatrix},A=\begin{bmatrix}1 & 2\\ 3 & 4\end{bmatrix},B=\begin{bmatrix}5 & 6\\ 7 & 8\end{bmatrix},C=\begin{bmatrix}9 & 10\\ 11 & 12\end{bmatrix},D=\begin{bmatrix}13 & 14\\ 15 & 16\end{bmatrix}`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`\begin{bmatrix}a\\ b\end{bmatrix}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\begin{bmatrix}a^{\mathrm{T}} & b^{\mathrm{T}}\end{bmatrix}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\begin{bmatrix}A & B\\ C & D\end{bmatrix}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`\begin{bmatrix}A\\ B\end{bmatrix}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`\begin{bmatrix}C & D\end{bmatrix}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(6, String.raw`\begin{bmatrix}A & a\end{bmatrix}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(7, String.raw`\begin{bmatrix}A\\ a^{\mathrm{T}}\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \\ 4 \\ 5 \end{bmatrix}`);

  content = await page.textContent('#result-value-2');
  expect(content).toBe(String.raw`\begin{bmatrix} 1 & 2 & 3 & 4 & 5 \end{bmatrix}`);

  content = await page.textContent('#result-value-3');
  expect(content).toBe(String.raw`\begin{bmatrix} 1 & 2 & 5 & 6 \\ 3 & 4 & 7 & 8 \\ 9 & 10 & 13 & 14 \\ 11 & 12 & 15 & 16 \end{bmatrix}`);

  content = await page.textContent('#result-value-4');
  expect(content).toBe(String.raw`\begin{bmatrix} 1 & 2 \\ 3 & 4 \\ 5 & 6 \\ 7 & 8 \end{bmatrix}`);

  content = await page.textContent('#result-value-5');
  expect(content).toBe(String.raw`\begin{bmatrix} 9 & 10 & 13 & 14 \\ 11 & 12 & 15 & 16 \end{bmatrix}`);

  content = await page.textContent('#result-value-6');
  expect(content).toBe(String.raw`\begin{bmatrix} 1 & 2 & 1 \\ 3 & 4 & 2 \end{bmatrix}`);

  content = await page.textContent('#result-value-7');
  expect(content).toBe(String.raw`\begin{bmatrix} 1 & 2 \\ 3 & 4 \\ 1 & 2 \end{bmatrix}`);

  // check error for mismatched matrices
  await page.setLatex(7, String.raw`\begin{bmatrix}a & b\end{bmatrix}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('text=mismatched dimensions')).toBeVisible();
});
