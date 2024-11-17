<script lang="ts">
  import { onMount } from "svelte";
  import { get, set } from 'idb-keyval';
  import { Button } from "carbon-components-svelte";
  import CheckmarkOutline from "carbon-icons-svelte/lib/CheckmarkOutline.svelte";
  import { type Config, configsEqual, getDefaultConfig, normalizeConfig } from "./sheet/Sheet";
  import { config } from "./stores";

  let userDefaultConfig: Config = getDefaultConfig();

  onMount(async () => {
    try {
      userDefaultConfig = normalizeConfig(await get('defaultConfig'));
    } catch(e) {
      console.warn('Error attempting to load user default config');
      userDefaultConfig = getDefaultConfig();
    }
  });

  async function setDefaultConfig() {
    let saveError = false;

    try {
      await set('defaultConfig', $config);
    } catch (e) {
      console.warn('Error attempting to save user default config');
      saveError = true;
    }

    if (saveError) {
      userDefaultConfig = getDefaultConfig();
    } else {
      userDefaultConfig = JSON.parse(JSON.stringify($config));
    }
  }

  $: configsMatch = configsEqual($config, userDefaultConfig)

</script>

<style>

</style>

<Button 
  kind="tertiary"
  on:click={setDefaultConfig}
  icon={configsMatch ? CheckmarkOutline : null}
>
  Use as Default Sheet Config
</Button>