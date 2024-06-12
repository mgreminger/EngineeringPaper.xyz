# [![EngineeringPaper.xyz](https://user-images.githubusercontent.com/6439649/212795699-7cc908e1-00a4-44ed-a034-695f056ee84a.png)](https://engineeringpaper.xyz)


EngineeringPaper.xyz is a web app for engineering calculations that handles unit conversion/checking automatically and also supports plotting, solving systems of equations, and documenting your calculations (see the [official blog](https://blog.engineeringpaper.xyz) for many examples). It's easy to share your calculations by creating a [shareable link](https://engineeringpaper.xyz/oMbWLXMZ6ChQ3g3ZxRbJQD) that anyone can open and build off of. Additionaly, you can save and open your files locally if you prefer not to save to the cloud. EngineeringPaper.xyz runs on Mac, Windows, Linux, and ChromeOS and works on all of the major browsers. Additionally, EngineeringPaper.xyz is designed to run well on Android and iOS devices. [Launch EngineeringPaper.xyz](https://EngineeringPaper.xyz) in your browser to try it out.

![platforms_cropped](https://user-images.githubusercontent.com/6439649/212774749-caab6190-7a45-4f04-a31c-ffdb6b6e4b96.png)


All calculations are run on your own device using the [Pyodide project](https://pyodide.org) to run Python in your browser. The 
[SymPy](https://www.sympy.org) Python symbolic math library is used to handle all calculations. 

<a href="https://apps.microsoft.com/store/detail/engineeringpaperxyz/9N1W74WC2X2M">
<img href="" src="https://user-images.githubusercontent.com/6439649/219978105-56789e93-a1d5-4ccb-b35b-6dff71a8a954.png" width="216" height="78" alt="Microsoft Store Link for EngineeringPaper.xyz App"/></a>

<a href="https://play.google.com/store/apps/details?id=xyz.engineeringpaper.twa">
<img href="" src="https://user-images.githubusercontent.com/6439649/219977821-eab01a61-a13a-46c8-ab64-bc8e0baac479.png" width="216" height="83.59" alt="Google Play Store Link for EngineeringPaper.xyz App"/>
</a>

[![join_reddit_banner](https://github.com/mgreminger/EngineeringPaper.xyz/assets/6439649/311af86c-b358-47d4-9995-329e7e973d2e)](https://www.reddit.com/r/EngineeringPaperXYZ/)

## Learning to Use EngineeringPaper.yxz
There are many ways to learn EngineeringPaper.xyz. The built-in [editable tutorial](https://engineeringpaper.xyz/CUsUSuwHkHzNyButyCHEng) or this [tutorial video](https://youtu.be/r7EZQVhcr5Q) are good places to start. For other resources, including many video tutorials and example sheets, see the 
[learning EngineeringPaper.xyz](https://blog.engineeringpaper.xyz/engineeringpaperxyz-tutorial) blog post. To get your
questions answered, or to share calculations you have created using EngineeringPaper.xyz, join the official 
[EngineeringPaper.xyz subreddit](https://www.reddit.com/r/EngineeringPaperXYZ/).

## Dependencies
EngineeringPaper.xyz would not be possible without the many powerful open source projects that it depends on. Here's a partial list of the projects that EngineeringPaper.xyz builds off of:
* [Pyodide](https://pyodide.org), puts all of the power of Python in your browser using WebAssembly
* [SymPy](https://www.sympy.org), Python symbolic math library (this is the core computation engine for EngineeringPaper.xyz)
* [CoolProp](http://www.coolprop.org/), for thermodynamic fluid properties
* [MathLive](https://cortexjs.io/mathlive/), math editor component
* [Plotly](https://plotly.com/), used for plotting
* [Quill Editor](https://quilljs.com/), rich text editor used for documentation cells
* [Svelte](https://svelte.dev/), the javascript front-end framework that EngineeringPaper.xyz is based on
* [Math.js](https://mathjs.org/), used for unit parsing
* [ANTLR](https://www.antlr.org/), parser generator used to parse the math cells

## Build Instructions
These instructions are only needed to create a development environment for EngineeringPaper.xyz. To run the app, simply go to [EngineeringPaper.xyz](https://engineeringpaper.xyz). See the [contributing guide](https://github.com/mgreminger/EngineeringPaper.xyz/blob/main/CONTRIBUTING.md#contributing) for information on making contributions to EngineeringPaper.xyz.

[Node.js](https://nodejs.org) is used for EngineeringPaper.xyz development. If you don't already have node installed, the easiest way to get it installed is to use the [Volta](https://volta.sh/) node installer.

First, [fork and clone](https://docs.github.com/en/get-started/quickstart/fork-a-repo) this repository. Then, in the cloned project folder, use the following commands to start a local dev server (commands tested on Linux, MacOS, and on Windows using WSL2):
``` bash
# Install dependencies
npm install

# Run local dev server with live reload (point browser to localhost:8788)
npm run dev
```
To run the test suite locally, run the following commands (if the dev server is running, close it using Ctrl-C before running these commands):
``` bash
# Build the production version of the site
npm run build

# run local server
npm run start

# Switch to a new console tab or window for the rest of the commands

# Install playwright browsers (only needs to be done once each time browsers need to be updated)
# Additional installation of dependencies may be required, follow instructions
npx playwright install

# Run test suite
npm run test
```
