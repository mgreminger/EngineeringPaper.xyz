# EngineeringPaper
EngineeringPaper is in the very early prototpying phases and is not currently usable. It aims to be a application for symbolically evaluating and solving equations while keeping track of units. It leverages many other open source projects including [mathlive](https://github.com/arnog/mathlive) for equation editing, the [sympy](https://github.com/sympy/sympy) python library via [pyodide](https://github.com/iodide-project/pyodide) for symbolic equation evaluation and dimensional anaylsis, and [Vue.js](https://vuejs.org/) for handling user interaction.

![Animated Demo](demo/engineering_paper_demo.webp)

A [live demo](https://mgreminger.github.io/EngineeringPaper/) is available. It will take a few seconds for pyodide to load.

## Build Instructions
### [npm](https://www.npmjs.com/)
``` bash
# Install dependencies
npm install

# Server with hot reload at localhost:8080
npm run dev

# Build for production with minification
npm run build
```
## License
MIT
