import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => {await newSheet(page)});

test('Scalar any input and unitless output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();

  await page.locator('#cell-0 math-field.editable').type('CodeFunc1(1)=');

  await page.locator('#add-math-cell').click();
  await page.locator('#cell-2 math-field.editable').type('CodeFunc1(2[m])=');

  await page.locator('#add-math-cell').click();
  await page.locator('#cell-3 math-field.editable').type('CodeFunc1(4[m])=');

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`def calculate(input):\nreturn 4*input`);

  await expect(page.locator('.status-footer')).not.toBeVisible();

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(8, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('');

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(16, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('');
});

test('Scalar inputs with units on first input and unitless output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`NewFunc\left(\left\lbrack m\right\rbrack,\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{NewFunc}\left(1,2\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`NewFunc\left(2\left\lbrack km\right\rbrack,3\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\mathrm{NewFunc}\left(4\left\lbrack s\right\rbrack,5\right)=`)

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`\mathrm{NewFunc}\left(5\left\lbrack km\right\rbrack,6\left\lbrack km\right\rbrack\right)=`)

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`def calculate(input1, input2):\nreturn input1*input2`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error: Incorrect units for input number 1')).toBeVisible();

  let content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(6000, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('');

  await expect(page.locator('#cell-3 >> text=Dimension Error: Incorrect units for input number 1')).toBeVisible();

  content = await page.textContent('#result-value-4');
  expect(parseLatexFloat(content)).toBeCloseTo(3e7, precision);
  content = await page.textContent('#result-units-4');
  expect(content).toBe('');
});

test('Copy code function name to clipboard', async ({ browserName }) => {
  test.skip(browserName === "chromium", "Chromium does always support navigator.clipboard.writeText in headless mode");

  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.waitForSelector('.status-footer', {state: 'detached'});
  await page.getByLabel('Copy Function Name to').click();

  await page.locator('#cell-0 math-field.editable').press(`${modifierKey}+v`);
  await page.locator('#cell-0 math-field.editable').type('(1)=');

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`def calculate(input):\nreturn 4*input`);

  await expect(page.locator('.status-footer')).not.toBeVisible();

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Scalar inputs with units on second input and scalar output with units', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack m\right\rbrack\right)=\left\lbrack m\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(1,2\left\lbrack m\right\rbrack\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`NewFunc\left(2\left\lbrack m\right\rbrack,3\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\mathrm{NewFunc}\left(4\left\lbrack s\right\rbrack,5\right)=`)

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`\mathrm{NewFunc}\left(5\left\lbrack m\right\rbrack,6\left\lbrack m\right\rbrack\right)=`)

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`def calculate(input1, input2):\nreturn input1 + input2`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');
});

test('Scalar inputs without units and unitless matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack none\right\rbrack,\left\lbrack none\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2,3\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
import numpy as np
def calculate(input1, input2):
    return np.ones((int(input1),int(input2)))
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \end{bmatrix}`);
});

test('Scalar inputs without units and scalar unit for matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack none\right\rbrack,\left\lbrack none\right\rbrack\right)=\left\lbrack m\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2,3\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
import numpy as np
def calculate(input1, input2):
    return np.ones((int(input1),int(input2)))
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 1\left\lbrack m\right\rbrack  & 1\left\lbrack m\right\rbrack  & 1\left\lbrack m\right\rbrack  \\ 1\left\lbrack m\right\rbrack  & 1\left\lbrack m\right\rbrack  & 1\left\lbrack m\right\rbrack  \end{bmatrix}`);
});

