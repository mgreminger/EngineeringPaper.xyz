<script lang="ts">
  import { Modal, RadioButtonGroup, RadioButton, Checkbox, Select,
           SelectItem } from "carbon-components-svelte";
  import appState from "./stores.svelte";

  interface Props {
    open: boolean;
    downloadDocument: (arg: {detail: {docType: "docx" | "pdf" | "md" | "tex", 
                                      getShareableLink: boolean,
                                      centerEquations: boolean,
                                      paperSize: "a4" | "letter"
                                    }}) => void;
    downloadSheet: (arg: {detail: {saveAs: boolean}}) => void;
  }

  let {
    open = $bindable(true),
    downloadDocument,
    downloadSheet
  }: Props = $props();

  let docType: "epxyz" | "docx" | "pdf" | "md" | "tex" = $state("epxyz");
  let getShareableLink = $state(false);
  let saveAs = $state(false);

  async function handleSave() {
    open = false;
    if (docType === "epxyz") {
      downloadSheet({detail: {saveAs: saveAs}});
    } else {
      downloadDocument({detail: {docType: docType, 
                                 getShareableLink: getShareableLink,
                                 centerEquations: appState.exportCenteredEquations,
                                 paperSize: appState.paperSize
                                }});
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
      <RadioButton 
        labelText="Native EngineeringPaper.xyz .epxyz Sheet File (no data leaves your computer)" 
        value="epxyz"
      />
      <RadioButton 
        labelText="Markdown File (no data leaves your computer)" 
        value="md" 
      />
      <RadioButton value="docx">
        <svelte:fragment slot="labelText">
          Microsoft Word .docx File (processed on the EngineeringPaper.xyz server, no data is retained on the server, use 
          <a href="https://engineeringpaper.pro" target="_blank" rel="noopener noreferrer">EngineeringPaper.pro</a> 
          for fully private document generation without a watermark)
        </svelte:fragment>
      </RadioButton>
      <RadioButton value="pdf">
        <svelte:fragment slot="labelText">
          PDF File (processed on the EngineeringPaper.xyz server, no data is retained on the server, use 
          <a href="https://engineeringpaper.pro" target="_blank" rel="noopener noreferrer">EngineeringPaper.pro</a> 
          for fully private document generation without a watermark)
        </svelte:fragment>
      </RadioButton>
      <RadioButton value="tex">
        <svelte:fragment slot="labelText">
          LaTeX File (images and plots are not included, processed on the EngineeringPaper.xyz server, no data is retained on the server, use 
          <a href="https://engineeringpaper.pro" target="_blank" rel="noopener noreferrer">EngineeringPaper.pro</a> 
          for fully private document generation without a watermark)
        </svelte:fragment>
      </RadioButton>
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
      <Select
        labelText="Paper Size"
        bind:selected={appState.paperSize}
        disabled={docType === "epxyz" || docType === "md"}
      >
        <SelectItem value="letter" text="Letter" />
        <SelectItem value="a4" text="A4" />
      </Select>
      <div class="bx--label">Markdown Options</div>
      <Checkbox 
        labelText="Create a shareable link and add it to the generated document (only applies to md, docx, pdf, and tex files, anyone with this private link will be able to view your original sheet)"
        bind:checked={getShareableLink}
        disabled={docType === "epxyz"}
      />
      <Checkbox 
        labelText="Center equations"
        bind:checked={appState.exportCenteredEquations}
        disabled={docType === "epxyz"}
      />
    </div>
  </div>
</Modal>