<script>
  import { modifierKey } from "./stores";

  const modifier = $modifierKey === "ctrlKey" ? "Control" : "Command"
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
  }
  th {
    font-weight: bold;
  }
</style>

<table>
  <tbody>
    <tr>
      <th>Key Combination</th>
      <th>Action</th>
    </tr>
    <tr>
      <td class="first-column">{modifier}-S</td>
      <td>Save current sheet</td>
    </tr>
    <tr>
      <td class="first-column">{modifier}-Up Arrow</td>
      <td>Select cell above current cell</td>
    </tr>
    <tr>
      <td class="first-column">{modifier}-Down Arrow</td>
      <td>Select cell below current cell</td>
    </tr>
    <tr>
      <td class="first-column">{modifier}-D</td>
      <td>Delete current cell</td>
    </tr>
    <tr>
      <td class="first-column">Enter</td>
      <td
        >Insert Math Cell when in a Math Cell, or add row when in a Plot, Table,
        Piecewise Expression, or System Solve Cell</td
      >
    </tr>
    <tr>
      <td class="first-column">Shift-Enter</td>
      <td>Insert Math Cell</td>
    </tr>
    <tr>
      <td class="first-column">{modifier}-Enter then 1</td>
      <td>Insert Math Cell</td>
    </tr>
    <tr>
      <td class="first-column">{modifier}-Enter then 2</td>
      <td>Insert Documentation Cell</td>
    </tr>
    <tr>
      <td class="first-column">{modifier}-Enter then 3</td>
      <td>Insert Plot Cell</td>
    </tr>
    <tr>
      <td class="first-column">{modifier}-Enter then 4</td>
      <td>Insert Table Cell</td>
    </tr>
    <tr>
      <td class="first-column">{modifier}-Enter then 5</td>
      <td>Insert Piecewise Expression Cell</td>
    </tr>
    <tr>
      <td class="first-column">{modifier}-Enter then 6</td>
      <td>Insert System Solve Cell</td>
    </tr>
    <tr>
      <td class="first-column">Escape</td>
      <td>Unselect all cells</td>
    </tr>
  </tbody>
</table>


