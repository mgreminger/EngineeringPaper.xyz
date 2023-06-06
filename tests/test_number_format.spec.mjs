import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Test round trip full precision', async () => {
  // enter 100 significant figures of pi to test round trip precision
  await page.locator('math-field.editable').type('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117068=');

  // check default precision (15 significant figures)
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe('3.14159265358979');

  // change to max precision (64 significant figures)
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.getByLabel('Significant Figures').dblclick();
  await page.getByLabel('Significant Figures').fill('64');
  await page.getByRole('button', { name: 'Confirm' }).click();

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe('3.141592653589793238462643383279502884197169399375105820974944592');

  // change to precision=62 to check rounding
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.getByLabel('Significant Figures').dblclick();
  await page.getByLabel('Significant Figures').fill('62');
  await page.getByRole('button', { name: 'Confirm' }).click();

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe('3.1415926535897932384626433832795028841971693993751058209749446');
});


test('Test symbolic format', async () => {
  // symbolic expression without units
  await page.locator('math-field.editable').type('2*pi=');

  // symbolic expression with units
  await page.locator('#add-math-cell').click();
  await page.locator('math-field.editable').nth(1).type('-2[km]*pi=');

  // symbolic expression square root, fraction, and units
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\frac{-3\left\lbrack mm\right\rbrack}{\sqrt2}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // check all values rendered as floating point values first
  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(2*pi, precision);

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(-2000*pi, precision-2);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo((1/1000)*(-3/sqrt(2)), precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m');

  // switch to symbolic formatting
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.locator('label').filter({ hasText: 'Display Symbolic Results' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  content = await page.textContent('#result-value-0');
  expect(content).toBe('2 \\pi')

  content = await page.textContent('#result-value-1');
  expect(content).toBe('- 2000 \\pi');
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-2');
  expect(content).toBe(String.raw`- \frac{3 \sqrt{2}}{2000}`);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m');

});


test('Test auto exponent', async () => {
  await page.setLatex(0, String.raw`\frac{2}{3}=`);

  // negative exponent boundary (with units)
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`\frac{1 [mm]}{3}=`);

  // positive exponent boundary with negative number
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\frac{-2000000}{3}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // check the default number formatting
  let content = await page.textContent('#result-value-0');
  expect(content).toBe('0.666666666666667')

  content = await page.textContent('#result-value-1');
  expect(content).toBe(String.raw`3.33333333333333\times 10^{-4}`);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-2');
  expect(content).toBe(String.raw`-6.66666666666667\times 10^{5}`);

  // update auto exponent settings
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.getByRole('button', { name: 'Decrement number' }).first().click(); // decrease precision
  await page.getByRole('button', { name: 'Decrement number' }).nth(1).click(); // decrease lower exp threshold
  await page.getByRole('button', { name: 'Increment number' }).nth(2).click(); // increse upper exp threshold
  await page.getByRole('button', { name: 'Confirm' }).click();

  // check updated output
  content = await page.textContent('#result-value-0');
  expect(content).toBe('0.66666666666667')

  content = await page.textContent('#result-value-1');
  expect(content).toBe(String.raw`0.00033333333333333`);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-2');
  expect(content).toBe(String.raw`-666666.66666667`);

});

test('Test scientific notation', async () => {
  await page.setLatex(0, String.raw`\frac{2}{3}=`);

  // negative exponent boundary (with units)
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`\frac{1 [mm]}{3}=`);

  // positive exponent boundary with negative number
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\frac{-2000000}{3}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // set scientific notation with 5 significant figures
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.locator('label').filter({ hasText: 'Scientific' }).locator('span').first().click();
  await page.getByLabel('Significant Figures').dblclick();
  await page.getByLabel('Significant Figures').fill('5');
  await page.getByRole('button', { name: 'Confirm' }).click();

  // check output
  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`6.6667\times 10^{-1}`)

  content = await page.textContent('#result-value-1');
  expect(content).toBe(String.raw`3.3333\times 10^{-4}`);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-2');
  expect(content).toBe(String.raw`-6.6667\times 10^{5}`);

});


