import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Test table assign no units', async () => {
  await page.setLatex(0, String.raw`Col1=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeFocused();

  await page.keyboard.type('11');
  await page.keyboard.press('Enter');
  await page.keyboard.type('22');
  await page.keyboard.press('Enter');
  await page.keyboard.type('0');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 11 \\ 22 \\ 0 \end{bmatrix}`);

  // add row and make sure the result updates
  await page.locator("#data-table-input-1-2-0").click();
  await page.keyboard.press('Enter');
  await page.keyboard.type('33');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 11 \\ 22 \\ 0 \\ 33 \end{bmatrix}`);
});

test('Test table assign with units', async () => {
  await page.setLatex(0, String.raw`Col1=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeFocused();

  await page.keyboard.type('11');
  await page.keyboard.press('Enter');
  await page.keyboard.type('22');
  await page.keyboard.press('Enter');
  await page.keyboard.type('0');

  await page.locator('#parameter-units-1-0 >> math-field').type('[m]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 11\left\lbrack m\right\rbrack  \\ 22\left\lbrack m\right\rbrack  \\ 0\left\lbrack m\right\rbrack  \end{bmatrix}`);

  // add row and make sure the result updates
  await page.locator("#data-table-input-1-2-0").click();
  await page.keyboard.press('Enter');
  await page.keyboard.type('33');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 11\left\lbrack m\right\rbrack  \\ 22\left\lbrack m\right\rbrack  \\ 0\left\lbrack m\right\rbrack  \\ 33\left\lbrack m\right\rbrack  \end{bmatrix}`);
});

test('Test computed column with and without units and adding/deleting rows/cols', async () => {
  await page.setLatex(0, String.raw`Col3=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeFocused();

  await page.keyboard.type('11');
  await page.keyboard.press('Tab');
  await page.keyboard.type('44');
  await page.keyboard.press('Tab');
  await page.keyboard.type('22');
  await page.keyboard.press('Tab');
  await page.keyboard.type('55');
  await page.keyboard.press('Enter');
  await page.keyboard.type('0');

  await page.locator('#add-col-1').click();

  await page.setLatex(1, String.raw`Col1+Col2=`, 2);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe('Col_{3}');

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(55, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(77, precision);

  content = await page.textContent('#grid-cell-1-2-2');
  expect(content.trim()).toBe('');

  // switch to an assign instead of a query
  await page.setLatex(1, String.raw`Col3=2\cdot\left(Col1+Col2\right)`, 2);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 110 \\ 154 \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(110, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(154, precision);

  content = await page.textContent('#grid-cell-1-2-2');
  expect(content.trim()).toBe('');

  // switch to an assign plus query
  await page.setLatex(1, String.raw`Col3=3\cdot\left(Col1+Col2\right)=`, 2);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 165 \\ 231 \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(165, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(231, precision);

  content = await page.textContent('#grid-cell-1-2-2');
  expect(content.trim()).toBe('');

  // add value to last row of second column
  await page.locator("#data-table-input-1-2-1").type('10');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 165 \\ 231 \\ 30 \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(165, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(231, precision);

  content = await page.textContent('#grid-cell-1-2-2');
  expect(parseFloat(content)).toBeCloseTo(30, precision);

  // add units to only first column (should cause dimension error)
  await page.locator('#parameter-units-1-0 >> math-field').type('[m]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeAttached();
  await expect(page.locator('#parameter-name-1-2 >> text=Dimension Error')).toBeAttached();

  // add units to second column to fix dimension error
  await page.locator('#parameter-units-1-1 >> math-field').type('[m]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 165\left\lbrack m\right\rbrack  \\ 231\left\lbrack m\right\rbrack  \\ 30\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(165, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(231, precision);

  content = await page.textContent('#grid-cell-1-2-2');
  expect(parseFloat(content)).toBeCloseTo(30, precision);

  await page.locator('#parameter-units-1-2 >> math-field').click({clickCount: 3});
  await expect(page.locator('#parameter-units-1-2 >> text=\\left\\lbrack m\\right\\rbrack')).toBeAttached();

  // specify custom output units for calculated column
  await page.setLatex(1, String.raw`Col3=3\cdot\left(Col1+Col2\right)=\left\lbrack mm\right\rbrack`, 2);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 165\left\lbrack m\right\rbrack  \\ 231\left\lbrack m\right\rbrack  \\ 30\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(165000, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(231000, precision);

  content = await page.textContent('#grid-cell-1-2-2');
  expect(parseFloat(content)).toBeCloseTo(30000, precision);

  await page.locator('#parameter-units-1-2 >> math-field').click({clickCount: 3});
  await expect(page.locator('#parameter-units-1-2 >> text=\\left\\lbrack mm\\right\\rbrack')).toBeAttached();

  // update one data table value and make sure results update
  await page.locator('#data-table-input-1-1-1').click({clickCount: 3});
  await page.locator('#data-table-input-1-1-1').type('3');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 165\left\lbrack m\right\rbrack  \\ 75\left\lbrack m\right\rbrack  \\ 30\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(165000, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(75000, precision);

  content = await page.textContent('#grid-cell-1-2-2');
  expect(parseFloat(content)).toBeCloseTo(30000, precision);

  await page.locator('#parameter-units-1-2 >> math-field').click({clickCount: 3});
  await expect(page.locator('#parameter-units-1-2 >> text=\\left\\lbrack mm\\right\\rbrack')).toBeAttached();

  // delete first row
  await page.locator('#delete-row-1-0').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 75\left\lbrack m\right\rbrack  \\ 30\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(75000, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(30000, precision);

  await expect(page.locator('#grid-cell-1-2-0')).toBeHidden();

  await page.locator('#parameter-units-1-2 >> math-field').click({clickCount: 3});
  await expect(page.locator('#parameter-units-1-2 >> text=\\left\\lbrack mm\\right\\rbrack')).toBeAttached();

  // delete first col
  await page.locator('#delete-col-1-0').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('#parameter-name-1-1 >> text=Some results do not evaluate to a finite real value, which cannot be displayed in a data table')).toBeAttached();

  // update calculated column equation to no longer reference missing column
  await page.setLatex(1, String.raw`Col3=3\cdot Col2=\left\lbrack mm\right\rbrack`, 1);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 9\left\lbrack m\right\rbrack  \\ 30\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-1');
  expect(parseFloat(content)).toBeCloseTo(9000, precision);

  content = await page.textContent('#grid-cell-1-1-1');
  expect(parseFloat(content)).toBeCloseTo(30000, precision);

  await expect(page.locator('#grid-cell-1-0-2')).toBeHidden();

  await page.locator('#parameter-units-1-1 >> math-field').click({clickCount: 3});
  await expect(page.locator('#parameter-units-1-1 >> text=\\left\\lbrack mm\\right\\rbrack')).toBeAttached();

  // add text to first column first row data table input to force the vector to be zero size
  await page.locator('#data-table-input-1-0-0').type('a');

  await expect(page.locator('#grid-cell-1-0-0 >> text=Data table must contain numeric values')).toBeAttached();
  await expect(page.locator('text=Attempt to use empty column "Col2" in a data table calculation')).toBeAttached();

  // update calculation to not use empty column
  await page.setLatex(1, String.raw`Col3=Col4`, 1);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('#parameter-name-1-1 >> text=Some results do not evaluate to a finite real value, which cannot be displayed in a data table')).toBeAttached();

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`Col_{4}`);

  // add new column and make sure parameter id list updates to include new column
  await page.locator('#add-col-1').click();

  await expect(page.locator('text=Attempt to use empty column "Col4" in a data table calculation')).toBeAttached();

  // add value to first entry of new column and make sure everything updates
  await page.locator('#data-table-input-1-0-2').type('7');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 7 \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-1');
  expect(parseFloat(content)).toBeCloseTo(7, precision);

  content = await page.textContent('#grid-cell-1-1-1');
  expect(content.trim()).toBe('');
});

test('Test auto grow with range output', async () => {
  await page.setLatex(0, String.raw`Col1=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeAttached();

  await expect(page.locator('#data-table-input-1-9-1')).toBeHidden();

  await page.setLatex(1, String.raw`Col1=\mathrm{range}\left(10\right)`, 0);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \\ 4 \\ 5 \\ 6 \\ 7 \\ 8 \\ 9 \\ 10 \end{bmatrix}`);

  await expect(page.locator('#data-table-input-1-9-1')).toBeAttached();

  content = await page.textContent('#grid-cell-1-0-0');
  expect(parseFloat(content)).toBeCloseTo(1, precision);

  content = await page.textContent('#grid-cell-1-1-0');
  expect(parseFloat(content)).toBeCloseTo(2, precision);

  content = await page.textContent('#grid-cell-1-2-0');
  expect(parseFloat(content)).toBeCloseTo(3, precision);

  content = await page.textContent('#grid-cell-1-3-0');
  expect(parseFloat(content)).toBeCloseTo(4, precision);

  content = await page.textContent('#grid-cell-1-4-0');
  expect(parseFloat(content)).toBeCloseTo(5, precision);

  content = await page.textContent('#grid-cell-1-5-0');
  expect(parseFloat(content)).toBeCloseTo(6, precision);

  content = await page.textContent('#grid-cell-1-6-0');
  expect(parseFloat(content)).toBeCloseTo(7, precision);

  content = await page.textContent('#grid-cell-1-7-0');
  expect(parseFloat(content)).toBeCloseTo(8, precision);

  content = await page.textContent('#grid-cell-1-8-0');
  expect(parseFloat(content)).toBeCloseTo(9, precision);

  content = await page.textContent('#grid-cell-1-9-0');
  expect(parseFloat(content)).toBeCloseTo(10, precision);
});

test('Test table assign with base temperature units', async () => {
  await page.setLatex(0, String.raw`Col1=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeFocused();

  await page.keyboard.type('0');
  await page.keyboard.press('Enter');
  await page.keyboard.type('-40');
  await page.keyboard.press('Enter');
  await page.keyboard.type('100');

  await page.locator('#parameter-units-1-0 >> math-field').type('[degC]');

  await page.setLatex(1, String.raw`Col1=\left\lbrack degF\right\rbrack`, 1);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#grid-cell-1-0-1');
  expect(parseFloat(content)).toBeCloseTo(32, 12);

  content = await page.textContent('#grid-cell-1-1-1');
  expect(parseFloat(content)).toBeCloseTo(-40, precision);

  content = await page.textContent('#grid-cell-1-2-1');
  expect(parseFloat(content)).toBeCloseTo(212, 12);
});

test('Test linear interpolation', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  await page.locator('#add-data-table-cell').click();

  await page.locator('#add-col-1').click();

  await page.locator('#data-table-input-1-0-0').click();

  await page.keyboard.type('0');
  await page.keyboard.press('Tab');
  await page.keyboard.type('0');
  await page.keyboard.press('Tab');
  await page.keyboard.type('10');
  await page.keyboard.press('Enter');

  await page.keyboard.type('2');
  await page.keyboard.press('Tab');
  await page.keyboard.type('4');
  await page.keyboard.press('Tab');
  await page.keyboard.type('6');
  await page.keyboard.press('Enter');

  await page.keyboard.type('4');
  await page.keyboard.press('Tab');
  await page.keyboard.type('16');
  await page.keyboard.press('Tab');
  await page.keyboard.type('-6');

  await page.getByRole('button', { name: 'Add Interpolation' }).click();
  await page.getByLabel('Copy function name to').click();

  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+'+v');
  await page.locator('#cell-0 >> math-field.editable').type('(1)=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  // change output and make sure result changes
  await page.locator('#output-radio-1-0-2').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(8, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  // change input and make sure result updates
  await page.locator('#input-radio-1-0-1').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(9, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  // add units to inputs and outputs
  await page.locator('#parameter-units-1-1 >> math-field').type('[m]');
  await page.locator('#parameter-units-1-2 >> math-field').type('[s]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeAttached();

  // update query to fix dimension error
  await page.locator('#cell-0 >> math-field.editable').click({clickCount: 3});
  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+'+v');
  await page.locator('#cell-0 >> math-field.editable').type('(2[m])=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(8, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('s');

  // save sheet to database
  await page.click('#upload-sheet');
  await page.click('text=Confirm');
  await page.waitForSelector('#shareable-link');
  const sheetUrl = new URL(await page.$eval('#shareable-link', el => el.value));
  await page.click('[aria-label="Close the modal"]');

  // clear contents by creating a new sheet
  await page.locator('#new-sheet').click();

  // go back to page that was just saved
  await page.evaluate(() => window.history.back());
  await page.locator('h3 >> text=Retrieving Sheet').waitFor({state: 'detached', timeout: 5000});

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(8, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('s');

  // make sure extrapolation generates an error
  await page.locator('#cell-0 >> math-field.editable').click({clickCount: 3});
  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+'+v');
  await page.locator('#cell-0 >> math-field.editable').type('(17[m])=');

  await expect(page.locator('text=Attempt to extrapolate with an interpolation function')).toBeAttached();

});

test('Test linear interpolation with scaled and offset units', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  await page.locator('#add-data-table-cell').click();

  await page.locator('#data-table-input-1-0-0').click();

  await page.keyboard.type('0');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1.7918');
  await page.keyboard.press('Enter');

  await page.keyboard.type('20');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1.0026');
  await page.keyboard.press('Enter');

  await page.keyboard.type('50');
  await page.keyboard.press('Tab');
  await page.keyboard.type('0.5471');

  await page.getByRole('button', { name: 'Add Interpolation' }).click();
  await page.getByLabel('Copy function name to').click();

  // add units to inputs and outputs
  await page.locator('#parameter-units-1-0 >> math-field').type('[degC]');
  await page.locator('#parameter-units-1-1 >> math-field').type('[cP]');

  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+'+v');
  await page.locator('#cell-0 >> math-field.editable').type('(10[degC])=[cP]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1.3972, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('cP');

});

test('Test polyfit (quadratic and linear)', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  await page.locator('#add-data-table-cell').click();

  await page.locator('#add-col-1').click();

  await page.locator('#data-table-input-1-0-0').click();

  await page.keyboard.type('0');
  await page.keyboard.press('Tab');
  await page.keyboard.type('0');
  await page.keyboard.press('Tab');
  await page.keyboard.type('10');
  await page.keyboard.press('Enter');

  await page.keyboard.type('2');
  await page.keyboard.press('Tab');
  await page.keyboard.type('4');
  await page.keyboard.press('Tab');
  await page.keyboard.type('6');
  await page.keyboard.press('Enter');

  await page.keyboard.type('4');
  await page.keyboard.press('Tab');
  await page.keyboard.type('16');
  await page.keyboard.press('Tab');
  await page.keyboard.type('-6');

  await page.getByRole('button', { name: 'Add Polyfit' }).click();
  await page.getByLabel('Order:').fill('2');
  await page.getByLabel('Copy function name to').click();

  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+'+v');
  await page.locator('#cell-0 >> math-field.editable').type('(1.1)=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1.21, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  // change output and make sure result changes
  await page.locator('#output-radio-1-0-2').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(8.79, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  // change input and order
  await page.getByLabel('Order:').fill('1');
  await page.locator('#input-radio-1-0-1').click();

  // add units to inputs and outputs
  await page.locator('#parameter-units-1-1 >> math-field').type('[m]');
  await page.locator('#parameter-units-1-2 >> math-field').type('[s]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeAttached();

  // update query to fix dimension error
  await page.locator('#cell-0 >> math-field.editable').click({clickCount: 3});
  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+'+v');
  await page.locator('#cell-0 >> math-field.editable').type('(2[m])=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(8, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('s');

  // save sheet to database
  await page.click('#upload-sheet');
  await page.click('text=Confirm');
  await page.waitForSelector('#shareable-link');
  const sheetUrl = new URL(await page.$eval('#shareable-link', el => el.value));
  await page.click('[aria-label="Close the modal"]');

  // clear contents by creating a new sheet
  await page.locator('#new-sheet').click();

  // go back to page that was just saved
  await page.evaluate(() => window.history.back());
  await page.locator('h3 >> text=Retrieving Sheet').waitFor({state: 'detached', timeout: 5000});

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(8, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('s');

  // query symbolic version of polyfit
  await page.locator('#cell-0 >> math-field.editable').click({clickCount: 3});
  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+'+v');
  await page.locator('#cell-0 >> math-field.editable').type('(x)=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe('10.0 - 1.0 \\cdot x');
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test excel file import with headers and no units', async () => {
  await page.setLatex(0, String.raw`col1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`B=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\alpha_1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\sigma_{initial}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`col3=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`G=`);

  await page.locator('#add-data-table-cell').click();

  page.once('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('./tests/spreadsheets/headers_no_units.xlsx');
  });

  await page.getByRole('button', { name: 'Import Spreadsheet' }).click();

  await page.waitForSelector('text=Importing spreadsheet from file', {state: 'detached'});
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4.1 \\ 0 \\ 3 \\ 1 \\ -20.3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`\begin{bmatrix} 9 \\ 8 \\ 7 \\ 0 \\ -1 \\ -2 \\ -3 \\ -3.4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-2`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1.1\times 10^{30} \\ -1.2\times 10^{-30} \\ 0 \\ 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-3`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0 \\ 1 \\ 2 \\ 3 \\ 4 \\ 5 \\ 6 \\ 7 \\ 8 \\ 9 \end{bmatrix}`);

  content = await page.textContent(`#result-value-4`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-5`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4 \\ 5 \\ 6 \\ 7 \end{bmatrix}`);

});

test('Test excel file import with headers and units', async () => {
  await page.setLatex(0, String.raw`col1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`B=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\alpha_1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\sigma_{initial}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`col3=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`G=`);

  await page.locator('#add-data-table-cell').click();

  page.once('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('./tests/spreadsheets/headers_and_units.xlsx');
  });

  await page.getByRole('button', { name: 'Import Spreadsheet' }).click();

  await page.waitForSelector('text=Importing spreadsheet from file', {state: 'detached'});
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4.1\left\lbrack m\right\rbrack  \\ 0\left\lbrack m\right\rbrack  \\ 3\left\lbrack m\right\rbrack  \\ 1\left\lbrack m\right\rbrack  \\ -20.3\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`\begin{bmatrix} 9\left\lbrack s\right\rbrack  \\ 8\left\lbrack s\right\rbrack  \\ 7\left\lbrack s\right\rbrack  \\ 0\left\lbrack s\right\rbrack  \\ -1\left\lbrack s\right\rbrack  \\ -2\left\lbrack s\right\rbrack  \\ -3\left\lbrack s\right\rbrack  \\ -3.4\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-2`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1.1\times 10^{30} \\ -1.2\times 10^{-30} \\ 0 \\ 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-3`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0\left\lbrack m\right\rbrack  \\ 1000\left\lbrack m\right\rbrack  \\ 2000\left\lbrack m\right\rbrack  \\ 3000\left\lbrack m\right\rbrack  \\ 4000\left\lbrack m\right\rbrack  \\ 5000\left\lbrack m\right\rbrack  \\ 6000\left\lbrack m\right\rbrack  \\ 7000\left\lbrack m\right\rbrack  \\ 8000\left\lbrack m\right\rbrack  \\ 9000\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-4`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-5`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4\left\lbrack K\right\rbrack  \\ 5\left\lbrack K\right\rbrack  \\ 6\left\lbrack K\right\rbrack  \\ 7\left\lbrack K\right\rbrack  \end{bmatrix}`);

});

test('Test excel file without headers', async () => {
  await page.setLatex(0, String.raw`A=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`B=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`C=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`D=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`F=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`G=`);

  await page.locator('#add-data-table-cell').click();

  page.once('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('./tests/spreadsheets/no_headers.xlsx');
  });

  await page.getByRole('button', { name: 'Import Spreadsheet' }).click();

  await page.waitForSelector('text=Importing spreadsheet from file', {state: 'detached'});
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4.1 \\ 0 \\ 3 \\ 1 \\ -20.3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`\begin{bmatrix} 9 \\ 8 \\ 7 \\ 0 \\ -1 \\ -2 \\ -3 \\ -3.4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-2`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1.1\times 10^{30} \\ -1.2\times 10^{-30} \\ 0 \\ 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-3`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0 \\ 1 \\ 2 \\ 3 \\ 4 \\ 5 \\ 6 \\ 7 \\ 8 \\ 9 \end{bmatrix}`);

  content = await page.textContent(`#result-value-4`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-5`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4 \\ 5 \\ 6 \\ 7 \end{bmatrix}`);

});

test('Test csv file import with headers and units', async () => {
  await page.setLatex(0, String.raw`col1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`B=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\alpha_1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\sigma_{initial}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`col3=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`G=`);

  await page.locator('#add-data-table-cell').click();

  page.once('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('./tests/spreadsheets/headers_and_units.csv');
  });

  await page.getByRole('button', { name: 'Import Spreadsheet' }).click();

  await page.waitForSelector('text=Importing spreadsheet from file', {state: 'detached'});
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4.1\left\lbrack m\right\rbrack  \\ 0\left\lbrack m\right\rbrack  \\ 3\left\lbrack m\right\rbrack  \\ 1\left\lbrack m\right\rbrack  \\ -20.3\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`\begin{bmatrix} 9\left\lbrack s\right\rbrack  \\ 8\left\lbrack s\right\rbrack  \\ 7\left\lbrack s\right\rbrack  \\ 0\left\lbrack s\right\rbrack  \\ -1\left\lbrack s\right\rbrack  \\ -2\left\lbrack s\right\rbrack  \\ -3\left\lbrack s\right\rbrack  \\ -3.4\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-2`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1.1\times 10^{30} \\ -1.2\times 10^{-30} \\ 0 \\ 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-3`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0\left\lbrack m\right\rbrack  \\ 1000\left\lbrack m\right\rbrack  \\ 2000\left\lbrack m\right\rbrack  \\ 3000\left\lbrack m\right\rbrack  \\ 4000\left\lbrack m\right\rbrack  \\ 5000\left\lbrack m\right\rbrack  \\ 6000\left\lbrack m\right\rbrack  \\ 7000\left\lbrack m\right\rbrack  \\ 8000\left\lbrack m\right\rbrack  \\ 9000\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-4`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-5`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4\left\lbrack K\right\rbrack  \\ 5\left\lbrack K\right\rbrack  \\ 6\left\lbrack K\right\rbrack  \\ 7\left\lbrack K\right\rbrack  \end{bmatrix}`);

});

test('Test csv export and reload', async () => {
  await page.setLatex(0, String.raw`col1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`B=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\alpha_1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\sigma_{initial}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`col3=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`G=`);

  await page.locator('#add-data-table-cell').click();

  page.once('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('./tests/spreadsheets/headers_and_units.csv');
  });

  await page.getByRole('button', { name: 'Import Spreadsheet' }).click();

  await page.waitForSelector('text=Importing spreadsheet from file', {state: 'detached'});
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4.1\left\lbrack m\right\rbrack  \\ 0\left\lbrack m\right\rbrack  \\ 3\left\lbrack m\right\rbrack  \\ 1\left\lbrack m\right\rbrack  \\ -20.3\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`\begin{bmatrix} 9\left\lbrack s\right\rbrack  \\ 8\left\lbrack s\right\rbrack  \\ 7\left\lbrack s\right\rbrack  \\ 0\left\lbrack s\right\rbrack  \\ -1\left\lbrack s\right\rbrack  \\ -2\left\lbrack s\right\rbrack  \\ -3\left\lbrack s\right\rbrack  \\ -3.4\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-2`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1.1\times 10^{30} \\ -1.2\times 10^{-30} \\ 0 \\ 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-3`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0\left\lbrack m\right\rbrack  \\ 1000\left\lbrack m\right\rbrack  \\ 2000\left\lbrack m\right\rbrack  \\ 3000\left\lbrack m\right\rbrack  \\ 4000\left\lbrack m\right\rbrack  \\ 5000\left\lbrack m\right\rbrack  \\ 6000\left\lbrack m\right\rbrack  \\ 7000\left\lbrack m\right\rbrack  \\ 8000\left\lbrack m\right\rbrack  \\ 9000\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-4`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-5`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4\left\lbrack K\right\rbrack  \\ 5\left\lbrack K\right\rbrack  \\ 6\left\lbrack K\right\rbrack  \\ 7\left\lbrack K\right\rbrack  \end{bmatrix}`);

  let [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Export CSV' }).click()
  ]);

  // open a different file first to make sure results change
  page.once('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('./tests/spreadsheets/headers_no_units.xlsx');
  });

  await page.getByRole('button', { name: 'Import Spreadsheet' }).click();

  await page.waitForSelector('text=Importing spreadsheet from file', {state: 'detached'});
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4.1 \\ 0 \\ 3 \\ 1 \\ -20.3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`\begin{bmatrix} 9 \\ 8 \\ 7 \\ 0 \\ -1 \\ -2 \\ -3 \\ -3.4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-2`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1.1\times 10^{30} \\ -1.2\times 10^{-30} \\ 0 \\ 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-3`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0 \\ 1 \\ 2 \\ 3 \\ 4 \\ 5 \\ 6 \\ 7 \\ 8 \\ 9 \end{bmatrix}`);

  content = await page.textContent(`#result-value-4`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-5`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4 \\ 5 \\ 6 \\ 7 \end{bmatrix}`);

  // re-open csv file that was previously saved to make sure results are still the same
  page.once('filechooser', async (fileChooser) => {
    await fileChooser.setFiles(await download.path());
  });

  await page.getByRole('button', { name: 'Import Spreadsheet' }).click();

  await page.waitForSelector('text=Importing spreadsheet from file', {state: 'detached'});

  // need to fix latex parameter name since that won't survive the round trip
  await page.setLatex(6, String.raw`\sigma_{initial}`, 3);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4.1\left\lbrack m\right\rbrack  \\ 0\left\lbrack m\right\rbrack  \\ 3\left\lbrack m\right\rbrack  \\ 1\left\lbrack m\right\rbrack  \\ -20.3\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`\begin{bmatrix} 9\left\lbrack s\right\rbrack  \\ 8\left\lbrack s\right\rbrack  \\ 7\left\lbrack s\right\rbrack  \\ 0\left\lbrack s\right\rbrack  \\ -1\left\lbrack s\right\rbrack  \\ -2\left\lbrack s\right\rbrack  \\ -3\left\lbrack s\right\rbrack  \\ -3.4\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-2`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1.1\times 10^{30} \\ -1.2\times 10^{-30} \\ 0 \\ 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-3`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0\left\lbrack m\right\rbrack  \\ 1000\left\lbrack m\right\rbrack  \\ 2000\left\lbrack m\right\rbrack  \\ 3000\left\lbrack m\right\rbrack  \\ 4000\left\lbrack m\right\rbrack  \\ 5000\left\lbrack m\right\rbrack  \\ 6000\left\lbrack m\right\rbrack  \\ 7000\left\lbrack m\right\rbrack  \\ 8000\left\lbrack m\right\rbrack  \\ 9000\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-4`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-5`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4\left\lbrack K\right\rbrack  \\ 5\left\lbrack K\right\rbrack  \\ 6\left\lbrack K\right\rbrack  \\ 7\left\lbrack K\right\rbrack  \end{bmatrix}`);

});

