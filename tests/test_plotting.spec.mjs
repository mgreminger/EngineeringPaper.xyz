import { test, expect } from '@playwright/test';


// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13;


test('Test plotting', async ({ page, browserName }) => {
  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex),
      [cellIndex, latex]);
  }

  await page.goto('/');

  // Create a new document to test saving capability
  await page.locator('div.bx--modal-container').waitFor();
  await page.keyboard.press('Escape');
  await page.locator('#new-sheet').click();

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  // make sure first empty cell has Invalid Syntax error
  await page.waitForSelector('button:has-text("This field must contain an assignment, query, or equality statement type")');

  // test plot without units
  await page.click('#add-documentation-cell');
  await page.type('div.editor div', 'Plot with 2 curves and no units');
  await page.setLatex(0, String.raw`y=x^{2}`);
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'z=-x');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'y(-1<=x<=1)=');
  await page.type(':nth-match(textarea, 4)', 'z(-1<x<1)=');

  // add plot with 1 curve and units
  await page.click('#add-documentation-cell');
  await page.type(':nth-match(p, 2)', 'Plot with 1 curve and units');

  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`y\left(-1\left[inch\right]\le x\le 1\left[inch\right]\right)=\left[inch^{2}\right]`);

  // add expressions with errors to plot cells to test error reporting
  await page.type(':nth-match(textarea, 7)', 'y(-1<=s<=1)=');
  await page.waitForSelector('button:has-text("Results of expression does not evaluate to numeric values")');
  for (let i = 0; i < 12; i++) {
    await page.press(':nth-match(textarea, 7)', 'Backspace');
  }

  await page.type(':nth-match(textarea, 7)', 'y(-1<=x<=1)=');
  await page.waitForSelector('button:has-text("Units Mismatch")');
  for (let i = 0; i < 12; i++) {
    await page.press(':nth-match(textarea, 7)', 'Backspace');
  }

  await page.type(':nth-match(textarea, 7)', 'y=');
  await page.waitForSelector('button:has-text("Not a Plot")');
  for (let i = 0; i < 2; i++) {
    await page.press(':nth-match(textarea, 7)', 'Backspace');
  }

  await page.type(':nth-match(textarea, 7)', 'y(-s<x<s)=');
  await page.waitForSelector('button:has-text("Limits of plot range do not evaluate to a number")');
  for (let i = 0; i < 10; i++) {
    await page.press(':nth-match(textarea, 7)', 'Backspace');
  }

  await page.type(':nth-match(textarea, 7)', 'y(1[inch]<x<1[sec])=');
  await page.waitForSelector('button:has-text("Units of the upper and lower range limit do not match")');
  for (let i = 0; i < 20; i++) {
    await page.press(':nth-match(textarea, 7)', 'Backspace');
  }

  await page.type(':nth-match(textarea, 7)', 'y(-1[inch]<x<1[inch])=[sec]');
  await page.waitForSelector('button:has-text("Units Mismatch")');
  for (let i = 0; i < 29; i++) {
    await page.press(':nth-match(textarea, 7)', 'Backspace');
  }

  await page.type(':nth-match(textarea, 7)', 'y(-1<x<1, -1<s<1)=');
  await page.waitForSelector('button:has-text("Only one range may be specified for plotting")');
  for (let i = 0; i < 18; i++) {
    await page.press(':nth-match(textarea, 7)', 'Backspace');
  }

  await page.click('#add-math-cell');
  await page.setLatex(6, String.raw`s=u\cdot \sec\left(v\right)`);

  await page.click('#add-math-cell');
  await page.setLatex(7, String.raw`s\left(v=\frac{pi}{2},0<u<20\right)=`);
  await page.waitForSelector('button:has-text("Results of expression does not evaluate to numeric values")');
  for (let i = 0; i < 18; i++) {
    await page.press(':nth-match(textarea, 9)', 'Backspace');
  }

  await page.type(':nth-match(textarea, 9)', 's(v=p,0<u<20)=');
  await page.waitForSelector('button:has-text("Results of expression does not evaluate to numeric values")');
  for (let i = 0; i < 14; i++) {
    await page.press(':nth-match(textarea, 9)', 'Backspace');
  }

  await page.type(':nth-match(textarea, 9)', 's(v=pi/4');
  await page.press(':nth-match(textarea, 9)', 'ArrowRight');
  await page.type(':nth-match(textarea, 9)', ',0<u<20)=');

});

// #72
test('Test plot dims with 0 start of range', async ({ page, browserName }) => {
  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex),
      [cellIndex, latex]);
  }

  await page.goto('/');

  // Create a new document to test saving capability
  await page.locator('div.bx--modal-container').waitFor();
  await page.keyboard.press('Escape');
  await page.locator('#new-sheet').click();

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  // test plot without units
  await page.setLatex(0, String.raw`y=1\left[m\right]\cdot x`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`y\left(0\le x\le 10\right)=\left[m\right]`);

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: 100000 });

  await expect(() => page.locator('button:has-text("Units Mismatch")').waitFor({timeout: 1000 }))
    .rejects.toThrow('Timeout');

});

// #73
test('Test plot two curves with compatible x-range units', async ({ page, browserName }) => {
  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex),
      [cellIndex, latex]);
  }

  await page.goto('/');

  // Create a new document to test saving capability
  await page.locator('div.bx--modal-container').waitFor();
  await page.keyboard.press('Escape');
  await page.locator('#new-sheet').click();

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  // test plot without units
  await page.setLatex(0, String.raw`y=x`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`y\left(0\left[in\right]\le x\le 10\left[m\right]\right)=\left[m\right]`);
  await page.locator('textarea').nth(2).type('y(0[m]<=x<=10[m])=[m]');

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: 100000 });

  await expect(() => page.locator('button:has-text("Units Mismatch")').waitFor({timeout: 1000 }))
    .rejects.toThrow('Timeout');

});