test('Scalar inputs without units and matrix units for matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack none\right\rbrack,\left\lbrack none\right\rbrack\right)=\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack s\right\rbrack & \left\lbrack kg\right\rbrack\\ \left\lbrack K\right\rbrack & \left\lbrack A\right\rbrack & \left\lbrack mol\right\rbrack\end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2,3\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
import numpy as np
def calculate(input1, input2):
    return np.ones((int(input1),int(input2)))
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 1\left\lbrack m\right\rbrack  & 1\left\lbrack s\right\rbrack  & 1\left\lbrack kg\right\rbrack  \\ 1\left\lbrack K\right\rbrack  & 1\left\lbrack A\right\rbrack  & 1\left\lbrack mol\right\rbrack  \end{bmatrix}`);
});

test('Scalar inputs without units and wrong sized matrix units for matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack none\right\rbrack,\left\lbrack none\right\rbrack\right)=\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack s\right\rbrack\\ \left\lbrack K\right\rbrack & \left\lbrack A\right\rbrack\end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2,3\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
import numpy as np
def calculate(input1, input2):
    return np.ones((int(input1),int(input2)))
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error: Incorrect matrix or vector size for output')).toBeVisible();
});

test('Scalar inputs without units and row matrix units for matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack none\right\rbrack,\left\lbrack none\right\rbrack\right)=\begin{bmatrix}\left\lbrack m\right\rbrack\\ \left\lbrack K\right\rbrack\end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2,3\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
import numpy as np
def calculate(input1, input2):
    return np.ones((int(input1),int(input2)))
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 1\left\lbrack m\right\rbrack  & 1\left\lbrack m\right\rbrack  & 1\left\lbrack m\right\rbrack  \\ 1\left\lbrack K\right\rbrack  & 1\left\lbrack K\right\rbrack  & 1\left\lbrack K\right\rbrack  \end{bmatrix}`);
});

test('Scalar inputs without units and col matrix units for matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack none\right\rbrack,\left\lbrack none\right\rbrack\right)=\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack s\right\rbrack & \left\lbrack K\right\rbrack\end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2,3\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
import numpy as np
def calculate(input1, input2):
    return np.ones((int(input1),int(input2)))
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 1\left\lbrack m\right\rbrack  & 1\left\lbrack s\right\rbrack  & 1\left\lbrack K\right\rbrack  \\ 1\left\lbrack m\right\rbrack  & 1\left\lbrack s\right\rbrack  & 1\left\lbrack K\right\rbrack  \end{bmatrix}`);
});

test('Scalar inputs without units and col matrix units for matrix output and wrong number of columns', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack none\right\rbrack,\left\lbrack none\right\rbrack\right)=\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack s\right\rbrack \end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2,3\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
import numpy as np
def calculate(input1, input2):
    return np.ones((int(input1),int(input2)))
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

await expect(page.locator('#cell-0 >> text=Dimension Error: Incorrect matrix or vector size for output')).toBeVisible();
});

test('Scalar inputs without units and matrix units for scalar output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack none\right\rbrack,\left\lbrack none\right\rbrack\right)=\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack s\right\rbrack\end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2,3\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error: Matrix or vector expected')).toBeVisible();
});

test('Scalar and matrix inputs without units and matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2,\begin{bmatrix}1 & 2\\ 3 & 4\\ 5.1 & 6\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 2 & 4 \\ 6 & 8 \\ 10.2 & 12 \end{bmatrix}`);
});

test('Scalar and matrix inputs with scalar units spec and matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack m\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack m\right\rbrack & 2\left\lbrack km\right\rbrack\\ 3\left\lbrack m\right\rbrack & 4\left\lbrack m\right\rbrack\\ 5.1\left\lbrack m\right\rbrack & 6\left\lbrack cm\right\rbrack\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 2 & 4000 \\ 6 & 8 \\ 10.2 & 0.12 \end{bmatrix}`);
});

test('Scalar and matrix inputs with incorrect units and scalar units spec and matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack m\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack m\right\rbrack & 2\left\lbrack km\right\rbrack\\ 3\left\lbrack m\right\rbrack & 4\left\lbrack s\right\rbrack\\ 5.1\left\lbrack m\right\rbrack & 6\left\lbrack cm\right\rbrack\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error: Incorrect units for input number 2')).toBeVisible();
});

test('Scalar and matrix inputs with incorrect units and matrix units spec and matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack s\right\rbrack\\ \left\lbrack K\right\rbrack & \left\lbrack kg\right\rbrack\\ \left\lbrack mol\right\rbrack & \left\lbrack A\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1 & 2\\ 3 & 4\\ 5.1 & 6\end{bmatrix}\cdot1\left\lbrack m\right\rbrack\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error: Incorrect units at (row=1, col=2)')).toBeVisible();
});

