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

  await page.locator('#cell-0 math-field.editable').type('CodeFunc1(1)=');

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();

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
  await expect(page.locator('#cell-1 math-field')).toBeVisible({timeout: 4000});
  await page.locator('#cell-1 math-field.editable').click({clickCount: 3});
  await page.locator('#cell-1 math-field.editable').type('NewFunc([m],[any])=[none]');
  await page.locator('#cell-1 math-field.editable').press('Enter');

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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack none\right\rbrack,\left\lbrack none\right\rbrack\right)=\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack s\right\rbrack\\ \left\lbrack K\right\rbrack & \left\lbrack A\right\rbrack\end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2,3\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
import numpy as np
def calculate(input1, input2):
    return np.ones((int(input1),int(input2)))
`);

  await expect(page.locator('text=Incorrect matrix or vector size for output')).toBeVisible();
});

test('Scalar inputs without units and row matrix units for matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack none\right\rbrack,\left\lbrack none\right\rbrack\right)=\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack s\right\rbrack \end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2,3\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
import numpy as np
def calculate(input1, input2):
    return np.ones((int(input1),int(input2)))
`);

  await expect(page.locator('text=Incorrect matrix or vector size for output')).toBeVisible();
});

test('Scalar inputs without units and matrix units for scalar output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack none\right\rbrack,\left\lbrack none\right\rbrack\right)=\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack s\right\rbrack\end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2,3\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);
  await expect(page.locator('.status-footer >> text=The code cell function CodeFunc1 returns a scalar when a matrix output was specified')).toBeVisible();
});

test('Scalar and matrix inputs without units and matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack m\right\rbrack & \left\lbrack s\right\rbrack\\ \left\lbrack K\right\rbrack & \left\lbrack kg\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack km\right\rbrack & 2\left\lbrack us\right\rbrack\\ 3\left\lbrack kK\right\rbrack & 4\left\lbrack kg\right\rbrack\\ 5.1\left\lbrack mol\right\rbrack & 6\left\lbrack A\right\rbrack\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await expect(page.locator('text=Incorrect matrix or vector size for input number 2')).toBeVisible();
});

test('Scalar and matrix inputs with units and row matrix units spec and matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack m\right\rbrack\\ \left\lbrack K\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack km\right\rbrack & 2\left\lbrack m\right\rbrack\\ 3\left\lbrack kK\right\rbrack & 4\left\lbrack K\right\rbrack\\ 5.1\left\lbrack mol\right\rbrack & 6\left\lbrack mol\right\rbrack\end{bmatrix}\right)=`);


  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);
  await page.locator('#cell-1 div.cm-content').type(`
def calculate(input1, input2):
    return input1*input2
`);

  await expect(page.locator('text=Incorrect matrix or vector size for input number 2')).toBeVisible();
});

test('Scalar and matrix inputs with units and col matrix units spec and matrix output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
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

test('Custom dims function with only dims input', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`CodeFunc1\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,3\left\lbrack s\right\rbrack\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);


  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input1*input2

def custom_dims(input1, input2):
    return input1*input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^1*s^1');

  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(3\left\lbrack m\right\rbrack,4\left\lbrack s\right\rbrack\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(12, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^1*s^1');
});

test('Custom dims function with dims input and input values and result value', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`CodeFunc1\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,3\left\lbrack s\right\rbrack\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);


  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input1*input2

def custom_dims(input1, input2, dim_values):
    return input1**dim_values["args"][0]*input2**(dim_values["args"][1]+dim_values["result"])
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^2*s^9');

  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(3\left\lbrack m\right\rbrack,4\left\lbrack s\right\rbrack\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(12, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^3*s^16');
});

test('Custom dims with dims besides [any] for input', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`CodeFunc1\left(\left\lbrack m\right\rbrack,\left\lbrack any\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,3\left\lbrack s\right\rbrack\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);


  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input1*input2

def custom_dims(input1, input2, dim_values):
    return input1**dim_values["args"][0]*input2**(dim_values["args"][1]+dim_values["result"])
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await expect(page.locator('.status-footer >> text=All inputs and outputs must be of scalar type [any]')).toBeVisible();
});

test('Custom dims with dims besides [any] for output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`CodeFunc1\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\left\lbrack m\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,3\left\lbrack s\right\rbrack\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);


  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input1*input2

def custom_dims(input1, input2, dim_values):
    return input1**dim_values["args"][0]*input2**(dim_values["args"][1]+dim_values["result"])
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await expect(page.locator('.status-footer >>  text=All inputs and outputs must be of scalar type [any]')).toBeVisible();
});

