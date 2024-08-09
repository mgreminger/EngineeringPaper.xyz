import { test, expect } from '@playwright/test';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));


test('Test keyboard shortcuts', async ({ browserName }) => {

  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // don't use forceCellDelete function here since we need to test deleting the undo cell at least once
  await page.locator('#delete-0').click();
  await page.locator('#delete-0').click(); // delete twice to delete the undo cell

  // add math cell with shift-Enter keyboard shortcut with now no cell selected
  await page.keyboard.press('Shift+Enter');

  // add math cell with shift-Enter with first cell selected 
  await page.keyboard.press('Shift+Enter');

  // add math cell with Enter shortcut from a math cell
  await page.keyboard.press('Enter');

  // select first cell using modifier-Uparrow shortcut
  await page.keyboard.press(modifierKey+"+ArrowUp");
  await page.keyboard.press(modifierKey+"+ArrowUp");
  await page.keyboard.type('x=2');

  await page.keyboard.press(modifierKey+"+ArrowDown");
  await page.keyboard.type('y=3');

  await page.keyboard.press(modifierKey+"+ArrowDown");
  await page.keyboard.type('x*y=');

  await page.waitForSelector('.status-footer', { state: 'detached'});
  let content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);

  // make sure delete undo works
  await page.keyboard.press(modifierKey+"+ArrowUp");
  await page.keyboard.press(modifierKey+"+D");
  await page.locator('text=Undo Delete', {timeout: 1000}).click({force: true});

  await page.waitForSelector('.status-footer', { state: 'detached' });
  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);

  // use control D to delete and let timer count down to delete
  await page.keyboard.press(modifierKey+"+D");
  await page.locator('text=Undo Delete').waitFor({state: "detached"});

  // insert math cell using modifier-Enter
  await page.keyboard.press(modifierKey+"+Enter");
  await page.locator('text=Math Cell').waitFor({timeout: 1000});
  await page.keyboard.press('1');
  
  await page.keyboard.type('y=4');

  await page.waitForSelector('.status-footer', { state: 'detached' });
  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(8, precision);

  // test escape out of insert cell dialog
  await page.keyboard.press(modifierKey+"+Enter");
  await page.locator('text=Math Cell').waitFor({timeout: 1000});
  await page.keyboard.press('Escape');
  await page.locator('text=Math Cell').waitFor({state: "detached", timeout: 1000});

  // test double modifier-D to delete cell
  await page.keyboard.press(modifierKey+"+D");
  await page.keyboard.press(modifierKey+"+D");

  // test add system solve cell with insert cell dialog
  await page.keyboard.press(modifierKey+"+Enter");
  await page.locator('text=Math Cell').waitFor({timeout: 1000});
  await page.keyboard.press('7');

  await page.keyboard.type('8=y');
  await page.locator('#system-parameterlist-2 math-field.editable').type('y');

  await page.waitForSelector('.status-footer', { state: 'detached' });
  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(16, precision);

  // test add documentation cell with insert cell dialog 
  await page.keyboard.press(modifierKey+"+Enter");
  await page.locator('text=Math Cell').waitFor({timeout: 1000});
  await page.keyboard.press('2');

  await page.locator('.ql-toolbar').waitFor({timeout: 1000});

  // test add plot cell with insert cell dialog
  await page.keyboard.press(modifierKey+"+Enter");
  await page.locator('text=Math Cell').waitFor({timeout: 1000});
  await page.keyboard.press('3');

  await page.locator('text=log x').waitFor({timeout: 2000});

  // test add table
  await page.keyboard.press(modifierKey+"+Enter");
  await page.locator('text=Math Cell').waitFor({timeout: 1000});
  await page.keyboard.press('4');

  await page.locator('text=Option 1').waitFor({timeout: 1000});

  // test add piecewise
  await page.keyboard.press(modifierKey+"+Enter");
  await page.locator('text=Math Cell').waitFor({timeout: 1000});
  await page.keyboard.press('6');

  await page.locator('text=otherwise').waitFor({timeout: 1000});

  // delete piecewise and plot with errors 
  await page.keyboard.press(modifierKey+"+D");
  await page.keyboard.press(modifierKey+"+D");
  await page.keyboard.press(modifierKey+"+ArrowUp")
  await page.keyboard.press(modifierKey+"+D");
  await page.keyboard.press(modifierKey+"+D");

  await page.waitForSelector('.status-footer', { state: 'detached' });
  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(16, precision);

});


