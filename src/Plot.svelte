<script>
  import Plotly from 'plotly.js-basic-dist';

  export let plotData = {};

  let plotElement;
  let plotCreated = false;

  $: if(plotElement && plotData) {
    if(!plotCreated){
      const config = {
        displaylogo: false,
        responsive: true
      }
      Plotly.newPlot( plotElement, plotData.data, plotData.layout, config)
        .then(() => plotCreated = true);
    } else {
      Plotly.react( plotElement, plotData.data, plotData.layout);
    }
  }

</script>

<div bind:this={plotElement}></div>