test('Return type of [any] without custom dims function defined', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`CodeFunc1\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,3\left\lbrack s\right\rbrack\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);


  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input1*input2

def custom_dims2(input1, input2, dim_values):
    return input1**dim_values["args"][0]*input2**(dim_values["args"][1]+dim_values["result"])
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error: Return type of [any] only allowed when custom_dims function is defined')).toBeVisible();
});

test('Test input matrix to local unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack in\right\rbrack & \left\lbrack degF\right\rbrack & \left\lbrack us\right\rbrack\\ \left\lbrack m\right\rbrack & \left\lbrack any\right\rbrack & \left\lbrack none\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack m\right\rbrack & 273.15\left\lbrack K\right\rbrack & 1\left\lbrack us\right\rbrack\\ 5.1\left\lbrack m\right\rbrack & 6\left\lbrack km\right\rbrack & 3\end{bmatrix}\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 39.3700787401575 & 31.9999999999999 & 1 \\ 5.1 & 6000 & 3 \end{bmatrix}`);
});

test('Test input col matrix to local unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack in\right\rbrack & \left\lbrack degF\right\rbrack & \left\lbrack us\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack m\right\rbrack & 273.15\left\lbrack K\right\rbrack & 1\left\lbrack us\right\rbrack\\ 5\left\lbrack m\right\rbrack & 233.15\left\lbrack K\right\rbrack & 3\left\lbrack s\right\rbrack\end{bmatrix}\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 39.3700787401575 & 31.9999999999999 & 1 \\ 196.850393700787 & -40 & 3\times 10^{6} \end{bmatrix}`);
});

test('Test input row matrix to local unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack in\right\rbrack\\ \left\lbrack degF\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack m\right\rbrack & 5\left\lbrack m\right\rbrack\\ 273.15\left\lbrack K\right\rbrack & 233.15\left\lbrack K\right\rbrack\end{bmatrix}\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 39.3700787401575 & 196.850393700787 \\ 31.9999999999999 & -40 \end{bmatrix}`);
});

test('Test local to matrix output unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\begin{bmatrix}\left\lbrack in\right\rbrack & \left\lbrack degF\right\rbrack & \left\lbrack us\right\rbrack\\ \left\lbrack m\right\rbrack & \left\lbrack none\right\rbrack & \left\lbrack none\right\rbrack\end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}39.3700787401575 & 31.9999999999999 & 1\\ 5.1 & 6000 & 3\end{bmatrix}\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 1\left\lbrack m\right\rbrack  & 273.15\left\lbrack K\right\rbrack  & 1\times 10^{-6}\left\lbrack s\right\rbrack  \\ 5.1\left\lbrack m\right\rbrack  & 6000 & 3 \end{bmatrix}`);
});

test('Test local to col matrix output unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\begin{bmatrix}\left\lbrack in\right\rbrack & \left\lbrack degF\right\rbrack & \left\lbrack us\right\rbrack\end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}39.3700787401575 & 31.9999999999999 & 1\\ 12 & -40 & 3\end{bmatrix}\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 1\left\lbrack m\right\rbrack  & 273.15\left\lbrack K\right\rbrack  & 1\times 10^{-6}\left\lbrack s\right\rbrack  \\ 0.3048\left\lbrack m\right\rbrack  & 233.15\left\lbrack K\right\rbrack  & 3\times 10^{-6}\left\lbrack s\right\rbrack  \end{bmatrix}`);
});

test('Test local to row matrix output unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\begin{bmatrix}\left\lbrack in\right\rbrack\\ \left\lbrack degF\right\rbrack\end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1 & 2 & 3\\ 32 & -40 & 0\end{bmatrix}\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 0.0254\left\lbrack m\right\rbrack  & 0.0508\left\lbrack m\right\rbrack  & 0.0762\left\lbrack m\right\rbrack  \\ 273.15\left\lbrack K\right\rbrack  & 233.15\left\lbrack K\right\rbrack  & 255.372222222222\left\lbrack K\right\rbrack  \end{bmatrix}`);
});

