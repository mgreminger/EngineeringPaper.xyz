export const FLUID_PROPS_PARAMETERS = new Map([
  [
    "DELTA",
    {
      idName: "Delta",
      units: "",
      input: true,
      output: true,
      trivial: false,
      description: "Reduced density (rho/rhoc)",
    }
  ],
  [
    "DMOLAR",
    {
      idName: "DMolar",
      units: "mol/m^3",
      input: true,
      output: true,
      trivial: false,
      description: "Molar density",
    }
  ],
  [
    "D",
    {
      idName: "DMass",
      units: "kg/m^3",
      input: true,
      output: true,
      trivial: false,
      description: "Mass density",
    }
  ],
  [
    "HMOLAR",
    {
      idName: "HMolar",
      units: "J/mol",
      input: true,
      output: true,
      trivial: false,
      description: "Molar specific enthalpy",
    }
  ],
  [
    "H",
    {
      idName: "HMass",
      units: "J/kg",
      input: true,
      output: true,
      trivial: false,
      description: "Mass specific enthalpy",
    }
  ],
  [
    "P",
    {
      idName: "P",
      units: "Pa",
      input: true,
      output: true,
      trivial: false,
      description: "Pressure",
    }
  ],
  [
    "Q",
    {
      idName: "Q",
      units: "mol/mol",
      input: true,
      output: true,
      trivial: false,
      description: "Molar vapor quality",
    }
  ],
  [
    "SMOLAR",
    {
      idName: "SMolar",
      units: "J/mol/K",
      input: true,
      output: true,
      trivial: false,
      description: "Molar specific entropy",
    }
  ],
  [
    "S",
    {
      idName: "SMass",
      units: "J/kg/K",
      input: true,
      output: true,
      trivial: false,
      description: "Mass specific entropy",
    }
  ],
  [
    "TAU",
    {
      idName: "Tau",
      units: "",
      input: true,
      output: true,
      trivial: false,
      description: "Reciprocal reduced temperature (Tc/T)",
    }
  ],
  [
    "T",
    {
      idName: "T",
      units: "K",
      input: true,
      output: true,
      trivial: false,
      description: "Temperature",
    }
  ],
  [
    "UMOLAR",
    {
      idName: "UMolar",
      units: "J/mol",
      input: true,
      output: true,
      trivial: false,
      description: "Molar specific internal energy",
    }
  ],
  [
    "U",
    {
      idName: "UMass",
      units: "J/kg",
      input: true,
      output: true,
      trivial: false,
      description: "Mass specific internal energy",
    }
  ],
  [
    "ACENTRIC",
    {
      idName: "Acentric",
      units: "",
      input: false,
      output: true,
      trivial: true,
      description: "Acentric factor",
    }
  ],
  [
    "ALPHA0",
    {
      idName: "Alpha0",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Ideal Helmholtz energy",
    }
  ],
  [
    "ALPHAR",
    {
      idName: "AlphaR",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Residual Helmholtz energy",
    }
  ],
  [
    "A",
    {
      idName: "SoundSpeed",
      units: "m/s",
      input: false,
      output: true,
      trivial: false,
      description: "Speed of sound",
    }
  ],
  [
    "BVIRIAL",
    {
      idName: "BVirial",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Second virial coefficient",
    }
  ],
  [
    "CONDUCTIVITY",
    {
      idName: "Conductivity",
      units: "W/m/K",
      input: false,
      output: true,
      trivial: false,
      description: "Thermal conductivity",
    }
  ],
  [
    "CP0MASS",
    {
      idName: "Cp0Mass",
      units: "J/kg/K",
      input: false,
      output: true,
      trivial: false,
      description: "Ideal gas mass specific constant pressure specific heat",
    }
  ],
  [
    "CP0MOLAR",
    {
      idName: "Cp0Molar",
      units: "J/mol/K",
      input: false,
      output: true,
      trivial: false,
      description: "Ideal gas molar specific constant pressure specific heat",
    }
  ],
  [
    "CPMOLAR",
    {
      idName: "CpMolar",
      units: "J/mol/K",
      input: false,
      output: true,
      trivial: false,
      description: "Molar specific constant pressure specific heat",
    }
  ],
  [
    "CVIRIAL",
    {
      idName: "CVirial",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Third virial coefficient",
    }
  ],
  [
    "CVMASS",
    {
      idName: "CvMass",
      units: "J/kg/K",
      input: false,
      output: true,
      trivial: false,
      description: "Mass specific constant volume specific heat",
    }
  ],
  [
    "CVMOLAR",
    {
      idName: "CvMolar",
      units: "J/mol/K",
      input: false,
      output: true,
      trivial: false,
      description: "Molar specific constant volume specific heat",
    }
  ],
  [
    "C",
    {
      idName: "CpMass",
      units: "J/kg/K",
      input: false,
      output: true,
      trivial: false,
      description: "Mass specific constant pressure specific heat",
    }
  ],
  [
    "D2ALPHA0_DDELTA2_CONSTTAU",
    {
      idName: "D2Alpha0DDelta2",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Second derivative of ideal Helmholtz energy with delta",
    }
  ],
  [
    "D3ALPHA0_DDELTA3_CONSTTAU",
    {
      idName: "D3Alpha0DDelta3",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Third derivative of ideal Helmholtz energy with delta",
    }
  ],
  [
    "DALPHA0_DDELTA_CONSTTAU",
    {
      idName: "DAlpha0DDelta",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Derivative of ideal Helmholtz energy with delta",
    }
  ],
  [
    "DALPHA0_DTAU_CONSTDELTA",
    {
      idName: "DAlpha0DTau",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Derivative of ideal Helmholtz energy with tau",
    }
  ],
  [
    "DALPHAR_DDELTA_CONSTTAU",
    {
      idName: "DAlphaRDDelta",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Derivative of residual Helmholtz energy with delta",
    }
  ],
  [
    "DALPHAR_DTAU_CONSTDELTA",
    {
      idName: "DAlphaRDTau",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Derivative of residual Helmholtz energy with tau",
    }
  ],
  [
    "DBVIRIAL_DT",
    {
      idName: "DBVirialDT",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Derivative of second virial coefficient with respect to T",
    }
  ],
  [
    "DCVIRIAL_DT",
    {
      idName: "DCVirialDT",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Derivative of third virial coefficient with respect to T",
    }
  ],
  [
    "DIPOLE_MOMENT",
    {
      idName: "DipoleMoment",
      units: "C m",
      input: false,
      output: true,
      trivial: true,
      description: "Dipole moment",
    }
  ],
  [
    "FH",
    {
      idName: "FH",
      units: "",
      input: false,
      output: true,
      trivial: true,
      description: "Flammability hazard",
    }
  ],
  [
    "FRACTION_MAX",
    {
      idName: "FractionMax",
      units: "",
      input: false,
      output: true,
      trivial: true,
      description: "Fraction (mole, mass, volume) maximum value for incompressible solutions",
    }
  ],
  [
    "FRACTION_MIN",
    {
      idName: "FractionMin",
      units: "",
      input: false,
      output: true,
      trivial: true,
      description: "Fraction (mole, mass, volume) minimum value for incompressible solutions",
    }
  ],
  [
    "FUNDAMENTAL_DERIVATIVE_OF_GAS_DYNAMICS",
    {
      idName: "FundDerivGasDyn",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Fundamental derivative of gas dynamics",
    }
  ],
  [
    "GAS_CONSTANT",
    {
      idName: "GasConstant",
      units: "J/mol/K",
      input: false,
      output: true,
      trivial: true,
      description: "Molar gas constant",
    }
  ],
  [
    "GMOLAR_RESIDUAL",
    {
      idName: "GMolarResidual",
      units: "J/mol/K",
      input: false,
      output: true,
      trivial: false,
      description: "Residual molar Gibbs energy",
    }
  ],
  [
    "GMOLAR",
    {
      idName: "GMolar",
      units: "J/mol",
      input: false,
      output: true,
      trivial: false,
      description: "Molar specific Gibbs energy",
    }
  ],
  [
    "GWP100",
    {
      idName: "GWP100",
      units: "",
      input: false,
      output: true,
      trivial: true,
      description: "100-year global warming potential",
    }
  ],
  [
    "GWP20",
    {
      idName: "GWP20",
      units: "",
      input: false,
      output: true,
      trivial: true,
      description: "20-year global warming potential",
    }
  ],
  [
    "GWP500",
    {
      idName: "GWP500",
      units: "",
      input: false,
      output: true,
      trivial: true,
      description: "500-year global warming potential",
    }
  ],
  [
    "G",
    {
      idName: "GMass",
      units: "J/kg",
      input: false,
      output: true,
      trivial: false,
      description: "Mass specific Gibbs energy",
    }
  ],
  [
    "HELMHOLTZMASS",
    {
      idName: "HelmholtzMass",
      units: "J/kg",
      input: false,
      output: true,
      trivial: false,
      description: "Mass specific Helmholtz energy",
    }
  ],
  [
    "HELMHOLTZMOLAR",
    {
      idName: "HelmholtzMolar",
      units: "J/mol",
      input: false,
      output: true,
      trivial: false,
      description: "Molar specific Helmholtz energy",
    }
  ],
  [
    "HH",
    {
      idName: "HH",
      units: "",
      input: false,
      output: true,
      trivial: true,
      description: "Health hazard",
    }
  ],
  [
    "HMOLAR_RESIDUAL",
    {
      idName: "HMolarResidual",
      units: "J/mol/K",
      input: false,
      output: true,
      trivial: false,
      description: "Residual molar enthalpy",
    }
  ],
  [
    "ISENTROPIC_EXPANSION_COEFFICIENT",
    {
      idName: "IsentropicExpansionCoefficient",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Isentropic expansion coefficient",
    }
  ],
  [
    "ISOBARIC_EXPANSION_COEFFICIENT",
    {
      idName: "IsobaricExpansionCoefficient",
      units: "1/K",
      input: false,
      output: true,
      trivial: false,
      description: "Isobaric expansion coefficient",
    }
  ],
  [
    "ISOTHERMAL_COMPRESSIBILITY",
    {
      idName: "IsothermalCompressibility",
      units: "1/Pa",
      input: false,
      output: true,
      trivial: false,
      description: "Isothermal compressibility",
    }
  ],
  [
    "I",
    {
      idName: "SurfaceTension",
      units: "N/m",
      input: false,
      output: true,
      trivial: false,
      description: "Surface tension",
    }
  ],
  [
    "M",
    {
      idName: "MolarMass",
      units: "kg/mol",
      input: false,
      output: true,
      trivial: true,
      description: "Molar mass",
    }
  ],
  [
    "ODP",
    {
      idName: "ODP",
      units: "",
      input: false,
      output: true,
      trivial: true,
      description: "Ozone depletion potential",
    }
  ],
  [
    "PCRIT",
    {
      idName: "PCrit",
      units: "Pa",
      input: false,
      output: true,
      trivial: true,
      description: "Pressure at the critical point",
    }
  ],
  [
    "PHASE",
    {
      idName: "Phase",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Phase index as a float",
    }
  ],
  [
    "PH",
    {
      idName: "PH",
      units: "",
      input: false,
      output: true,
      trivial: true,
      description: "Physical hazard",
    }
  ],
  [
    "PIP",
    {
      idName: "PIP",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Phase identification parameter",
    }
  ],
  [
    "PMAX",
    {
      idName: "PMax",
      units: "Pa",
      input: false,
      output: true,
      trivial: true,
      description: "Maximum pressure limit",
    }
  ],
  [
    "PMIN",
    {
      idName: "PMin",
      units: "Pa",
      input: false,
      output: true,
      trivial: true,
      description: "Minimum pressure limit",
    }
  ],
  [
    "PRANDTL",
    {
      idName: "Prandtl",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Prandtl number",
    }
  ],
  [
    "PTRIPLE",
    {
      idName: "PTriplePoint",
      units: "Pa",
      input: false,
      output: true,
      trivial: true,
      description: "Pressure at the triple point (pure only)",
    }
  ],
  [
    "P_REDUCING",
    {
      idName: "PReducing",
      units: "Pa",
      input: false,
      output: true,
      trivial: true,
      description: "Pressure at the reducing point",
    }
  ],
  [
    "RHOCRIT",
    {
      idName: "RhoCrit",
      units: "kg/m^3",
      input: false,
      output: true,
      trivial: true,
      description: "Mass density at critical point",
    }
  ],
  [
    "RHOMASS_REDUCING",
    {
      idName: "RhoMassReducing",
      units: "kg/m^3",
      input: false,
      output: true,
      trivial: true,
      description: "Mass density at reducing point",
    }
  ],
  [
    "RHOMOLAR_CRITICAL",
    {
      idName: "RhoMolarCritical",
      units: "mol/m^3",
      input: false,
      output: true,
      trivial: true,
      description: "Molar density at critical point",
    }
  ],
  [
    "RHOMOLAR_REDUCING",
    {
      idName: "RhoMolarReducing",
      units: "mol/m^3",
      input: false,
      output: true,
      trivial: true,
      description: "Molar density at reducing point",
    }
  ],
  [
    "SMOLAR_RESIDUAL",
    {
      idName: "SMolarResidual",
      units: "J/mol/K",
      input: false,
      output: true,
      trivial: false,
      description: "Residual molar entropy (sr/R = s(T,rho) - s^0(T,rho))",
    }
  ],
  [
    "TCRIT",
    {
      idName: "TCritical",
      units: "K",
      input: false,
      output: true,
      trivial: true,
      description: "Temperature at the critical point",
    }
  ],
  [
    "TMAX",
    {
      idName: "TMax",
      units: "K",
      input: false,
      output: true,
      trivial: true,
      description: "Maximum temperature limit",
    }
  ],
  [
    "TMIN",
    {
      idName: "TMin",
      units: "K",
      input: false,
      output: true,
      trivial: true,
      description: "Minimum temperature limit",
    }
  ],
  [
    "TTRIPLE",
    {
      idName: "TTriplePoint",
      units: "K",
      input: false,
      output: true,
      trivial: true,
      description: "Temperature at the triple point",
    }
  ],
  [
    "T_FREEZE",
    {
      idName: "TFreeze",
      units: "K",
      input: false,
      output: true,
      trivial: true,
      description: "Freezing temperature for incompressible solutions",
    }
  ],
  [
    "T_REDUCING",
    {
      idName: "TReducing",
      units: "K",
      input: false,
      output: true,
      trivial: true,
      description: "Temperature at the reducing point",
    }
  ],
  [
    "V",
    {
      idName: "Viscosity",
      units: "Pa s",
      input: false,
      output: true,
      trivial: false,
      description: "Viscosity",
    }
  ],
  [
    "Z",
    {
      idName: "Z",
      units: "",
      input: false,
      output: true,
      trivial: false,
      description: "Compressibility factor",
    }
  ],
]);


