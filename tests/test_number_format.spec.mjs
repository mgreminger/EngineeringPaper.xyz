import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Test round trip full precision', async () => {
  // enter 100 significant figures of pi to test round trip precision
  await page.locator('math-field.editable').type('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117068=');

  // check default precision (15 significant figures)
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe('3.14159265358979');

  // change to max precision (64 significant figures)
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.getByLabel('Significant Figures').dblclick();
  await page.getByLabel('Significant Figures').fill('64');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent(`#result-value-0`);
  expect(content).toBe('3.141592653589793238462643383279502884197169399375105820974944592');

});

