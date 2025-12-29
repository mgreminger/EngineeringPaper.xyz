<script>
  import appState from "./stores.svelte";

  const modifier = appState.modifierKey === "ctrlKey" ? "Ctrl" : "Cmd"
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
    background-color: lightgray;
  }

  span.key {
    padding: 1px 6px;
    background-color: #b3b3b3;
    color: white;
    border-radius: 2px;
  }

</style>

<table>
  <thead>
    <tr>
      <th colspan="2">Global Shortcuts</th>
    </tr>
  </thead>
  <tbody>
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
      <td>Insert Code Cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Enter</span> then <span class="key">9</span></td>
      <td>Insert Fluid Properties Cell</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Enter</span> then <span class="key">0</span></td>
      <td>Insert Sheet</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">Esc</span></td>
      <td>Unselect all cells</td>
    </tr>
  </tbody>
</table>


<table>
  <thead>
    <tr>
      <th colspan="2">Math Field Shortcuts</th>
    </tr>
  </thead>
  <tbody>
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
      <td class="first-column"><span>Type <em>sqrt</em></span></td>
      <td>Insert square root</td>
    </tr>
    <tr>
      <td class="first-column"><span>Type <em>pi</em>, <em>e</em>, or <em>i</em></span></td>
      <td>Inserts the reserved variable <em>π</em>, Euler's number <em>e</em>, or imaginary unit <em>i</em></td>
    </tr>
    <tr>
      <td><span>Type the name of a lower case Greek letter </span></td>
      <td>Inserts a lower case Greek character (updates after leaving the current math field, 
        start with a backslash \ to update immediately), recognizes alpha, beta, gamma, delta, epsilon, zeta, eta, theta, iota, kappa, lambda, mu, nu, xi, rho, sigma, tau, phi, chi, psi, and omega</td>
    </tr>
    <tr>
      <td><span>Type the name of an upper case Greek character </span></td>
      <td>Inserts an upper case Greek character (updates after leaving the current math field, 
        start with a backslash \ to update immediately), recognizes Gamma, Delta, Theta, Lambda, Xi, Pi, Sigma, Upsilon, Phi, Psi, and Omega</td>
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
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">'</span></td>
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
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">\</span></td>
      <td>Toggle visibility of virtual keyboard</td>
    </tr>
    <tr>
      <td class="first-column">
        <span class="key">"</span>
      </td>
      <td>Toggle comment mode in a math field</td>
    </tr>
    <tr>
      <td class="first-column"><span>Type \<em>int</em></span></td>
      <td>Inserts an integral</td>
    </tr>
    <tr>
      <td class="first-column"><span>Type \<em>der</em></span></td>
      <td>Inserts a derivative</td>
    </tr>
    <tr>
      <td class="first-column"><span>Type \<em>dder</em></span></td>
      <td>Inserts a double derivative</td>
    </tr>
    <tr>
      <td class="first-column"><span>Type \<em>tder</em></span></td>
      <td>Inserts a triple derivative</td>
    </tr>
    <tr>
      <td class="first-column"><span>Type \<em>sum</em></span></td>
      <td>Inserts summation notation</td>
    </tr>
    <tr>
      <td class="first-column"><span>Type \<em>prod</em></span></td>
      <td>Inserts product notation</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Z</span></td>
      <td>Undo edit in current math field</td>
    </tr>

    <tr>
      {#if modifier === "Ctrl"}
        <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Y</span></td>
      {:else}
        <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Shift</span> + <span class="key">Z</span></td>
      {/if}
      <td>Redo edit in current math field</td>
    </tr>

    <tr>
      <td class="first-column"><span>Type \<em>hat</em></span></td>
      <td>Add hat accent to variable name</td>
    </tr>
    <tr>
      <td class="first-column"><span>Type \<em>bar</em></span></td>
      <td>Add bar accent to variable name</td>
    </tr>
    <tr>
      <td class="first-column"><span>Type \<em>vec</em></span></td>
      <td>Add vector accent to variable name</td>
    </tr>
    <tr>
      <td class="first-column"><span>Type \<em>dot</em></span></td>
      <td>Add dot accent to variable name</td>
    </tr>
    <tr>
      <td class="first-column"><span>Type \<em>ddot</em></span></td>
      <td>Add double dot accent to variable name</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">'</span></td>
      <td>Add prime accent to variable name</td>
    </tr>
  </tbody>
</table>


<table>
  <thead>
    <tr>
      <th colspan="2">Documentation Field Shortcuts</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">B</span></td>
      <td>Set selected text to Bold</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">I</span></td>
      <td>Set selected text to Italics</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">U</span></td>
      <td>Set selected text to Underline</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">K</span></td>
      <td>Insert link at selected text</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">E</span></td>
      <td>Insert formula at cursor location (uses LaTeX notation)</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Z</span></td>
      <td>Undo edit in current documentation field</td>
    </tr>
    <tr>
      {#if modifier === "Ctrl"}
        <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Y</span></td>
      {:else}
        <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Shift</span> + <span class="key">Z</span></td>
      {/if}
      <td>Redo edit in current documentation field</td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th colspan="2">Code Editor Shortcuts</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">/</span></td>
      <td>Toggle comment</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">Tab</span></td>
      <td>Increase Indent</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">Shift</span> + <span class="key">Tab</span></td>
      <td>Decrease Indent</td>
    </tr>
    <tr>
      {#if modifier === "Ctrl"}
        <td class="first-column"><span class="key">{modifier}</span> + <span class="key">M</span></td>
      {:else}
        <td class="first-column"><span class="key">Opt</span> + <span class="key">Shift</span> + <span class="key">M</span></td>
      {/if}
      <td>Toggle tab key behaviour for code editor (tab to indent or tab to navigate page)</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">Ctrl</span> + <span class="key">Space</span></td>
      <td>Show autocomplete menu</td>
    </tr>
    <tr>
      <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Z</span></td>
      <td>Undo edit in current code editor</td>
    </tr>
    <tr>
      {#if modifier === "Ctrl"}
        <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Y</span></td>
      {:else}
        <td class="first-column"><span class="key">{modifier}</span> + <span class="key">Shift</span> + <span class="key">Z</span></td>
      {/if}
      <td>Redo edit in current code editor</td>
    </tr>
  </tbody>
</table>
