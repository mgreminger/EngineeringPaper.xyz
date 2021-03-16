import { chromium, firefox } from 'playwright';
import expect from 'expect';

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13; 

[chromium, firefox].forEach(async (currentBrowser) => {
  const browser = await currentBrowser.launch({
    headless: true,
    slowMo: 0
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  page.pressMultiple = async function(selector, keys) {
    for(let i = 0; i < keys.length; i++){
      await this.press(selector, keys[i]);
    }
  }

  // Go to http://localhost:5000/
  await page.goto('http://localhost:5000/');

  // Check input[type="checkbox"]
  await page.check('#debug');

  // Test basic dimensional analysis and unit conversion
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', 'x=3[inch]');

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 2)', 'y=4[inch]');

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 3)', 'length=sqrtx^2');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 3)', '+y^2');

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 4)', 'length=[inch]');
  let content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(5, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('inch')

  // test removal of units for query statement to make sure updates happen
  for(let i = 0; i<6; i++) {
    await page.press(':nth-match(textarea, 4)', 'Backspace');
  }
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(0.127, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m')

  // delete all cells and test moving cells
  for(let i=0; i<4; i++) {
    await page.click('#delete-0');
  }
  
  for (let i=0; i<4; i++) {
    await page.click('#add-cell');
  }

  await page.pressMultiple(':nth-match(textarea, 1)', '1[mm] = [m]' );
  await page.pressMultiple(':nth-match(textarea, 2)', '2[mm] = [mm]' );
  await page.pressMultiple(':nth-match(textarea, 3)', '3[mm] = [cm]' );
  await page.pressMultiple(':nth-match(textarea, 4)', '4[mm] = [dm]' );

  content = await page.textContent('#result-units-3');
  expect(content).toBe('dm');

  await page.click('#up-2');
  await page.click('#down-3'); // shouldn't do anything
  await page.waitForTimeout(100);
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
  await page.waitForTimeout(100);
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
  await page.waitForTimeout(100);
  content = await page.textContent('#result-value-0')
  expect(parseFloat(content)).toBeCloseTo(0.3, precision)
  content = await page.textContent('#result-value-1')
  expect(parseFloat(content)).toBeCloseTo(2, precision)
  content = await page.textContent('#result-value-2')
  expect(parseFloat(content)).toBeCloseTo(0.04, precision)

  await page.click('#delete-0');
  content = await page.textContent('#result-value-0')
  expect(parseFloat(content)).toBeCloseTo(2, precision)
  content = await page.textContent('#result-value-1')
  expect(parseFloat(content)).toBeCloseTo(0.04, precision)

  await page.click('#delete-1');
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(2, precision);

  await page.click('#delete-0');

  // test exponents
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', '2[mm]^2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 1)', '+2[mm]^(1+3)^1/2');
  for (let i = 0; i<3; i++) {
    await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  }
  await page.press(':nth-match(textarea, 1)', '=');
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(8.0e-6, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^2')

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 2)', '2^2');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 2)', '+2^1+3^1/2');
  for (let i = 0; i<3; i++) {
    await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  }
  await page.press(':nth-match(textarea, 2)', '=');
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(10.643994170967826, precision);

  await page.click("#add-cell");
  await page.pressMultiple(':nth-match(textarea, 3)', '3^3^3');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.press(':nth-match(textarea, 3)', '=');
  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(7625597484987, 13);

  await page.click('#delete-0');
  await page.click('#delete-0');
  await page.click('#delete-0');

  // test incompatible units
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', '1[meter] + 2[sec]=');
  content = await page.textContent('#result-units-0');
  expect(content).toBe('Dimension Error');

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 2)', '/0.010[m]*2[mm]');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 2)', '5[sec]');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 2)', '+/(1[inches]/25.4');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 2)', ')*12[mm]');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 2)', '6[sec]');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.press(':nth-match(textarea, 2)', '=');
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(6e-6, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m^2*sec^-1');

  await page.pressMultiple(':nth-match(textarea, 2)', '[mm^2');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 2)', '/sec');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.press(':nth-match(textarea, 2)', ']');
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(6, precision);

  await page.press(':nth-match(textarea, 2)', 'ArrowLeft');
  await page.press(':nth-match(textarea, 2)', 'ArrowLeft');
  for(let i=0; i<3; i++){
    await page.press(':nth-match(textarea, 2)', 'Backspace');
  }
  await page.pressMultiple(':nth-match(textarea, 2)', 'gallon');
  content = await page.textContent('#result-units-1');
  expect(content).toBe('Units Mismatch');

  await page.click('#delete-0');
  await page.click('#delete-0');

  // duplicate assignment detection
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', 'x=1')
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 2)', 'x=2')
  content = await page.textContent('#error-message');
  expect(content).toBe('Duplicate assignment of variable x');

  await page.click('#delete-0');
  await page.click('#delete-0');

  // circular reference detection
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', 'x=y')
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 2)', 'y=z')
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 3)', 'z=x')

  content = await page.textContent('#error-message');
  expect(content).toBe('Circular reference detected');

  for(let i=0; i<3; i++){
    await page.click('#delete-0');
  }

  // correct dimensional analysis for subtraction
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', '5[mm]-4[mm]=');
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');
  await page.click('#delete-0');

  // test topological sorting 
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', 'x=/-b+sqrtb^2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 1)', '-4*a*c');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 1)', '2*a');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 2)', 'x=[m]');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 3)', 'a=1');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 4)', 'b=-5[m]');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 5)', 'c=6[m*m]');
  await page.waitForTimeout(100);
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(3, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m')

  for(let i=0; i<5; i++) {
    await page.click('#delete-0');
  }

  // test pi and Euler's number
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', 'pi=');
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(3.14159265358979323846264338328, 14);

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 2)', 'e=');
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(2.71828182845904523536028747135, 14);

  // The variable name E needs to be remapped internally since E is Euler's number in Sympy
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 3)', 'E=10');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 4)', 'E=');
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(10, precision);

  // make sure e and pi cannot be reassigned (should result in syntax error)
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 5)', 'e=20');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 6)', 'pi=30');
  expect(await page.$eval(':nth-match(.mq-editable-field, 5)',
         el => el.classList.contains("parsingError"))).toBeTruthy();
  expect(await page.$eval(':nth-match(.mq-editable-field, 6)',
         el => el.classList.contains("parsingError"))).toBeTruthy();
  
  for (let i=0; i<6; i++) {
    await page.click('#delete-0');
  }
      
  // test logarithmic functions
  // first check that paranthesis are required for functions
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', 'ln20=');
  expect(await page.$eval(':nth-match(.mq-editable-field, 1)',
         el => el.classList.contains("parsingError"))).toBeTruthy();
  await page.click('#delete-0');

  // now check natural logarithm
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', 'ln(e^2.1');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 1)', ')=');
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(2.1, precision);

  // make sure that providing inits to input argument to ln results in dimension error
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 2)', 'ln(5[inches])=');
  content = await page.textContent('#result-units-1');
  expect(content).toBe('Dimension Error');

  // check base 10 log
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 3)', 'log(100)=');
  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(2, precision);

  // check log with specified base
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 4)', 'log_2');
  await page.press(':nth-match(textarea, 4)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 4)', '(8)=');
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(3, precision);

  // make sure log base is unitless
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 5)', 'log_2[inches]');
  await page.press(':nth-match(textarea, 5)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 5)', '(8)=');
  content = await page.textContent('#result-units-4');
  expect(content).toBe('Dimension Error');

  for (let i=0; i<5; i++) {
    await page.click('#delete-0');
  }

  // test trigonometric functions
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', 'cos(1)=');
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(0.540302305868139717400, precision);

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 2)', 'sin(30[degrees])=');
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(0.5, precision);

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 3)', 'sin(1[radians])=');
  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(0.84147098480789650665, precision);

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 4)', 'tan(45[degrees])=');
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(1, precision);

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 5)', 'arctan(1)*1[radian]=[degrees]');
  content = await page.textContent('#result-value-4');
  expect(parseFloat(content)).toBeCloseTo(45, precision);

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 6)', 'csc(1[sec])=');
  content = await page.textContent('#result-units-5');
  expect(content).toBe('Dimension Error');

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 7)', 'arcsin(5[meters])=');
  content = await page.textContent('#result-units-6');
  expect(content).toBe('Dimension Error');

  for(let i=0; i<7; i++) {
    await page.click('#delete-0');
  }

  // test scientific notation
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', '10e-1[m]+1.E+16*x-1e17[m]=[mm]');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 2)', 'x=1.0e1[m]')
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(1000, precision);

  await page.click('#delete-0');
  await page.click('#delete-0');

  // don't attempt unit conversion on result that is not finite
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', '1[m]/0');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 1)', '=[inch]');
  content = await page.textContent('#result-units-0');
  expect(content).toBe('Units Mismatch');

  await page.click('#delete-0');

  // test abs
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', '|-12[inches]|=[feet]');
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(1, precision);

  await page.click('#delete-0');

  // test negative exponent for units
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', '1[mm^-2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight')
  await page.pressMultiple(':nth-match(textarea, 1)', ']=[inch^-2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight')
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(645.16, precision);

  await page.click('#delete-0');

  // test units with 1 in the numerator
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', '1[mm^-2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight')
  await page.pressMultiple(':nth-match(textarea, 1)', ']=[inch^-2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight')
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(645.16, precision);

  await page.click('#delete-0');

  // test complex numbers
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', '1[1/sec');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight')
  await page.pressMultiple(':nth-match(textarea, 1)', ']=')
  content = await page.textContent('#result-units-0');
  expect(content).toBe('Hz')

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 2)', '1[1/sec');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 2)', ']=[min^-1');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.press(':nth-match(textarea, 2)', ']');
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(60, precision);

  await page.click('#delete-0');
  await page.click('#delete-0');

  // test divide by zero with substitution (related to sympy issue #21076)
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', '1[meter]/0[foot]');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.press(':nth-match(textarea, 1)', '=');
  content = await page.textContent('#result-value-0');
  expect(content).toBe('\\tilde{\\infty}');

  await page.click('#delete-0');

  // check numerical precision
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', '.1+.2-.3=');
  content = await page.textContent('#result-value-0');
  expect(content).toBe('0');

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 2)', 'x=.1[m]');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 3)', 'y=.2[m]');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 4)', 'z=.3[m]');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 5)', 'x+y-z=[m]');
  content = await page.textContent('#result-value-4');
  expect(content).toBe('0');

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 6)', 's=.1[inch]');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 7)', 't=.2[inch]');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 8)', 'u=.3[inch]');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 9)', 's+t-u=[inch]');
  content = await page.textContent('#result-value-8');
  expect(content).toBe('0');
  content = await page.textContent('#result-units-8');
  expect(content).toBe('inch');

  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 10)', 'xx=1[inch]');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 11)', 'yy=2[inch]');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 12)', 'zz=1e-200[inch]');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 13)', 'w-yy=[inch]');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 14)', 'w=zz+2*xx');
  await page.waitForTimeout(1000);
  content = await page.textContent('#result-value-12');
  expect(content).toBe('1e-200');

  for(let i=0; i<14; i++){
    await page.click('#delete-0');
  }

  // test unitless result bug when attempting user unit conversion
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 1)', 'x=10[inches]');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 2)', 'y=2');
  await page.click('#add-cell');
  await page.pressMultiple(':nth-match(textarea, 3)', 'x/y');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.pressMultiple(':nth-match(textarea, 3)', '=[inches]');
  await page.pressMultiple(':nth-match(textarea, 2)', '[m]');
  content = await page.textContent('#result-units-2');
  expect(content).toBe('Units Mismatch')


  // await page.pause();

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
});