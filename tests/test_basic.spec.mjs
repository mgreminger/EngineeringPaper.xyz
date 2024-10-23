import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Test basic functionality', async () => {
  // Test basic dimensional analysis and unit conversion
  await page.type(':nth-match(math-field.editable, 1)', 'x=3[inch]');

  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', 'y=4[inch]');

  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 3)', 'length=sqrtx^2');
  await page.press(':nth-match(math-field.editable, 3)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 3)', '+y^2');
  // test using enter key for adding math cell
  await page.press(':nth-match(math-field.editable, 3)', 'Enter');

  await page.type(':nth-match(math-field.editable, 4)', 'length=[inch]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  let content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(5, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('inch')

  // test removal of units for query statement to make sure updates happen
  for(let i = 0; i<6; i++) {
    await page.press(':nth-match(math-field.editable, 4)', 'Backspace');
  }
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(0.127, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m')

  // delete all cells and test moving cells
  for(let i=0; i<4; i++) {
    await page.forceDeleteCell(0);
  }

  for (let i=0; i<4; i++) {
    await page.click('#add-math-cell');
  }

  await page.type(':nth-match(math-field.editable, 1)', '1[mm] = [m]' );
  await page.type(':nth-match(math-field.editable, 2)', '2[mm] = [mm]' );
  await page.type(':nth-match(math-field.editable, 3)', '3[mm] = [cm]' );
  await page.type(':nth-match(math-field.editable, 4)', '4[mm] = [dm]' );
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-3');
  expect(content).toBe('dm');

  await page.click('#up-2');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0')
  expect(parseLatexFloat(content)).toBeCloseTo(0.001, precision)
  content = await page.textContent('#result-value-1')
  expect(parseLatexFloat(content)).toBeCloseTo(0.3, precision)
  content = await page.textContent('#result-value-2')
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision)
  content = await page.textContent('#result-value-3')
  expect(parseLatexFloat(content)).toBeCloseTo(0.04, precision)

  await page.click('#down-0');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0')
  expect(parseLatexFloat(content)).toBeCloseTo(0.3, precision)
  content = await page.textContent('#result-value-1')
  expect(parseLatexFloat(content)).toBeCloseTo(0.001, precision)
  content = await page.textContent('#result-value-2')
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision)
  content = await page.textContent('#result-value-3')
  expect(parseLatexFloat(content)).toBeCloseTo(0.04, precision)

  // test deleting cells at middle, beginning, and end
  await page.forceDeleteCell(1);
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0')
  expect(parseLatexFloat(content)).toBeCloseTo(0.3, precision)
  content = await page.textContent('#result-value-1')
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision)
  content = await page.textContent('#result-value-2')
  expect(parseLatexFloat(content)).toBeCloseTo(0.04, precision)

  await page.forceDeleteCell(0);
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0')
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision)
  content = await page.textContent('#result-value-1')
  expect(parseLatexFloat(content)).toBeCloseTo(0.04, precision)

  await page.forceDeleteCell(1);
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);

  await page.forceDeleteCell(0);

  // test exponents
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', '2[mm]^2');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 1)', '+2[mm]^(1+3)^1/2');
  for (let i = 0; i<3; i++) {
    await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight');
  }
  await page.press(':nth-match(math-field.editable, 1)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(8.0e-6, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^2')

  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', '2^2');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 2)', '+2^1+3^1/2');
  for (let i = 0; i<3; i++) {
    await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  }
  await page.press(':nth-match(math-field.editable, 2)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(10.643994170967826, precision);

  await page.click("#add-math-cell");
  await page.type(':nth-match(math-field.editable, 3)', '3^3^3');
  await page.press(':nth-match(math-field.editable, 3)', 'ArrowRight');
  await page.press(':nth-match(math-field.editable, 3)', 'ArrowRight');
  await page.press(':nth-match(math-field.editable, 3)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(7625597484987, 13);

  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);


  // test order of operations
  await page.click("#add-math-cell");
  await page.type(':nth-match(math-field.editable, 1)', '/36^1/2');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 1)', '2');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 1)', '*(1+2)=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(9, precision);

  await page.forceDeleteCell(0);

  // test incompatible units
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', '1[meter] + 2[sec]=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeVisible();

  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', '/0.010[m]*2[mm]');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 2)', '5[sec]');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 2)', '+/(1[inches]/25.4');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 2)', ')*12[mm]');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 2)', '6[sec]');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.press(':nth-match(math-field.editable, 2)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(6e-6, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m^2*s^-1');

  await page.type(':nth-match(math-field.editable, 2)', '[/mm^2');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 2)', 'sec');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.press(':nth-match(math-field.editable, 2)', ']');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);

  await page.press(':nth-match(math-field.editable, 2)', 'ArrowLeft');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowLeft');
  for(let i=0; i<3; i++){
    await page.press(':nth-match(math-field.editable, 2)', 'Backspace');
  }
  await page.type(':nth-match(math-field.editable, 2)', 'gallon');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await expect(page.locator('#cell-1 >> text=Units Mismatch')).toBeVisible();

  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);

  // duplicate assignment detection
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', 'x=1')
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', 'x=2');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('div.bx--inline-loading__text');
  expect(content).toBe('Error: Duplicate assignment of variable x');

  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);

  // circular reference detection
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', 'x=y');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', 'y=z');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 3)', 'z=x');
  await expect(page.locator('text=Updating...')).toBeHidden();
  content = await page.textContent('div.bx--inline-loading__text');
  expect(content).toBe('Error: Circular reference detected');

  for(let i=0; i<3; i++){
    await page.forceDeleteCell(0);
  }

  // test topological sorting 
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', 'x=/-b+sqrtb^2');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 1)', '-4*a*c');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 1)', '2*a');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', 'x=[m]');
  // output is tall so button may move if clicked before update is completed
  // this leads to occasional test failures
  await page.waitForSelector('text=Updating...', {state: 'detached'}); 
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 3)', 'a=1');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 4)', 'b=-5[m]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 5)', 'c=6[m*m]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m')

  for(let i=0; i<5; i++) {
    await page.forceDeleteCell(0);
  }

  // test pi and Euler's number
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', 'pi=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(3.14159265358979323846264338328, 14);

  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', 'e=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(2.71828182845904523536028747135, 14);

  // The variable name E needs to be remapped internally since E is Euler's number in Sympy
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 3)', 'E=10');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 4)', 'E=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(10, precision);

  // make sure e, pi, and i cannot be reassigned (should result in syntax error)
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 5)', 'e=20');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 6)', 'pi=30');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 7)', 'i=30');
  expect(await page.$eval(':nth-match(math-field.editable, 5)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();
  expect(await page.$eval(':nth-match(math-field.editable, 6)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();
  expect(await page.$eval(':nth-match(math-field.editable, 7)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();
  
  for (let i=0; i<7; i++) {
    await page.forceDeleteCell(0);
  }
      
  // test logarithmic functions
  // first check that paranthesis are required for functions
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', 'ln 20=');
  expect(await page.$eval(':nth-match(math-field.editable, 1)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();
  await page.forceDeleteCell(0);

  // now check natural logarithm
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', 'ln(e^2.1');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 1)', ')=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(2.1, precision);

  // make sure that providing inits to input argument to ln results in dimension error
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', 'ln(5[inches])=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await expect(page.locator('#cell-1 >> text=Dimension Error')).toBeVisible();

  // check base 10 log
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 3)', 'log(100)=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);

  // check log with specified base
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 4)', 'log_2');
  await page.press(':nth-match(math-field.editable, 4)', 'Tab');
  await page.type(':nth-match(math-field.editable, 4)', '8');
  await page.press(':nth-match(math-field.editable, 4)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 4)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

  // make sure log base is unitless
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 5)', 'log_2[inches]');
  await page.press(':nth-match(math-field.editable, 5)', 'Tab');
  await page.type(':nth-match(math-field.editable, 5)', '8');
  await page.press(':nth-match(math-field.editable, 5)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 5)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await expect(page.locator('#cell-4 >> text=Dimension Error')).toBeVisible();

  // check log without slash
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 6)', 'log(1000)=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-5');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

  // stress test automatic back slash insertion
  await page.click('#add-math-cell');
  await page.setLatex(6, String.raw`-1\cdot cos\left(arctan\left(1\right)\cdot 4\right)+\frac{ln\left(e^{log\left(100\right)}\right)^{log\left(100\right)}}{ln\left(e^{2}\right)}=`);
  await page.keyboard.press('Escape'); // force backslash insertion
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-6');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

  for (let i=0; i<7; i++) {
    await page.forceDeleteCell(0);
  }

  // test scientific notation
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', '10e-1[m]+1.E+16*x-1e17[m]=[mm]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', 'x=1.0e1[m]')
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1000, precision);

  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);

  // don't attempt unit conversion on result that is not finite
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', '1[m]/0');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 1)', '=[inch]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await expect(page.locator('#cell-0 >> text=User Units Not Supported for Symbolic Results')).toBeVisible();

  await page.forceDeleteCell(0);

  // test abs
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', '|-12[inches]|=[feet]');
  //await page.type(':nth-match(math-field.editable, 1)', '12[inches]=[feet]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);

  await page.forceDeleteCell(0);

  // test negative exponent for units
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', '1[mm^-2');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight')
  await page.type(':nth-match(math-field.editable, 1)', ']=[inch^-2');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight')
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(645.16, precision);

  await page.forceDeleteCell(0);

  // test units with 1 in the numerator
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', '1[mm^-2');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight')
  await page.type(':nth-match(math-field.editable, 1)', ']=[inch^-2');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight')
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(645.16, precision);

  await page.forceDeleteCell(0);

  // test inverse dimension
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', '1[1/sec');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight')
  await page.type(':nth-match(math-field.editable, 1)', ']=')
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-0');
  expect(content).toBe('s^-1')

  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', '1[1/sec');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 2)', ']=[min^-1');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.press(':nth-match(math-field.editable, 2)', ']');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(60, precision);

  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);

  // test divide by zero with substitution (related to sympy issue #21076)
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', '1[meter]/0[foot]');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight');
  await page.press(':nth-match(math-field.editable, 1)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(content).toBe('\\tilde{\\infty}');

  await page.forceDeleteCell(0);

  // check numerical precision
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', '.1+.2-.3=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(content).toBe('0');

  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', 'x=.1[m]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 3)', 'y=.2[m]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 4)', 'z=.3[m]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 5)', 'x+y-z=[m]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-4');
  expect(content).toBe('=0');

  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 6)', 's=.1[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 7)', 't=.2[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 8)', 'u=.3[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 9)', 's+t-u=[inch]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-8');
  expect(content).toBe('=0');
  content = await page.textContent('#result-units-8');
  expect(content).toBe('inch');

  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 10)', 'xx=1[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 11)', 'yy=2[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 12)', 'zz=1e-200[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 13)', 'w-yy=[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 14)', 'w=zz+2*xx');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-12');
  expect(content).toBe('=1\\times 10^{-200}');

  for(let i=0; i<14; i++){
    await page.forceDeleteCell(0);
  }

  // test unitless result bug when attempting user unit conversion
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', 'x=10[inches]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', 'y=2');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 3)', 'x/y');
  await page.press(':nth-match(math-field.editable, 3)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 3)', '=[inches]');
  await page.type(':nth-match(math-field.editable, 2)', '[m]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await expect(page.locator('#cell-2 >> text=Units Mismatch')).toBeVisible();

  for(let i=0; i<3; i++){
    await page.forceDeleteCell(0);
  }

  // test units in exponents
  await page.click('#add-math-cell');
  await page.setLatex(0, String.raw`10\left[inches\right]^{1\left[\frac{m}{sec}\right]\cdot 2\left[\frac{sec}{m}\right]}=\left[inches^2\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`10\left[inches\right]^{\left(1\left[\frac{m}{sec}\right]\cdot 2\left[\frac{sec}{m}\right]\right)^{2\left[\frac{kelvin}{sec}\right]\cdot 1\left[\frac{sec}{kelvin}\right]}}=\left[inches^4\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`10^{1\left[\frac{m}{sec}\right]\cdot 2\left[\frac{sec}{m}\right]}=`);
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`2^{3\left[sec\right]}=`);
  await page.click('#add-math-cell');
  await page.setLatex(4, String.raw`2^{3^{1\left[m\right]}}=`);
  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`10\left[miles\right]^{.2\left[\frac{cm}{mm}\right]}=\left[miles^2\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(6, String.raw`10\left[miles\right]^{.2\left[\frac{cm}{sec}\right]}=\left[miles^2\right]`);  
  await page.click('#add-math-cell');
  await page.setLatex(7, String.raw`x=10^{1\left[\frac{m}{sec}\right]\cdot 2\left[\frac{sec}{m}\right]}`);  
  await page.click('#add-math-cell');
  await page.setLatex(8, String.raw`x=`);
  await page.click('#add-math-cell');
  await page.setLatex(9, String.raw`y=2^{3^{1\left[m\right]}}`);  
  await page.click('#add-math-cell');
  await page.setLatex(10, String.raw`y=`);
  await page.click('#add-math-cell');
  await page.setLatex(11, String.raw`\left(2^{2\left[\frac{mm}{mm}\right]+2}\right)^{\frac{1\left[mm\right]}{4\left[mm\right]}+\frac{1}{4}}=`);
  await page.click('#add-math-cell');
  await page.setLatex(12, String.raw`4^{1\left[m\right]\cdot 2\left[m\right]^{-1}}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-units-0');
  expect(content).toBe('inches^2')
  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(100, precision);

  content = await page.textContent('#result-units-1');
  expect(content).toBe('inches^4')
  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(10000, precision);

  content = await page.textContent('#result-units-2');
  expect(content).toBe('')
  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(100, precision);

  await expect(page.locator('#cell-3 >> text=Dimension Error: Exponent Not Dimensionless')).toBeVisible();

  await expect(page.locator('#cell-4 >> text=Dimension Error: Exponent Not Dimensionless')).toBeVisible();

  content = await page.textContent('#result-units-5');
  expect(content).toBe('miles^2');
  content = await page.textContent('#result-value-5');
  expect(parseLatexFloat(content)).toBeCloseTo(100, precision);

  await expect(page.locator('#cell-6 >> text=Dimension Error: Exponent Not Dimensionless')).toBeVisible();

  content = await page.textContent('#result-units-8');
  expect(content).toBe('')
  content = await page.textContent('#result-value-8');
  expect(parseLatexFloat(content)).toBeCloseTo(100, precision);

  await expect(page.locator('#cell-10 >> text=Dimension Error: Exponent Not Dimensionless')).toBeVisible();

  content = await page.textContent('#result-units-11');
  expect(content).toBe('')
  content = await page.textContent('#result-value-11');
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);

  content = await page.textContent('#result-units-12');
  expect(content).toBe('')
  content = await page.textContent('#result-value-12');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);

  for (let i=0; i<13; i++) {
    await page.forceDeleteCell(0);
  }

  // make sure that SymPy reserved names get renamed
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', 'Expr=');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', 'symbols=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe('Expr')
  content = await page.textContent('#result-value-1');
  expect(content).toBe('symbols')

  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);

  // test virtual keyboard
  await page.click('#add-math-cell');
  await page.click('#add-math-cell');
  await page.click('button:has-text("√x​")');
  await page.type(':nth-match(math-field.editable,2)', 'x');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 2)', '=');
  await page.type(':nth-match(math-field.editable, 1)', 'x=');
  await page.click('button:has-text("π​")'); // make sure keyboard has jumped to cell with focus
  await page.click('#add-math-cell');
  await page.click('button.tab:has-text("f(x)")');
  await page.click('button:has-text("cot")');
  await page.click('button.tab:has-text("Math")');
  await page.click('button:has-text("π​")');
  await page.type(':nth-match(math-field.editable, 3)', '/4');
  await page.press(':nth-match(math-field.editable, 3)', 'ArrowRight');
  await page.press(':nth-match(math-field.editable, 3)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 3)', '=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(sqrt(pi), precision);
  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(1.0, precision);

  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);

  // test virtual keyboard with selected text
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable,1)', 'pi');
  await page.press(':nth-match(math-field.editable,1)', 'Shift+ArrowLeft');
  await page.press(':nth-match(math-field.editable,1)', 'Shift+ArrowLeft');
  await page.click('button.tab:has-text("f(x)")');
  await page.click('button:has-text("cos")');
  await page.press(':nth-match(math-field.editable,1)', 'Shift+ArrowLeft');
  await page.press(':nth-match(math-field.editable,1)', 'Shift+ArrowLeft');
  await page.press(':nth-match(math-field.editable,1)', 'Shift+ArrowLeft');
  await page.press(':nth-match(math-field.editable,1)', 'Shift+ArrowLeft');
  await page.press(':nth-match(math-field.editable,1)', 'Shift+ArrowLeft');
  await page.click('button.tab:has-text("Math")');

  await page.click('button:has-text("/")');
  await page.type(':nth-match(math-field.editable,1)', '2');
  await page.press(':nth-match(math-field.editable,1)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable,1)', '=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(-0.5, precision);
});


