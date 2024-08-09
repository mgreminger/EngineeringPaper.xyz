import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

import { compareImages, screenshotDir, loadPyodide, newSheet } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));


test('Test plotting', async ({ browserName }) => {

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  // make sure first empty cell shows informative message
  await page.waitForSelector('button:has-text("This field must contain an assignment (e.g., x=y*z) or a query (e.g., x=). To delete an unwanted math cell, click the trash can on the right.")');

  // test plot without units
  await page.click('#add-documentation-cell');
  await page.type('div.editor div', 'Plot with 2 curves and no units');
  await page.setLatex(0, String.raw`y=x^{2}`);
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', 'z=-x');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 3)', 'y(-1<=x<=1)=');
  await page.locator('#plot-expression-3-0 math-field.editable').press('Enter');
  await page.type(':nth-match(math-field.editable, 4)', 'z(-1<x<1)=');

  // add plot with 1 curve and units
  await page.click('#add-documentation-cell');
  await page.type(':nth-match(p, 2)', 'Plot with 1 curve and units');

  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`y\left(-1\left[inch\right]\le x\le 1\left[inch\right]\right)=\left[inch^{2}\right]`);

  // add expressions with errors to plot cells to test error reporting
  await page.locator('#plot-expression-5-0 math-field.editable').press('Enter');
  await page.locator('#plot-expression-5-1 math-field.editable').type('y(-1<=s<=1)=');
  await page.waitForSelector('button:has-text("Results of expression does not evaluate to finite and real numeric values")');
  for (let i = 0; i < 12; i++) {
    await page.locator('#plot-expression-5-1 math-field.editable').press('Backspace');
  }

  await page.locator('#plot-expression-5-1 math-field.editable').type('y(-1<=x<=1)=');
  await page.pause();
  await page.waitForSelector('button:has-text("All x-axis units must be compatible")');
  for (let i = 0; i < 12; i++) {
    await page.locator('#plot-expression-5-1 math-field.editable').press('Backspace');
  }

  await page.locator('#plot-expression-5-1 math-field.editable').type('y=');
  await page.waitForSelector('button:has-text("This field must contain a function query with an input parameter range using the format y(-10 ≤ x ≤ 10)=")');
  for (let i = 0; i < 2; i++) {
    await page.locator('#plot-expression-5-1 math-field.editable').press('Backspace');
  }

  await page.locator('#plot-expression-5-1 math-field.editable').type('y(-s<x<s)=');
  await page.waitForSelector('button:has-text("X-axis limits of plot do not evaluate to a number")');
  for (let i = 0; i < 10; i++) {
    await page.locator('#plot-expression-5-1 math-field.editable').press('Backspace');
  }

  await page.locator('#plot-expression-5-1 math-field.editable').type('y(1[inch]<x<1[sec])=');
  await page.waitForSelector('button:has-text("Units of the x-axis upper and lower limits do not match")');
  for (let i = 0; i < 20; i++) {
    await page.locator('#plot-expression-5-1 math-field.editable').press('Backspace');
  }

  await page.locator('#plot-expression-5-1 math-field.editable').type('y(-1[inch]<x<1[inch])=[sec]');
  await page.waitForSelector('button:has-text("Units Mismatch")');
  for (let i = 0; i < 29; i++) {
    await page.locator('#plot-expression-5-1 math-field.editable').press('Backspace');
  }

  await page.locator('#plot-expression-5-1 math-field.editable').type('y(-1<x<1, -1<s<1)=');
  await page.waitForSelector('button:has-text("Only one range may be specified for plotting")');
  await page.locator('#delete-row-5-1').click();

  await page.click('#add-math-cell');
  await page.setLatex(6, String.raw`s=u\cdot \sec\left(v\right)`);

  await page.click('#add-math-cell');
  await page.setLatex(7, String.raw`s\left(v=\frac{pi}{2},0<u<20\right)=`);
  await page.waitForSelector('button:has-text("Results of expression does not evaluate to finite and real numeric values")');
  for (let i = 0; i < 18; i++) {
    await page.locator('#plot-expression-7-0 math-field.editable').press('Backspace');
  }

  await page.locator('#plot-expression-7-0 math-field.editable').type('s(v=p,0<u<20)=');
  await page.waitForSelector('button:has-text("Results of expression does not evaluate to finite and real numeric values")');
  for (let i = 0; i < 14; i++) {
    await page.locator('#plot-expression-7-0 math-field.editable').press('Backspace');
  }

  await page.locator('#plot-expression-7-0 math-field.editable').type('s(v=pi/4');
  await page.locator('#plot-expression-7-0 math-field.editable').press('ArrowRight');
  await page.locator('#plot-expression-7-0 math-field.editable').type(',0<u<20)=');
});


