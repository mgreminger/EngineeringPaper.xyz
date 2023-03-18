import type {MathField} from '../cells/MathField';
import { get } from 'svelte/store';
import { onMobile } from '../stores';


export type Keyboards = {
  type: "Keyboards",
  selectedTab: number,
  keyboards: Keyboard[]
}

export type Buttons = {
  type: "Buttons",
  buttons: (Button | Blank)[][]
}

type Keyboard = {
  tabText: string,
  content: Buttons | Keyboards
};

type Commands = "insert" | "moveToNextChar" | "moveToPreviousChar" | "deleteBackward";

export class Button {
  static nextId = 0;
  type = "Button";
  id: number;
  buttonText: string;
  content: string | undefined;
  command: Commands;
  size: string;
  fontSize: string;

  constructor({ buttonText, content, command = "insert",
    size = "1fr", fontSize="" }:
    {
      buttonText: string, content?: string, command?: Commands,
      size?: string, fontSize?: string
    }) {
    if (content === undefined && command === "insert") {
      content = buttonText;
    }
    this.id = Button.nextId++;
    this.buttonText = buttonText;
    this.content = content;
    this.command = command;
    this.size = size;
    this.fontSize = fontSize;
  }

  click(activeMathField: MathField) {
    if (activeMathField && activeMathField.element) {
      if (get(onMobile) && navigator.vibrate) {
        navigator.vibrate(1);
      }
      
      if (this.command === "insert") {
        activeMathField.element.getMathField().executeCommand([this.command, this.content]);
      } else {
        activeMathField.element.getMathField().executeCommand([this.command]);
      }
    }
  }
}

class Blank {
  type = "Blank";
  size: string;
  id: number;

  constructor(size?: string) {
    this.id = Button.nextId++;
    if (size === undefined) {
      this.size = "1fr";
    } else {
      this.size = size;
    }
  }
}


