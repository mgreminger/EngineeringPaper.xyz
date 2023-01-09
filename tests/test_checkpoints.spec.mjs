import { test, expect } from '@playwright/test';
import { compareImages } from './utility.mjs';

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13;

test('Test autosave checkpoints', async ({ page, browserName }) => {
  page.on('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('./tests/images/image_small.jpg');
  });

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex),
      [cellIndex, latex]);
  }

  await page.goto('/');

  // Create a new document to test saving capability
  await page.locator("text=Accept").click();

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'New Title');

  await page.setLatex(0, '1=');

  // wait 10.5 seconds to ensure checkpoint saved
  await page.waitForTimeout(10500);
  await page.setLatex(0, '2=');

  await page.waitForTimeout(10500);
  await page.click('#add-documentation-cell');
  await page.type('div.editor div', `Checkpoint 3`);

  await page.waitForTimeout(10500);

  // will create a new sheet to clear contents
  // will first dismiss creating new sheet and make sure everything stays the same
  page.once('dialog', dialog => {
    dialog.dismiss();
  });
  await page.locator('#new-sheet').click();
  await page.locator('text=Checkpoint 3').waitFor({timeout: 1000});

  // will create a new sheet to clear contents
  // now accept new sheet and make sure everything is gone
  page.once('dialog', dialog => {
    dialog.accept();
  });
  await page.locator('#new-sheet').click();
  await page.locator('text=Checkpoint 3').waitFor({state: 'detached', timeout: 1000});

  await page.goBack();
  await page.locator('text=Checkpoint 3').waitFor({timeout: 1000});

  await page.goBack(); // need to go back twice since cancelled new sheet adds additional page to history
  await page.locator('text=Checkpoint 3').waitFor({timeout: 1000});

  await page.goBack(); // now we'll hit checkpoint 2
  await page.locator('text=Checkpoint 3').waitFor({state: 'detached', timeout: 1000});
  await page.waitForSelector('.status-footer', { state: 'detached' });
  let content = await page.locator('#result-value-0').textContent();
  expect(parseFloat(content)).toBeCloseTo(2, precision);

  await page.goBack();
  await page.locator('text=New Title').waitFor({timeout: 1000});
  await page.waitForSelector('.status-footer', { state: 'detached' });
  content = await page.locator('#result-value-0').textContent();
  expect(parseFloat(content)).toBeCloseTo(1, precision);

  await page.goBack();
  await page.locator('text=New Sheet').waitFor({timeout: 1000});
  
});