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

  // make sure cell level output units supersede sheet level selections
  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`1\left\lbrack kg\cdot m\right\rbrack=\left\lbrack mg\cdot Mm\right\rbrack`);

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

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('mg*Mm');

  // make sure sheet level settings modified dot is set
  await expect(page.getByTitle('Sheet Settings (Modified')).toBeVisible();

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

  // check that results have not changed and that sheet level modified dot is still set
  content = await page.textContent('#result-value-0');
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

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('mg*Mm');

  await expect(page.getByTitle('Sheet Settings (Modified')).toBeVisible();

  // set sheet wide settings to default
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.getByRole('button', { name: 'Restore Defaults' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  // sheet wide status dot should be gone
  await expect(page.getByTitle('Sheet Settings (Modified')).not.toBeVisible();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // output units should return to their default values
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

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('mg*Mm');

});

test('Test custom base units for plot cells', async () => {
  await page.setLatex(0, String.raw`y=x`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`y\left(0\left\lbrack kg\right\rbrack\le x\le1000\left\lbrack kg\right\rbrack\right)=`);

  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.getByRole('tab', { name: 'Default Units' }).click();
  await page.getByRole('textbox', { name: 'Mass' }).click();
  await page.getByRole('option', { name: 'tonne', exact: true }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('text=tonne')).toBeAttached();

  // set sheet wide settings back to default
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.getByRole('button', { name: 'Restore Defaults' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('text=tonne')).not.toBeAttached();

});