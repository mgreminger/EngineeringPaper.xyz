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
  await page.check('#debug');


  // Test basic dimensional analysis and unit conversion
  await page.pressMultiple(':nth-match(textarea, 1)', 'x=3[inch]');

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 2)', 'y=4[inch]');

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 3)', 'length=sqrtx^2');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 3)', '+y^2');

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 4)', 'length=[inch]');
  let content = await page.textContent('#result-value-3');
  expect(content).toBe('5');
  content = await page.textContent('#result-units-3');
  expect(content).toBe('inch')

  // test removal of units for query statement to make sure updates happen
  for(let i = 0; i<6; i++) {
    await page.press(':nth-match(textarea, 4)', 'Backspace');
  }
  content = await page.textContent('#result-value-3');
  expect(content.slice(0,5)).toBe('0.127');
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m')

  // delete all cells and test moving cells
  for(let i=0; i<4; i++) {
    await page.click('#delete-0');
  }
  
  for (let i=0; i<4; i++) {
    await page.click('#add-cell');
  }

  await page.pressMultiple(':nth-match(textarea, 1)', '1[mm] = [m]' );
  await page.pressMultiple(':nth-match(textarea, 2)', '2[mm] = [mm]' );
  await page.pressMultiple(':nth-match(textarea, 3)', '3[mm] = [cm]' );
  await page.pressMultiple(':nth-match(textarea, 4)', '4[mm] = [dm]' );

  content = await page.textContent('#result-units-3');
  expect(content).toBe('dm');

  await page.click('#up-2');
  await page.click('#down-3'); // shouldn't do anything
  content = await page.textContent('#result-value-0')
  expect(content).toBe('0.001')
  content = await page.textContent('#result-value-1')
  expect(content).toBe('0.3')
  content = await page.textContent('#result-value-2')
  expect(content).toBe('2')
  content = await page.textContent('#result-value-3')
  expect(content).toBe('0.04')

  await page.click('#down-0');
  await page.click('#up-0'); //shouldn't do anything
  content = await page.textContent('#result-value-0')
  expect(content).toBe('0.3')
  content = await page.textContent('#result-value-1')
  expect(content).toBe('0.001')
  content = await page.textContent('#result-value-2')
  expect(content).toBe('2')
  content = await page.textContent('#result-value-3')
  expect(content).toBe('0.04')


  await page.pause();

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();