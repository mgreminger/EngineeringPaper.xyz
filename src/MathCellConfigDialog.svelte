<script lang="ts">
  import { Checkbox, NumberInput, Button, 
           RadioButtonGroup, RadioButton } from "carbon-components-svelte";  
  import { getDefaultMathCellConfig } from "./sheet/Sheet";
  import { unsavedChange, autosaveNeeded } from "./stores";

  export let mathCellConfig = getDefaultMathCellConfig();

  const defaultConfig = getDefaultMathCellConfig();

  const precisionUpperLimit = 64;
  const lowerExpLowerLimit = -12;
  const lowerExpUpperLimit = -2;
  const upperExpLowerLimit = 2;
  const upperExpUpperLimit = 12;

  function resetDefaults() {
    $unsavedChange = true;
    $autosaveNeeded = true;

    mathCellConfig.symbolicOutput = defaultConfig.symbolicOutput;
    mathCellConfig.formatOptions.notation = defaultConfig.formatOptions.notation;
    mathCellConfig.formatOptions.precision = defaultConfig.formatOptions.precision;
    mathCellConfig.formatOptions.lowerExp = defaultConfig.formatOptions.lowerExp;
    mathCellConfig.formatOptions.upperExp = defaultConfig.formatOptions.upperExp;
  }

  function clamp(value: number | null, lowerLimit: number,
                 upperLimit: number, defaultValue: number): number {
    $unsavedChange = true;
    $autosaveNeeded = true;

    if (!Number(value)) {
      return defaultValue;
    }
    if (value > upperLimit) {
      return upperLimit;
    }
    if (value < lowerLimit) {
      return lowerLimit;
    }
    return value;
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
      label="Precision"
      size="sm"
      min={1}
      max={precisionUpperLimit}
      on:input={(e) => {mathCellConfig.formatOptions.precision = clamp(e.detail, 1, precisionUpperLimit, defaultConfig.formatOptions.precision)}}
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
      on:input={(e) => {mathCellConfig.formatOptions.lowerExp = clamp(e.detail, lowerExpLowerLimit, lowerExpUpperLimit, defaultConfig.formatOptions.lowerExp)}}
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
      on:input={(e) => {mathCellConfig.formatOptions.upperExp = clamp(e.detail, upperExpLowerLimit, upperExpUpperLimit, defaultConfig.formatOptions.upperExp)}}
    />
  </div>

  <Button
    size="field"
    on:click={resetDefaults}
  >
    Reset Defaults
  </Button>
</div>