// #72
test('Test plot dims with 0 start of range', async ({ browserName }) => {

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  // test plot without units
  await page.setLatex(0, String.raw`y=1\left[m\right]\cdot x`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`y\left(0\le x\le 10\right)=\left[m\right]`);
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await expect(() => page.locator('button:has-text("Units Mismatch")').waitFor({timeout: 1000 }))
    .rejects.toThrow('Timeout');

});


// #73
test('Test plot two curves with compatible x-range units', async ({ browserName }) => {

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  // test plot without units
  await page.setLatex(0, String.raw`y=x`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`y\left(0\left[in\right]\le x\le 10\left[m\right]\right)=\left[m\right]`);
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.locator('#add-row-1').click();
  await page.locator('math-field.editable').nth(2).type('y(0[m]<=x<=10[m])=[m]');

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await expect(() => page.locator('button:has-text("Units Mismatch")').waitFor({timeout: 1000 }))
                         .rejects.toThrow('Timeout');

});


test('Test plot number of points', async ({ browserName }) => {

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  // test plot without units
  await page.setLatex(0, 'y=x');
  await page.click('#add-math-cell');
  await page.setLatex(1, 'z=s^2');
  await page.click('#add-math-cell');
  await page.locator('math-field.editable').nth(2).type('y(0<=x<=1)=');
  await expect(page.locator('#cell-2 >> math-field.editable')).toBeVisible();

  await expect(page.locator('text=Updating...')).toBeHidden();
  await expect(page.locator('g.trace.scatter')).toBeVisible();

  let [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.modebar-btn').first().click()
  ]);
  const linearImageFile = `${browserName}_screenshot_plot_linear.png`;
  fs.copyFileSync(await download.path(), path.join(screenshotDir, linearImageFile));

  for (let i = 0; i < 40; i++) {
    await page.locator('math-field.editable').nth(2).press('Backspace');
  }
  await page.locator('math-field.editable').nth(2).type('z(0<=s<=1) with 1 points =');
  page.locator('button:has-text("Number of range points must be 2 or greater.")').waitFor({timeout: 1000 })

  for (let i = 0; i < 40; i++) {
    await page.locator('math-field.editable').nth(2).press('Backspace');
  }
  await page.locator('math-field.editable').nth(2).type('z(s=1) with 10 points =');
  page.locator('button:has-text("Invalid syntax, cannot specify number of points for function without range parameter.")').waitFor({timeout: 1000 })

  for (let i = 0; i < 40; i++) {
    await page.locator('math-field.editable').nth(2).press('Backspace');
  }
  await page.locator('math-field.editable').nth(2).type('y(x=z(0<=s<=1)with 10 points)=');
  page.locator('button:has-text("Range may only be specified at top level function.")').waitFor({timeout: 1000 })

  // change first equation to a curve
  await page.setLatex(0, 'y=x^2');

  for (let i = 0; i < 40; i++) {
    await page.locator('math-field.editable').nth(2).press('Backspace');
  }
  await page.locator('math-field.editable').nth(2).type('y(0<=x<=1)=');

  await page.waitForSelector('.status-footer', { state: 'detached' });
  [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.modebar-btn').first().click()
  ]);
  const curveImageFile = `${browserName}_screenshot_plot_curve.png`;
  fs.copyFileSync(await download.path(), path.join(screenshotDir, curveImageFile));

  for (let i = 0; i < 40; i++) {
    await page.locator('math-field.editable').nth(2).press('Backspace');
  }
  await page.locator('math-field.editable').nth(2).type('y(0<=x<=1) with 2 points =');

  await page.waitForSelector('.status-footer', { state: 'detached' });
  [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.modebar-btn').first().click()
  ]);
  const twoPointCurveImageFile = `${browserName}_screenshot_plot_2point_curve.png`;
  fs.copyFileSync(await download.path(), path.join(screenshotDir, twoPointCurveImageFile));

  expect(compareImages(linearImageFile, curveImageFile)).toBeGreaterThan(100);
  expect(compareImages(linearImageFile, twoPointCurveImageFile)).toEqual(0);
});


