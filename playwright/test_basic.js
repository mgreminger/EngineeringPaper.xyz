import { chromium } from 'playwright';
import expect from 'expect';

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 0
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  page.pressMultiple = async function(selector, keys) {
    for(let i = 0; i < keys.length; i++){
      await this.press(selector, keys[i]);
    }
  }

  // Go to http://localhost:5000/
  await page.goto('http://localhost:5000/');

  // Check input[type="checkbox"]
  await page.check('input[type="checkbox"]');


  // Fill textarea
  await page.pressMultiple(':nth-match(textarea, 1)', 'x=3[inch]');

  await page.click('text=Add Cell');
  await page.pressMultiple(':nth-match(textarea, 2)', 'y=4[inch]');

  await page.click('text=Add Cell');
  await page.pressMultiple(':nth-match(textarea, 3)', 'length=sqrtx^2');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 3)', '+y^2');

  await page.click('text=Add Cell');
  await page.pressMultiple(':nth-match(textarea, 4)', 'length=[inch]');
  let content = await page.textContent('#result-value-3');
  expect(content).toBe('5');

  //await page.pause();

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();