test('Test fluid function in data table', async () => {
  await page.setLatex(0, String.raw`\rho_{3,1}=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeFocused();

  await page.keyboard.type('.1');
  await page.keyboard.press('Enter');
  await page.keyboard.type('1');
  await page.keyboard.press('Enter');
  await page.keyboard.type('1.1');

  await page.locator('#parameter-units-1-0 >> math-field').type('[atm]');

  await page.setLatex(1, String.raw`P`, 0);
  await page.setLatex(1, String.raw`\rho=\mathrm{WaterDGivenTP}\left(20\left\lbrack degC\right\rbrack,P\right)`, 1);

  await page.locator('#add-fluid-cell').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(998.2117920164021, 12);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('kg^1*m^-3');

  content = await page.textContent('#grid-cell-1-0-1');
  expect(parseFloat(content)).toBeCloseTo(998.16537204293, precision);

  content = await page.textContent('#grid-cell-1-1-1');
  expect(parseFloat(content)).toBeCloseTo(998.2071504679284, precision);

  content = await page.textContent('#grid-cell-1-2-1');
  expect(parseFloat(content)).toBeCloseTo(998.2117920164021, precision);
});

test('Test with function that has custom units function (max)', async () => {
  await page.setLatex(0, String.raw`Col3_{2,1}=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeFocused();

  await page.keyboard.type('1');
  await page.keyboard.press('Tab');
  await page.keyboard.type('0');
  await page.keyboard.press('Enter');
  await page.keyboard.type('2');
  await page.keyboard.press('Tab');
  await page.keyboard.type('4000');

  await page.locator('#parameter-units-1-0 >> math-field').type('[m]');
  await page.locator('#parameter-units-1-1 >> math-field').type('[mm]');

  await page.locator('#add-col-1').click();

  await page.setLatex(1, String.raw`Col3=\mathrm{max}\left(Col1,Col2\right)=`, 2);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(1, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(4, precision);
});

test('Test with nested calculated columns', async () => {
  await page.setLatex(0, String.raw`Col4_{2,1}=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeFocused();

  await page.keyboard.type('1');
  await page.keyboard.press('Tab');
  await page.keyboard.type('.002');
  await page.keyboard.press('Enter');
  await page.keyboard.type('4');
  await page.keyboard.press('Tab');
  await page.keyboard.type('.005');

  await page.locator('#parameter-units-1-0 >> math-field').type('[m]');
  await page.locator('#parameter-units-1-1 >> math-field').type('[km]');

  await page.locator('#add-col-1').click();
  await page.setLatex(1, String.raw`Col3=Col1+Col2`, 2);

  await page.locator('#add-col-1').click();
  await page.setLatex(1, String.raw`Col4=Col3\cdot Col3`, 3);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(81, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^2');

  content = await page.textContent('#grid-cell-1-0-3');
  expect(parseFloat(content)).toBeCloseTo(9, precision);

  content = await page.textContent('#grid-cell-1-1-3');
  expect(parseFloat(content)).toBeCloseTo(81, precision);

  // delete third column and check that results update to include variable name for missing Col3
  await page.locator('#delete-col-1-2').click();
  await page.setLatex(0, String.raw`Col4=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('#parameter-name-1-2 >> text=Some results do not evaluate to a finite real value, which cannot be displayed in a data table')).toBeAttached();

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`Col_{3}^{2}`);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test enter handling for first col output', async () => {
  await page.setLatex(0, String.raw`Col2=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeVisible();

  await page.setLatex(1, String.raw`\mathrm{range}\left(1\right)=`, 0);

  await page.locator('#data-table-input-1-0-1').click();

  await page.keyboard.type('11');
  await page.keyboard.press('Enter');
  await page.keyboard.type('22');
  await page.keyboard.press('Enter');
  await page.keyboard.type('0');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 11 \\ 22 \\ 0 \end{bmatrix}`);

});

test('Test delete blank columns', async () => {
  await page.setLatex(0, String.raw`Col1=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeAttached();

  await page.setLatex(1, String.raw`Col1=\mathrm{range}\left(10\right)`, 0);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \\ 4 \\ 5 \\ 6 \\ 7 \\ 8 \\ 9 \\ 10 \end{bmatrix}`);

  // shorten range to create blank rows
  await page.setLatex(1, String.raw`Col1=\mathrm{range}\left(5\right)`, 0);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('#data-table-input-1-9-1')).toBeAttached();

  await page.locator('#delete-blank-rows-1').click();

  await expect(page.locator('#data-table-input-1-5-1')).toBeHidden();

  content = await page.textContent('#grid-cell-1-0-0');
  expect(parseFloat(content)).toBeCloseTo(1, precision);

  content = await page.textContent('#grid-cell-1-1-0');
  expect(parseFloat(content)).toBeCloseTo(2, precision);

  content = await page.textContent('#grid-cell-1-2-0');
  expect(parseFloat(content)).toBeCloseTo(3, precision);

  content = await page.textContent('#grid-cell-1-3-0');
  expect(parseFloat(content)).toBeCloseTo(4, precision);

  content = await page.textContent('#grid-cell-1-4-0');
  expect(parseFloat(content)).toBeCloseTo(5, precision);

  // make all cells blank and delete blank rows again
  // shorten range to create blank rows
  await page.setLatex(1, String.raw`Col1=`, 0);

  await page.locator('#delete-blank-rows-1').click();

  await expect(page.locator('#data-table-input-1-1-1')).toBeHidden();
  await expect(page.locator('#data-table-input-1-0-1')).toBeAttached();

  await expect(page.locator('#delete-blank-rows-1')).toBeHidden();

  // make sure one dangling value prevents row deletion
  await page.locator('#add-row-1').click();
  await page.locator('#add-row-1').click();
  await page.locator('#add-row-1').click();
  await page.locator('#add-row-1').click();

  await page.locator('#data-table-input-1-3-1').type('12');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await page.locator('#delete-blank-rows-1').click();

  await expect(page.locator('#data-table-input-1-1-4')).toBeHidden();

  content = await page.textContent('#grid-cell-1-3-1');
  expect(parseFloat(content)).toBeCloseTo(12, precision);
});

