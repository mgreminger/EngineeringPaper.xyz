<script>
  import { SettingsAdjust, Download } from "carbon-icons-svelte";
  import { modifierKey } from "./stores";

  const modifier = $modifierKey === "ctrlKey" ? "Ctrl" : "Cmd"
</script>

<style>
  img {
    display: block;
  }

  ul {
   list-style: initial;
   margin-left: 20px;
  }
</style>

<em>June 20, 2024</em>
<h4>Parametric Plotting Feature Added</h4>
<p>
   Parametric plotting has been added to EngineeringPaper.xyz. See the
   <a href="https://engineeringpaper.xyz/dcM95gSLeCTcbCHtsM4uqq" target="_blank">
      parametric plotting tutorial
   </a> 
   for details.
</p>

<br>

<em>June 11, 2024</em>
<h4>Thermodynamic Fluid Properties and New Engineering Units</h4>
<p>
   For those of you who perform thermodynamic and fluid calculations, this release is for
   you! Powered by the powerful
   <a href="http://www.coolprop.org/" target="_blank">CoolProp library</a>, EngineeringPaper.xyz 
   now provides built in thermodynamic properties for many fluids including air, water/steam, 
   humid air (psychrometrics), numerous refrigerants, and common heat transfer solutions including
   propylene and ethylene glycols. See the
   <a href="https://engineeringpaper.xyz/mWf3zkzQEmYsUPckCPX5P8" target="_blank">thermodynamic 
      fluids tutorial</a> 
   to get started!
</p>
<br>
<p>
   This release also borrows from the strange and fascinating world of engineering units by adding 
   the following new units: poise (P), reyn, ureyn, stokes (St), kpsi (ksi), Mpsi, inHg, ftH2O, 
   inH2O, tonrefrigeration (TR), boilerhp (BHP), MBH, MMBH, and gramforce (gf).
</p>

<br>

<em>May 13, 2024</em>
<h4>Usability Improvements and Bug Fixes</h4>
<p>
   This release includes the following usability improvements and bug fixes:
</p>
<ul>
   <li>Vertical page jumps when editing, moving, or deleting cells has been eliminated improving visual stability and overall performance</li>
   <li>Bug fixed where the sheet would hang when the last row of a table cell was selected and an earlier row was deleted</li>
   <li>Reduced loading time and memory usage for large sheets</li>
   <li>Improved performance when editing sheets with a large number of table cells or piecewise expression cells</li>
</ul>

<br>

<em>April 18, 2024</em>
<h4>Maximum Matrix Columns Limit Increased</h4>
<p>
   The maximum number of columns allowed in a matrix has been increased to 50. 
   The previous limit was 10. The number of rows allowed is unlimited, however, 
   performance may become sluggish with large matrices.
</p>

<br>

<em>April 6, 2024</em>
<h4>Drag to Reorder Cells Improvements</h4>
<p>
   Using the mouse or touch actions to drag and reorder cells has been improved 
   and no longer has issues after repeated drag events.
</p>

<br>

<em>April 4, 2024</em>
<h4>Differentiation and Integration Improvements</h4>
<p>
   Integration and differentiation now support piecewise functions. These updates 
   will also fix situations that led to dimension errors when performing
   integration and differentiation on expressions that used certain builtin functions 
   such as the min and max functions.
</p>

<br>

<em>March 24, 2024</em>
<h4>Differentiation and Integration Bug Fixes</h4>
<p>
   Two bugs that occur in certain situations when performing substitutions
   with 
   <a href="https://github.com/mgreminger/EngineeringPaper.xyz/issues/156" target="_blank">derivatives</a>
   and
   <a href="https://github.com/mgreminger/EngineeringPaper.xyz/issues/244" target="_blank">integrals</a>
   have been fixed. This fix also has the benefit of speeding up calculations for sheets that
   make use of derivatives or integrals.
</p>

<br>

