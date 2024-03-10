<script lang="ts">
  import { Modal, RadioButtonGroup, RadioButton, Checkbox } from "carbon-components-svelte";
  import { createEventDispatcher } from "svelte";

  export let open = true;

  const dispatch = createEventDispatcher<{
    downloadDocument: {docType: "docx" | "pdf" | "md" | "tex", getShareableLink: boolean};
    downloadSheet: {saveAs: boolean};
  }>();

  let docType: "epxyz" | "docx" | "pdf" | "md" | "tex" = "epxyz";
  let getShareableLink = false;
  let saveAs = false;

  async function handleSave() {
    open = false;
    if (docType === "epxyz") {
      dispatch("downloadSheet", {saveAs: saveAs});
    } else {
      dispatch("downloadDocument", {docType: docType, getShareableLink: getShareableLink});
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

<Modal
  passiveModal={false}
  bind:open
  modalHeading="Save Document"
  primaryButtonText="Save"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => (open = false)}
  on:open
  on:close
  on:submit={handleSave}
  hasScrollingContent={false}
  preventCloseOnClickOutside={false}
>
  <div class="container">
    <RadioButtonGroup
      orientation="vertical"
      legendText="Document Type"
      name="document-type"
      required={true}
      bind:selected={docType}
    >
      <RadioButton labelText="Native EngineeringPaper.xyz .epxyz Sheet File (no data leaves your computer)" value="epxyz"/>
      <RadioButton labelText="Markdown File (no data leaves your computer)" value="md" />
      <RadioButton labelText="Microsoft Word .docx File (processed on the EngineeringPaper.xyz server, no data is retained on the server)" value="docx" />
      <RadioButton labelText="PDF File (processed on the EngineeringPaper.xyz server, no data is retained on the server)" value="pdf" />
      <RadioButton labelText="LaTeX File (images and plots are not included, processed on the EngineeringPaper.xyz server, no data is retained on the server)" value="tex" />
    </RadioButtonGroup>
    {#if window.showSaveFilePicker}
      <div>
        <div class="bx--label">Save As</div>
        <Checkbox 
          labelText="Prompt to change file name"
          bind:checked={saveAs}
          disabled={docType !== "epxyz"}
        />
      </div>
    {/if}
    <div>
      <div class="bx--label">Shareable Link</div>
      <Checkbox 
        labelText="Create a shareable link and add it to the generated document (only applies to md, docx, pdf, and tex files, anyone with this private link will be able to view your original sheet)"
        bind:checked={getShareableLink}
        disabled={docType === "epxyz"}
      />
    </div>
  </div>
</Modal>