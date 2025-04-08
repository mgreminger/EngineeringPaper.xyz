import type { DatabaseCell } from "../cells/BaseCell"
import type { Result, FiniteImagResult, PlotResult, 
              MatrixResult, SystemResult, DataTableResult } from "../resultTypes";

export type Sheet = {
  config?: Config; // early sheets did not have a config property
  cells: DatabaseCell[];
  title: string;
  results: (Result | FiniteImagResult | MatrixResult | DataTableResult | PlotResult[])[];
  system_results: (SystemResult)[];
  sub_results?: [string, Result | FiniteImagResult | MatrixResult][]; // early sheets did not have this property
  nextId: number;
  sheetId: string;
  insertedSheets?: InsertedSheet[]; // early sheets did not have this property  
};

export type InsertedSheet = {
  title: string;
  url: string;
  insertion: Date;
};

export type Config = {
  mathCellConfig: MathCellConfig;
  customBaseUnits?: CustomBaseUnits; // some early sheets won't have this property
  simplifySymbolicExpressions?: boolean; // some early sheets won't have this property
  convertFloatsToFractions?: boolean; // some early sheets won't have this property
  fluidConfig?: FluidConfig; // some early sheets won't have this property
};

type Notation = "auto" | "fixed" | "exponential" | "engineering";

export type MathCellConfig = {
  symbolicOutput: boolean;
  showIntermediateResults?: boolean; // early configs may not have this property
  formatOptions: FormatOptions;
};

type FormatOptions = {
  notation: Notation;
  precision: number;
  lowerExp: number;
  upperExp: number;
};

export type FluidConfig = {
  fluid: string;
  incompMixConc: number;
  customMixture: {fluid: string, moleFraction: number}[];
}

export function getDefaultConfig(): Config {
  return {
    mathCellConfig: getDefaultMathCellConfig(),
    customBaseUnits: getDefaultBaseUnits(),
    simplifySymbolicExpressions: true,
    convertFloatsToFractions: true,
    fluidConfig: getDefaultFluidConfig()
  };
}

export function getDefaultFluidConfig(): FluidConfig {
  return {
    fluid: "Water",
    incompMixConc: 0.5,
    customMixture: [{fluid: "R32", moleFraction: 0.697615}, {fluid: "R125", moleFraction: 0.302385}]
  }
}

function getDefaultMathCellConfig(): MathCellConfig {
  return {
    symbolicOutput: false,
    showIntermediateResults: false,
    formatOptions: {
      notation: "auto",
      precision: 15,
      lowerExp: -3,
      upperExp: 5,
    }
  };
}

export const mathConfigLimits = {
  precisionUpper: 64,
  lowerExpLower: -12,
  lowerExpUpper: -2,
  upperExpLower: 2,
  upperExpUpper: 12
};

export function isDefaultMathConfig(config: MathCellConfig): boolean {
  return mathConfigsEqual(config, defaultConfig.mathCellConfig);
}

export function mathConfigsEqual(config1: MathCellConfig, config2: MathCellConfig): boolean {
  return (
    config1.symbolicOutput === config2.symbolicOutput &&
    config1.showIntermediateResults === config2.showIntermediateResults &&
    config1.formatOptions.notation === config2.formatOptions.notation &&
    config1.formatOptions.precision === config2.formatOptions.precision &&
    config1.formatOptions.lowerExp === config2.formatOptions.lowerExp &&
    config1.formatOptions.upperExp === config2.formatOptions.upperExp
  )
} 

export function isDefaultConfig(config: Config): boolean {
  return configsEqual(config, defaultConfig);
}

export function configsEqual(config1: Config, config2: Config): boolean {
  return mathConfigsEqual(config1.mathCellConfig, config2.mathCellConfig) && 
         baseUnitsEqual(config1.customBaseUnits, config2.customBaseUnits) &&
         config1.simplifySymbolicExpressions === config2.simplifySymbolicExpressions && 
         config1.convertFloatsToFractions === config2.convertFloatsToFractions;
}

export function copyMathConfig(input: MathCellConfig): MathCellConfig {
  if (input === null) {
    return null;
  }

  return {
    symbolicOutput: input.symbolicOutput,
    showIntermediateResults: input.showIntermediateResults,
    formatOptions: {...input.formatOptions}
  };
}

