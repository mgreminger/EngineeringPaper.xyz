<script lang="ts">
  import { onMount } from "svelte";

  import { Modal } from "carbon-components-svelte";

  import { TreeView } from "carbon-components-svelte";
  import { FileUploaderDropContainer } from "carbon-components-svelte";
  import { Tabs, Tab, TabContent } from "carbon-components-svelte";
  import type { RecentSheets } from "./types";

  interface Props {
    open: boolean;
    recentSheets: RecentSheets;
    prebuiltTables: {url: string, title: string}[];
    fileSelected: (arg: {detail: {file: File}}) => void;
    urlSelected: (arg: {detail: {url: string}}) => void;
  }

  let {
    open=$bindable(true),
    recentSheets,
    prebuiltTables,
    fileSelected,
    urlSelected
  }: Props = $props();

  let selectedTab = $state(0);
  let formUrl = $state("");

  let treeElements = $state([]);
  let urlMap = new Map();

  onMount(() => {
    updateTree();
  });

  function handleFileChange(e: CustomEvent<File[]>) {
    fileSelected({detail: { file: e.detail[0] }});
  }

  function handleSubmit() {
    urlSelected({detail: {url: selectedTab === 0 ? formUrl : ""}});
  }

  function updateTree() {
    let currentIndex = 0;
    treeElements = [];
    urlMap = new Map();

    if (prebuiltTables.length > 0) {
      const children = [];

      for (const item of prebuiltTables) {
        children.push({
          id: currentIndex,
          text: item.title
        });
        urlMap.set(currentIndex++, item.url);
      }

      treeElements.push({
        id: currentIndex++,
        text: "Prebuilt Tables",
        nodes: children
      });
    }

    if (recentSheets.size > 0) {
      const children = [];

      for (const [key, value] of recentSheets) {
        if ("url" in value) {
          children.push({
            id: currentIndex,
            text: value.title
          });
          urlMap.set(currentIndex++, value.url);
        }
      }

      treeElements.push({
        id: currentIndex++,
        text: "Recent Sheets",
        nodes: children
      });
    }
  }

  function handleSelect(e) {
    if (urlMap.has(e.detail.id)) {
      formUrl = urlMap.get(e.detail.id);
    }
  }

</script>

<style>
  input {
    width: 40em;
  }
</style>

<Modal
  passiveModal={false}
  bind:open
  modalHeading="Insert a Sheet"
  primaryButtonText="Insert"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => (open = false)}
  on:open
  on:close
  on:submit={handleSubmit}
  hasScrollingContent={true}
  preventCloseOnClickOutside={true}
>
  <Tabs bind:selected={selectedTab}>
    <Tab label="Select by URL" />
    <Tab label="Select by File" />
    <svelte:fragment slot="content">
      <TabContent>
        <div>
          <label for="url">URL of Sheet to Insert:</label>
          <input bind:value={formUrl} type="url" name="url">
        </div>

        <div>
          <TreeView
            labelText="Quick Links"
            nodes={treeElements}
            on:select={handleSelect}
          />
        </div>
      </TabContent>
      <TabContent>
        <FileUploaderDropContainer
          labelText="Drag and drop .epxyz files here or click to select"
          accept={[".epxyz"]}
          on:change={handleFileChange}
        />
      </TabContent>
    </svelte:fragment>
  </Tabs>
</Modal>