test('Scalar and matrix inputs with units and matrix units spec and matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack s\right\rbrack\\ \left\lbrack K\right\rbrack & \left\lbrack kg\right\rbrack\\ \left\lbrack mol\right\rbrack & \left\lbrack A\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack km\right\rbrack & 2\left\lbrack us\right\rbrack\\ 3\left\lbrack kK\right\rbrack & 4\left\lbrack kg\right\rbrack\\ 5.1\left\lbrack mol\right\rbrack & 6\left\lbrack A\right\rbrack\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 2000 & 4\times 10^{-6} \\ 6000 & 8 \\ 10.2 & 12 \end{bmatrix}`);
});

test('Scalar and matrix inputs with units and wrong size matrix units spec and matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack s\right\rbrack\\ \left\lbrack K\right\rbrack & \left\lbrack kg\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack km\right\rbrack & 2\left\lbrack us\right\rbrack\\ 3\left\lbrack kK\right\rbrack & 4\left\lbrack kg\right\rbrack\\ 5.1\left\lbrack mol\right\rbrack & 6\left\lbrack A\right\rbrack\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error: Incorrect matrix or vector size for input number 2')).toBeVisible();
});

test('Scalar and matrix inputs with units and row matrix units spec and matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack m\right\rbrack\\ \left\lbrack K\right\rbrack\\ \left\lbrack mol\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack km\right\rbrack & 2\left\lbrack m\right\rbrack\\ 3\left\lbrack kK\right\rbrack & 4\left\lbrack K\right\rbrack\\ 5.1\left\lbrack mol\right\rbrack & 6\left\lbrack mol\right\rbrack\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 2000 & 4 \\ 6000 & 8 \\ 10.2 & 12 \end{bmatrix}`);
});

test('Scalar and matrix inputs with units and row matrix units spec and matrix output with wrong units', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack m\right\rbrack\\ \left\lbrack K\right\rbrack\\ \left\lbrack mol\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack km\right\rbrack & 2\left\lbrack s\right\rbrack\\ 3\left\lbrack kK\right\rbrack & 4\left\lbrack K\right\rbrack\\ 5.1\left\lbrack mol\right\rbrack & 6\left\lbrack mol\right\rbrack\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error: Incorrect units for input number 2')).toBeVisible();
});

test('Scalar and matrix inputs with units and row matrix units spec and matrix output and wrong number of rows', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack m\right\rbrack\\ \left\lbrack K\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack km\right\rbrack & 2\left\lbrack m\right\rbrack\\ 3\left\lbrack kK\right\rbrack & 4\left\lbrack K\right\rbrack\\ 5.1\left\lbrack mol\right\rbrack & 6\left\lbrack mol\right\rbrack\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error: Incorrect matrix or vector size for input number 2')).toBeVisible();
});

test('Scalar and matrix inputs with units and col matrix units spec and matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack K\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack km\right\rbrack & 2\left\lbrack K\right\rbrack\\ 3\left\lbrack m\right\rbrack & 4\left\lbrack kK\right\rbrack\\ 5.1\left\lbrack cm\right\rbrack & 6\left\lbrack K\right\rbrack\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 2000 & 4 \\ 6 & 8000 \\ 0.102 & 12 \end{bmatrix}`);
});

test('Scalar and matrix inputs with units and col matrix units spec and matrix output and wrong units', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack K\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack km\right\rbrack & 2\left\lbrack K\right\rbrack\\ 3\left\lbrack m\right\rbrack & 4\left\lbrack kK\right\rbrack\\ 5.1\left\lbrack cm\right\rbrack & 6\left\lbrack s\right\rbrack\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error: Incorrect units for input number 2')).toBeVisible();
});

