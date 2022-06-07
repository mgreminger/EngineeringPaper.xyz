import { test, expect } from '@playwright/test';

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13; 

test('Test table types in math cells', async ({ page }) => {

  await page.goto('/');

  await page.locator('div.bx--modal-container').waitFor();
  await page.keyboard.press('Escape');
  await page.locator('#new-sheet').click();

  // Only number in math cell should generate a syntax error
  await page.locator('textarea').nth(0).type('3');
  await page.locator('#add-math-cell').click();
  await page.locator('textarea').nth(1).type('1.0');
  let content = await page.locator('.bx--tooltip__trigger span').nth(0).textContent();
  expect(content).toBe('This field must contain an assignment, query, or equality statement type.');
  content = await page.locator('.bx--tooltip__trigger span').nth(1).textContent();
  expect(content).toBe('This field must contain an assignment, query, or equality statement type.');

  // Only units in math cell should generate a syntax error
  await page.locator('#add-math-cell').click();
  await page.locator('textarea').nth(2).type('[inches]');
  content = await page.locator('.bx--tooltip__trigger span').nth(2).textContent();
  expect(content).toBe('This field must contain an assignment, query, or equality statement type.');

  // Only parameter in a math cell should generate a syntax error
  await page.locator('#add-math-cell').click();
  await page.locator('textarea').nth(3).type('a');
  await page.locator('#add-math-cell').click();
  await page.locator('textarea').nth(4).type('aa');
  await page.locator('#add-math-cell').click();
  await page.locator('textarea').nth(5).type('a_b');
  content = await page.locator('.bx--tooltip__trigger span').nth(3).textContent();
  expect(content).toBe('This field must contain an assignment, query, or equality statement type.');
  content = await page.locator('.bx--tooltip__trigger span').nth(4).textContent();
  expect(content).toBe('This field must contain an assignment, query, or equality statement type.');
  content = await page.locator('.bx--tooltip__trigger span').nth(5).textContent();
  expect(content).toBe('This field must contain an assignment, query, or equality statement type.');

});


test('Test parameter name error messages', async ({ page, browserName }) => {
  test.skip(browserName === "webkit", "Webkit not working with attribute selector.");

  await page.goto('/');

  await page.locator('div.bx--modal-container').waitFor();
  await page.keyboard.press('Escape');
  await page.locator('#new-sheet').click();
  await page.click('#delete-0');

  await page.locator('#add-table-cell').click();
  await page.locator('#add-col-0').click();

  await page.locator('#parameter-name-0-0 .mq-editable-field').dblclick();
  await page.locator('#parameter-name-0-0 textarea').type('1');
  let content = await page.locator('#parameter-name-0-0 span[slot="tooltipText"]').textContent();
  expect(content).toBe('A variable name is required in this field.');

  await page.locator('#parameter-name-0-0 .mq-editable-field').dblclick();
  await page.locator('#parameter-name-0-0 textarea').type('a');

  await page.locator('#parameter-name-0-1 .mq-editable-field').dblclick();
  await page.locator('#parameter-name-0-1 textarea').type('a=b');
  content = await page.locator('#parameter-name-0-1 span[slot="tooltipText"]').textContent();
  expect(content).toBe('A variable name is required in this field.');

  await page.locator('#parameter-name-0-1 .mq-editable-field').dblclick();
  await page.locator('#parameter-name-0-1 textarea').type('b');

  await page.locator('#parameter-name-0-2 .mq-editable-field').dblclick();
  await page.locator('#parameter-name-0-2 textarea').type('a=');
  content = await page.locator('#parameter-name-0-2 span[slot="tooltipText"]').textContent();
  expect(content).toBe('A variable name is required in this field.');

});


