import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Test water viscosity from temperature and pressure', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.setLatex(0, String.raw`1\left\lbrack centipoise\right\rbrack=\left\lbrack Pa\cdot s\right\rbrack `);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`1\left\lbrack P\right\rbrack=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`1\left\lbrack reyn\right\rbrack=\left\lbrack\frac{lbf\cdot s}{in^2}\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`1\left\lbrack ureyn\right\rbrack=\left\lbrack\frac{lbf\cdot s}{in^2}\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`1\left\lbrack stokes\right\rbrack=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`1\left\lbrack cSt\right\rbrack=\left\lbrack\frac{m^2}{s}\right\rbrack `);

  await page.locator('#add-math-cell').click();
  await page.setLatex(6, String.raw`1\left\lbrack kpsi\right\rbrack=\left\lbrack\frac{lbf}{in^2}\right\rbrack `);

  await page.locator('#add-math-cell').click();
  await page.setLatex(7, String.raw`1\left\lbrack Mpsi\right\rbrack=\left\lbrack\frac{lbf}{in^2}\right\rbrack `);

  await page.locator('#add-math-cell').click();
  await page.setLatex(8, String.raw`1\left\lbrack inHg\right\rbrack= `);

  await page.locator('#add-math-cell').click();
  await page.setLatex(9, String.raw`1\left\lbrack ftH2O\right\rbrack=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(10, String.raw`1\left\lbrack inH2O\right\rbrack=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(11, String.raw`1\left\lbrack Btu\right\rbrack=\left\lbrack BTU\right\rbrack `);

  await page.locator('#add-math-cell').click();
  await page.setLatex(12, String.raw`1\left\lbrack TR\right\rbrack=\left\lbrack\frac{BTU}{hr}\right\rbrack `);

  await page.locator('#add-math-cell').click();
  await page.setLatex(13, String.raw`1\left\lbrack BHP\right\rbrack=\left\lbrack\frac{BTU}{hr}\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(14, String.raw`1\left\lbrack MBH\right\rbrack=\left\lbrack\frac{BTU}{hr}\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(15, String.raw`1\left\lbrack MMBH\right\rbrack=\left\lbrack\frac{BTU}{hr}\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(16, String.raw`1\left\lbrack gf\right\rbrack=\left\lbrack kgf\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(0.001, precision);

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(0.1, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('kg^1*m^-1*s^-1');

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(1e-6, precision);

  content = await page.textContent('#result-value-4');
  expect(parseLatexFloat(content)).toBeCloseTo(1e-4, precision);
  content = await page.textContent('#result-units-4');
  expect(content).toBe('m^2*s^-1');

  content = await page.textContent('#result-value-5');
  expect(parseLatexFloat(content)).toBeCloseTo(1e-6, precision);

  content = await page.textContent('#result-value-6');
  expect(parseLatexFloat(content)).toBeCloseTo(1000, precision);

  content = await page.textContent('#result-value-7');
  expect(parseLatexFloat(content)).toBeCloseTo(1e6, precision);

  content = await page.textContent('#result-value-8');
  expect(parseLatexFloat(content)).toBeCloseTo(3386.38, precision);
  content = await page.textContent('#result-units-8');
  expect(content).toBe('Pa');

  content = await page.textContent('#result-value-9');
  expect(parseLatexFloat(content)).toBeCloseTo(2988.98, precision);
  content = await page.textContent('#result-units-9');
  expect(content).toBe('Pa');

  content = await page.textContent('#result-value-10');
  expect(parseLatexFloat(content)).toBeCloseTo(249.082, precision);
  content = await page.textContent('#result-units-10');
  expect(content).toBe('Pa');

  content = await page.textContent('#result-value-11');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);

  content = await page.textContent('#result-value-12');
  expect(parseLatexFloat(content)).toBeCloseTo(12000, precision);

  content = await page.textContent('#result-value-13');
  expect(parseLatexFloat(content)).toBeCloseTo(33479, precision);

  content = await page.textContent('#result-value-14');
  expect(parseLatexFloat(content)).toBeCloseTo(1000, precision);

  content = await page.textContent('#result-value-16');
  expect(parseLatexFloat(content)).toBeCloseTo(1e-3, precision);
});