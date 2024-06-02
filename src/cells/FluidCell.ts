import { BaseCell, type DatabaseFluidCell } from "./BaseCell";
import { MathField } from "./MathField";
import { unit } from 'mathjs';
import type { AssignmentStatement } from "../parser/types";

type FluidConstants = typeof import("../fluidConstants");

export type FluidFunction = {
  name: string,
  fluid: string,
  output: string,
  outputDims: number[],
  input1: string,
  input1Dims: number[],
  input2: string,
  input2Dims: number[],
  input3?: string,
  input3Dims?: number[],
};

export default class FluidCell extends BaseCell {
  static FLUIDS: FluidConstants["FLUIDS"];
  static FLUID_PROPS_PARAMETERS: FluidConstants["FLUID_PROPS_PARAMETERS"];
  static FLUID_HA_PROPS_PARAMETERS: FluidConstants["FLUID_HA_PROPS_PARAMETERS"];

  fluid: string;
  output: string;
  input1: string;
  input2: string;
  input3: string;
  incompMixConc: number;
  customMixture: {fluid: string, moleFraction: number}[];
  mathField: MathField;
  error: boolean;
  errorMessage: string;

  constructor (arg?: DatabaseFluidCell) {
    if (arg === undefined) {
      super("fluid");
      this.fluid = "Water";
      this.output = "D";
      this.input1 = "T";
      this.input2 = "P";
      this.input3 = "W";
      this.incompMixConc = 0.5;
      this.customMixture = [{fluid: "R32", moleFraction: 0.697615}, {fluid: "R125", moleFraction: 0.302385}];
      this.mathField = new MathField("", "parameter");
      this.mathField.parseLatex(this.getSuggestedName());
    } else {
      super("fluid", arg.id);
      this.fluid = arg.fluid;
      this.output = arg.output;
      this.input1 = arg.input1;
      this.input2 = arg.input2;
      this.input3 = arg.input3;
      this.incompMixConc = arg.incompMixConc;
      this.customMixture = arg.customMixture;
      this.mathField = new MathField("", "parameter");
      this.mathField.parseLatex(arg.latex);
    }
    this.errorCheck();
  }

  static async init() {
    if (!FluidCell.FLUIDS) {
      const fluidConstants = await import("../fluidConstants");
      FluidCell.FLUIDS = fluidConstants.FLUIDS;
      FluidCell.FLUID_PROPS_PARAMETERS = fluidConstants.FLUID_PROPS_PARAMETERS;
      FluidCell.FLUID_HA_PROPS_PARAMETERS = fluidConstants.FLUID_HA_PROPS_PARAMETERS;
    } 
  }

  serialize(): DatabaseFluidCell {
    return {
      type: "fluid",
      id: this.id,
      fluid: this.fluid,
      output: this.output,
      input1: this.input1,
      input2: this.input2,
      input3: this.input3,
      incompMixConc: this.incompMixConc,
      customMixture: this.customMixture,
      latex: this.mathField.latex,
    };
  }

