<script lang="ts">
  import type ImportCell from './cells/ImportCell.svelte';

  import { TooltipIcon } from 'carbon-components-svelte';
  import InsertPage from "carbon-icons-svelte/lib/InsertPage.svelte";

  import Error from "carbon-icons-svelte/lib/Error.svelte";

  interface Props {
    index: number;
    importCell: ImportCell;
  }

  let { index, importCell }: Props = $props();

  export function getMarkdown() {
    return "";
  }

</script>

<style>
  div.import-row {
    display: flex;
    align-items: center;
    gap: 5px;
  }
</style>

<p>
    Only <a href="https://engineeringpaper.pro" target="_blank">EngineeringPaper.pro</a> 
    supports externally imported sheets. For the web app, the sheets
    listed below must be manually inserted using the "Insert Sheet or Page Break Here" button <InsertPage />.
    Once these sheets are inserted, this cell may be deleted to remove this error.
    <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">The sheets listed below must be imported manually</span>
        <Error class="error"/>
    </TooltipIcon>
</p>
<p>
    Imported Sheets:
</p>

{#each importCell.imports as currentImport}
  <div class="import-row">
    <div>{currentImport}</div>
  </div>
{/each}
