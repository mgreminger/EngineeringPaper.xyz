export type FieldTypes = "math" | "plot" | "parameter" | "units" | "expression" | "number" |
  "condition" | "piecewise" | "expression_no_blank" | "equality" | "id_list";

export type Param = {
  name: string,
  
}

export type Statement = {
  type: "query" | "assignment" | "equality" | "blank",
  id: number,
  isRange: boolean,
  units: string,
  units_valid: boolean,
  unitsLatex: string
  input_units: string
}