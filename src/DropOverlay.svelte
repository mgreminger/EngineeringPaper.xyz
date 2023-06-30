
<style>
  div.drop-overlay {
    position: absolute;
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
    align-items: center;
    color: white;
    font-size: 60px;
    height: 100%;
    width: 100%;
  }
</style>

<div 
  class="drop-overlay"
	on:drop|preventDefault
	on:dragover|preventDefault
	on:dragleave
  on:click
>
  <div class="message">
    Drop File or <br> Link to Open
  </div>
</div>

