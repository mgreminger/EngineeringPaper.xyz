import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));


test('test basic calculus', async () => {

  // test calculus
  await page.setLatex(0, String.raw`\int _{0}^{pi}\left(sin\left(t\right)\right)d\left(t\right)=`);  
  
  await page.click('#add-math-cell');
  await page.click('text=f(x)');
  await page.click(':nth-match(button:has-text("∫"), 2)');
  await page.type(':nth-match(math-field.editable, 2)', 'b');
  await page.press(':nth-match(math-field.editable, 2)', 'Tab');
  await page.type(':nth-match(math-field.editable, 2)', 'a');
  await page.press(':nth-match(math-field.editable, 2)', 'Tab');
  await page.type(':nth-match(math-field.editable, 2)', 's');
  await page.press(':nth-match(math-field.editable, 2)', 'Tab');
  await page.type(':nth-match(math-field.editable, 2)', 's');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 2)', '=');

  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`\int _{-\frac{h}{2}}^{\frac{h}{2}}\left(\int _{-\frac{w}{2}}^{\frac{w}{2}}\left(y^{2}\right)\mathrm{d}\left(x\right)\right)\mathrm{d}\left(y\right)=\left[mm^{4}\right]`);
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 4)', 'h=30[mm]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 5)', 'w=10[mm]');

  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`func=x^{3}\cdot y^{2}`);
  await page.click('#add-math-cell');
  await page.click('text=f(x)');
  await page.locator("span.ML__cmr >> text=′′").nth(0).click();
  await page.type(':nth-match(math-field.editable, 7)', 'x');
  await page.press(':nth-match(math-field.editable, 7)', 'Tab');
  await page.locator("span.ML__cmr >> text=′").nth(0).click();
  await page.type(':nth-match(math-field.editable, 7)', 'y');
  await page.press(':nth-match(math-field.editable, 7)', 'Tab');
  await page.type(':nth-match(math-field.editable, 7)', 'func');
  await page.press(':nth-match(math-field.editable, 7)', 'ArrowRight');
  await page.press(':nth-match(math-field.editable, 7)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 7)', '=');

  await page.click('#add-math-cell');
  await page.setLatex(7, String.raw`\frac{d}{d\left(z\right)}\left(\frac{d^{2}}{d\left(r\right)^{2}}\left(3\cdot r^{2}\cdot z\right)\right)=`);
  
  await page.click('#add-math-cell');
  await page.setLatex(8, String.raw`position=20\left[\frac{m}{sec}\right]\cdot time`);

  await page.click('#add-math-cell');
  await page.setLatex(9, String.raw`velocity=\frac{\mathrm{d}}{\mathrm{d}\left(time\right)}\left(position\right)`);

  await page.click('#add-math-cell');
  await page.setLatex(10, String.raw`velocity=`);

  await page.click('#add-math-cell');
  await page.setLatex(11, String.raw`\int _{ }^{ }\left(1^{x}\right)\mathrm{d}\left(x\right)=`);

  await page.click('#add-math-cell');
  await page.setLatex(12, String.raw`\int _{-2}^{2}\left(x^{3}\cdot \cos\left(\frac{x}{2}\right)+\frac{1}{2}\cdot \sqrt{4-x^{2}}\right)\mathrm{d}\left(x\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-value-1');
  expect(content).toBe(`- \\frac{a^{2}}{2} + \\frac{b^{2}}{2}`);
  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo((10*30**3/12), precision);
  content = await page.textContent('#result-value-6');
  expect(content).toBe('12 \\cdot x \\cdot y');
  content = await page.textContent('#result-value-7');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);
  content = await page.textContent('#result-value-10');
  expect(parseLatexFloat(content)).toBeCloseTo(20, precision);
  content = await page.textContent('#result-units-10');
  expect(content).toBe('m^1*s^-1');
  content = await page.textContent('#result-value-11');
  expect(content).toBe('x');
  content = await page.textContent('#result-value-12');
  expect(parseLatexFloat(content)).toBeCloseTo(pi, precision);
});


test('Test substitution of integration variable', async () => {

  await page.setLatex(0, String.raw`z_{1}=\int _{ }^{ }\left(x\right)\mathrm{d}\left(x\right)`);
  
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`z_{2}=\int _{0}^{x}\left(x\right)\mathrm{d}\left(x\right)`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`z_{3}=\int _{0}^{x}\left(x^{s+t}\right)\mathrm{d}\left(x\right)`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(3, String.raw`s=2`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(4, String.raw`t=-1`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(5, String.raw`x=10`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(6, String.raw`z_{1}=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(7, String.raw`z_{2}=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(8, String.raw`z_{3}=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-6');
  expect(parseLatexFloat(content)).toBeCloseTo(50, precision);
  content = await page.textContent('#result-units-6');
  expect(content).toBe('');

  content = await page.textContent('#result-value-7');
  expect(parseLatexFloat(content)).toBeCloseTo(50, precision);
  content = await page.textContent('#result-units-7');
  expect(content).toBe('');

  content = await page.textContent('#result-value-8');
  expect(parseLatexFloat(content)).toBeCloseTo(50, precision);
  content = await page.textContent('#result-units-8');
  expect(content).toBe('');
});


