<script>
  import { TreeView } from "carbon-components-svelte";

  export let url = "";
  export let recentSheets = [];
  export let prebuiltTables = [];

  let treeElements = [];
  let urlMap = new Map();

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
        children: children
      });
    }

    if (recentSheets.size > 0) {
      const children = [];

      for (const [key, value] of recentSheets) {
        children.push({
          id: currentIndex,
          text: value.title
        });
        urlMap.set(currentIndex++, value.url);
      }

      treeElements.push({
        id: currentIndex++,
        text: "Recent Sheets",
        children: children
      });
    }
  }


  function handleSelect(e) {
    if (urlMap.has(e.detail.id)) {
      url = urlMap.get(e.detail.id);
    }
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