test('Test input scalar to local unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack degF\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,273.15\left\lbrack K\right\rbrack\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    print(f"local value: {input2}")
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  await expect(page.locator("#cell-1 >> text=local value: 31.999999999999943")).toBeVisible();
});

test('Test local to output scalar unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\left\lbrack degF\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,32\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    print(f"local value: {input2}")
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(273.15, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('K');
});

test('Test sympy mode input matrix to local unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack in\right\rbrack & \left\lbrack degF\right\rbrack & \left\lbrack us\right\rbrack\\ \left\lbrack m\right\rbrack & \left\lbrack any\right\rbrack & \left\lbrack none\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack m\right\rbrack & 273.15\left\lbrack K\right\rbrack & 1\left\lbrack us\right\rbrack\\ 5.1\left\lbrack m\right\rbrack & 6\left\lbrack km\right\rbrack & 3\end{bmatrix}\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 39.3700787401575 & 31.9999999999999 & 1 \\ 5.1 & 6000 & 3 \end{bmatrix}`);
});

test('Test sympy mode input col matrix to local unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack in\right\rbrack & \left\lbrack degF\right\rbrack & \left\lbrack us\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack m\right\rbrack & 273.15\left\lbrack K\right\rbrack & 1\left\lbrack us\right\rbrack\\ 5\left\lbrack m\right\rbrack & 233.15\left\lbrack K\right\rbrack & 3\left\lbrack s\right\rbrack\end{bmatrix}\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 39.3700787401575 & 31.9999999999999 & 1 \\ 196.850393700787 & -40.0000000000001 & 3\times 10^{6} \end{bmatrix}`);
});

test('Test sympy mode input row matrix to local unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\begin{bmatrix}\left\lbrack in\right\rbrack\\ \left\lbrack degF\right\rbrack\end{bmatrix}\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1\left\lbrack m\right\rbrack & 5\left\lbrack m\right\rbrack\\ 273.15\left\lbrack K\right\rbrack & 233.15\left\lbrack K\right\rbrack\end{bmatrix}\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 39.3700787401575 & 196.850393700787 \\ 31.9999999999999 & -40.0000000000001 \end{bmatrix}`);
});

test('Test sympy mode local to matrix output unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\begin{bmatrix}\left\lbrack in\right\rbrack & \left\lbrack degF\right\rbrack & \left\lbrack us\right\rbrack\\ \left\lbrack m\right\rbrack & \left\lbrack none\right\rbrack & \left\lbrack none\right\rbrack\end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}39.3700787401575 & 31.9999999999999 & 1\\ 5.1 & 6000 & 3\end{bmatrix}\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 1\left\lbrack m\right\rbrack  & 273.15\left\lbrack K\right\rbrack  & 1\times 10^{-6}\left\lbrack s\right\rbrack  \\ 5.1\left\lbrack m\right\rbrack  & 6000 & 3 \end{bmatrix}`);
});

test('Test sympy mode local to col matrix output unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\begin{bmatrix}\left\lbrack in\right\rbrack & \left\lbrack degF\right\rbrack & \left\lbrack us\right\rbrack\end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}39.3700787401575 & 31.9999999999999 & 1\\ 12 & -40 & 3\end{bmatrix}\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 1\left\lbrack m\right\rbrack  & 273.15\left\lbrack K\right\rbrack  & 1\times 10^{-6}\left\lbrack s\right\rbrack  \\ 0.3048\left\lbrack m\right\rbrack  & 233.15\left\lbrack K\right\rbrack  & 3\times 10^{-6}\left\lbrack s\right\rbrack  \end{bmatrix}`);
});

test('Test sympy mode local to row matrix output unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\begin{bmatrix}\left\lbrack in\right\rbrack\\ \left\lbrack degF\right\rbrack\end{bmatrix}`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,\begin{bmatrix}1 & 2 & 3\\ 32 & -40 & 0\end{bmatrix}\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 0.0254\left\lbrack m\right\rbrack  & 0.0508\left\lbrack m\right\rbrack  & 0.0762\left\lbrack m\right\rbrack  \\ 273.15\left\lbrack K\right\rbrack  & 233.15\left\lbrack K\right\rbrack  & 255.372222222222\left\lbrack K\right\rbrack  \end{bmatrix}`);
});

