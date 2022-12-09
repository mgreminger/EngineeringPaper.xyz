<script lang="ts">
  import Plotly from 'plotly.js-basic-dist';
  import { onMobile } from './stores';

  export let plotData = {data: [{}], layout: {}};

  let plotElement;
  let plotCreated = false;

  $: if(plotElement && plotData) {
    if(!plotCreated){
      const config = {
        displaylogo: false,
        responsive: true,
        displayModeBar: !$onMobile,
        staticPlot: $onMobile
      }
      Plotly.newPlot( plotElement, plotData.data, plotData.layout, config)
        .then(() => plotCreated = true);
    } else {
      Plotly.react( plotElement, plotData.data, plotData.layout);
    }
  }

</script>

<div bind:this={plotElement}></div>