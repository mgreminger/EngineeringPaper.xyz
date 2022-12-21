<script lang="ts">
  import { onMount } from "svelte";

  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Checkmark from "carbon-icons-svelte/lib/Checkmark.svelte";

  let persisted = false;

  onMount(async () => {
    persisted = await navigator.storage.persisted();
  });

  async function requestPersistentStorage() {
    persisted = await navigator.storage.persist();
  }

</script>

<p>
  EngineeringPaper.xyz uses your browser's local storage to store autosave checkpoints and your 
  list of recently visited sheets. Your web browser will not automatically persist this local storage
  and may clear it at any time. Safari is particularly aggressive about freeing this storage and will 
  automatically clear local storage for a site that has not been visited in the previous seven days.
</p>

<br>

<p>
  Click the button below to request that your browser enables persistent local storage for the 
  EngineeringPaper.xyz domain. Your browser will likely prompt you to approve this request. 
</p>

<br>

<p>
  {#if persisted}
    <Checkmark color="green"/> Persistent local storage is currently enabled.
  {:else}
    <Error color="red"/> Persistent local storage is currently disabled.
  {/if}
</p>

<br>

<p>
<button
  on:click={requestPersistentStorage}
>
  Request Persistent Storage
</button>
</p>
