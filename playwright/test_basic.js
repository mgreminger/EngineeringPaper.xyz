import { chromium, firefox } from 'playwright';
import expect from 'expect';
import { complex, cot, pi, sqrt} from 'mathjs';

const headless = false;

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13; 

[chromium, firefox].forEach(async (currentBrowser) => {

  let args = [];
  if (currentBrowser === chromium) {
    args.push('--disable-web-security');
    args.push('--enable-precise-memory-info');
  }   

  const browser = await currentBrowser.launch({
    headless: headless,
    args: args,
    slowMo: 0
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  const startTime = Date.now();

  // Go to http://localhost:5000/
  await page.goto('http://localhost:5000/');


  // Test basic dimensional analysis and unit conversion
  await page.type(':nth-match(textarea, 1)', 'x=3[inch]');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'y=4[inch]');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'length=\\sqrt x^2');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.type(':nth-match(textarea, 3)', '+y^2');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', 'length=[inch]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  let content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(5, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('inch')

  // test removal of units for query statement to make sure updates happen
  for(let i = 0; i<6; i++) {
    await page.press(':nth-match(textarea, 4)', 'Backspace');
  }
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(0.127, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m^1')

  // delete all cells and test moving cells
  for(let i=0; i<4; i++) {
    await page.click('#delete-0');
  }
  
  if (!headless && currentBrowser === chromium) {
    var initialMemory = await page.evaluate('performance.measureUserAgentSpecificMemory()');
  }

  for (let i=0; i<4; i++) {
    await page.click('#add-math-cell');
  }

  await page.type(':nth-match(textarea, 1)', '1[mm] = [m]' );
  await page.type(':nth-match(textarea, 2)', '2[mm] = [mm]' );
  await page.type(':nth-match(textarea, 3)', '3[mm] = [cm]' );
  await page.type(':nth-match(textarea, 4)', '4[mm] = [dm]' );
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-3');
  expect(content).toBe('dm');

  await page.click('#up-2');
  await page.click('#down-3'); // shouldn't do anything
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0')
  expect(parseFloat(content)).toBeCloseTo(0.001, precision)
  content = await page.textContent('#result-value-1')
  expect(parseFloat(content)).toBeCloseTo(0.3, precision)
  content = await page.textContent('#result-value-2')
  expect(parseFloat(content)).toBeCloseTo(2, precision)
  content = await page.textContent('#result-value-3')
  expect(parseFloat(content)).toBeCloseTo(0.04, precision)

  await page.click('#down-0');
  await page.click('#up-0'); //shouldn't do anything
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0')
  expect(parseFloat(content)).toBeCloseTo(0.3, precision)
  content = await page.textContent('#result-value-1')
  expect(parseFloat(content)).toBeCloseTo(0.001, precision)
  content = await page.textContent('#result-value-2')
  expect(parseFloat(content)).toBeCloseTo(2, precision)
  content = await page.textContent('#result-value-3')
  expect(parseFloat(content)).toBeCloseTo(0.04, precision)

  // test deleting cells at middle, beginning, and end
  await page.click('#delete-1');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0')
  expect(parseFloat(content)).toBeCloseTo(0.3, precision)
  content = await page.textContent('#result-value-1')
  expect(parseFloat(content)).toBeCloseTo(2, precision)
  content = await page.textContent('#result-value-2')
  expect(parseFloat(content)).toBeCloseTo(0.04, precision)

  await page.click('#delete-0');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0')
  expect(parseFloat(content)).toBeCloseTo(2, precision)
  content = await page.textContent('#result-value-1')
  expect(parseFloat(content)).toBeCloseTo(0.04, precision)

  await page.click('#delete-1');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(2, precision);

  await page.click('#delete-0');

  // test exponents
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '2[mm]^2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '+2[mm]^(1+3)^1/2');
  for (let i = 0; i<3; i++) {
    await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  }
  await page.press(':nth-match(textarea, 1)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(8.0e-6, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^2')

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', '2^2');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', '+2^1+3^1/2');
  for (let i = 0; i<3; i++) {
    await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  }
  await page.press(':nth-match(textarea, 2)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(10.643994170967826, precision);

  await page.click("#add-math-cell");
  await page.type(':nth-match(textarea, 3)', '3^3^3');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.press(':nth-match(textarea, 3)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(7625597484987, 13);

  await page.click('#delete-0');
  await page.click('#delete-0');
  await page.click('#delete-0');

  // test order of operations
  await page.click("#add-math-cell");
  await page.type(':nth-match(textarea, 1)', '36^1/2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '/2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '*(1+2)=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(9, precision);

  await page.click('#delete-0');

  // test incompatible units
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '1[meter] + 2[sec]=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-0');
  expect(content).toBe('Dimension Error');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', '/0.010[m]*2[mm]');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', '5[sec]');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', '+/(1[inches]/25.4');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', ')*12[mm]');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', '6[sec]');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.press(':nth-match(textarea, 2)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(6e-6, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m^2*sec^-1');

  await page.type(':nth-match(textarea, 2)', '[mm^2');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', '/sec');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.press(':nth-match(textarea, 2)', ']');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(6, precision);

  await page.press(':nth-match(textarea, 2)', 'ArrowLeft');
  await page.press(':nth-match(textarea, 2)', 'ArrowLeft');
  for(let i=0; i<3; i++){
    await page.press(':nth-match(textarea, 2)', 'Backspace');
  }
  await page.type(':nth-match(textarea, 2)', 'gallon');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-1');
  expect(content).toBe('Units Mismatch');

  await page.click('#delete-0');
  await page.click('#delete-0');

  // duplicate assignment detection
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', 'x=1')
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'x=2');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#error-message');
  expect(content).toBe('Duplicate assignment of variable x');

  await page.click('#delete-0');
  await page.click('#delete-0');

  // circular reference detection
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', 'x=y')
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'y=z')
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'z=x')
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#error-message');
  expect(content).toBe('Circular reference detected');

  for(let i=0; i<3; i++){
    await page.click('#delete-0');
  }

  // correct dimensional analysis for subtraction
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '5[mm]-4[mm]=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');
  await page.click('#delete-0');

  // test topological sorting 
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', 'x=/-b+\\sqrt b^2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '-4*a*c');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '2*a');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'x=[m]');
  // output is tall so button may move if clicked before update is completed
  // this leads to occasional test failures
  await page.waitForSelector('text=Updating...', {state: 'detached'}); 
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'a=1');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', 'b=-5[m]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 5)', 'c=6[m*m]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(3, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m')

  for(let i=0; i<5; i++) {
    await page.click('#delete-0');
  }

  // test pi and Euler's number
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', 'pi=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(3.14159265358979323846264338328, 14);

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'e=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(2.71828182845904523536028747135, 14);

  // The variable name E needs to be remapped internally since E is Euler's number in Sympy
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'E=10');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', 'E=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(10, precision);

  // make sure e, pi, and i cannot be reassigned (should result in syntax error)
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 5)', 'e=20');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 6)', 'pi=30');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 7)', 'i=30');
  expect(await page.$eval(':nth-match(.mq-editable-field, 5)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();
  expect(await page.$eval(':nth-match(.mq-editable-field, 6)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();
  expect(await page.$eval(':nth-match(.mq-editable-field, 7)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();
  
  for (let i=0; i<7; i++) {
    await page.click('#delete-0');
  }
      
  // test logarithmic functions
  // first check that paranthesis are required for functions
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '\\ln 20=');
  expect(await page.$eval(':nth-match(.mq-editable-field, 1)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();
  await page.click('#delete-0');

  // now check natural logarithm
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '\\ln(e^2.1');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', ')=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(2.1, precision);

  // make sure that providing inits to input argument to ln results in dimension error
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', '\\ln(5[inches])=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-1');
  expect(content).toBe('Dimension Error');

  // check base 10 log
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', '\\log(100)=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(2, precision);

  // check log with specified base
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', '\\log_2');
  await page.press(':nth-match(textarea, 4)', 'ArrowRight');
  await page.type(':nth-match(textarea, 4)', '(8)=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(3, precision);

  // make sure log base is unitless
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 5)', '\\log_2[inches]');
  await page.press(':nth-match(textarea, 5)', 'ArrowRight');
  await page.type(':nth-match(textarea, 5)', '(8)=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-4');
  expect(content).toBe('Dimension Error');

  for (let i=0; i<5; i++) {
    await page.click('#delete-0');
  }

  // test trigonometric functions
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '\\cos(1)=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(0.540302305868139717400, precision);

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', '\\sin(30[degrees])=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(0.5, precision);

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', '\\sin(1[radians])=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(0.84147098480789650665, precision);

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', '\\tan(45[degrees])=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(1, precision);

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 5)', '\\arctan(1)*1[radian]=[degrees]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-4');
  expect(parseFloat(content)).toBeCloseTo(45, precision);

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 6)', '\\csc(1[sec])=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-5');
  expect(content).toBe('Dimension Error');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 7)', '\\arcsin(5[meters])=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-6');
  expect(content).toBe('Dimension Error');

  for(let i=0; i<7; i++) {
    await page.click('#delete-0');
  }

  // test scientific notation
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '10e-1[m]+1.E+16*x-1e17[m]=[mm]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'x=1.0e1[m]')
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(1000, precision);

  await page.click('#delete-0');
  await page.click('#delete-0');

  // don't attempt unit conversion on result that is not finite
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '1[m]/0');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '=[inch]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-0');
  expect(content).toBe('Units Mismatch');

  await page.click('#delete-0');

  // test abs
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '|-12[inches]|=[feet]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(1, precision);

  await page.click('#delete-0');

  // test negative exponent for units
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '1[mm^-2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight')
  await page.type(':nth-match(textarea, 1)', ']=[inch^-2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight')
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(645.16, precision);

  await page.click('#delete-0');

  // test units with 1 in the numerator
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '1[mm^-2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight')
  await page.type(':nth-match(textarea, 1)', ']=[inch^-2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight')
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(645.16, precision);

  await page.click('#delete-0');

  // test inverse dimension
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '1[1/sec');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight')
  await page.type(':nth-match(textarea, 1)', ']=')
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-0');
  expect(content).toBe('Hz')

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', '1[1/sec');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', ']=[min^-1');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.press(':nth-match(textarea, 2)', ']');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(60, precision);

  await page.click('#delete-0');
  await page.click('#delete-0');

  // test divide by zero with substitution (related to sympy issue #21076)
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '1[meter]/0[foot]');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.press(':nth-match(textarea, 1)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(content).toBe('\\tilde{\\infty}');

  await page.click('#delete-0');

  // check numerical precision
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '.1+.2-.3=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(content).toBe('0');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'x=.1[m]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'y=.2[m]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', 'z=.3[m]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 5)', 'x+y-z=[m]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-4');
  expect(content).toBe('0');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 6)', 's=.1[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 7)', 't=.2[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 8)', 'u=.3[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 9)', 's+t-u=[inch]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-8');
  expect(content).toBe('0');
  content = await page.textContent('#result-units-8');
  expect(content).toBe('inch');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 10)', 'xx=1[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 11)', 'yy=2[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 12)', 'zz=1e-200[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 13)', 'w-yy=[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 14)', 'w=zz+2*xx');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-12');
  expect(content).toBe('1e-200');

  for(let i=0; i<14; i++){
    await page.click('#delete-0');
  }

  // test unitless result bug when attempting user unit conversion
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', 'x=10[inches]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'y=2');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'x/y');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.type(':nth-match(textarea, 3)', '=[inches]');
  await page.type(':nth-match(textarea, 2)', '[m]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-2');
  expect(content).toBe('Units Mismatch')

  for(let i=0; i<3; i++){
    await page.click('#delete-0');
  }

  // test units in exponents
  await page.click('#add-math-cell');
  await page.setLatex(0, String.raw`10\left[inches\right]^{1\left[\frac{m}{sec}\right]\cdot 2\left[\frac{sec}{m}\right]}=\left[inches^2\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`10\left[inches\right]^{\left(1\left[\frac{m}{sec}\right]\cdot 2\left[\frac{sec}{m}\right]\right)^{2\left[\frac{kelvin}{sec}\right]\cdot 1\left[\frac{sec}{kelvin}\right]}}=\left[inches^4\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`10^{1\left[\frac{m}{sec}\right]\cdot 2\left[\frac{sec}{m}\right]}=`);
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`2^{3\left[sec\right]}=`);
  await page.click('#add-math-cell');
  await page.setLatex(4, String.raw`2^{3^{1\left[m\right]}}=`);
  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`10\left[miles\right]^{.2\left[\frac{cm}{mm}\right]}=\left[miles^2\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(6, String.raw`10\left[miles\right]^{.2\left[\frac{cm}{sec}\right]}=\left[miles^2\right]`);  
  await page.click('#add-math-cell');
  await page.setLatex(7, String.raw`x=10^{1\left[\frac{m}{sec}\right]\cdot 2\left[\frac{sec}{m}\right]}`);  
  await page.click('#add-math-cell');
  await page.setLatex(8, String.raw`x=`);
  await page.click('#add-math-cell');
  await page.setLatex(9, String.raw`y=2^{3^{1\left[m\right]}}`);  
  await page.click('#add-math-cell');
  await page.setLatex(10, String.raw`y=`);
  await page.click('#add-math-cell');
  await page.setLatex(11, String.raw`\left(2^{2\left[\frac{mm}{mm}\right]+2}\right)^{\frac{1\left[mm\right]}{4\left[mm\right]}+\frac{1}{4}}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-units-0');
  expect(content).toBe('inches^2')
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(100, precision);

  content = await page.textContent('#result-units-1');
  expect(content).toBe('inches^4')
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(10000, precision);

  content = await page.textContent('#result-units-2');
  expect(content).toBe('')
  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(100, precision);

  content = await page.textContent('#result-units-3');
  expect(content).toBe('Exponent Not Dimensionless');

  content = await page.textContent('#result-units-4');
  expect(content).toBe('Exponent Not Dimensionless');

  content = await page.textContent('#result-units-5');
  expect(content).toBe('miles^2');
  content = await page.textContent('#result-value-5');
  expect(parseFloat(content)).toBeCloseTo(100, precision);

  content = await page.textContent('#result-units-6');
  expect(content).toBe('Exponent Not Dimensionless');

  content = await page.textContent('#result-units-8');
  expect(content).toBe('')
  content = await page.textContent('#result-value-8');
  expect(parseFloat(content)).toBeCloseTo(100, precision);

  content = await page.textContent('#result-units-10');
  expect(content).toBe('Exponent Not Dimensionless');

  content = await page.textContent('#result-units-11');
  expect(content).toBe('')
  content = await page.textContent('#result-value-11');
  expect(parseFloat(content)).toBeCloseTo(4, precision);

  for (let i=0; i<12; i++) {
    await page.click('#delete-0');
  }

  // make sure that SymPy reserved names get renamed
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', 'Expr=');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'symbols=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe('Expr_{variable}')
  content = await page.textContent('#result-value-1');
  expect(content).toBe('symbols_{variable}')

  await page.click('#delete-0');
  await page.click('#delete-0');

  // test complex numbers
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '2*\\sqrt -1');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '=');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', '3+i^2');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', '=');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', '2+3*i=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = complex(await page.textContent('#result-value-0'));
  expect(content.re).toBeCloseTo(0, precision);
  expect(content.im).toBeCloseTo(2, precision);

  content = complex(await page.textContent('#result-value-1'));
  expect(content.re).toBeCloseTo(2, precision);
  expect(content.im).toBeCloseTo(0, precision);

  content = complex(await page.textContent('#result-value-2'));
  expect(content.re).toBeCloseTo(2, precision);
  expect(content.im).toBeCloseTo(3, precision);

  await page.click('#delete-0');
  await page.click('#delete-0');
  await page.click('#delete-0');

  // test cot, deg conversion with trig functions, and precidence with parens
  await page.click('#add-math-cell');
  await page.setLatex(0, String.raw`N=34`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`P=12.7\left[mm\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`P\cdot \left(\cot \left(\frac{180\left[deg\right]}{N}\right)-1\right)-.762\left[mm\right]=\left[mm\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`P\cdot \left(0.6+\cot \left(\frac{180\left[deg\right]}{N}\right)\right)=\left[mm\right]`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(12.7*(cot(pi/34)-1)-.762, precision-2);
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(12.7*(0.6 + cot(pi/34)), precision-2);

  for (let i=0; i<4; i++) {
    await page.click('#delete-0');
  }

  // test virtual keyboard
  await page.click('#add-math-cell');
  await page.click('#add-math-cell');
  await page.click('button:has-text("√x​")');
  await page.type(':nth-match(textarea,2)', 'x');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', '=');
  await page.type(':nth-match(textarea, 1)', 'x=');
  await page.click('button:has-text("π​")'); // make sure keyboard has jumped to cell with focus
  await page.click('#add-math-cell');
  await page.click('text=Trig');
  await page.click('button:has-text("cot")');
  await page.click('text=Math');
  await page.click('button:has-text("π​")');
  await page.type(':nth-match(textarea, 3)', '/4');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.type(':nth-match(textarea, 3)', '=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(sqrt(pi), precision);
  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(1.0, precision);

  await page.click('#delete-0');
  await page.click('#delete-0');
  await page.click('#delete-0');

  // test equation solving
  await page.click('#add-math-cell');
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

  content = await page.textContent('#result-value-3');
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

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-4');
  content = content.split(',\\').map(parseFloat)
  expect(parseFloat(content[0])).toBeCloseTo(-0.01, precision);
  expect(parseFloat(content[1])).toBeCloseTo(0.01, precision);
  content = await page.textContent('#result-units-4');
  expect(content).toBe('m^1*sec^-1');

  for (let i=0; i<5; i++) {
    await page.click('#delete-0');
  }

  await page.click('#add-math-cell');
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

  content = await page.textContent('#result-value-3');
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

  for (let i=0; i<6; i++) {
    await page.click('#delete-0');
  }

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', 'a*x+b*x+c=0');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'x=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(content).toBe('- \\frac{c}{a + b}')

  await page.click('#delete-0');
  await page.click('#delete-0');

  // test single digit exponent followed by a digit
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '1^2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '2=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  expect(await page.$eval(':nth-match(.mq-editable-field, 1)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();

  await page.click('#delete-0');

  // test negative exponent on number with assigned units
  await page.click('#add-math-cell');
  await page.setLatex(0, String.raw`\frac{1300\left[N\right]\cdot 80\left[mm\right]\cdot 34\left[mm\right]\cdot \frac{1}{2}}{\frac{16\left[mm\right]\cdot 34\left[mm\right]^{3}}{12}}=\left[MPa\right]`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo((1300*80*34*.5)*(12/(16*34**3)), precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('MPa');

  await page.click('#delete-0');

  // test restarting pyodide on a calculation that has caused sympy to hang
  await page.click('#add-math-cell');
  await page.setLatex(0, String.raw`\cos\left(x\right)^{x}\cdot \log\left(x\right)=\cosh\left(x^{x}\right)\cdot \sin\left(x\right)\cdot \sinh\left(x\right)\cdot \tan\left(x\right)`);

  await page.waitForTimeout(2000);
  await page.click('text=Restart Pyodide');

  await page.click('#delete-0');
  await page.click('#add-math-cell');
  // need to choose a calc that hasn't already been cached
  await page.type(':nth-match(textarea, 1)', 'zap=');

  content = await page.textContent('#result-value-0');
  expect(content).toBe('zap')


  console.log(`Elapsed time (${currentBrowser.name()}): ${(Date.now()-startTime)/1000} seconds`);

  // get memory info (only available on chromium)
  if (!headless && currentBrowser === chromium) {
    const finalMemory = await page.evaluate('performance.measureUserAgentSpecificMemory()');
    console.log(`Total memory usage (page + worker using chromium): ${finalMemory.bytes/1024**2} MB`);
    console.log(`Memory growth (chromium): ${(finalMemory.bytes - initialMemory.bytes)/1024**2} MB`)
  }

  // await page.pause();

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
});