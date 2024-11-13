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
  expect(content).toBe('2 \\cdot \\pi')

  content = await page.textContent('#result-value-1');
  expect(content).toBe('- 2000 \\cdot \\pi');
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-2');
  expect(content).toBe(String.raw`- \frac{3 \cdot \sqrt{2}}{2000}`);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m');

});

test('Test disabling automatic expressions simplification', async () => {
  // first test that automatic simplification is on by default
  await page.setLatex(0, String.raw`-F-F_{B}-F_{W}-\frac{F\cdot l_4-F_{B}\cdot l_2+F_{W}\cdot l_3}{l_1+l_2}+\frac{F\cdot l_1+F\cdot l_2+F\cdot l_4+F_{B}\cdot l_1+F_{W}\cdot l_1+F_{W}\cdot l_2+F_{W}\cdot l_3}{l_1+l_2}\ =`);

  await page.waitForSelector('.status-footer', { state: 'detached'});

  // check query result in cell 1
  let content = await page.textContent('#result-value-0');
  expect(content).toBe('0');

  // turn off automatic simplification
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.locator('label').filter({ hasText: 'Automatically Simplify Symbolic Expressions' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await page.waitForSelector('.status-footer', { state: 'detached'});

  // check query result in cell 1
  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`- F - F_{B} - F_{W} - \frac{F \cdot l_{4} - F_{B} \cdot l_{2} + F_{W} \cdot l_{3}}{l_{1} + l_{2}} + \frac{F \cdot l_{1} + F \cdot l_{2} + F \cdot l_{4} + F_{B} \cdot l_{1} + F_{W} \cdot l_{1} + F_{W} \cdot l_{2} + F_{W} \cdot l_{3}}{l_{1} + l_{2}}`);

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


test('Test number input validation', async () => {

  await page.setLatex(0, String.raw`\frac{2}{3}=`);

  // negative exponent boundary (with units)
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`\frac{2}{3}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe('0.666666666666667');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('0.666666666666667');

  // enter invalid values for number inputs and check error message
  await page.getByRole('button', { name: 'Sheet Settings' }).click();

  await page.getByLabel('Significant Figures').click();
  await page.getByLabel('Significant Figures').press('Backspace');
  await page.getByLabel('Significant Figures').press('Backspace');
  await expect(page.locator('text=Value must be between 1 and 64')).toBeVisible();

  await page.getByLabel('Negative Exponent Threshold').dblclick();
  await page.getByLabel('Negative Exponent Threshold').fill('-1');
  await expect(page.locator('text=Value must be between -12 and -2')).toBeVisible();

  await page.getByLabel('Positive Exponent Threshold').dblclick();
  await page.getByLabel('Positive Exponent Threshold').fill('13');
  await expect(page.locator('text=Value must be between 2 and 12')).toBeVisible();

  await page.getByRole('button', { name: 'Confirm' }).click();

  // make sure formatting has not changed (changes to upper and lower limit won't impact results)
  content = await page.textContent('#result-value-0');
  expect(content).toBe('0.666666666666667');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('0.666666666666667');

  // make sure dialog contains default values when blank and nearest boundary when numeric 
  await page.getByRole('button', { name: 'Sheet Settings' }).click();

  content = await page.getByLabel('Significant Figures').inputValue();
  expect(content).toBe('15');

  content = await page.getByLabel('Negative Exponent Threshold').inputValue();
  expect(content).toBe('-2');

  content = await page.getByLabel('Positive Exponent Threshold').inputValue();
  expect(content).toBe('12');

  await page.getByRole('button', { name: 'Confirm' }).click();

  // make sure formatting has not changed 
  content = await page.textContent('#result-value-0');
  expect(content).toBe('0.666666666666667');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('0.666666666666667');

});


test('Test disabling automatic fraction conversion', async () => {
  // turn off automatic simplification
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.locator('label').filter({ hasText: 'Automatically Convert Decimal Values to Fractions' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  
  await page.setLatex(0, String.raw`\left(\frac{1.115625000065330001000001000010001}{1.355801000010000100001000010000100010}\right)^{\frac{1}{-.01780001000100010001}}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // check output
  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(57170.5227437832, precision);
});


test('Test default automatic fraction conversion setting', async () => {
  await page.setLatex(0, String.raw`.125=`);

  // turn on symbolic results 
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.locator('label').filter({ hasText: 'Display Symbolic Results' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // check output
  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\frac{1}{8}`);
});

test('Test intermediate results rendering edge cases', async () => {
  await page.setLatex(0, String.raw`a=0\left\lbrack m\right\rbrack,b=2\left\lbrack m\right\rbrack,c=20,d=400,\:a_1=1e10,\:s=t,\:z=1\left\lbrack m\right\rbrack+1\left\lbrack s\right\rbrack`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`y1=\int_{a}^{b}\left(x\cdot b\right)\mathrm{d}\left(x\right)\cdot\log_{c}\left(d\right)\cdot\left(\:a_1\:\right)\cdot1^{c}\cdot s\left(t=b\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`y2=\int_a^b\left(x\cdot b\right)\mathrm{d}\left(x\right)\cdot\log_c\left(d\right)\cdot\left(\:a_1\:\right)\cdot1^c\cdot s\left(t=b\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`a=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`a\cdot z=`);

  // turn on symbolic results 
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.locator('label').filter({ hasText: 'Show Intermediate Results' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // check output
  let content = await page.textContent('#result-value-1');
  expect(content).toBe(String.raw`\int_{ 0\left\lbrack m\right\rbrack  }^{ 2\left\lbrack m\right\rbrack  }\left(x\cdot \left( 2\left\lbrack m\right\rbrack  \right)\right)\mathrm{d}\left(x\right)\cdot\log_{ 20 }\left( 400 \right)\cdot\left(\: 1\times 10^{10} \:\right)\cdot1^{ 20 }\cdot s\left(t=\left( 2\left\lbrack m\right\rbrack  \right)\right) = 1.6\times 10^{11}`);

  content = await page.textContent('#result-value-2');
  expect(content).toBe(String.raw`\int_{ 0\left\lbrack m\right\rbrack  }^{ 2\left\lbrack m\right\rbrack  }\left(x\cdot \left( 2\left\lbrack m\right\rbrack  \right)\right)\mathrm{d}\left(x\right)\cdot\log_{ 20 }\left( 400 \right)\cdot\left(\: 1\times 10^{10} \:\right)\cdot1^{ 20 }\cdot s\left(t=\left( 2\left\lbrack m\right\rbrack  \right)\right) = 1.6\times 10^{11}`);

  content = await page.textContent('#result-value-3');
  expect(content).toBe(String.raw`0`);

  content = await page.textContent('#result-value-4');
  expect(content).toBe(String.raw`\left( 0\left\lbrack m\right\rbrack  \right)\cdot \left(\text{Dimension Error}\right) = `);

  // change default units and make sure numbers in intermediate results update to match
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.getByRole('tab', { name: 'Default Units' }).click();
  await page.getByRole('button', { name: 'mm-kg-sec' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-1');
  expect(content).toBe(String.raw`\int_{ 0\left\lbrack mm\right\rbrack  }^{ 2000\left\lbrack mm\right\rbrack  }\left(x\cdot \left( 2000\left\lbrack mm\right\rbrack  \right)\right)\mathrm{d}\left(x\right)\cdot\log_{ 20 }\left( 400 \right)\cdot\left(\: 1\times 10^{10} \:\right)\cdot1^{ 20 }\cdot s\left(t=\left( 2000\left\lbrack mm\right\rbrack  \right)\right) = 1.6\times 10^{23}`);

  content = await page.textContent('#result-value-2');
  expect(content).toBe(String.raw`\int_{ 0\left\lbrack mm\right\rbrack  }^{ 2000\left\lbrack mm\right\rbrack  }\left(x\cdot \left( 2000\left\lbrack mm\right\rbrack  \right)\right)\mathrm{d}\left(x\right)\cdot\log_{ 20 }\left( 400 \right)\cdot\left(\: 1\times 10^{10} \:\right)\cdot1^{ 20 }\cdot s\left(t=\left( 2000\left\lbrack mm\right\rbrack  \right)\right) = 1.6\times 10^{23}`);

  content = await page.textContent('#result-value-3');
  expect(content).toBe(String.raw`0`);

  content = await page.textContent('#result-value-4');
  expect(content).toBe(String.raw`\left( 0\left\lbrack mm\right\rbrack  \right)\cdot \left(\text{Dimension Error}\right) = `);
});

test('Test intermediate results with symbolic values', async () => {
  await page.setLatex(0, String.raw`x\cdot y=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`x=3`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`y=\frac18`);

  // turn on symbolic results 
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.locator('label').filter({ hasText: 'Show Intermediate Results' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // check output
  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\left( 3 \right)\cdot \left( 0.125 \right) = 0.375`);

  //change x to a symbolic value
  await page.setLatex(1, String.raw`x=s`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\left( s \right)\cdot \left( 0.125 \right) = \frac{s}{8}`);

  // change to symbolic output to make sure it impacts numeric intermediate values
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.locator('label').filter({ hasText: 'Display Symbolic Results' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\left( s \right)\cdot \left( \frac{1}{8} \right) = \frac{s}{8}`);
});

test('Test intermediate results with only symbolic values', async () => {
  await page.setLatex(0, String.raw`x\cdot y=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`\alpha_1\cdot a=`);

  // turn on intermediate results 
  await page.getByRole('button', { name: 'Sheet Settings' }).click();
  await page.locator('label').filter({ hasText: 'Show Intermediate Results' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // there should be no intermediate result
  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`x \cdot y`);

  content = await page.textContent('#result-value-1');
  expect(content).toBe(String.raw`a \cdot \alpha_{1}`);
});
