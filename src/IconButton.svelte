<script lang="ts">
  export let title: string;
  export let id: string;

</script>

<style>
  button {
    background: none;
    border: none;
    border-radius: 50%;
    position: relative;
    width: 20px;
    height: 20px;
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
</style>

<button
  on:click
  title={title}
  id={id}
>
  <div class="icon">
    <slot></slot>
  </div>
</button>