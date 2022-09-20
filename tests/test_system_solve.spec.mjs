import { test, expect } from '@playwright/test';
import { complex, cot, pi, sqrt, tan, cos} from 'mathjs';

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13; 

test.skip('*Test equation solving', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  // test equation solving
  await page.type(':nth-match(textarea, 1)', '(x-2[meters])*(x-4[meters])=0');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'y-z=0');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'z=10[meters]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', 'x=');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 5)', 'y=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-3');
  content = content.split(',\\').map(parseFloat)
  expect(content[0]).toBeCloseTo(2.0, precision);
  expect(content[1]).toBeCloseTo(4.0, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m');
  content = await page.textContent('#result-value-4');
  expect(parseFloat(content)).toBeCloseTo(10.0, precision);
  content = await page.textContent('#result-units-4');
  expect(content).toBe('m');

  for (let i=0; i<5; i++) {
    await page.click('#delete-0');
  }

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '8*g+7*o+3*l=3*o+6*g+6*l');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'g=2*l/3');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', '12*o=3[kg]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', 'l=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(0.6, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('kg');

  for (let i=0; i<4; i++) {
    await page.click('#delete-0');
  }

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', 'k=1[N/m');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', ']');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'm=1[kg]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'x=10[mm]');
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`\frac{1}{2}\cdot k\cdot x^2=\frac{1}{2}\cdot m\cdot v^2`);
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 5)', 'v=');
  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`v=\left[\frac{miles}{hour}\right]`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-4');
  content = content.split(',\\').map(parseFloat)
  expect(parseFloat(content[0])).toBeCloseTo(-0.01, precision);
  expect(parseFloat(content[1])).toBeCloseTo(0.01, precision);
  content = await page.textContent('#result-units-4');
  expect(content).toBe('m^1*sec^-1');

  content = await page.textContent('#result-value-5');
  content = content.split(',\\').map(parseFloat)
  expect(parseFloat(content[0])).toBeCloseTo(-0.022369362920544027, precision);
  expect(parseFloat(content[1])).toBeCloseTo(0.022369362920544027, precision);
  content = await page.textContent('#result-units-5');
  expect(content).toBe('(miles)/(hour)');
});


test.skip('*test underdetermined system that has exact numerical solution', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  await page.goto('/');
  
  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  await page.setLatex(0, String.raw`g=9.81\left[\frac{m}{sec^{2}}\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`h=10\left[ft\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`m\cdot g\cdot h=\frac{1}{2}\cdot m\cdot v^{2}`);
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`v=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-3');
  content = content.split(',\\').map(parseFloat)
  expect(parseFloat(content[0])).toBeCloseTo(-sqrt(2*9.81*10*12*25.4/1000), precision);
  expect(parseFloat(content[1])).toBeCloseTo(sqrt(2*9.81*10*12*25.4/1000), precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m^1*sec^-1');

  // update previous example to use assignment instead of equality
  await page.setLatex(2, String.raw`h=\frac{1}{2\cdot g}\cdot v^{2}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-3');
  content = content.split(',\\').map(parseFloat)
  expect(parseFloat(content[0])).toBeCloseTo(-sqrt(2*9.81*10*12*25.4/1000), precision);
  expect(parseFloat(content[1])).toBeCloseTo(sqrt(2*9.81*10*12*25.4/1000), precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m^1*sec^-1');

  // update previous example to use assignment with m on both sides
  await page.setLatex(2, String.raw`m=\frac{1}{2\cdot g\cdot h}\cdot m\cdot v^{2}`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-3');
  content = content.split(',\\').map(parseFloat)
  expect(parseFloat(content[0])).toBeCloseTo(-sqrt(2*9.81*10*12*25.4/1000), precision);
  expect(parseFloat(content[1])).toBeCloseTo(sqrt(2*9.81*10*12*25.4/1000), precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m^1*sec^-1');

});


test.skip('*Test solving system of 3 equations', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  await page.type(':nth-match(textarea, 1)', 'x+y=3');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'y=z-4');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'z=x^2');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.type(':nth-match(textarea, 3)', '-3');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', 'x=');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 5)', 'y=');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 6)', 'z=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-3');
  content = content.split(',\\').map(parseFloat)
  expect(parseFloat(content[0])).toBeCloseTo(-1/2 + sqrt(41)/2, precision);
  expect(parseFloat(content[1])).toBeCloseTo(-sqrt(41)/2 - 1/2, precision);

  content = await page.textContent('#result-value-4');
  content = content.split(',\\').map(parseFloat)
  expect(parseFloat(content[0])).toBeCloseTo(7/2 - sqrt(41)/2, precision);
  expect(parseFloat(content[1])).toBeCloseTo(sqrt(41)/2 + 7/2, precision);

  content = await page.textContent('#result-value-5');
  content = content.split(',\\').map(parseFloat)
  expect(parseFloat(content[0])).toBeCloseTo(15/2 - sqrt(41)/2, precision);
  expect(parseFloat(content[1])).toBeCloseTo(sqrt(41)/2 + 15/2, precision);
});


test.skip('*test multiple solutions where only the first is finite', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  await page.setLatex(0, String.raw`m\cdot g\cdot h=\frac{1}{2}\cdot m\cdot v^{2}`);
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'm=[kg]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'v=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-units-1');
  expect(content).toBe('Units Mismatch');
});