test('Test plot with undefined endpoint', async ({ browserName }) => {

  await page.setLatex(0, String.raw`y=\frac{1}{x}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`y\left(0\left[inch\right]\le x\le 10\left[inch\right]\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Results of expression does not evaluate to finite and real numeric values').waitFor({state: 'attached', timeout: 1000});  

  // change lower limit to be open, which should eliminate the error
  await page.setLatex(1, String.raw`y\left(0\left[inch\right]<x\le 10\left[inch\right]\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached'});

  await page.locator('svg.error').waitFor({state: "detached", timeout: 1000});

});


test('Test handling of units in exponent with plots and x-axis dimension error', async ({ browserName }) => {

  await page.setLatex(0, String.raw`y=x^{1\left[m\right]}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`y\left(0<x\le 10\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Y-axis dimension error: Exponent Not Dimensionless').waitFor({state: 'attached', timeout: 1000});  

  // test x-axis units in exponent error handling
  await page.setLatex(0, String.raw`y=x`);
  await page.setLatex(1, String.raw`y\left(1^{1\left[foot\right]}<x\le 10^{1\left[foot\right]}\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached'});

  await page.locator('#plot-expression-1-0 >> text=X-axis upper and/or lower limit dimension error: Exponent Not Dimensionless').waitFor({state: 'attached', timeout: 1000});


  // test x-axis units in exponent error handling
  await page.setLatex(1, String.raw`y\left(1\left[min\right]+1\left[mile\right]<x\le 10\left[min\right]+3\left[mile\right]\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached'});

  await page.locator('#plot-expression-1-0 >> text=X-axis upper and/or lower limit dimension error').waitFor({state: 'attached', timeout: 1000});  

});


test('Test error message when trying to plot more than 4 different y-axis units', async ({ browserName }) => {

  await page.setLatex(0, String.raw`y0=x`);

  await page.keyboard.press('Enter');
  await page.setLatex(1, String.raw`y1=x^{2}`);

  await page.keyboard.press('Enter');
  await page.setLatex(2, String.raw`y2=x^{3}`);

  await page.keyboard.press('Enter');
  await page.setLatex(3, String.raw`y3=x^{4}`);

  await page.keyboard.press('Enter');
  await page.setLatex(4, String.raw`y4=x^{5}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-5 >> math-field.editable')).toBeVisible();
  await page.setLatex(5, String.raw`y0\left(-10\left[cm\right]\le x\le 10\left[cm\right]\right)=`, 0);
  await page.keyboard.press('Enter');
  await page.setLatex(5, String.raw`y1\left(-10\left[mm\right]\le x\le 10\left[mm\right]\right)=`, 1);
  await page.keyboard.press('Enter');
  await page.setLatex(5, String.raw`y2\left(-10\left[mm\right]\le x\le 10\left[mm\right]\right)=`, 2);
  await page.keyboard.press('Enter');
  await page.setLatex(5, String.raw`y3\left(-10\left[mm\right]\le x\le 10\left[mm\right]\right)=`, 3);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  // should be no errors at this point
  await page.locator('svg.error').waitFor({state: 'detached', timeout: 1000});  

  // add fifth set of units to trigger error
  await page.keyboard.press('Enter');
  await page.setLatex(5, String.raw`y4\left(-10\left[mm\right]\le x\le 10\left[mm\right]\right)=`, 4);

  await page.waitForSelector('.status-footer', { state: 'detached'});

  await page.locator('#plot-expression-5-4 >> text=Cannot have more than 4 different y-axis units').waitFor({state: 'attached', timeout: 1000});

});


test('Test reversed x-axis limits', async ({ browserName }) => {

  await page.setLatex(0, String.raw`y=x`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`y\left(10\le x\le -10\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Upper and lower limits of plot range are reversed').waitFor({state: 'attached', timeout: 1000});  

});


test('Test lower limit unit cancellation issue', async ({ browserName }) => {

  await page.setLatex(0, String.raw`y=\left(1-x\right)\cdot 1\left[m\right]`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`y\left(1\le x\le 20\right)=\left[mm\right]`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await expect(page.locator('text="Units Mismatch"')).not.toBeVisible();

});


test('Test copy plot data', async ({ browserName }) => {
  test.skip(browserName !== "firefox", "Copy-paste test is only working with firefox");

  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.setLatex(0, 'y1=x');
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`y2=1\left[\frac{1}{inch}\right]\cdot x`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-2 >> math-field.editable')).toBeVisible();
  await page.locator('#plot-expression-2-0 math-field.editable').type('y1(-10[inch]<=x<=10[inch])with 2 points=');
  await page.locator('#add-row-2').click();
  await page.locator('#plot-expression-2-1 math-field.editable').type('y2(10[inch]<=x<=20[inch])with 2 points=');

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('text=Copy Data').click();
  await page.locator('text=Copied!').waitFor({state: "attached", timeout: 1000});

  await page.click('text=New Sheet', { clickCount: 3 });
  await page.locator('h1').press(modifierKey+'+v');

  let clipboardContents = await page.locator('h1').textContent();

  clipboardContents = clipboardContents.replace(/\s+/g, ''); // remove whitespace

  expect(clipboardContents).toBe('xy1xy2[inch][m][inch][]-10-0.2541010100.2542020');

});


test('Make sure second curve is plotted if first plot has error', async ({ browserName }) => {
  test.skip(browserName !== "firefox", "Clipboard only works in firefox when headless");

  await page.setLatex(0, String.raw`y=\frac{1}{x}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`y\left(0\le x\le 10\right)=`, 0);


  await page.waitForSelector('.status-footer', { state: 'detached' });

  // should be no data since only curve has error (divide by zero)
  await page.locator('text=Copy Data').click();
  await page.locator('text=No data to copy').waitFor({state: "attached", timeout: 1000});

  // make sure temp text cleared before proceeding
  await page.locator('text=No data to copy').waitFor({state: "detached", timeout: 5000})

  // make a valid second curve
  await page.locator('#add-row-1').click();
  await page.setLatex(1, String.raw`y\left(1\le x\le 10\right)=`, 1);

  await page.waitForSelector('.status-footer', { state: 'detached'});

  //await page.pause();

  // should now be data to copy
  await page.locator('text=Copy Data').click();
  await page.locator('text=Copied!').waitFor({state: "attached", timeout: 1000});

});

test('test scatter plot x-y scalar vector mismatch', async ({ browserName }) => {

  await page.setLatex(0, String.raw`x=\begin{bmatrix}1\\ 2\end{bmatrix},\:y=2`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`x,y=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Both the x and y values need to be a scalar value or a vector').waitFor({state: 'attached', timeout: 1000});  

});

test('test scatter plot x-y scalar vector size mismatch', async ({ browserName }) => {

  await page.setLatex(0, String.raw`x=\begin{bmatrix}1\\ 2\end{bmatrix},\:y=\begin{bmatrix}1\\ 2\\ 3\end{bmatrix}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`x,y=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Both the x and y values need to be either column or row vectors of the same size').waitFor({state: 'attached', timeout: 1000});  

});

test('test scatter plot x matrix but not vector', async ({ browserName }) => {

  await page.setLatex(0, String.raw`x=\begin{bmatrix}1 & 1\\ 2 & 2\end{bmatrix},\:y=\begin{bmatrix}1\\ 2\end{bmatrix}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`x,y=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Both the x and y values need to be either column or row vectors of the same size').waitFor({state: 'attached', timeout: 1000});  

});

test('test scatter plot y matrix but not vector', async ({ browserName }) => {

  await page.setLatex(0, String.raw`x=\begin{bmatrix}1\\ 2\end{bmatrix},\:y=\begin{bmatrix}1 & 1\\ 2 & 2\end{bmatrix}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`x,y=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Both the x and y values need to be either column or row vectors of the same size').waitFor({state: 'attached', timeout: 1000});  

});

test('test scatter plot x not a number', async ({ browserName }) => {

  await page.setLatex(0, String.raw`x=\begin{bmatrix}1\\ a\end{bmatrix},\:y=\begin{bmatrix}1\\ 2\end{bmatrix}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`x,y=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=One or more x values does not evaluate to a finite real value').waitFor({state: 'attached', timeout: 1000});  

});

test('test scatter plot y not a number', async ({ browserName }) => {

  await page.setLatex(0, String.raw`x=\begin{bmatrix}1\\ 2\end{bmatrix},\:y=\begin{bmatrix}1\\ a\end{bmatrix}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`x,y=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=One or more y values does not evaluate to a finite real value').waitFor({state: 'attached', timeout: 1000});  

});

test('test scatter plot x not finite', async ({ browserName }) => {

  await page.setLatex(0, String.raw`x=\begin{bmatrix}1\\ \frac10\end{bmatrix},\:y=\begin{bmatrix}1\\ 2\end{bmatrix}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`x,y=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=One or more x values does not evaluate to a finite real value').waitFor({state: 'attached', timeout: 1000});  

});

test('test scatter plot y not finite', async ({ browserName }) => {

  await page.setLatex(0, String.raw`x=\begin{bmatrix}1\\ 2\end{bmatrix},\:y=\begin{bmatrix}1\\ \frac10\end{bmatrix}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`x,y=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=One or more y values does not evaluate to a finite real value').waitFor({state: 'attached', timeout: 1000});  

});

test('test scatter plot x not real', async ({ browserName }) => {

  await page.setLatex(0, String.raw`x=\begin{bmatrix}1\\ i\end{bmatrix},\:y=\begin{bmatrix}1\\ 3\end{bmatrix}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`x,y=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=One or more x values does not evaluate to a finite real value').waitFor({state: 'attached', timeout: 1000});  

});

test('test scatter plot y not real', async ({ browserName }) => {

  await page.setLatex(0, String.raw`x=\begin{bmatrix}1\\ 2\end{bmatrix},\:y=\begin{bmatrix}1\\ i\end{bmatrix}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`x,y=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=One or more y values does not evaluate to a finite real value').waitFor({state: 'attached', timeout: 1000});  

});

test('test scatter plot x has dimension error', async ({ browserName }) => {

  await page.setLatex(0, String.raw`x=\begin{bmatrix}1\\ 2+1\left\lbrack in\right\rbrack\end{bmatrix},\:y=\begin{bmatrix}1\\ 2\end{bmatrix}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`x,y=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=One or more of the x values has inconsistent units or a dimension error').waitFor({state: 'attached', timeout: 1000});  

});

test('test scatter plot y has dimension error', async ({ browserName }) => {

  await page.setLatex(0, String.raw`x=\begin{bmatrix}1\\ 2\end{bmatrix},\:y=\begin{bmatrix}1\\ 2+1\left\lbrack in\right\rbrack\end{bmatrix}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`x,y=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=One or more of the y values has inconsistent units or a dimension error').waitFor({state: 'attached', timeout: 1000});  

});

test('test scatter plot x has inconsistent units', async ({ browserName }) => {

  await page.setLatex(0, String.raw`x=\begin{bmatrix}1\\ 2\left\lbrack in\right\rbrack\end{bmatrix},\:y=\begin{bmatrix}1\\ 2\end{bmatrix}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`x,y=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=One or more of the x values has inconsistent units or a dimension error').waitFor({state: 'attached', timeout: 1000});  

});

test('test scatter plot y has inconsistent units', async ({ browserName }) => {

  await page.setLatex(0, String.raw`x=\begin{bmatrix}1\\ 2\end{bmatrix},\:y=\begin{bmatrix}1\\ 2\left\lbrack in\right\rbrack\end{bmatrix}`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`x,y=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=One or more of the y values has inconsistent units or a dimension error').waitFor({state: 'attached', timeout: 1000});  

});

test('test scatter plot inconsistent x user unit', async ({ browserName }) => {

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`1\left\lbrack m\right\rbrack,\:2\left\lbrack m\right\rbrack=\left\lbrack s\right\rbrack,\left\lbrack mm\right\rbrack`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=All x-axis units must be compatible').waitFor({state: 'attached', timeout: 1000});  

});

test('test scatter plot inconsistent y user unit', async ({ browserName }) => {

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`1\left\lbrack m\right\rbrack,\:2\left\lbrack m\right\rbrack=\left\lbrack mm\right\rbrack,\left\lbrack s\right\rbrack`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Units Mismatch').waitFor({state: 'attached', timeout: 1000});  

});

test('Test visual comparison of function plot with identical scatter line plot', async ({ browserName }) => {

  // create function plot with user units
  await page.setLatex(0, String.raw`y_1=x_1`);

  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`y_1\left(0\left\lbrack mm\right\rbrack\le x_1\le1\left\lbrack m\right\rbrack\right)=\left\lbrack mm\right\rbrack`, 0);

  await expect(page.locator('text=Updating...')).toBeHidden();
  await expect(page.locator('g.trace.scatter')).toBeVisible();

  let [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.modebar-btn').first().click()
  ]);
  const linearFunctionImageFile = `${browserName}_screenshot_plot_linear_with_user_units.png`;
  fs.copyFileSync(await download.path(), path.join(screenshotDir, linearFunctionImageFile));

  await page.setLatex(1, String.raw`\begin{bmatrix}0\left\lbrack m\right\rbrack\\ 1\left\lbrack m\right\rbrack\end{bmatrix},\begin{bmatrix}0\left\lbrack m\right\rbrack\\ 1\left\lbrack m\right\rbrack\end{bmatrix}\:as\:lines=\left\lbrack mm\right\rbrack,\:\left\lbrack mm\right\rbrack`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });
  await expect(page.locator('g.trace.scatter')).toBeVisible();
  [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.modebar-btn').first().click()
  ]);
  const scatterLinesImageFile = `${browserName}_screenshot_plot_scatter_lines_with_user_units.png`;
  fs.copyFileSync(await download.path(), path.join(screenshotDir, scatterLinesImageFile));

  await page.setLatex(1, String.raw`\begin{bmatrix}0\left\lbrack m\right\rbrack\\ 1\left\lbrack m\right\rbrack\end{bmatrix},\begin{bmatrix}0\left\lbrack m\right\rbrack\\ 1\left\lbrack m\right\rbrack\end{bmatrix}=\left\lbrack mm\right\rbrack,\:\left\lbrack mm\right\rbrack `, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });
  await expect(page.locator('g.points>path.point').first()).toBeVisible();
  [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.modebar-btn').first().click()
  ]);
  const scatterPointsImageFile = `${browserName}_screenshot_plot_scatter_points_with_user_units.png`;
  fs.copyFileSync(await download.path(), path.join(screenshotDir, scatterPointsImageFile));

  expect(compareImages(linearFunctionImageFile, scatterLinesImageFile)).toEqual(0);
  expect(compareImages(scatterLinesImageFile, scatterPointsImageFile)).toBeGreaterThan(100);
});

