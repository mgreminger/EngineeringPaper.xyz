import { test, expect } from '@playwright/test';
import { complex, cot, pi, sqrt, tan, cos} from 'mathjs';
import { compareImages } from './utility.mjs';

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13; 

test('Test numerical equation solving with units', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  // System with one equation
  await page.locator('#delete-0').click();
  await page.locator('#delete-0').click();
  await page.locator('#add-system-cell').click();
  await page.setLatex(0, String.raw`\left(x-2\left[meters\right]\right)\cdot \left(x-4\left[meters\right]\right)=0\left[m^{2}\right]`, 0);
  await page.locator('#system-parameterlist-0 textarea').type('x~1.5[m]');

  // System with two Equations
  await page.locator('#add-system-cell').click();
  await page.locator('#system-expression-1-0 textarea').type('y-z=0[m]');
  await page.locator('#system-expression-1-0 textarea').press('Enter');
  await page.locator('#system-expression-1-1 textarea').type('z=10[meters]');
  await page.locator('#system-parameterlist-1 textarea').type('y~2[m],z~9[m]');

  await page.click('#add-math-cell');
  await page.setLatex(2, 'x=');

  await page.click('#add-math-cell');
  await page.setLatex(3, 'y=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(2.0, precision);  // first result
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m');
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(10.0, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m');


  // move initial guess to get second solution for first equation
  for (let i = 0; i<8; i++) {
    await page.locator('#system-parameterlist-0 textarea').press('Backspace');
  }
  await page.locator('#system-parameterlist-0 textarea').type('x~10[m]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(4.0, precision);  // second result

  // update the first system and make sure result updates
  await page.setLatex(0, String.raw`\left(x-2\left[m\right]\right)\cdot \left(x-6\left[m\right]\right)=0\left[m^{2}\right]`, 0);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(6.0, precision);

  // swap systems and make sure results don't change
  await page.locator('#up-1').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(6.0, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m');
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(10.0, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m');

  // delete second system (previously the first) and make sure result updates
  await page.click('#delete-1');
  await page.click('#delete-1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-1');
  expect(content).toBe('x', precision);

  for (let i=0; i<6; i++) {
    await page.click('#delete-0');
  }

  await page.locator('#add-system-cell').click();
  await page.locator('#system-expression-0-0 textarea').type('8*g+7*o+3*l=3*o+6*g+6*l');
  await page.locator('#add-row-0').click();
  await page.locator('#system-expression-0-1 textarea').type('g=2*l/3');
  await page.locator('#add-row-0').click();
  await page.locator('#system-expression-0-2 textarea').type('12*o=3[kg]');
  await page.locator('#system-parameterlist-0 textarea').type('l~1[kg],g~-1[lb],o~1[kg]');

  await page.click('#add-math-cell');
  await page.setLatex(1, 'l=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(0.6, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('kg');

});


test('Test numerical solve error messages', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  // Create overdetermined system
  await page.locator('#delete-0').click();
  await page.locator('#delete-0').click();
  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`\left(x-3\right)\cdot \left(x-5\right)=0`, 0);
  await page.locator('#add-row-0').click();
  await page.setLatex(0, String.raw`x=20`, 1);
  await page.locator('#system-parameterlist-0 textarea').type('x');
  await page.locator('button:has-text("≈​")').click();
  await page.locator('#system-parameterlist-0 textarea').type('10');

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, 'x=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await page.locator('text=Cannot solve overdetermined system, the number of equations should match the number of unknowns')
            .waitFor({timeout:200000});

  let content = await page.textContent('#result-value-1');
  expect(content).toBe('x');


  // create well posed system without units
  await page.locator('#delete-row-0-1').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(5, precision);


  // LHS and RHS units not match in system equaiton
  await page.setLatex(0, String.raw`\left(x-3\right)\cdot \left(x-5\right)=0\left[inch\right]`, 0);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await page.locator('text=Units mismatch in system of equaitons').waitFor({timeout:100});
  await page.locator('text=Error: Units error in System Solve Cell').waitFor({timeout:100});

  // shouldn't display results when there is a units error in numerical system solve
  await page.locator('#result-value-1').waitFor({state: 'detached', timeout: 100})


  // Add units to guess that don't match the equation
  await page.setLatex(0, String.raw`\left(x-3\right)\cdot \left(x-5\right)=0`, 0);
  await page.locator('#system-parameterlist-0 textarea').type('[mm]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await page.locator('text=Units mismatch in system of equaitons').waitFor({timeout:100});
  await page.locator('text=Error: Units error in System Solve Cell').waitFor({timeout:100});

  // shouldn't display results when there is a units error in numerical system solve
  await page.locator('#result-value-1').waitFor({state: 'detached', timeout: 100})

  // create underdetermined system
  await page.setLatex(0, String.raw`\left(x-3\right)\cdot \left(y-5\right)=0`, 0);

  for (let i=0; i<10; i++) {
    await page.locator('#system-parameterlist-0 textarea').press('Backspace');
  }

  await page.locator('#system-parameterlist-0 textarea').type('x~3, y~5');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await page.locator('text=Cannot solve underdetermined system, the number of equations should match the number of unknowns')
            .waitFor({timeout:100});

  content = await page.textContent('#result-value-1');
  expect(content).toBe('x');

});