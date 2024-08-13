
<style>
  div.drop-overlay {
    position: absolute;
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 10000;
    background: none;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    border: none;
    background: grey;
    opacity: 50%;
  }

  div.message {
    display: flex;
    justify-content: center;
    color: white;
    width: 100%;
    height: fit-content;
  }

  div.message.main {
    font-size: 60px;
  }

  div.message {
    pointer-events: none;
  }
</style>

<!-- The drop overlay duplicates functionality available through the Open Sheet From File Button
     The overlay contains instructions for how to dismiss by either pressing escape or clicking
     the overlay -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
  class="drop-overlay"
	on:drop|preventDefault
	on:dragover|preventDefault
	on:dragleave
  on:click
>
  <div class="message main">
    Drop File or
  </div>
  <div class="message main">
    Link to Open
  </div>
  <div class="message">
    Hit Escape Key or Click to Dismiss
  </div>
</div>

