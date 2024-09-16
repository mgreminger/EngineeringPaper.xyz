import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, complexLatex,
         compareImages, pyodideLoadTimeout, screenshotDir, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));


test('Test equation solving', async () => {

  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();
  await page.locator('#system-expression-0-0 math-field.editable').type('(x-2[meters])*(x-4[meters])=0');
  await page.locator('#system-parameterlist-0 math-field.editable').type('x');

  await page.locator('#add-system-cell').click();
  await page.locator('#system-expression-1-0 math-field.editable').type('y-z=0');
  await page.locator('#system-expression-1-0 math-field.editable').press('Enter');
  await page.locator('#system-expression-1-1 math-field.editable').type('z=10[meters]');
  await page.locator('#system-parameterlist-1 math-field.editable').type('y,z');

  await page.click('#add-math-cell');
  await page.setLatex(2, 'x=');

  await page.click('#add-math-cell');
  await page.setLatex(3, 'y=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(2.0, precision);  // first result
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m');
  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(10.0, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m');

  // switch to second result for first system and check
  await page.locator('#solution-radio-0-1').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(4.0, precision);  // second result

  // update the first system and make sure result updates
  await page.setLatex(0, String.raw`\left(x-2\left[m\right]\right)\cdot \left(x-6\left[m\right]\right)=0`, 0);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(6.0, precision);

  // delete first system and make sure result updates
  await page.forceDeleteCell(0);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-1');
  expect(content).toBe('x', precision);

  for (let i=0; i<3; i++) {
    await page.forceDeleteCell(0);
  }

  await page.locator('#add-system-cell').click();
  await page.locator('#system-expression-0-0 math-field.editable').type('8*g+7*o+3*l=3*o+6*g+6*l');
  await page.locator('#add-row-0').click();
  await page.locator('#system-expression-0-1 math-field.editable').type('g=2*l/3');
  await page.locator('#add-row-0').click();
  await page.locator('#system-expression-0-2 math-field.editable').type('12*o=3[kg]');
  await page.locator('#system-parameterlist-0 math-field.editable').type('l,g,o');

  await page.click('#add-math-cell');
  await page.setLatex(1, 'l=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(0.6, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('kg');

  for (let i=0; i<2; i++) {
    await page.forceDeleteCell(0);
  }

  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', 'k=1[N/m');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 1)', ']');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', 'm=1[kg]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 3)', 'x=10[mm]');
  await page.click('#add-system-cell');
  await page.setLatex(3, String.raw`\frac{1}{2}\cdot k\cdot x^2=\frac{1}{2}\cdot m\cdot v^2`, 0);
  await page.locator('#system-parameterlist-3 math-field.editable').type('v');
  await page.click('#add-math-cell');
  await page.setLatex(4, 'v=');
  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`v=\left[\frac{miles}{hour}\right]`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-4');
  expect(parseLatexFloat(content)).toBeCloseTo(-0.01, precision);
  content = await page.textContent('#result-units-4');
  expect(content).toBe('m^1*s^-1');

  content = await page.textContent('#result-value-5');
  expect(parseLatexFloat(content)).toBeCloseTo(-0.022369362920544027, precision);
  content = await page.textContent('#result-units-5');
  expect(content).toBe('(miles)/(hour)');

  // switch to second solution
  await page.locator('#solution-radio-3-1').click();

  await expect(page.locator('text=Updating...')).toBeHidden();

  content = await page.textContent('#result-value-4');
  expect(parseLatexFloat(content)).toBeCloseTo(0.01, precision);
  content = await page.textContent('#result-units-4');
  expect(content).toBe('m^1*s^-1');

  content = await page.textContent('#result-value-5');
  expect(parseLatexFloat(content)).toBeCloseTo(0.022369362920544027, precision);
  content = await page.textContent('#result-units-5');
  expect(content).toBe('(miles)/(hour)');

});


test('test underdetermined system that has exact numerical solution', async () => {

  await page.forceDeleteCell(0);
  await page.click('#add-system-cell');

  await page.setLatex(0, String.raw`g=9.81\left[\frac{m}{sec^{2}}\right]`,0);
  await page.click('#add-row-0');
  await page.setLatex(0, String.raw`h=10\left[ft\right]`, 1);
  await page.click('#add-row-0');
  await page.setLatex(0, String.raw`m\cdot g\cdot h=\frac{1}{2}\cdot m\cdot v^{2}`, 2);

  await page.locator('#system-parameterlist-0 math-field.editable').type('v,h,g')

  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`v=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(-sqrt(2*9.81*10*12*25.4/1000), precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m^1*s^-1');

  // update previous example to use assignment instead of equality
  await page.setLatex(0, String.raw`h=\frac{1}{2\cdot g}\cdot v^{2}`, 2);
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // switch to solution 2
  await page.locator('#solution-radio-0-1').click();
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(sqrt(2*9.81*10*12*25.4/1000), precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m^1*s^-1');

  // update previous example to use assignment with m on both sides
  // leave on second solution
  await page.setLatex(0, String.raw`m=\frac{1}{2\cdot g\cdot h}\cdot m\cdot v^{2}`, 2);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(sqrt(2*9.81*10*12*25.4/1000), precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m^1*s^-1');

});


test('Test solving system of 3 equations', async () => {

  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  await page.locator('#system-expression-0-0 math-field.editable').type('x+y=3');
  await page.locator('#add-row-0').click();
  await page.locator('#system-expression-0-1 math-field.editable').type('y=z-4');
  await page.locator('#add-row-0').click();
  await page.locator('#system-expression-0-2 math-field.editable').type('z=x^2');
  await page.locator('#system-expression-0-2 math-field.editable').press('ArrowRight');
  await page.locator('#system-expression-0-2 math-field.editable').type('-3');

  await page.locator('#system-parameterlist-0 math-field.editable').type('x,y,z');

  await page.click('#add-math-cell');
  await page.setLatex(1,'x=');
  await page.click('#add-math-cell');
  await page.setLatex(2,'y=');
  await page.click('#add-math-cell');
  await page.setLatex(3,'z=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // Solution 1
  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(-1/2 + sqrt(41)/2, precision);

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(7/2 - sqrt(41)/2, precision);

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(15/2 - sqrt(41)/2, precision);

  // Switch to solution 2
  await page.locator('#solution-radio-0-1').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(-sqrt(41)/2 - 1/2, precision);

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(sqrt(41)/2 + 7/2, precision);

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(sqrt(41)/2 + 15/2, precision);

});


test("Test case where all solutions don't have results for the same variables", async () => {

  await page.forceDeleteCell(0);

  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`m\cdot g\cdot h=\frac{1}{2}\cdot m\cdot v^{2}`, 0);
  await page.locator('#system-parameterlist-0 math-field.editable').type('m,v');

  await page.click('#add-math-cell');
  await page.setLatex(1,'m=');
  await page.click('#add-math-cell');
  await page.setLatex(2, 'v=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // first solution
  let content = await page.textContent('#result-value-1');
  expect(content).toBe('0');
  content = await page.textContent('#result-value-2');
  expect(content).toBe('v');

  // second solution
  await page.locator('#solution-radio-0-1').click();
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  
  content = await page.textContent('#result-value-1');
  expect(content).toBe('m');
  content = await page.textContent('#result-value-2');
  expect(content).toBe('- \\sqrt{2} \\cdot \\sqrt{g \\cdot h}');

  // third solution
  await page.locator('#solution-radio-0-2').click();
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  
  content = await page.textContent('#result-value-1');
  expect(content).toBe('m');
  content = await page.textContent('#result-value-2');
  expect(content).toBe(`\\sqrt{2} \\cdot \\sqrt{g \\cdot h}`);
});

test('Test function notation with equation solving and combined function/assignment and expression as argument for function', async () => {

  await page.setLatex(0, String.raw`x=s+t`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`t=25.4\left[mm\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`x\left(s=1\left[inch\right]\right)=\left[inch\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`x\left(s=1\right)=`);
  await page.click('#add-system-cell');
  await page.setLatex(4, String.raw`\frac{1}{2}\cdot m\cdot v^{2}=m\cdot g\cdot h`, 0);
  await page.locator('#system-parameterlist-4 math-field.editable').type('v')
  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`v=`);
  await page.click('#add-math-cell');
  await page.setLatex(6, String.raw`v\left(g=9.81\left[\frac{m}{sec^{2}}\right],h=2\cdot hh\right)=`);
  await page.click('#add-math-cell');
  await page.setLatex(7, String.raw`hh=1.5\left[mm\right]`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // select second solution to get positive velocity
  await page.locator('#solution-radio-4-1').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('inch');
  await expect(page.locator('#cell-3 >> text=Dimension Error')).toBeVisible();
  content = await page.textContent('#result-value-6');
  expect(parseLatexFloat(content)).toBeCloseTo(sqrt(2*9.81*.003), precision);
  content = await page.textContent('#result-units-6');
  expect(content).toBe('m^1*s^-1');

});


test('Test system with 5 equations', async () => {

  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`R_{A}+R_{B}-q\cdot l=0`, 0);

  await page.click("#add-row-0");
  await page.setLatex(0, String.raw`M_{A}+R_{B}\cdot l-q\cdot l\cdot \frac{l}{2}=0`, 1);

  await page.click("#add-row-0");
  await page.setLatex(0, String.raw`\delta _{q}=-\frac{q\cdot l^{4}}{8\cdot E\cdot I}`, 2);

  await page.click("#add-row-0");
  await page.setLatex(0, String.raw`\delta _{Rb}=\frac{R_{B}\cdot l^{3}}{3\cdot E\cdot I}`, 3);

  await page.click("#add-row-0");
  await page.setLatex(0, String.raw`\delta _{q}+\delta _{Rb}=0`, 4);

  await page.locator('#system-parameterlist-0 math-field.editable').type('M_A');
  await page.locator('#system-parameterlist-0 math-field.editable').press('ArrowRight');
  await page.locator('#system-parameterlist-0 math-field.editable').type(', R_A');
  await page.locator('#system-parameterlist-0 math-field.editable').press('ArrowRight');
  await page.locator('#system-parameterlist-0 math-field.editable').type(', R_B'); 
  await page.locator('#system-parameterlist-0 math-field.editable').press('ArrowRight');
  await page.locator('#system-parameterlist-0 math-field.editable').type(', delta_Rb'); 
  await page.locator('#system-parameterlist-0 math-field.editable').press('ArrowRight');
  await page.locator('#system-parameterlist-0 math-field.editable').type(', delta_q'); 

  await page.click("#add-math-cell");
  await page.setLatex(1, String.raw`M_{A}=`);

  await page.click("#add-math-cell");
  await page.setLatex(2, String.raw`R_{A}=`);

  await page.click("#add-math-cell");
  await page.setLatex(3, String.raw`R_{B}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // check Rb
  let content = await page.textContent('#result-value-3');
  expect(content).toBe(`\\frac{3 \\cdot l \\cdot q}{8}`);

  // add function query that depends on solution
  await page.click("#add-math-cell");
  await page.setLatex(4, String.raw`R_{B}\left(q=10\left[\frac{N}{m}\right],\ l=1\left[m\right]\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-4');
  expect(parseLatexFloat(content)).toBeCloseTo(3.75, precision);
  content = await page.textContent('#result-units-4');
  expect(content).toBe('N');

});


test('Test restarting pyodide on a calculation that has caused sympy to hang', async () => {

  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`\cos\left(x\right)^{x}\cdot \log\left(x\right)=\cosh\left(x^{x}\right)\cdot \sin\left(x\right)\cdot \sinh\left(x\right)\cdot \tan\left(x\right)`, 0);
  await page.locator('#system-parameterlist-0 math-field.editable').type('x')

  await page.waitForTimeout(2000);
  await page.click('text=Restart Pyodide');

  await page.forceDeleteCell(0);
  await page.click('#add-math-cell');
  // need to choose a calc that hasn't already been cached
  await page.type(':nth-match(math-field.editable, 1)', 'zap=');
  await page.waitForSelector('.status-footer', {state: 'detached'});
  let content = await page.textContent('#result-value-0');
  expect(content).toBe('zap')

  // make sure syntax error is still detected after initial parse
  await page.forceDeleteCell(0);
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 1)', 'x+y=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.setLatex(0, String.raw`x+y^{ }=`);
  expect(await page.$eval(':nth-match(math-field.editable, 1)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();

});


test('Test solve with extra variables', async () => {

  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  await page.type(':nth-match(math-field.editable, 1)', 'a*x+b*x+c=0');
  await page.locator('#system-parameterlist-0 math-field.editable').type('x');

  await page.click('#add-math-cell');
  await page.setLatex(1, 'x=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  let content = await page.textContent('#result-value-1');
  expect(content).toBe('- \\frac{c}{a + b}')
});


test('Test parser error messages for solve', async () => {

  await page.setLatex(0, '2\\cdot x=y');

  await page.locator('text=Show Error').click();
  await page.locator('text=Equality statements are no longer allowed in math cells, use a System Solve Cell instead.').waitFor({state: 'visible', timeout: 1000});

  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  // make sure a function notation expression is allowed in a system solve cell
  await page.setLatex(0, String.raw`f\left(x=1\right)=y`, 0);

  await page.locator('text=Show Error').click();
  await page.locator('text=Function syntax is not allowed in a System Solve Cell.').waitFor({state: 'visible', timeout: 1000});

  // make sure a function notation expression is also not allowed on the rhs of an assignment
  await page.setLatex(0, String.raw`x=y\left(z=1\right)`, 0);

  await page.locator('text=Show Error').click();
  await page.locator('text=Function syntax is not allowed in a System Solve Cell.').waitFor({state: 'visible', timeout: 1000});

  // make sure a query statement is not allowed in a solve cell expression
  await page.setLatex(0, String.raw`x=`, 0);  

  await page.locator('text=Show Error').click();
  await page.locator('text=An equation is required in this field.').waitFor({state: 'visible', timeout: 1000});

  // make sure a query statement is not allowed in a solve cell parameter list
  await page.setLatex(0, String.raw`x=y`, 0);
  await page.locator('#system-parameterlist-0 math-field.editable').type('x=');
  
  await page.locator('text=Show Error').click();
  await page.locator('text=A variable name, or a list of variable names separated by commas, is required in this field (x,y for example). If a numerical solve is required, the variables must be given initial guess values with a tilde (x~1, y~2, for example).').waitFor({state: 'visible', timeout: 1000});

});


test('Test system solve database saving and retrieving', async ({ browserName }) => {

  const width = 1300;
  const height = 2000;
  await page.setViewportSize({ width: width, height: height });

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  // create system with two equations and two variables to solve for
  await page.forceDeleteCell(0);

  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`a\cdot x=y^{2}`, 0);
  await page.locator('#add-row-0').click();
  await page.setLatex(0, String.raw`a=2\left[m\right]`, 1);

  await page.locator('#system-parameterlist-0 math-field.editable').type('a,y');

  // add plot
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`y\left(1\le x\le 10\right)=`);

  // add query cell to check solve result
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`y\left(x=4\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // switch to second solution to make sure the choice gets saved to the database
  await page.locator('#solution-radio-0-1').click();
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(sqrt(2)*2, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m^0.5');

  // save to database and create a screenshot
  await page.click('#upload-sheet');
  await page.click('text=Confirm');
  await page.waitForSelector('#shareable-link');
  const sheetUrl = new URL(await page.$eval('#shareable-link', el => el.value));

  await page.click('[aria-label="Close the modal"]');
  await page.mouse.move(0,0);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));

  await page.screenshot({ path: `${screenshotDir}/${browserName}_solve_screenshot.png`, fullPage: true });

  // clear contents, we'll be creating a new sheet
  await page.locator('#new-sheet').click();

  // retrieve previously saved document from database and check screenshot
  await page.goto(`${sheetUrl.pathname}`);
  await page.locator('h3 >> text=Retrieving Sheet').waitFor({state: 'detached', timeout: 5000});
  await page.waitForSelector('.status-footer', { state: 'detached', timeout: pyodideLoadTimeout });
  await page.mouse.move(0,0);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${screenshotDir}/${browserName}_solve_screenshot_check.png`, fullPage: true });

  // webkit cannot reproduce pixel perfect on this one
  // (seems like the exponent rendering changes slightly for webkit)
  if (browserName === "chromium" || browserName === "firefox") {
    expect(compareImages(`${browserName}_solve_screenshot.png`, `${browserName}_solve_screenshot_check.png`)).toEqual(0);
  }

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(sqrt(2)*2, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m^0.5');

  // switch back to the first solution and check that result updates
  await page.locator('#solution-radio-0-0').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(-sqrt(2)*2, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m^0.5');

});


test('Test replacement of placeholder funcs with symbolic and numeric solve', async () => {

  await page.forceDeleteCell(0);

  await page.locator('#add-system-cell').click();
  await page.setLatex(0, String.raw`\arcsin\left(x\right)=45\left[deg\right]`, 0);
  await page.locator('#system-parameterlist-0 math-field.editable').type('x');

  await page.click('#add-math-cell');
  await page.setLatex(1, 'x=');

  await page.locator('#add-system-cell').click();
  await page.setLatex(2, String.raw`\arcsin\left(y\right)=45\left[deg\right]`, 0);
  await page.locator('#system-parameterlist-2 math-field.editable').type('y~.1');

  await page.click('#add-math-cell');
  await page.setLatex(3, 'y=');

  await page.locator('.status-footer').waitFor({state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(1/sqrt(2), precision);

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(1/sqrt(2), precision);
});


test('Test numerical equation solving with units', async () => {

  // System with one equation
  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();
  await page.setLatex(0, String.raw`\left(x-2\left[meters\right]\right)\cdot \left(x-4\left[meters\right]\right)=0\left[m^{2}\right]`, 0);
  await page.locator('#system-parameterlist-0 math-field.editable').type('x~1.5[m]');

  // System with two Equations
  await page.locator('#add-system-cell').click();
  await page.locator('#system-expression-1-0 math-field.editable').type('y-z=0[m]');
  await page.locator('#system-expression-1-0 math-field.editable').press('Enter');
  await page.locator('#system-expression-1-1 math-field.editable').type('z=10[meters]');
  await page.locator('#system-parameterlist-1 math-field.editable').type('y~2[m],z~9[m]');

  await page.click('#add-math-cell');
  await page.setLatex(2, 'x=');

  await page.click('#add-math-cell');
  await page.setLatex(3, 'y=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(2.0, precision);  // first result
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m');
  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(10.0, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m');


  // move initial guess to get second solution for first equation
  for (let i = 0; i<8; i++) {
    await page.locator('#system-parameterlist-0 math-field.editable').press('Backspace');
  }
  await page.locator('#system-parameterlist-0 math-field.editable').type('x~10[m]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(4.0, precision);  // second result

  // update the first system and make sure result updates
  await page.setLatex(0, String.raw`\left(x-2\left[m\right]\right)\cdot \left(x-6\left[m\right]\right)=0\left[m^{2}\right]`, 0);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(6.0, precision);

  // swap systems and make sure results don't change
  await page.locator('#up-1').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(6.0, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m');
  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(10.0, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m');

  // delete second system (previously the first) and make sure result updates
  await page.forceDeleteCell(1);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-1');
  expect(content).toBe('x', precision);

  for (let i=0; i<3; i++) {
    await page.forceDeleteCell(0);
  }

  await page.locator('#add-system-cell').click();
  await page.locator('#system-expression-0-0 math-field.editable').type('8*g+7*o+3*l=3*o+6*g+6*l');
  await page.locator('#add-row-0').click();
  await page.locator('#system-expression-0-1 math-field.editable').type('g=2*l/3');
  await page.locator('#add-row-0').click();
  await page.locator('#system-expression-0-2 math-field.editable').type('12*o=3[kg]');
  await page.locator('#system-parameterlist-0 math-field.editable').type('l~1[kg],g~-1[lb],o~1[kg]');

  await page.click('#add-math-cell');
  await page.setLatex(1, 'l=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(0.6, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('kg');

});


test('Test numerical solve error messages', async () => {

  // Create overdetermined system
  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`\left(x-3\right)\cdot \left(x-5\right)=0`, 0);
  await page.locator('#add-row-0').click();
  await page.setLatex(0, String.raw`x=20`, 1);
  await page.locator('#system-parameterlist-0 math-field.editable').type('x');
  await page.locator('button:has-text("≈​")').click();
  await page.locator('#system-parameterlist-0 math-field.editable').type('10');

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
  expect(parseLatexFloat(content)).toBeCloseTo(5, precision);


  // LHS and RHS units not match in system equaiton
  await page.setLatex(0, String.raw`\left(x-3\right)\cdot \left(x-5\right)=0\left[inch\right]`, 0);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await page.locator('text=Units mismatch in system of equations').waitFor({timeout:500});
  await page.locator('text=Error: Units error in System Solve Cell').waitFor({timeout:500});

  // shouldn't display results when there is a units error in numerical system solve
  await page.locator('#result-value-1').waitFor({state: 'detached', timeout: 1000})


  // Add units to guess that don't match the equation
  await page.setLatex(0, String.raw`\left(x-3\right)\cdot \left(x-5\right)=0`, 0);
  await page.locator('#system-parameterlist-0 math-field.editable').type('[mm]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await page.locator('text=Units mismatch in system of equations').waitFor({timeout:500});
  await page.locator('text=Error: Units error in System Solve Cell').waitFor({timeout:500});

  // shouldn't display results when there is a units error in numerical system solve
  await page.locator('#result-value-1').waitFor({state: 'detached', timeout: 1000})

  // create underdetermined system
  await page.setLatex(0, String.raw`\left(x-3\right)\cdot \left(y-5\right)=0`, 0);

  for (let i=0; i<10; i++) {
    await page.locator('#system-parameterlist-0 math-field.editable').press('Backspace');
  }

  await page.locator('#system-parameterlist-0 math-field.editable').type('x~3, y~5');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await page.locator('text=Cannot solve underdetermined system, the number of equations should match the number of unknowns')
            .waitFor({timeout:500});

  content = await page.textContent('#result-value-1');
  expect(content).toBe('x');

});


test('Test numerical solution variable rendering', async () => {

  // Create overdetermined system
  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`N+\theta =1`, 0);
  await page.locator('#add-row-0').click();
  await page.setLatex(0, String.raw`N-\theta =10`, 1);
  await page.locator('#system-parameterlist-0 math-field.editable').type('N~1, theta~3');
  
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, 'N=');

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, 'theta=');

  await page.keyboard.press('Escape');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await page.locator('text=ariable').waitFor({state: 'detached', timeout: 1000});
  await page.locator('text=theta').waitFor({state: 'detached', timeout: 1000});
  await page.locator('div.solution-container >> text=θ').waitFor({timeout: 1000});

  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(5.5, precision);

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(-4.5, precision);

});


test('Test handling currently selected solution greater than number of solutions', async () => {

  await page.setLatex(0, String.raw`x=`);
  await page.click('#add-system-cell');
  await page.setLatex(1, String.raw`x^{4}=4`, 0);
  await page.locator('#system-parameterlist-1 math-field.editable').type('x')

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // select fourth solution
  await page.locator('#solution-radio-1-3').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = complexLatex(await page.textContent('#result-value-0'));
  expect(content.re).toBeCloseTo(0, precision);
  expect(content.im).toBeCloseTo(sqrt(2), precision);

  // change system to only have 2 solutions
  await page.setLatex(1, String.raw`x^{2}=4`, 0);
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // make sure first solution is both the selected solution and the displayed solution
  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(-2, precision);

  // make sure first solution radio button is selected
  expect(await page.locator('#solution-radio-1-0').isChecked()).toBeTruthy();

});

test('Test matrix equation solve', async () => {

  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`\begin{bmatrix}1 & 0 & 0\\ 0 & 1 & 0\\ 0 & 0 & 1\end{bmatrix}\times\begin{bmatrix}a\\ b\\ c\end{bmatrix}=\begin{bmatrix}1\\ 2\\ 3\end{bmatrix}`, 0);
  await page.locator('#system-parameterlist-0 math-field.editable').type('a,b,c');

  await page.click('#add-math-cell');
  await page.locator('#cell-1 >> math-field.editable').type('a=');

  await page.click('#add-math-cell');
  await page.locator('#cell-2 >> math-field.editable').type('b=');

  await page.click('#add-math-cell');
  await page.locator('#cell-3 >> math-field.editable').type('c=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // make sure first solution is both the selected solution and the displayed solution
  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

});

test('Test numerical matrix equation solve', async () => {

  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`\begin{bmatrix}1 & 0 & 0\\ 0 & 1 & 0\\ 0 & 0 & 1\end{bmatrix}\times\begin{bmatrix}a\\ b\\ c\end{bmatrix}=\begin{bmatrix}1\\ 2\\ 3\end{bmatrix}`, 0);
  await page.locator('#system-parameterlist-0 math-field.editable').type('a~.5,b~.5,c~.5');

  await page.click('#add-math-cell');
  await page.locator('#cell-1 >> math-field.editable').type('a=');

  await page.click('#add-math-cell');
  await page.locator('#cell-2 >> math-field.editable').type('b=');

  await page.click('#add-math-cell');
  await page.locator('#cell-3 >> math-field.editable').type('c=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // make sure first solution is both the selected solution and the displayed solution
  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

});

test('Test determinant equation solve', async () => {
  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`\mathrm{det}\left(\begin{bmatrix}1-a & 0 & 0\\ 0 & 2-a & 0\\ 0 & 0 & 3-a\end{bmatrix}\right)=0`, 0);
  await page.locator('#system-parameterlist-0 math-field.editable').type('a');

  await page.click('#add-math-cell');
  await page.locator('#cell-1 >> math-field.editable').type('a=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // make sure first solution is both the selected solution and the displayed solution
  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);

});

test('Test numerical determinant equation solve', async () => {
  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`\mathrm{det}\left(\begin{bmatrix}1-a & 0 & 0\\ 0 & 2-a & 0\\ 0 & 0 & 3-a\end{bmatrix}\right)=0`, 0);
  await page.locator('#system-parameterlist-0 math-field.editable').type('a~.7');

  await page.click('#add-math-cell');
  await page.locator('#cell-1 >> math-field.editable').type('a=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // make sure first solution is both the selected solution and the displayed solution
  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);

});

test('Test numerical matrix equation solve with units', async () => {

  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`\begin{bmatrix}1\left\lbrack m\right\rbrack & 0 & 0\left\lbrack m\right\rbrack\\ 0\left\lbrack m\right\rbrack & 1 & 0\left\lbrack m\right\rbrack\\ 0\left\lbrack m\right\rbrack & 0 & 1\left\lbrack m\right\rbrack\end{bmatrix}\times\begin{bmatrix}a\\ b\\ c\end{bmatrix}=\begin{bmatrix}1\left\lbrack m\right\rbrack\\ 2\left\lbrack m\right\rbrack\\ 3\left\lbrack m\right\rbrack\end{bmatrix}`, 0);
  await page.locator('#system-parameterlist-0 math-field.editable').type('a~.5,b~.5[m],c~.5');

  await page.click('#add-math-cell');
  await page.locator('#cell-1 >> math-field.editable').type('b=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // make sure first solution is both the selected solution and the displayed solution
  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);

  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');
});

test('Test zero placeholder numerical with units', async () => {
  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`x+y=5\left\lbrack m\right\rbrack+0\cdot1\left\lbrack m\right\rbrack`, 0);
  await page.locator('#add-row-0').click();
  await page.setLatex(0, String.raw`x-y=1\left\lbrack m\right\rbrack+0\left\lbrack m\right\rbrack`, 1);
  await page.locator('#system-parameterlist-0 math-field.editable').type('x~0[m],y~0.1[m]');
  
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, 'x=');

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, 'y=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m');
});

test('Test zero placeholder symbolic with units', async () => {
  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`x+y=5\left\lbrack m\right\rbrack+0\cdot1\left\lbrack m\right\rbrack`, 0);
  await page.locator('#add-row-0').click();
  await page.setLatex(0, String.raw`x-y=1\left\lbrack m\right\rbrack+0\left\lbrack m\right\rbrack`, 1);
  await page.locator('#system-parameterlist-0 math-field.editable').type('x,y');
  
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, 'x=');

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, 'y=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m');
});

test('Test zero placeholder numeric without units', async () => {
  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`x+y=5`, 0);
  await page.locator('#add-row-0').click();
  await page.setLatex(0, String.raw`x-y=1+0`, 1);
  await page.locator('#system-parameterlist-0 math-field.editable').type('x~0,y~0.1');
  
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, 'x=');

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, 'y=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('');

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('');
});

test('Test zero placeholder symbolic without units', async () => {
  await page.forceDeleteCell(0);
  await page.locator('#add-system-cell').click();

  await page.setLatex(0, String.raw`x+y=5`, 0);
  await page.locator('#add-row-0').click();
  await page.setLatex(0, String.raw`x-y+0=1`, 1);
  await page.locator('#system-parameterlist-0 math-field.editable').type('x,y');
  
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, 'x=');

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, 'y=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('');

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('');
});