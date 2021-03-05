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
  expect(parseFloat(content)).toBeCloseTo(5, 8);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('inch')

  // test removal of units for query statement to make sure updates happen
  for(let i = 0; i<6; i++) {
    await page.press(':nth-match(textarea, 4)', 'Backspace');
  }
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(0.127, 8);
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
  expect(parseFloat(content)).toBeCloseTo(0.001, 8)
  content = await page.textContent('#result-value-1')
  expect(parseFloat(content)).toBeCloseTo(0.3, 8)
  content = await page.textContent('#result-value-2')
  expect(parseFloat(content)).toBeCloseTo(2, 8)
  content = await page.textContent('#result-value-3')
  expect(parseFloat(content)).toBeCloseTo(0.04, 8)

  await page.click('#down-0');
  await page.click('#up-0'); //shouldn't do anything
  content = await page.textContent('#result-value-0')
  expect(parseFloat(content)).toBeCloseTo(0.3, 8)
  content = await page.textContent('#result-value-1')
  expect(parseFloat(content)).toBeCloseTo(0.001, 8)
  content = await page.textContent('#result-value-2')
  expect(parseFloat(content)).toBeCloseTo(2, 8)
  content = await page.textContent('#result-value-3')
  expect(parseFloat(content)).toBeCloseTo(0.04, 8)

  // test deleting cells at middle, beginning, and end
  await page.click('#delete-1');
  content = await page.textContent('#result-value-0')
  expect(parseFloat(content)).toBeCloseTo(0.3, 8)
  content = await page.textContent('#result-value-1')
  expect(parseFloat(content)).toBeCloseTo(2, 8)
  content = await page.textContent('#result-value-2')
  expect(parseFloat(content)).toBeCloseTo(0.04, 8)

  await page.click('#delete-0');
  content = await page.textContent('#result-value-0')
  expect(parseFloat(content)).toBeCloseTo(2, 8)
  content = await page.textContent('#result-value-1')
  expect(parseFloat(content)).toBeCloseTo(0.04, 8)

  await page.click('#delete-1');
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(2, 8);

  await page.click('#delete-0');

  // test exponents
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', '2[mm]^2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 1)', '+2[mm]^(1+3)^1/2');
  for (let i = 0; i<3; i++) {
    await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  }
  await page.press(':nth-match(textarea, 1)', '=');
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(8.0e-6, 8);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^2')

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 2)', '2^2');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 2)', '+2^1+3^1/2');
  for (let i = 0; i<3; i++) {
    await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  }
  await page.press(':nth-match(textarea, 2)', '=');
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(10.643994170967826, 8);

  await page.click('#delete-0');
  await page.click('#delete-0');

  // test incompatible units
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', '1[meter] + 2[sec]=');
  content = await page.textContent('#result-units-0');
  expect(content).toBe('Dimension Error');

  


  await page.pause();

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();