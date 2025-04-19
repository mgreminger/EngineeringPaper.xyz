import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos, e} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Test unicode var', async () => {
    await page.setLatex(0, String.raw`长度=2`);
    
    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`长度=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-1');
    expect(parseLatexFloat(content)).toBeCloseTo(2, precision);
    content = await page.textContent('#result-units-1');
    expect(content).toBe('');
  });

  test('Test var with greek subscript', async () => {
    await page.setLatex(0, String.raw`a_{\omega}=3`);
    
    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`a_{\omega}=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(2, String.raw`a_ω=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(3, String.raw`a_{ω}=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(4, String.raw`a^2_ω=`);
  
    await page.locator('#add-math-cell').click();
    await page.setLatex(5, String.raw`a_{omega}=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-1');
    expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
  
    content = await page.textContent('#result-value-2');
    expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

    content = await page.textContent('#result-value-3');
    expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

    content = await page.textContent('#result-value-4');
    expect(parseLatexFloat(content)).toBeCloseTo(9, precision);

    content = await page.textContent('#result-value-5');
    expect(content).toBe(String.raw`a_{omega}`, precision);
  });

  test('Test leading digit not valid var name', async () => {
    await page.setLatex(0, String.raw`1a=`);
    
    await expect(page.locator('#cell-0 >> svg.error')).toBeVisible();
  });

  test('Test leading underscore not valid var name', async () => {
    await page.setLatex(0, String.raw`_a=`);
    
    await expect(page.locator('#cell-0 >> svg.error')).toBeVisible();
  });

  test('Test trailing underscore not valid var name', async () => {
    await page.setLatex(0, String.raw`a_=`);
    
    await expect(page.locator('#cell-0 >> svg.error')).toBeVisible();
  });

  test('Test var with embedded greek char', async () => {
    await page.setLatex(0, String.raw`a\omega b=4`);
    
    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`a\omega b=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(2, String.raw`aωb=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(3, String.raw`aomegab=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-1');
    expect(parseLatexFloat(content)).toBeCloseTo(4, precision);
  
    content = await page.textContent('#result-value-2');
    expect(parseLatexFloat(content)).toBeCloseTo(4, precision);

    content = await page.textContent('#result-value-3');
    expect(content).toBe(String.raw`aomegab`, precision);
  });

  test('Test single char greek var', async () => {
    await page.setLatex(0, String.raw`\omega_a=5`);
    
    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`\omega_a=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(2, String.raw`ω_a=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(3, String.raw`omega_{a}=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(4, String.raw`omega^2_a=`);

    await page.waitForSelector('text=Updating...', {state: 'detached'});
  
    let content = await page.textContent('#result-value-1');
    expect(parseLatexFloat(content)).toBeCloseTo(5, precision);
  
    content = await page.textContent('#result-value-2');
    expect(parseLatexFloat(content)).toBeCloseTo(5, precision);

    content = await page.textContent('#result-value-3');
    expect(parseLatexFloat(content)).toBeCloseTo(5, precision);

    content = await page.textContent('#result-value-4');
    expect(parseLatexFloat(content)).toBeCloseTo(25, precision);
  });

