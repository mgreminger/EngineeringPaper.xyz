<script lang="ts">
  import { NumberInput, RadioButtonGroup, RadioButton } from "carbon-components-svelte";
  import { defaultConfig, getSafeNumberFormatOptions, isDefaultNumberFormatOptions, numberFormatLimits, type NumberFormatOptions } from "./sheet/Sheet";

  interface Props {
    numberFormatOptions: NumberFormatOptions | null;
    symbolicOutput?: boolean;
    nullIfDefault?: boolean;
    onchange: (numberFormatOptions: NumberFormatOptions) => void;
  }

  let {
    numberFormatOptions=$bindable(),
    symbolicOutput=false,
    nullIfDefault=false,
    onchange
  }: Props = $props();

  let defaultNumberFormatOptions = defaultConfig.mathCellConfig.formatOptions;
  let currentNumberFormatOptions = $state(numberFormatOptions ? {...numberFormatOptions} : {...defaultNumberFormatOptions});

  export function resetDefaults(forceUpdate = true) {
    currentNumberFormatOptions = {...defaultNumberFormatOptions};
    if (forceUpdate) {
      update();
    }
  }

  function update(event: Event | null = null) {
    let newOptions: NumberFormatOptions = getSafeNumberFormatOptions(currentNumberFormatOptions);

    if (nullIfDefault && isDefaultNumberFormatOptions(newOptions)) {
      newOptions = null;
    }

    numberFormatOptions = newOptions;

    onchange(numberFormatOptions);
  }

</script>

<style>
  div.number-input {
    max-width: 250px;
  }
</style>

<RadioButtonGroup
  disabled={symbolicOutput}
  legendText="Notation"
  bind:selected={currentNumberFormatOptions.notation}
  on:change={update}
>
  <RadioButton labelText="Automatic" value="auto" />
  <RadioButton labelText="Fixed" value="fixed" />
  <RadioButton labelText="Scientific" value="exponential" />
  <RadioButton labelText="Engineering" value="engineering" />
</RadioButtonGroup>

<div class="number-input">
  <NumberInput
    disabled={symbolicOutput}
    bind:value={currentNumberFormatOptions.precision}
    label={currentNumberFormatOptions.notation === "fixed" ? "Significant Figures After Decimal Point" : "Significant Figures"}
    size="sm"
    min={currentNumberFormatOptions.notation === "fixed" ? 0 : 1}
    max={numberFormatLimits.precisionUpper}
    invalidText={`Value must be between ${currentNumberFormatOptions.notation === "fixed" ? 0 : 1} and ${numberFormatLimits.precisionUpper}`}
    on:input={update}
  />
</div>

<div class="number-input">
  <NumberInput
    disabled={symbolicOutput || !(currentNumberFormatOptions.notation === "auto")}
    bind:value={currentNumberFormatOptions.lowerExp}
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
    disabled={symbolicOutput || !(currentNumberFormatOptions.notation === "auto")}
    bind:value={currentNumberFormatOptions.upperExp}
    label="Positive Exponent Threshold"
    size="sm"
    min={numberFormatLimits.upperExpLower}
    max={numberFormatLimits.upperExpUpper}
    invalidText={`Value must be between ${numberFormatLimits.upperExpLower} and ${numberFormatLimits.upperExpUpper}`}
    on:input={update}
  />
</div>