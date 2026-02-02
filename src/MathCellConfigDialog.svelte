<script lang="ts">
  import { Checkbox, NumberInput, Button, 
           RadioButtonGroup, RadioButton } from "carbon-components-svelte";  
  import { defaultConfig, copyMathConfig, isDefaultMathConfig, 
           type MathCellConfig, getSafeMathConfig, numberFormatLimits } from "./sheet/Sheet";

  interface Props {
    mathCellConfig: MathCellConfig;
    cellLevelConfig?: boolean;
    setCellNumberConfig?: (input: MathCellConfig) => void;
    mathCellChanged: () => void;
    triggerSaveNeeded: () => void;
  }

  let {
    mathCellConfig=$bindable(),
    cellLevelConfig=false,
    setCellNumberConfig,
    mathCellChanged,
    triggerSaveNeeded
  }: Props = $props();

  let defaultMathConfig = defaultConfig.mathCellConfig;
  let currentMathCellConfig = $state(copyMathConfig(mathCellConfig) ?? copyMathConfig(defaultMathConfig));

  export function resetDefaults() {
    currentMathCellConfig = copyMathConfig(defaultMathConfig);
    update();
  }

  function update(event: Event | null = null, resolve:boolean  = false) {
    let newConfig: MathCellConfig | null = getSafeMathConfig(currentMathCellConfig);

    if (cellLevelConfig && isDefaultMathConfig(newConfig)) {
      newConfig = null;
    }

    mathCellConfig = newConfig;

    if (cellLevelConfig && setCellNumberConfig) {
      setCellNumberConfig(mathCellConfig);
    }

    triggerSaveNeeded();
    if (resolve) {
      mathCellChanged();
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
    bind:selected={currentMathCellConfig.numberFormatOptions.notation}
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
      bind:value={currentMathCellConfig.numberFormatOptions.precision}
      label={currentMathCellConfig.numberFormatOptions.notation === "fixed" ? "Significant Figures After Decimal Point" : "Significant Figures"}
      size="sm"
      min={currentMathCellConfig.numberFormatOptions.notation === "fixed" ? 0 : 1}
      max={numberFormatLimits.precisionUpper}
      invalidText={`Value must be between ${currentMathCellConfig.numberFormatOptions.notation === "fixed" ? 0 : 1} and ${numberFormatLimits.precisionUpper}`}
      on:input={update}
    />
  </div>

  <div class="number-input">
    <NumberInput
      disabled={currentMathCellConfig.symbolicOutput || !(currentMathCellConfig.numberFormatOptions.notation === "auto")}
      bind:value={currentMathCellConfig.numberFormatOptions.lowerExp}
      label="Negative Exponent Threshold"
      size="sm"
      min={numberFormatLimits.lowerExpLower}
      max={numberFormatLimits.lowerExpUpper}
      invalidText={`Value must be between ${numberFormatLimits.lowerExpLower} and ${numberFormatLimits.lowerExpUpper}`}
      on:input={update}
    />
  </div>

  <div class="number-input">
    <NumberInput
      disabled={currentMathCellConfig.symbolicOutput || !(currentMathCellConfig.numberFormatOptions.notation === "auto")}
      bind:value={currentMathCellConfig.numberFormatOptions.upperExp}
      label="Positive Exponent Threshold"
      size="sm"
      min={numberFormatLimits.upperExpLower}
      max={numberFormatLimits.upperExpUpper}
      invalidText={`Value must be between ${numberFormatLimits.upperExpLower} and ${numberFormatLimits.upperExpUpper}`}
      on:input={update}
    />
  </div>

</div>