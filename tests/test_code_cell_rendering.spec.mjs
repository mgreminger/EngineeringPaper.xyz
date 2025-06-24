import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos, not} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => {await newSheet(page)});

test('Test text rendering without correct output type', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(value):
    return f"Result: {value}"
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await expect(page.locator('text=The code cell function CodeFunc1 returns a string value where a numerical value is expected. Specify an output type of [text], [html], or [markdown] to render string output.')).toBeVisible();
});

test('Test text rendering without correct output type in sympy mode', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack none\right\rbrack`);

  await page.getByLabel('Use SymPy Mode').check();

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(value):
    return f"Result: {value}"
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await expect(page.locator('text=The code cell function CodeFunc1 returns a string value where a numerical value is expected. Specify an output type of [text], [html], or [markdown] to render string output.')).toBeVisible();
});

test('Test text rendering', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack text\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(value):
    return f"Result: {value}"
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await expect(page.locator('pre >> text=Result: 2.0')).toBeVisible();
});

test('Test text rendering sympy mode', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack text\right\rbrack`);

  await page.getByLabel('Use SymPy Mode').check();

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(value):
    return f"Result: {value}"
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await expect(page.locator('pre >> text=Result: 2')).toBeVisible();
  await expect(page.locator('pre >> text=Result: 2.0')).not.toBeVisible();
});

test('Test text rendering with mathjax equation', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack text\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = String.raw`
def calculate(value):
    return rf"Result: $\sqrt{{{value}}}$"
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await expect(page.locator('#cell-0 msqrt >> text=2.0')).toBeVisible();

  // make sure mathjax updates when results change
  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(3\right)=`);

  await expect(page.locator('#cell-0 msqrt >> text=3.0')).toBeVisible();
  await expect(page.locator('#cell-0 msqrt >> text=2.0')).not.toBeVisible();
});

test('Test text rendering with mathjax equation in sympy mode', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack text\right\rbrack`);

  await page.getByLabel('Use SymPy Mode').check();

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = String.raw`
def calculate(value):
    return rf"Result: $\sqrt{{{value}}}$"
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await expect(page.locator('#cell-0 msqrt >> text=2')).toBeVisible();
  await expect(page.locator('#cell-0 msqrt >> text=2.0')).not.toBeVisible();

  // make sure mathjax updates when results change
  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(3\right)=`);

  await expect(page.locator('#cell-0 msqrt >> text=3')).toBeVisible();
  await expect(page.locator('#cell-0 msqrt >> text=3.0')).not.toBeVisible();
  await expect(page.locator('#cell-0 msqrt >> text=2')).not.toBeVisible();
});

test('Test html rendering', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack html\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(value):
    return f'<div class="html-test">{value}</div>'
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await expect(page.locator('#cell-0 div.html-test >> text=2.0')).toBeVisible();
});

test('Test html rendering with mathjax equation', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack html\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = String.raw`
def calculate(value):
    return rf'<div class="html-test">$$\sqrt{{{value}}}$$</div>'
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await expect(page.locator('#cell-0 msqrt >> text=2.0')).toBeVisible();

  // make sure mathjax updates when results change
  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(3\right)=`);

  await expect(page.locator('#cell-0 msqrt >> text=3.0')).toBeVisible();
  await expect(page.locator('#cell-0 msqrt >> text=2.0')).not.toBeVisible();
});

test('Test markdown rendering with mathjax equation', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack markdown\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(2\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = String.raw`
def calculate(value):
    return rf"""
# My Heading
##### My normal text with an inline $\sqrt{{{value}}}$ equation
"""
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await expect(page.locator('#cell-0 h1 >> text=My Heading')).toBeVisible()

  await expect(page.locator('#cell-0 h5 msqrt >> text=2.0')).toBeVisible();

  // make sure mathjax updates when results change
  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(3\right)=`);

  await expect(page.locator('#cell-0 h5 msqrt >> text=3.0')).toBeVisible();
  await expect(page.locator('#cell-0 h5 msqrt >> text=2.0')).not.toBeVisible();
});