<script lang="ts">
  import { ComboBox, ButtonSet, Button } from "carbon-components-svelte";
  import type { ComboBoxItem } from "carbon-components-svelte/src/ComboBox/ComboBox.svelte";
  import CheckmarkOutline from "carbon-icons-svelte/lib/CheckmarkOutline.svelte";
  import { type CustomBaseUnits, baseUnitSystems, baseUnitChoices, 
           getDefaultBaseUnits, isDefaultBaseUnits } from "./sheet/Sheet";

  interface Props {
    baseUnits: CustomBaseUnits;
    mathCellChanged: () => void;
  }

  let {
    baseUnits=$bindable(),
    mathCellChanged
  }: Props = $props();

  export function resetDefaults() {
    baseUnits = getDefaultBaseUnits();
  }

  function update() {
    mathCellChanged();
  }
</script>

<style>
  div.container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  div.combo-input {
    max-width: 250px;
  }
</style>


<div class="container">
  <div>
    <div class="bx--label">Unit System Shortcuts</div>
    <ButtonSet>
      {#each baseUnitSystems.keys() as name}
        <Button 
          kind="tertiary"
          on:click={() => baseUnits = getDefaultBaseUnits(name)}
          icon={isDefaultBaseUnits(baseUnits, name) ? CheckmarkOutline : null}
        >
          {name}
        </Button>
      {/each}
    </ButtonSet>
  </div>

  {#each baseUnitChoices as dimension (dimension.name)}
    <div class="combo-input">
      <ComboBox
        titleText={dimension.label}
        placeholder="Select default unit method"
        bind:selectedId={baseUnits[dimension.name]}
        items={dimension.choices.map(value => ({id: value, text: value}))}
        on:select={update}
      />
    </div>
  {/each}
</div>


