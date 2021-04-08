<script>
  import { tick } from "svelte";
  import { cells, results, activeCell } from "./stores.js";
  import Cell from "./Cell.svelte";

  let containers = [];
  let dragging = false;
  let skeletonIndex;
  let draggingSourceId;
  let draggingContainer;
  let grabOffset;

  function startDrag(event) {
    if (!dragging) {
      draggingContainer = containers[event.detail.index];
      grabOffset = event.detail.clientY - draggingContainer.getBoundingClientRect().top;

      $activeCell = -1;
      // await tick();
      draggingSourceId = event.detail.id;

      skeletonIndex = event.detail.index;

      $cells = [...$cells.slice(0,event.detail.index), 
                {data: {id:-1, type: 'skeleton', height: draggingContainer.clientHeight}},
                ...$cells.slice(event.detail.index, $cells.length)];  

      // index = index + 1;

      dragging = true;
      document.body.style.cursor = "grabbing";
      draggingContainer.style.position = "absolute";
      window.addEventListener('mousemove', dragMove);
      window.addEventListener("mouseup", stopDrag);
    }
  }

  function stopDrag(event) {
    document.body.style.cursor = "auto";
    draggingContainer.style.position = "static";
    window.removeEventListener("mousemove", dragMove);
    window.removeEventListener("mouseup", stopDrag);

    const sourceIndex = $cells.map(cell => cell.data.id === draggingSourceId).indexOf(true);

    // swap skeleton with this cell and then remove the skeleton
    [$cells[skeletonIndex], $cells[sourceIndex]] = [$cells[sourceIndex], $cells[skeletonIndex]];
    $cells = $cells.filter(cell => cell.data.type !==  "skeleton");

    // if (index > skeletonIndex) {
    //   index = skeletonIndex;
    // } else {
    //   index = skeletonIndex -1;
    // }

    $results = [];

    dragging = false;
  }

  function dragMove(event) {
    if (dragging) {
      draggingContainer.style.top = `${event.clientY-grabOffset}px`;

      let targetIndex = -1;
      for (const [i, container] of containers.entries()) {
        if (container && container !== draggingContainer) {
          const rect = container.getBoundingClientRect()
          if (event.clientY > rect.top &&
              event.clientY < rect.bottom) {
            targetIndex = i;
            break;
          }
        }
      }

      if (targetIndex !== -1) {
        if ($cells[targetIndex].data.type !== "skeleton") {
          // swap with skeleton
          [$cells[skeletonIndex], $cells[targetIndex]] = [$cells[targetIndex], $cells[skeletonIndex]];
          skeletonIndex = targetIndex
        }
      }

    }
  }


</script>

{#each $cells as cell, i (cell.data.id)}
  <div bind:this={containers[i]}>
    <Cell index={i} on:startDrag={startDrag} />
  </div>
{/each}