test('Test cell level number format and format save and restore', async () => {
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  await page.setLatex(0, String.raw`\frac{2}{3}=`);

  // negative exponent boundary (with units)
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`\frac{2}{3}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe('0.666666666666667');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('0.666666666666667');

  // change significant figures for second cell only
  await page.locator('#number-format-1').click();
  await page.locator('label').filter({ hasText: 'Fixed' }).locator('span').first().click();
  await page.getByLabel('Significant Figures After Decimal Point').dblclick();
  await page.getByLabel('Significant Figures After Decimal Point').fill('5');
  await page.getByRole('button', { name: 'Confirm' }).click();

  // make sure status dot appears on second cell number format settings icon
  await expect(page.locator('#number-format-1 >> div.dot')).toBeVisible();

  // make sure the formatting of only the second math cell changes
  content = await page.textContent('#result-value-0');
  expect(content).toBe('0.666666666666667');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('0.66667');

  // change the sheet wide settings
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.locator('label').filter({ hasText: 'Fixed' }).locator('span').first().click();
  await page.getByLabel('Significant Figures After Decimal Point').dblclick();
  await page.getByLabel('Significant Figures After Decimal Point').fill('3');
  await page.getByRole('button', { name: 'Confirm' }).click();

  // make sure sheet level settings modified dot is set
  await expect(page.getByTitle('Sheet Settings (Modified')).toBeVisible();

  // make sure the formatting of only the first math cell changes
  content = await page.textContent('#result-value-0');
  expect(content).toBe('0.667');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('0.66667');

  // save sheet to database
  await page.click('#upload-sheet');
  await page.click('text=Confirm');
  await page.waitForSelector('#shareable-link');
  const sheetUrl = new URL(await page.$eval('#shareable-link', el => el.value));
  await page.click('[aria-label="Close the modal"]');

  // clear contents by creating a new sheet
  await page.locator('#new-sheet').click();

  // go back to page that was just saved
  await page.evaluate(() => window.history.back());
  await page.locator('h3 >> text=Retrieving Sheet').waitFor({state: 'detached', timeout: 5000});

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // make sure dot indicating cell level change is still visible
  await expect(page.locator('#number-format-1 >> div.dot')).toBeVisible();

  // make sure sheet level and cell formatting are still correct
  content = await page.textContent('#result-value-0');
  expect(content).toBe('0.667');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('0.66667');

  // change the cell specific number formatting back to the default
  await page.locator('#number-format-1').click();
  await page.locator('label').filter({ hasText: 'Automatic' }).locator('span').first().click();
  await page.getByLabel('Significant Figures').dblclick();
  await page.getByLabel('Significant Figures').fill('15');
  await page.getByRole('button', { name: 'Confirm' }).click();

  // make sure status dot for cell format is removed
  await expect(page.locator('#number-format-1 >> div.dot')).not.toBeVisible();

  // make sure all cells are now using sheet wide format
  content = await page.textContent('#result-value-0');
  expect(content).toBe('0.667');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('0.667');

  // set sheet wide settings to default
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.getByRole('button', { name: 'Restore Defaults' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  // sheet wide status dot should be gone
  await expect(page.getByTitle('Sheet Settings (Modified')).not.toBeVisible();  

  // check for default number formatting for all fields
  content = await page.textContent('#result-value-0');
  expect(content).toBe('0.666666666666667');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('0.666666666666667');

});


test('Test restore defaults button', async () => {
  await page.locator('math-field.editable').type('pi=');

  // change all of the number format settings
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.getByRole('button', { name: 'Decrement number' }).first().click();
  await page.getByRole('button', { name: 'Decrement number' }).first().click();
  await page.getByRole('button', { name: 'Increment number' }).nth(2).click();
  await page.locator('label').filter({ hasText: 'Fixed' }).locator('span').first().click();
  await page.locator('label').filter({ hasText: 'Display Symbolic Results' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // check that symbolic number formatting is used
  let content = await page.textContent('#result-value-0');
  expect(content).toBe('\\pi');

  // reset all of the sheet number format settings to their default values
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.getByRole('button', { name: 'Restore Defaults' }).click();
  
  content = await page.getByLabel('Significant Figures').inputValue();
  expect(content).toBe('15');

  content = await page.getByLabel('Negative Exponent Threshold').inputValue();
  expect(content).toBe('-3');

  content = await page.getByLabel('Positive Exponent Threshold').inputValue();
  expect(content).toBe('5');

  await page.getByRole('button', { name: 'Confirm' }).click();

  // check that the output format is the default for the first cell
  // verifies that Automatic is set with 15 significant figures
  content = await page.textContent('#result-value-0');
  expect(content).toBe('3.14159265358979');

});

// test fixed notation
test('Test fixed notation', async () => {
  await page.setLatex(0, String.raw`\frac{2}{3}=`);

  // negative exponent boundary (with units)
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`\frac{1 [mm]}{3}=`);

  // positive exponent boundary with negative number
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\frac{-2000000}{3}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // set fixed notation with 3 significant figures after decimal point
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.locator('label').filter({ hasText: 'Fixed' }).locator('span').first().click();
  await page.getByLabel('Significant Figures After Decimal Point').dblclick();
  await page.getByLabel('Significant Figures After Decimal Point').fill('3');
  await page.getByRole('button', { name: 'Confirm' }).click();

  // check output
  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`0.667`)

  content = await page.textContent('#result-value-1');
  expect(content).toBe(String.raw`0.000`);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-2');
  expect(content).toBe('-666666.667');

  // test 0 significant figures after decimal point
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.getByLabel('Significant Figures After Decimal Point').fill('0');
  await page.getByRole('button', { name: 'Confirm' }).click();

  // check output
  content = await page.textContent('#result-value-0');
  expect(content).toBe('1')

  content = await page.textContent('#result-value-1');
  expect(content).toBe('0');
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-2');
  expect(content).toBe('-666667');

});


test('Test engineering notation', async () => {
  await page.setLatex(0, String.raw`\frac{2}{3}=`);

  // negative exponent boundary (with units)
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`\frac{1 [mm]}{3}=`);

  // positive exponent boundary with negative number
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\frac{-2000000}{3}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // set fixed notation with 3 significant figures after decimal point
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.locator('label').filter({ hasText: 'Engineering' }).locator('span').first().click();
  await page.getByLabel('Significant Figures').dblclick();
  await page.getByLabel('Significant Figures').fill('4');
  await page.getByRole('button', { name: 'Confirm' }).click();

  // check output
  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`666.7\times 10^{-3}`)

  content = await page.textContent('#result-value-1');
  expect(content).toBe(String.raw`333.3\times 10^{-6}`);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-2');
  expect(content).toBe(String.raw`-666.7\times 10^{3}`);


  // test 1 significant figure
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.getByLabel('Significant Figures').fill('0');
  await page.getByRole('button', { name: 'Confirm' }).click();

  // check output
  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`700\times 10^{-3}`)

  content = await page.textContent('#result-value-1');
  expect(content).toBe(String.raw`300\times 10^{-6}`);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-2');
  expect(content).toBe(String.raw`-700\times 10^{3}`);

});