test('Test sympy mode input scalar to local unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack degF\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,273.15\left\lbrack K\right\rbrack\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    print(f"local value: {input2}")
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  await expect(page.locator("#cell-1 >> text=local value: 31.9999999999999")).toBeVisible();
});

test('Test sympy mode local to output scalar unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\left\lbrack degF\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack,32\right)=`);

  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+a`);
  await page.locator('#cell-1 div.cm-content').press(`${modifierKey}+x`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input1, input2):
    print(f"local value: {input2}")
    return input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(273.15, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('K');
});

test('Test compile error reporting', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\right)=`);

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.locator('#add-code-cell').click();
  await page.setLatex(2, String.raw`\mathrm{CodeFunc2}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\mathrm{CodeFunc2}\left(3\right)=`);

  let editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    output = 2*input
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  editor = await page.locator('#cell-2 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    output = 3*input
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(9, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('');

  await expect(page.locator(".cm-diagnostic")).not.toBeAttached();

  editor = await page.locator('#cell-2 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):-
    output = 3*input
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await expect(page.locator("#cell-2 >> text=invalid syntax")).toBeVisible();
  await expect(page.locator("#cell-1 .cm-diagnostic")).not.toBeAttached();

  editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    output = 3*input
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  editor = await page.locator('#cell-2 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    output = 4*input
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(12, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('');

  await expect(page.locator(".cm-diagnostic")).not.toBeAttached();
});

test('Test runtime error reporting', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\right)=`);

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.locator('#add-code-cell').click();
  await page.setLatex(2, String.raw`\mathrm{CodeFunc2}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\mathrm{CodeFunc2}\left(3\right)=`);

  let editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    output = 2*input
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  editor = await page.locator('#cell-2 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    output = 3*input
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(9, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('');

  await expect(page.locator(".cm-diagnostic")).not.toBeAttached();

  editor = await page.locator('#cell-2 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    output = 3*input/0
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await expect(page.locator("#cell-2 >> text=division by zero")).toBeVisible();
  await expect(page.locator("#cell-1 .cm-diagnostic")).not.toBeAttached();

  editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    output = 3*input
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  editor = await page.locator('#cell-2 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    output = 4*input
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(12, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('');

  await expect(page.locator(".cm-diagnostic")).not.toBeAttached();
});

test('Test sympy mode runtime error reporting', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(x\right)=`);

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').nth(1).check();
  await page.setLatex(2, String.raw`\mathrm{CodeFunc2}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\mathrm{CodeFunc2}\left(y\right)=`);

  let editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    output = 2*input
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  editor = await page.locator('#cell-2 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    output = 3*input
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`2 \cdot x`);

  content = await page.textContent('#result-value-3');
  expect(content).toBe(String.raw`3 \cdot y`);

  await expect(page.locator(".cm-diagnostic")).not.toBeAttached();

  editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    output = 3*input+cats
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await expect(page.locator("#cell-1 >> text=name 'cats' is not defined")).toBeVisible();
  await expect(page.locator("#cell-2 .cm-diagnostic")).not.toBeAttached();

  editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    output = 3*input
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  editor = await page.locator('#cell-2 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    output = 4*input
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`3 \cdot x`);

  content = await page.textContent('#result-value-3');
  expect(content).toBe(String.raw`4 \cdot y`);

  await expect(page.locator(".cm-diagnostic")).not.toBeAttached();
});

test('Test stoud rendering', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\right)=`);

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').nth(1).check();
  await page.setLatex(2, String.raw`\mathrm{CodeFunc2}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\mathrm{CodeFunc2}\left(y\right)=`);

  let editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    print('cats')
    output = 2*input
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  editor = await page.locator('#cell-2 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    output = 3*input
    print('dogs')
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  content = await page.textContent('#result-value-3');
  expect(content).toBe(String.raw`3 \cdot y`);

  await expect(page.locator(".cm-diagnostic")).not.toBeAttached();

  await expect(page.locator('#cell-1 pre >> text=cats')).toBeVisible();
  await expect(page.locator('#cell-2 pre >> text=dogs')).toBeVisible();

  await page.setLatex(3, String.raw`\mathrm{CodeFunc1}\left(3\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('');

  await expect(page.locator('#cell-1 pre >> text=cats\ncats')).toBeVisible();
  await expect(page.locator('#cell-2 pre >> text=dogs')).not.toBeVisible();

  await expect(page.locator(".cm-diagnostic")).not.toBeAttached();
});

