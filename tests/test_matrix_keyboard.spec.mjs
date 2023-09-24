import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

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

test('Matrix inverse keyboard entry for two blank matrices', async () => {
  await page.locator('#cell-0 >> math-field.editable').type('([1,2]@[2,1])_1,1');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('=');
  await page.locator('#cell-0 >> math-field.editable').press('Enter');
  await page.locator('#cell-0 >> math-field.editable').type('1');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('2');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('3');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('4');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(11, precision);
});

test('Matrix virtual keyboard entry', async () => {
  await page.getByRole('button', { name: 'Matrices' }).click();
  await page.getByRole('button').filter({ hasText: '2×1' }).click();
  await page.locator('#cell-0 >> math-field.editable').type('a');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('b');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.getByRole('button').filter({ hasText: 'ATAT' }).click();
  
  await page.getByRole('button').filter({ hasText: '××' }).click();

  await page.getByRole('button').filter({ hasText: 'M×N' }).click();

  await page.getByRole('button', { name: 'Increment number' }).first().click();
  await page.getByRole('button', { name: 'Insert', exact: true }).click();

  await page.locator('#cell-0 >> math-field.editable').type('c');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('d');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} a c + b d \end{bmatrix}`);
});
