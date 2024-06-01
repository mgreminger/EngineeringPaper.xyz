export const FLUID_PROPS_PARAMETERS = new Map([
  [
    "DELTA",
    {
      idName: "Delta",
      units: "",
      input: true,
      output: true,
      trivial: false,
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: true,
      incompressibleOutput: true,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: true,
      incompressibleOutput: true,
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
      incompressibleInput: true,
      incompressibleOutput: true,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: true,
      incompressibleOutput: true,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: true,
      incompressibleOutput: true,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: true,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: true,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: true,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: true,
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
      incompressibleInput: false,
      incompressibleOutput: true,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      incompressibleInput: false,
      incompressibleOutput: true,
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
      incompressibleInput: false,
      incompressibleOutput: false,
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
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Acetone",
    {
      menuName: "Acetone",
      idName: "Acetone",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Air",
    {
      menuName: "Air (Dry)",
      idName: "Air",
      category: "Compressible",
      basic: true,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "HumidAir",
    {
      menuName: "Air (Humid)",
      idName: "HumidAir",
      category: "Compressible",
      basic: true,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Ammonia",
    {
      menuName: "Ammonia",
      idName: "Ammonia",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Argon",
    {
      menuName: "Argon",
      idName: "Argon",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Benzene",
    {
      menuName: "Benzene",
      idName: "Benzene",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "CarbonDioxide",
    {
      menuName: "Carbon Dioxide",
      idName: "CarbonDioxide",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "CarbonMonoxide",
    {
      menuName: "Carbon Monoxide",
      idName: "CarbonMonoxide",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "CarbonylSulfide",
    {
      menuName: "Carbonyl Sulfide",
      idName: "CarbonylSulfide",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "CycloHexane",
    {
      menuName: "Cyclohexane",
      idName: "Cyclohexane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "CycloPropane",
    {
      menuName: "Cyclopropane",
      idName: "Cyclopropane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Cyclopentane",
    {
      menuName: "Cyclopentane",
      idName: "Cyclopentane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "D4",
    {
      menuName: "D4",
      idName: "D4",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "D5",
    {
      menuName: "D5",
      idName: "D5",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "D6",
    {
      menuName: "D6",
      idName: "D6",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Deuterium",
    {
      menuName: "Deuterium",
      idName: "Deuterium",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Dichloroethane",
    {
      menuName: "Dichloroethane",
      idName: "Dichloroethane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "DiethylEther",
    {
      menuName: "Diethyl Ether",
      idName: "DiethylEther",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "DimethylCarbonate",
    {
      menuName: "Dimethyl Carbonate",
      idName: "DimethylCarbonate",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "DimethylEther",
    {
      menuName: "Dimethyl Ether",
      idName: "DimethylEther",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Ethane",
    {
      menuName: "Ethane",
      idName: "Ethane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Ethanol",
    {
      menuName: "Ethanol",
      idName: "Ethanol",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "EthylBenzene",
    {
      menuName: "Ethylbenzene",
      idName: "Ethylbenzene",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Ethylene",
    {
      menuName: "Ethylene",
      idName: "Ethylene",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "EthyleneOxide",
    {
      menuName: "Ethylene Oxide",
      idName: "EthyleneOxide",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Fluorine",
    {
      menuName: "Fluorine",
      idName: "Fluorine",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "HFE143m",
    {
      menuName: "HFE-143m",
      idName: "HFE143m",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "HeavyWater",
    {
      menuName: "Heavy Water",
      idName: "HeavyWater",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Helium",
    {
      menuName: "Helium",
      idName: "Helium",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Hydrogen",
    {
      menuName: "Hydrogen",
      idName: "Hydrogen",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "HydrogenChloride",
    {
      menuName: "Hydrogen Chloride",
      idName: "HydrogenChloride",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "HydrogenSulfide",
    {
      menuName: "Hydrogen Sulfide",
      idName: "HydrogenSulfide",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "IsoButane",
    {
      menuName: "Isobutane",
      idName: "Isobutane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "IsoButene",
    {
      menuName: "Isobutene",
      idName: "Isobutene",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Isohexane",
    {
      menuName: "Isohexane",
      idName: "Isohexane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Isopentane",
    {
      menuName: "Isopentane",
      idName: "Isopentane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Krypton",
    {
      menuName: "Krypton",
      idName: "Krypton",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "MD2M",
    {
      menuName: "MD2M (Decamethyltetrasiloxane)",
      idName: "MD2M",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "MD3M",
    {
      menuName: "MD3M (Dodecamethylpentasiloxane)",
      idName: "MD3M",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "MD4M",
    {
      menuName: "MD4M (Tetradecamethylhexasiloxane)",
      idName: "MD4M",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "MDM",
    {
      menuName: "MDM (Octamethyltrisiloxane)",
      idName: "MDM",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "MM",
    {
      menuName: "MM (Hexamethyldisiloxane)",
      idName: "MM",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Methane",
    {
      menuName: "Methane",
      idName: "Methane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Methanol",
    {
      menuName: "Methanol",
      idName: "Methanol",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "MethylLinoleate",
    {
      menuName: "Methyl Linoleate",
      idName: "MethylLinoleate",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "MethylLinolenate",
    {
      menuName: "Methyl Linolenate",
      idName: "MethylLinolenate",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "MethylOleate",
    {
      menuName: "Methyl Oleate",
      idName: "MethylOleate",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "MethylPalmitate",
    {
      menuName: "Methyl Palmitate",
      idName: "MethylPalmitate",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "MethylStearate",
    {
      menuName: "Methyl Stearate",
      idName: "MethylStearate",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Neon",
    {
      menuName: "Neon",
      idName: "Neon",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Neopentane",
    {
      menuName: "Neopentane",
      idName: "Neopentane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Nitrogen",
    {
      menuName: "Nitrogen",
      idName: "Nitrogen",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "NitrousOxide",
    {
      menuName: "Nitrous Oxide",
      idName: "NitrousOxide",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Novec649",
    {
      menuName: "Novec 649",
      idName: "Novec649",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "OrthoDeuterium",
    {
      menuName: "Orthodeuterium",
      idName: "OrthoDeuterium",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "OrthoHydrogen",
    {
      menuName: "Orthohydrogen",
      idName: "OrthoHydrogen",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Oxygen",
    {
      menuName: "Oxygen",
      idName: "Oxygen",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "ParaDeuterium",
    {
      menuName: "Paradeuterium",
      idName: "ParaDeuterium",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "ParaHydrogen",
    {
      menuName: "Parahydrogen",
      idName: "ParaHydrogen",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Propylene",
    {
      menuName: "Propylene",
      idName: "Propylene",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Propyne",
    {
      menuName: "Propyne",
      idName: "Propyne",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R11",
    {
      menuName: "R11",
      idName: "R11",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R113",
    {
      menuName: "R113",
      idName: "R113",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R114",
    {
      menuName: "R114",
      idName: "R114",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R115",
    {
      menuName: "R115",
      idName: "R115",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R116",
    {
      menuName: "R116",
      idName: "R116",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R12",
    {
      menuName: "R12",
      idName: "R12",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R123",
    {
      menuName: "R123",
      idName: "R123",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R1233zd(E)",
    {
      menuName: "R1233zd(E)",
      idName: "R1233zdE",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R1234yf",
    {
      menuName: "R1234yf",
      idName: "R1234yf",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R1234ze(E)",
    {
      menuName: "R1234ze(E)",
      idName: "R1234zeE",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R1234ze(Z)",
    {
      menuName: "R1234ze(Z)",
      idName: "R1234zeZ",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R124",
    {
      menuName: "R124",
      idName: "R124",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R1243zf",
    {
      menuName: "R1243zf",
      idName: "R1243zf",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R125",
    {
      menuName: "R125",
      idName: "R125",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R13",
    {
      menuName: "R13",
      idName: "R13",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R134a",
    {
      menuName: "R134a",
      idName: "R134a",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R13I1",
    {
      menuName: "R13I1",
      idName: "R13I1",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R14",
    {
      menuName: "R14",
      idName: "R14",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R141b",
    {
      menuName: "R141b",
      idName: "R141b",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R142b",
    {
      menuName: "R142b",
      idName: "R142b",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R143a",
    {
      menuName: "R143a",
      idName: "R143a",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R152A",
    {
      menuName: "R152A",
      idName: "R152A",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R161",
    {
      menuName: "R161",
      idName: "R161",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R21",
    {
      menuName: "R21",
      idName: "R21",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R218",
    {
      menuName: "R218",
      idName: "R218",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R22",
    {
      menuName: "R22",
      idName: "R22",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R227EA",
    {
      menuName: "R227EA",
      idName: "R227EA",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R23",
    {
      menuName: "R23",
      idName: "R23",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R236EA",
    {
      menuName: "R236EA",
      idName: "R236EA",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R236FA",
    {
      menuName: "R236FA",
      idName: "R236FA",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R245ca",
    {
      menuName: "R245ca",
      idName: "R245ca",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R245fa",
    {
      menuName: "R245fa",
      idName: "R245fa",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R32",
    {
      menuName: "R32",
      idName: "R32",
      category: "Compressible",
      basic: true,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R365MFC",
    {
      menuName: "R365MFC",
      idName: "R365MFC",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R40",
    {
      menuName: "R40",
      idName: "R40",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R404A",
    {
      menuName: "R404A",
      idName: "R404A",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R407C",
    {
      menuName: "R407C",
      idName: "R407C",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R41",
    {
      menuName: "R41",
      idName: "R41",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R410A",
    {
      menuName: "R410A",
      idName: "R410A",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "R507A",
    {
      menuName: "R507A",
      idName: "R507A",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "RC318",
    {
      menuName: "RC318",
      idName: "RC318",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "SES36",
    {
      menuName: "SES36",
      idName: "SES36",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "SulfurDioxide",
    {
      menuName: "Sulfur Dioxide",
      idName: "SulfurDioxide",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "SulfurHexafluoride",
    {
      menuName: "Sulfur Hexafluoride",
      idName: "SulfurHexafluoride",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Toluene",
    {
      menuName: "Toluene",
      idName: "Toluene",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Water",
    {
      menuName: "Water (IAPWS-95, more accurate)",
      idName: "Water",
      category: "Compressible",
      basic: true,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "IF97::Water",
    {
      menuName: "Water (IAPWS-IF97, faster)",
      idName: "Water",
      category: "Compressible",
      basic: true,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Xenon",
    {
      menuName: "Xenon",
      idName: "Xenon",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "cis-2-Butene",
    {
      menuName: "cis-2-Butene",
      idName: "cis2Butene",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "m-Xylene",
    {
      menuName: "m-Xylene",
      idName: "mXylene",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "n-Butane",
    {
      menuName: "n-Butane",
      idName: "nButane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "n-Decane",
    {
      menuName: "n-Decane",
      idName: "nDecane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "n-Dodecane",
    {
      menuName: "n-Dodecane",
      idName: "nDodecane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "n-Heptane",
    {
      menuName: "n-Heptane",
      idName: "nHeptane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "n-Hexane",
    {
      menuName: "n-Hexane",
      idName: "nHexane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "n-Nonane",
    {
      menuName: "n-Nonane",
      idName: "nNonane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "n-Octane",
    {
      menuName: "n-Octane",
      idName: "nOctane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "n-Pentane",
    {
      menuName: "n-Pentane",
      idName: "nPentane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "n-Propane",
    {
      menuName: "n-Propane",
      idName: "nPropane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "n-Undecane",
    {
      menuName: "n-Undecane",
      idName: "nUndecane",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "o-Xylene",
    {
      menuName: "o-Xylene",
      idName: "oXylene",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "p-Xylene",
    {
      menuName: "p-Xylene",
      idName: "pXylene",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "trans-2-Butene",
    {
      menuName: "trans-2-Butene",
      idName: "trans2Butene",
      category: "Compressible",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::AS10",
    {
      menuName: "Aspen Temper -10, Potassium acetate/formate",
      idName: "AS10",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::AS20",
    {
      menuName: "Aspen Temper -20, Potassium acetate/formate",
      idName: "AS20",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::AS30",
    {
      menuName: "Aspen Temper -30, Potassium acetate/formate",
      idName: "AS30",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::AS40",
    {
      menuName: "Aspen Temper -40, Potassium acetate/formate",
      idName: "AS40",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::AS55",
    {
      menuName: "Aspen Temper -55, Potassium acetate/formate",
      idName: "AS55",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::Acetone",
    {
      menuName: "Acetone, liquid phase at 10 bar",
      idName: "Acetone",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::Air",
    {
      menuName: "Air, gaseous phase at 1 atm (101325 Pa)",
      idName: "Air",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::DEB",
    {
      menuName: "Diethylbenzene mixture - Dowtherm J",
      idName: "DEB",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::DSF",
    {
      menuName: "Dynalene SF",
      idName: "DSF",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::DowJ",
    {
      menuName: "DowthermJ",
      idName: "DowJ",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::DowJ2",
    {
      menuName: "Dowtherm J, Diethylbenzene mixture",
      idName: "DowJ2",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::DowQ",
    {
      menuName: "DowthermQ",
      idName: "DowQ",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::DowQ2",
    {
      menuName: "Dowtherm Q, Diphenylethane/alkylated aromatics",
      idName: "DowQ2",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::Ethanol",
    {
      menuName: "Ethanol, liquid phase at 10 bar",
      idName: "Ethanol",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::FoodAsh",
    {
      menuName: "Food ash model from the 2006 ASHRAE Handbook",
      idName: "FoodAsh",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::FoodCarbohydrate",
    {
      menuName: "Food carbohydrate model from the 2006 ASHRAE Handbook",
      idName: "FoodCarbohydrate",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::FoodFat",
    {
      menuName: "Food fat model from the 2006 ASHRAE Handbook",
      idName: "FoodFat",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::FoodFiber",
    {
      menuName: "Food fiber model from the 2006 ASHRAE Handbook",
      idName: "FoodFiber",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::FoodIce",
    {
      menuName: "Food ice model from the 2006 ASHRAE Handbook",
      idName: "FoodIce",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::FoodProtein",
    {
      menuName: "Food protein model from the 2006 ASHRAE Handbook",
      idName: "FoodProtein",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::FoodWater",
    {
      menuName: "Food water model from the 2006 ASHRAE Handbook",
      idName: "FoodWater",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::HC10",
    {
      menuName: "Dynalene HC10",
      idName: "HC10",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::HC20",
    {
      menuName: "Dynalene HC20",
      idName: "HC20",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::HC30",
    {
      menuName: "Dynalene HC30",
      idName: "HC30",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::HC40",
    {
      menuName: "Dynalene HC40",
      idName: "HC40",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::HC50",
    {
      menuName: "Dynalene HC50",
      idName: "HC50",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::HCB",
    {
      menuName: "Hydrocarbon blend - Dynalene MV",
      idName: "HCB",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::HCM",
    {
      menuName: "Hydrocarbon mixture - Gilotherm D12",
      idName: "HCM",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::HFE",
    {
      menuName: "Hydrofluoroether - HFE-7100 3M Novec",
      idName: "HFE",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::HFE2",
    {
      menuName: "HFE-7100, Hydrofluoroether",
      idName: "HFE2",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::HY20",
    {
      menuName: "HYCOOL 20, Potassium formate",
      idName: "HY20",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::HY30",
    {
      menuName: "HyCool 30, Potassium formate",
      idName: "HY30",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::HY40",
    {
      menuName: "HyCool 40, Potassium formate",
      idName: "HY40",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::HY45",
    {
      menuName: "HyCool 45, Potassium formate",
      idName: "HY45",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::HY50",
    {
      menuName: "HyCool 50, Potassium formate",
      idName: "HY50",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::Hexane",
    {
      menuName: "Hexane, liquid phase at 10 bar",
      idName: "Hexane",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::LiqNa",
    {
      menuName: "LiqNa",
      idName: "LiqNa",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::NBS",
    {
      menuName: "NBS, Water",
      idName: "NBS",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::NaK",
    {
      menuName: "Nitrate salt, 0.6 NaNO3 and 0.4 KNO3",
      idName: "NaK",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::PBB",
    {
      menuName: "Pirobloc HTF-BASIC",
      idName: "PBB",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::PCL",
    {
      menuName: "Paracryol, Aliphatic Hydrocarbon",
      idName: "PCL",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::PCR",
    {
      menuName: "Paratherm CR",
      idName: "PCR",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::PGLT",
    {
      menuName: "Paratherm GLT",
      idName: "PGLT",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::PHE",
    {
      menuName: "Paratherm HE",
      idName: "PHE",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::PHR",
    {
      menuName: "Paratherm HR",
      idName: "PHR",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::PLR",
    {
      menuName: "Paratherm LR",
      idName: "PLR",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::PMR",
    {
      menuName: "Paratherm MR",
      idName: "PMR",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::PMS1",
    {
      menuName: "Polydimethylsiloxan 1 - Baysilone KT3",
      idName: "PMS1",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::PMS2",
    {
      menuName: "Polydimethylsiloxan 2 - Syltherm XLT",
      idName: "PMS2",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::PNF",
    {
      menuName: "Paratherm NF",
      idName: "PNF",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::PNF2",
    {
      menuName: "Paratherm NF, Hydrotreated mineral oil",
      idName: "PNF2",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::S800",
    {
      menuName: "Syltherm 800",
      idName: "S800",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::SAB",
    {
      menuName: "Synthetic alkyl benzene - Marlotherm X",
      idName: "SAB",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::T66",
    {
      menuName: "Therminol66",
      idName: "T66",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::T72",
    {
      menuName: "Therminol72",
      idName: "T72",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::TCO",
    {
      menuName: "Citrus oil terpene - d-Limonene",
      idName: "TCO",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::TD12",
    {
      menuName: "TherminolD12",
      idName: "TD12",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::TVP1",
    {
      menuName: "TherminolVP1",
      idName: "TVP1",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::TVP1869",
    {
      menuName: "Thermogen VP 1869",
      idName: "TVP1869",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::TX22",
    {
      menuName: "Texatherm22",
      idName: "TX22",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::TY10",
    {
      menuName: "Tyfoxit 1.10, Potassium Acetate",
      idName: "TY10",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::TY15",
    {
      menuName: "Tyfoxit 1.15, Potassium Acetate",
      idName: "TY15",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::TY20",
    {
      menuName: "Tyfoxit 1.20, Potassium Acetate",
      idName: "TY20",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::TY24",
    {
      menuName: "Tyfoxit 1.24, Potassium Acetate",
      idName: "TY24",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::Water",
    {
      menuName: "Water, fit of EOS from 1 bar to 100 bar",
      idName: "Water",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::XLT",
    {
      menuName: "SylthermXLT",
      idName: "XLT",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::XLT2",
    {
      menuName: "Syltherm XLT, Polydimethylsiloxan",
      idName: "XLT2",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::ZS10",
    {
      menuName: "Zitrec S10, Potassium formate/Sodium propionate",
      idName: "ZS10",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::ZS25",
    {
      menuName: "Zitrec S25, Potassium formate/Sodium propionate",
      idName: "ZS25",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::ZS40",
    {
      menuName: "Zitrec S40, Potassium formate/Sodium propionate",
      idName: "ZS40",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::ZS45",
    {
      menuName: "Zitrec S45, Potassium formate/Sodium propionate",
      idName: "ZS45",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::ZS55",
    {
      menuName: "Zitrec S55, Potassium formate/Sodium propionate",
      idName: "ZS55",
      category: "Incompressible",
      basic: false,
      incompressible: true,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "INCOMP::FRE",
    {
      menuName: "Freezium, Potassium Formate",
      idName: "FRE",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.19,
      maxConcentration: 0.5,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.19 - 0.5 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::IceEA",
    {
      menuName: "Ice slurry with Ethanol",
      idName: "IceEA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.05,
      maxConcentration: 0.35,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.05 - 0.35 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::IceNA",
    {
      menuName: "Ice slurry with NaCl",
      idName: "IceNA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.05,
      maxConcentration: 0.35,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.05 - 0.35 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::IcePG",
    {
      menuName: "Ice slurry with Propylene Glycol",
      idName: "IcePG",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.05,
      maxConcentration: 0.35,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.05 - 0.35 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::LiBr",
    {
      menuName: "Lithium-bromide solution - aq",
      idName: "LiBr",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.75,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.75 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MAM",
    {
      menuName: "Ammonia (NH3) - aq",
      idName: "MAM",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.3,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.3 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MAM2",
    {
      menuName: "Melinder, Ammonia",
      idName: "MAM2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.08,
      maxConcentration: 0.24,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.08 - 0.24 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MCA",
    {
      menuName: "Calcium Chloride (CaCl2) - aq",
      idName: "MCA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.3,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.3 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MCA2",
    {
      menuName: "Melinder, Calcium Chloride",
      idName: "MCA2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.09,
      maxConcentration: 0.29,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.09 - 0.29 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MEA",
    {
      menuName: "Ethyl Alcohol (Ethanol) - aq",
      idName: "MEA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.6,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.6 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MEA2",
    {
      menuName: "Melinder, Ethanol",
      idName: "MEA2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.11,
      maxConcentration: 0.6,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.11 - 0.6 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MEG",
    {
      menuName: "Ethylene Glycol - aq",
      idName: "MEG",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: true,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.6,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.6 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MEG2",
    {
      menuName: "Melinder, Ethylene Glycol",
      idName: "MEG2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.56,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.56 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MGL",
    {
      menuName: "Glycerol - aq",
      idName: "MGL",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.6,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.6 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MGL2",
    {
      menuName: "Melinder, Glycerol",
      idName: "MGL2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.2,
      maxConcentration: 0.63,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.2 - 0.63 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MITSW",
    {
      menuName: "MIT Seawater",
      idName: "MITSW",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.12,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.12 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MKA",
    {
      menuName: "Potassium Acetate (CH3CO2K) - aq",
      idName: "MKA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.45,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.45 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MKA2",
    {
      menuName: "Melinder, Potassium Acetate",
      idName: "MKA2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.11,
      maxConcentration: 0.41,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.11 - 0.41 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MKC",
    {
      menuName: "Potassium Carbonate (K2CO3) - aq",
      idName: "MKC",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.4,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.4 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MKC2",
    {
      menuName: "Melinder, Potassium Carbonate",
      idName: "MKC2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.39,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.39 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MKF",
    {
      menuName: "Potassium Formate (CHKO2) - aq",
      idName: "MKF",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.48,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.48 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MLI",
    {
      menuName: "Lithium Chloride (LiCl) - aq",
      idName: "MLI",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.24,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.24 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MMA",
    {
      menuName: "Methyl Alcohol (Methanol) - aq",
      idName: "MMA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.6,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.6 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MMA2",
    {
      menuName: "Melinder, Methanol",
      idName: "MMA2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.08,
      maxConcentration: 0.47,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.08 - 0.47 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MMG",
    {
      menuName: "MgCl2 - aq",
      idName: "MMG",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.3,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.3 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MMG2",
    {
      menuName: "Melinder, Magnesium Chloride",
      idName: "MMG2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.21,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.21 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MNA",
    {
      menuName: "Sodium Chloride (NaCl) - aq",
      idName: "MNA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.23,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.23 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MNA2",
    {
      menuName: "Melinder, Sodium Chloride",
      idName: "MNA2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.23,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.23 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MPG",
    {
      menuName: "Propylene Glycol - aq",
      idName: "MPG",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: true,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 0.6,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0 - 0.6 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::MPG2",
    {
      menuName: "Melinder, Propylene Glycol",
      idName: "MPG2",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.15,
      maxConcentration: 0.57,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.15 - 0.57 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::VCA",
    {
      menuName: "VDI, Calcium Cloride",
      idName: "VCA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.15,
      maxConcentration: 0.3,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.15 - 0.3 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::VKC",
    {
      menuName: "VDI, Potassium Carbonate",
      idName: "VKC",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.13,
      maxConcentration: 0.39,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.13 - 0.39 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::VMA",
    {
      menuName: "VDI, Methanol",
      idName: "VMA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.1,
      maxConcentration: 0.9,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.1 - 0.9 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::VMG",
    {
      menuName: "VDI, Magnesium Chloride",
      idName: "VMG",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.07,
      maxConcentration: 0.21,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.07 - 0.21 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::VNA",
    {
      menuName: "VDI, Sodium Chloride",
      idName: "VNA",
      category: "Incompressible Mass-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.07,
      maxConcentration: 0.23,
      longDescription: "Incompressible Mass-Based Aqueous Solution, valid concentration range: 0.07 - 0.23 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::AEG",
    {
      menuName: "ASHRAE, Ethylene Glycol",
      idName: "AEG",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: true,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.1,
      maxConcentration: 0.6,
      longDescription: "Incompressible Volume-Based Aqueous Solution, valid concentration range: 0.1 - 0.6 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::AKF",
    {
      menuName: "Antifrogen KF, Potassium Formate",
      idName: "AKF",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.4,
      maxConcentration: 1,
      longDescription: "Incompressible Volume-Based Aqueous Solution, valid concentration range: 0.4 - 1 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::AL",
    {
      menuName: "Antifrogen L, Propylene Glycol",
      idName: "AL",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.1,
      maxConcentration: 0.6,
      longDescription: "Incompressible Volume-Based Aqueous Solution, valid concentration range: 0.1 - 0.6 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::AN",
    {
      menuName: "Antifrogen N, Ethylene Glycol",
      idName: "AN",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.1,
      maxConcentration: 0.6,
      longDescription: "Incompressible Volume-Based Aqueous Solution, valid concentration range: 0.1 - 0.6 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::APG",
    {
      menuName: "ASHRAE, Propylene Glycol",
      idName: "APG",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: true,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.1,
      maxConcentration: 0.6,
      longDescription: "Incompressible Volume-Based Aqueous Solution, valid concentration range: 0.1 - 0.6 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::GKN",
    {
      menuName: "Glykosol N, Ethylene Glycol",
      idName: "GKN",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.1,
      maxConcentration: 0.6,
      longDescription: "Incompressible Volume-Based Aqueous Solution, valid concentration range: 0.1 - 0.6 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::PK2",
    {
      menuName: "Pekasol 2000, K acetate/formate",
      idName: "PK2",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.3,
      maxConcentration: 1,
      longDescription: "Incompressible Volume-Based Aqueous Solution, valid concentration range: 0.3 - 1 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::PKL",
    {
      menuName: "Pekasol L, Propylene Glycol",
      idName: "PKL",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.1,
      maxConcentration: 0.6,
      longDescription: "Incompressible Volume-Based Aqueous Solution, valid concentration range: 0.1 - 0.6 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::ZAC",
    {
      menuName: "Zitrec AC, Corrosion Inhibitor",
      idName: "ZAC",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.06,
      maxConcentration: 0.5,
      longDescription: "Incompressible Volume-Based Aqueous Solution, valid concentration range: 0.06 - 0.5 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::ZFC",
    {
      menuName: "Zitrec FC, Propylene Glycol",
      idName: "ZFC",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.3,
      maxConcentration: 0.6,
      longDescription: "Incompressible Volume-Based Aqueous Solution, valid concentration range: 0.3 - 0.6 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::ZLC",
    {
      menuName: "Zitrec LC, Propylene Glycol",
      idName: "ZLC",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.3,
      maxConcentration: 0.7,
      longDescription: "Incompressible Volume-Based Aqueous Solution, valid concentration range: 0.3 - 0.7 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::ZM",
    {
      menuName: "Zitrec M, Ethylene Glycol",
      idName: "ZM",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0,
      maxConcentration: 1,
      longDescription: "Incompressible Volume-Based Aqueous Solution, valid concentration range: 0 - 1 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "INCOMP::ZMC",
    {
      menuName: "Zitrec MC, Ethylene Glycol",
      idName: "ZMC",
      category: "Incompressible Volume-Based Aqueous Solution",
      basic: false,
      incompressible: true,
      incompressibleMixture: true,
      minConcentration: 0.3,
      maxConcentration: 0.7,
      longDescription: "Incompressible Volume-Based Aqueous Solution, valid concentration range: 0.3 - 0.7 (all water=0.0, no water=1.0)",
    }
  ],
  [
    "CustomMixture",
    {
      menuName: "Mixture (Compressible, User Defined)",
      idName: "Mixture",
      category: "User Defined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "",
    }
  ],
  [
    "Air.mix",
    {
      menuName: "Air",
      idName: "AirMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - NITROGEN: 0.7812, ARGON: 0.0092, OXYGEN: 0.2096",
    }
  ],
  [
    "Amarillo.mix",
    {
      menuName: "Amarillo",
      idName: "AmarilloMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - METHANE: 0.906724, NITROGEN: 0.031284, CO2: 0.004676, ETHANE: 0.045279, PROPANE: 0.00828, ISOBUTAN: 0.001037, BUTANE: 0.001563, IPENTANE: 0.000321, PENTANE: 0.000443, HEXANE: 0.000393",
    }
  ],
  [
    "Ekofisk.mix",
    {
      menuName: "Ekofisk",
      idName: "EkofiskMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - METHANE: 0.859063, NITROGEN: 0.010068, CO2: 0.014954, ETHANE: 0.084919, PROPANE: 0.023015, ISOBUTAN: 0.003486, BUTANE: 0.003506, IPENTANE: 0.000509, PENTANE: 0.00048",
    }
  ],
  [
    "GulfCoast.mix",
    {
      menuName: "GulfCoast",
      idName: "GulfCoastMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - METHANE: 0.965222, NITROGEN: 0.002595, CO2: 0.005956, ETHANE: 0.018186, PROPANE: 0.004596, ISOBUTAN: 0.000977, BUTANE: 0.001007, IPENTANE: 0.000473, PENTANE: 0.000324, HEXANE: 0.000664",
    }
  ],
  [
    "HighCO2.mix",
    {
      menuName: "HighCO2",
      idName: "HighCO2Mixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - METHANE: 0.81212, NITROGEN: 0.05702, CO2: 0.07585, ETHANE: 0.04303, PROPANE: 0.00895, ISOBUTAN: 0.00151, BUTANE: 0.00152",
    }
  ],
  [
    "HighN2.mix",
    {
      menuName: "HighN2",
      idName: "HighN2Mixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - METHANE: 0.81441, NITROGEN: 0.13465, CO2: 0.00985, ETHANE: 0.033, PROPANE: 0.00605, ISOBUTAN: 0.001, BUTANE: 0.00104",
    }
  ],
  [
    "NaturalGasSample.mix",
    {
      menuName: "NaturalGasSample",
      idName: "NaturalGasSampleMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - METHANE: 0.95123, NITROGEN: 0.00089, CO2: 0.02555, ETHANE: 0.01835, PROPANE: 0.00238, ISOBUTAN: 0.0004, BUTANE: 0.00016, IPENTANE: 0.00014, PENTANE: 0.00011, HEXANE: 0.00079",
    }
  ],
  [
    "R401A.mix",
    {
      menuName: "R401A",
      idName: "R401AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R22: 0.578854210704231, R152A: 0.185871453986601, R124: 0.235274335309169",
    }
  ],
  [
    "R401B.mix",
    {
      menuName: "R401B",
      idName: "R401BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R22: 0.654924685341436, R152A: 0.154607382276918, R124: 0.190467932381646",
    }
  ],
  [
    "R401C.mix",
    {
      menuName: "R401C",
      idName: "R401CMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R22: 0.385591186504412, R152A: 0.229445970225924, R124: 0.384962843269664",
    }
  ],
  [
    "R402A.mix",
    {
      menuName: "R402A",
      idName: "R402AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.507659889396724, PROPANE: 0.0460590346231213, R22: 0.446281075980154",
    }
  ],
  [
    "R402B.mix",
    {
      menuName: "R402B",
      idName: "R402BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.299858744498276, PROPANE: 0.0429562491180057, R22: 0.657185006383719",
    }
  ],
  [
    "R403A.mix",
    {
      menuName: "R403A",
      idName: "R403AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPANE: 0.104301635230068, R22: 0.797852142841926, R218: 0.0978462219280052",
    }
  ],
  [
    "R403B.mix",
    {
      menuName: "R403B",
      idName: "R403BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPANE: 0.117083478399255, R22: 0.668734422027154, R218: 0.214182099573591",
    }
  ],
  [
    "R404A.mix",
    {
      menuName: "R404A",
      idName: "R404AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.357816784026318, R134A: 0.0382639950410712, R143A: 0.603919220932611",
    }
  ],
  [
    "R405A.mix",
    {
      menuName: "R405A",
      idName: "R405AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R22: 0.582397185883849, R152A: 0.118598940913682, R142B: 0.0612463586573, RC318: 0.237757514545169",
    }
  ],
  [
    "R406A.mix",
    {
      menuName: "R406A",
      idName: "R406AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R22: 0.571559096367276, ISOBUTAN: 0.0618403319459979, R142B: 0.366600571686726",
    }
  ],
  [
    "R407A.mix",
    {
      menuName: "R407A",
      idName: "R407AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.346419854360797, R125: 0.300315552114308, R134A: 0.353264593524896",
    }
  ],
  [
    "R407B.mix",
    {
      menuName: "R407B",
      idName: "R407BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.197865007175653, R125: 0.600360468492644, R134A: 0.201774524331703",
    }
  ],
  [
    "R407C.mix",
    {
      menuName: "R407C",
      idName: "R407CMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.381109419953993, R125: 0.179558888662016, R134A: 0.439331691383991",
    }
  ],
  [
    "R407D.mix",
    {
      menuName: "R407D",
      idName: "R407DMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.262268077791873, R125: 0.113681680758968, R134A: 0.624050241449159",
    }
  ],
  [
    "R407E.mix",
    {
      menuName: "R407E",
      idName: "R407EMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.402611526984881, R125: 0.104708637358978, R134A: 0.492679835656141",
    }
  ],
  [
    "R407F.mix",
    {
      menuName: "R407F",
      idName: "R407FMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.473194694453358, R125: 0.205109095413331, R134A: 0.321696210133311",
    }
  ],
  [
    "R408A.mix",
    {
      menuName: "R408A",
      idName: "R408AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.0507496395780536, R143A: 0.476277681499092, R22: 0.472972678922854",
    }
  ],
  [
    "R409A.mix",
    {
      menuName: "R409A",
      idName: "R409AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R22: 0.676088021274302, R124: 0.178481953421098, R142B: 0.1454300253046",
    }
  ],
  [
    "R409B.mix",
    {
      menuName: "R409B",
      idName: "R409BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R22: 0.726713817097545, R124: 0.177089324155708, R142B: 0.0961968587467468",
    }
  ],
  [
    "R410A.mix",
    {
      menuName: "R410A",
      idName: "R410AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.697614699375863, R125: 0.302385300624138",
    }
  ],
  [
    "R410B.mix",
    {
      menuName: "R410B",
      idName: "R410BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.653688938033229, R125: 0.346311061966771",
    }
  ],
  [
    "R411A.mix",
    {
      menuName: "R411A",
      idName: "R411AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPYLEN: 0.0293595987641706, R22: 0.833472654512905, R152A: 0.137167746722925",
    }
  ],
  [
    "R411B.mix",
    {
      menuName: "R411B",
      idName: "R411BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPYLEN: 0.0592216130255444, R22: 0.903048917855743, R152A: 0.0377294691187131",
    }
  ],
  [
    "R412A.mix",
    {
      menuName: "R412A",
      idName: "R412AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R22: 0.746189416536491, R218: 0.0245117299030133, R142B: 0.229298853560496",
    }
  ],
  [
    "R413A.mix",
    {
      menuName: "R413A",
      idName: "R413AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R218: 0.0497604388838132, R134A: 0.896582929746185, ISOBUTAN: 0.0536566313700015",
    }
  ],
  [
    "R414A.mix",
    {
      menuName: "R414A",
      idName: "R414AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R22: 0.571718248653786, R124: 0.202422623615037, ISOBUTAN: 0.0667091242374272, R142B: 0.159150003493749",
    }
  ],
  [
    "R414B.mix",
    {
      menuName: "R414B",
      idName: "R414BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R22: 0.58743911052603, R124: 0.29030851296569, ISOBUTAN: 0.0262178745861124, R142B: 0.0960345019221677",
    }
  ],
  [
    "R415A.mix",
    {
      menuName: "R415A",
      idName: "R415AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R22: 0.776780159383737, R152A: 0.223219840616263",
    }
  ],
  [
    "R415B.mix",
    {
      menuName: "R415B",
      idName: "R415BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R22: 0.202949716550675, R152A: 0.797050283449325",
    }
  ],
  [
    "R416A.mix",
    {
      menuName: "R416A",
      idName: "R416AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R134A: 0.647182715864291, R124: 0.323933072881677, BUTANE: 0.0288842112540324",
    }
  ],
  [
    "R417A.mix",
    {
      menuName: "R417A",
      idName: "R417AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.414456113615123, R134A: 0.523100248809492, BUTANE: 0.0624436375753851",
    }
  ],
  [
    "R418A.mix",
    {
      menuName: "R418A",
      idName: "R418AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPANE: 0.0287766462758765, R22: 0.939204558675462, R152A: 0.0320187950486611",
    }
  ],
  [
    "R419A.mix",
    {
      menuName: "R419A",
      idName: "R419AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.701459965531065, R134A: 0.203604819551495, DME: 0.0949352149174398",
    }
  ],
  [
    "R420A.mix",
    {
      menuName: "R420A",
      idName: "R420AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R134A: 0.878387913267685, R142B: 0.121612086732315",
    }
  ],
  [
    "R421A.mix",
    {
      menuName: "R421A",
      idName: "R421AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.540011717389644, R134A: 0.459988282610356",
    }
  ],
  [
    "R421B.mix",
    {
      menuName: "R421B",
      idName: "R421BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.828099498512419, R134A: 0.171900501487581",
    }
  ],
  [
    "R422A.mix",
    {
      menuName: "R422A",
      idName: "R422AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.805501067600345, R134A: 0.128043250123554, ISOBUTAN: 0.0664556822761011",
    }
  ],
  [
    "R422B.mix",
    {
      menuName: "R422B",
      idName: "R422BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.497287395965083, R134A: 0.446700400155301, ISOBUTAN: 0.0560122038796163",
    }
  ],
  [
    "R422C.mix",
    {
      menuName: "R422C",
      idName: "R422CMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.774757115908852, R134A: 0.166711388687975, ISOBUTAN: 0.0585314954031729",
    }
  ],
  [
    "R422D.mix",
    {
      menuName: "R422D",
      idName: "R422DMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.596291711495645, R134A: 0.339399053279791, ISOBUTAN: 0.064309235224564",
    }
  ],
  [
    "R423A.mix",
    {
      menuName: "R423A",
      idName: "R423AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R134A: 0.648115324820034, R227EA: 0.351884675179966",
    }
  ],
  [
    "R424A.mix",
    {
      menuName: "R424A",
      idName: "R424AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.45615402931289, R134A: 0.49939050863627, ISOBUTAN: 0.0167872396578164, BUTANE: 0.0186524885086849, IPENTANE: 0.00901573388433862",
    }
  ],
  [
    "R425A.mix",
    {
      menuName: "R425A",
      idName: "R425AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.321134464075019, R134A: 0.615130603145805, R227EA: 0.0637349327791751",
    }
  ],
  [
    "R426A.mix",
    {
      menuName: "R426A",
      idName: "R426AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.0431546741714159, R134A: 0.925684310853531, BUTANE: 0.0227152573734822, IPENTANE: 0.00844575760157109",
    }
  ],
  [
    "R427A.mix",
    {
      menuName: "R427A",
      idName: "R427AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.260775797534104, R125: 0.188391404795509, R143A: 0.107618901019853, R134A: 0.443213896650535",
    }
  ],
  [
    "R428A.mix",
    {
      menuName: "R428A",
      idName: "R428AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.694325251072399, R143A: 0.255893190962662, PROPANE: 0.0146310583647717, ISOBUTAN: 0.0351504996001673",
    }
  ],
  [
    "R429A.mix",
    {
      menuName: "R429A",
      idName: "R429AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - DME: 0.66113457206158, R152A: 0.0768533364747054, ISOBUTAN: 0.262012091463714",
    }
  ],
  [
    "R430A.mix",
    {
      menuName: "R430A",
      idName: "R430AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R152A: 0.735906531919507, ISOBUTAN: 0.264093468080493",
    }
  ],
  [
    "R431A.mix",
    {
      menuName: "R431A",
      idName: "R431AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPANE: 0.785742532365466, R152A: 0.214257467634534",
    }
  ],
  [
    "R432A.mix",
    {
      menuName: "R432A",
      idName: "R432AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPYLEN: 0.814097241703795, DME: 0.185902758296205",
    }
  ],
  [
    "R433A.mix",
    {
      menuName: "R433A",
      idName: "R433AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPYLEN: 0.309917763130151, PROPANE: 0.690082236869849",
    }
  ],
  [
    "R434A.mix",
    {
      menuName: "R434A",
      idName: "R434AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.556782765664377, R143A: 0.226468961005242, R134A: 0.165810098372986, ISOBUTAN: 0.0509381749573948",
    }
  ],
  [
    "R435A.mix",
    {
      menuName: "R435A",
      idName: "R435AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - DME: 0.85152261670421, R152A: 0.14847738329579",
    }
  ],
  [
    "R436A.mix",
    {
      menuName: "R436A",
      idName: "R436AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPANE: 0.62652773298942, ISOBUTAN: 0.37347226701058",
    }
  ],
  [
    "R436B.mix",
    {
      menuName: "R436B",
      idName: "R436BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPANE: 0.588127503607667, ISOBUTAN: 0.411872496392333",
    }
  ],
  [
    "R437A.mix",
    {
      menuName: "R437A",
      idName: "R437AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.168496314343733, R134A: 0.797898667324292, BUTANE: 0.0249804624362383, PENTANE: 0.00862455589573693",
    }
  ],
  [
    "R438A.mix",
    {
      menuName: "R438A",
      idName: "R438AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.161915681788051, R125: 0.371558801739542, R134A: 0.42929872424902, BUTANE: 0.0289854872298073, IPENTANE: 0.00824130499357989",
    }
  ],
  [
    "R441A.mix",
    {
      menuName: "R441A",
      idName: "R441AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - ETHANE: 0.049800395690461, PROPANE: 0.600310262208399, ISOBUTAN: 0.0498654644324665, BUTANE: 0.300023877668674",
    }
  ],
  [
    "R442A.mix",
    {
      menuName: "R442A",
      idName: "R442AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.487220106766942, R125: 0.211188495005419, R134A: 0.240409765511042, R152A: 0.0371371957951017, R227EA: 0.0240444369214954",
    }
  ],
  [
    "R443A.mix",
    {
      menuName: "R443A",
      idName: "R443AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPYLEN: 0.568232931233387, PROPANE: 0.394367661677695, ISOBUTAN: 0.0373994070889183",
    }
  ],
  [
    "R444A.mix",
    {
      menuName: "R444A",
      idName: "R444AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.223042202171548, R152A: 0.0731981570161227, R1234ZE: 0.703759640812329",
    }
  ],
  [
    "R500.mix",
    {
      menuName: "R500",
      idName: "R500Mixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R12: 0.606101741397223, R152A: 0.393898258602777",
    }
  ],
  [
    "R501.mix",
    {
      menuName: "R501",
      idName: "R501Mixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R22: 0.807509678166191, R12: 0.192490321833809",
    }
  ],
  [
    "R502.mix",
    {
      menuName: "R502",
      idName: "R502Mixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R22: 0.629994467193889, R115: 0.370005532806111",
    }
  ],
  [
    "R503.mix",
    {
      menuName: "R503",
      idName: "R503Mixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R23: 0.49970034990839, R13: 0.50029965009161",
    }
  ],
  [
    "R504.mix",
    {
      menuName: "R504",
      idName: "R504Mixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.734239632563771, R115: 0.265760367436229",
    }
  ],
  [
    "R507A.mix",
    {
      menuName: "R507A",
      idName: "R507AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.411839711774438, R143A: 0.588160288225562",
    }
  ],
  [
    "R508A.mix",
    {
      menuName: "R508A",
      idName: "R508AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R23: 0.557576966356198, R116: 0.442423033643802",
    }
  ],
  [
    "R508B.mix",
    {
      menuName: "R508B",
      idName: "R508BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R23: 0.626751006700703, R116: 0.373248993299297",
    }
  ],
  [
    "R509A.mix",
    {
      menuName: "R509A",
      idName: "R509AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R22: 0.630790210153023, R218: 0.369209789846977",
    }
  ],
  [
    "R510A.mix",
    {
      menuName: "R510A",
      idName: "R510AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - DME: 0.902458936722509, ISOBUTAN: 0.0975410632774913",
    }
  ],
  [
    "R512A.mix",
    {
      menuName: "R512A",
      idName: "R512AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R134A: 0.0329487458964343, R152A: 0.967051254103566",
    }
  ],
  [
    "GulfCoastGas(NIST1).mix",
    {
      menuName: "GulfCoastGas(NIST1)",
      idName: "GulfCoastGasMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - METHANE: 0.965222, NITROGEN: 0.002595, CO2: 0.005956, ETHANE: 0.018186, PROPANE: 0.004596, ISOBUTAN: 0.000977, BUTANE: 0.001007, IPENTANE: 0.000473, PENTANE: 0.000324, HEXANE: 0.000664",
    }
  ],
  [
    "TypicalNaturalGas.mix",
    {
      menuName: "TypicalNaturalGas",
      idName: "TypicalNaturalGasMixture",
      category: "Predefined Compressible Mixture",
      basic: true,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - METHANE: 0.95123, NITROGEN: 0.00089, CO2: 0.02555, ETHANE: 0.01835, PROPANE: 0.00238, ISOBUTAN: 0.0004, BUTANE: 0.00016, IPENTANE: 0.00014, PENTANE: 0.00011, HEXANE: 0.00079",
    }
  ],
  [
    "R417B.mix",
    {
      menuName: "R417B",
      idName: "R417BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.744566872257699, R134A: 0.202885026732296, BUTANE: 0.052548101010005",
    }
  ],
  [
    "R417C.mix",
    {
      menuName: "R417C",
      idName: "R417CMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.168533780311387, R134A: 0.801126056234188, BUTANE: 0.0303401634544254",
    }
  ],
  [
    "R419B.mix",
    {
      menuName: "R419B",
      idName: "R419BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.425134881380361, R134A: 0.494935410459673, DME: 0.0799297081599657",
    }
  ],
  [
    "R422E.mix",
    {
      menuName: "R422E",
      idName: "R422EMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.528211539833383, R134A: 0.421012248071509, ISOBUTAN: 0.0507762120951078",
    }
  ],
  [
    "R429A.mix",
    {
      menuName: "R429A",
      idName: "R429AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - DME: 0.66113457206158, R152A: 0.0768533364747054, ISOBUTAN: 0.262012091463714",
    }
  ],
  [
    "R430A.mix",
    {
      menuName: "R430A",
      idName: "R430AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R152A: 0.735906531919507, ISOBUTAN: 0.264093468080493",
    }
  ],
  [
    "R431A.mix",
    {
      menuName: "R431A",
      idName: "R431AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPANE: 0.785742532365466, R152A: 0.214257467634534",
    }
  ],
  [
    "R432A.mix",
    {
      menuName: "R432A",
      idName: "R432AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPYLEN: 0.814097241703795, DME: 0.185902758296205",
    }
  ],
  [
    "R433A.mix",
    {
      menuName: "R433A",
      idName: "R433AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPYLEN: 0.309917763130151, PROPANE: 0.690082236869849",
    }
  ],
  [
    "R433B.mix",
    {
      menuName: "R433B",
      idName: "R433BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPYLEN: 0.0522701063955236, PROPANE: 0.947729893604476",
    }
  ],
  [
    "R433C.mix",
    {
      menuName: "R433C",
      idName: "R433CMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPYLEN: 0.25887610544032, PROPANE: 0.74112389455968",
    }
  ],
  [
    "R434A.mix",
    {
      menuName: "R434A",
      idName: "R434AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R125: 0.556782765664377, R143A: 0.226468961005242, R134A: 0.165810098372986, ISOBUTAN: 0.0509381749573948",
    }
  ],
  [
    "R438A.mix",
    {
      menuName: "R438A",
      idName: "R438AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.161915681788051, R125: 0.371558801739542, R134A: 0.42929872424902, BUTANE: 0.0289854872298073, IPENTANE: 0.00824130499357989",
    }
  ],
  [
    "R439A.mix",
    {
      menuName: "R439A",
      idName: "R439AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.684390813603997, R125: 0.278854127894844, ISOBUTAN: 0.0367550585011589",
    }
  ],
  [
    "R440A.mix",
    {
      menuName: "R440A",
      idName: "R440AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPANE: 0.00901134733203068, R134A: 0.0103852633851142, R152A: 0.980603389282855",
    }
  ],
  [
    "R444B.mix",
    {
      menuName: "R444B",
      idName: "R444BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.580409174767712, R152A: 0.11015659826248, R1234ZE: 0.309434226969808",
    }
  ],
  [
    "R445A.mix",
    {
      menuName: "R445A",
      idName: "R445AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - CO2: 0.14056672736859, R134A: 0.0909466670967859, R1234ZE: 0.768486605534624",
    }
  ],
  [
    "R446A.mix",
    {
      menuName: "R446A",
      idName: "R446AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.810347789312053, R1234ZE: 0.157652541387366, BUTANE: 0.0319996693005808",
    }
  ],
  [
    "R447A.mix",
    {
      menuName: "R447A",
      idName: "R447AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.824059115538506, R125: 0.0183849541922025, R1234ZE: 0.157555930269292",
    }
  ],
  [
    "R448A.mix",
    {
      menuName: "R448A",
      idName: "R448AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.431218201988559, R125: 0.186914131481992, R1234YF: 0.151319256485899, R134A: 0.177586673617217, R1234ZE: 0.0529617364263329",
    }
  ],
  [
    "R449A.mix",
    {
      menuName: "R449A",
      idName: "R449AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.407364566995509, R125: 0.179481207732065, R1234YF: 0.193480840388364, R134A: 0.219673384884062",
    }
  ],
  [
    "R449B.mix",
    {
      menuName: "R449B",
      idName: "R449BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.418353331871839, R125: 0.174861426767915, R1234YF: 0.175699749729428, R134A: 0.231085491630818",
    }
  ],
  [
    "R450A.mix",
    {
      menuName: "R450A",
      idName: "R450AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R134A: 0.447322067369848, R1234ZE: 0.552677932630152",
    }
  ],
  [
    "R451A.mix",
    {
      menuName: "R451A",
      idName: "R451AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R1234YF: 0.887346670041529, R134A: 0.112653329958471",
    }
  ],
  [
    "R451B.mix",
    {
      menuName: "R451B",
      idName: "R451BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R1234YF: 0.876445928959364, R134A: 0.123554071040636",
    }
  ],
  [
    "R452A.mix",
    {
      menuName: "R452A",
      idName: "R452AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.218864360337465, R125: 0.508837870465814, R1234YF: 0.272297769196721",
    }
  ],
  [
    "R453A.mix",
    {
      menuName: "R453A",
      idName: "R453AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.341295928327855, R125: 0.147936968933237, R134A: 0.468112901696291, R227EA: 0.0261066945175942, BUTANE: 0.0091646080754323, IPENTANE: 0.00738289844959133",
    }
  ],
  [
    "R454A.mix",
    {
      menuName: "R454A",
      idName: "R454AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.541359992223361, R1234YF: 0.458640007776639",
    }
  ],
  [
    "R454B.mix",
    {
      menuName: "R454B",
      idName: "R454BMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R32: 0.829247912869081, R1234YF: 0.170752087130919",
    }
  ],
  [
    "R511A.mix",
    {
      menuName: "R511A",
      idName: "R511AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - PROPANE: 0.952038489443906, DME: 0.0479615105560936",
    }
  ],
  [
    "R513A.mix",
    {
      menuName: "R513A",
      idName: "R513AMixture",
      category: "Predefined Compressible Mixture",
      basic: false,
      incompressible: false,
      incompressibleMixture: false,
      minConcentration: null,
      maxConcentration: null,
      longDescription: "Mole Fractions - R1234YF: 0.532425755929735, R134A: 0.467574244070265",
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
