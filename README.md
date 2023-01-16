![github_logo](https://user-images.githubusercontent.com/6439649/212775436-497386bc-ff12-4d79-a994-057e6bcedb9d.svg)

EngineeringPaper.xyz is a web app for engineeirng calculations that handles unit conversion/checking automatically and also supports plotting, solving systems of equations, and documenting your calculations. It's easy to share your calculations by creating a shareable link that anyone can open and edit. Additionaly, you can save and open your files locally. EngineeringPaper.xzy runs on Mac, Windows, Linux and ChromeOS (works on all of the major browsers). Additionally, EngineeringPaper.xyz is designed to run well on Android and iOS devices. [Launch EngineeringPaper.xyz](https://EngineeringPaper.xyz) in your browser to try it out.

![platforms_cropped](https://user-images.githubusercontent.com/6439649/212774749-caab6190-7a45-4f04-a31c-ffdb6b6e4b96.png)

All calculations are run on your own device using the [Pyodide project](https://pyodide.org) to run Python in your browser. The 
[SymPy](https://www.sympy.org) Python symbolic math library is used to handle all calculations. 

## Learning to Use EngineeringPaper.yxz
There are many ways to learn EngineeringPaper.xyz. The built-in [editable tutorial](https://engineeringpaper.xyz/CUsUSuwHkHzNyButyCHEng) is a good place to start. For many other resources, including video tutorials and example sheets, see the 
[learning EngineeringPaper.xyz](https://blog.engineeringpaper.xyz/engineeringpaperxyz-tutorial) blog post.

## Technologies
EngineeringPaper.xyz would not be possible without the many powerful open source projects that it depends on. Here's a partial list of the technologies that EngineeringPaper.xyz uses:
* [Pyodide](https://pyodide.org), puts all of the power of Python in your browser using WebAssembly
* [SymPy](https://www.sympy.org), Python symbolic math library (this is the core computation engine for EngineeringPaper.xyz)
* [MathQuill](http://mathquill.com/), math editor component
* [Quill Editor](https://quilljs.com/), rich text editor used for documentation cells
* [Svelte](https://svelte.dev/), the javascript front-end framework that EngineeringPaper.xyz is based on
* [Math.js](https://mathjs.org/), used for unit parsing
* [ANTLR](https://www.antlr.org/), parser generator used to parse the math cells

## Build Instructions
[Node.js](https://nodejs.org) is used for EngineeringPaper.xyz development. If you don't already have node installed, the easiest way to get it installed is to use the [Volta](https://volta.sh/) node installer.

To run EngineeringPaper.xyz locally in development mode, use the following commands (commands tested on Linux, MacOS, and on Windows using WSL2):
``` bash
# Install dependencies
npm install

# Run local dev server with live reload (point browser to localhost:8788)
npm run dev
```
To run the test suite locally, run the following commands (close the dev server before running the following commands):
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
