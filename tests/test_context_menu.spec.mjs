import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => {await newSheet(page)});


test('Context menu copy and select all', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#cell-0 >> math-field.editable').type("1+2=");
  await page.locator('#cell-0 >> math-field.editable').click({button: "right"});
  await page.locator('text=Copy').click();

  await page.locator('#add-math-cell').click();
  
  await page.locator('#cell-1 >> math-field.editable').press(modifierKey+"+v");;

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision); 
  
  content = await page.textContent(`#result-value-1`);
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

  // need to click to unselect since copy selects all
  await page.locator('#cell-0 >> math-field.editable').click();
  await page.locator('#cell-0 >> math-field.editable').click({button: "right"});
  await page.locator('text=Select All').click();

  await new Promise((resolver) => setTimeout(resolver, 1000));

  await page.locator('#cell-0 >> math-field.editable').type("3+4=");

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(7, precision); 
  
  content = await page.textContent(`#result-value-1`);
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
});

test('Open context with menu button', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#cell-0 >> math-field.editable').type("1+2=");
  await page.locator('button:has-text("≡")').click();
  await page.locator('text=Select All').click();
  await page.locator('button:has-text("≡")').click();
  await page.getByText('Cut', { exact: true }).click();

  await page.locator('#add-math-cell').click();
  
  await page.locator('#cell-1 >> math-field.editable').press(modifierKey+"+v");;

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await page.waitForSelector('#result-value-0', {state: 'detached'});
  
  let content = await page.textContent(`#result-value-1`);
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
});

test('Select all then context menu copy bug on Safari', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#cell-0 >> math-field.editable').type("1+2=");

  await page.locator('#cell-0 >> math-field.editable').click({button: "right"});
  await page.locator('text=Select All').click();
  
  await new Promise((resolver) => setTimeout(resolver, 1000));
  
  await page.locator('#cell-0 >> math-field.editable').click({button: "right"});
  await page.locator('text=Copy').click();

  await page.locator('#add-math-cell').click();
  
  await page.locator('#cell-1 >> math-field.editable').press(modifierKey+"+v");;

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision); 
  
  content = await page.textContent(`#result-value-1`);
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
});

test('Matrix insert column with context menu', async () => {
  await page.locator('#cell-0 >> math-field.editable').type('[2,1]');
  await page.locator('#cell-0 >> math-field.editable').type('=');
  await page.locator('#cell-0 >> math-field.editable').press('Enter');
  await page.locator('#cell-0 >> math-field.editable').type('a');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('b');

  await page.locator('#cell-0 >> math-field.editable').click({button: "right"});
  await page.locator('text=Insert Column Right').click();

  await new Promise((resolver) => setTimeout(resolver, 1000));

  await page.locator('#cell-0 >> math-field.editable').press('Shift+Tab');
  await page.locator('#cell-0 >> math-field.editable').type('c');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('d');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} a & c \\ b & d \end{bmatrix}`);
});

test('Matrix delete row with context menu', async () => {
  await page.locator('#cell-0 >> math-field.editable').type('[2,1]');
  await page.locator('#cell-0 >> math-field.editable').type('=');
  await page.locator('#cell-0 >> math-field.editable').press('Enter');
  await page.locator('#cell-0 >> math-field.editable').type('a');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('b');

  await page.locator('#cell-0 >> math-field.editable').click({button: "right"});
  await page.locator('text=Delete Row').click();

  await new Promise((resolver) => setTimeout(resolver, 1000));

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} a \end{bmatrix}`);
});

test('Matrix context menu options only visible when in matrix', async () => {
  await page.locator('#cell-0 >> math-field.editable').type('x=');
  await page.locator('#cell-0 >> math-field.editable').press('Enter');
  await page.locator('#cell-0 >> math-field.editable').type('a');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('b');

  await page.locator('#cell-0 >> math-field.editable').click({button: "right"});
  await expect(page.locator('text=Insert Column')).not.toBeVisible();
});