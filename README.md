# EngineeringPaper
EngineeringPaper is in the very early prototyping phases. It aims to be a application for symbolically evaluating and solving equations while keeping track of units. It leverages many other open source projects including [MathQuill](http://mathquill.com/) for equation editing, the [sympy](https://github.com/sympy/sympy) python library via [pyodide](https://github.com/iodide-project/pyodide) for symbolic equation evaluation and dimensional anaylsis, and [Svelte](https://svelte.dev/) for handling user interaction.

![Animated Demo](demo/engineering_paper_demo.webp)

A [live demo](https://mgreminger.github.io/EngineeringPaper/) is available.

## Build Instructions
### [npm](https://www.npmjs.com/)
``` bash
# Install dependencies
npm install

# Server with hot reload at localhost:5000
npm run dev

# Build for production with minification
npm run build
```
## License
MIT
