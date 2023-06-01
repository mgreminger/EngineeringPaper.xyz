<script lang="ts">
  export let title: string = "";
  export let id: string = "";
  export let statusDot = false;

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
  on:click
  title={title}
  aria-label={statusDot ? `${title} with Status Modifier` : title}
  id={id}
  class:statusDot
>
  <div aria-hidden="true" class="icon">
    <slot></slot>
  </div>
  {#if statusDot}
    <div aria-hidden="true" class="dot"></div>
  {/if}
</button>