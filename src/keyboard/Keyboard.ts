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
  command: string | undefined;
  method: Commands;
  positionLeft: number;
  size: string;
  fontSize: string;

  constructor({ buttonText, command, method = "insert",
    positionLeft = 0, size = "1fr", fontSize="" }:
    {
      buttonText: string, command?: string, method?: Commands,
      positionLeft?: number, size?: string, fontSize?: string
    }) {
    if (command === undefined && method === "insert") {
      command = buttonText;
    }
    this.id = Button.nextId++;
    this.buttonText = buttonText;
    this.command = command;
    this.method = method;
    this.positionLeft = positionLeft;
    this.size = size;
    this.fontSize = fontSize;
  }

  click(activeMathField: MathField) {
    if (activeMathField && activeMathField.element) {
      if (get(onMobile) && navigator.vibrate) {
        navigator.vibrate(1);
      }
      
      if (this.method === "insert") {
        activeMathField.element.getMathField().executeCommand([this.method, this.command]);
      } else {
        activeMathField.element.getMathField().executeCommand([this.method]);
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
          new Button({ buttonText: String.raw`\left[m\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[mm\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[cm\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[km\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[um\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[inch\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[feet\right]`, method: "insert" }),
        ],
        [
          
          new Button({ buttonText: String.raw`\left[yard\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[mile\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[angstrom\right]`, method: "insert" }),
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
          new Button({ buttonText: String.raw`\left[N\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[kN\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[mN\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[lbf\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[kip\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[dyne\right]`, method: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Mass",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[g\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[kg\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[tonne\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[lbm\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[ton\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[oz\right]`, method: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Time",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[sec\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[min\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[hours\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[days\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[weeks\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[years\right]`, method: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Area",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[m^{2}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[cm^{2}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[mm^{2}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[km^{2}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[hectare\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[in^{2}\right]`, method: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left[feet^{2}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[yard^{2}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[mile^{2}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[acre\right]`, method: "insert" }),
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
          new Button({ buttonText: String.raw`\left[Pa\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[kPa\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[MPa\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[psi\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[atm\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[torr\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[bar\right]`, method: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left[mmHg\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[mmH2O\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[cmH2O\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{N}{m^{2}}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{N}{mm^{2}}\right]`, method: "insert" }),
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
          new Button({ buttonText: String.raw`\left[m^{3}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[cm^{3}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[mm^{3}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[km^{3}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[liter\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[ml\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[in^{3}\right]`, method: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left[feet^{3}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[yard^{3}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[mile^{3}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[gallon\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[floz\right]`, method: "insert" }),
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
          new Button({ buttonText: String.raw`\left[J\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[mJ\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[kJ\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[MJ\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[Wh\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[kWh\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[eV\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[BTU\right]`, method: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left[hp\cdot hr\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[N\cdot m\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[in\cdot lbf\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[foot\cdot lbf\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[erg\right]`, method: "insert" }),
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
          new Button({ buttonText: String.raw`\left[W\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[mW\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[kW\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[MW\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[hp\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{BTU}{min}\right]`, method: "insert"}),
          new Button({ buttonText: String.raw`\left[\frac{BTU}{sec}\right]`, method: "insert"}),
        ],
        [
          new Button({ buttonText: String.raw`\left[\frac{erg}{sec}\right]`, method: "insert"}),
          new Button({ buttonText: String.raw`\left[\frac{dyne\cdot cm}{sec}\right]`, method: "insert"}),
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
          new Button({ buttonText: String.raw`\left[K\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[degC\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[degF\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[degR\right]`, method: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Vel",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[\frac{m}{sec}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{km}{hour}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{mm}{min}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{m}{min}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{feet}{sec}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{miles}{hour}\right]`, method: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left[\frac{inch}{min}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{feet}{min}\right]`, method: "insert" }),
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
          new Button({ buttonText: String.raw`\left[\frac{m}{sec^{2}}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{cm}{sec^{2}}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{feet}{sec^{2}}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{in}{sec^{2}}\right]`, method: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Density",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[\frac{kg}{m^{3}}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{Mg}{m^{3}}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{g}{cm^{3}}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{lbm}{in^{3}}\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{lbm}{feet^{3}}\right]`, method: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Angle",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[deg\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[rad\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[grad\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[cycle\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[arcsec\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[arcmin\right]`, method: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Freq",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[Hz\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[kHz\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[MHz\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[GHz\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[\frac{cycles}{sec}\right]`, method: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Elec",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[A\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[mA\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[V\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[mV\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[kV\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[F\right]`, method: "insert" }),
          new Button({ buttonText: String.raw`\left[nF\right]`, method: "insert"}),
          new Button({ buttonText: String.raw`\left[pF\right]`, method: "insert"}),
          new Button({ buttonText: String.raw`\left[C\right]`, method: "insert"}),
        ],
        [
          new Button({ buttonText: String.raw`\left[ohm\right]`, method: "insert"}),
          new Button({ buttonText: String.raw`\left[kohm\right]`, method: "insert"}),
          new Button({ buttonText: String.raw`\left[Mohm\right]`, method: "insert"}),
          new Button({ buttonText: String.raw`\left[H\right]`, method: "insert"}),
          new Button({ buttonText: String.raw`\left[nH\right]`, method: "insert"}),
          new Button({ buttonText: String.raw`\left[pH\right]`, method: "insert"}),
          new Button({ buttonText: String.raw`\left[Wb\right]`, method: "insert"}),
          new Button({ buttonText: String.raw`\left[T\right]`, method: "insert"}),
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
          new Button({ buttonText: '\\leftarrow', command: 'Left', method: "moveToPreviousChar" }),
          new Button({ buttonText: '\\rightarrow', command: 'Right', method: "moveToNextChar" }),
          new Blank('.25fr'),
          new Button({ buttonText: '7', command: '7' }),
          new Button({ buttonText: '8', command: '8' }),
          new Button({ buttonText: '9', command: '9' }),
          new Button({ buttonText: '/', command: '\\frac{#@}{#?}' }),
          new Blank('0.25fr'),
          new Button({ buttonText: 'x', command: 'x' }),
          new Button({ buttonText: 'y', command: 'y' }),
          new Button({ buttonText: '⌫', command: 'Backspace', method: 'deleteBackward' }),
        ],
        [
          new Button({ buttonText: '(', command: '(' }),
          new Button({ buttonText: ')', command: ')' }),
          new Blank('0.25fr'),
          new Button({ buttonText: '4', command: '4' }),
          new Button({ buttonText: '5', command: '5' }),
          new Button({ buttonText: '6', command: '6' }),
          new Button({ buttonText: '\\times', command: '\\cdot' }),
          new Blank('0.25fr'),
          new Button({ buttonText: '\\pi', command: '\\pi' }),
          new Button({ buttonText: 'e', command: 'e' }),
          new Button({ buttonText: 'i', command: 'i' }),
        ],
        [
          new Button({ buttonText: '\\le', command: '\\le' }),
          new Button({ buttonText: '\\ge', command: '\\ge' }),
          new Blank('0.25fr'),
          new Button({ buttonText: '1', command: '1' }),
          new Button({ buttonText: '2', command: '2' }),
          new Button({ buttonText: '3', command: '3' }),
          new Button({ buttonText: '-', command: '-' }),
          new Blank('0.25fr'),
          new Button({ buttonText: '\\sqrt x', command: '\\sqrt' }),
          new Button({ buttonText: 'x^y', command: '#@^{#?}' }),
          new Button({ buttonText: '\\ln', command: '\\ln\\left(#0\\right)', method: "insert", positionLeft: 1 }),
        ],
        [
          new Button({ buttonText: '<', command: '<' }),
          new Button({ buttonText: '>', command: '>' }),
          new Blank('0.25fr'),
          new Button({ buttonText: '0', command: '0' }),
          new Button({ buttonText: '.', command: '.' }),
          new Button({ buttonText: '=', command: '=' }),
          new Button({ buttonText: '+', command: '+' }),
          new Blank('0.25fr'),
          new Button({ buttonText: ',', command: ',' }),
          new Button({ buttonText: 'x_a', command: '#@_{#?}' }),
          new Button({ buttonText: '\\approx', command: '\\approx' })
        ]]
      }
    },
    {
      tabText: "f(x)",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: '\\sin', command: '\\sin\\left(#0\\right)', method: "insert", positionLeft: 1 }),
          new Button({ buttonText: '\\arcsin', command: '\\arcsin\\left(#0\\right)', method: "insert", positionLeft: 1, size: '1.4fr' }),
          new Button({ buttonText: '\\sinh', command: '\\sinh\\left(#0\\right)', method: "insert", positionLeft: 1, size: '1.2fr' }),
          new Button({ buttonText: '\\sec', command: '\\sec\\left(#0\\right)', method: "insert", positionLeft: 1 }),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\mathrm{real}', command: '\\mathrm{real}\\left(#0\\right)', method: "insert", positionLeft: 1, size: '1.2fr' }),
          new Button({ buttonText: '\\left|x\\right|', command: '\\left|#0\\right|', method: "insert", positionLeft: 1 }),
          new Blank('0.1fr'),
          new Blank('1fr'),
          new Button({ buttonText: '⌫', command: 'Backspace', method: 'deleteBackward' }),
        ],
        [
          new Button({ buttonText: '\\cos', command: '\\cos\\left(#0\\right)', method: "insert", positionLeft: 1 }),
          new Button({ buttonText: '\\arccos', command: '\\arccos\\left(#0\\right)', method: "insert", positionLeft: 1, size: '1.4fr' }),
          new Button({ buttonText: '\\cosh', command: '\\cosh\\left(#0\\right)', method: "insert", positionLeft: 1, size: '1.2fr' }),
          new Button({ buttonText: '\\csc', command: '\\csc\\left(#0\\right)', method: "insert", positionLeft: 1 }),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\mathrm{imag}', command: '\\mathrm{imag}\\left(#0\\right)', method: "insert", positionLeft: 1, size: '1.2fr' }),
          new Button({ buttonText: '\\mathrm{max}', command: '\\mathrm{max}\\left(#0\\right)', method: "insert", positionLeft: 1 }),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\leftarrow', command: 'Left', method: 'moveToPreviousChar' }),
          new Button({ buttonText: '\\rightarrow', command: 'Right', method: 'moveToNextChar' }),
        ],
        [
          new Button({ buttonText: '\\tan', command: '\\tan\\left(#0\\right)', method: "insert", positionLeft: 1 }),
          new Button({ buttonText: '\\arctan', command: '\\arctan\\left(#0\\right)', method: "insert", positionLeft: 1, size: '1.4fr' }),
          new Button({ buttonText: '\\tanh', command: '\\tanh\\left(#0\\right)', method: "insert", positionLeft: 1, size: '1.2fr' }),
          new Button({ buttonText: '\\cot', command: '\\cot\\left(#0\\right)', method: "insert", positionLeft: 1 }),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\mathrm{conj}', command: '\\mathrm{conj}\\left(#0\\right)', method: "insert", positionLeft: 1, size: '1.2fr' }),
          new Button({ buttonText: '\\mathrm{min}', command: '\\mathrm{min}\\left(#0\\right)', method: "insert", positionLeft: 1 }),          
          new Blank('0.1fr'),
          new Button({ buttonText: "x'", command: '\\frac{\\mathrm{d}}{\\mathrm{d}\\left(\\right)}\\left(#0\\right)', method: "insert", positionLeft: 1 }),
          new Button({ buttonText: '\\int_{\\ }^{\\ }', command: '\\int _{ }^{ }\\left(#0\\right)\\mathrm{d}\\left(\\right)', method: "insert", positionLeft: 6, fontSize: '6pt' }),
        ],
        [
          new Button({ buttonText: '\\ln', command: '\\ln\\left(#0\\right)', method: "insert", positionLeft: 1 }),
          new Button({ buttonText: '\\log_{10}', command: '\\log\\left(#0\\right)', method: "insert", positionLeft: 1, size: '1.4fr' }),
          new Button({ buttonText: '\\log_{b}', command: '\\log_{}\\left(#0\\right)', method: "insert", positionLeft: 1, size: '1.2fr' }),
          new Blank(),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\mathrm{angle}', command: '\\mathrm{angle}\\left(#0\\right)', method: "insert", positionLeft: 1, size: '1.2fr' }),
          new Blank(),
          new Blank('0.1fr'),
          new Button({ buttonText: "x''", command: '\\frac{\\mathrm{d}^{2}}{\\mathrm{d}\\left(\\right)^{2}}\\left(#0\\right)', method: "insert", positionLeft: 1 }),
          new Button({ buttonText: "x'''", command: '\\frac{\\mathrm{d}^{3}}{\\mathrm{d}\\left(\\right)^{3}}\\left(#0\\right)', method: "insert", positionLeft: 1 })
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
          new Button({ buttonText: '⌫', command: 'Backspace', method: 'deleteBackward' }),
        ],
        [
          new Button({ buttonText: '\\leftarrow', command: 'Left', method: 'moveToPreviousChar' }),
          new Button({ buttonText: 'Z' }),
          new Button({ buttonText: 'X' }),
          new Button({ buttonText: 'C' }),
          new Button({ buttonText: 'V' }),
          new Button({ buttonText: 'B' }),
          new Button({ buttonText: 'N' }),
          new Button({ buttonText: 'M' }),
          new Button({ buttonText: ',' }),
          new Button({ buttonText: '\\rightarrow', command: 'Right', method: 'moveToNextChar' }),
        ],
        [
          new Button({ buttonText: '(', command: '(' }),
          new Button({ buttonText: ')', command: ')' }),
          new Button({ buttonText: '[', command: '[' }),
          new Button({ buttonText: ']', command: ']' }),
          new Button({ buttonText: '+', command: '+' }),
          new Button({ buttonText: '-', command: '-' }),
          new Button({ buttonText: '\\times', command: '\\cdot' }),
          new Button({ buttonText: '/', command: '\\frac{#@}{#?}' }),
          new Button({ buttonText: '=', command: '=' }),
          new Button({ buttonText: 'x_a', command: '#@_{#?}' }),
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
          new Button({ buttonText: '⌫', command: 'Backspace', method: 'deleteBackward' }),
        ],
        [
          new Button({ buttonText: '\\leftarrow', command: 'Left', method: 'moveToPreviousChar' }),
          new Button({ buttonText: 'z' }),
          new Button({ buttonText: 'x' }),
          new Button({ buttonText: 'c' }),
          new Button({ buttonText: 'v' }),
          new Button({ buttonText: 'b' }),
          new Button({ buttonText: 'n' }),
          new Button({ buttonText: 'm' }),
          new Button({ buttonText: ',' }),
          new Button({ buttonText: '\\rightarrow', command: 'Right', method: 'moveToNextChar' }),
        ],
        [
          new Button({ buttonText: '(' }),
          new Button({ buttonText: ')' }),
          new Button({ buttonText: '[' }),
          new Button({ buttonText: ']' }),
          new Button({ buttonText: '+', command: '+' }),
          new Button({ buttonText: '-', command: '-' }),
          new Button({ buttonText: '\\times', command: '\\cdot' }),
          new Button({ buttonText: '/', command: '\\frac{#@}{#?}' }),
          new Button({ buttonText: '=', command: '=' }),
          new Button({ buttonText: 'x_a', command: '#@_{#?}' }),
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
          new Button({ buttonText: '⌫', command: 'Backspace', method: 'deleteBackward' }),
        ],
        [
          new Button({ buttonText: '\\leftarrow', command: 'Left', method: 'moveToPreviousChar' }),
          new Button({ buttonText: '\\chi' }),
          new Button({ buttonText: '\\psi' }),
          new Button({ buttonText: '\\omega' }),
          new Button({ buttonText: '\\Gamma' }),
          new Button({ buttonText: '\\Delta' }),
          new Button({ buttonText: '\\Theta' }),
          new Button({ buttonText: '\\Lambda' }),
          new Button({ buttonText: '\\Xi' }),
          new Button({ buttonText: '\\rightarrow', command: 'Right', method: 'moveToNextChar' }),
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
          new Button({ buttonText: '=', command: '=' }),
          new Button({ buttonText: 'x_a', command: '#@_{#?}' }),
        ]]
      }
    },
    {
      tabText: "Units",
      content: unitsKeyboards
    }
  ]
};




