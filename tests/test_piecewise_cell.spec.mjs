import { test, expect } from '@playwright/test';

import { precision, loadPyodide, newSheet, screenshotDir,
         pyodideLoadTimeout, compareImages, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));


test('Test condition error messages', async ({ browserName }) => {

  test.skip(browserName === "webkit", "Webkit not working with attribute selector.");
  
  await page.forceDeleteCell(0);

  await page.locator('#add-piecewise-cell').click();

  // make sure blank fields provide error message
  let content = await page.locator('#piecewise-parameter-0 span[slot="tooltipText"]').textContent();
  expect(content).toBe('A variable name is required in this field.');
  
  content = await page.locator('#piecewise-expression-0-0 span[slot="tooltipText"]').textContent();
  expect(content).toBe('This field may only contain a valid expression or number without an equals sign.');

  content = await page.locator('#piecewise-condition-0-0 span[slot="tooltipText"]').textContent();
  expect(content).toBe('This field may only contain a condition statement such as x>1. The expression corresponding to the first satisfied condition will be used.');

  // check that variables, expressions, and units cause error in condition field
  await page.locator('#piecewise-condition-0-0 math-field.editable').type('1');
  content = await page.locator('#piecewise-condition-0-0 span[slot="tooltipText"]').textContent();
  expect(content).toBe('This field may only contain a condition statement such as x>1. The expression corresponding to the first satisfied condition will be used.');

  await page.locator('#piecewise-condition-0-0 math-field.editable').click({clickCount: 3});
  await page.locator('#piecewise-condition-0-0 math-field.editable').click({clickCount: 3});
  content = await page.locator('#piecewise-condition-0-0 span[slot="tooltipText"]').textContent();
  expect(content).toBe('This field may only contain a condition statement such as x>1. The expression corresponding to the first satisfied condition will be used.');

  await page.locator('#piecewise-condition-0-0 math-field.editable').click({clickCount: 3});
  await page.locator('#piecewise-condition-0-0 math-field.editable').type('a=');
  content = await page.locator('#piecewise-condition-0-0 span[slot="tooltipText"]').textContent();
  expect(content).toBe('This field may only contain a condition statement such as x>1. The expression corresponding to the first satisfied condition will be used.');

  await page.locator('#piecewise-condition-0-0 math-field.editable').click({clickCount: 3});
  await page.locator('#piecewise-condition-0-0 math-field.editable').type('b');
  content = await page.locator('#piecewise-condition-0-0 span[slot="tooltipText"]').textContent();
  expect(content).toBe('This field may only contain a condition statement such as x>1. The expression corresponding to the first satisfied condition will be used.');

  await page.locator('#piecewise-condition-0-0 math-field.editable').click({clickCount: 3});
  await page.locator('#piecewise-condition-0-0 math-field.editable').type(' [m]');
  content = await page.locator('#piecewise-condition-0-0 span[slot="tooltipText"]').textContent();
  expect(content).toBe('This field may only contain a condition statement such as x>1. The expression corresponding to the first satisfied condition will be used.');
});


