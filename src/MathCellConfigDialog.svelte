<script lang="ts">
  import { Checkbox, NumberInput, Button, 
           RadioButtonGroup, RadioButton } from "carbon-components-svelte";  
  import { getDefaultMathCellConfig, type MathCellConfig } from "./sheet/Sheet";
  import { unsavedChange, autosaveNeeded } from "./stores";
  import type MathCell from "./cells/MathCell";
  import type MathCellElement from "./MathCell.svelte";

  // the first two parameters are used for setting the number properties for a cell
  export let mathCell: MathCell | null = null;
  export let mathCellElement: MathCellElement | null = null;

  // the thrid property is used for setting the numnber properties for a whole sheet
  export let mathCellConfig = mathCell?.config ?? getDefaultMathCellConfig();

  const defaultConfig = getDefaultMathCellConfig();

  const precisionUpperLimit = 64;
  const lowerExpLowerLimit = -12;
  const lowerExpUpperLimit = -2;
  const upperExpLowerLimit = 2;
  const upperExpUpperLimit = 12;

  export function resetDefaults() {
    $unsavedChange = true;
    $autosaveNeeded = true;

    mathCellConfig.symbolicOutput = defaultConfig.symbolicOutput;
    mathCellConfig.formatOptions.notation = defaultConfig.formatOptions.notation;
    mathCellConfig.formatOptions.precision = defaultConfig.formatOptions.precision;
    mathCellConfig.formatOptions.lowerExp = defaultConfig.formatOptions.lowerExp;
    mathCellConfig.formatOptions.upperExp = defaultConfig.formatOptions.upperExp;
  }

  function isDefault(config: MathCellConfig): boolean {
    return (
      mathCellConfig.symbolicOutput === defaultConfig.symbolicOutput &&
      mathCellConfig.formatOptions.notation === defaultConfig.formatOptions.notation &&
      mathCellConfig.formatOptions.precision === defaultConfig.formatOptions.precision &&
      mathCellConfig.formatOptions.lowerExp === defaultConfig.formatOptions.lowerExp &&
      mathCellConfig.formatOptions.upperExp === defaultConfig.formatOptions.upperExp
    )
  }

  // clamp precision
  $: if (mathCellConfig.formatOptions.precision === null) {
    mathCellConfig.formatOptions.precision = defaultConfig.formatOptions.precision;
  } else if(mathCellConfig.formatOptions.precision > precisionUpperLimit) {
    mathCellConfig.formatOptions.precision = precisionUpperLimit;
  } else if(mathCellConfig.formatOptions.precision < (mathCellConfig.formatOptions.notation === "fixed" ? 0 : 1)) {
    mathCellConfig.formatOptions.precision = mathCellConfig.formatOptions.notation === "fixed" ? 0 : 1;
  }

  // clamp lowerExp
  $: if (mathCellConfig.formatOptions.lowerExp === null) {
    mathCellConfig.formatOptions.lowerExp = defaultConfig.formatOptions.lowerExp;
  } else if(mathCellConfig.formatOptions.lowerExp > lowerExpUpperLimit) {
    mathCellConfig.formatOptions.lowerExp = lowerExpUpperLimit;
  } else if(mathCellConfig.formatOptions.lowerExp < lowerExpLowerLimit) {
    mathCellConfig.formatOptions.lowerExp = lowerExpLowerLimit;
  }

  // clamp upperExp
  $: if (mathCellConfig.formatOptions.upperExp === null) {
    mathCellConfig.formatOptions.upperExp = defaultConfig.formatOptions.upperExp;
  } else if(mathCellConfig.formatOptions.upperExp > upperExpUpperLimit) {
    mathCellConfig.formatOptions.upperExp = upperExpUpperLimit;
  } else if(mathCellConfig.formatOptions.upperExp < upperExpLowerLimit) {
    mathCellConfig.formatOptions.upperExp = upperExpLowerLimit;
  }

  $: if (mathCellConfig && mathCell) {
    if(isDefault(mathCellConfig)) {
      mathCell.config = null;
    } else {
      mathCell.config = mathCellConfig;
    }
    
    if(mathCellElement) {
      mathCellElement.setNumberConfig();
    };
  }

</script>

<style>
  div.container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  div.number-input {
    max-width: 250px;
  }
</style>

<div class="container">
  <Checkbox
    bind:checked={mathCellConfig.symbolicOutput}
    labelText="Display Symbolic Results"
    on:change={() => {$unsavedChange = true; $autosaveNeeded = true;}}
  />

  <RadioButtonGroup
    disabled={mathCellConfig.symbolicOutput}
    legendText="Notation"
    bind:selected={mathCellConfig.formatOptions.notation}
    on:change={() => {$unsavedChange = true; $autosaveNeeded = true;}}
  >
    <RadioButton labelText="Automatic" value="auto" />
    <RadioButton labelText="Fixed" value="fixed" />
    <RadioButton labelText="Scientific" value="exponential" />
    <RadioButton labelText="Engineering" value="engineering" />
  </RadioButtonGroup>

  <div class="number-input">
    <NumberInput
      disabled={mathCellConfig.symbolicOutput}
      bind:value={mathCellConfig.formatOptions.precision}
      label={mathCellConfig.formatOptions.notation === "fixed" ? "Significant Figures After Decimal Point" : "Significant Figures"}
      size="sm"
      min={mathCellConfig.formatOptions.notation === "fixed" ? 0 : 1}
      max={precisionUpperLimit}
      on:input={() => {$unsavedChange = true; $autosaveNeeded = true;}}
    />
  </div>

  <div class="number-input">
    <NumberInput
      disabled={mathCellConfig.symbolicOutput || !(mathCellConfig.formatOptions.notation === "auto")}
      bind:value={mathCellConfig.formatOptions.lowerExp}
      label="Negative Exponent Threshold"
      size="sm"
      min={lowerExpLowerLimit}
      max={lowerExpUpperLimit}
      on:input={() => {$unsavedChange = true; $autosaveNeeded = true;}}
    />
  </div>

  <div class="number-input">
    <NumberInput
      disabled={mathCellConfig.symbolicOutput || !(mathCellConfig.formatOptions.notation === "auto")}
      bind:value={mathCellConfig.formatOptions.upperExp}
      label="Positive Exponent Threshold"
      size="sm"
      min={upperExpLowerLimit}
      max={upperExpUpperLimit}
      on:input={() => {$unsavedChange = true; $autosaveNeeded = true;}}
    />
  </div>

</div>