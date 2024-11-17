<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import CheckmarkOutline from "carbon-icons-svelte/lib/CheckmarkOutline.svelte";
  import { type Config, configsEqual, getDefaultConfig } from "./sheet/Sheet";
  import { config, userDefaultConfig } from "./stores";
  import { set } from 'idb-keyval';

  async function setDefaultConfig() {
    let saveError = false;

    try {
      await set('defaultConfig', $config);
    } catch (e) {
      saveError = true;
    }

    if (saveError) {
      $userDefaultConfig = getDefaultConfig();
    } else {
      $userDefaultConfig = {...$config};
    }
  }

  $: configsMatch = configsEqual($config, $userDefaultConfig)

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