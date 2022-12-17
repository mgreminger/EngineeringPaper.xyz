<script>
  import { modifierKey } from "./stores";

  const modifier = $modifierKey === "ctrlKey" ? "Ctrl" : "Cmd"
</script>

<style>
  table {
    border-collapse: collapse;
    margin: 1rem 0;
  }
  table,
  th,
  td {
    border: 1px solid darkgray;
  }

  td.first-column {
    white-space: nowrap;
  }

  th,
  td {
    padding: 5px;
    text-align: left;
    vertical-align: middle;
  }
  th {
    font-weight: bold;
  }

  span.key {
    padding: 1px 6px;
    background-color: #b3b3b3;
    color: white;
    border-radius: 2px;
  }

</style>

<table>
  <tbody>
    <tr>
      <th class="first-column">Key Combination</th>
      <th>Action</th>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">S</span></td>
      <td>Save current sheet</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Z</span></td>
      <td>Undo edit in current math or text field</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Y</span></td>
      <td>Redo edit in current math or text field</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">&uarr</span></td>
      <td>Select cell above current cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">&darr</span></td>
      <td>Select cell below current cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">D</span></td>
      <td>Delete current cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">Enter</span></td>
      <td
        >Insert Math Cell when in a Math Cell, or add row when in a Plot, Table,
        Piecewise Expression, or System Solve Cell</td
      >
    </tr>
    <tr>
      <td class="first-column"><span class="key">Shift</span> + <span class="key">Enter</span></td>
      <td>Insert Math Cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Enter</span> then <span class="key">1</span></td>
      <td>Insert Math Cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Enter</span> then <span class="key">2</span></td>
      <td>Insert Documentation Cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Enter</span> then <span class="key">3</span></td>
      <td>Insert Plot Cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Enter</span> then <span class="key">4</span></td>
      <td>Insert Table Cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Enter</span> then <span class="key">5</span></td>
      <td>Insert Piecewise Expression Cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Enter</span> then <span class="key">6</span></td>
      <td>Insert System Solve Cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Enter</span> then <span class="key">7</span></td>
      <td>Insert Sheet</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">Esc</span></td>
      <td>Unselect all cells</td>
    </tr>
  </tbody>
</table>


