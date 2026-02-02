<script lang="ts">
  import { Checkbox } from "carbon-components-svelte";  
  import { defaultConfig, copyMathConfig, isDefaultMathConfig, 
           type MathCellConfig, getSafeMathConfig } from "./sheet/Sheet";
  import NumberFormatOptionsDialog from "./NumberFormatOptionsDialog.svelte";

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
  let numberFormatOptionsDialogElement: NumberFormatOptionsDialog;

  export function resetDefaults() {
    currentMathCellConfig = copyMathConfig(defaultMathConfig);
    numberFormatOptionsDialogElement.resetDefaults(false);
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

  <NumberFormatOptionsDialog
    bind:this={numberFormatOptionsDialogElement}
    bind:numberFormatOptions={currentMathCellConfig.numberFormatOptions}
    onchange={() => update()}
    symbolicOutput={currentMathCellConfig.symbolicOutput}
  />
</div>