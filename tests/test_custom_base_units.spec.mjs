import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Test custom base units for math cells', async () => {
  await page.setLatex(0, String.raw`1\left\lbrack kg\right\rbrack=`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`1\left\lbrack m^2\right\rbrack=`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`1\left\lbrack kg\cdot m\right\rbrack=`);

  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.getByRole('tab', { name: 'Default Units' }).click();
  await page.getByRole('textbox', { name: 'Mass' }).click();
  await page.getByRole('option', { name: 'g', exact: true }).click();
  await page.getByRole('textbox', { name: 'Length' }).click();
  await page.getByRole('option', { name: 'mm', exact: true }).click();
  await page.getByRole('textbox', { name: 'Area' }).click();
  await page.getByRole('option', { name: 'km^2', exact: true }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1000, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('g');

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(1e-6, precision-2);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('km^2');

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(1e6, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('g^1*mm^1');

  // make sure sheet level settings modified dot is set
  await expect(page.getByTitle('Sheet Settings (Modified')).toBeVisible();

  // set sheet wide settings to default
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.getByRole('button', { name: 'Restore Defaults' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  // sheet wide status dot should be gone
  await expect(page.getByTitle('Sheet Settings (Modified')).not.toBeVisible();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('kg');

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision-2);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m^2');

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('kg^1*m^1');

});