export function getSafeMathConfig(config: MathCellConfig): MathCellConfig {
  const safeConfig = copyMathConfig(config);

  // clamp precision
  if (config.formatOptions.precision === null) {
    safeConfig.formatOptions.precision = defaultConfig.mathCellConfig.formatOptions.precision;
  } else if(config.formatOptions.precision > mathConfigLimits.precisionUpper) {
    safeConfig.formatOptions.precision = mathConfigLimits.precisionUpper;
  } else if(config.formatOptions.precision < (config.formatOptions.notation === "fixed" ? 0 : 1)) {
    safeConfig.formatOptions.precision = config.formatOptions.notation === "fixed" ? 0 : 1;
  }

  // clamp lowerExp
  if (config.formatOptions.lowerExp === null) {
    safeConfig.formatOptions.lowerExp = defaultConfig.mathCellConfig.formatOptions.lowerExp;
  } else if(config.formatOptions.lowerExp > mathConfigLimits.lowerExpUpper) {
    safeConfig.formatOptions.lowerExp = mathConfigLimits.lowerExpUpper;
  } else if(config.formatOptions.lowerExp < mathConfigLimits.lowerExpLower) {
    safeConfig.formatOptions.lowerExp = mathConfigLimits.lowerExpLower;
  }

  // clamp upperExp
  if (config.formatOptions.upperExp === null) {
    safeConfig.formatOptions.upperExp = defaultConfig.mathCellConfig.formatOptions.upperExp;
  } else if(config.formatOptions.upperExp > mathConfigLimits.upperExpUpper) {
    safeConfig.formatOptions.upperExp = mathConfigLimits.upperExpUpper;
  } else if(config.formatOptions.upperExp < mathConfigLimits.upperExpLower) {
    safeConfig.formatOptions.upperExp = mathConfigLimits.upperExpLower;
  }

  return safeConfig;
}

export type CustomBaseUnits = {
  mass: string;
  length: string;
  time: string;
  current: string;
  temperature: string;
  luminous_intensity: string;
  amount_of_substance: string;
  force: string;
  area: string;
  volume: string;
  energy: string;
  power: string;
  pressure: string;
  charge: string;
  capacitance: string;
  electric_potential: string;
  resistance: string;
  inductance: string;
  conductance: string;
  magnetic_flux: string;
  magnetic_flux_density: string;
  angle: string;
  information: string;
}

// the first choice in each list of choices will be used as the default
export const baseUnitChoices: {name: string, label: string, choices: string[]}[] = [
  {name: 'mass', label: 'Mass', choices: ['kg', 'g', 'mg', 'tonne', 'lbm', 'ton', 'oz'] },
  {name: 'length', label: 'Length', choices: ['m', 'mm', 'cm', 'km', 'um', 'nm', 'angstrom', 'in', 'feet', 'yard', 'mile']},
  {name: 'area', label: 'Area', choices: ['m^2', 'cm^2', 'mm^2', 'km^2', 'hectare', 'in^2', 'feet^2', 'yard^2', 'mile^2', 'acre']},
  {name: 'volume', label: 'Volume', choices: ['m^3', 'cm^3', 'mm^3', 'km^3', 'liter', 'ml', 'in^3', 'feet^3', 'yard^3', 'mile^3', 'gallon', 'floz']},
  {name: 'force', label: 'Force', choices: ['N', 'mN', 'kN', 'lbf', 'kip', 'dyne', 'gf', 'kgf']},
  {name: 'pressure', label: 'Pressure', choices: ['Pa', 'kPa', 'MPa', 'GPa', 'psi', 'kpsi', 'Mpsi', 'atm', 'torr', 'bar', 'mmHg', 'mmH2O', 'cmH2O', 'inHg', 'inH2O', 'ftH2O']},
  {name: 'energy', label: 'Energy (Torque)', choices: ['J', 'mJ', 'kJ', 'MJ', 'Wh', 'kWh', 'eV', 'BTU', 'hp*hr', 'N*m', 'in*lbf', 'foot*lbf', 'dyn*cm', 'erg']},
  {name: 'power', label: 'Power', choices: ['W', 'mW', 'kW', 'MW', 'hp', 'BTU/min', 'BTU/sec', 'BTU/hr', 'MBH', 'MMBH', 'TR', 'BHP', 'erg/sec', 'dyne*cm/sec']},
  {name: 'angle', label: 'Angle', choices: ['rad', 'deg', 'grad', 'cycle', 'arcsec', 'arcmin']},
  {name: 'time', label: 'Time', choices: ['s', 'ms', 'us', 'ns', 'min', 'hour', 'day', 'week', 'month', 'year']},
  {name: 'temperature', label: 'Temperature', choices: ['K', 'degC', 'degF', 'degR']},
  {name: 'charge', label: 'Electric Charge', choices: ['C', 'mC', 'uC', 'nC', 'pC']},
  {name: 'electric_potential', label: 'Electric Potential', choices: ['V', 'mV', 'kV', 'uV', 'MV']},
  {name: 'current', label: 'Electric Current', choices: ['A', 'mA', 'uA', 'kA', 'MA']},
  {name: 'resistance', label: 'Resistance', choices: ['ohm', 'mohm', 'kohm', 'Mohm', 'Gohm']},
  {name: 'capacitance', label: 'Capacitance', choices: ['F', 'mF', 'uF', 'nF', 'pF']},
  {name: 'inductance', label: 'Inductance', choices: ['H', 'mH', 'uH', 'nH', 'pH']},
  {name: 'conductance', label: 'Conductance', choices: ['S', 'mS', 'kS', 'uS', 'MS']},
  {name: 'magnetic_flux', label: 'Magnetic Flux', choices: ['Wb', 'mWb', 'uWb', 'nWb']},
  {name: 'magnetic_flux_density', label: 'Magnetic Flux Density', choices: ['T', 'mT', 'uT', 'nT','pT']},
  {name: 'luminous_intensity', label: 'Luminous Intensity', choices: ['cd', 'mcd', 'kcd']},
  {name: 'amount_of_substance', label: 'Amount of Substance', choices: ['mol', 'kmol', 'mmol']},
  {name: 'information', label: 'Information', choices: ['b', 'B', 'kB', 'MB', 'GB', 'TB', 'PB', 'kb', 'Mb', 'Gb', 'Tb', 'Pb']},
];