  getSuggestedName() {
    let name: string;

    if (FluidCell.FLUID_PROPS_PARAMETERS.get(this.output)?.trivial) {
      name = FluidCell.FLUIDS.get(this.fluid).idName;
      name += FluidCell.FLUID_PROPS_PARAMETERS.get(this.output)?.idName;
    } else if (this.fluid === "HumidAir") {
      name = FluidCell.FLUIDS.get(this.fluid).idName;
      name += FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.output)?.idName + "Given";
      name += FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.input1)?.idName;
      name += FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.input2)?.idName;
      name += FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.input3)?.idName;
    } else {
      name = FluidCell.FLUIDS.get(this.fluid).idName;
      name += FluidCell.FLUID_PROPS_PARAMETERS.get(this.output)?.idName + "Given";
      name += FluidCell.FLUID_PROPS_PARAMETERS.get(this.input1)?.idName;
      name += FluidCell.FLUID_PROPS_PARAMETERS.get(this.input2)?.idName;
    }
    return name;
  }

  errorCheck() {
    const errors: string[] = [];

    if (this.mathField.parsingError) {
      if (FluidCell.FLUID_PROPS_PARAMETERS.get(this.output)?.trivial) {
        errors.push("Invalid constant name");
      } else {
        errors.push("Invalid function name");
      }
    }

    if (!FluidCell.FLUIDS.has(this.fluid)) {
      errors.push(`Unknown fluid ${this.fluid}`);
    } else if (this.fluid !== "HumidAir") {
      if (!FluidCell.FLUID_PROPS_PARAMETERS.has(this.output)) {
        errors.push(`Unknown output ${this.output}`);
      } else if (!FluidCell.FLUID_PROPS_PARAMETERS.get(this.output).output) {
        errors.push(`${FluidCell.FLUID_PROPS_PARAMETERS.get(this.output).idName} cannot be used as an output`);
      } else {
        const output = FluidCell.FLUID_PROPS_PARAMETERS.get(this.output);

        if (FluidCell.FLUIDS.get(this.fluid).incompressible && output &&
            !output.incompressibleOutput) {
          errors.push(`Output ${this.output} is not valid for incompressible fluid model`);
        }

        if (!output.trivial) {
          // 2 unique and valid inputs are required
          if (this.input1 === this.input2) {
            errors.push("Two unique inputs are required");
          }
          if (this.input1 === this.output) {
            errors.push("Input 1 must differ from the output");
          }
          if (this.input2 === this.output) {
            errors.push("Input 2 must differ from the output");
          }
          if (!FluidCell.FLUID_PROPS_PARAMETERS.has(this.input1)) {
            errors.push(`Unknown input ${this.input1}`)
          } else if (!FluidCell.FLUID_PROPS_PARAMETERS.get(this.input1).input) {
            errors.push(`${FluidCell.FLUID_PROPS_PARAMETERS.get(this.input1).idName} cannot be used as an input`);
          }
          if (!FluidCell.FLUID_PROPS_PARAMETERS.has(this.input2)) {
            errors.push(`Unknown input ${this.input2}`)
          } else if (!FluidCell.FLUID_PROPS_PARAMETERS.get(this.input2).input) {
            errors.push(`${FluidCell.FLUID_PROPS_PARAMETERS.get(this.input2).idName} cannot be used as an input`);
          }
          if (FluidCell.FLUIDS.get(this.fluid).incompressible) {
            if (!FluidCell.FLUID_PROPS_PARAMETERS.get(this.input1)?.incompressibleInput) {
              errors.push(`Input 1 ${this.input1} is not valid for incompressible fluid model`);
            }
            if (!FluidCell.FLUID_PROPS_PARAMETERS.get(this.input2)?.incompressibleInput) {
              errors.push(`Input 2 ${this.input2} is not valid for incompressible fluid model`);
            }
          }
        }
      }

      if (FluidCell.FLUIDS.get(this.fluid).incompressibleMixture) {
        if (typeof this.incompMixConc !== "number") {
          errors.push('Concentration must be a number');
        } else if (this.incompMixConc < FluidCell.FLUIDS.get(this.fluid).minConcentration) {
          errors.push(`Concentration must be greater than or equal to ${FluidCell.FLUIDS.get(this.fluid).minConcentration}`);
        } else if (this.incompMixConc > FluidCell.FLUIDS.get(this.fluid).maxConcentration) {
          errors.push(`Concentration must be less than or equal to ${FluidCell.FLUIDS.get(this.fluid).maxConcentration}`);
        }
      }

      if (this.fluid === 'CustomMixture') {
        const total = this.customMixture.reduce( (accum, value) => accum + value.moleFraction, 0.0);
        if (Math.abs(total - 1.0) > 1.0e-6) {
          errors.push('All mole fractions must add up to 1.0 for a user defined mixture');
        }

        if ((new Set(this.customMixture.map(value => value.fluid))).size < this.customMixture.length) {
          errors.push('Duplicate components are not allowed for user defined mixture');
        }

        for (const {fluid, moleFraction} of this.customMixture) {
          if (!FluidCell.FLUIDS.has(fluid)) {
            errors.push(`Unknown fluid ${fluid} in custom mixture`);
          } else if (FluidCell.FLUIDS.get(fluid).category !== "Compressible") {
            errors.push(`Invalid fluid ${fluid} in custom mixture`);
          }
        }
      }

    } else {
      if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.has(this.output)) {
        errors.push(`Unknown output ${this.output}`);
      } else if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.output).output) {
        errors.push(`${FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.output).idName} cannot be used as an output`);
      } else {
        const output = FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.output);

        // 3 unique and valid inputs are required
        if (this.input1 === this.input2 || this.input1 === this.input3 ||
            this.input2 === this.input3) {
          errors.push("Three unique inputs are required");
        }
        if (this.input1 === this.output) {
          errors.push("Input 1 must differ from the output");
        }
        if (this.input2 === this.output) {
          errors.push("Input 2 must differ from the output");
        }
        if (this.input3 === this.output) {
          errors.push("Input 3 must differ from the output");
        }

        // one of the inputs must be pressure
        if (this.input1 !== "P" && this.input2 !== "P" && this.input3 !== "P") {
          errors.push("One of the inputs must be pressure for the HumidAir fluid model");
        }

        if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.has(this.input1)) {
          errors.push(`Unknown input ${this.input1}`)
        } else if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.input1).input) {
          errors.push(`${FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.input1).idName} cannot be used as an input`);
        }
        if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.has(this.input2)) {
          errors.push(`Unknown input ${this.input2}`)
        } else if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.input2).input) {
          errors.push(`${FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.input2).idName} cannot be used as an input`);
        }
        if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.has(this.input3)) {
          errors.push(`Unknown input ${this.input3}`)
        } else if (!FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.input3).input) {
          errors.push(`${FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.input3).idName} cannot be used as an input`);
        }
      }
    }

    this.errorMessage = errors.join(", ");
    this.error = Boolean(this.errorMessage);

    return this.error;
  }

  getFluidFunction(): {fluidFunction: FluidFunction | null, statement: AssignmentStatement | null} {
    if (this.error || this.mathField.statement?.type !== "parameter") {
      return {fluidFunction: null, statement: null};
    }

    let fluidName: string;

    if (this.fluid === "CustomMixture") {
      const mixtureDefinition = this.customMixture.map(value => `${value.fluid}[${value.moleFraction}]`).join('&');
      fluidName = `HEOS::${mixtureDefinition}`;
    } else if (FluidCell.FLUIDS.get(this.fluid).incompressibleMixture) {
      fluidName = `${this.fluid}[${this.incompMixConc}]`;
    } else {
      fluidName = this.fluid;
    }

    if (FluidCell.FLUID_PROPS_PARAMETERS.get(this.output).trivial) {
      const fluidFuncName = `_fluid_func_${this.id}`;
      return {
        fluidFunction: {
          name: fluidFuncName,
          fluid: fluidName,
          output: this.output,
          outputDims: unit(FluidCell.FLUID_PROPS_PARAMETERS.get(this.output).units).dimensions,
          input1: "",
          input1Dims: unit("").dimensions,
          input2: "",
          input2Dims: unit("").dimensions,
        },
        statement: {
          type: "assignment",
          name: this.mathField.statement.name,
          sympy: `${fluidFuncName}(0,0)`,
          params: [],
          isExponent: false,
          isFunctionArgument: false,
          isFunction: false,
          exponents: [],
          implicitParams: [],
          functions: [],
          arguments: [],
          localSubs: [],
          isFromPlotCell: false,
          isRange: false,
          isCodeFunctionQuery: false,
          isCodeFunctionRawQuery: false
        }
      };
    } else if (this.fluid === "HumidAir") {
      return { 
        fluidFunction: {
          name: this.mathField.statement.name,
          fluid: this.fluid,
          output: this.output,
          outputDims: unit(FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.output).units).dimensions,
          input1: this.input1,
          input1Dims: unit(FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.input1).units).dimensions,
          input2: this.input2,
          input2Dims: unit(FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.input2).units).dimensions,
          input3: this.input3,
          input3Dims: unit(FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.input3).units).dimensions,
        },
        statement: null,
      };
    } else {
      return { 
        fluidFunction: {
          name: this.mathField.statement.name,
          fluid: fluidName,
          output: this.output,
          outputDims: unit(FluidCell.FLUID_PROPS_PARAMETERS.get(this.output).units).dimensions,
          input1: this.input1,
          input1Dims: unit(FluidCell.FLUID_PROPS_PARAMETERS.get(this.input1).units).dimensions,
          input2: this.input2,
          input2Dims: unit(FluidCell.FLUID_PROPS_PARAMETERS.get(this.input2).units).dimensions,
        },
        statement: null,
      };
    }
  }
}