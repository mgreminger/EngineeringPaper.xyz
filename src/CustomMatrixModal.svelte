<script lang="ts">
  import type { MathField } from "./cells/MathField.svelte";
  import { MAX_MATRIX_COLS } from "./constants";
  import { getBlankMatrixLatex } from "./utility";

  import { Modal, NumberInput } from "carbon-components-svelte";

  interface Props {
    targetMathField: MathField;
    open: boolean;
  }

  let {
    targetMathField,
    open=$bindable()
  }: Props = $props();

  let numRows = $state(1);
  let numColumns = $state(1);

  function insertMatrix() {
    if (numRows > 0 && numColumns > 0 && numColumns <= MAX_MATRIX_COLS && targetMathField && targetMathField.element) {
      const mathLiveField = targetMathField.element.getMathField();
      mathLiveField.executeCommand(["insert", getBlankMatrixLatex(numRows, numColumns)]);
      open = false;
    }
  }

</script>

<style>
  div.number-input {
    max-width: 250px;
  }
</style>


<Modal
  passiveModal={false}
  bind:open
  modalHeading="Insert Empty Matrix"
  primaryButtonText="Insert"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => (open = false)}
  on:open
  on:close
  on:submit={insertMatrix}
  hasScrollingContent={false}
  preventCloseOnClickOutside={true}
>
  <div class="number-input">
    <NumberInput
      min={1}
      bind:value={numRows}
      label="Matrix Rows"
    />
  </div>

  <div class="number-input">
    <NumberInput
      min={1}
      max={MAX_MATRIX_COLS}
      bind:value={numColumns}
      label="Matrix Columns"
    />
  </div>
</Modal>