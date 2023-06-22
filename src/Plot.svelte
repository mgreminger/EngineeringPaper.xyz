<script lang="ts">
  import Plotly from 'plotly.js-basic-dist';
  import { onMobile, mathJaxLoaded } from './stores';
  import { debounce } from './utility';

  export let plotData = {data: [{}], layout: {}};

  let plotElement;
  let plotCreated = false;
  let currentPlotPromise = null;
  let mathJaxPassCompleted = false

  async function updatePlot() {
    await currentPlotPromise;
    if (!mathJaxPassCompleted && $mathJaxLoaded) {
      mathJaxPassCompleted = true;
    }
    currentPlotPromise = Plotly.react(plotElement, plotData.data, plotData.layout);
  }

  async function clearPlot() {
    await currentPlotPromise;
    currentPlotPromise = Plotly.react(plotElement, [{}], {});
  }

  const debounceUpdatePlot = debounce(updatePlot, 300);

  const saveSvgButton = {
    name: 'Download plot as an svg',
    icon: Plotly.Icons.camera,
    click: (gd) => Plotly.downloadImage(gd, {format: 'svg'})
  };

  $: if(plotElement && plotData) {
    if(!plotCreated){
      const config = {
        displaylogo: false,
        responsive: true,
        displayModeBar: !$onMobile,
        staticPlot: $onMobile,
        modeBarButtons: [
          ['toImage'],
          [saveSvgButton],
          ['zoom2d', 'pan2d', 'zoomIn2d', 'zoomOut2d', 'resetScale2d']
        ]
      };
      if (!mathJaxPassCompleted && $mathJaxLoaded) {
        mathJaxPassCompleted = true;
      }
      Plotly.newPlot( plotElement, plotData.data, plotData.layout, config)
        .then(() => plotCreated = true);
    } else {
      debounceUpdatePlot();
    }
  }

  $: if($mathJaxLoaded && !mathJaxPassCompleted && plotCreated && plotElement) {
    // need to clear plot first otherwise Plotly won't recreate plot
    (async function() {
      await clearPlot();
      await updatePlot();
    })();
  }

</script>

<div bind:this={plotElement}></div>