test('Test math cell undo/redo', async ({ browserName }) => {

  let modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  if (modifierKey === 'Meta' && browserName === 'chromium') {
    // Cmd-z not working with Chromium on Mac, need to use Control-z
    // Cmd-z works correctly on Chrome and Edge on Mac
    modifierKey = "Control";
  }

  const redoShortcut = modifierKey === "Control" ? "Control+y" : "Meta+Shift+z";

  await page.locator('math-field.editable').nth(0).type('x=1000000');
  
  await page.keyboard.press('Shift+Enter');
  await page.locator('math-field.editable').nth(1).type('y=1000');

  await page.keyboard.press('Shift+Enter');
  await page.locator('math-field.editable').nth(2).type('x+y=');

  await page.waitForSelector('.status-footer', { state: 'detached' });
  let content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(1001000, precision);

  await page.locator('math-field.editable').nth(0).press(modifierKey+'+z');

  await page.locator('math-field.editable').nth(1).press(modifierKey+'+z');

  await page.waitForSelector('.status-footer', { state: 'detached'});
  content = await page.textContent('#result-value-2');
  expect(content).toBe('x + y');

  await page.locator('math-field.editable').nth(0).press(redoShortcut);
  await page.locator('math-field.editable').nth(0).press(redoShortcut); // one extra to make sure there isn't a problem with that

  await page.locator('math-field.editable').nth(1).press(redoShortcut);

  await page.waitForSelector('.status-footer', { state: 'detached'});
  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(1001000, precision);

  // make sure undo history is truncated after modification
  await page.locator('math-field.editable').nth(1).press(modifierKey+'+z');
  await page.locator('math-field.editable').nth(1).press(modifierKey+'+z');
  await page.locator('math-field.editable').nth(1).press(modifierKey+'+z');
  await page.locator('math-field.editable').nth(1).type('y=10002');

  await page.waitForSelector('.status-footer', { state: 'detached'});
  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(1010002, precision);

  await page.locator('math-field.editable').nth(1).press(redoShortcut); // shouldn't do anything

  await page.waitForSelector('.status-footer', { state: 'detached'});
  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(1010002, precision);

  // undo everything and redo
  for (let i = 0; i<10; i++) {
    await page.locator('math-field.editable').nth(1).press(modifierKey+'+z');
  }
  for (let i = 0; i<10; i++) {
    await page.locator('math-field.editable').nth(1).press(redoShortcut);
  }

  // result should still be the same
  await page.waitForSelector('.status-footer', { state: 'detached'});
  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(1010002, precision);

});


test('Test esc to undo delete', async ({ browserName }) => {

  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#cell-0 >> math-field.editable').type("x+y=");
  await page.keyboard.press('Enter');
  await page.locator('#cell-1 >> math-field.editable').type("x=1");
  await page.keyboard.press('Enter');
  await page.locator('#cell-2 >> math-field.editable').type("y=2");

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  let content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
  
  // test undo delete using escape when delete triggered using keyboard shortcut
  await page.locator('#cell-1 >> math-field.editable').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeFocused();
  await page.keyboard.press(modifierKey+'+D');
  await expect(page.locator('text=Undo Delete')).toBeVisible();
  await page.keyboard.press('Escape');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

  // test undo delete using escape when delete triggered using button
  await page.locator('#cell-1 >> math-field.editable').click();
  await expect(page.locator('#cell-1 >> math-field.editable')).toBeFocused();
  await page.click('#delete-1');
  await expect(page.locator('text=Undo Delete')).toBeVisible();
  await page.keyboard.press('Escape');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent(`#result-value-0`);
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);

});