test('Test substitution of differential variable', async () => {

  await page.setLatex(0, String.raw`z_{1}=\frac{\mathrm{d}}{\mathrm{d}\left(x\right)}\left(y^{2}\right)`);
  
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`y=x^{4}`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`x=10`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(3, String.raw`z_{1}=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(4, String.raw`z_{2}=\frac{\mathrm{d}}{\mathrm{d}\left(x\right)}\left(y^{s+t}\right)`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(5, String.raw`s=1`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(6, String.raw`t=1`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(7, String.raw`z_{2}=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(80000000, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('');

  content = await page.textContent('#result-value-7');
  expect(parseLatexFloat(content)).toBeCloseTo(80000000, precision);
  content = await page.textContent('#result-units-7');
  expect(content).toBe('');
});


test('Test derivative substitution bug #156', async () => {

  await page.setLatex(0, String.raw`y=20\cdot x`);
  
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\frac{\mathrm{d}}{\mathrm{d}\left(x\right)}\left(x\cdot y\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(content).toBe('40 \\cdot x');

});


test('Test integral substitution bug #244', async () => {

  await page.setLatex(0, String.raw`c=a\left(b=1\right)`);
  
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\int_0^1\left(c\cdot x\right)\mathrm{d}\left(x\right)=`);

  await page.click('#add-piecewise-cell');

  await page.locator('#piecewise-parameter-2 math-field.editable').type('a');
  await page.locator('#piecewise-expression-2-0 math-field.editable').type('1');
  await page.locator('#piecewise-expression-2-1 math-field.editable').type('-1');
  await page.locator('#piecewise-condition-2-0 math-field.editable').type('b>=0');

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(0.5, precision);

});


test('Test definite integral with numerical limits that have units', async () => {

  await page.setLatex(0, String.raw`\int_{0\left\lbrack m\right\rbrack}^{1\left\lbrack m\right\rbrack}\left(x\right)\mathrm{d}\left(x\right)=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\int_0^{1\left\lbrack m\right\rbrack}\left(x\right)\mathrm{d}\left(x\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(0.5, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^2');

  await expect(page.locator("#cell-1 >> text=Dimension Error")).toBeAttached();

});


test('Test units for nth order derivatives', async () => {

  await page.setLatex(0, String.raw`\frac{\mathrm{d}^2}{\mathrm{d}\left(y\right)^2}\left(1\right)=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\frac{\mathrm{d}^2}{\mathrm{d}\left(y\right)^2}\left(y^3\right)=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`y=1\left\lbrack m\right\rbrack`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(0, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^-2');

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

});

test('Test unitless calculus when operand contains placeholder function', async () => {

  await page.click('#delete-0');

  await page.click('#add-piecewise-cell');

  await page.locator('#piecewise-parameter-0 math-field.editable').type('y');
  await page.locator('#piecewise-expression-0-0 math-field.editable').type('x+1');
  await page.locator('#piecewise-expression-0-1 math-field.editable').type('1-x');
  await page.locator('#piecewise-condition-0-0 math-field.editable').type('x<0');

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`y_{prime}=\frac{\mathrm{d}}{\mathrm{d}\left(x\right)}\left(y\right)=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`\int_{-1}^1\left(y\right)\mathrm{d}\left(x\right)=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(3, String.raw`y_{prime}\left(x=-.5\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('');

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('');

});

test('Test calculus units when operand contains placeholder function', async () => {

  await page.click('#delete-0');

  await page.click('#add-piecewise-cell');

  await page.locator('#piecewise-parameter-0 math-field.editable').type('y');
  await page.locator('#piecewise-expression-0-0 math-field.editable').type('x+1[m]');
  await page.locator('#piecewise-expression-0-1 math-field.editable').type('1[m]-x');
  await page.locator('#piecewise-condition-0-0 math-field.editable').type('x<0[m]');

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`y_{prime}=\frac{\mathrm{d}}{\mathrm{d}\left(x\right)}\left(y^2\right)=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`\int_{-1\left\lbrack m\right\rbrack}^{1\left\lbrack m\right\rbrack}\left(y\right)\mathrm{d}\left(x\right)=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(3, String.raw`y_{prime}\left(x=-.5\left\lbrack m\right\rbrack\right)=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(4, String.raw`y_{int}=\int\left(y\right)\mathrm{d}\left(x\right)=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(5, String.raw`y_{int}\left(x=1\left\lbrack m\right\rbrack\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m^2');

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-5');
  expect(parseLatexFloat(content)).toBeCloseTo(0.5, precision);
  content = await page.textContent('#result-units-5');
  expect(content).toBe('m^2');

});

test('Test indefinite integral substitution bug #272', async () => {
  await page.setLatex(0, String.raw`\int\left(-L+S\right)\mathrm{d}\left(S\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`\int_0^{S}\left(-L+S\right)\mathrm{d}\left(S\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`S=L`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`- \frac{L^{2}}{2}`);

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`- \frac{L^{2}}{2}`);
});

test('Test derivative substitution order', async () => {
  await page.setLatex(0, String.raw`\frac{\mathrm{d}}{\mathrm{d}\left(S\right)}\left(-L^2+S^2\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`S=L`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe('2 \\cdot L');
});

test('Test numerical integral and derivative using interpolation function', async () => {
  await page.setLatex(0, String.raw`\int_{0\left\lbrack in\right\rbrack}^{2\left\lbrack in\right\rbrack}\left(\mathrm{Interp1}\left(S\right)\right)\mathrm{d}\left(S\right)=\left\lbrack in^2\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`\frac{\mathrm{d}}{\mathrm{d}\left(S\right)}\left(\mathrm{Interp1}\left(S\right)\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`S=1.5\left\lbrack in\right\rbrack`);

  await page.locator('#add-data-table-cell').click();

  await page.locator('#parameter-units-3-0 >> math-field').type('[in]');
  await page.locator('#parameter-units-3-1 >> math-field').type('[in]');

  await page.locator('#data-table-input-3-0-0').click();

  await page.keyboard.type('0');
  await page.keyboard.press('Tab');
  await page.keyboard.type('0');
  await page.keyboard.press('Enter');

  await page.keyboard.type('1');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1');
  await page.keyboard.press('Enter');

  await page.keyboard.type('2');
  await page.keyboard.press('Tab');
  await page.keyboard.type('0');

  await page.getByRole('button', { name: 'Add Interpolation' }).click();

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1, 5);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('in^2');

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(-1, 9);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('');
});

test('Test derivative dimensional analysis bug', async () => {
  await page.setLatex(0, String.raw`\frac{\mathrm{d}}{\mathrm{d}\left(x\right)}\left(x+1\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test unitless nested integral in exponent', async () => {
  await page.setLatex(0, String.raw`2^{\int_{-\frac{h}{2}}^{\frac{h}{2}}\left(\int_{-\frac{w}{2}}^{\frac{w}{2}}\left(y^2\right)\mathrm{d}\left(x\right)\right)\mathrm{d}\left(y\right)}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, 'h=2');

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, 'w=3');

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

