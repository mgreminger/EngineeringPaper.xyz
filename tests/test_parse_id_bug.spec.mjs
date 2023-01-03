import { test, expect } from '@playwright/test';
import { compareImages } from './utility.mjs';

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13; 



test('Test parse id bug', async ({ page, browserName }) => {
  // deleting cells doesn't force a reparsing of math cells so using cell index as a unique id causes chaos
  // this will be fixed by using the mathField id as the unique id
  // this test is to prevent regressions
  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  await page.goto('/DuGYz5Lu7tPdEJ27zAT8bg');

  await page.locator('h1 >> text=Calculating the Johnson-Euler Buckling Load').waitFor({state: 'visible', timeout: 10000});
  await page.locator("text=Accept").click();

  await page.locator('#delete-0').click();
  await page.locator('#delete-0').click({force: true});
  await page.locator('#delete-1').click();
  await page.locator('#delete-1').click({force: true});
  await page.locator('#delete-2').click();
  await page.locator('#delete-2').click({force: true});
  await page.locator('#delete-3').click();
  await page.locator('#delete-3').click({force: true});
  await page.locator('#delete-4').click();
  await page.locator('#delete-4').click({force: true});

  await page.type(':nth-match(textarea, 98)', ' ');

  await page.locator('#add-math-cell').click();

  await page.setLatex(18, String.raw`P_{cr}\left(S_{r}=100\right)=`);

  await page.locator('text=Updating...').waitFor({state: 'detached', timeout: 60000});

  let content = await page.locator('#result-value-18').textContent();
  expect(parseFloat(content)).toBeCloseTo(87008.8224822737, precision);
});