<em>March 21, 2024</em>
<h4>Custom Right Click Context Menu Added</h4>
<p>
   Math fields in EngineeringPaper.xyz now support a custom context menu for 
   Cut/Copy/Paste, Undo/Redo, Select All, and Delete functionality. The context 
   menu can be opened using the standard shortcuts for your system (right click
   on Windows, Ctrl-left-click on Mac, and long press on touch screen devices). Note
   that on iOS devices, the long press doesn't always work due to a bug in Safari.
   For these situations, a menu button ≡ has been added to the onscreen keyboard
   in order to ensure access to the context menu on all systems. 
</p>

<br>

<em>February 27, 2024</em>
<h4>Save As Shortcut Added and Shareable Link Shortcut Changed</h4>
<p>
   When using Chrome, or a Chrome based browser such as Edge, hitting {modifier}-S 
   will automatically re-save the file using the same name, if it has already been 
   saved. The {modifier}-Shift-S keyboard shortcut can now be used to perform a Save As 
   operation to allow you to choose a different file name. Additionally, the Save Document 
   menu now includes a Save As checkbox to serve the same purpose. The {modifier}-Shift-S 
   keyboard shortcut was previously used to save your document as a shareable link. The 
   {modifier}-L keyboard shortcut can now be used the create a shareable link. 
</p>

<br>

<em>February 26, 2024</em>
<h4>File Saving Improvements</h4>
<p>
   When using Chrome, or a Chrome based browser such as Edge, the file saving experience has been
   improved. Hitting {modifier}-S on the keyboard will prompt you to choose the file name and location
   for the first save. For future saves, the file will be automatically replaced when you hit
   {modifier}-S. If you would like to save the file as a different name, simply change the sheet title
   and you'll be prompted to choose a new file name the next time you hit {modifier}-S. Another 
   option to save as a different file name without changing the sheet title is to disable the file
   saving permission using the browser's address bar. These options are covered in this 
   <a href="https://youtu.be/bxAitVcI_Pg?si=XDM1Qk79EE-hPpq6" target="_blank">
   EngineeringPaper.xyz File Management Tutorial Video</a>. Unfortunately, Firefox and 
   Safari don't currently support the 
   <a href="https://developer.mozilla.org/en-US/docs/Web/API/File_System_API" target="_blank">
   File System Access API</a> required to enable these advanced file management features. 
</p>

<br>

<em>January 20, 2024</em>
<h4>LaTeX Export</h4>
<p>
   In addition to the Microsoft Word and PDF export options, your sheet can now also be exported as a 
   LaTeX document. Note that images and plots cannot be included when using the LaTeX export 
   option.
</p>

<br>

<em>January 10, 2024</em>
<h4>Microsoft Word, PDF, and Markdown Export</h4>
<p>
   You're now able to export your EngineeringPaper.xyz sheets as Microsoft Word,
   PDF, or Markdown files. Use the save icon <Download size={16}/> on the top 
   toolbar to access this exciting new feature. Since the Word and PDF 
   conversions cannot be performed in the browser, data needs to be sent 
   to the EngineeringPaper.xyz servers to complete the conversion process. However, no 
   data is retained after the document conversion process is complete. The Markdown 
   document export option does not require sending any data to the EngineeringPaper.xyz 
   servers. Enjoy!
</p>

<br>

<em>December 26, 2023</em>
<h4>Now Also Available as <a href="https://epxyz.com" target="_blank">EPxyz.com</a></h4>
<p>
   Some environments indiscriminately block all <em>.xyz</em> domains. For example,
   some school districts block all <em>.xyz</em> domains for their school issued 
   Chromebooks. Since it's important to us that all of the EngineeringPaper.xyz
   goodness is available to everyone, the full functionality of EngineeringPaper.xyz 
   is now also available as a <em>.com</em> address at
   <a href="EPxyz.com" target="_blank">EPxyz.com</a>. The functionality is the same
   between the two domains and sheets saved on one can be opened on the other. 
   Shareable links are interchangeable as well. For example, 
   <a href="https://engineeringpaper.xyz/fFjTsnFoSQMLwcvteVoNtL" target="_blank">
      https://engineeringpaper.xyz/fFjTsnFoSQMLwcvteVoNtL</a> and 
   <a href="https://epxyz.com/fFjTsnFoSQMLwcvteVoNtL" target="_blank">
      https://epxyz.com/fFjTsnFoSQMLwcvteVoNtL</a> point to the same sheet.
