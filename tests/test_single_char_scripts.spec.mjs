import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));


test('Test subscript and exponent latex variations', async () => {
    // Latex support a wide variety of syntaxes for subscripts and superscripts.
    // The main challenges are cases that don't require braces and that reverse the 
    // superscript and subscript order.
  
    // all permutations of single char subscripts and superscripts
    await page.setLatex(0, 'x_a^3=');
    await page.locator('#add-math-cell').click()
    await page.setLatex(1, 'x_1^3=');
    await page.locator('#add-math-cell').click()
    await page.setLatex(2, 'x_1^b=');
    await page.locator('#add-math-cell').click()
    await page.setLatex(3, 'x_a^b=');
  
    // same cases with subscripts and superscripts reversed
    await page.locator('#add-math-cell').click()
    await page.setLatex(4, 'x^3_a=');
    await page.locator('#add-math-cell').click()
    await page.setLatex(5, 'x^3_1=');
    await page.locator('#add-math-cell').click()
    await page.setLatex(6, 'x^b_1=');
    await page.locator('#add-math-cell').click()
    await page.setLatex(7, 'x^b_a=');
  
    // reversed subsdcripts and superscripts with brackets for superscript
    await page.locator('#add-math-cell').click()
    await page.setLatex(8, 'x^{3}_a=');
    await page.locator('#add-math-cell').click()
    await page.setLatex(9, 'x^{3}_1=');
    await page.locator('#add-math-cell').click()
    await page.setLatex(10, 'x^{b}_1=');
    await page.locator('#add-math-cell').click()
    await page.setLatex(11, 'x^{b}_a=');
  
    // reversed subsdcripts and superscripts with brackets for subscript
    await page.locator('#add-math-cell').click()
    await page.setLatex(12, 'x^3_{a}=');
    await page.locator('#add-math-cell').click()
    await page.setLatex(13, 'x^3_{1}=');
    await page.locator('#add-math-cell').click()
    await page.setLatex(14, 'x^b_{1}=');
    await page.locator('#add-math-cell').click()
    await page.setLatex(15, 'x^b_{a}=');
  
    // reversed subsdcripts and superscripts with brackets for both sub and superscripts
    await page.locator('#add-math-cell').click()
    await page.setLatex(16, 'x^{3}_{a}=');
    await page.locator('#add-math-cell').click()
    await page.setLatex(17, 'x^{3}_{1}=');
    await page.locator('#add-math-cell').click()
    await page.setLatex(18, 'x^{b}_{1}=');
    await page.locator('#add-math-cell').click()
    await page.setLatex(19, 'x^{b}_{a}=');
  
    // define parameter values last to ensure topological sorting is working
    await page.locator('#add-math-cell').click()
    await page.setLatex(20, 'x_a=2');
    await page.locator('#add-math-cell').click()
    await page.setLatex(21, 'x_1=2');
    await page.locator('#add-math-cell').click()
    await page.setLatex(22, 'b=3');
  
    await page.waitForSelector('.status-footer', { state: 'detached'});
  
    // cells 0-19 should all evaluate to 8
    let content;
    
    for (let cell=0; cell < 20; cell++) { 
      content = await page.textContent(`#result-value-${cell}`);
      expect(parseLatexFloat(content)).toBeCloseTo(8, precision);
    }
  
  });


  test('Test nth derivative single char exponent combos', async () => {
  
    // test detection of msimatched exponents when one is a single char
    await page.setLatex(0, String.raw`\frac{\mathrm{d}^{20}}{\mathrm{d}\left(x\right)^2}\left(x^2\right)=`);
    await page.locator('#cell-0 >> text=Invalid differential symbol combination').waitFor({state: 'attached', timeout: 1000});  

    await page.setLatex(0, String.raw`\frac{\mathrm{d}^20}{\mathrm{d}\left(x\right)^2}\left(x^2\right)=`);
    await page.locator('#cell-0 >> text=Invalid Syntax').waitFor({state: 'attached', timeout: 1000});  

    await page.setLatex(0, String.raw`\frac{\mathrm{d}^2}{\mathrm{d}\left(x\right)^{20}}\left(x^2\right)=`);
    await page.locator('#cell-0 >> text=Invalid differential symbol combination').waitFor({state: 'attached', timeout: 1000});  

    await page.setLatex(0, String.raw`\frac{\mathrm{d}^2}{\mathrm{d}\left(x\right)^20}\left(x^2\right)=`);
    await page.locator('#cell-0 >> text=Invalid Syntax').waitFor({state: 'attached', timeout: 1000});  

    // test valid two digit and one digit variations
    await page.setLatex(0, String.raw`\frac{\mathrm{d}^2}{\mathrm{d}\left(x\right)^2}\left(x^2\right)=`);
    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`\frac{\mathrm{d}^{10}}{\mathrm{d}\left(x\right)^{10}}\left(x^{10}\right)=`);
  
    await page.waitForSelector('.status-footer', { state: 'detached'});
  
    let content = await page.textContent('#result-value-0');
    expect(parseLatexFloat(content)).toBeCloseTo(2, precision);

    content = await page.textContent('#result-value-1');
    expect(parseLatexFloat(content)).toBeCloseTo(3628800, precision);
  
  });


  test('Test definite integrals with single char limits', async () => {
  
    // Test that double integers for upper limit without braces triggers syntax error
    await page.setLatex(0, String.raw`\int_0^11\left(x\right)\mathrm{d}\left(x\right)=`);
    await page.locator('#cell-0 >> text=Invalid Syntax').waitFor({state: 'attached', timeout: 1000});  

    // test single and double char upper bounds for both numbers and ids
    await page.setLatex(0, String.raw`\int_0^1\left(x\right)\mathrm{d}\left(x\right)=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`\int_a^b\left(x\right)\mathrm{d}\left(x\right)=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(2, String.raw`\int_{0.0}^{1.0}\left(x\right)\mathrm{d}\left(x\right)=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(3, String.raw`\int_{aa}^{bb}\left(x\right)\mathrm{d}\left(x\right)=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(4, String.raw`\int_{}^{}\left(1\right)\mathrm{d}\left(x\right)=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(5, 'a=0');

    await page.locator('#add-math-cell').click();
    await page.setLatex(6, 'b=1');

    await page.locator('#add-math-cell').click();
    await page.setLatex(7, 'aa=0');

    await page.locator('#add-math-cell').click();
    await page.setLatex(8, 'bb=1');

    await page.waitForSelector('.status-footer', { state: 'detached'});

    // cells 0-3 should all evaluate to .5
    let content;
    
    for (let cell=0; cell < 4; cell++) { 
      content = await page.textContent(`#result-value-${cell}`);
      expect(parseLatexFloat(content)).toBeCloseTo(0.5, precision);
    }

    // cell 4 should be 'x'
    content = await page.textContent('#result-value-4');
    expect(content).toBe('x');
  
  });


  test('Test logarithms with single char bases', async () => {
  
    // Test that double integers for base without braces triggers syntax error
    await page.setLatex(0, String.raw`\log_22(8)=`);
    await page.locator('#cell-0 >> text=Invalid Syntax').waitFor({state: 'attached', timeout: 1000});  

    // test single and double char base for both numbers and ids
    await page.setLatex(0, String.raw`\log_2(8)=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(1, String.raw`\log_{20}(8000)=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(2, String.raw`\log_a(8)=`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(3, String.raw`$$ \log_{aa}(8)= $$`);

    await page.locator('#add-math-cell').click();
    await page.setLatex(4, 'a=2');

    await page.locator('#add-math-cell').click();
    await page.setLatex(5, 'aa=2');

    await page.waitForSelector('.status-footer', { state: 'detached'});

    // cells 0-3 should all evaluate to 3
    let content;
    
    for (let cell=0; cell < 4; cell++) { 
      content = await page.textContent(`#result-value-${cell}`);
      expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
    }
  
  });