<script>
    export let tabs = [];
    export let selectedTab = 0;
  </script>
  
  <style>
    .tab {
      overflow: hidden;
      border: 1px solid #ccc;
      background-color: #f1f1f1;
      grid-column: 1;
      grid-row: 1;
    }
    .tab button {
      background-color: inherit;
      float: left;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 2px 2px;
      transition: 0.3s;
      margin: 0;
      border-radius: 0;
    }
    .tab button:hover {
      background-color: #ddd;
    }
    .tab button.selected {
      background-color: #ccc;
    }
    .tabcontent {
      display: block;
      padding: 2px 2px;
      border: 1px solid #ccc;
      border-top: none;
      grid-column: 1;
      grid-row: 2;
    }

    .container {
      display: grid;
      grid-template-columns: min-content;
      grid-template-rows: min-content min-content;
    }
  </style>
  
  <div class="container">
    <div class="tab">
      {#each tabs as tab, i}
        <button class="{selectedTab === i ? 'selected' : ''}"
        on:click={() => selectedTab=i}>{tab}</button>
      {/each}
    </div>
    
    <div class="tabcontent">
      <slot></slot>
    </div>
  </div>