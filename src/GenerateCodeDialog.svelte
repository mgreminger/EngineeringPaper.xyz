<script lang="ts">
  import { InlineLoading, CodeSnippet } from 'carbon-components-svelte';
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import { onDestroy } from 'svelte';
  import appState from './stores.svelte';
  
  interface Props {
    generatedCode: string;
  }

  let {
    generatedCode
  }: Props = $props();

  onDestroy(() => appState.codeGenerationSource = null);

</script>

<style>
  div.info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-block-end: 10px;
  }
</style>

<div class="info">
  <Information color="blue"/>
  <div>
    Always test the generated code against known values, report issues or errors to 
    <a href="mailto:support@engineeringpaper.com">support@engineeringpaper.com</a>
  </div>
</div>


{#if generatedCode}
  <CodeSnippet
    type="multi"
    showMoreLess={false}
    code={generatedCode}
    expanded
    light={true}
  />
{:else}
  <InlineLoading description="Generating Python Code..."/>
{/if}