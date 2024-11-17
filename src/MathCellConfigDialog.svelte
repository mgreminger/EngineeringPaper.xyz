<script lang="ts">
  import { Checkbox, NumberInput, Button, 
           RadioButtonGroup, RadioButton } from "carbon-components-svelte";  
  import { defaultConfig, copyMathConfig, isDefaultMathConfig, 
           type MathCellConfig, getSafeMathConfig, mathConfigLimits } from "./sheet/Sheet";
  import { unsavedChange, autosaveNeeded, mathCellChanged } from "./stores";
  import type MathCellElement from "./MathCell.svelte";

  export let mathCellConfig: MathCellConfig | null;
  export let cellLevelConfig = false;
  export let mathCellElement: MathCellElement | null = null;

  let defaultMathConfig = defaultConfig.mathCellConfig;
  let currentMathCellConfig = copyMathConfig(mathCellConfig) ?? copyMathConfig(defaultMathConfig);

  export function resetDefaults() {
    currentMathCellConfig = copyMathConfig(defaultMathConfig);
    update();
  }

  function update(event: Event | null = null, resolve:boolean  = false) {
    if (resolve) {
      $mathCellChanged = true;
    } else {
      $unsavedChange = true;
      $autosaveNeeded = true;
    }

    let newConfig: MathCellConfig | null = getSafeMathConfig(currentMathCellConfig);

    if (cellLevelConfig && isDefaultMathConfig(newConfig)) {
      newConfig = null;
    }

    mathCellConfig = newConfig;

    if (cellLevelConfig && mathCellElement) {
      mathCellElement.setNumberConfig(mathCellConfig);
    }
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

<Checkbox
  bind:checked={currentMathCellConfig.symbolicOutput}
  labelText="Display Symbolic Results"
  on:change={update}
/>

<div class="container">
  <Checkbox
    bind:checked={currentMathCellConfig.showIntermediateResults}
    labelText="Show Intermediate Results"
    on:change={() => update(null, true)}
  />

  <RadioButtonGroup
    disabled={currentMathCellConfig.symbolicOutput}
    legendText="Notation"
    bind:selected={currentMathCellConfig.formatOptions.notation}
    on:change={update}
  >
    <RadioButton labelText="Automatic" value="auto" />
    <RadioButton labelText="Fixed" value="fixed" />
    <RadioButton labelText="Scientific" value="exponential" />
    <RadioButton labelText="Engineering" value="engineering" />
  </RadioButtonGroup>

  <div class="number-input">
    <NumberInput
      disabled={currentMathCellConfig.symbolicOutput}
      bind:value={currentMathCellConfig.formatOptions.precision}
      label={currentMathCellConfig.formatOptions.notation === "fixed" ? "Significant Figures After Decimal Point" : "Significant Figures"}
      size="sm"
      min={currentMathCellConfig.formatOptions.notation === "fixed" ? 0 : 1}
      max={mathConfigLimits.precisionUpper}
      invalidText={`Value must be between ${currentMathCellConfig.formatOptions.notation === "fixed" ? 0 : 1} and ${mathConfigLimits.precisionUpper}`}
      on:input={update}
    />
  </div>

  <div class="number-input">
    <NumberInput
      disabled={currentMathCellConfig.symbolicOutput || !(currentMathCellConfig.formatOptions.notation === "auto")}
      bind:value={currentMathCellConfig.formatOptions.lowerExp}
      label="Negative Exponent Threshold"
      size="sm"
      min={mathConfigLimits.lowerExpLower}
      max={mathConfigLimits.lowerExpUpper}
      invalidText={`Value must be between ${mathConfigLimits.lowerExpLower} and ${mathConfigLimits.lowerExpUpper}`}
      on:input={update}
    />
  </div>

  <div class="number-input">
    <NumberInput
      disabled={currentMathCellConfig.symbolicOutput || !(currentMathCellConfig.formatOptions.notation === "auto")}
      bind:value={currentMathCellConfig.formatOptions.upperExp}
      label="Positive Exponent Threshold"
      size="sm"
      min={mathConfigLimits.upperExpLower}
      max={mathConfigLimits.upperExpUpper}
      invalidText={`Value must be between ${mathConfigLimits.upperExpLower} and ${mathConfigLimits.upperExpUpper}`}
      on:input={update}
    />
  </div>

</div>