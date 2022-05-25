import { test, expect } from '@playwright/test';

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13; 

test('Test table types in math cells', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  // Only number in math cell should generate a syntax error
  await page.type(':nth-match(textarea, 1)', '3');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', '1.0');
  let content = await page.textContent(':nth-match(.bx--tooltip__trigger span, 1)');
  expect(content).toBe('Invalid Syntax');
  content = await page.textContent(':nth-match(.bx--tooltip__trigger span, 2)');
  expect(content).toBe('Invalid Syntax');

  // Only units in math cell should generate a syntax error
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', '[inches]');
  content = await page.textContent(':nth-match(.bx--tooltip__trigger span, 3)');
  expect(content).toBe('Invalid Syntax');

  // Only parameter in a math cell should generate a syntax error
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', 'a');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 5)', 'aa');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 6)', 'a_b');
  content = await page.textContent(':nth-match(.bx--tooltip__trigger span, 4)');
  expect(content).toBe('Invalid Syntax');
  content = await page.textContent(':nth-match(.bx--tooltip__trigger span, 5)');
  expect(content).toBe('Invalid Syntax');
  content = await page.textContent(':nth-match(.bx--tooltip__trigger span, 6)');
  expect(content).toBe('Invalid Syntax');

});
