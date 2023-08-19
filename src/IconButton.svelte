<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { modifierKey } from './stores';
  
  export let title = "";
  export let statusDotTitle = "";
  export let id = "";
  export let statusDot = false;
  export let noTouch = false;

  let currentTitle: string;

  const dispatch = createEventDispatcher();

  function handlePointerUp(event: PointerEvent) {
    if (!noTouch || event.pointerType !== "touch") {
      dispatch("click");
    }
  }

  function handleKeyboard(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === " " || (event.key === "Enter" && !event.shiftKey && !event[$modifierKey]) ) {
      handlePointerUp(new PointerEvent("pointerup", {pointerType: "mouse"}));
      event.preventDefault();
    }
  }

  $: currentTitle = statusDot && Boolean(statusDotTitle) ? statusDotTitle : title;

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
  on:pointerup={handlePointerUp}
  on:keydown={handleKeyboard}
  title={currentTitle}
  aria-label={currentTitle}
  id={id}
  class:statusDot
>
  <div class="icon">
    <slot></slot>
  </div>
  {#if statusDot}
    <div class="dot"></div>
  {/if}
</button>