test('Test greek character function name', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  await page.locator('#add-data-table-cell').click();

  await page.locator('#add-col-1').click();

  await page.locator('#data-table-input-1-0-0').click();

  await page.keyboard.type('0');
  await page.keyboard.press('Tab');
  await page.keyboard.type('0');
  await page.keyboard.press('Tab');
  await page.keyboard.type('10');
  await page.keyboard.press('Enter');

  await page.keyboard.type('2');
  await page.keyboard.press('Tab');
  await page.keyboard.type('4');
  await page.keyboard.press('Tab');
  await page.keyboard.type('6');
  await page.keyboard.press('Enter');

  await page.keyboard.type('4');
  await page.keyboard.press('Tab');
  await page.keyboard.type('16');
  await page.keyboard.press('Tab');
  await page.keyboard.type('-6');

  await page.getByRole('button', { name: 'Add Interpolation' }).click();
  await page.locator('#interpolation-name-1-0 >> math-field').click({clickCount: 3});
  await page.locator('#interpolation-name-1-0 >> math-field').type('alpha_1');

  await page.locator('#cell-0 >> math-field.editable').type('alpha_1');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowRight');
  await page.locator('#cell-0 >> math-field.editable').type('(1)=');
  await page.locator('#cell-0 >> math-field.editable').press('Enter');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  await page.locator('#cell-0 >> math-field.editable').type(' ');
  await page.locator('#cell-0 >> math-field.editable').press('Enter');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test interpolation and polyfit with numerical solve', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.setLatex(0, String.raw`t1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`t2=`);

  await page.locator('#add-data-table-cell').click();

  await page.locator('#add-col-2').click();

  await page.locator('#parameter-units-2-0 >> math-field').type('[s]');
  await page.locator('#parameter-units-2-1 >> math-field').type('[m]');
  await page.locator('#parameter-units-2-2 >> math-field').type('[m]');

  await page.locator('#data-table-input-2-0-0').click();

  await page.keyboard.type('0');
  await page.keyboard.press('Tab');
  await page.keyboard.type('0');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1');
  await page.keyboard.press('Enter');

  await page.keyboard.type('1');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1');
  await page.keyboard.press('Tab');
  await page.keyboard.type('0');

  await page.getByRole('button', { name: 'Add Interpolation' }).click();
  await page.getByRole('button', { name: 'Add Interpolation' }).click();
  await page.getByRole('button', { name: 'Add Polyfit' }).click();
  await page.getByRole('button', { name: 'Add Polyfit' }).click();

  await page.locator('#output-radio-2-1-2').click();
  await page.locator('#output-radio-2-3-2').click();

  await page.locator('#add-system-cell').click();
  await page.locator('#system-expression-3-0 math-field.editable').type('Interp1(t1)=Interp2(t1)');
  await page.locator('#system-parameterlist-3 math-field.editable').type('t1~0.1[s]');

  await page.locator('#add-system-cell').click();
  await page.locator('#system-expression-4-0 math-field.editable').type('Interp1(t2)=Interp2(t2)');
  await page.locator('#system-parameterlist-4 math-field.editable').type('t2~0.1[s]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(0.5, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('s');

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(0.5, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('s');

});

test('Test factorial function in data table', async () => {
  await page.setLatex(0, String.raw`Col2=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeFocused();

  await page.keyboard.type('1');
  await page.keyboard.press('Enter');
  await page.keyboard.type('2');
  await page.keyboard.press('Enter');
  await page.keyboard.type('3.00');

  await page.setLatex(1, String.raw`Col2=Col1!=`, 1);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 6 \end{bmatrix}`);

});

test('Test data table user function exponent bug', async () => {
  await page.setLatex(0, String.raw`y=2\left\lbrack m\right\rbrack^{\frac{x}{1\left\lbrack in\right\rbrack}}`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`Col2=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-2-0-0')).toBeFocused();

  await page.keyboard.type('1');
  await page.keyboard.press('Enter');
  await page.keyboard.type('2');
  await page.keyboard.press('Enter');
  await page.keyboard.type('3');

  await page.locator('#parameter-units-2-0 >> math-field').type('[in]');

  await page.setLatex(2, String.raw`Col2=y\left(x=Col1\right)`, 1);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`\begin{bmatrix} 2\left\lbrack m\right\rbrack  \\ 4\left\lbrack m\right\rbrack  \\ 8\left\lbrack m\right\rbrack  \end{bmatrix}`);
});

test('Test linear interpolation with plotting', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-data-table-cell').click();

  await page.locator('#data-table-input-1-0-0').click();

  await page.keyboard.type('10');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1');
  await page.keyboard.press('Enter');

  await page.keyboard.type('20');
  await page.keyboard.press('Tab');
  await page.keyboard.type('2');
  await page.keyboard.press('Enter');

  await page.keyboard.type('30');
  await page.keyboard.press('Tab');
  await page.keyboard.type('3');

  await page.getByRole('button', { name: 'Add Interpolation' }).click();
  await page.getByLabel('Copy function name to').click();

  await page.locator('#cell-0 >> math-field.editable').type('(x,');
  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+'+v');
  await page.locator('#cell-0 >> math-field.editable').type('(x)) for (10<=x<=30)=');

  await page.waitForSelector('div.status-footer', {state: 'detached'});
  await expect(page.locator('g.trace.scatter')).toBeVisible();
});