<script lang="ts">

  export function getMarkdown() {
    return "\\newpage\n\n";
  }

</script>

<style>
  div.container {
    display: flex;
    gap: 6px;
  }

  @media print {
    div.container {
      display: none;
    }

    :global(li:has(.page-break)) {
      break-after: page;
      height: 1px;
    }

    div.page-break {
      display: block;
      height: 1px;
    }
  }

  div.text {
    white-space: nowrap
  }

  div.page-break {
    display: none;
  }

  hr {
    width: 47.5%;
    border: 0;
    height: 2px;
    border-radius: 1px;
    background: lightgray;
  }
</style>

<div class="container">
    <hr>
    <div class="text">
        Page Break
    </div>
    <hr>
</div>
<div class="page-break">&nbsp;</div>
