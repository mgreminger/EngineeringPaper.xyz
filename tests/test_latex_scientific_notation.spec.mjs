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

test('Test exponent error checking for exponents applied to numbers with units ', async () => {
  await page.setLatex(0, String.raw`2\cdot10^2\left\lbrack m\right\rbrack^2=`);
  await expect(page.locator("#cell-0 >> text=Exponent cannot be applied directly to a number with units")).toBeAttached();

  await page.setLatex(0, String.raw`2\times10^2\left\lbrack m\right\rbrack^2=`);
  await expect(page.locator("#cell-0 >> text=Exponent cannot be applied directly to a number with units")).toBeAttached();

  await page.setLatex(0, String.raw`\left(2\cdot10^2\left\lbrack m\right\rbrack\right)^2=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(40000, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^2');
});

test('Test latex scientific notation order of operations', async () => {
  await page.setLatex(0, String.raw`\left(-2\cdot10^4\left\lbrack mm\right\rbrack+2\left\lbrack m\right\rbrack\right)\cdot2=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`\left(1\left\lbrack m\right\rbrack-2\cdot10^4\left\lbrack mm\right\rbrack\right)\cdot2=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\left(-\left(4\cdot10^4\left\lbrack m^2\right\rbrack\right)^{\frac12}+2000\left\lbrack mm\right\rbrack\right)\cdot2=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\left(2\cdot10^4\left\lbrack m^2\right\rbrack+20000\left\lbrack m^2\right\rbrack\right)^{\frac12}\cdot2=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(-36, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(-38, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(-396, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(400, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m');
});
