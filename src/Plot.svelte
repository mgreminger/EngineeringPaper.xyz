<script>
  import { onMount } from 'svelte';
  import Plotly from 'plotly.js-dist';

  export let plotData = {};

  let plotElement;
  let plot = null;
  let mounted = false;

  onMount( () => {
    plot = Plotly.newPlot( plotElement, plotData.data, plotData.layout);
    mounted = true;
  });

  $: if(mounted && plotData) {
    if(!plot){
      plot = Plotly.newPlot( plotElement, plotData.data, plotData.layout);
    } else {
      Plotly.react( plotElement, plotData.data, plotData.layout)
    }
  }

</script>

<div bind:this={plotElement} style="width:800px;height:600px;"></div>