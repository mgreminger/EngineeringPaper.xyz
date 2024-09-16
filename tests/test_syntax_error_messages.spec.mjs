import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Error message for empty subscript', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // syntax error with second entry
  await page.locator('#cell-0 >> math-field.editable').type('x_');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('=');
  await page.locator('text=There is an empty subscript that is causing a syntax error').waitFor({state: "attached", timeout: 1000});

  // make sure placeholder gets add when cell loses focus
  await page.keyboard.press('Escape');
  await page.keyboard.press(modifierKey+"+ArrowUp");
  await page.locator('#cell-0 >> math-field.editable').type('1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`x_{1}`);
});

test('Error message for empty superscript', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // syntax error with second entry
  await page.locator('#cell-0 >> math-field.editable').type('2^');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('=');
  await page.locator('text=There is an empty superscript that is causing a syntax error').waitFor({state: "attached", timeout: 1000});

  // make sure placeholder gets add when cell loses focus
  await page.keyboard.press('Escape');
  await page.keyboard.press(modifierKey+"+ArrowUp");
  await page.locator('#cell-0 >> math-field.editable').type('3');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(8, precision);
});

test('Error message for missing multiplication symbol between variable then number', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // variable followed by number
  await page.locator('#cell-0 >> math-field.editable').type('x_1');
  await page.locator('#cell-0 >> math-field.editable').press('Tab');
  await page.locator('#cell-0 >> math-field.editable').type('2=');
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between number then variable', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // variable followed by number
  await page.locator('#cell-0 >> math-field.editable').type('2a=');
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between variable then variable', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // variable followed by number
  await page.locator('#cell-0 >> math-field.editable').type('a b =');
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between expression then variable', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // variable followed by number
  await page.locator('#cell-0 >> math-field.editable').type('(a + b) c =');
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between expression then number', async () => {
  // variable followed by number
  await page.locator('#cell-0 >> math-field.editable').type('(a + b) 2 =');
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between expression then number with units', async () => {
  // variable followed by number
  await page.locator('#cell-0 >> math-field.editable').type('(a + b) 2 [in]=');
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between expression then pi symbol', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // variable followed by number
  await page.setLatex(0, String.raw`2\pi=`);
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between number then expression', async () => {
  // variable followed by number
  await page.locator('#cell-0 >> math-field.editable').type('2(a+b)=');
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between number with units then expression', async () => {
  // variable followed by number
  await page.locator('#cell-0 >> math-field.editable').type('2[in](a+b)=');
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between symbol then expression', async () => {
  // variable followed by number
  await page.setLatex(0, String.raw`\pi\left(a+b\right)=`);
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between expression then trig function', async () => {
  // variable followed by number
  await page.locator('#cell-0 >> math-field.editable').type('(a+b)sin(x)=');
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between expression then builtin function', async () => {
  // variable followed by number
  await page.locator('#cell-0 >> math-field.editable').type('(a+b)min(1,2)=');
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between expression then user function', async () => {
  // variable followed by number
  await page.locator('#cell-0 >> math-field.editable').type('(a+b)y(x=2)=');
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between expression then indefinite integral', async () => {
  // variable followed by number
  await page.setLatex(0, String.raw`a\int\left(x\right)\mathrm{d}\left(x\right)=`);
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between expression then definite integral', async () => {
  // variable followed by number
  await page.setLatex(0, String.raw`a\int_0^1\left(x\right)\mathrm{d}\left(x\right)=`);
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between expression then derivative', async () => {
  // variable followed by number
  await page.setLatex(0, String.raw`a\frac{\mathrm{d}}{\mathrm{d}\left(x\right)}\left(x\right)=`);
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for missing multiplication symbol between expression then 2nd derivative', async () => {
  // variable followed by number
  await page.setLatex(0, String.raw`a\frac{\mathrm{d}^2}{\mathrm{d}\left(x\right)^2}\left(x^2\right)=`);
  await page.locator('text=Missing multiplication symbol in expression').waitFor({state: "attached", timeout: 1000});
});

test('Error message for empty placeholder', async () => {
  // variable followed by number
  await page.locator('#cell-0 >> math-field.editable').type('/');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowRight');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowRight');
  await page.locator('#cell-0 >> math-field.editable').type('=');
  await page.locator('text=Fill in empty placeholders (delete empty placeholders for unwanted subscripts or exponents)').waitFor({state: "attached", timeout: 1000});
});

test('Error auto correcting of unintended extra mathrm', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.setLatex(0, String.raw`\mathrm{myfunc}\left(1\right)=`);

  await page.locator('#cell-0 >> math-field.editable').press('Home');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowRight');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowLeft');
  await page.locator('#cell-0 >> math-field.editable').type('a*');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe('a \\cdot \\operatorname{myfunc}{\\left(1 \\right)}');


  await page.setLatex(0, String.raw`\mathrm{myfunc}\left(1\right)=`);

  await page.locator('#cell-0 >> math-field.editable').press('Home');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowRight');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowLeft');
  await page.locator('#cell-0 >> math-field.editable').type('2.0*');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`2 \cdot \operatorname{myfunc}{\left(1 \right)}`);

  
  await page.setLatex(0, String.raw`\mathrm{myfunc}\left(1\right)=`);

  await page.locator('#cell-0 >> math-field.editable').press('Home');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowRight');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowLeft');
  await page.locator('#cell-0 >> math-field.editable').type('.1+');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\operatorname{myfunc}{\left(1 \right)} + \frac{1}{10}`);


  await page.setLatex(0, String.raw`\mathrm{myfunc}\left(1\right)=`);

  await page.locator('#cell-0 >> math-field.editable').press('Home');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowRight');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowLeft');
  await page.locator('#cell-0 >> math-field.editable').type('-1e10-');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`- \operatorname{myfunc}{\left(1 \right)} - 10000000000`);


  await page.setLatex(0, String.raw`\mathrm{myfunc}\left(1\right)=`);

  await page.locator('#cell-0 >> math-field.editable').press('Home');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowRight');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowLeft');
  await page.locator('#cell-0 >> math-field.editable').type('a/b');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowRight');
  await page.locator('#cell-0 >> math-field.editable').type('+');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\frac{a + b \cdot \operatorname{myfunc}{\left(1 \right)}}{b}`);


  await page.setLatex(0, String.raw`\mathrm{myfunc}\left(1\right)=`);

  await page.locator('#cell-0 >> math-field.editable').press('Home');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowRight');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowLeft');
  await page.locator('#cell-0 >> math-field.editable').type('a/b');
  await page.locator('#cell-0 >> math-field.editable').press('ArrowRight');
  await page.locator('#cell-0 >> math-field.editable').type('+');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\frac{a + b \cdot \operatorname{myfunc}{\left(1 \right)}}{b}`);
});
