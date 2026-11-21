import { BaseCell, type DatabaseFluidCell } from "./BaseCell";
import { type FluidConfig, getDefaultFluidConfig } from "../sheet/Sheet";

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
  static FLUID_PROPS_PARAMETERS_ORDER: FluidConstants["FLUID_PROPS_PARAMETERS_ORDER"];
  static FLUID_HA_PROPS_PARAMETERS: FluidConstants["FLUID_HA_PROPS_PARAMETERS"];
  static FLUID_HA_PROPS_PARAMETERS_ORDER: FluidConstants["FLUID_HA_PROPS_PARAMETERS_ORDER"];

  fluidConfig: FluidConfig = $state();
  output: string = $state();
  input1: string = $state();
  input2: string = $state();
  input3: string = $state();
  useSheetFluid: boolean = $state();
  useFluidInName: boolean = $state();
  nameLatex: string = $state();
  error: boolean = $state();
  errorMessage: string = $state();

  constructor (sheetFluidConfig: FluidConfig, arg?: DatabaseFluidCell) {
    super("fluid", arg?.id);
    if (arg === undefined) {
      this.fluidConfig = getDefaultFluidConfig();
      this.useSheetFluid = false;
      this.useFluidInName = true;
      this.output = "D";
      this.input1 = "T";
      this.input2 = "P";
      this.input3 = "W";
      this.nameLatex = this.getSuggestedName(sheetFluidConfig);
    } else {
      this.fluidConfig = getDefaultFluidConfig();
      this.fluidConfig = arg.fluidConfig;
      this.useSheetFluid = arg.useSheetFluid;
      this.useFluidInName = arg.useFluidInName;
      this.output = arg.output;
      this.input1 = arg.input1;
      this.input2 = arg.input2;
      this.input3 = arg.input3;
      this.nameLatex = arg.latex;
    }
  }

  static async init() {
    if (!FluidCell.FLUIDS) {
      const fluidConstants = await import("../fluidConstants");
      FluidCell.FLUIDS = fluidConstants.FLUIDS;
      FluidCell.FLUID_PROPS_PARAMETERS = fluidConstants.FLUID_PROPS_PARAMETERS;
      FluidCell.FLUID_PROPS_PARAMETERS_ORDER = fluidConstants.FLUID_PROPS_PARAMETERS_ORDER;
      FluidCell.FLUID_HA_PROPS_PARAMETERS = fluidConstants.FLUID_HA_PROPS_PARAMETERS;
      FluidCell.FLUID_HA_PROPS_PARAMETERS_ORDER = fluidConstants.FLUID_HA_PROPS_PARAMETERS_ORDER;
    } 
  }

  serialize(): DatabaseFluidCell {
    return {
      type: "fluid",
      id: this.id,
      fluidConfig: this.fluidConfig,
      useSheetFluid: this.useSheetFluid,
      useFluidInName: this.useFluidInName,
      output: this.output,
      input1: this.input1,
      input2: this.input2,
      input3: this.input3,
      latex: this.nameLatex,
    };
  }

  getSuggestedName(sheetFluidConfig: FluidConfig) {
    const fluidConfig = this.useSheetFluid ? sheetFluidConfig : this.fluidConfig;

    let name: string;

    const fluidName = this.useFluidInName ? FluidCell.FLUIDS.get(fluidConfig.fluid).idName : "";

    if (FluidCell.FLUID_PROPS_PARAMETERS.get(this.output)?.trivial) {
      name = fluidName;
      name += FluidCell.FLUID_PROPS_PARAMETERS.get(this.output)?.idName;
    } else if (fluidConfig.fluid === "HumidAir") {
      name = fluidName;
      name += FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.output)?.idName + "Given";
      name += FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.input1)?.idName;
      name += FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.input2)?.idName;
      name += FluidCell.FLUID_HA_PROPS_PARAMETERS.get(this.input3)?.idName;
    } else {
      name = fluidName;
      name += FluidCell.FLUID_PROPS_PARAMETERS.get(this.output)?.idName + "Given";
      name += FluidCell.FLUID_PROPS_PARAMETERS.get(this.input1)?.idName;
      name += FluidCell.FLUID_PROPS_PARAMETERS.get(this.input2)?.idName;
    }
    return name;
  }


}