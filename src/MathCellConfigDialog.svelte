<script lang="ts">
  import { Checkbox, NumberInput, Button, 
           RadioButtonGroup, RadioButton } from "carbon-components-svelte";  
  import { getDefaultMathCellConfig, type MathCellConfig } from "./sheet/Sheet";
  import { unsavedChange, autosaveNeeded } from "./stores";
  import type MathCell from "./cells/MathCell";
  import type MathCellElement from "./MathCell.svelte";

  // the thrid property is used for setting the numnber properties for a whole sheet
  export let mathCellConfig: MathCellConfig | null;
  export let cellLevelConfig = false;
  export let mathCellElement: MathCellElement | null = null;

  const defaultConfig = getDefaultMathCellConfig();

  let currentMathCellConfig = copyConfig(mathCellConfig) ?? copyConfig(defaultConfig);

  const precisionUpperLimit = 64;
  const lowerExpLowerLimit = -12;
  const lowerExpUpperLimit = -2;
  const upperExpLowerLimit = 2;
  const upperExpUpperLimit = 12;

  export function resetDefaults() {
    currentMathCellConfig = copyConfig(defaultConfig);
    update();
  }

  function isDefault(config: MathCellConfig): boolean {
    return (
      currentMathCellConfig.symbolicOutput === defaultConfig.symbolicOutput &&
      currentMathCellConfig.formatOptions.notation === defaultConfig.formatOptions.notation &&
      currentMathCellConfig.formatOptions.precision === defaultConfig.formatOptions.precision &&
      currentMathCellConfig.formatOptions.lowerExp === defaultConfig.formatOptions.lowerExp &&
      currentMathCellConfig.formatOptions.upperExp === defaultConfig.formatOptions.upperExp
    )
  }

  function copyConfig(input: MathCellConfig): MathCellConfig {
    if (input === null) {
      return null;
    }

    return {
      symbolicOutput: input.symbolicOutput,
      formatOptions: {...input.formatOptions}
    };
  }

  function getSafeConfig(): MathCellConfig {
    const safeConfig = copyConfig(currentMathCellConfig);

    // clamp precision
    if (currentMathCellConfig.formatOptions.precision === null) {
      safeConfig.formatOptions.precision = defaultConfig.formatOptions.precision;
    } else if(currentMathCellConfig.formatOptions.precision > precisionUpperLimit) {
      safeConfig.formatOptions.precision = precisionUpperLimit;
    } else if(currentMathCellConfig.formatOptions.precision < (currentMathCellConfig.formatOptions.notation === "fixed" ? 0 : 1)) {
      safeConfig.formatOptions.precision = currentMathCellConfig.formatOptions.notation === "fixed" ? 0 : 1;
    }

    // clamp lowerExp
    if (currentMathCellConfig.formatOptions.lowerExp === null) {
      safeConfig.formatOptions.lowerExp = defaultConfig.formatOptions.lowerExp;
    } else if(currentMathCellConfig.formatOptions.lowerExp > lowerExpUpperLimit) {
      safeConfig.formatOptions.lowerExp = lowerExpUpperLimit;
    } else if(currentMathCellConfig.formatOptions.lowerExp < lowerExpLowerLimit) {
      safeConfig.formatOptions.lowerExp = lowerExpLowerLimit;
    }

    // clamp upperExp
    if (currentMathCellConfig.formatOptions.upperExp === null) {
      safeConfig.formatOptions.upperExp = defaultConfig.formatOptions.upperExp;
    } else if(currentMathCellConfig.formatOptions.upperExp > upperExpUpperLimit) {
      safeConfig.formatOptions.upperExp = upperExpUpperLimit;
    } else if(currentMathCellConfig.formatOptions.upperExp < upperExpLowerLimit) {
      safeConfig.formatOptions.upperExp = upperExpLowerLimit;
    }

    return safeConfig;
  }

  function update() {
    $unsavedChange = true;
    $autosaveNeeded = true;

    let newConfig: MathCellConfig | null = getSafeConfig();

    if (cellLevelConfig && isDefault(newConfig)) {
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

<div class="container">
  <Checkbox
    bind:checked={currentMathCellConfig.symbolicOutput}
    labelText="Display Symbolic Results"
    on:change={update}
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
      max={precisionUpperLimit}
      invalidText={`Value must be between ${currentMathCellConfig.formatOptions.notation === "fixed" ? 0 : 1} and ${precisionUpperLimit}`}
      on:input={update}
    />
  </div>

  <div class="number-input">
    <NumberInput
      disabled={currentMathCellConfig.symbolicOutput || !(currentMathCellConfig.formatOptions.notation === "auto")}
      bind:value={currentMathCellConfig.formatOptions.lowerExp}
      label="Negative Exponent Threshold"
      size="sm"
      min={lowerExpLowerLimit}
      max={lowerExpUpperLimit}
      invalidText={`Value must be between ${lowerExpLowerLimit} and ${lowerExpUpperLimit}`}
      on:input={update}
    />
  </div>

  <div class="number-input">
    <NumberInput
      disabled={currentMathCellConfig.symbolicOutput || !(currentMathCellConfig.formatOptions.notation === "auto")}
      bind:value={currentMathCellConfig.formatOptions.upperExp}
      label="Positive Exponent Threshold"
      size="sm"
      min={upperExpLowerLimit}
      max={upperExpUpperLimit}
      invalidText={`Value must be between ${upperExpLowerLimit} and ${upperExpUpperLimit}`}
      on:input={update}
    />
  </div>

</div>