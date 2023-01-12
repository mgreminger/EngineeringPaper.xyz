import { test, expect } from '@playwright/test';

import { precision, pyodideLoadTimeout, compareImages } from './utility.mjs';

test('Test parse id bug', async ({ page, browserName }) => {
  // deleting cells doesn't force a reparsing of math cells so using cell index as a unique id causes chaos
  // this will be fixed by using the mathField id as the unique id
  // this test is to prevent regressions
  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  // const width = 900; // needs to be wider since webkit is not scrolling enough for some clicks
  // const height = 1280;

  // await page.setViewportSize({ width: width, height: height });

  await page.goto('/DuGYz5Lu7tPdEJ27zAT8bg');
  await page.locator('h3 >> text=Retrieving Sheet').waitFor({state: 'detached', timeout: 5000});

  await page.locator('h1 >> text=Calculating the Johnson-Euler Buckling Load').waitFor({state: 'visible', timeout: 10000});
  await page.locator("text=Accept").click();

  await page.locator('#delete-0').click();
  await page.locator('#delete-0').click();
  await page.locator('#delete-1').click();
  await page.locator('#delete-1').click();
  await page.locator('#delete-2').click();
  await page.locator('#delete-2').click();
  await page.locator('#delete-3').click();
  await page.locator('#delete-3').click();
  await page.locator('#delete-4').click();
  await page.locator('#delete-4').click();

  await page.type(':nth-match(textarea, 98)', ' ');

  await page.locator('#add-math-cell').click();

  await page.setLatex(18, String.raw`P_{cr}\left(S_{r}=100\right)=`);

  await page.locator('text=Updating...').waitFor({state: 'detached', timeout: pyodideLoadTimeout});

  let content = await page.locator('#result-value-18').textContent();
  expect(parseFloat(content)).toBeCloseTo(87008.8224822737, precision);
});
