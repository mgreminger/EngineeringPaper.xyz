import { test, expect } from '@playwright/test';

import { precision, pyodideLoadTimeout, compareImages, parseLatexFloat } from './utility.mjs';

test('Test parse id bug', async ({ page, browserName }) => {
  // deleting cells doesn't force a reparsing of math cells so using cell index as a unique id causes chaos
  // this will be fixed by using the mathField id as the unique id
  // this test is to prevent regressions
  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  page.forceDeleteCell = async function (index) {
    await this.evaluate((index) => window.forceDeleteCell(index), index);
    await this.waitForTimeout(200);
  }

  // const width = 900; // needs to be wider since webkit is not scrolling enough for some clicks
  // const height = 1280;

  // await page.setViewportSize({ width: width, height: height });

  await page.goto('/DuGYz5Lu7tPdEJ27zAT8bg');
  await page.locator('h3 >> text=Retrieving Sheet').waitFor({state: 'detached'});

  await page.locator('h1 >> text=Calculating the Johnson-Euler Buckling Load').waitFor({state: 'visible'});
  await page.locator("text=Accept").click();

  await page.forceDeleteCell(0);
  await page.forceDeleteCell(1);
  await page.forceDeleteCell(2);
  await page.forceDeleteCell(3);
  await page.forceDeleteCell(4);

  await page.type(':nth-match(math-field.editable, 98)', ' ');

  await page.locator('#add-math-cell').click();

  await page.setLatex(18, String.raw`P_{cr}\left(S_{r}=100\right)=`);

  await page.locator('text=Updating...').waitFor({state: 'detached', timeout: pyodideLoadTimeout});

  let content = await page.locator('#result-value-18').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(87008.8224822736, precision);
});
