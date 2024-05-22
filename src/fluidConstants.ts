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
  ["1-Butene", "But1ene"],
  ["Acetone", "Acetone"],
  ["Air", "Air"],
  ["Air (Humid)", "HumidAir"],
  ["Ammonia", "Ammonia"],
  ["Argon", "Argon"],
  ["Benzene", "Benzene"],
  ["CarbonDioxide", "CarbonDioxide"],
  ["CarbonMonoxide", "CarbonMonoxide"],
  ["CarbonylSulfide", "CarbonylSulfide"],
  ["CycloHexane", "CycloHexane"],
  ["CycloPropane", "CycloPropane"],
  ["Cyclopentane", "Cyclopentane"],
  ["D4", "D4"],
  ["D5", "D5"],
  ["D6", "D6"],
  ["Deuterium", "Deuterium"],
  ["Dichloroethane", "Dichloroethane"],
  ["DiethylEther", "DiethylEther"],
  ["DimethylCarbonate", "DimethylCarbonate"],
  ["DimethylEther", "DimethylEther"],
  ["Ethane", "Ethane"],
  ["Ethanol", "Ethanol"],
  ["EthylBenzene", "EthylBenzene"],
  ["Ethylene", "Ethylene"],
  ["EthyleneOxide", "EthyleneOxide"],
  ["Fluorine", "Fluorine"],
  ["HFE143m", "HFE143m"],
  ["HeavyWater", "HeavyWater"],
  ["Helium", "Helium"],
  ["Hydrogen", "Hydrogen"],
  ["HydrogenChloride", "HydrogenChloride"],
  ["HydrogenSulfide", "HydrogenSulfide"],
  ["IsoButane", "IsoButane"],
  ["IsoButene", "IsoButene"],
  ["Isohexane", "Isohexane"],
  ["Isopentane", "Isopentane"],
  ["Krypton", "Krypton"],
  ["MD2M", "MD2M"],
  ["MD3M", "MD3M"],
  ["MD4M", "MD4M"],
  ["MDM", "MDM"],
  ["MM", "MM"],
  ["Methane", "Methane"],
  ["Methanol", "Methanol"],
  ["MethylLinoleate", "MethylLinoleate"],
  ["MethylLinolenate", "MethylLinolenate"],
  ["MethylOleate", "MethylOleate"],
  ["MethylPalmitate", "MethylPalmitate"],
  ["MethylStearate", "MethylStearate"],
  ["Neon", "Neon"],
  ["Neopentane", "Neopentane"],
  ["Nitrogen", "Nitrogen"],
  ["NitrousOxide", "NitrousOxide"],
  ["Novec649", "Novec649"],
  ["OrthoDeuterium", "OrthoDeuterium"],
  ["OrthoHydrogen", "OrthoHydrogen"],
  ["Oxygen", "Oxygen"],
  ["ParaDeuterium", "ParaDeuterium"],
  ["ParaHydrogen", "ParaHydrogen"],
  ["Propylene", "Propylene"],
  ["Propyne", "Propyne"],
  ["R11", "R11"],
  ["R113", "R113"],
  ["R114", "R114"],
  ["R115", "R115"],
  ["R116", "R116"],
  ["R12", "R12"],
  ["R123", "R123"],
  ["R1233zd(E)", "R1233zdE"],
  ["R1234yf", "R1234yf"],
  ["R1234ze(E)", "R1234zeE"],
  ["R1234ze(Z)", "R1234zeZ"],
  ["R124", "R124"],
  ["R1243zf", "R1243zf"],
  ["R125", "R125"],
  ["R13", "R13"],
  ["R134a", "R134a"],
  ["R13I1", "R13I1"],
  ["R14", "R14"],
  ["R141b", "R141b"],
  ["R142b", "R142b"],
  ["R143a", "R143a"],
  ["R152A", "R152A"],
  ["R161", "R161"],
  ["R21", "R21"],
  ["R218", "R218"],
  ["R22", "R22"],
  ["R227EA", "R227EA"],
  ["R23", "R23"],
  ["R236EA", "R236EA"],
  ["R236FA", "R236FA"],
  ["R245ca", "R245ca"],
  ["R245fa", "R245fa"],
  ["R32", "R32"],
  ["R365MFC", "R365MFC"],
  ["R40", "R40"],
  ["R404A", "R404A"],
  ["R407C", "R407C"],
  ["R41", "R41"],
  ["R410A", "R410A"],
  ["R507A", "R507A"],
  ["RC318", "RC318"],
  ["SES36", "SES36"],
  ["SulfurDioxide", "SulfurDioxide"],
  ["SulfurHexafluoride", "SulfurHexafluoride"],
  ["Toluene", "Toluene"],
  ["Water", "Water"],
  ["Xenon", "Xenon"],
  ["cis-2-Butene", "cis2Butene"],
  ["m-Xylene", "mXylene"],
  ["n-Butane", "nButane"],
  ["n-Decane", "nDecane"],
  ["n-Dodecane", "nDodecane"],
  ["n-Heptane", "nHeptane"],
  ["n-Hexane", "nHexane"],
  ["n-Nonane", "nNonane"],
  ["n-Octane", "nOctane"],
  ["n-Pentane", "nPentane"],
  ["n-Propane", "nPropane"],
  ["n-Undecane", "nUndecane"],
  ["o-Xylene", "oXylene"],
  ["p-Xylene", "pXylene"],
  ["trans-2-Butene", "trans2Butene"],
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