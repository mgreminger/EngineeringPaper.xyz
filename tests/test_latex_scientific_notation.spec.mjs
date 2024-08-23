import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, complexLatex, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));


test('Test basic latex scientific notation', async () => {
    await page.setLatex(0, String.raw`3.5\cdot10^3\left\lbrack mm\right\rbrack=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`3.5\cdot10^{-10}\left\lbrack mm\right\rbrack=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(2, String.raw`3.5\times10^{-9}\left\lbrack mm\right\rbrack=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(3, String.raw`-3.5 \cdot 10^{10}\left\lbrack mm\right\rbrack=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-0');
    expect(parseLatexFloat(content)).toBeCloseTo(3.5, precision);
    content = await page.textContent('#result-units-0');
    expect(content).toBe('m');

    content = await page.textContent('#result-value-1');
    expect(parseLatexFloat(content)).toBeCloseTo(3.5e-13, precision);
    content = await page.textContent('#result-units-1');
    expect(content).toBe('m');

    content = await page.textContent('#result-value-2');
    expect(parseLatexFloat(content)).toBeCloseTo(3.5e-12, precision);
    content = await page.textContent('#result-units-2');
    expect(content).toBe('m');

    content = await page.textContent('#result-value-3');
    expect(parseLatexFloat(content)).toBeCloseTo(-3.5e7, precision);
    content = await page.textContent('#result-units-3');
    expect(content).toBe('m');

  });