test('test parametric plot limit units mismatch', async ({ browserName }) => {
  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\left(x,x\right)\:for\:\left(-5\left\lbrack in\right\rbrack\le x\le10\left\lbrack s\right\rbrack\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Units of the upper and lower limits do not match').waitFor({state: 'attached', timeout: 1000});
});

test('test parametric plot with non-numeric y-values', async ({ browserName }) => {
  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\left(x,y\right)\:for\:\left(-5\le x\le10\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Results of expression does not evaluate to finite and real numeric values').waitFor({state: 'attached', timeout: 1000});
});

test('test parametric plot with non-numeric x-values', async ({ browserName }) => {
  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\left(y,x\right)\:for\:\left(-5\le x\le10\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Results of expression does not evaluate to finite and real numeric values').waitFor({state: 'attached', timeout: 1000});
});

test('test parametric plot with non-numeric lower limit', async ({ browserName }) => {
  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\left(x,x\right)\:for\:\left(a\le x\le10\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Upper and/or lower limits do not evaluate to a number').waitFor({state: 'attached', timeout: 1000});
});

test('test parametric plot with non-numeric upper limit', async ({ browserName }) => {
  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\left(x,x\right)\:for\:\left(0\le x\le b\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Upper and/or lower limits do not evaluate to a number').waitFor({state: 'attached', timeout: 1000});
});

test('test parametric plot with incompatible x-axis user unit', async ({ browserName }) => {
  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\left(x,x\right)\:for\:\left(0\left\lbrack m\right\rbrack\le x\le10\left\lbrack m\right\rbrack\right)=\left\lbrack s\right\rbrack,\left\lbrack m\right\rbrack`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=All x-axis units must be compatible').waitFor({state: 'attached', timeout: 1000});
});

test('test parametric plot with incompatible y-axis user unit', async ({ browserName }) => {
  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\left(x,x\right)\:for\:\left(0\left\lbrack m\right\rbrack\le x\le10\left\lbrack m\right\rbrack\right)=\left\lbrack m\right\rbrack,\left\lbrack s\right\rbrack`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Units Mismatch').waitFor({state: 'attached', timeout: 1000});
});

test('test parametric plot with limits reversed', async ({ browserName }) => {
  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\left(x,x\right)\:for\:\left(10\le x\le-10\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Upper and lower limits of plot range are reversed').waitFor({state: 'attached', timeout: 1000});
});

test('Test visual comparison of function plot with identical parametric plot', async ({ browserName }) => {
  await page.setLatex(0, String.raw`y=x`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`\left(x,y\right)\:for\:\left(0\left\lbrack m\right\rbrack\le x\le10\left\lbrack m\right\rbrack\right)=\left(\left\lbrack mm\right\rbrack,\left\lbrack mm\right\rbrack\right)`, 0);
  await expect(page.locator('#plot-expression-1-0 math-field.editable')).toBeVisible();
  
  await expect(page.locator('text=Updating...')).toBeHidden();
  await expect(page.locator('g.trace.scatter')).toBeVisible();

  let [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.modebar-btn').first().click()
  ]);
  const linearParametricImageFile = `${browserName}_screenshot_parametric_linear_plot_with_user_units.png`;
  fs.copyFileSync(await download.path(), path.join(screenshotDir, linearParametricImageFile));

  await page.setLatex(1, String.raw`y\left(0\left\lbrack mm\right\rbrack\le x\le10\left\lbrack m\right\rbrack\right)=\left\lbrack mm\right\rbrack`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });
  await expect(page.locator('g.trace.scatter')).toBeVisible();
  [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.modebar-btn').first().click()
  ]);
  const linearFunctionImageFile = `${browserName}_screenshot_plot_scatter_lines_with_user_units.png`;
  fs.copyFileSync(await download.path(), path.join(screenshotDir, linearFunctionImageFile));

  expect(compareImages(linearParametricImageFile, linearFunctionImageFile)).toEqual(0);
});

test('test parametric plot with expressions as inputs', async ({ browserName }) => {
  await page.setLatex(0, String.raw`y=s,\:x=s^2`);
  
  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\left(t\cdot x,\:4\cdot y\right)\:for\:\left(-1\le s\le1\right)\:with\:51\:points=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Results of expression does not evaluate to finite and real numeric values').waitFor({state: 'attached', timeout: 1000});

  // fix error and make sure plot is generated
  await page.setLatex(1, String.raw`\left(2\cdot x,\:4\cdot y\right)\:for\:\left(-1\le s\le1\right)\:with\:51\:points=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('svg.error').waitFor({state: "detached", timeout: 1000});
  await expect(page.locator('g.trace.scatter')).toBeVisible();
});

test('test parametric plot with range in x or y expression field', async ({ browserName }) => {
  await page.setLatex(0, 'y=x');
  
  await page.locator('#add-plot-cell').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\left(x,y\left(0\le x\le10\right)\right)\:for\:\left(0\le x\le10\right)=`, 0);

  await page.locator('#plot-expression-1-0 >> text=Range cannot be specified in the x or y expressions for a parametric plot').waitFor({state: 'attached', timeout: 1000});

  // fix error and make sure plot is generated
  await page.setLatex(1, String.raw`\left(x,y\right)\:for\:\left(0\le x\le10\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('svg.error').waitFor({state: "detached", timeout: 1000});
  await expect(page.locator('g.trace.scatter')).toBeVisible();
});