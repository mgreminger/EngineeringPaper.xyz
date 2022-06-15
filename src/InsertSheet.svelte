<script>
  import { onMount } from 'svelte';
  import { TreeView } from "carbon-components-svelte";

  export let url = "";
  export let recentSheets = [];
  export let prebuiltTables = [];

  let treeElements = [];

  onMount(updateTree);

  function updateTree() {
    let currentIndex = 0;
    treeElements = [];

    if (prebuiltTables.length > 0) {
      treeElements.push({
        id: currentIndex++,
        text: "Prebuilt Tables",
        children: prebuiltTables.map(item => {
          return {
            id: currentIndex++, 
            url: item.url, 
            text: item.title};
          })
      });
    }

    if (recentSheets.size > 0) {
      const children = [];

      for (const [key, value] of recentSheets) {
        children.push({
          id: currentIndex++,
          url: value.url,
          text: value.title
        });
      }

      treeElements.push({
        id: currentIndex++,
        text: "Recent Sheets",
        children: children
      });
    }
  }


  function handleSelect(e) {
    url = e.detail.url;
  }

  $: if (recentSheets.size > 0 || prebuiltTables.length > 0) {
    updateTree();
  }
</script>


<div>
  <label for="url">Sheet URL to Insert:</label>
  <input bind:value={url} name="url">
</div>

<div>
  <TreeView
    labelText="Quick Links"
    children={treeElements}
    on:select={handleSelect}
  />
</div>





