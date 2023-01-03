import { test, expect } from '@playwright/test';


// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13; 


test('Test sheet insertion', async ({ page, browserName }) => {
  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  await page.goto('/');

  await page.locator("text=Accept").click();

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  await page.setLatex(0, 'E=');

  await page.click('#insert-sheet');

  await page.locator('text=Quick Links Prebuilt Tables >> svg').click();
  await page.locator('ul[role="group"] >> text=Mechanical Properties of Metals').click();
  await page.locator('text=Confirm').click();

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: 100000 });
  let content = await page.locator('#result-value-0').textContent();
  expect(parseFloat(content)).toBeCloseTo(71.7e9, precision);

  await page.locator('#row-radio-1-1').check();

  await page.waitForSelector('.status-footer', { state: 'detached' });
  content = await page.locator('#result-value-0').textContent();
  expect(parseFloat(content)).toBeCloseTo(127.6e9, precision);

});


test('Test insert using keyboard shortcut using newly saved sheet', async ({ page, browserName }) => {
  page.on('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('./tests/images/image_small.jpg');
  });

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex),
      [cellIndex, latex]);
  }

  await page.goto('/');
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // Create a new document to test saving capability
  await page.locator("text=Accept").click();

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  await page.type(':nth-match(textarea, 1)', 'x=3');

  // save sheet to database
  await page.click('#upload-sheet');
  await page.click('text=Confirm');
  await page.waitForSelector('#shareable-link');
  const sheetUrl = new URL(await page.$eval('#shareable-link', el => el.value));

  await page.click('[aria-label="Close the modal"]');
  await page.keyboard.press('Escape');

  // create new sheet
  await page.locator('#new-sheet').click();
  await page.setLatex(0, 'x=');

  // insert sheet that was just saved
  await page.keyboard.press(modifierKey+"+Enter");
  await page.locator('text=Insert Sheet').click({timeout: 2000});

  await page.locator('input[name="url"]').fill(sheetUrl.href);
  await page.locator('text=Confirm').click();

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: 100000 });
  
  const content = await page.locator('#result-value-0').textContent();
  expect(parseFloat(content)).toBeCloseTo(3, precision);
});