</p>

<br>

<em>December 22, 2023</em>
<h4>New Default Units Feature</h4>
<p>
   The default base units used for results can now be set in the sheet settings dialog. 
   To access the base unit settings, click on the sheet settings 
   icon <SettingsAdjust size={16}/> in the top menu bar and then click on the 
   <em>Default Units</em> tab. The default units settings will be saved with the sheet.
</p>
<br>
<p>
   As in the past, the default unit system for EngineeringPaper.xyz sheets is the 
   SI unit system. The default unit symbols now all correspond to the official 
   SI unit symbols (for example, the time unit now defaults to <em>s</em> rather 
   than <em>sec</em>). However, all of the old unit symbols still work for user 
   specified units.
</p>
<br>
<p>
   Finally, the inverse time unit, <em>1/s</em>, is no longer automatically converted to
   <em>Hz</em> since this behavior was confusing when the frequency unit should have been
   interpreted as <em>rad/s</em>. See this 
   <a href="https://blog.engineeringpaper.xyz/calculating-the-natural-frequencies-of-a-cantilever-beam"
      target="_blank">
   blog post</a> for details on how to properly
   handle frequency units in EngineeringPaper.xyz.
</p>

<br>

<em>November 13, 2023</em>
<h4>New Scatter Plotting Feature</h4>
<p>
   Scatter plots are now supported by EngineeringPaper.xyz. Scatter plotting
   leverages the recently added ability to define vectors. See the 
   <a href="https://engineeringpaper.xyz/32XmqQA442GL8mj8X9uwP3" target="_blank">
   Scatter Plotting Tutorial</a> for details. 
</p>

<br>

<em>October 31, 2023</em>
<h4>New <em>ceil</em>, <em>floor</em>, and <em>round</em> Functions Have Been Added</h4>
<p>
   Three new rounding functions have been added. <em>ceil</em> to round up, 
   <em>floor</em> to round down, and <em>round</em> to round to the nearest integer.
   These new functions can be found on the f(x) tab of the virtual keyboard.
   Note that these functions require that the input parameter is unitless. An input
   with units would lead to unexpected results since all calculation are performed
   internally in base SI units. For example, calculating the <em>floor</em> of
   1 [mm] would evaluate to zero since the floor would be calculated on 0.001 after 
   the millimeter value is converted to meters for the internal calculation.
</p>

<br>

<em>September 30, 2023</em>
<h4>Improved Error Messages</h4>
<p>
   The error messages for syntax errors have been improved for some common errors that
   can be difficult to detect by looking at the expression. Specifically, 
   the error message will indicate if there is an empty subscript or superscript or if 
   there is a missing multiplication symbol. Note that not all missing multiplication symbols
   are able to be detected, but many common situations are covered by the new error messages.
</p>

<br>

<em>August 19, 2023</em>
<h4>Matrices and Python Code Generation Features</h4>
<p>
   This release adds matrix and vector support. Just like all of the capabilities in EngineeringPaper.xyz, 
   matrix and vector support is designed to be intuitive and easy to use and you'll get a long way by exploring
   the new "Matrices" tab on the onscreen keyboard. You can also check out the new 
   <a href="https://engineeringpaper.xyz/8pWM9yEqEPNntRBd6Jr9Sv" target="_blank">Matrices and Vectors Tutorial</a> 
   to see all of the details. And, of course, all of the matrix and vector functionally has full units support.
</p>
<br>
<p>
   If you're finding the need to do more in depth numerical analysis with your EngineeringPaper.xyz calculations, 
   the new automatic Python code generation feature is for you! Check out the details in the new
   <a href="https://engineeringpaper.xyz/enYmu2PzN2hN93Avizx9ec" target="_blank">Python Code Generation Tutorial</a>. 
   And, you guessed it, the Python code generation is units aware and will use whatever units you specify in your 
   EngineeringPaper.xyz sheet!
</p>

<br>

<em>July 2, 2023</em>
<h4>Minor Updates</h4>
<p>
   This is a minor release that includes the following usability improvements:
