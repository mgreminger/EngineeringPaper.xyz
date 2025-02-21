<script lang="ts">
  import type { Snippet } from 'svelte';
  import appState from './stores.svelte';

  interface Props {
    title?: string;
    statusDotTitle?: string;
    id?: string;
    statusDot?: boolean;
    noTouch?: boolean;
    click?: () => void;
    children: Snippet;
  }

  let { 
    title = "",
    statusDotTitle = "",
    id = "",
    statusDot = false,
    noTouch = false,
    click,
    children
  }: Props = $props();

  let currentTitle = $derived(statusDot && Boolean(statusDotTitle) ? statusDotTitle : title);;

  function handleClick(event: MouseEvent) {
    if (!noTouch || (event as PointerEvent).pointerType !== "touch") {
      click?.();
    }
  }

</script>

<style>
  button {
    background: none;
    border: none;
    border-radius: 50%;
    position: relative;
    width: 20px;
    height: 20px;
    display: flex;
    cursor: inherit;
  }

  button:not(.statusDot) {
    contain: content;
  }

  button:hover {
    background: gainsboro;
  }

  div.icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    height: 16px;
    width: 16px;
  }

  div.dot {
    position: absolute;
    top: 0%;
    right: 0%;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background-color: limegreen;
  }
</style>

<button
  onclick={handleClick}
  title={currentTitle}
  aria-label={currentTitle}
  id={id}
  class:statusDot
>
  <div class="icon">
    {@render children()}
  </div>
  {#if statusDot}
    <div class="dot"></div>
  {/if}
</button>