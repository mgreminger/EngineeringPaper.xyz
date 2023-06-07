import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Check parsing error handling with multiple assignments', async () => {
    // syntax error with second entry
    await page.setLatex(0, 'x=5.11,y=6..');
    await page.locator('text=Invalid Syntax').waitFor({state: "attached", timeout: 1000});

    // unrecognized units
    await page.setLatex(0, 'x=5.11,y=6[mmm]');
    await page.locator('text=Unknown Dimension mmm').waitFor({state: "attached", timeout: 1000});

    // assignment to pi
    await page.setLatex(0, 'x=1,\\pi=2.1');
    await page.locator('text=Attempt to reassign reserved value pi').waitFor({state: "attached", timeout: 1000});

    // assignment to i
    await page.setLatex(0, 'i=1,y=2.1');
    await page.locator('text=Attempt to reassign reserved variable name I').waitFor({state: "attached", timeout: 1000});

    // make sure combined query and multiple assignment triggers syntax error
    await page.setLatex(0, String.raw`s=40\left\lbrack m\right\rbrack,z=30\left\lbrack miles\right\rbrack=`);
    await page.locator('text=Invalid Syntax').waitFor({state: "attached", timeout: 1000});

    // make sure everything still works with valid input
    await page.setLatex(0, 'x=1,y=2');
    await page.locator('#add-math-cell').click();
    await page.locator('math-field.editable').nth(1).type('x=');
    await page.locator('#add-math-cell').click();
    await page.locator('math-field.editable').nth(2).type('y=');

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    let content = await page.textContent(`#result-value-1`);
    expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
    
    content = await page.textContent(`#result-value-2`);
    expect(parseLatexFloat(content)).toBeCloseTo(2, precision);

  });


  test('Test multiple assignment', async () => {
    // number, number with units, and expression
    await page.locator('math-field.editable').type('x=2,y=3[m],z=x*y');
    await page.locator('#add-math-cell').click();
    await page.locator('math-field.editable').nth(1).type('x=');
    await page.locator('#add-math-cell').click();
    await page.locator('math-field.editable').nth(2).type('y=');
    await page.locator('#add-math-cell').click();
    await page.locator('math-field.editable').nth(3).type('z=');

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    let content = await page.textContent(`#result-value-1`);
    expect(parseLatexFloat(content)).toBeCloseTo(2, precision);

    content = await page.textContent(`#result-value-2`);
    expect(parseLatexFloat(content)).toBeCloseTo(3, precision); 
    content = await page.textContent('#result-units-2');
    expect(content).toBe('m'); 

    content = await page.textContent(`#result-value-3`);
    expect(parseLatexFloat(content)).toBeCloseTo(6, precision); 
    content = await page.textContent('#result-units-3');
    expect(content).toBe('m'); 

    // reverse order and add external dependency later in document
    await page.setLatex(0, String.raw`z=x\cdot y\cdot s,x=2^{\frac{s}{40\left\lbrack m\right\rbrack}},y=3[m]`);
    await page.locator('#add-math-cell').click();
    await page.locator('math-field.editable').nth(4).type('s=40[m]');

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    content = await page.textContent(`#result-value-1`);
    expect(parseLatexFloat(content)).toBeCloseTo(2, precision);

    content = await page.textContent(`#result-value-2`);
    expect(parseLatexFloat(content)).toBeCloseTo(3, precision); 
    content = await page.textContent('#result-units-2');
    expect(content).toBe('m'); 

    content = await page.textContent(`#result-value-3`);
    expect(parseLatexFloat(content)).toBeCloseTo(240, precision); 
    content = await page.textContent('#result-units-3');
    expect(content).toBe('m^2');

  });


  test('Check error handling with combined assignment query', async () => {
    // unrecognized assignment units
    await page.setLatex(0, 'x=5.11[mmm]=');
    await page.locator('text=Unknown Dimension mmm').waitFor({state: "attached", timeout: 1000});

    // unrecognized query units
    await page.setLatex(0, 'x=5.11[mm]=[sss]');
    await page.locator('text=Unknown Dimension sss').waitFor({state: "attached", timeout: 1000});

    // make sure everything still works with valid input
    await page.setLatex(0, 'x=5.11[mm]=[mm]');

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    let content = await page.textContent(`#result-value-0`);
    expect(parseLatexFloat(content)).toBeCloseTo(5.11, precision);
    content = await page.textContent('#result-units-0');
    expect(content).toBe('mm'); 
  });


  test('Test combined assignment query', async () => {
    // number, number with units, and expression
    await page.locator('math-field.editable').type('x=s*20[m]=[cm^2');
    await page.locator('math-field.editable').press('Tab');
    await page.locator('math-field.editable').type(']');
    await page.locator('#add-math-cell').click();
    await page.locator('math-field.editable').nth(1).type('x=');
    await page.locator('#add-math-cell').click();
    await page.locator('math-field.editable').nth(2).type('s=3[m]');

    await page.waitForSelector('text=Updating...', {state: 'detached'});

    let content = await page.textContent(`#result-value-0`);
    expect(parseLatexFloat(content)).toBeCloseTo(600000, precision);
    content = await page.textContent('#result-units-0');
    expect(content).toBe('cm^2'); 

    content = await page.textContent(`#result-value-1`);
    expect(parseLatexFloat(content)).toBeCloseTo(60, precision); 
    content = await page.textContent('#result-units-1');
    expect(content).toBe('m^2'); 

  });



