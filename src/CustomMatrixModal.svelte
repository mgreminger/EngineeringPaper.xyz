<script lang="ts">
  import type { MathField } from "./cells/MathField";
  import { getBlankMatrixLatex } from "./utility";

  import { Modal, NumberInput } from "carbon-components-svelte";

  export let targetMathField: MathField | undefined;
  export let open = true;

  let numRows = 1;
  let numColumns = 1;

  function insertMatrix() {
    if (numRows > 0 && numColumns > 0 && targetMathField && targetMathField.element) {
      const mathLiveField = targetMathField.element.getMathField();
      mathLiveField.executeCommand(["insert", getBlankMatrixLatex(numRows, numColumns)]);
    }

    open = false;
  }

</script>


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
  preventCloseOnClickOutside={false}
>
  <NumberInput
    min={1}
    max={20}
    bind:value={numRows}
    label="Matrix Rows"
  />
  <NumberInput
    min={1}
    max={20}
    bind:value={numColumns}
    label="Matrix Columns"
  />
</Modal>