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
      <td class="first-column"><span class="key">*</span></td>
      <td>Multiply</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">/</span></td>
      <td>Divide</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">E</span></td>
      <td>Insert *10^ for scientific notation</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">&lt;</span> then <span class="key">=</span></td>
      <td>Insert less than or equal to symbol (&le;)</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">&gt;</span> then <span class="key">=</span></td>
      <td>Insert greater than or equal to symbol (&ge;)</td>
    </tr>
    <tr>
      <td class="first-column"><span>Type sqrt</span></td>
      <td>Insert square root</td>
    </tr>
    <tr>
      <td class="first-column"><span>Type pi, e, or i</span></td>
      <td>Inserts the reserved variable <em>π</em>, Euler's number <em>e</em>, or imaginary unit <em>i</em></td>
    </tr>
    <tr>
      <td><span>Type the name of a lower case Greek letter </span></td>
      <td>Inserts a lower case Greek character (updates after leaving the current math field), recognizes alpha, beta, gamma, delta, epsilon, zeta, eta, theta, iota, kappa, lambda, mu, nu, xi, rho, sigma, tau, phi, chi, psi, and omega</td>
    </tr>
    <tr>
      <td><span>Type the name of an upper case Greek character </span></td>
      <td>Inserts an upper case Greek character (updates after leaving the current math field), recognizes Gamma, Delta, Theta, Lambda, Xi, Pi, Sigma, Upsilon, Phi, Psi, and Omega</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">Tab</span></td>
      <td>Navigate to next location in equation, if available, otherwise navigate to next focusable element on page </td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">^</span></td>
      <td>Add exponent</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">_</span></td>
      <td>Add subscript</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">@</span> or <span class="key">{modifier}</span> + <span class="key">*</span></td>
      <td>Matrix multiply or cross product in the special case where both matrices are 3x1 or 1x3</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">'</span></td>
      <td>Matrix Transpose</td>
    </tr>
    <tr>
      <td class="first-column">
        <span class="key">&larr;</span><span>, </span>
        <span class="key">&rarr;</span><span>, </span>
        <span class="key">&darr;</span><span>, or </span>
        <span class="key">&uarr;</span>
      </td>
      <td>Navigate within math field </td>
    </tr>
    <tr>
      <td class="first-column">
        <span class="key">"</span>
      <td>Toggle comment mode in a math field</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">S</span></td>
      <td>Save current sheet to local file</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Shift</span> + <span class="key">S</span></td>
      <td>Save current sheet to local file with a new filename instead of replacing existing file </td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">L</span></td>
      <td>Save current sheet to database to get a shareable link</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">O</span></td>
      <td>Open sheet from local file (replaces currently loaded sheet)</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Shift</span> + <span class="key">N</span></td>
      <td>Load blank sheet (replaces currently loaded sheet)</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Z</span></td>
      <td>Undo edit in current math or text field</td>
    </tr>
    <tr>
      {#if modifier === "Ctrl"}
        <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Y</span></td>
      {:else}
        <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Shift</span> + <span class="key">Z</span></td>
      {/if}
      <td>Redo edit in current math or text field</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">&uarr;</span></td>
      <td>Select cell above current cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">&darr;</span></td>
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
      <td>Insert Selector Table Cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Enter</span> then <span class="key">5</span></td>
      <td>Insert Data Table Cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Enter</span> then <span class="key">6</span></td>
      <td>Insert Piecewise Expression Cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Enter</span> then <span class="key">7</span></td>
      <td>Insert System Solve Cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Enter</span> then <span class="key">8</span></td>
      <td>Insert Fluid Properties Cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Enter</span> then <span class="key">9</span></td>
      <td>Insert Sheet</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">Esc</span></td>
      <td>Unselect all cells</td>
    </tr>
  </tbody>
</table>