test('Test piecewise cell functionality', async ({ browserName }) => {

  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  let selectAllCommand = `${modifierKey}+a`;
  if (modifierKey === 'Meta' && browserName === 'chromium') {
    // Cmd-a not working with Chromium on Mac, need to use Control-A
    // Cmd-a works correctly on Chrome and Edge on Mac
    selectAllCommand = 'Control+a';
  }

  const width = 1300;
  const height = 2000;
  await page.setViewportSize({ width: width, height: height });

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  await page.setLatex(0, 'y(x=0.5[m])=');
  await page.click('#add-math-cell');
  await page.setLatex(1, 'y(x=0[m])=');

  await page.click('#add-piecewise-cell');

  await page.click('#add-math-cell');
  await page.setLatex(3, 'y(x=2[m])=');

  await page.click('#add-math-cell');
  await page.setLatex(4, 'y(x=-1[m])=');

  await page.locator('#piecewise-parameter-2 math-field.editable').type('y');
  await page.locator('#piecewise-expression-2-0 math-field.editable').type('x+1[m]');
  await page.locator('#piecewise-expression-2-1 math-field.editable').type('0');
  await page.locator('#piecewise-condition-2-0 math-field.editable').type('x>=0');

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeVisible();
  await expect(page.locator('#cell-1 >> text=Dimension Error')).toBeVisible();

  await page.locator('#piecewise-expression-2-1 math-field.editable').click({clickCount: 3});
  await page.locator('#piecewise-expression-2-1 math-field.editable').type('33[m]');

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeVisible();
  await expect(page.locator('#cell-1 >> text=Dimension Error')).toBeVisible();

  // test GTE
  await page.locator('#piecewise-condition-2-0 math-field.editable').click({clickCount: 3});
  await page.locator('#piecewise-condition-2-0 math-field.editable').type('x>=0[m]');

  await page.waitForSelector('.status-footer', { state: 'detached' });

  let content = await page.locator('#result-value-0').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(1.5, precision);
  content = await page.locator('#result-units-0').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-1').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.locator('#result-units-1').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-3').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
  content = await page.locator('#result-units-3').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-4').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-4').textContent();
  expect(content).toBe('m');

  // Test GT
  await page.locator('#piecewise-condition-2-0 math-field.editable').click({clickCount: 3});
  await page.locator('#piecewise-condition-2-0 math-field.editable').type('x>0[m]');

  await page.waitForSelector('.status-footer', { state: 'detached' });

  content = await page.locator('#result-value-0').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(1.5, precision);
  content = await page.locator('#result-units-0').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-1').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-1').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-3').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
  content = await page.locator('#result-units-3').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-4').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-4').textContent();
  expect(content).toBe('m');

  // Test LTE
  await page.locator('#piecewise-condition-2-0 math-field.editable').press(selectAllCommand );
  await page.locator('#piecewise-condition-2-0 math-field.editable').type('x<=0[m]');

  await page.waitForSelector('.status-footer', { state: 'detached' });

  content = await page.locator('#result-value-0').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-0').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-1').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.locator('#result-units-1').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-3').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-3').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-4').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(0, precision);
  content = await page.locator('#result-units-4').textContent();
  expect(content).toBe('m');

  // Test LT
  await page.locator('#piecewise-condition-2-0 math-field.editable').press(selectAllCommand );
  await page.locator('#piecewise-condition-2-0 math-field.editable').type('x<0[m]');

  await page.waitForSelector('.status-footer', { state: 'detached' });

  content = await page.locator('#result-value-0').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-0').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-1').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-1').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-3').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-3').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-4').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(0, precision);
  content = await page.locator('#result-units-4').textContent();
  expect(content).toBe('m');


  // Test chained logical order 
  await page.locator('#piecewise-condition-2-0 math-field.editable').press(selectAllCommand );
  await page.locator('#piecewise-condition-2-0 math-field.editable').type('0.5[m]<=x<=3[m]');

  await page.waitForSelector('.status-footer', { state: 'detached' });

  content = await page.locator('#result-value-0').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(1.5, precision);
  content = await page.locator('#result-units-0').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-1').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-1').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-3').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
  content = await page.locator('#result-units-3').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-4').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-4').textContent();
  expect(content).toBe('m');


  // Test chained reverse order 
  await page.locator('#piecewise-condition-2-0 math-field.editable').press(selectAllCommand );
  await page.locator('#piecewise-condition-2-0 math-field.editable').type('2[m]>=x>=0.5[m]');

  await page.waitForSelector('.status-footer', { state: 'detached' });

  content = await page.locator('#result-value-0').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(1.5, precision);
  content = await page.locator('#result-units-0').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-1').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-1').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-3').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
  content = await page.locator('#result-units-3').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-4').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-4').textContent();
  expect(content).toBe('m');


  // Test chained split (first case can never be satisified, everything will fall through to otherwise expression)
  await page.locator('#piecewise-condition-2-0 math-field.editable').press(selectAllCommand );
  await page.locator('#piecewise-condition-2-0 math-field.editable').type('0[m]>x>1[m]');

  await page.waitForSelector('.status-footer', { state: 'detached' });

  content = await page.locator('#result-value-0').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-0').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-1').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-1').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-3').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-3').textContent();
  expect(content).toBe('m');

  content = await page.locator('#result-value-4').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(33, precision);
  content = await page.locator('#result-units-4').textContent();
  expect(content).toBe('m');


  // add additional rows
  await page.setLatex(4, 'y(x=-0.5[m])='); // move last test point away from boundary

  // add row using button
  await page.locator('#add-row-2').click();

  await page.locator('#piecewise-expression-2-0 math-field.editable').press(selectAllCommand );
  await page.locator('#piecewise-expression-2-0 math-field.editable').type('x*1[m]');

  await page.locator('#piecewise-condition-2-0 math-field.editable').press(selectAllCommand );
  await page.locator('#piecewise-condition-2-0 math-field.editable').type('1[m]>=x>=0[m]');

  await page.locator('#piecewise-expression-2-1 math-field.editable').type('x^2');
  await page.locator('#piecewise-condition-2-1 math-field.editable').type('1[m]<x');

  // add row using enter key
  await page.locator('#piecewise-expression-2-1 math-field.editable').press('Enter');

  await page.locator('#piecewise-expression-2-2 math-field.editable').type('-x^2');
  await page.locator('#piecewise-condition-2-2 math-field.editable').type('x>=-1[m]');

  await page.locator('#piecewise-expression-2-3 math-field.editable').press(selectAllCommand );
  await page.locator('#piecewise-expression-2-3 math-field.editable').type('-1[m^2');
  await page.locator('#piecewise-expression-2-3 math-field.editable').press('ArrowRight');
  await page.locator('#piecewise-expression-2-3 math-field.editable').type(']');


  await page.waitForSelector('.status-footer', { state: 'detached' });

  content = await page.locator('#result-value-0').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(0.5, precision);
  content = await page.locator('#result-units-0').textContent();
  expect(content).toBe('m^2');

  content = await page.locator('#result-value-1').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(0, precision);
  content = await page.locator('#result-units-1').textContent();
  expect(content).toBe('m^2');

  content = await page.locator('#result-value-3').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);
  content = await page.locator('#result-units-3').textContent();
  expect(content).toBe('m^2');

  content = await page.locator('#result-value-4').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(-.25, precision);
  content = await page.locator('#result-units-4').textContent();
  expect(content).toBe('m^2');

  // add a plot
  await page.keyboard.press('Escape');
  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`y\left(-10\left[m\right]\le x\le 10\left[m\right]\right)\ with\ 1000\ points=`);

  await page.waitForSelector('.status-footer', { state: 'detached' });

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

  await page.screenshot({ path: `${screenshotDir}/${browserName}_piecewise_screenshot.png`, fullPage: false });

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
  await page.screenshot({ path: `${screenshotDir}/${browserName}_piecewise_screenshot_check.png`, fullPage: false });

  // chromium is the only browser that can reproduce pixel perfect on this one
  // (seems line the exponent rendering changes slightly for firefox and webkit)
  if (browserName === "chromium") {
    expect(compareImages(`${browserName}_piecewise_screenshot.png`, `${browserName}_piecewise_screenshot_check.png`)).toEqual(0);
  }

  // delete 2 rows and check results
  await page.locator('#delete-row-2-2').click();
  await page.locator('#delete-row-2-0').click();

  await page.waitForSelector('.status-footer', { state: 'detached' });

  content = await page.locator('#result-value-0').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(-1, precision);
  content = await page.locator('#result-units-0').textContent();
  expect(content).toBe('m^2');

  content = await page.locator('#result-value-1').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(-1, precision);
  content = await page.locator('#result-units-1').textContent();
  expect(content).toBe('m^2');

  content = await page.locator('#result-value-3').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(4, precision);
  content = await page.locator('#result-units-3').textContent();
  expect(content).toBe('m^2');

  content = await page.locator('#result-value-4').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(-1, precision);
  content = await page.locator('#result-units-4').textContent();
  expect(content).toBe('m^2');
});