test('Test parameter units error messages', async ({ page, browserName }) => {

  test.skip(browserName === "webkit", "Webkit not working with attribute selector.");

  await page.goto('/');

  await page.locator('div.bx--modal-container').waitFor();
  await page.keyboard.press('Escape');
  await page.locator('#new-sheet').click();
  await page.click('#delete-0');

  await page.locator('#add-table-cell').click();
  await page.locator('#add-col-0').click();

  await page.locator('#parameter-units-0-0 textarea').type('1');
  let content = await page.locator('#parameter-units-0-0 span[slot="tooltipText"]').textContent();
  expect(content).toBe('This field may only contain units in square brackets or may be left blank to indicate no units.');

  await page.locator('#parameter-units-0-0 .mq-editable-field').dblclick();
  await page.locator('#parameter-units-0-0 textarea').type('[m]');

  await page.locator('#parameter-units-0-1 .mq-editable-field').dblclick();
  await page.locator('#parameter-units-0-1 textarea').type('a=b');
  content = await page.locator('#parameter-units-0-1 span[slot="tooltipText"]').textContent();
  expect(content).toBe('This field may only contain units in square brackets or may be left blank to indicate no units.');

  await page.locator('#parameter-units-0-1 .mq-editable-field').dblclick();
  await page.locator('#parameter-units-0-1 textarea').type('b');

  await page.locator('#parameter-units-0-2 .mq-editable-field').dblclick();
  await page.locator('#parameter-units-0-2 textarea').type('a=');
  content = await page.locator('#parameter-units-0-2 span[slot="tooltipText"]').textContent();
  expect(content).toBe('This field may only contain units in square brackets or may be left blank to indicate no units.');
  
});


test('Test table cell error messages', async ({ page, browserName }) => {

  test.skip(browserName === "webkit", "Webkit not working with attribute selector.");

  await page.goto('/');

  await page.locator('div.bx--modal-container').waitFor();
  await page.keyboard.press('Escape');
  await page.locator('#new-sheet').click();
  await page.click('#delete-0');

  await page.locator('#add-table-cell').click();
  await page.locator('#add-col-0').click();

  await page.locator('#parameter-units-0-0 textarea').type('[in]');
  await page.locator('#parameter-units-0-1 textarea').type('[m]');

  await page.locator('#grid-cell-0-0-0 textarea').type('a');
  await page.locator('#grid-cell-0-0-1 textarea').type('b=c');
  await page.locator('#grid-cell-0-0-2 textarea').type('c=');

  await page.locator('#grid-cell-0-1-0 textarea').type('1[in]');
  await page.locator('#grid-cell-0-1-1 textarea').type('2');
  await page.locator('#grid-cell-0-1-2 textarea').type('[in]');


  let content = await page.locator('#grid-cell-0-0-0 span[slot="tooltipText"]').textContent();
  expect(content).toBe('This field may only contain a number since units are specified for this column.');

  content = await page.locator('#grid-cell-0-0-1 span[slot="tooltipText"]').textContent();
  expect(content).toBe('This field may only contain a number since units are specified for this column.');

  content = await page.locator('#grid-cell-0-0-2 span[slot="tooltipText"]').textContent();
  expect(content).toBe('This field may only contain a valid expression or number without an equals sign.');


  content = await page.locator('#grid-cell-0-1-0 span[slot="tooltipText"]').textContent();
  expect(content).toBe('This field may only contain a number since units are specified for this column.');

  await expect(() => page.locator('#grid-cell-0-1-1 span[slot="tooltipText"]').textContent({timeout: 10}))
         .rejects.toThrow('Timeout');

  content = await page.locator('#grid-cell-0-1-2 span[slot="tooltipText"]').textContent();
  expect(content).toBe('This field may only contain a valid expression or number without an equals sign.');


  await page.locator('#parameter-units-0-0 .mq-editable-field').dblclick();
  await page.locator('#parameter-units-0-0 textarea').type(' ');

  await expect(() => page.locator('#grid-cell-0-0-0 span[slot="tooltipText"]').textContent({timeout: 10}))
          .rejects.toThrow('Timeout');
  await expect(() => page.locator('#grid-cell-0-1-0 span[slot="tooltipText"]').textContent({timeout: 10}))
         .rejects.toThrow('Timeout');
  
  await page.locator('#grid-cell-0-0-1 .mq-editable-field').dblclick();
  await page.locator('#grid-cell-0-0-1 textarea').type(' ');
  await expect(() => page.locator('#grid-cell-0-0-1 span[slot="tooltipText"]').textContent({timeout: 10}))
          .rejects.toThrow('Timeout');

});