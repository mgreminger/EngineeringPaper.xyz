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

test('Test incompressible fluid', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-fluid-cell').click();
  await page.getByLabel('Fluid:').selectOption({label: 'Ethanol, liquid phase at 10 bar'});
  await page.getByLabel('Copy Function Name to').click();

  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+"+v");
  await page.locator('#cell-0 >> math-field.editable').type('(20[degC],10[bar])=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(790.547119459927, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('kg^1*m^-3');
});

test('Test incompressible aqueous mass based mixture', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-fluid-cell').click();
  await page.getByLabel('Fluid:').selectOption({label: 'Ethylene Glycol - aq'});
  await page.getByLabel('Output:').selectOption({label: 'CpMass - Mass specific constant pressure specific heat - [J/kg/K]'});
  await page.getByLabel('Concentration:').click({clickCount: 3});
  await page.getByLabel('Concentration:').fill('0.3');

  await page.setLatex(0, String.raw`\mathrm{MEGCpMassGivenTP}\left(20\left\lbrack degC\right\rbrack,1\left\lbrack atm\right\rbrack\right)=\left\lbrack\frac{kJ}{kg\cdot K}\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(3.71825101368959, precision);
});

test('Test compressible predefined mixture', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-fluid-cell').click();
  await page.getByLabel('Fluid:').selectOption('R410A.mix');
  await page.getByLabel('Output:').selectOption({label: 'T - Temperature - [K]'});
  await page.getByLabel('Input 1:').selectOption({label: 'P - Pressure - [Pa]'});
  await page.getByLabel('Input 2:').selectOption({label: 'Q - Molar vapor quality - [mol/mol]'});

  await page.setLatex(0, String.raw`\mathrm{R410AMixtureTGivenPQ}\left(1\left\lbrack atm\right\rbrack,0\right)=\left\lbrack degC\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(-51.4428958400581, precision);
});

test('Test compressible custom mixture', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-fluid-cell').click();
  await page.getByLabel('Fluid:').selectOption('Mixture (Compressible, User Defined)');
  await page.getByLabel('Output:').selectOption({label: 'MolarMass - Molar mass - [kg/mol]'});
  await page.getByLabel('Mixture Component 1:').selectOption({label: 'Nitrogen'});
  await page.getByLabel('Mole Fraction 1:').click({clickCount: 3});
  await page.getByLabel('Mole Fraction 1:').fill('0.7812');
  await page.getByLabel('Mixture Component 2:').selectOption({label: 'Argon'});
  await page.getByLabel('Mole Fraction 2:').click({clickCount: 3});
  await page.getByLabel('Mole Fraction 2:').fill('0.0092');

  // should be an error at this point since molar fractions do not add up to 1
  await expect(page.locator('text=All mole fractions must add up to 1')).toBeVisible();

  await page.locator('#add-row-1').click();
  await page.getByLabel('Mixture Component 3:').selectOption({label: 'Oxygen'});
  await page.getByLabel('Mole Fraction 3:').click({clickCount: 3});

  await page.setLatex(0, String.raw`MixtureMolarMass=\left\lbrack\frac{g}{mol}\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(28.958600656, precision);

  // delete argon and re-add as last component
  await page.locator('#delete-row-1-1').click();

  // should be an error at this point since molar fractions do not add up to 1
  await expect(page.locator('text=All mole fractions must add up to 1')).toBeVisible();

  // add argon back as last component
  await page.locator('#add-row-1').click();
  await page.getByLabel('Mixture Component 3:').selectOption({label: 'Argon'});
  await page.getByLabel('Mole Fraction 3:').click({clickCount: 3});

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(28.958600656, precision);
});

test('Test phase output (numerical and text)', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-fluid-cell').click();
  await page.getByLabel('Fluid:').selectOption('Water');
  await page.getByLabel('Output:').selectOption('PHASE');
  await page.getByLabel('Input 2:').selectOption({label: 'Q - Molar vapor quality - [mol/mol]'});

  await page.setLatex(0, String.raw`\mathrm{WaterPhaseGivenTQ}\left(200\left\lbrack degC\right\rbrack,0\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);

  await page.locator('#number-format-0').click();
  await page.locator('label').filter({ hasText: 'Display Symbolic Results' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe('\\text{twophase}');
});

test('Test custom function name', async () => {
  await page.locator('#add-fluid-cell').click();
  await page.getByLabel('Fluid:').selectOption('Water');
  await page.getByLabel('Output:').selectOption({label: 'P - Pressure - [Pa]'});
  await page.getByLabel('Input 2:').selectOption({label: 'Q - Molar vapor quality - [mol/mol]'});

  await page.locator('#cell-1 >> math-field.editable').click({clickCount: 3});
  await page.locator('#cell-1 >> math-field.editable').type('PAtTQ');

  await page.setLatex(0, String.raw`\mathrm{PAtTQ}\left(100\left\lbrack degC\right\rbrack,0\right)=\left\lbrack atm\right\rbrack`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1.0009178056435, precision);

  // make sure function name cannot be reassigned (should generate error)
  await page.locator('#add-math-cell').click();
  await page.locator('#cell-2 >> math-field.editable').type('PAtTQ=10');

  await expect(page.locator('text=Duplicate assignment of variable')).toBeVisible();
});

test('Test plot with repeated fluid function call', async () => {
  await page.locator('#add-fluid-cell').click();
  
  await page.setLatex(0, String.raw`sum\:=\:\mathrm{WaterDMassGivenTP}\left(T,1\left\lbrack atm\right\rbrack\right)+\mathrm{WaterDMassGivenTP}\left(T,2\left\lbrack atm\right\rbrack\right)=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`sum\left(300\left\lbrack K\right\rbrack\le T\le330\left\lbrack K\right\rbrack\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  // make sure symbolic version of fluid function renders properly
  let content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\operatorname{WaterDMassGivenTP}{\left(T,101325 \right)} + \operatorname{WaterDMassGivenTP}{\left(T,202650 \right)}`);

  // plot should not have an error
  await page.locator('svg.error').waitFor({state: "detached", timeout: 1000});
});