test('Test variable number of inputs', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(1\left\lbrack m\right\rbrack,2\left\lbrack m\right\rbrack,1\left\lbrack km\right\rbrack\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(*args):
    return sum(args)
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1003, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test sympy mode variable number of inputs', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(x,y,z\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(*args):
    return sum(args)
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`x + y + z`);
});

test('Test variable number of inputs with inconsistent units', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack m\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(1\left\lbrack m\right\rbrack,2\left\lbrack m\right\rbrack,1\left\lbrack s\right\rbrack\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(*args):
    return sum(args)
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error: Incorrect units for input number 3')).toBeVisible();
});

test('Test variable number of inputs with custom_dims without dim_values', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(1\left\lbrack m\right\rbrack,2\left\lbrack m\right\rbrack,3\left\lbrack m\right\rbrack\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(*args):
    return sum(args)

import sympy as sp
def custom_dims(*args):
    return sp.prod(args)
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^3');
});

test('Test variable number of inputs with custom_dims with dim_values', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(1\left\lbrack m\right\rbrack,2\left\lbrack m\right\rbrack,3\left\lbrack m\right\rbrack\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(*args):
    return sum(args)

import sympy as sp
def custom_dims(*args, dim_values):
    return sp.prod(args)**dim_values["result"]
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^18');
});

test('Test wrong num of inputs in call', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(1,2\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    return 2*input
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await expect(page.locator('.status-footer >> text=Number of input arguments provided to code function "CodeFunc1" (2) differs from the number of arguments specified in the code function definition (1)')).toBeVisible();
});

test('Test sympy mode wrong num of inputs in call', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(1,2\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    return 2*input
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await expect(page.locator('.status-footer >> text=Number of input arguments provided to code function "CodeFunc1" (2) differs from the number of arguments specified in the code function definition (1)')).toBeVisible();
});

test('Test custom_dims utility functions', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(1,2,3\left\lbrack m\right\rbrack,157.48031496063\left\lbrack in\right\rbrack\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
import sympy.physics.units.definitions.dimension_definitions as dims

def calculate(input1, input2, input3, input4):
    return input1+input2+input3+input4

def custom_dims(input1, input2, input3, input4):
    ensure_all_unitless(input1, input2)
    return ensure_all_equivalent(input3, input4)*dims.length
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(10, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^2');

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(1,2,3\left\lbrack s\right\rbrack,157.48031496063\left\lbrack in\right\rbrack\right)=`);
  await page.waitForSelector('.status-footer', {state: 'detached'});
  await expect(page.locator('#cell-0 >> text=Dimension Error: CodeFunc1 dimension equivalence check has failed')).toBeVisible();

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(1,2\left\lbrack s\right\rbrack,3\left\lbrack m\right\rbrack,157.48031496063\left\lbrack in\right\rbrack\right)=`);
  await page.waitForSelector('.status-footer', {state: 'detached'});
  await expect(page.locator('#cell-0 >> text=Dimension Error: CodeFunc1 dimension unitless check has failed')).toBeVisible();
});

test('Test wrong num of inputs in calculate definition', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\:\left\lbrack any\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    return 2*input

def custom_dims(input, dim_values):
    return input
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await expect(page.locator('.status-footer >> text=The number of inputs to the provided "calculate" function (1) does not match the number of inputs in the function definition (2)')).toBeVisible();
});

test('Test wrong num of inputs in custom_dims definition', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\left\lbrack m\right\rbrack\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(input):
    return 2*input

def custom_dims(input1, input2, dim_values):
    return input1*input2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await expect(page.locator('.status-footer >> text=The number of inputs to the provided "custom_dims" function (2) does not match the number of inputs in the function definition (1)')).toBeVisible();
});

