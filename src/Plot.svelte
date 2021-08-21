<script>
  import { onMount } from 'svelte';
  import Plotly from 'plotly.js-dist';

  export let plotData = {};

  let plotElement;
  let plot = null;
  let mounted = false;

  $: if(plotElement && plotData) {
    if(!plot){
      plot = Plotly.newPlot( plotElement, plotData.data, plotData.layout);
    } else {
      Plotly.react( plotElement, plotData.data, plotData.layout)
    }
  }

</script>

<div bind:this={plotElement}></div>