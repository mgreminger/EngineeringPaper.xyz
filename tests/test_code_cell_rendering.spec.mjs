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

test('Test drawsvg integration', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack html\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(20\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = String.raw`
import drawsvg as draw

def calculate(radius):
    d = draw.Drawing(120, 120, origin='center')

    square = draw.Rectangle(-50, -50, 100, 100, fill='skyblue', stroke='black')
    d.append(square)

    circle = draw.Circle(0, 0, radius, fill='lightgreen', stroke='black')
    d.append(circle)

    return d.as_svg()
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await expect(page.locator('#cell-0 circle[r="20.0"]')).toBeVisible()

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(10\right)=`);

  await expect(page.locator('#cell-0 circle[r="10.0"]')).toBeVisible()
});

test('Test matplotlib rendering and sklearn autoloading', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{CodeFunc1}\left(\left\lbrack any\right\rbrack\right)=\left\lbrack html\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{CodeFunc1}\left(\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = String.raw`
import matplotlib
import matplotlib.pyplot as plt
from sklearn.datasets import make_checkerboard
from io import BytesIO
import base64

matplotlib.use("AGG")

# Generate checkerboard data
n_clusters = (4, 3)
data, rows, columns = make_checkerboard(
    shape=(300, 300), n_clusters=n_clusters, noise=10, shuffle=False, random_state=42
)

# Create plot
fig, ax = plt.subplots()
cax = ax.matshow(data, cmap=plt.cm.Blues)
plt.title("Original dataset")

# Save plot to PNG in memory
with BytesIO() as buf:
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    
    # Encode to base64
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')

# Create HTML string with embedded image
html = f'<img src="data:image/png;base64,{img_base64}" alt="Plot">'

plt.close(fig)

def calculate():
    return html
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await expect(page.locator('#cell-0 img[alt="Plot"]')).toBeVisible({timeout: 100000})
});

test('Test input unit conversions for render code function', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-code-cell').click();
  await expect(page.locator('#cell-1 math-field.editable')).toBeVisible();
  await page.setLatex(1, String.raw`\mathrm{summary1}\left(\left\lbrack MPa\right\rbrack,\:\left\lbrack MPa\right\rbrack\right)=\left\lbrack text\right\rbrack`);

  await page.setLatex(0, String.raw`\mathrm{summary1}\left(10\cdot10^6\left\lbrack Pa\right\rbrack,\:20\left\lbrack MPa\right\rbrack\right)=`);

  const editor = await page.locator('#cell-1 div.cm-content');
  await editor.evaluate((node) => {
        const code = `
def calculate(value, threshold):
    if value > threshold:
        return f"Fail: Stress of {value} MPa exceeds allowable stress of {threshold} MPa"
    else:
        return f"Pass: Stress of {value} MPa is below allowable stress of {threshold} MPa"
`;
      const view = node.cmView.view;
      view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code }
      });
  });
  
  await page.waitForSelector('.status-footer', {state: 'detached'});

  await expect(page.locator('#cell-0 pre >> text=Pass: Stress of 10.0 MPa is below allowable stress of 20.0 MPa')).toBeVisible();

  // Remove units and make sure error is generated
  await page.setLatex(0, String.raw`\mathrm{summary1}\left(10,\:20\left\lbrack MPa\right\rbrack\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  await expect(page.locator('#cell-0 pre >> text=Dimension Error: Incorrect units for input number 1')).toBeVisible();
});