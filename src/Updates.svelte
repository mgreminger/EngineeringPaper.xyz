<script>
  import { modifierKey } from "./stores";

  const modifier = $modifierKey === "ctrlKey" ? "Ctrl" : "Cmd"
</script>

<em>April 5, 2023</em>
<h4>Bug Fix Update</h4>
<p>
   There were a few cases where valid variable names would cause an error since they were reserved names in Python
   or SymPy. This issue has been fixed.
</p>
<br>

<em>March 10, 2023</em>
<h4>Usability Improvements</h4>
<p>
   Some improvements have been made to EngineeringPaper.xyz's handling of syntax errors.
   First of all, blank math cells are no longer considered a syntax error. Second, a syntax
   error in the current math field does not cause all of the results to disappear. Both of 
   these changes allow users to maintain visibility to existing results as they enter 
   new math expressions. Many thanks to <a href="https://github.com/VanHulleOne">@VanHulleOne</a> for
   suggesting these usability improvements as
   <a href="https://github.com/mgreminger/EngineeringPaper.xyz/issues">
   GitHub issues</a>.
</p>
<br>
<p>
   As a community project, EngineeringPaper.xyz depends on feedback from its users. If you 
   have a feature request or are experiencing a bug, there are multiple ways to report these 
   issues. You can create an issue in EngineeringPaper.xyz's 
   <a href="https://github.com/mgreminger/EngineeringPaper.xyz/issues">GitHub issues page</a>, 
   you can add a post to EngineeringPaper.xyz's 
   <a href="https://www.reddit.com/r/EngineeringPaperXYZ/">Reddit community page</a>, or you
   can send a email to <a href="mailto:support@engineeringpaper.xyz">support@engineeringpaper.xyz</a>.
   Also, if you would like to share any of the sheets you are creating with 
   EngineeringPaper.xyz, the  <a href="https://www.reddit.com/r/EngineeringPaperXYZ/">Reddit community page</a> is a great 
   place to share and start a discussion.
</p>
<br>

<em>February 13, 2023</em>
<h4>EngineeringPaper.xyz Can Now be Installed on Desktop or Mobile Devices</h4>
<p>
   EngineeringPaper.xyz is now a progressive web application (PWA). The biggest impact of this 
   change is that EngineeringPaper.xyz will now work without an internet connection 
   (offline functionality becomes available after the first time you load the page in your web 
   browser). Another benefit of PWAs is that they can be installed as a native application 
   on your computer or mobile device. The exact instructions will depend on your operating system and 
   device type. 
   See this 
   <a href="https://www.cdc.gov/niosh/mining/content/hearingloss/installPWA.html" target="_blank">
    NIOSH writeup on how to install a PWA
   </a>for further details. 
</p>
<br>
<p>
   Another benefit of this change will be smoother rollouts of updates to EngineeringPaper.xyz. 
   In the past, it was possible for various components of EngineeringPaper.xyz to become temporarily
   out of sync as updates were rolled out globally. EngineeringPaper.xyz will now only incorporate an
   update when all components are guaranteed to be in sync. This 
   will eliminate the brief instability that occasionally occurred with previous updates. A green 
   refresh icon will appear in the toolbar when an update is available. In order to apply the update,
   all tabs and windows of EngineeringPaper.xyz need to be closed. Using the refresh button is not 
   sufficient to apply the update. It is safe to continue using the app while an update is pending.
</p>
<br>


<em>January 16, 2023</em>
<h4>Open Source Release and Local File Saving</h4>
<p>
   To ensure that EngineeringPaper.xyz always remains free to use, it has now been released as open source 
   software under the permissive MIT license. The source code can be found on the
   <a href="https://github.com/mgreminger/EngineeringPaper.xyz" target="_blank">
    EngineeringPaper.xyz GitHub page
   </a>. With this 
   change, you can rest assured that EngineeringPaper.xyz will always be available and that your
   time invested in using this software will not be wasted. No other engineering calculation software
   can make this promise. 