export const FLUIDS = new Map([
  [
    "1-Butene",
    {
      menuName: "1-Butene",
      idName: "But1ene",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Acetone",
    {
      menuName: "Acetone",
      idName: "Acetone",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Air",
    {
      menuName: "Air (Dry)",
      idName: "Air",
      category: "Multiphase Compressible",
      basic: true,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "HumidAir",
    {
      menuName: "Air (Humid)",
      idName: "HumidAir",
      category: "Multiphase Compressible",
      basic: true,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Ammonia",
    {
      menuName: "Ammonia",
      idName: "Ammonia",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Argon",
    {
      menuName: "Argon",
      idName: "Argon",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Benzene",
    {
      menuName: "Benzene",
      idName: "Benzene",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "CarbonDioxide",
    {
      menuName: "Carbon Dioxide",
      idName: "CarbonDioxide",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "CarbonMonoxide",
    {
      menuName: "Carbon Monoxide",
      idName: "CarbonMonoxide",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "CarbonylSulfide",
    {
      menuName: "Carbonyl Sulfide",
      idName: "CarbonylSulfide",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "CycloHexane",
    {
      menuName: "Cyclohexane",
      idName: "Cyclohexane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "CycloPropane",
    {
      menuName: "Cyclopropane",
      idName: "Cyclopropane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Cyclopentane",
    {
      menuName: "Cyclopentane",
      idName: "Cyclopentane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "D4",
    {
      menuName: "D4",
      idName: "D4",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "D5",
    {
      menuName: "D5",
      idName: "D5",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "D6",
    {
      menuName: "D6",
      idName: "D6",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Deuterium",
    {
      menuName: "Deuterium",
      idName: "Deuterium",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Dichloroethane",
    {
      menuName: "Dichloroethane",
      idName: "Dichloroethane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "DiethylEther",
    {
      menuName: "Diethyl Ether",
      idName: "DiethylEther",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "DimethylCarbonate",
    {
      menuName: "Dimethyl Carbonate",
      idName: "DimethylCarbonate",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "DimethylEther",
    {
      menuName: "Dimethyl Ether",
      idName: "DimethylEther",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Ethane",
    {
      menuName: "Ethane",
      idName: "Ethane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Ethanol",
    {
      menuName: "Ethanol",
      idName: "Ethanol",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "EthylBenzene",
    {
      menuName: "Ethylbenzene",
      idName: "Ethylbenzene",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Ethylene",
    {
      menuName: "Ethylene",
      idName: "Ethylene",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "EthyleneOxide",
    {
      menuName: "Ethylene Oxide",
      idName: "EthyleneOxide",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Fluorine",
    {
      menuName: "Fluorine",
      idName: "Fluorine",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "HFE143m",
    {
      menuName: "HFE-143m",
      idName: "HFE143m",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "HeavyWater",
    {
      menuName: "Heavy Water",
      idName: "HeavyWater",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Helium",
    {
      menuName: "Helium",
      idName: "Helium",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Hydrogen",
    {
      menuName: "Hydrogen",
      idName: "Hydrogen",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "HydrogenChloride",
    {
      menuName: "Hydrogen Chloride",
      idName: "HydrogenChloride",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "HydrogenSulfide",
    {
      menuName: "Hydrogen Sulfide",
      idName: "HydrogenSulfide",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "IsoButane",
    {
      menuName: "Isobutane",
      idName: "Isobutane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "IsoButene",
    {
      menuName: "Isobutene",
      idName: "Isobutene",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Isohexane",
    {
      menuName: "Isohexane",
      idName: "Isohexane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Isopentane",
    {
      menuName: "Isopentane",
      idName: "Isopentane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Krypton",
    {
      menuName: "Krypton",
      idName: "Krypton",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "MD2M",
    {
      menuName: "MD2M (Decamethyltetrasiloxane)",
      idName: "MD2M",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "MD3M",
    {
      menuName: "MD3M (Dodecamethylpentasiloxane)",
      idName: "MD3M",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "MD4M",
    {
      menuName: "MD4M (Tetradecamethylhexasiloxane)",
      idName: "MD4M",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "MDM",
    {
      menuName: "MDM (Octamethyltrisiloxane)",
      idName: "MDM",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "MM",
    {
      menuName: "MM (Hexamethyldisiloxane)",
      idName: "MM",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Methane",
    {
      menuName: "Methane",
      idName: "Methane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Methanol",
    {
      menuName: "Methanol",
      idName: "Methanol",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "MethylLinoleate",
    {
      menuName: "Methyl Linoleate",
      idName: "MethylLinoleate",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "MethylLinolenate",
    {
      menuName: "Methyl Linolenate",
      idName: "MethylLinolenate",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "MethylOleate",
    {
      menuName: "Methyl Oleate",
      idName: "MethylOleate",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "MethylPalmitate",
    {
      menuName: "Methyl Palmitate",
      idName: "MethylPalmitate",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "MethylStearate",
    {
      menuName: "Methyl Stearate",
      idName: "MethylStearate",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Neon",
    {
      menuName: "Neon",
      idName: "Neon",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Neopentane",
    {
      menuName: "Neopentane",
      idName: "Neopentane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Nitrogen",
    {
      menuName: "Nitrogen",
      idName: "Nitrogen",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "NitrousOxide",
    {
      menuName: "Nitrous Oxide",
      idName: "NitrousOxide",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Novec649",
    {
      menuName: "Novec 649",
      idName: "Novec649",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "OrthoDeuterium",
    {
      menuName: "Orthodeuterium",
      idName: "OrthoDeuterium",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "OrthoHydrogen",
    {
      menuName: "Orthohydrogen",
      idName: "OrthoHydrogen",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Oxygen",
    {
      menuName: "Oxygen",
      idName: "Oxygen",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "ParaDeuterium",
    {
      menuName: "Paradeuterium",
      idName: "ParaDeuterium",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "ParaHydrogen",
    {
      menuName: "Parahydrogen",
      idName: "ParaHydrogen",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Propylene",
    {
      menuName: "Propylene",
      idName: "Propylene",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Propyne",
    {
      menuName: "Propyne",
      idName: "Propyne",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R11",
    {
      menuName: "R11",
      idName: "R11",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R113",
    {
      menuName: "R113",
      idName: "R113",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R114",
    {
      menuName: "R114",
      idName: "R114",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R115",
    {
      menuName: "R115",
      idName: "R115",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R116",
    {
      menuName: "R116",
      idName: "R116",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R12",
    {
      menuName: "R12",
      idName: "R12",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R123",
    {
      menuName: "R123",
      idName: "R123",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R1233zd(E)",
    {
      menuName: "R1233zd(E)",
      idName: "R1233zdE",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R1234yf",
    {
      menuName: "R1234yf",
      idName: "R1234yf",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R1234ze(E)",
    {
      menuName: "R1234ze(E)",
      idName: "R1234zeE",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R1234ze(Z)",
    {
      menuName: "R1234ze(Z)",
      idName: "R1234zeZ",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R124",
    {
      menuName: "R124",
      idName: "R124",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R1243zf",
    {
      menuName: "R1243zf",
      idName: "R1243zf",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R125",
    {
      menuName: "R125",
      idName: "R125",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R13",
    {
      menuName: "R13",
      idName: "R13",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R134a",
    {
      menuName: "R134a",
      idName: "R134a",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R13I1",
    {
      menuName: "R13I1",
      idName: "R13I1",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R14",
    {
      menuName: "R14",
      idName: "R14",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R141b",
    {
      menuName: "R141b",
      idName: "R141b",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R142b",
    {
      menuName: "R142b",
      idName: "R142b",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R143a",
    {
      menuName: "R143a",
      idName: "R143a",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R152A",
    {
      menuName: "R152A",
      idName: "R152A",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R161",
    {
      menuName: "R161",
      idName: "R161",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R21",
    {
      menuName: "R21",
      idName: "R21",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R218",
    {
      menuName: "R218",
      idName: "R218",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R22",
    {
      menuName: "R22",
      idName: "R22",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R227EA",
    {
      menuName: "R227EA",
      idName: "R227EA",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R23",
    {
      menuName: "R23",
      idName: "R23",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R236EA",
    {
      menuName: "R236EA",
      idName: "R236EA",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R236FA",
    {
      menuName: "R236FA",
      idName: "R236FA",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R245ca",
    {
      menuName: "R245ca",
      idName: "R245ca",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R245fa",
    {
      menuName: "R245fa",
      idName: "R245fa",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R32",
    {
      menuName: "R32",
      idName: "R32",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R365MFC",
    {
      menuName: "R365MFC",
      idName: "R365MFC",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R40",
    {
      menuName: "R40",
      idName: "R40",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R404A",
    {
      menuName: "R404A",
      idName: "R404A",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R407C",
    {
      menuName: "R407C",
      idName: "R407C",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R41",
    {
      menuName: "R41",
      idName: "R41",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R410A",
    {
      menuName: "R410A",
      idName: "R410A",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "R507A",
    {
      menuName: "R507A",
      idName: "R507A",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "RC318",
    {
      menuName: "RC318",
      idName: "RC318",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "SES36",
    {
      menuName: "SES36",
      idName: "SES36",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "SulfurDioxide",
    {
      menuName: "Sulfur Dioxide",
      idName: "SulfurDioxide",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "SulfurHexafluoride",
    {
      menuName: "Sulfur Hexafluoride",
      idName: "SulfurHexafluoride",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Toluene",
    {
      menuName: "Toluene",
      idName: "Toluene",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Water",
    {
      menuName: "Water (IAPWS-95)",
      idName: "Water",
      category: "Multiphase Compressible",
      basic: true,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "IF97::Water",
    {
      menuName: "Water (IAPWS-IF97)",
      idName: "Water",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "Xenon",
    {
      menuName: "Xenon",
      idName: "Xenon",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "cis-2-Butene",
    {
      menuName: "cis-2-Butene",
      idName: "cis2Butene",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "m-Xylene",
    {
      menuName: "m-Xylene",
      idName: "mXylene",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "n-Butane",
    {
      menuName: "n-Butane",
      idName: "nButane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "n-Decane",
    {
      menuName: "n-Decane",
      idName: "nDecane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "n-Dodecane",
    {
      menuName: "n-Dodecane",
      idName: "nDodecane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "n-Heptane",
    {
      menuName: "n-Heptane",
      idName: "nHeptane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "n-Hexane",
    {
      menuName: "n-Hexane",
      idName: "nHexane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "n-Nonane",
    {
      menuName: "n-Nonane",
      idName: "nNonane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "n-Octane",
    {
      menuName: "n-Octane",
      idName: "nOctane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "n-Pentane",
    {
      menuName: "n-Pentane",
      idName: "nPentane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "n-Propane",
    {
      menuName: "n-Propane",
      idName: "nPropane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "n-Undecane",
    {
      menuName: "n-Undecane",
      idName: "nUndecane",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "o-Xylene",
    {
      menuName: "o-Xylene",
      idName: "oXylene",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "p-Xylene",
    {
      menuName: "p-Xylene",
      idName: "pXylene",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "trans-2-Butene",
    {
      menuName: "trans-2-Butene",
      idName: "trans2Butene",
      category: "Multiphase Compressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::AS10",
    {
      menuName: "Aspen Temper -10, Potassium acetate/formate",
      idName: "AS10",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::AS20",
    {
      menuName: "Aspen Temper -20, Potassium acetate/formate",
      idName: "AS20",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::AS30",
    {
      menuName: "Aspen Temper -30, Potassium acetate/formate",
      idName: "AS30",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::AS40",
    {
      menuName: "Aspen Temper -40, Potassium acetate/formate",
      idName: "AS40",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::AS55",
    {
      menuName: "Aspen Temper -55, Potassium acetate/formate",
      idName: "AS55",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::Acetone",
    {
      menuName: "Acetone, liquid phase at 10 bar",
      idName: "Acetone",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::Air",
    {
      menuName: "Air, gaseous phase at 1 atm (101325 Pa)",
      idName: "Air",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::DEB",
    {
      menuName: "Diethylbenzene mixture - Dowtherm J",
      idName: "DEB",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::DSF",
    {
      menuName: "Dynalene SF",
      idName: "DSF",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::DowJ",
    {
      menuName: "DowthermJ",
      idName: "DowJ",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::DowJ2",
    {
      menuName: "Dowtherm J, Diethylbenzene mixture",
      idName: "DowJ2",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::DowQ",
    {
      menuName: "DowthermQ",
      idName: "DowQ",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::DowQ2",
    {
      menuName: "Dowtherm Q, Diphenylethane/alkylated aromatics",
      idName: "DowQ2",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::Ethanol",
    {
      menuName: "Ethanol, liquid phase at 10 bar",
      idName: "Ethanol",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::FoodAsh",
    {
      menuName: "Food ash model from the 2006 ASHRAE Handbook",
      idName: "FoodAsh",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::FoodCarbohydrate",
    {
      menuName: "Food carbohydrate model from the 2006 ASHRAE Handbook",
      idName: "FoodCarbohydrate",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::FoodFat",
    {
      menuName: "Food fat model from the 2006 ASHRAE Handbook",
      idName: "FoodFat",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::FoodFiber",
    {
      menuName: "Food fiber model from the 2006 ASHRAE Handbook",
      idName: "FoodFiber",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::FoodIce",
    {
      menuName: "Food ice model from the 2006 ASHRAE Handbook",
      idName: "FoodIce",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::FoodProtein",
    {
      menuName: "Food protein model from the 2006 ASHRAE Handbook",
      idName: "FoodProtein",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::FoodWater",
    {
      menuName: "Food water model from the 2006 ASHRAE Handbook",
      idName: "FoodWater",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::HC10",
    {
      menuName: "Dynalene HC10",
      idName: "HC10",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::HC20",
    {
      menuName: "Dynalene HC20",
      idName: "HC20",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::HC30",
    {
      menuName: "Dynalene HC30",
      idName: "HC30",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::HC40",
    {
      menuName: "Dynalene HC40",
      idName: "HC40",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::HC50",
    {
      menuName: "Dynalene HC50",
      idName: "HC50",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::HCB",
    {
      menuName: "Hydrocarbon blend - Dynalene MV",
      idName: "HCB",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::HCM",
    {
      menuName: "Hydrocarbon mixture - Gilotherm D12",
      idName: "HCM",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::HFE",
    {
      menuName: "Hydrofluoroether - HFE-7100 3M Novec",
      idName: "HFE",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::HFE2",
    {
      menuName: "HFE-7100, Hydrofluoroether",
      idName: "HFE2",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::HY20",
    {
      menuName: "HYCOOL 20, Potassium formate",
      idName: "HY20",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::HY30",
    {
      menuName: "HyCool 30, Potassium formate",
      idName: "HY30",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::HY40",
    {
      menuName: "HyCool 40, Potassium formate",
      idName: "HY40",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::HY45",
    {
      menuName: "HyCool 45, Potassium formate",
      idName: "HY45",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::HY50",
    {
      menuName: "HyCool 50, Potassium formate",
      idName: "HY50",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::Hexane",
    {
      menuName: "Hexane, liquid phase at 10 bar",
      idName: "Hexane",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::LiqNa",
    {
      menuName: "LiqNa",
      idName: "LiqNa",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::NBS",
    {
      menuName: "NBS, Water",
      idName: "NBS",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::NaK",
    {
      menuName: "Nitrate salt, 0.6 NaNO3 and 0.4 KNO3",
      idName: "NaK",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::PBB",
    {
      menuName: "Pirobloc HTF-BASIC",
      idName: "PBB",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::PCL",
    {
      menuName: "Paracryol, Aliphatic Hydrocarbon",
      idName: "PCL",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::PCR",
    {
      menuName: "Paratherm CR",
      idName: "PCR",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::PGLT",
    {
      menuName: "Paratherm GLT",
      idName: "PGLT",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::PHE",
    {
      menuName: "Paratherm HE",
      idName: "PHE",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::PHR",
    {
      menuName: "Paratherm HR",
      idName: "PHR",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::PLR",
    {
      menuName: "Paratherm LR",
      idName: "PLR",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::PMR",
    {
      menuName: "Paratherm MR",
      idName: "PMR",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::PMS1",
    {
      menuName: "Polydimethylsiloxan 1 - Baysilone KT3",
      idName: "PMS1",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::PMS2",
    {
      menuName: "Polydimethylsiloxan 2 - Syltherm XLT",
      idName: "PMS2",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::PNF",
    {
      menuName: "Paratherm NF",
      idName: "PNF",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::PNF2",
    {
      menuName: "Paratherm NF, Hydrotreated mineral oil",
      idName: "PNF2",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::S800",
    {
      menuName: "Syltherm 800",
      idName: "S800",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::SAB",
    {
      menuName: "Synthetic alkyl benzene - Marlotherm X",
      idName: "SAB",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::T66",
    {
      menuName: "Therminol66",
      idName: "T66",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::T72",
    {
      menuName: "Therminol72",
      idName: "T72",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::TCO",
    {
      menuName: "Citrus oil terpene - d-Limonene",
      idName: "TCO",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::TD12",
    {
      menuName: "TherminolD12",
      idName: "TD12",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::TVP1",
    {
      menuName: "TherminolVP1",
      idName: "TVP1",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::TVP1869",
    {
      menuName: "Thermogen VP 1869",
      idName: "TVP1869",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::TX22",
    {
      menuName: "Texatherm22",
      idName: "TX22",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::TY10",
    {
      menuName: "Tyfoxit 1.10, Potassium Acetate",
      idName: "TY10",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::TY15",
    {
      menuName: "Tyfoxit 1.15, Potassium Acetate",
      idName: "TY15",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::TY20",
    {
      menuName: "Tyfoxit 1.20, Potassium Acetate",
      idName: "TY20",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::TY24",
    {
      menuName: "Tyfoxit 1.24, Potassium Acetate",
      idName: "TY24",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::Water",
    {
      menuName: "Water, fit of EOS from 1 bar to 100 bar",
      idName: "Water",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::XLT",
    {
      menuName: "SylthermXLT",
      idName: "XLT",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::XLT2",
    {
      menuName: "Syltherm XLT, Polydimethylsiloxan",
      idName: "XLT2",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::ZS10",
    {
      menuName: "Zitrec S10, Potassium formate/Sodium propionate",
      idName: "ZS10",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::ZS25",
    {
      menuName: "Zitrec S25, Potassium formate/Sodium propionate",
      idName: "ZS25",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::ZS40",
    {
      menuName: "Zitrec S40, Potassium formate/Sodium propionate",
      idName: "ZS40",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::ZS45",
    {
      menuName: "Zitrec S45, Potassium formate/Sodium propionate",
      idName: "ZS45",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::ZS55",
    {
      menuName: "Zitrec S55, Potassium formate/Sodium propionate",
      idName: "ZS55",
      category: "Incompressible",
      basic: false,
      mixture: false,
      minConcentration: null,
      maxConcentration: null,
    }
  ],
  [
    "INCOMP::FRE",
    {
      menuName: "Freezium, Potassium Formate",
      idName: "FRE",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.19,
      maxConcentration: 0.5,
    }
  ],
  [
    "INCOMP::IceEA",
    {
      menuName: "Ice slurry with Ethanol",
      idName: "IceEA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.05,
      maxConcentration: 0.35,
    }
  ],
  [
    "INCOMP::IceNA",
    {
      menuName: "Ice slurry with NaCl",
      idName: "IceNA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.05,
      maxConcentration: 0.35,
    }
  ],
  [
    "INCOMP::IcePG",
    {
      menuName: "Ice slurry with Propylene Glycol",
      idName: "IcePG",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.05,
      maxConcentration: 0.35,
    }
  ],
  [
    "INCOMP::LiBr",
    {
      menuName: "Lithium-bromide solution - aq",
      idName: "LiBr",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.75,
    }
  ],
  [
    "INCOMP::MAM",
    {
      menuName: "Ammonia (NH3) - aq",
      idName: "MAM",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.3,
    }
  ],
  [
    "INCOMP::MAM2",
    {
      menuName: "Melinder, Ammonia",
      idName: "MAM2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.08,
      maxConcentration: 0.24,
    }
  ],
  [
    "INCOMP::MCA",
    {
      menuName: "Calcium Chloride (CaCl2) - aq",
      idName: "MCA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.3,
    }
  ],
  [
    "INCOMP::MCA2",
    {
      menuName: "Melinder, Calcium Chloride",
      idName: "MCA2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.09,
      maxConcentration: 0.29,
    }
  ],
  [
    "INCOMP::MEA",
    {
      menuName: "Ethyl Alcohol (Ethanol) - aq",
      idName: "MEA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.6,
    }
  ],
  [
    "INCOMP::MEA2",
    {
      menuName: "Melinder, Ethanol",
      idName: "MEA2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.11,
      maxConcentration: 0.6,
    }
  ],
  [
    "INCOMP::MEG",
    {
      menuName: "Ethylene Glycol - aq",
      idName: "MEG",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: true,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.6,
    }
  ],
  [
    "INCOMP::MEG2",
    {
      menuName: "Melinder, Ethylene Glycol",
      idName: "MEG2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.56,
    }
  ],
  [
    "INCOMP::MGL",
    {
      menuName: "Glycerol - aq",
      idName: "MGL",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.6,
    }
  ],
  [
    "INCOMP::MGL2",
    {
      menuName: "Melinder, Glycerol",
      idName: "MGL2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.2,
      maxConcentration: 0.63,
    }
  ],
  [
    "INCOMP::MITSW",
    {
      menuName: "MIT Seawater",
      idName: "MITSW",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.12,
    }
  ],
  [
    "INCOMP::MKA",
    {
      menuName: "Potassium Acetate (CH3CO2K) - aq",
      idName: "MKA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.45,
    }
  ],
  [
    "INCOMP::MKA2",
    {
      menuName: "Melinder, Potassium Acetate",
      idName: "MKA2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.11,
      maxConcentration: 0.41,
    }
  ],
  [
    "INCOMP::MKC",
    {
      menuName: "Potassium Carbonate (K2CO3) - aq",
      idName: "MKC",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.4,
    }
  ],
  [
    "INCOMP::MKC2",
    {
      menuName: "Melinder, Potassium Carbonate",
      idName: "MKC2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.39,
    }
  ],
  [
    "INCOMP::MKF",
    {
      menuName: "Potassium Formate (CHKO2) - aq",
      idName: "MKF",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.48,
    }
  ],
  [
    "INCOMP::MLI",
    {
      menuName: "Lithium Chloride (LiCl) - aq",
      idName: "MLI",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.24,
    }
  ],
  [
    "INCOMP::MMA",
    {
      menuName: "Methyl Alcohol (Methanol) - aq",
      idName: "MMA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.6,
    }
  ],
  [
    "INCOMP::MMA2",
    {
      menuName: "Melinder, Methanol",
      idName: "MMA2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.08,
      maxConcentration: 0.47,
    }
  ],
  [
    "INCOMP::MMG",
    {
      menuName: "MgCl2 - aq",
      idName: "MMG",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.3,
    }
  ],
  [
    "INCOMP::MMG2",
    {
      menuName: "Melinder, Magnesium Chloride",
      idName: "MMG2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.21,
    }
  ],
  [
    "INCOMP::MNA",
    {
      menuName: "Sodium Chloride (NaCl) - aq",
      idName: "MNA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.23,
    }
  ],
  [
    "INCOMP::MNA2",
    {
      menuName: "Melinder, Sodium Chloride",
      idName: "MNA2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.23,
    }
  ],
  [
    "INCOMP::MPG",
    {
      menuName: "Propylene Glycol - aq",
      idName: "MPG",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: true,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 0.6,
    }
  ],
  [
    "INCOMP::MPG2",
    {
      menuName: "Melinder, Propylene Glycol",
      idName: "MPG2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.15,
      maxConcentration: 0.57,
    }
  ],
  [
    "INCOMP::VCA",
    {
      menuName: "VDI, Calcium Cloride",
      idName: "VCA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.15,
      maxConcentration: 0.3,
    }
  ],
  [
    "INCOMP::VKC",
    {
      menuName: "VDI, Potassium Carbonate",
      idName: "VKC",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.13,
      maxConcentration: 0.39,
    }
  ],
  [
    "INCOMP::VMA",
    {
      menuName: "VDI, Methanol",
      idName: "VMA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.1,
      maxConcentration: 0.9,
    }
  ],
  [
    "INCOMP::VMG",
    {
      menuName: "VDI, Magnesium Chloride",
      idName: "VMG",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.07,
      maxConcentration: 0.21,
    }
  ],
  [
    "INCOMP::VNA",
    {
      menuName: "VDI, Sodium Chloride",
      idName: "VNA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.07,
      maxConcentration: 0.23,
    }
  ],
  [
    "INCOMP::AEG",
    {
      menuName: "ASHRAE, Ethylene Glycol",
      idName: "AEG",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: true,
      mixture: true,
      minConcentration: 0.1,
      maxConcentration: 0.6,
    }
  ],
  [
    "INCOMP::AKF",
    {
      menuName: "Antifrogen KF, Potassium Formate",
      idName: "AKF",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.4,
      maxConcentration: 1,
    }
  ],
  [
    "INCOMP::AL",
    {
      menuName: "Antifrogen L, Propylene Glycol",
      idName: "AL",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.1,
      maxConcentration: 0.6,
    }
  ],
  [
    "INCOMP::AN",
    {
      menuName: "Antifrogen N, Ethylene Glycol",
      idName: "AN",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.1,
      maxConcentration: 0.6,
    }
  ],
  [
    "INCOMP::APG",
    {
      menuName: "ASHRAE, Propylene Glycol",
      idName: "APG",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: true,
      mixture: true,
      minConcentration: 0.1,
      maxConcentration: 0.6,
    }
  ],
  [
    "INCOMP::GKN",
    {
      menuName: "Glykosol N, Ethylene Glycol",
      idName: "GKN",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.1,
      maxConcentration: 0.6,
    }
  ],
  [
    "INCOMP::PK2",
    {
      menuName: "Pekasol 2000, K acetate/formate",
      idName: "PK2",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.3,
      maxConcentration: 1,
    }
  ],
  [
    "INCOMP::PKL",
    {
      menuName: "Pekasol L, Propylene Glycol",
      idName: "PKL",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.1,
      maxConcentration: 0.6,
    }
  ],
  [
    "INCOMP::ZAC",
    {
      menuName: "Zitrec AC, Corrosion Inhibitor",
      idName: "ZAC",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.06,
      maxConcentration: 0.5,
    }
  ],
  [
    "INCOMP::ZFC",
    {
      menuName: "Zitrec FC, Propylene Glycol",
      idName: "ZFC",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.3,
      maxConcentration: 0.6,
    }
  ],
  [
    "INCOMP::ZLC",
    {
      menuName: "Zitrec LC, Propylene Glycol",
      idName: "ZLC",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.3,
      maxConcentration: 0.7,
    }
  ],
  [
    "INCOMP::ZM",
    {
      menuName: "Zitrec M, Ethylene Glycol",
      idName: "ZM",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0,
      maxConcentration: 1,
    }
  ],
  [
    "INCOMP::ZMC",
    {
      menuName: "Zitrec MC, Ethylene Glycol",
      idName: "ZMC",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      mixture: true,
      minConcentration: 0.3,
      maxConcentration: 0.7,
    }
  ],
]);


export const FLUID_HA_PROPS_PARAMETERS = new Map([
  [
    "B",
    {
      idName: "Twb",
      units: "K",
      input: true,
      output: true,
      description: "Wet-Bulb Temperature",
    }
  ],
  [
    "C",
    {
      idName: "C",
      units: "J/kg/K",
      input: false,
      output: true,
      description: "Mixture specific heat per unit dry air",
    }
  ],
  [
    "Cha",
    {
      idName: "Cha",
      units: "J/kg/K",
      input: false,
      output: true,
      description: "Mixture specific heat per unit humid air",
    }
  ],
  [
    "CV",
    {
      idName: "Cv",
      units: "J/kg/K",
      input: false,
      output: true,
      description: "Mixture specific heat at constant volume per unit dry air",
    }
  ],
  [
    "Cvha",
    {
      idName: "Cvha",
      units: "J/kg/K",
      input: false,
      output: true,
      description: "Mixture specific heat at constant volume per unit humid air",
    }
  ],
  [
    "D",
    {
      idName: "Tdp",
      units: "K",
      input: true,
      output: true,
      description: "Dew-Point Temperature",
    }
  ],
  [
    "H",
    {
      idName: "H",
      units: "J/kg",
      input: true,
      output: true,
      description: "Mixture enthalpy per mass dry air",
    }
  ],
  [
    "Hha",
    {
      idName: "Hha",
      units: "J/kg",
      input: true,
      output: true,
      description: "Mixture enthalpy per mass humid air",
    }
  ],
  [
    "K",
    {
      idName: "K",
      units: "W/m/K",
      input: false,
      output: true,
      description: "Mixture thermal conductivity",
    }
  ],
  [
    "M",
    {
      idName: "Visc",
      units: "Pa*s",
      input: false,
      output: true,
      description: "Mixture viscosity",
    }
  ],
  [
    "psi_w",
    {
      idName: "Y",
      units: "",
      input: true,
      output: true,
      description: "Water mole fraction (mol water/mol humid air)",
    }
  ],
  [
    "P",
    {
      idName: "P",
      units: "Pa",
      input: true,
      output: false,
      description: "Pressure",
    }
  ],
  [
    "P_w",
    {
      idName: "Pw",
      units: "Pa",
      input: true,
      output: false,
      description: "Partial pressure of water vapor",
    }
  ],
  [
    "R",
    {
      idName: "Rh",
      units: "",
      input: true,
      output: true,
      description: "Relative humidity in [0, 1]",
    }
  ],
  [
    "S",
    {
      idName: "S",
      units: "J/kg/K",
      input: true,
      output: true,
      description: "Mixture entropy per mass dry air",
    }
  ],
  [
    "Sha",
    {
      idName: "Sha",
      units: "J/kg/K",
      input: true,
      output: true,
      description: "Mixture entropy per mass humid air",
    }
  ],
  [
    "T",
    {
      idName: "T",
      units: "K",
      input: true,
      output: true,
      description: "Dry-Bulb Temperature",
    }
  ],
  [
    "V",
    {
      idName: "Vda",
      units: "m^3/kg",
      input: true,
      output: true,
      description: "Mixture volume per mass dry air",
    }
  ],
  [
    "Vha",
    {
      idName: "Vha",
      units: "m^3/kg",
      input: true,
      output: true,
      description: "Mixture volume per mass humid air",
    }
  ],
  [
    "W",
    {
      idName: "W",
      units: "",
      input: true,
      output: true,
      description: "Humidity Ratio (kg water/kg dry air)",
    }
  ],
  [
    "Z",
    {
      idName: "Z",
      units: "",
      input: true,
      output: false,
      description: "Compressibility factor (Z=pv/(RT))",
    }
  ],
]);
