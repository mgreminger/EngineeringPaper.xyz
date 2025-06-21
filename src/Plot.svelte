<script lang="ts">
  import { untrack } from 'svelte';
  import appState from './stores.svelte';
  import { debounce } from './utility';
  import { pngIcon, svgIcon } from './customPlotButtonIcons';

  let {
    plotData = {data: [{}], layout: {}},
    Plotly
  } = $props();

  let plotElement;
  let plotCreated = false;
  let currentPlotPromise = null;
  let mathJaxPassCompleted = false;

  export async function getImage(): Promise<string> {
    if (plotElement && plotCreated) {
      await currentPlotPromise;
      return await Plotly.toImage(plotElement, {format: 'png', width: 800, height: 500});
    } else {
      return "";
    }
  }

  async function updatePlot() {
    await currentPlotPromise;
    if (plotElement) {
      currentPlotPromise = Plotly.react(plotElement, plotData.data, plotData.layout);
    }
  }

  async function clearPlot() {
    await currentPlotPromise;

    if (plotElement) {
      currentPlotPromise = Plotly.react(plotElement, [{}], {});
    }
  }

  const debounceUpdatePlot = debounce(updatePlot, 300);

  const savePngButton = {
    name: 'Save Plot as PNG Image',
    icon: pngIcon,
    click: (gd) => Plotly.downloadImage(gd, {format: 'png'})
  };

  const saveSvgButton = {
    name: 'Save Plot as SVG Image',
    icon: svgIcon,
    click: (gd) => Plotly.downloadImage(gd, {format: 'svg'})
  };

  $effect(() => {
    if(plotData) {
      if(!plotCreated){
        const config = {
          displaylogo: false,
          responsive: true,
          displayModeBar: !appState.onMobile,
          staticPlot: appState.onMobile,
          modeBarButtons: [
            [savePngButton, saveSvgButton, 'zoom2d', 'pan2d', 
            'zoomIn2d', 'zoomOut2d', 'resetScale2d']
          ]
        };
        Plotly.newPlot( plotElement, plotData.data, plotData.layout, config)
              .then(() => plotCreated = true);
      } else {
        debounceUpdatePlot();
      }
    }
  });

</script>

<div bind:this={plotElement}></div>