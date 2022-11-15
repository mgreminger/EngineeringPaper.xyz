<script>
  import { modifierKey } from "./stores";

  const modifier = $modifierKey === "ctrlKey" ? "Ctrl" : "Cmd"
</script>


<em>November 15, 2022</em>
<h4>New Complex Number Functions and Trig Function Updates</h4>
<p>
   <strong> Potentially Breaking Change:</strong> The inverse trig functions (arctan, arcsin, and arccos) now
      return values with the units of angle (radians by default but can be converted to degrees). If you 
      have sheets that relied on the previous behaviour, where the inverse trig functions return unitless 
      values, you can multiple those values by <em>(1 [1/rad])</em> to return to the previous
      behaviour. 
   
</p>
<br />
<p> <em>New Features:</em> The complex number support has been improved with
   EngineeringPaper.xyz with the addition of the real, imag, conj, and angle functions
   (see the Imag tab added to the onscreen keyboard to access these new functions). If you prefer to learn
   by example, check out this <a href="https://blog.engineeringpaper.xyz/plotting-gain-and-phase-for-a-general-voltage-divider" target="_blank">
      blog post</a> that uses these new capabilities to analyze a voltage divider with
   reactive electrical components
</p>
<br />
<p><em>Bug Fixes and Improvements:</em> The error handling for plots has been overhauled 
to provide more helpful error messages to help in debugging common plotting issues.</p>
<br />


<em>November 2, 2022</em>
<h4>Infinite Undo/Redo Feature Added for Math Fields</h4>
<p>
   {modifier}-Z and {modifier}-Y can now be used to Undo/Redo edits in a math field. Note that the Undo/Redo 
   funcitonality is local to the currently selected math or text field. When a sheet is saved and reloaded, the 
   undo history will be lost.
</p>
<br />

<em>October 28, 2022</em>
<h4>New Keyboard Shortcuts</h4>
<p>
   A comprehensive set of keyboard shortcuts have been added to EngineeringPaper.xyz that allow you to 
   navigate your sheet, add and remove cells, and save your work, all without 
   leaving your keyboard. See the new keyboard shortcuts button on toolbar at the top of the app 
   or see this 
   <a href="https://blog.engineeringpaper.xyz/engineeringpaperxyz-keyboard-shortcuts" target="_blank">
      blog post</a>. There's also a <a href="https://youtube.com/shorts/sld1dXyx7Tw" target="_blank">tutorial video.</a>
</p>
<br />


<em>October 17, 2022</em>
<h4>Number of Plot Points Can Now be Specified</h4>
<p>
   The number of points used for a plot defaults to 51. The number of points can now be specified 
   by appending the plot function call with "with 500 points"
   to obtain a plot with 500 points, for example. This new feature is easiest shown by example,  
   see bottom of the <a href="https://engineeringpaper.xyz/TxAftUqQCmXKNPX5XGBUy8" target="_blank">
   all new and improved plotting and function tutorial </a> to see this new feature in action. 
   This new feature is especially powerful when combined with the new "Copy Data" button to bring 
   the plot data into Excel, Google Sheets, or Numbers. 
</p>
<br />


<em>October 13, 2022</em>
<h4>Plotting Improvements</h4>
<p>
   Many improvements have been made to plotting in EngineeringPaper.xyz. The biggest new feature 
   is the "Copy Data" button that copies all of the plot data to the clipboard where you can 
   then paste it into Excel, Google Sheets, or Numbers. Support for log scaling of the x and/or y axes 
   has also been added. Finally, an insert plot cell button has been added to make it simpler to 
   create a plot. See the <a href="https://engineeringpaper.xyz/TxAftUqQCmXKNPX5XGBUy8" target="_blank">
   plotting and function tutorial</a> to try out these new features.
</p>
<br />


<em>October 3, 2022</em>
<h4>Numerical System Solving Capability Added to System Solve Cells</h4>
<p>
   EngineeringPaper.xyz now supports numerically solving equations and systems
   of equations in situations where the symbolic solver may not be able to find an exact
   solution. See the
   <a href="https://engineeringpaper.xyz/DeP4bqfF2H5VbRJz3Nd9Re" target="_blank"> 
      updated equation solving tutorial</a>
   sheet to see how to use this new capability. There is also a short
   <a href="https://youtube.com/shorts/ZMOhOT7sUR0" target="_blank">numerical solver tutorial video</a>
   available.
</p>
<br />

<em>September 26, 2022</em>
<h4>New System Solve Cell Type Added to EngineeringPaper.xyz</h4>
<p>
   The way EngineeringPaper.xyz handles equation solving has been updated and
   improved by adding a System Solve Cell type. This change makes it possible to
   solve multiple systems of equations in a single sheet and makes it easier to
   choose a particular solution when there are multiple solutions. <strong
      >Existing sheets that make use of equation solving will need to be updated
      to use the new System Solve Cell. See this
      <a
         href="https://engineeringpaper.xyz/ZfMZ7rsE4hJz63n7UXKTJa"
         target="_blank">equation solving tutorial</a
      > sheet to see how to update your sheets that make use of the new System Solve
      Cell type.
   </strong> This change will also make it easier to add numerical equation solving
   in future versions of EngineeringPaper.xyz.
</p>

<br />
<em>September 19, 2022</em>
<h4>New Piecewise Function Cell Type Added to EngineeringPaper.xyz</h4>
<p>
   Piecewise functions can now easily be added to EngineeringPaper.xyz sheets.
   Check out this <a
      href="https://engineeringpaper.xyz/o5iBpjybLJgNxybFxrJEiT"
      target="_blank">example sheet</a
   > for an example of a Piecewise function used in a calculation.
</p>

<br />
<em>June 17, 2022</em>
<h4>New Insert Sheet Feature Added to EngineeringPaper.xyz</h4>
<p>
   You can now easily insert other sheets and tables into your sheets to save
   typing. See this
   <a href="https://youtu.be/myWfj27rFcc" target="_blank">tutorial video</a> for
   a demo of this new feature.
</p>

<br />
<em>June 8, 2022</em>
<h4>New Table Cell Type Added to EngineeringPaper.xyz</h4>
<p>
   Table cells make it easy to compare multiple scenarios in a single sheet. For
   example, different materials or different boundary conditions can be defined
   in a table. See this
   <a href="https://youtu.be/xpQRVBi-36Y" target="_blank">tutorial video</a> for
   a demo of this new feature.
</p>

<br />
<em>September 9, 2021</em>
<h4>Plotting and Function Notation Have Been Added to EngineeringPaper.xyz</h4>
<p>
   Check out this <a
      href="https://engineeringpaper.xyz/MNsS9tjtLLzcBTgTNboDiz"
      target="_blank">example sheet</a
   > to learn how to use these exciting new features. This plotting and function
   tutorial is also available through the example sheets list in the top left menu.
   Additionally, the Terms of Conditions text has been updated for clarity (also
   accessible from the top left menu).
</p>