</p>
<br>
<p>
   This release also adds a local file open and file save feature. The buttons for this new functionality
   are on the top toolbar. This allows you to save your sheets to your local drive. With this capability, 
   along with the open source license of EngineeringPaper.xyz, you are assured that you will always have
   access to the calculations you create in EngineeringPaper.xyz. The {modifier}-S keyboard shortcut
   now saves your current sheet locally. To {modifier}-Shift-S keyboard shortcut is now used to
   create a shareable link (this was the previous behavior of the {modifier}-S shortcut).
   The {modifier}-O keyboard shortcut can be used to open a local file. Finally, the 
   {modifier}-Shift-N key starts a new blank sheet. EngineeringPaper.xyz sheets have an .epxyz 
   extension by default. Another way to open your saved sheets is to drag and drop them
   onto the EngineeringPaper.xyz window.
</p>
<br />


<em>December 29, 2022</em>
<h4>Printing Improvements</h4>
<p>
   Many updates have been made to improve printing of EngineeringPaper.xyz sheets. Document flow issues
   have been fixed where items may have previously overlapped. All unnecessary user
   interface buttons and controls are now hidden when printing. Scroll bars no longer appear in printouts.
   Finally, plot sizing when printing has been improved.
</p>
<br>
<p>
   Plots have been visually improved as well. The issue where the y-axis labels occasionally overlap the
   axis numbers has been fixed. Plot sizing has been improved on desktop and mobile. Finally, the 
   plot legend is now placed horizontally below the plot for more efficient usage of screen space 
   on desktop and mobile. 
</p>
<br />

<em>December 26, 2022</em>
<h4>Autosave Checkpoints</h4>
<p>
   EngineeringPaper.xyz now automatically saves checkpoints of your sheet to prevent loss of data in the event
   that you accidentally navigate away from an unsaved sheet, accidentally refresh your page,
   or your browser window crashes. If you accidentally navigate away from your sheet, simply use the browser's
   back button to get back to your unsaved sheet. These autosave checkpoints are saved locally to your computer
   and can only be accessed on the computer, and the browser, where 
   they were generated. In order to share your sheets with others, and to ensure future access to your work,
   you will still need to manually save your sheet using the upload button on the top right of the page or
   using the {modifier}-S keyboard shortcut.
</p>
<br>
<p>
   The checkpoints are saved every 10 seconds (only if there have been changes to your sheet). Because of this, you
   can use the browser's back button to undo recent changes you've made to your sheet.
</p>
<br>
<p>
   These autosave checkpoints are saved in your browser's local storage. Keep in mind that some browsers 
   (Safari in particular) can be fairly aggressive about cleaning up local storage so make sure to 
   manually save any sheets that you need access to in the future. See the side menu on the left for the 
   "Enable Persistent Local Storage" option to request that your browser persists the data stored by 
   EngineeringPaper.xyz.
</p>
<br />


<em>December 8, 2022</em>
<h4>Improved iPhone and Android Support</h4>
<p>
   The experience of using EngineeringPaper.xyz on iPhone and Android devices has been improved significantly. 
   Specifically, the on-screen keyboard has been expanded to provide access to all controls and symbols
   required to edit math equations on mobile. 
</p>
<br />
<p>
   The improvements are not just for mobile users. The use of screen space has been improved on both
   mobile and desktop. The on-screen keyboard now includes quick access to commonly used 
   units, eliminating the need to type them in. Finally, by placing the onscreen keyboard at the bottom 
   of the screen, the issue of missed mouse clicks because of the on-screen keyboard appearing or
   disappearing has been eliminated. 
</p>
<br />


<em>November 15, 2022</em>
<h4>New Complex Number Functions and Trig Function Updates</h4>
<p>
   <strong> Potentially Breaking Change:</strong> The inverse trig functions (arctan, arcsin, and arccos) now
      return values with the units of angle (radians by default but can be converted to degrees). If you 
      have sheets that relied on the previous behavior, where the inverse trig functions return unitless 
      values, you can multiple those values by <em>(1 [1/rad])</em> to return to the previous
      behavior. 
   
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
