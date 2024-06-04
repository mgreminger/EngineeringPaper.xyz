import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Test water viscosity from temperature and pressure', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-fluid-cell').click();
  await page.getByLabel('Output:').selectOption({label: 'Viscosity - Viscosity - [Pa s]'});
  await page.getByLabel('Copy Function Name to').click();

  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+"+v");
  await page.locator('#cell-0 >> math-field.editable').type('(20[degC],1[atm])=[Pa*s]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(0.00100159614312059, precision);

  // make sure incorrect input units are detected
  await page.setLatex(0, String.raw`\mathrm{WaterViscosityGivenTP}\left(300\left\lbrack s\right\rbrack,1\left\lbrack atm\right\rbrack\right)=\left\lbrack mPa\cdot s\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeVisible();

  // change to a different valid value and make sure results update
  await page.setLatex(0, String.raw`\mathrm{WaterViscosityGivenTP}\left(10\left\lbrack degC\right\rbrack,1\left\lbrack atm\right\rbrack\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(0.00130589966035106, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('kg^1*m^-1*s^-1'); 
});

test('Test humid air properties 1', async () => {
  // Calculate values from Trane Psychrometric Chart Problem 1

  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // Wet bulb temp output
  await page.locator('#add-fluid-cell').click();
  await page.getByLabel('Fluid:').selectOption({label: 'Air (Humid)'});
  await page.getByLabel('Output:').selectOption({label: 'Twb - Wet-Bulb Temperature - [K]'});
  await page.getByLabel('Input 2:').selectOption({label: 'Rh - Relative humidity in [0, 1]'});

  await page.getByLabel('Copy Function Name to').click();

  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+"+v");
  await page.locator('#cell-0 >> math-field.editable').type('(75[degF],0.5,1[atm])=[degF]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(62.5467059240378, precision);

  // Humidity ratio output
  await page.getByLabel('Output:').selectOption({label: 'W - Humidity Ratio (kg water/kg dry air)'});

  await page.setLatex(0, String.raw`\mathrm{HumidAirWGivenTRhP}\left(75\left\lbrack degF\right\rbrack,0.5,1\left\lbrack atm\right\rbrack\right)=\left\lbrack\frac{grains}{lbm}\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(64.9403915336569, precision);

  // enthalpy output
  await page.getByLabel('Output:').selectOption({label: 'H - Mixture enthalpy per mass dry air - [J/kg]'});

  await page.setLatex(0, String.raw`\mathrm{HumidAirHGivenTRhP}\left(75\left\lbrack degF\right\rbrack,0.5,1\left\lbrack atm\right\rbrack\right)-\mathrm{HumidAirHGivenTRhP}\left(0\left\lbrack degF\right\rbrack,0,1\left\lbrack atm\right\rbrack\right)=\left\lbrack\frac{BTU}{lbm}\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(28.1649758818177, precision);

  // dew point output
  await page.getByLabel('Output:').selectOption({label: 'Tdp - Dew-Point Temperature - [K]'});

  await page.setLatex(0, String.raw`\mathrm{HumidAirTdpGivenTRhP}\left(75\left\lbrack degF\right\rbrack,0.5,1\left\lbrack atm\right\rbrack\right)=\left\lbrack degF\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(55.124732483861, precision);

  // specific volume output
  await page.getByLabel('Output:').selectOption({label: 'Vda - Mixture volume per mass dry air - [m^3/kg]'});

  await page.setLatex(0, String.raw`HumidAirVdaGivenTRhP\left(75\left\lbrack degF\right\rbrack,0.5,1\left\lbrack atm\right\rbrack\right)=\left\lbrack\frac{ft^3}{lbm}\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(13.6750924385056, precision);

  // vapor pressure output
  await page.getByLabel('Output:').selectOption({label: 'Pw - Partial pressure of water vapor - [Pa]'});

  await page.setLatex(0, String.raw`\mathrm{HumidAirPwGivenTRhP}\left(75\left\lbrack degF\right\rbrack,0.5,1\left\lbrack atm\right\rbrack\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1489.19377241616, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('Pa');

  // percentage humidity output (humidify ratio / humidity ratio at saturation)
  await page.getByLabel('Output:').selectOption({label: 'W - Humidity Ratio (kg water/kg dry air)'});

  await page.setLatex(0, String.raw`\frac{\mathrm{HumidAirWGivenTRhP}\left(75\left\lbrack degF\right\rbrack,0.5,1\left\lbrack atm\right\rbrack\right)}{\mathrm{HumidAirWGivenTRhP}\left(75\left\lbrack degF\right\rbrack,1.0,1\left\lbrack atm\right\rbrack\right)}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(0.492541785213707, precision);
});

test('Test humid air properties 2', async () => {
  // Calculate values from Trane Psychrometric Chart Problem 2

  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // Enthalpy (need to get reference first)
  await page.locator('#add-fluid-cell').click();
  await page.getByLabel('Fluid:').selectOption({label: 'Air (Humid)'});
  await page.getByLabel('Input 2:').selectOption({label: 'W - Humidity Ratio (kg water/kg dry air)'});

  await page.setLatex(0, String.raw`H_0=\mathrm{HumidAirHGivenTWP}\left(0\left\lbrack degF\right\rbrack,\:0.0,\:1\left\lbrack atm\right\rbrack\right)=\left\lbrack\frac{BTU}{lbm}\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(-7.68565359375779, precision);

  // Now can calculate enthalpy that can compared to the Trane Psychrometric Chart
  await page.locator('#add-fluid-cell').click();
  await page.locator('#fluid-selector-2').selectOption({label: 'Air (Humid)'});
  await page.locator('#input2-selector-2').selectOption({label: 'Twb - Wet-Bulb Temperature - [K]'});

  await page.locator('#add-math-cell').click();

  await page.setLatex(3, String.raw`\mathrm{HumidAirHGivenTTwbP}\left(83\left\lbrack degF\right\rbrack,60\left\lbrack degF\right\rbrack,1\left\lbrack atm\right\rbrack\right)-H_0=\left\lbrack\frac{BTU}{lbm}\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(26.3187274681593, precision);

  // Humidity ratio output
  await page.locator('#output-selector-2').selectOption({label: 'W - Humidity Ratio (kg water/kg dry air)'});

  await page.setLatex(3, String.raw`\mathrm{HumidAirWGivenTTwbP}\left(83\left\lbrack degF\right\rbrack,60\left\lbrack degF\right\rbrack,1\left\lbrack atm\right\rbrack\right)=\left\lbrack\frac{grains}{lbm}\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(40.6835574637242, precision);

  // Dew point output
  await page.locator('#output-selector-2').selectOption({label: 'Tdp - Dew-Point Temperature - [K]'});

  await page.setLatex(3, String.raw`\mathrm{HumidAirTdpGivenTTwbP}\left(83\left\lbrack degF\right\rbrack,60\left\lbrack degF\right\rbrack,1\left\lbrack atm\right\rbrack\right)=\left\lbrack degF\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(42.7706038219195, precision);

  // Relative humidity
  await page.locator('#output-selector-2').selectOption({label: 'Rh - Relative humidity in [0, 1]'});

  await page.setLatex(3, String.raw`\mathrm{HumidAirRhGivenTTwbP}\left(83\left\lbrack degF\right\rbrack,60\left\lbrack degF\right\rbrack,1\left\lbrack atm\right\rbrack\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(0.242163313961391, precision);

  content = await page.textContent('#result-units-3');
  expect(content).toBe('');
});

test('Test trivial constant', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-fluid-cell').click();
  await page.getByLabel('Output:').selectOption({label: 'TCritical - Temperature at the critical point - [K]'});
  await page.getByLabel('Copy Constant Name to').click();

  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+"+v");
  await page.locator('#cell-0 >> math-field.editable').type('=[degC]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(373.946, precision);
});