test('Test lambdify input arg unit conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack degF\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`Col2_{2,1}=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(value):
    return value
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-2-0-0')).toBeFocused();

  await page.keyboard.type('233.15');
  await page.keyboard.press('Enter');
  await page.keyboard.type('273.15');

  await page.locator('#parameter-units-2-0 >> math-field').type('[K]');

  await page.setLatex(2, String.raw`Col2=\mathrm{CodeFunc1}\left(Col1\right)`, 1);
  
  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(32, 12);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test lambdify result conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack degF\right\rbrack`);

  await page.setLatex(0, String.raw`Col2_{2,1}=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(value):
    return value
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-2-0-0')).toBeFocused();

  await page.keyboard.type('-40');
  await page.keyboard.press('Enter');
  await page.keyboard.type('32');

  await page.setLatex(2, String.raw`Col2=\mathrm{CodeFunc1}\left(Col1\right)`, 1);
  
  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(273.15, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('K');
});

test('Test no inputs and output units', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack mm\right\rbrack`);

  await page.setLatex(0, String.raw`\left(2\cdot\mathrm{CodeFunc1}\left(\right)\right)_{3,1}=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
import numpy as np

def calculate():
    return np.array([1,2,3])
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(0.006, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');
});

test('Test sympy mode no inputs and unitless output', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.getByLabel('Use SymPy Mode').check();

  await page.setLatex(0, String.raw`\left(3\cdot\mathrm{CodeFunc1}\left(\right)\right)_{3,1}=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
import sympy as sp

def calculate():
    return sp.Matrix([1,2,3])
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(9, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test automatic module import for libraries other than numpy and sympy', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack K\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
from CoolProp.CoolProp import PropsSI

def calculate():
    return PropsSI("Tcrit", "Water")
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(647.096, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('K');
});

test('Test top level printing', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(10\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
print('outside')

def calculate(value):
    print(f'inside {value}')
    output = 2*value
    return output
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\mathrm{CodeFunc1}\left(20\right)=`);
  
  let content = await page.locator('#cell-1 pre').textContent();
  expect(content.trim()).toBe(`outside
inside 10.0
inside 20.0`);

  await page.setLatex(2, String.raw`\mathrm{CodeFunc1}\left(15\right)=`);
  
  await page.waitForSelector('.status-footer', {state: 'detached'});

  content = await page.locator('#cell-1 pre').textContent();
  expect(content.trim()).toBe(`outside
inside 10.0
inside 15.0`);
});