test('Scalar and symbolic matrix input', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack K\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack km\right\rbrack & 2\left\lbrack K\right\rbrack\\ 3\left\lbrack m\right\rbrack & 4\left\lbrack kK\right\rbrack\\ 5.1\left\lbrack cm\right\rbrack & x\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\operatorname{CodeFunc}_{1}{\left(2,\left[\begin{matrix}1000 & 2\\3 & 4000\\\frac{51}{1000} & x\end{matrix}\right] \right)}`);
});

test('Scalar symbolic and numeric matrix input', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack K\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(x,\begin{bmatrix}1\left\lbrack km\right\rbrack & 2\left\lbrack K\right\rbrack\\ 3\left\lbrack m\right\rbrack & 4\left\lbrack kK\right\rbrack\\ 5.1\left\lbrack cm\right\rbrack & 6\left\lbrack K\right\rbrack\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\operatorname{CodeFunc}_{1}{\left(x,\left[\begin{matrix}1000 & 2\\3 & 4000\\\frac{51}{1000} & 6\end{matrix}\right] \right)}`);
});

test('Scalar and matrix inputs with units and matrix units spec and matrix output with output units', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack s\right\rbrack\\ \left\lbrack K\right\rbrack & \left\lbrack kg\right\rbrack\\ \left\lbrack mol\right\rbrack & \left\lbrack A\right\rbrack\end{bmatrix}\right)=\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack s\right\rbrack\\ \left\lbrack K\right\rbrack & \left\lbrack kg\right\rbrack\\ \left\lbrack mol\right\rbrack & \left\lbrack A\right\rbrack\end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2,\begin{bmatrix}1\left\lbrack km\right\rbrack & 2\left\lbrack us\right\rbrack\\ 3\left\lbrack K\right\rbrack & 4\left\lbrack kg\right\rbrack\\ 5.1\left\lbrack mol\right\rbrack & 6\left\lbrack A\right\rbrack\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 2000\left\lbrack m\right\rbrack  & 4\times 10^{-6}\left\lbrack s\right\rbrack  \\ 6\left\lbrack K\right\rbrack  & 8\left\lbrack kg\right\rbrack  \\ 10.2\left\lbrack mol\right\rbrack  & 12\left\lbrack A\right\rbrack  \end{bmatrix}`);
});

test('SymPy mode with scalar symbolic inputs and outputs', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`CodeFunc1\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(x,2\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`2 \cdot x`);
});

test('SymPy mode with scalar numeric inputs and outputs', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`CodeFunc1\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(4\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
import sympy as sp
def calculate(input):
    return sp.gamma(input)
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('SymPy mode with scalar inputs and matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`CodeFunc1\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(1,5\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
import sympy as sp

def calculate(input1, input2):
x = sp.symbols('x')
return sp.Matrix(sp.sequence(x**2, (x, input1, input2))).T
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 1 & 4 & 9 & 16 & 25 \end{bmatrix}`);
});

test('SymPy mode with matrix inputs and outputs and units', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`CodeFunc1\left(\left\lbrack m\right\rbrack,\begin{bmatrix}\left\lbrack m\right\rbrack\\ \left\lbrack s\right\rbrack\end{bmatrix}\right)=\begin{bmatrix}\left\lbrack m^2\right\rbrack\\ \left\lbrack s\cdot m\right\rbrack\end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack m\right\rbrack & 2\left\lbrack m\right\rbrack & 3\left\lbrack km\right\rbrack\\ 4\left\lbrack us\right\rbrack & 5\left\lbrack s\right\rbrack & 6\left\lbrack s\right\rbrack\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 2\left\lbrack m^2\right\rbrack  & 4\left\lbrack m^2\right\rbrack  & 6000\left\lbrack m^2\right\rbrack  \\ 8\times 10^{-6}\left\lbrack m\cdot s\right\rbrack  & 10\left\lbrack m\cdot s\right\rbrack  & 12\left\lbrack m\cdot s\right\rbrack  \end{bmatrix}`);
});

test('SymPy mode with symbolic matrix inputs and outputs', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`CodeFunc1\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(x,\begin{bmatrix}a1 & a2\\ a3 & a4\\ a5 & a6\end{bmatrix}\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} a1 \cdot x & a2 \cdot x \\ a3 \cdot x & a4 \cdot x \\ a5 \cdot x & a6 \cdot x \end{bmatrix}`);
});