export type BaseUnitSystemNames = "SI" | "mm-kg-sec" | "inch-lbm-sec";

export const baseUnitSystems = new Map<BaseUnitSystemNames, CustomBaseUnits>([
  [
    "SI",
    {
      mass: "kg",
      length: "m",
      time: "s",
      current: "A",
      temperature: "K",
      luminous_intensity: "cd",
      amount_of_substance: "mol",
      force: "N",
      area: "m^2",
      volume: "m^3",
      energy: "J",
      power: "W",
      pressure: "Pa",
      charge: "C",
      capacitance: "F",
      electric_potential: "V",
      resistance: "ohm",
      inductance: "H",
      conductance: "S",
      magnetic_flux: "Wb",
      magnetic_flux_density: "T",
      angle: "rad",
      information: "b",
    },
  ],
  [
    "mm-kg-sec",
    {
      mass: "kg",
      length: "mm",
      time: "s",
      current: "A",
      temperature: "K",
      luminous_intensity: "cd",
      amount_of_substance: "mol",
      force: "N",
      area: "mm^2",
      volume: "mm^3",
      energy: "mJ",
      power: "mW",
      pressure: "MPa",
      charge: "C",
      capacitance: "F",
      electric_potential: "V",
      resistance: "ohm",
      inductance: "H",
      conductance: "S",
      magnetic_flux: "Wb",
      magnetic_flux_density: "T",
      angle: "rad",
      information: "b",
    },
  ],
  [
    "inch-lbm-sec",
    {
      mass: "lbm",
      length: "in",
      time: "s",
      current: "A",
      temperature: "degR",
      luminous_intensity: "cd",
      amount_of_substance: "mol",
      force: "lbf",
      area: "in^2",
      volume: "in^3",
      energy: "BTU",
      power: "hp",
      pressure: "psi",
      charge: "C",
      capacitance: "F",
      electric_potential: "V",
      resistance: "ohm",
      inductance: "H",
      conductance: "S",
      magnetic_flux: "Wb",
      magnetic_flux_density: "T",
      angle: "rad",
      information: "b",
    },
  ],
]);

export const defaultConfig = getDefaultConfig();

export function getDefaultBaseUnits(system: BaseUnitSystemNames = "SI"): CustomBaseUnits {
  return {...baseUnitSystems.get(system)};
}

export function isDefaultBaseUnits(baseUnits: CustomBaseUnits, system: BaseUnitSystemNames = "SI"): boolean {
  const defaultBaseUnits = baseUnitSystems.get(system); 
  return Object.entries(defaultBaseUnits).reduce((acum, [key, value]) => acum && value === baseUnits[key], true);
}

export function baseUnitsEqual(baseUnits1: CustomBaseUnits, baseUnits2: CustomBaseUnits): boolean {
  let result = true;

  for (const key in baseUnits1) {
    result = result && baseUnits1[key] === baseUnits2[key];
  }

  return result;
}

export function normalizeConfig(config: Config | undefined): Config {
  if (!config) {
    return getDefaultConfig();
  }
  
  config.customBaseUnits = config.customBaseUnits ?? getDefaultBaseUnits(); // customBaseUnits may not exist
  config.simplifySymbolicExpressions = config.simplifySymbolicExpressions ?? true; // simplifySymboicExpressions may not exist
  config.convertFloatsToFractions = config.convertFloatsToFractions ?? true; // convertFloatsToFractions may not exist
  config.fluidConfig = config.fluidConfig ?? getDefaultFluidConfig(); // fluidConfig may not exist
  config.mathCellConfig.showIntermediateResults = config.mathCellConfig.showIntermediateResults ?? false; // may not exist

  return config;
}