test('Test syntax errors for reserved function names', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  
  // built-in function
  await page.setLatex(1, String.raw`round\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);
  await expect(page.locator('text=Attempt to reassign built-in function name round')).toBeAttached();

  // trig function
  await page.setLatex(1, String.raw`sin\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);
  await expect(page.locator('text=Invalid Syntax')).toBeAttached();

  // reserved variables
  await page.setLatex(1, String.raw`i\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);
  await expect(page.locator('text=i cannot be used as a function name')).toBeAttached();
});

test('Test sympy symbolic manipulation', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.locator('label').filter({ hasText: 'Automatically Simplify' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await page.locator('#add-code-cell').click();
  await page.getByLabel('Use SymPy Mode').check();

  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`factor\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`x^2+5\cdot x+6=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
import sympy

def calculate(value):
    return sympy.factor(value)
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`x^{2} + 5 \cdot x + 6`);

  await page.setLatex(0, String.raw`\mathrm{factor}\left(x^2+5\cdot x+6\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\left(x + 2\right) \cdot \left(x + 3\right)`);
});

test('Test sympy mode automatic tuple to Matrix conversion', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.getByLabel('Use SymPy Mode').check();

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(x,y\right)_{2,1}=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(value1, value2):
    return value1, value2
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe('y');
});

test('Test dummy vars in custom funcs when operand contains placeholder function', async () => {

  await page.click('#delete-0');

  await page.click('#add-piecewise-cell');

  await page.locator('#piecewise-parameter-0 math-field.editable').type('y');
  await page.locator('#piecewise-expression-0-0 math-field.editable').type('x+1[m]');
  await page.locator('#piecewise-expression-0-1 math-field.editable').type('1[m]-x');
  await page.locator('#piecewise-condition-0-0 math-field.editable').type('x<0[m]');

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`y_{prime}=\mathrm{der}\left(y^2,\:x,\:1\right)=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`\mathrm{int}\left(y,-1\left\lbrack m\right\rbrack,\:1\left\lbrack m\right\rbrack,\:x\right)=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(3, String.raw`y_{prime}\left(x=-.5\left\lbrack m\right\rbrack\right)=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(4, String.raw`y_{int}=\mathrm{indefInt}\left(y,\:x\right)=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(5, String.raw`y_{int}\left(x=1\left\lbrack m\right\rbrack\right)=`);

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-6 math-field.editable')).toBeVisible();
  await page.setLatex(6, String.raw`\mathrm{der}\left(\left\lbrack any\right\rbrack,\:\left\lbrack dummy\right\rbrack,\:\left\lbrack any\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.getByLabel('Use SymPy Mode').check();

  let editor = await page.locator('#cell-6 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
import sympy as sp

def calculate(operand, var, order):
    return sp.diff(operand, var, order)

def custom_dims(operand, var, order):
    return operand/var**order

`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });


  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-7 math-field.editable')).toBeVisible();
  await page.setLatex(7, String.raw`\mathrm{indefInt}\left(\left\lbrack any\right\rbrack,\:\left\lbrack dummy\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.getByLabel('Use SymPy Mode').nth(1).check();

  editor = await page.locator('#cell-7 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
import sympy as sp

def calculate(integrand, var):
    return sp.Integral(integrand, var)

def custom_dims(integrand, var):
    return integrand * var
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });


  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-8 math-field.editable')).toBeVisible();
  await page.setLatex(8, String.raw`\mathrm{int}\left(\left\lbrack any\right\rbrack,\:\left\lbrack any\right\rbrack,\:\left\lbrack any\right\rbrack,\:\left\lbrack dummy\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.getByLabel('Use SymPy Mode').nth(2).check();

  editor = await page.locator('#cell-8 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
import sympy as sp

def calculate(integrand, lower_limit, upper_limit, var):
    return sp.Integral(integrand, (var, lower_limit, upper_limit))

def dims_transform(integrand, lower_limit, upper_limit, var):
    return sp.Subs(integrand, var, lower_limit), lower_limit, upper_limit

def custom_dims(integrand, lower_limit, upper_limit):
    ensure_all_equivalent(lower_limit, upper_limit)
    return integrand * lower_limit
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });


  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m^2');

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-5');
  expect(parseLatexFloat(content)).toBeCloseTo(0.5, precision);
  content = await page.textContent('#result-units-5');
  expect(content).toBe('m^2');
});

test('Test dummy var with dim_values', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{summation}\left(\left\lbrack any\right\rbrack,\left\lbrack dummy\right\rbrack,\left\lbrack any\right\rbrack,\left\lbrack any\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.getByLabel('Use SymPy Mode').check();

  await page.setLatex(0, String.raw`\mathrm{summation}\left(n\cdot2\left\lbrack m\right\rbrack,\:n,\:1,\:3\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
import sympy as sp

def calculate(operand, dummy_var, start, end):
    return sp.summation(operand, (dummy_var, start, end))

def custom_dims(operand, dummy_var, start, end, dim_values):
    start_value = dim_values["args"][2]
    end_value = dim_values["args"][3]
    
    return sp.summation(operand, (dummy_var, start_value, end_value))
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(12, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');
});

test('Test dim_values dummy variable and dims_transform', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{int}\left(\left\lbrack any\right\rbrack,\:\left\lbrack any\right\rbrack,\:\left\lbrack any\right\rbrack,\:\left\lbrack dummy\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.getByLabel('Use SymPy Mode').check();

  await page.setLatex(0, String.raw`\mathrm{int}\left(x,0\left\lbrack m\right\rbrack,1\left\lbrack m\right\rbrack,x\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
import sympy as sp

def calculate(integrand, lower_limit, upper_limit, var):
    return sp.Integral(integrand, (var, lower_limit, upper_limit))

def dims_transform(integrand, lower_limit, upper_limit, var):
    return sp.Subs(integrand, var, lower_limit), lower_limit, upper_limit

def custom_dims(integrand, lower_limit, upper_limit, dim_values):
    ensure_all_equivalent(lower_limit, upper_limit)
    return (integrand * lower_limit)**dim_values["result"]
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(0.5, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');
});

test('Test no first var dummy variable error check', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{int}\left(\left\lbrack dummy\right\rbrack,\:\left\lbrack any\right\rbrack,\:\left\lbrack any\right\rbrack,\:\left\lbrack any\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.getByLabel('Use SymPy Mode').check();

  await page.setLatex(0, String.raw`\mathrm{int}\left(x,0\left\lbrack m\right\rbrack,1\left\lbrack m\right\rbrack,x\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
import sympy as sp

def calculate(integrand, lower_limit, upper_limit, var):
    return sp.Integral(integrand, (var, lower_limit, upper_limit))

def dims_transform(integrand, lower_limit, upper_limit, var):
    return sp.Subs(integrand, var, lower_limit), lower_limit, upper_limit

def custom_dims(integrand, lower_limit, upper_limit):
    ensure_all_equivalent(lower_limit, upper_limit)
    return (integrand * lower_limit)
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await expect(page.locator('.status-footer >> text=The dummy variable type cannot be the applied to the first function argument')).toBeVisible();
});

test('Test no multiple dummy variable error check', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{int}\left(\left\lbrack any\right\rbrack,\:\left\lbrack dummy\right\rbrack,\:\left\lbrack dummy\right\rbrack,\:\left\lbrack any\right\rbrack\right)=\left\lbrack any\right\rbrack`);

  await page.getByLabel('Use SymPy Mode').check();

  await page.setLatex(0, String.raw`\mathrm{int}\left(x,0\left\lbrack m\right\rbrack,1\left\lbrack m\right\rbrack,x\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
import sympy as sp

def calculate(integrand, lower_limit, upper_limit, var):
    return sp.Integral(integrand, (var, lower_limit, upper_limit))

def dims_transform(integrand, lower_limit, upper_limit, var):
    return sp.Subs(integrand, var, lower_limit), lower_limit, upper_limit

def custom_dims(integrand, lower_limit, upper_limit):
    ensure_all_equivalent(lower_limit, upper_limit)
    return (integrand * lower_limit)
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await expect(page.locator('.status-footer >> text=Only one input to the function can have the type dummy')).toBeVisible();
});

test('Test no dummy output type error check', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{int}\left(\left\lbrack any\right\rbrack,\:\left\lbrack any\right\rbrack,\:\left\lbrack any\right\rbrack,\:\left\lbrack any\right\rbrack\right)=\left\lbrack dummy\right\rbrack`);

  await page.getByLabel('Use SymPy Mode').check();

  await page.setLatex(0, String.raw`\mathrm{int}\left(x,0\left\lbrack m\right\rbrack,1\left\lbrack m\right\rbrack,x\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
import sympy as sp

def calculate(integrand, lower_limit, upper_limit, var):
    return sp.Integral(integrand, (var, lower_limit, upper_limit))

def dims_transform(integrand, lower_limit, upper_limit, var):
    return sp.Subs(integrand, var, lower_limit), lower_limit, upper_limit

def custom_dims(integrand, lower_limit, upper_limit):
    ensure_all_equivalent(lower_limit, upper_limit)
    return (integrand * lower_limit)
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await expect(page.locator('.status-footer >> text=All inputs and outputs must be of scalar type [any] to use the custom_dims function for code cell funciton int')).toBeVisible();
});

test('Test dummy variable without custom dims', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{int}\left(\left\lbrack any\right\rbrack,\:\left\lbrack m\right\rbrack,\:\left\lbrack m\right\rbrack,\:\left\lbrack dummy\right\rbrack\right)=\left\lbrack m^2\right\rbrack`);

  await page.getByLabel('Use SymPy Mode').check();

  await page.setLatex(0, String.raw`\mathrm{int}\left(x,0\left\lbrack m\right\rbrack,\:1\left\lbrack m\right\rbrack,\:x\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
import sympy as sp

def calculate(integrand, lower_limit, upper_limit, var):
    return sp.Integral(integrand, (var, lower_limit, upper_limit))
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(0.5, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^2');
});

test('Test require sympy mode for dummy variable mode', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{int}\left(\left\lbrack any\right\rbrack,\:\left\lbrack m\right\rbrack,\:\left\lbrack m\right\rbrack,\:\left\lbrack dummy\right\rbrack\right)=\left\lbrack m^2\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{int}\left(x,0\left\lbrack m\right\rbrack,\:1\left\lbrack m\right\rbrack,\:x\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
import sympy as sp

def calculate(integrand, lower_limit, upper_limit, var):
    return sp.Integral(integrand, (var, lower_limit, upper_limit))
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await expect(page.locator('.status-footer >> text=Dummy variable type may only be used with SymPy mode')).toBeVisible();
});