test('Test exponents', async () => {

  await page.setLatex(0, String.raw`1\left[m^{\frac{1}{3}}\right]\cdot 1\left[m^{\frac{2}{3}}\right]=`);
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-units-0');
  expect(content).toBe('m');

  await page.forceDeleteCell(0);

  // test single digit exponent followed by a digit
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', '1^2');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 1)', '2=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  expect(await page.$eval(':nth-match(math-field.editable, 1)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();

  await page.forceDeleteCell(0);

  // test negative exponent on number with assigned units
  await page.click('#add-math-cell');
  await page.setLatex(0, String.raw`\frac{1300\left[N\right]\cdot 80\left[mm\right]\cdot 34\left[mm\right]\cdot \frac{1}{2}}{\frac{16\left[mm\right]\cdot 34\left[mm\right]^{3}}{12}}=\left[MPa\right]`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo((1300*80*34*.5)*(12/(16*34**3)), precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('MPa');

  await page.forceDeleteCell(0);

  // test variable in exponent
  await page.click('#add-math-cell');
  await page.setLatex(0, String.raw`1^{x}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1.0, precision);
});


test('Test function notation with exponents and units', async () => {

  await page.setLatex(0, String.raw`y\left(x=2\left[inches\right],\ t=3\left[\frac{m}{sec}\right],\ s=1\left[\frac{sec}{m}\right],\ j=2\left[\frac{m}{s}\right],k=1\left[\frac{s}{m}\right]\right)=\left[inches^{9}\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`y=x^{\left(s\cdot t\right)^{j\cdot k}}`);
  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`z=2\cdot y\left(x=2\left[inches\right],\ t=2\left[\frac{m}{sec}\right],\ s=1\left[\frac{sec}{m}\right],\ j=2\left[\frac{m}{s}\right],k=1\left[\frac{s}{m}\right]\right)`);
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`z=\left[inches^{4}\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(4, String.raw`y\left(x=2\left[inches\right],\ t=3\left[\frac{m}{sec}\right],\ s=1\left[\frac{sec}{m}\right],\ j=2\left[\frac{1}{s}\right],k=1\left[\frac{s}{m}\right]\right)=\left[inches^{9}\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`y\left(x=2\left[inches\right],\ t=3\left[\frac{1}{sec}\right],\ s=1\left[\frac{sec}{m}\right],\ j=2\left[\frac{m}{s}\right],k=1\left[\frac{s}{m}\right]\right)=\left[inches^{9}\right]`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(512, precision-1);  
  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(32, precision);  
  await expect(page.locator('#cell-4 >> text=Dimension Error: Exponent Not Dimensionless')).toBeVisible();
  await expect(page.locator('#cell-5 >> text=Dimension Error: Exponent Not Dimensionless')).toBeVisible();

});


test('Test function notation with integrals', async () => {

  await page.setLatex(0, String.raw`Ixx=\int _{-\frac{b}{2}}^{\frac{b}{2}}\left(\int _{-\frac{h}{2}}^{\frac{h}{2}}\left(y^{2}\right)\mathrm{d}\left(y\right)\right)\mathrm{d}\left(x\right)`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`Ixx=`);
  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`Ixx\left(b=3\left[inch\right],\ h=2\left[inch\right]\right)=\left[inch^{4}\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`doubleIxx\ =\ 2\cdot Ixx\left(b=6\left[mm\right],\ h=2\left[mm\right]\right)`);
  await page.click('#add-math-cell');
  await page.setLatex(4, String.raw`doubleIxx=\left[mm^{4}\right]`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(content).toBe('\\frac{b \\cdot h^{3}}{12}');
  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-value-4');
  expect(parseLatexFloat(content)).toBeCloseTo(8, precision);

});


test('Test greek characters as variables', async () => {

  await page.type(':nth-match(math-field.editable, 1)', 'alpha+beta+gamma+delta+epsilon+zeta+eta+theta+iota+kappa+lambda+' +
                  'mu+nu+xi+rho+sigma+tau+phi+chi+psi+omega+Gamma+Delta+Theta+Lambda+Xi+Pi+Sigma+Upsilon+Phi+Psi+Omega=');
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button.keyboard:has-text("α​")');
  await page.type(':nth-match(math-field.editable, 2)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button.keyboard:has-text("β")');
  await page.type(':nth-match(math-field.editable, 3)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button.keyboard:has-text("γ")');
  await page.type(':nth-match(math-field.editable, 4)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("δ")');
  await page.type(':nth-match(math-field.editable, 5)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ϵ")');
  await page.type(':nth-match(math-field.editable, 6)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ζ")');
  await page.type(':nth-match(math-field.editable, 7)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("η")');
  await page.type(':nth-match(math-field.editable, 8)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("θ")');
  await page.type(':nth-match(math-field.editable, 9)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ι")');
  await page.type(':nth-match(math-field.editable, 10)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("κ")');
  await page.type(':nth-match(math-field.editable, 11)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("λ")');
  await page.type(':nth-match(math-field.editable, 12)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("μ")');
  await page.type(':nth-match(math-field.editable, 13)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ξ")');
  await page.type(':nth-match(math-field.editable, 14)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ρ")');
  await page.type(':nth-match(math-field.editable, 15)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("σ")');
  await page.type(':nth-match(math-field.editable, 16)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("τ")');
  await page.type(':nth-match(math-field.editable, 17)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ν")');
  await page.type(':nth-match(math-field.editable, 18)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ϕ")');
  await page.type(':nth-match(math-field.editable, 19)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("χ")');
  await page.type(':nth-match(math-field.editable, 20)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ψ")');
  await page.type(':nth-match(math-field.editable, 21)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ω")');
  await page.type(':nth-match(math-field.editable, 22)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button.keyboard:has-text("Γ​"), 2)');
  await page.type(':nth-match(math-field.editable, 23)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Δ"), 2)');
  await page.type(':nth-match(math-field.editable, 24)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Θ"), 2)');
  await page.type(':nth-match(math-field.editable, 25)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Λ"), 2)');
  await page.type(':nth-match(math-field.editable, 26)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Ξ"), 2)');
  await page.type(':nth-match(math-field.editable, 27)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Π​"), 2)');
  await page.type(':nth-match(math-field.editable, 28)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Σ"), 2)');
  await page.type(':nth-match(math-field.editable, 29)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("Υ")');
  await page.type(':nth-match(math-field.editable, 30)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("Φ")');
  await page.type(':nth-match(math-field.editable, 31)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Ψ"), 2)');
  await page.type(':nth-match(math-field.editable, 32)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Ω"), 2)');
  await page.type(':nth-match(math-field.editable, 33)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(32, precision);

});


test('Test variable names with subscripts', async () => {

  await page.type(':nth-match(math-field.editable, 1)', 'v_initial');
  await page.press(':nth-match(math-field.editable, 1)', 'Tab');
  await page.type(':nth-match(math-field.editable, 1)', '=10');

  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', 'real_root');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 2)', '=2');

  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 3)', 'b_1');
  await page.press(':nth-match(math-field.editable, 3)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 3)', '=2');

  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 4)', 'real_root');
  await page.press(':nth-match(math-field.editable, 4)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 4)', '*v_initial');
  await page.press(':nth-match(math-field.editable, 4)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 4)', '*b_1');
  await page.press(':nth-match(math-field.editable, 4)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 4)', '=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(40, precision);

  // check to ensure that invalid variables result in a syntax error
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 5)', '1a=');
  await page.click('#add-math-cell');
  // subscript that begins with number and contains letters now allowed and should not be an error
  await page.type(':nth-match(math-field.editable, 6)', 'a_1b');
  await page.press(':nth-match(math-field.editable, 6)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 6)', '=');
  await page.click('#add-math-cell');
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button.keyboard:has-text("α​")');
  await page.click('button.keyboard:has-text("β")');
  await page.type(':nth-match(math-field.editable, 7)', '=1');
  // this one should not be an error (greek variable with valid subscript)
  await page.click('#add-math-cell');
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button.keyboard:has-text("α​")');
  await page.type(':nth-match(math-field.editable, 8)', '_10');
  await page.press(':nth-match(math-field.editable, 8)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 8)', '=');
  // next 2 should be valid as well (letter followed by number for name or subscript)
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 9)', 'a1=');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 10)', 'a_b1');
  await page.press(':nth-match(math-field.editable, 10)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 10)', '=');

  expect(await page.$eval(':nth-match(math-field.editable, 5)',
    el => el.classList.contains("parsing-error"))).toBeTruthy();
  expect(await page.$eval(':nth-match(math-field.editable, 6)',
    el => el.classList.contains("parsing-error"))).toBeFalsy();
  expect(await page.$eval(':nth-match(math-field.editable, 7)',
    el => el.classList.contains("parsing-error"))).toBeTruthy();
  expect(await page.$eval(':nth-match(math-field.editable, 8)',
    el => el.classList.contains("parsing-error"))).toBeFalsy();
  expect(await page.$eval(':nth-match(math-field.editable, 9)',
    el => el.classList.contains("parsing-error"))).toBeFalsy();
  expect(await page.$eval(':nth-match(math-field.editable, 10)',
    el => el.classList.contains("parsing-error"))).toBeFalsy();

});


test('Make sure results are updating after adding a documentation cell', async () => {

  await page.type(':nth-match(math-field.editable, 1)', 'x=3');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', 'x=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click('#add-documentation-cell');
  await page.type('div.editor div', `Sheet 1\nπ`);
  await page.press('div.editor div', 'Enter');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(3.0, precision);

});

test("Test complicated function evaluation", async () => {

  await page.setLatex(0, String.raw`volume\ =\ h\cdot area`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`area=l\cdot w`);
  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`y=-\frac{g\cdot \sec\left(theta\right)^{2}}{2\cdot InitialVelocity^{2}}\cdot x^{2}+x\cdot \tan\left(theta\right)`);
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`g=9.81\left[\frac{m}{sec^{2}}\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(4, String.raw`y\left(theta=45\left[degrees\right],\ InitialVelocity=1200\left[\frac{ft}{sec}\right],\ x=100\left[yards\right]\right)=\left[feet\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`area=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-4');
  expect(parseLatexFloat(content)).toBeCloseTo((-(9.81*(100/1.09361)**2)/(cos(45*pi/180)**2*2*(1200/3.28084)**2)+ (100/1.09361)*tan(45*(45*pi/180)))*3.28084, 2);
  content = await page.textContent('#result-value-5');
  expect(content).toBe('l \\cdot w');

});


test('Test unit exponent rounding', async () => {

  await page.setLatex(0, String.raw`C=272\cdot \left(\frac{S_{2}}{1e6\left[Pa\right]}\right)^{-.0995}`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`S_{1}=400\left[MPa\right]`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`S_{2}=0.5\cdot S_{1}`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`C\cdot \frac{S_{2}}{190\left[MPa\right]}=`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`C\cdot S_{2}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-units-3');
  expect(content).toBe('');

  content = await page.textContent('#result-units-4');
  expect(content).toBe('Pa');

});


test('Test unit names that contain numbers', async () => {

  await page.setLatex(0, String.raw`1\left[cmH2O\right]=\left[mmH2O\right]`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`1\left[m2\right]=\left[m^{2}\right]`);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  let content = await page.textContent('#result-value-0');
  expect(content).toBe('=10');
  content = await page.textContent('#result-units-0');
  expect(content).toBe('mmH2O');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('=1');
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m^2');

});


test('Test unit cancelling issues', async () => {

  // subtract one value unitless and the other without units
  await page.setLatex(0, String.raw`\left(1\left[\frac{m}{m}\right]-1\right)\cdot 1\left[m\right]=`);

  // subtract two values with units
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`5\left[mm\right]-4\left[mm\right]=`);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  let content = await page.textContent('#result-value-0');
  expect(content).toBe('0');
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('0.001');
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

});


test('Test syntax error Show Error button', async ({ browserName }) => {

  // add many empty math cells
  for (let i = 0; i < 20; i++) {
    await page.locator('math-field.editable').nth(i).press('Enter');
  }

  // add a syntax error to first and last cells
  await page.setLatex(0, 'x');
  await page.setLatex(19, 'x');

  // click the show error button to jump to first syntax error
  await page.locator('text=Show Error').click();

  // first cell should now be visible
  await expect(page.locator('button.bx--tooltip__trigger').nth(0)).toBeFocused({timeout: 1000});

});


test('Test temperature conversions', async () => {

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

  await page.waitForSelector('text=Loading Pyodide...', {state: 'detached'});
  await page.waitForSelector('text=Updating...', {state: 'detached'});


  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(-40, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('degC');

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('kelvin');

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(5/9, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('K');

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(283.15, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('K');

  content = await page.textContent('#result-value-4');
  expect(parseLatexFloat(content)).toBeCloseTo(460.67, precision-1);
  content = await page.textContent('#result-units-4');
  expect(content).toBe('degR');

  content = await page.textContent('#result-value-5');
  expect(parseLatexFloat(content)).toBeCloseTo(-10, precision);
  content = await page.textContent('#result-units-5');
  expect(content).toBe('degC');

  content = await page.textContent('#result-value-6');
  expect(parseLatexFloat(content)).toBeCloseTo(-40, precision);
  content = await page.textContent('#result-units-6');
  expect(content).toBe('degF');

  content = await page.textContent('#result-value-7');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-7');
  expect(content).toBe('K^-1');

  content = await page.textContent('#result-value-8');
  expect(parseLatexFloat(content)).toBeCloseTo(5/9, precision);
  content = await page.textContent('#result-units-8');
  expect(content).toBe('s^1*K^1');

});


test('Check parsing error handling impact on displayed results', async () => {

  await page.setLatex(0, 'x=5.11');
  await page.locator('#add-math-cell').click()
  await page.setLatex(1, 'x=');
  await page.locator('#add-math-cell').click()

  await page.waitForSelector('.status-footer', { state: 'detached'});

  // check query result in cell 1
  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(5.11, precision);

  // create a syntax error in cell 2, should still see result
  await page.locator('#cell-2 >> math-field.editable').type('a');

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(5.11, precision);

  // leave cell, result should be made hidden
  await page.keyboard.press('Escape');
  await page.locator('#cell-1 >> math-field:not(.editable)').waitFor({state: "hidden", timeout: 500});

});


test('Test single character square root', async () => {

  await page.locator('#cell-0 >> math-field.editable').type('sqrt4');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('=');
  await page.locator('#add-math-cell').click();
  await page.locator('#cell-1 >> math-field.editable').type('sqrta');
  await page.locator('#cell-1 >> math-field.editable').press('Tab');
  await page.locator('#cell-1 >> math-field.editable').type('=');
  await page.locator('#add-math-cell').click();
  await page.locator('#cell-2 >> math-field.editable').type('a=9');

  await page.waitForSelector('.status-footer', { state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(2, precision);

  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(3, precision);
});


test('Test disabling of latex rendering modifiers', async () => {
  await page.locator('#cell-0 >> math-field.editable').type('a_vertical');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('=');

  await page.waitForSelector('.status-footer', { state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe('a_{vertical}');
});

test('Test inverse', async () => {
  await page.locator('#cell-0 >> math-field.editable').type('2^-1');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('=');

  await page.locator('#add-math-cell').click();

  await page.locator('#cell-1 >> math-field.editable').type('2[m]^-1');
  await page.locator('#cell-1 >> math-field.editable').press('Tab');
  await page.locator('#cell-1 >> math-field.editable').type('=');

  await page.locator('#add-math-cell').click();

  await page.locator('#cell-2 >> math-field.editable').type('a^-1');
  await page.locator('#cell-2 >> math-field.editable').press('Tab');
  await page.locator('#cell-2 >> math-field.editable').type('=');

  await page.locator('#add-math-cell').click();

  await page.locator('#cell-3 >> math-field.editable').type('a=2[m]');


  await page.waitForSelector('.status-footer', { state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(0.5, precision);

  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(0.5, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m^-1');

  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(0.5, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m^-1');
});

test('Negative grouping', async () => {
  await page.locator('#cell-0 >> math-field.editable').type('a+(b-a)=');

  await page.locator('#add-math-cell').click();
  await page.locator('#cell-1 >> math-field.editable').type('a-(b-a)=');

  await page.locator('#add-math-cell').click();
  await page.locator('#cell-2 >> math-field.editable').type('a-b-a=');

  await page.locator('#add-math-cell').click();
  await page.locator('#cell-3 >> math-field.editable').type('-a-(b+a)=');

  await page.locator('#add-math-cell').click();
  await page.locator('#cell-4 >> math-field.editable').type('-a+-(b+a)=');

  await page.waitForSelector('.status-footer', { state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe('b');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('2 \\cdot a - b');

  content = await page.textContent('#result-value-2');
  expect(content).toBe('- b');

  content = await page.textContent('#result-value-3');
  expect(content).toBe('- 2 \\cdot a - b');

  content = await page.textContent('#result-value-3');
  expect(content).toBe('- 2 \\cdot a - b');
});

test('Negative grouping with fractions', async () => {
  await page.setLatex(0, String.raw`a+\frac{b-a}{1}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`a-\frac{b-a}{1}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`-a-\frac{b+a}{1}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`-a+-\frac{b+a}{1}=`);


  await page.waitForSelector('.status-footer', { state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe('b');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('2 \\cdot a - b');

  content = await page.textContent('#result-value-3');
  expect(content).toBe('- 2 \\cdot a - b');

  content = await page.textContent('#result-value-3');
  expect(content).toBe('- 2 \\cdot a - b');
});

test('Negative grouping with fractions with negative denominator', async () => {
  await page.setLatex(0, String.raw`a+\frac{b-a}{-1}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`a-\frac{b-a}{-1}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`-a-\frac{b+a}{-1}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`-a+-\frac{b+a}{-1}=`);


  await page.waitForSelector('.status-footer', { state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe('2 \\cdot a - b');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('b');

  content = await page.textContent('#result-value-3');
  expect(content).toBe('b');

  content = await page.textContent('#result-value-3');
  expect(content).toBe('b');
});

test('Test cell move inlineShortcuts bug', async () => {

  await page.locator('#add-math-cell').click();

  await page.locator('#up-1').click();

  await page.locator('#cell-0 >> math-field.editable').type('1[mm]=[mm]');

  await page.waitForSelector('.status-footer', { state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('mm');
});

test('Test angular frequency conversions', async () => {
  await page.setLatex(0, String.raw`1\left\lbrack\frac{rad}{sec}\right\rbrack=\left\lbrack Hz\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`1\left\lbrack rad\right\rbrack\cdot\sqrt{\frac{36\left\lbrack\frac{N}{m}\right\rbrack}{1\left\lbrack kg\right\rbrack}}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`1\left\lbrack rad\right\rbrack\cdot\sqrt{\frac{36\left\lbrack\frac{N}{m}\right\rbrack}{1\left\lbrack kg\right\rbrack}}=\left\lbrack\frac{cycles}{sec}\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\frac{1}{2\cdot \pi}\cdot\sqrt{\frac{36\left\lbrack\frac{N}{m}\right\rbrack}{1\left\lbrack kg\right\rbrack}}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`1\left\lbrack\frac{rad}{cycle}\right\rbrack\cdot\sqrt{\frac{36\left\lbrack\frac{N}{m}\right\rbrack}{1\left\lbrack kg\right\rbrack}}=`);

  await page.waitForSelector('.status-footer', { state: 'detached'});

  await expect(page.locator("#cell-0 >> text=Units Mismatch")).toBeAttached();

  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('s^-1*rad^1');

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(3/pi, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('(cycles)/(sec)');

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(3/pi, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('s^-1');

  content = await page.textContent('#result-value-4');
  expect(parseLatexFloat(content)).toBeCloseTo(3/pi, precision);
  content = await page.textContent('#result-units-4');
  expect(content).toBe('s^-1');
});

test('Test cell drag to reorder', async () => {
  await page.locator('#cell-0 >> math-field.editable').type("0=");

  await page.locator('#add-math-cell').click();
  await page.locator('#cell-1 >> math-field.editable').type("1=");

  await page.locator('#add-math-cell').click();
  await page.locator('#cell-2 >> math-field.editable').type("2=");

  await page.locator('#add-math-cell').click();
  await page.locator('#cell-3 >> math-field.editable').type("3=");

  await page.locator('#add-math-cell').click();
  await page.locator('#cell-4 >> math-field.editable').type("4=");

  await page.locator('#add-math-cell').click();
  await page.locator('#cell-5 >> math-field.editable').type("5=");

  await page.locator('#add-math-cell').click();
  await page.locator('#cell-6 >> math-field.editable').type("6=");

  await page.locator('#cell-container-0 >> button[title="Drag to Move Cell"]')
            .dragTo(page.locator('#cell-container-6 >> button[title="Drag to Move Cell"]'));

  await page.waitForSelector('.status-footer', { state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);

  content = await page.textContent('#result-value-4');
  expect(parseLatexFloat(content)).toBeCloseTo(5, precision);

  content = await page.textContent('#result-value-5');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);

  content = await page.textContent('#result-value-6');
  expect(parseLatexFloat(content)).toBeCloseTo(0, precision);

  await page.locator('#cell-container-6 >> button[title="Drag to Move Cell"]')
            .dragTo(page.locator('#cell-container-5 >> button[title="Drag to Move Cell"]'));

  await page.waitForSelector('.status-footer', { state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);

  content = await page.textContent('#result-value-4');
  expect(parseLatexFloat(content)).toBeCloseTo(5, precision);

  content = await page.textContent('#result-value-5');
  expect(parseLatexFloat(content)).toBeCloseTo(0, precision);

  content = await page.textContent('#result-value-6');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);

  await page.locator('#cell-container-5 >> button[title="Drag to Move Cell"]')
  .dragTo(page.locator('#cell-container-0 >> button[title="Drag to Move Cell"]'));

  await page.waitForSelector('.status-footer', { state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(0, precision);

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

  content = await page.textContent('#result-value-4');
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);

  content = await page.textContent('#result-value-5');
  expect(parseLatexFloat(content)).toBeCloseTo(5, precision);

  content = await page.textContent('#result-value-6');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);

  await page.locator('#cell-container-1 >> button[title="Drag to Move Cell"]')
  .dragTo(page.locator('#cell-container-2 >> button[title="Drag to Move Cell"]'));

  await page.waitForSelector('.status-footer', { state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(0, precision);

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

  content = await page.textContent('#result-value-4');
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);

  content = await page.textContent('#result-value-5');
  expect(parseLatexFloat(content)).toBeCloseTo(5, precision);

  content = await page.textContent('#result-value-6');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);

});

test.skip('Test zero placeholder', async () => {
  await page.setLatex(0, String.raw`0=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`0+1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`0\left\lbrack m\right\rbrack=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`0\cdot1\left\lbrack m\right\rbrack=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`0\cdot1\left\lbrack m\right\rbrack+1\left\lbrack m\right\rbrack=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`x^0=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(6, String.raw`x^{0\left\lbrack m\right\rbrack}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(7, String.raw`x^{0\cdot1\left\lbrack m\right\rbrack}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(8, String.raw`\begin{bmatrix}1\\ 0\end{bmatrix}\cdot1\left\lbrack m\right\rbrack=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(9, String.raw`1\left\lbrack m\right\rbrack+0=`);

  await page.waitForSelector('.status-footer', { state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe('0');
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('1');
  content = await page.textContent('#result-units-1');
  expect(content).toBe('');

  content = await page.textContent('#result-value-2');
  expect(content).toBe('0');
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-3');
  expect(content).toBe('0');
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-4');
  expect(content).toBe('1');
  content = await page.textContent('#result-units-4');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-5');
  expect(content).toBe('1');
  content = await page.textContent('#result-units-5');
  expect(content).toBe('');

  await expect(page.locator('#cell-6 >> text=Dimension Error: Exponent Not Dimensionless')).toBeVisible();

  await expect(page.locator('#cell-7 >> text=Dimension Error: Exponent Not Dimensionless')).toBeVisible();

  content = await page.textContent('#result-value-8');
  expect(content).toBe(String.raw`\begin{bmatrix} 1\left\lbrack m\right\rbrack  \\ 0\left\lbrack m\right\rbrack  \end{bmatrix}`);

  await expect(page.locator('#cell-9 >> text=Dimension Error')).toBeVisible();
});

test('Test factorial function', async () => {
  await page.setLatex(0, String.raw`4!=`);

  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`5-4.000!=`);

  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`\frac{10!}{9!}=`);

  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`2!\cdot3!=`);

  await page.click('#add-math-cell');
  await page.setLatex(4, String.raw`\left(9-6\right)!=`);

  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`0!=`);

  await page.click('#add-math-cell');
  await page.setLatex(6, String.raw`a!=`);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(24, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(-19, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('');

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(10, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('');

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(12, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('');

  content = await page.textContent('#result-value-4');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);
  content = await page.textContent('#result-units-4');
  expect(content).toBe('');

  content = await page.textContent('#result-value-5');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-5');
  expect(content).toBe('');

  content = await page.textContent('#result-value-6');
  expect(content).toBe(String.raw`\left(a\right)!`);
  content = await page.textContent('#result-units-6');
  expect(content).toBe('');

  await page.click('#add-math-cell');
  await page.setLatex(7, String.raw`a=4`);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  content = await page.textContent('#result-value-6');
  expect(parseLatexFloat(content)).toBeCloseTo(24, precision);
  content = await page.textContent('#result-units-6');
  expect(content).toBe('');
});

test('Test factorial error check for non integer input', async () => {
  await page.setLatex(0, String.raw`1.1!=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('text=The factorial function can only be evaluated on a nonnegative integer')).toBeVisible();
});

test('Test factorial error check for negative input', async () => {
  await page.setLatex(0, String.raw`-1!=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('text=The factorial function can only be evaluated on a nonnegative integer')).toBeVisible();
});

test('Test factorial error check for input with units', async () => {
  await page.setLatex(0, String.raw`1[m]!=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeVisible();
});

test('Test units applied to pi', async () => {
  await page.locator('#cell-0 >> math-field.editable').type("2*pi[rad]=[deg]");

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`2\cdot \pi\left\lbrack rad\right\rbrack=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(360, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('deg');

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(2*pi, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('rad');
});

test('Test error if relative temperature applied to pi', async () => {
  await page.locator('#cell-0 >> math-field.editable').type("pi[degC]=");

  await expect(page.locator('#cell-0 >> text=Only absolute temperature units may be applied directly to the pi symbol')).toBeVisible();
});

test('Test error units applied to variable name', async () => {
  await page.locator('#cell-0 >> math-field.editable').type("a[m]=");

  await expect(page.locator('#cell-0 >> text=Units cannot be applied directly to a variable name')).toBeVisible();
});
