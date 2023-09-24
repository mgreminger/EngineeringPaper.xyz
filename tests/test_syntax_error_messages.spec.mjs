import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Error message for empty subscript', async () => {
    // syntax error with second entry
    await page.locator('#cell-0 >> math-field.editable').type('x_');
    await page.locator('#cell-0 >> math-field.editable').press('Tab');
    await page.locator('#cell-0 >> math-field.editable').type('=');
    await page.locator('text=There is an empty subscript that is causing a syntax error').waitFor({state: "attached", timeout: 1000});

    // make sure placeholder gets add when cell loses focus
    await page.locator('#cell-0 >> math-field.editable').press('Escape');
    await page.locator('#cell-0 >> math-field.editable').click();
    await page.locator('#cell-0 >> math-field.editable').press('Home');
    await page.locator('#cell-0 >> math-field.editable').press('Tab');
    await page.locator('#cell-0 >> math-field.editable').type('1');

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    let content = await page.textContent(`#result-value-0`);
    expect(content).toBe(String.raw`x_{1}`);

  });