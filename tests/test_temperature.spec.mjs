import { test, expect } from '@playwright/test';
import { complex, cot, pi, sqrt, tan, cos} from 'mathjs';

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13;

test('Test temperature conversions', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  await page.goto('/');

  await page.locator("text=Accept").click();

  // make sure negative temperatures are converted correctly
  await page.setLatex(0, '-40[degF]=[degC]');

  // test celsius delta
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, '-29[degC] - -30[celsius]=[kelvin]');

  // test fahrenheit delta
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, '50[fahrenheit] - 49[degF]=');

  // test absolute temperature conversion for celsius
  await page.locator('#add-math-cell').click();
  await page.setLatex(3, '10[degC]=');

  // test absolute temperature conversion for rankine
  await page.locator('#add-math-cell').click();
  await page.setLatex(4, '1[degF]=[degR]');

  // test absolute back to celsius
  await page.locator('#add-math-cell').click();
  await page.setLatex(5, '263.15[K]=[degC]');

  // test absolute back to fahreinheit
  await page.locator('#add-math-cell').click();
  await page.setLatex(6, '233.15[K]=[degF]');

  // make sure derived temp dims treated as deltas
  await page.locator('#add-math-cell').click();
  await page.setLatex(7, String.raw`2\left[\frac{1}{degC}\right]=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(8, String.raw`1\left[degF\cdot sec\right]=`);

  await page.waitForSelector('text=Loading Pyodide...', {state: 'detached', timeout: 120000});
  await page.waitForSelector('text=Updating...', {state: 'detached', timeout: 120000});


  let content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(-40, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('degC');

  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('kelvin');

  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(5/9, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('kelvin');

  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(283.15, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('kelvin');

  content = await page.textContent('#result-value-4');
  expect(parseFloat(content)).toBeCloseTo(460.67, precision-1);
  content = await page.textContent('#result-units-4');
  expect(content).toBe('degR');

  content = await page.textContent('#result-value-5');
  expect(parseFloat(content)).toBeCloseTo(-10, precision);
  content = await page.textContent('#result-units-5');
  expect(content).toBe('degC');

  content = await page.textContent('#result-value-6');
  expect(parseFloat(content)).toBeCloseTo(-40, precision);
  content = await page.textContent('#result-units-6');
  expect(content).toBe('degF');

  content = await page.textContent('#result-value-7');
  expect(parseFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-7');
  expect(content).toBe('kelvin^-1');

  content = await page.textContent('#result-value-8');
  expect(parseFloat(content)).toBeCloseTo(5/9, precision);
  content = await page.textContent('#result-units-8');
  expect(content).toBe('sec^1*kelvin^1');

});