</p>
<ul>
   <li>Math editor updates: hitting the ( key on a selection will enclose the selection in parenthesis, more consistent behavior when hitting the / key</li>
   <li>In addition to the Escape key, clicking the left or right page margins, or top of page logo, unselects all cells</li>
   <li>{modifier}-UpArrow now selects the last cell if no cells are selected (previously selected the first cell like {modifier}-DownArrow)</li>
   <li>A EngineeringPaper.xyz link can be dragged and dropped onto page to open (similar to existing functionality for files)</li>
   <li>If the drag and drop target becomes stuck, it can be clicked to clear (Escape key works as well)</li>
   <li>The browser spell checker is only enabled for the currently selected cell (Safari does not support this feature)</li>
   <li>The <a href="https://engineeringpaper.xyz/VteDKCkA8fREy7hLYLMwEQ" target="_blank">tutorial page</a> has been updated for recent features and now points to the <a href="https://youtu.be/r7EZQVhcr5Q" target="_blank">new and updated tutorial video</a></li>
</ul>

<br>

<em>June 26, 2023</em>
<h4>Plotting Improvements</h4>
<p>
   Several plotting improvements have been rolled out. The main change is that the axis labels
   and legend labels have been updated to render as math so that subscripts, Greek characters,
   and units appear the same in plots as they appear in math fields. This makes plot labels
   much easier to read, especially when there are complex units. See the example below to see the different between 
   the old style plots and the new style plots. Plots can now be saved as SVG files, in addition
   to PNG files, using the buttons that appear above the plots.
</p>
<br>
<p>
   Old Plots:
   <img src="images/updates/old_plot.png" width="534px" height="304.5px" alt="Old plot styling screenshot">
</p>
<br>
<p>
   New Plots:
   <img src="images/updates/new_plot.png" width="565.5px" height="312.5px" alt="New plot styling screenshot">
</p>
<br>

<p>
   Additionally, the keyboard responsiveness of the app for
   large sheets with many plots has been improved. Finally, plots opened from the side menu 
   now resize properly when the side menu is closed.
</p>
<br>



<em>June 7, 2023</em>
<h4>Custom Number Formatting</h4>
<p>
   The formatting used for numerical output is now customizable, both at the sheet
   level and at the individual math cell level. The number formatting can be set by 
   clicking on the settings icon <SettingsAdjust size={16}/> at the top tool bar
   for sheet wide settings and at the right hand side of the math cell for 
   math cell level settings. Math cell level settings will always take precedence
   over sheet level settings. When settings differ from the default settings, a 
   green dot will appear on the settings icon. Examples of the notation
   options available are shown below.
</p>
<br>
<p>
   Default notation:
   <img src="images/updates/default-number-formatting.png" width="457.5px" height="45.5px" alt="Default Number Formatting Screenshot">
</p>
<br>
<p>
   Fixed notation with one significant figure after the decimal point:
   <img src="images/updates/fixed-number-formatting.png" width="442.5px" height="46.5px" alt="Fixed Number Formatting Screenshot">
</p>
<br>
<p>
   Scientific notation with four significant figures:
   <img src="images/updates/scientific-number-formatting.png" width="442.5px" height="46.5px" alt="Scientific Number Formatting Screenshot">
</p>
<br>
<p>
   Engineering notation with four significant figures:
   <img src="images/updates/engineering-number-formatting.png" width="442.5px" height="46.5px" alt="Scientific Number Formatting Screenshot">
</p>
<br>
<p>
   Symbolic notation:
   <img src="images/updates/symbolic-number-formatting.png" width="442.5px" height="46.5px" alt="Symbolic Number Formatting Screenshot">
</p>
<br>
<p>
   Additionally, the precision of the numerical computations has been increased
   to 64 significant figures. Note that some unit conversions occurs at standard
   floating point precision (this occurs when using non-SI units and when 
   converting between radians and degrees). This issue will be addressed in future
   updates.
</p>
<br>
<p>
   Many thanks to <a href="https://github.com/JWock82" target="_blank">@JWock82</a> for
   submitting these feature suggestions as a
   <a href="https://github.com/mgreminger/EngineeringPaper.xyz/issues">
   GitHub issue</a>.
</p>
<br>

<em>May 11, 2023</em>
<h4>Math Editor Change and Features for More Compact Sheets</h4>
<p>
   Up until this time, EngineeringPaper.xyz has been using the MathQuill 
   math editor component. This editor worked well but is no longer being 
   actively supported and has some limitations that has limited what features
   can be implemented in EngineeringPaper.xyz. Specifically, MathQuill does
   not support vectors and matrices. To enable the future advancement of 
   EngineeringPaper.xyz, the math editor has been updated to use the 
   <a href="https://cortexjs.io/mathlive/" target="_blank">MathLive</a> math 
   editing component. MathLive is under active development and supports 
   many advanced math constructs, such as vectors and matrices.  
   You will notice differences in how the equations look in your existing 
   sheets. In general, MathLive uses a more modern font set 
   and renders equations more clearly. We have aimed to keep the editing 
   experience as close to the same as possible. One change is the shortcut 
   for the square root symbol. Simply type "sqrt(" to create the square 
   root symbol. Alternatively, you can use the onscreen keyboard to insert a square
   root symbol.   
</p>
<br>
<p>
   Extensive testing has been done to ensure that your existing sheets will 
   still work without needing any updates. If you do run into issues with 
   your existing sheets, this is a bug and should be reported to 
   <a href="mailto:support@engineeringpaper.xyz">support@engineeringpaper.xyz</a>, 
   submitted as an issue on the 
   <a href="https://github.com/mgreminger/EngineeringPaper.xyz/issues" target="_blank">GitHub issues page</a>,
   or reported on the
   <a href="https://www.reddit.com/r/EngineeringPaperXYZ/" target="_blank">Reddit community page</a>. 
   In the case that you are having a issue opening an existing sheet or working with the math 
   editor, the previous version of EngineeringPaper.xyz will remain available at 
   <a href="https://classic.engineeringpaper.xyz" target="_blank">classic.engineeringpaper.xyz</a>. 
   Keep in mind that sheets created in this and later versions of EngineeringPaper.xyz 
   will not open in classic.engineeringpaper.xyz
</p>
<br>
<p>
   This switch to a new math editor would not be complete without adding some 
   new features. In the past, sheets tended to use up a lot of vertical space 
   since each new assignment, each query, and each comment needed its own cell.
   An assignment and query can now be combined into one statement as shown in 
   the image below:
   <img src="images/updates/combined-assignment-query.png" width="306.5px" height="48px" alt="Combined Assignment and Query Statement Screenshot">   
   Additionally, multiple assignments can be be made in a math cell by separating
   them by commas:
   <img src="images/updates/multiple-assignments.png" width="315.5px" height="33.5px" alt="Multiple Assignments in a Single Math Cell Screenshot">   
   Finally, comments can be added at any location within a math field by pressing
   the quotation mark key to toggle comment mode on and off. The <em>Comment</em> button on the
   <em>ABC</em> or <em>abc</em> panels of the onscreen keyboard may also be used to
   toggle comment mode. Comments may be added at any point within a math expression 
   and will automatically be ignored (see example below). This is a capability directly enabled by 
   switching to the MathLive math editor.  
   <img src="images/updates/math-comments.png" width="245px" height="51px" alt="Comments in a Math Field Screenshot">   
   To see these new features in action, checkout this 
   <a href="https://engineeringpaper.xyz/c2YzvRRDNx3zYrY7dKDa92" target="_blank">example sheet</a>.
   Many thanks to <a href="https://github.com/JWock82" target="_blank">@JWock82</a> for
   submitting these feature suggestions as a
   <a href="https://github.com/mgreminger/EngineeringPaper.xyz/issues">
   GitHub issue</a>.
</p>
<br>

<em>April 6, 2023</em>
<h4>Load Time and Calculation Speed Improvements</h4>
<p>
   The version of Python that EngineeringPaper.xyz uses for calculations, via the Pyodide project,
   has been updated to Python 3.11. This update provides significant speed improvements for 
   both calculations and initial Pyodide load time. The initial Pyodide load time is 
   about half of what it was for the Python 3.10 version of EngineeringPaper.xyz. Enjoy!
</p>
<br>

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