const unitsKeyboards: Keyboards = {
  type: "Keyboards",
  selectedTab: 0,
  keyboards: [
    {
      tabText: "Length",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[m\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[mm\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[cm\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[km\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[um\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[inch\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[feet\right]`, command: "insert" }),
        ],
        [
          
          new Button({ buttonText: String.raw`\left[yard\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[mile\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[angstrom\right]`, command: "insert" }),
          new Blank(),
          new Blank(),
          new Blank(),
          new Blank(),
        ],
        ]
      }
    },
    {
      tabText: "Force",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[N\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[kN\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[mN\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[lbf\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[kip\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[dyne\right]`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Mass",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[g\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[kg\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[tonne\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[lbm\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[ton\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[oz\right]`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Time",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[sec\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[min\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[hours\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[days\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[weeks\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[years\right]`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Area",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[m^{2}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[cm^{2}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[mm^{2}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[km^{2}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[hectare\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[in^{2}\right]`, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left[feet^{2}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[yard^{2}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[mile^{2}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[acre\right]`, command: "insert" }),
          new Blank(),
          new Blank(),
          new Blank(),
        ],
        ]
      }
    },
    {
      tabText: "Press",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[Pa\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[kPa\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[MPa\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[psi\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[atm\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[torr\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[bar\right]`, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left[mmHg\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[mmH2O\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[cmH2O\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{N}{m^{2}}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{N}{mm^{2}}\right]`, command: "insert" }),
          new Blank(),
          new Blank(),
        ],
        ]
      }
    },
    {
      tabText: "Vol",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[m^{3}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[cm^{3}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[mm^{3}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[km^{3}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[liter\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[ml\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[in^{3}\right]`, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left[feet^{3}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[yard^{3}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[mile^{3}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[gallon\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[floz\right]`, command: "insert" }),
          new Blank(),
          new Blank()
        ],
        ]
      }
    },
    {
      tabText: "Energy",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[J\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[mJ\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[kJ\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[MJ\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[Wh\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[kWh\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[eV\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[BTU\right]`, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left[hp\cdot hr\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[N\cdot m\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[in\cdot lbf\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[foot\cdot lbf\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[erg\right]`, command: "insert" }),
          new Blank(),
          new Blank(),
          new Blank(),
        ],
        ]
      }
    },
    {
      tabText: "Power",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[W\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[mW\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[kW\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[MW\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[hp\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{BTU}{min}\right]`, command: "insert"}),
          new Button({ buttonText: String.raw`\left[\frac{BTU}{sec}\right]`, command: "insert"}),
        ],
        [
          new Button({ buttonText: String.raw`\left[\frac{erg}{sec}\right]`, command: "insert"}),
          new Button({ buttonText: String.raw`\left[\frac{dyne\cdot cm}{sec}\right]`, command: "insert"}),
          new Blank(),
          new Blank(),
          new Blank(),
          new Blank(),
          new Blank(),
        ],
        ]
      }
    },
    {
      tabText: "Temp",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[K\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[degC\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[degF\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[degR\right]`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Vel",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[\frac{m}{sec}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{km}{hour}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{mm}{min}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{m}{min}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{feet}{sec}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{miles}{hour}\right]`, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left[\frac{inch}{min}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{feet}{min}\right]`, command: "insert" }),
          new Blank(),
          new Blank(),
          new Blank(),
          new Blank(),
        ],
        ]
      }
    },
    {
      tabText: "Accel",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[\frac{m}{sec^{2}}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{cm}{sec^{2}}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{feet}{sec^{2}}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{in}{sec^{2}}\right]`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Density",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[\frac{kg}{m^{3}}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{Mg}{m^{3}}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{g}{cm^{3}}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{lbm}{in^{3}}\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{lbm}{feet^{3}}\right]`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Angle",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[deg\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[rad\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[grad\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[cycle\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[arcsec\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[arcmin\right]`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Freq",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[Hz\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[kHz\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[MHz\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[GHz\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{cycles}{sec}\right]`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Elec",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[A\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[mA\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[V\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[mV\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[kV\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[F\right]`, command: "insert" }),
          new Button({ buttonText: String.raw`\left[nF\right]`, command: "insert"}),
          new Button({ buttonText: String.raw`\left[pF\right]`, command: "insert"}),
          new Button({ buttonText: String.raw`\left[C\right]`, command: "insert"}),
        ],
        [
          new Button({ buttonText: String.raw`\left[ohm\right]`, command: "insert"}),
          new Button({ buttonText: String.raw`\left[kohm\right]`, command: "insert"}),
          new Button({ buttonText: String.raw`\left[Mohm\right]`, command: "insert"}),
          new Button({ buttonText: String.raw`\left[H\right]`, command: "insert"}),
          new Button({ buttonText: String.raw`\left[nH\right]`, command: "insert"}),
          new Button({ buttonText: String.raw`\left[pH\right]`, command: "insert"}),
          new Button({ buttonText: String.raw`\left[Wb\right]`, command: "insert"}),
          new Button({ buttonText: String.raw`\left[T\right]`, command: "insert"}),
        ],
        ]
      }
    },
  ]
};


export const keyboards: Keyboards = {
  selectedTab: 0,
  type: "Keyboards",
  keyboards: [
    {
      tabText: "Math",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: '\\leftarrow', command: "moveToPreviousChar" }),
          new Button({ buttonText: '\\rightarrow', command: "moveToNextChar" }),
          new Blank('.25fr'),
          new Button({ buttonText: '7', content: '7' }),
          new Button({ buttonText: '8', content: '8' }),
          new Button({ buttonText: '9', content: '9' }),
          new Button({ buttonText: '/', content: '\\frac{#@}{#?}' }),
          new Blank('0.25fr'),
          new Button({ buttonText: 'x', content: 'x' }),
          new Button({ buttonText: 'y', content: 'y' }),
          new Button({ buttonText: '⌫', command: 'deleteBackward' }),
        ],
        [
          new Button({ buttonText: '(', content: '(' }),
          new Button({ buttonText: ')', content: ')' }),
          new Blank('0.25fr'),
          new Button({ buttonText: '4', content: '4' }),
          new Button({ buttonText: '5', content: '5' }),
          new Button({ buttonText: '6', content: '6' }),
          new Button({ buttonText: '\\times', content: '\\cdot' }),
          new Blank('0.25fr'),
          new Button({ buttonText: '\\pi', content: '\\pi' }),
          new Button({ buttonText: 'e', content: 'e' }),
          new Button({ buttonText: 'i', content: 'i' }),
        ],
        [
          new Button({ buttonText: '\\le', content: '\\le' }),
          new Button({ buttonText: '\\ge', content: '\\ge' }),
          new Blank('0.25fr'),
          new Button({ buttonText: '1', content: '1' }),
          new Button({ buttonText: '2', content: '2' }),
          new Button({ buttonText: '3', content: '3' }),
          new Button({ buttonText: '-', content: '-' }),
          new Blank('0.25fr'),
          new Button({ buttonText: '\\sqrt x', content: '\\sqrt{#0}' }),
          new Button({ buttonText: 'x^y', content: '#@^{#?}' }),
          new Button({ buttonText: '\\ln', content: '\\ln\\left(#0\\right)', command: "insert" }),
        ],
        [
          new Button({ buttonText: '<', content: '<' }),
          new Button({ buttonText: '>', content: '>' }),
          new Blank('0.25fr'),
          new Button({ buttonText: '0', content: '0' }),
          new Button({ buttonText: '.', content: '.' }),
          new Button({ buttonText: '=', content: '=' }),
          new Button({ buttonText: '+', content: '+' }),
          new Blank('0.25fr'),
          new Button({ buttonText: ',', content: ',' }),
          new Button({ buttonText: 'x_a', content: '#@_{#?}' }),
          new Button({ buttonText: '\\approx', content: '\\approx' })
        ]]
      }
    },
    {
      tabText: "f(x)",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: '\\sin', content: '\\sin\\left(#0\\right)', command: "insert" }),
          new Button({ buttonText: '\\arcsin', content: '\\arcsin\\left(#0\\right)', command: "insert", size: '1.4fr' }),
          new Button({ buttonText: '\\sinh', content: '\\sinh\\left(#0\\right)', command: "insert", size: '1.2fr' }),
          new Button({ buttonText: '\\sec', content: '\\sec\\left(#0\\right)', command: "insert" }),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\mathrm{real}', content: '\\mathrm{real}\\left(#0\\right)', command: "insert", size: '1.2fr' }),
          new Button({ buttonText: '\\left|x\\right|', content: '\\left|#0\\right|', command: "insert" }),
          new Blank('0.1fr'),
          new Blank('1fr'),
          new Button({ buttonText: '⌫', command: 'deleteBackward' }),
        ],
        [
          new Button({ buttonText: '\\cos', content: '\\cos\\left(#0\\right)', command: "insert" }),
          new Button({ buttonText: '\\arccos', content: '\\arccos\\left(#0\\right)', command: "insert", size: '1.4fr' }),
          new Button({ buttonText: '\\cosh', content: '\\cosh\\left(#0\\right)', command: "insert", size: '1.2fr' }),
          new Button({ buttonText: '\\csc', content: '\\csc\\left(#0\\right)', command: "insert" }),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\mathrm{imag}', content: '\\mathrm{imag}\\left(#0\\right)', command: "insert", size: '1.2fr' }),
          new Button({ buttonText: '\\mathrm{max}', content: '\\mathrm{max}\\left(#0\\right)', command: "insert" }),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\leftarrow', command: 'moveToPreviousChar' }),
          new Button({ buttonText: '\\rightarrow', command: 'moveToNextChar' }),
        ],
        [
          new Button({ buttonText: '\\tan', content: '\\tan\\left(#0\\right)', command: "insert" }),
          new Button({ buttonText: '\\arctan', content: '\\arctan\\left(#0\\right)', command: "insert", size: '1.4fr' }),
          new Button({ buttonText: '\\tanh', content: '\\tanh\\left(#0\\right)', command: "insert", size: '1.2fr' }),
          new Button({ buttonText: '\\cot', content: '\\cot\\left(#0\\right)', command: "insert" }),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\mathrm{conj}', content: '\\mathrm{conj}\\left(#0\\right)', command: "insert", size: '1.2fr' }),
          new Button({ buttonText: '\\mathrm{min}', content: '\\mathrm{min}\\left(#0\\right)', command: "insert" }),          
          new Blank('0.1fr'),
          new Button({ buttonText: "x'", content: '\\frac{\\mathrm{d}}{\\mathrm{d}\\left(\\right)}\\left(#0\\right)', command: "insert" }),
          new Button({ buttonText: '\\int_{\\ }^{\\ }', content: '\\int _{ }^{ }\\left(#0\\right)\\mathrm{d}\\left(\\right)', command: "insert", fontSize: '6pt' }),
        ],
        [
          new Button({ buttonText: '\\ln', content: '\\ln\\left(#0\\right)', command: "insert" }),
          new Button({ buttonText: '\\log_{10}', content: '\\log\\left(#0\\right)', command: "insert", size: '1.4fr' }),
          new Button({ buttonText: '\\log_{b}', content: '\\log_{}\\left(#0\\right)', command: "insert", size: '1.2fr' }),
          new Blank(),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\mathrm{angle}', content: '\\mathrm{angle}\\left(#0\\right)', command: "insert", size: '1.2fr' }),
          new Blank(),
          new Blank('0.1fr'),
          new Button({ buttonText: "x''", content: '\\frac{\\mathrm{d}^{2}}{\\mathrm{d}\\left(\\right)^{2}}\\left(#0\\right)', command: "insert" }),
          new Button({ buttonText: "x'''", content: '\\frac{\\mathrm{d}^{3}}{\\mathrm{d}\\left(\\right)^{3}}\\left(#0\\right)', command: "insert" })
        ]]
      }
    },
    {
      tabText: "ABC",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: 'Q' }),
          new Button({ buttonText: 'W' }),
          new Button({ buttonText: 'E' }),
          new Button({ buttonText: 'R' }),
          new Button({ buttonText: 'T' }),
          new Button({ buttonText: 'Y' }),
          new Button({ buttonText: 'U' }),
          new Button({ buttonText: 'I' }),
          new Button({ buttonText: 'O' }),
          new Button({ buttonText: 'P' }),
        ],
        [
          new Button({ buttonText: 'A' }),
          new Button({ buttonText: 'S' }),
          new Button({ buttonText: 'D' }),
          new Button({ buttonText: 'F' }),
          new Button({ buttonText: 'G' }),
          new Button({ buttonText: 'H' }),
          new Button({ buttonText: 'J' }),
          new Button({ buttonText: 'K' }),
          new Button({ buttonText: 'L' }),
          new Button({ buttonText: '⌫', command: 'deleteBackward' }),
        ],
        [
          new Button({ buttonText: '\\leftarrow', command: 'moveToPreviousChar' }),
          new Button({ buttonText: 'Z' }),
          new Button({ buttonText: 'X' }),
          new Button({ buttonText: 'C' }),
          new Button({ buttonText: 'V' }),
          new Button({ buttonText: 'B' }),
          new Button({ buttonText: 'N' }),
          new Button({ buttonText: 'M' }),
          new Button({ buttonText: ',' }),
          new Button({ buttonText: '\\rightarrow', command: 'moveToNextChar' }),
        ],
        [
          new Button({ buttonText: '(', content: '(' }),
          new Button({ buttonText: ')', content: ')' }),
          new Button({ buttonText: '[', content: '[' }),
          new Button({ buttonText: ']', content: ']' }),
          new Button({ buttonText: '+', content: '+' }),
          new Button({ buttonText: '-', content: '-' }),
          new Button({ buttonText: '\\times', content: '\\cdot' }),
          new Button({ buttonText: '/', content: '\\frac{#@}{#?}' }),
          new Button({ buttonText: '=', content: '=' }),
          new Button({ buttonText: 'x_a', content: '#@_{#?}' }),
        ]]
      }
    },
    {
      tabText: "abc",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: 'q' }),
          new Button({ buttonText: 'w' }),
          new Button({ buttonText: 'e' }),
          new Button({ buttonText: 'r' }),
          new Button({ buttonText: 't' }),
          new Button({ buttonText: 'y' }),
          new Button({ buttonText: 'u' }),
          new Button({ buttonText: 'i' }),
          new Button({ buttonText: 'o' }),
          new Button({ buttonText: 'p' }),
        ],
        [
          new Button({ buttonText: 'a' }),
          new Button({ buttonText: 's' }),
          new Button({ buttonText: 'd' }),
          new Button({ buttonText: 'f' }),
          new Button({ buttonText: 'g' }),
          new Button({ buttonText: 'h' }),
          new Button({ buttonText: 'j' }),
          new Button({ buttonText: 'k' }),
          new Button({ buttonText: 'l' }),
          new Button({ buttonText: '⌫', command: 'deleteBackward' }),
        ],
        [
          new Button({ buttonText: '\\leftarrow', command: 'moveToPreviousChar' }),
          new Button({ buttonText: 'z' }),
          new Button({ buttonText: 'x' }),
          new Button({ buttonText: 'c' }),
          new Button({ buttonText: 'v' }),
          new Button({ buttonText: 'b' }),
          new Button({ buttonText: 'n' }),
          new Button({ buttonText: 'm' }),
          new Button({ buttonText: ',' }),
          new Button({ buttonText: '\\rightarrow', command: 'moveToNextChar' }),
        ],
        [
          new Button({ buttonText: '(' }),
          new Button({ buttonText: ')' }),
          new Button({ buttonText: '[' }),
          new Button({ buttonText: ']' }),
          new Button({ buttonText: '+', content: '+' }),
          new Button({ buttonText: '-', content: '-' }),
          new Button({ buttonText: '\\times', content: '\\cdot' }),
          new Button({ buttonText: '/', content: '\\frac{#@}{#?}' }),
          new Button({ buttonText: '=', content: '=' }),
          new Button({ buttonText: 'x_a', content: '#@_{#?}' }),
        ]]
      }
    },
    {
      tabText: "αβγ",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: '\\alpha' }),
          new Button({ buttonText: '\\beta' }),
          new Button({ buttonText: '\\gamma' }),
          new Button({ buttonText: '\\delta' }),
          new Button({ buttonText: '\\epsilon' }),
          new Button({ buttonText: '\\zeta' }),
          new Button({ buttonText: '\\eta' }),
          new Button({ buttonText: '\\theta' }),
          new Button({ buttonText: '\\iota' }),
          new Button({ buttonText: '\\kappa' }),

        ],
        [
          new Button({ buttonText: '\\lambda' }),
          new Button({ buttonText: '\\mu' }),
          new Button({ buttonText: '\\xi' }),
          new Button({ buttonText: '\\pi' }),
          new Button({ buttonText: '\\rho' }),
          new Button({ buttonText: '\\sigma' }),
          new Button({ buttonText: '\\tau' }),
          new Button({ buttonText: '\\upsilon' }),
          new Button({ buttonText: '\\phi' }),
          new Button({ buttonText: '⌫', command: 'deleteBackward' }),
        ],
        [
          new Button({ buttonText: '\\leftarrow', command: 'moveToPreviousChar' }),
          new Button({ buttonText: '\\chi' }),
          new Button({ buttonText: '\\psi' }),
          new Button({ buttonText: '\\omega' }),
          new Button({ buttonText: '\\Gamma' }),
          new Button({ buttonText: '\\Delta' }),
          new Button({ buttonText: '\\Theta' }),
          new Button({ buttonText: '\\Lambda' }),
          new Button({ buttonText: '\\Xi' }),
          new Button({ buttonText: '\\rightarrow', command: 'moveToNextChar' }),
        ],
        [
          new Button({ buttonText: '(' }),
          new Button({ buttonText: ')' }),
          new Button({ buttonText: '\\Pi' }),
          new Button({ buttonText: '\\Sigma' }),
          new Button({ buttonText: '\\Upsilon' }),
          new Button({ buttonText: '\\Phi' }),
          new Button({ buttonText: '\\Psi' }),
          new Button({ buttonText: '\\Omega' }),
          new Button({ buttonText: '=', content: '=' }),
          new Button({ buttonText: 'x_a', content: '#@_{#?}' }),
        ]]
      }
    },
    {
      tabText: "Units",
      content: unitsKeyboards
    }
  ]
};




