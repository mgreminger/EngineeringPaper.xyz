<script lang="ts">
  import { ComboBox } from "carbon-components-svelte";
  import { type CustomBaseUnits, baseUnitChoices, getDefaultBaseUnits } from "./sheet/Sheet";

  export let baseUnits: CustomBaseUnits;

  export function resetDefaults() {
    baseUnits = getDefaultBaseUnits();
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
  {#each baseUnitChoices as dimension (dimension.name)}
    <div class="combo-input">
      <ComboBox
        titleText={dimension.label}
        placeholder="Select default unit method"
        bind:selectedId={baseUnits[dimension.name]}
        items={dimension.choices.map(value => ({id: value, text: value}))}
      />
    </div>
  {/each}
</div>


