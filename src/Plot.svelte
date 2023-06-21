<script lang="ts">
  import Plotly from 'plotly.js-basic-dist';
  import { onMobile } from './stores';
  import { debounce } from './utility';

  export let plotData = {data: [{}], layout: {}};

  let plotElement;
  let plotCreated = false;
  let currentPlotPromise = null;

  async function updatePlot() {
    await currentPlotPromise;
    currentPlotPromise = Plotly.react(plotElement, plotData.data, plotData.layout);
  }

  const debounceUpdatePlot = debounce(updatePlot, 300);

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
      debounceUpdatePlot();
    }
  }

</script>

<div bind:this={plotElement}></div>