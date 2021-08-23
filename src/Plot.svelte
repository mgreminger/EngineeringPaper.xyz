<script>
  import { onMount } from 'svelte';
  import Plotly from 'plotly.js-basic-dist';

  export let plotData = {};

  let plotElement;
  let plotCreated = false;

  $: if(plotElement && plotData) {
    if(!plotCreated){
      Plotly.newPlot( plotElement, plotData.data, plotData.layout, {displayModeBar: false} )
        .then(() => plotCreated = true);
    } else {
      Plotly.react( plotElement, plotData.data, plotData.layout);
    }
  }

</script>

<div bind:this={plotElement}></div>