test.skip('*Test function notation with equation solving and combined function/assignment and expression as argument for function', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  await page.setLatex(0, String.raw`x=s+t`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`t=25.4\left[mm\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`x\left(s=1\left[inch\right]\right)=\left[inch\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`x\left(s=1\right)=`);
  await page.click('#add-math-cell');
  await page.setLatex(4, String.raw`\frac{1}{2}\cdot m\cdot v^{2}=m\cdot g\cdot h`);
  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`v=`);
  await page.click('#add-math-cell');
  await page.setLatex(6, String.raw`v\left(g=9.81\left[\frac{m}{sec^{2}}\right],h=2\cdot hh\right)=`);
  await page.click('#add-math-cell');
  await page.setLatex(7, String.raw`hh=1.5\left[mm\right]`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('inch');
  content = await page.textContent('#result-units-3');
  expect(content).toBe('Dimension Error');
  content = await page.textContent('#result-value-6');
  content = content.split(',\\').map(parseFloat)
  expect(content[0]).toBeCloseTo(-sqrt(2*9.81*.003), precision);
  expect(content[1]).toBeCloseTo(sqrt(2*9.81*.003), precision);
  content = await page.textContent('#result-units-6');
  expect(content).toBe('m^1*sec^-1');

});


test.skip("*test to prevent function solve bug regression, equation solving was triggered when it shouldn't have been", async ({ page }) => {

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  await page.setLatex(0, String.raw`volume\ =\ h\cdot area`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`area=l\cdot w`);
  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`y=-\frac{g\cdot \sec\left(theta\right)^{2}}{2\cdot InitialVelocity^{2}}\cdot x^{2}+x\cdot \tan\left(theta\right)`);
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`g=9.81\left[\frac{m}{sec^{2}}\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(4, String.raw`y\left(theta=45\left[degrees\right],\ InitialVelocity=1200\left[\frac{ft}{sec}\right],\ x=100\left[yards\right]\right)=\left[feet\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`area=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-4');
  expect(parseFloat(content)).toBeCloseTo((-(9.81*(100/1.09361)**2)/(cos(45*pi/180)**2*2*(1200/3.28084)**2)+ (100/1.09361)*tan(45*(45*pi/180)))*3.28084, 2);
  content = await page.textContent('#result-value-5');
  expect(content).toBe('l w');

});


test.skip('*Test for equation solving bug', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  await page.setLatex(0, String.raw`R_{A}+R_{B}-q\cdot l=0`);

  await page.click("#add-math-cell");
  await page.setLatex(1, String.raw`M_{A}+R_{B}\cdot l-q\cdot l\cdot \frac{l}{2}=0`);

  await page.click("#add-math-cell");
  await page.setLatex(2, String.raw`\delta _{q}=-\frac{q\cdot l^{4}}{8\cdot E\cdot I}`);

  await page.click("#add-math-cell");
  await page.setLatex(3, String.raw`\delta _{Rb}=\frac{R_{B}\cdot l^{3}}{3\cdot E\cdot I}`);

  await page.click("#add-math-cell");
  await page.setLatex(4, String.raw`\delta _{q}+\delta _{Rb}=0`);

  await page.click("#add-math-cell");
  await page.setLatex(5, String.raw`M_{A}=`);

  await page.click("#add-math-cell");
  await page.setLatex(6, String.raw`R_{A}=`);

  await page.click("#add-math-cell");
  await page.setLatex(7, String.raw`R_{B}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached', timeout: 80000});
  
  // check Rb
  let content = await page.textContent('#result-value-7');
  expect(content).toBe('0.375 l q');

  // delete third to last and second to last cells to make correct solution is still obtained
  await page.click('#delete-5');
  await page.click('#delete-5');

  await page.waitForSelector('text=Updating...', {state: 'detached', timeout: 200000});

  // check Rb (should still be the same with no error)
  content = await page.textContent('#result-value-5');
  expect(content).toBe('0.375 l q');

  // add function query to prevent regression
  await page.click("#add-math-cell");
  await page.setLatex(6, String.raw`R_{B}\left(q=10\left[\frac{N}{m}\right],\ l=1\left[m\right]\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached', timeout: 200000});

  content = await page.textContent('#result-value-6');
  expect(parseFloat(content)).toBeCloseTo(3.75, precision);
  content = await page.textContent('#result-units-6');
  expect(content).toBe('N');

  // delete Rb query to make sure the function query doesn't depend on this
  await page.click('#delete-5');

  await page.waitForSelector('text=Updating...', {state: 'detached', timeout: 200000});

  content = await page.textContent('#result-value-5');
  expect(parseFloat(content)).toBeCloseTo(3.75, precision);
  content = await page.textContent('#result-units-5');
  expect(content).toBe('N');

});


test.skip('*Test restarting pyodide on a calculation that has caused sympy to hang', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  await page.setLatex(0, String.raw`\cos\left(x\right)^{x}\cdot \log\left(x\right)=\cosh\left(x^{x}\right)\cdot \sin\left(x\right)\cdot \sinh\left(x\right)\cdot \tan\left(x\right)`);

  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`x=`);

  await page.waitForTimeout(2000);
  await page.click('text=Restart Pyodide');

  await page.click('#delete-0');
  await page.click('#delete-0');
  await page.click('#add-math-cell');
  // need to choose a calc that hasn't already been cached
  await page.type(':nth-match(textarea, 1)', 'zap=');
  await page.waitForSelector('text=Updating...', {state: 'detached', timeout: 200000});
  let content = await page.textContent('#result-value-0', {timeout: 50000});
  expect(content).toBe('zap')

  // make sure syntax error is still detected after initial parse
  await page.click('#delete-0');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', 'x+y=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.setLatex(0, String.raw`x+y^{ }=`);
  expect(await page.$eval(':nth-match(.mq-editable-field, 1)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();

});


