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

export class Button {
  static nextId = 0;
  type = "Button";
  id: number;
  buttonText: string;
  command: string;
  method: "cmd" | "write" | "keystroke";
  positionLeft: number;
  size: string;
  fontSize: string;

  constructor({ buttonText, command, method = "cmd",
    positionLeft = 0, size = "1fr", fontSize="" }:
    {
      buttonText: string, command?: string, method?: "cmd" | "write" | "keystroke",
      positionLeft?: number, size?: string, fontSize?: string
    }) {
    if (command === undefined) {
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
    if (activeMathField) {
      if (get(onMobile) && navigator.vibrate) {
        navigator.vibrate(1);
      }

      let command = this.command;

      if (command.includes("[selection]")) {
        let selection = activeMathField.element.getMathField().getSelection();
        selection = selection === null ? "" : selection;
        command = command.replace("[selection]", selection);
      }
      
      activeMathField.element.getMathField()[this.method](command);

      activeMathField.element.getMathField().focus();
      if ( this.positionLeft ) {
        for (let i=0; i < this.positionLeft; i++) {
          activeMathField.element.getMathField().keystroke("Left");
        }
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
          new Button({ buttonText: String.raw`\left[m\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[mm\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[cm\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[km\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[um\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[inch\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[feet\right]`, method: "write" }),
        ],
        [
          
          new Button({ buttonText: String.raw`\left[yard\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[mile\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[angstrom\right]`, method: "write" }),
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
          new Button({ buttonText: String.raw`\left[N\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[kN\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[mN\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[lbf\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[kip\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[dyne\right]`, method: "write" }),
        ],
        ]
      }
    },
    {
      tabText: "Mass",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[g\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[kg\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[tonne\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[lbm\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[ton\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[oz\right]`, method: "write" }),
        ],
        ]
      }
    },
    {
      tabText: "Time",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[sec\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[min\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[hours\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[days\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[weeks\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[years\right]`, method: "write" }),
        ],
        ]
      }
    },
    {
      tabText: "Area",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[m^{2}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[cm^{2}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[mm^{2}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[km^{2}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[hectare\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[in^{2}\right]`, method: "write" }),
        ],
        [
          new Button({ buttonText: String.raw`\left[feet^{2}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[yard^{2}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[mile^{2}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[acre\right]`, method: "write" }),
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
          new Button({ buttonText: String.raw`\left[Pa\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[kPa\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[MPa\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[psi\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[atm\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[torr\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[bar\right]`, method: "write" }),
        ],
        [
          new Button({ buttonText: String.raw`\left[mmHg\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[mmH2O\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[cmH2O\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{N}{m^{2}}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{N}{mm^{2}}\right]`, method: "write" }),
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
          new Button({ buttonText: String.raw`\left[m^{3}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[cm^{3}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[mm^{3}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[km^{3}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[liter\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[ml\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[in^{3}\right]`, method: "write" }),
        ],
        [
          new Button({ buttonText: String.raw`\left[feet^{3}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[yard^{3}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[mile^{3}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[gallon\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[floz\right]`, method: "write" }),
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
          new Button({ buttonText: String.raw`\left[J\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[mJ\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[kJ\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[MJ\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[Wh\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[kWh\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[eV\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[BTU\right]`, method: "write" }),
        ],
        [
          new Button({ buttonText: String.raw`\left[hp\cdot hr\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[N\cdot m\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[in\cdot lbf\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[foot\cdot lbf\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[erg\right]`, method: "write" }),
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
          new Button({ buttonText: String.raw`\left[W\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[mW\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[kW\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[MW\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[hp\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{BTU}{min}\right]`, method: "write"}),
          new Button({ buttonText: String.raw`\left[\frac{BTU}{sec}\right]`, method: "write"}),
        ],
        [
          new Button({ buttonText: String.raw`\left[\frac{erg}{sec}\right]`, method: "write"}),
          new Button({ buttonText: String.raw`\left[\frac{dyne\cdot cm}{sec}\right]`, method: "write"}),
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
          new Button({ buttonText: String.raw`\left[K\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[degC\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[degF\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[degR\right]`, method: "write" }),
        ],
        ]
      }
    },
    {
      tabText: "Vel",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[\frac{m}{sec}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{km}{hour}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{mm}{min}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{m}{min}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{feet}{sec}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{miles}{hour}\right]`, method: "write" }),
        ],
        [
          new Button({ buttonText: String.raw`\left[\frac{inch}{min}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{feet}{min}\right]`, method: "write" }),
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
          new Button({ buttonText: String.raw`\left[\frac{m}{sec^{2}}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{cm}{sec^{2}}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{feet}{sec^{2}}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{in}{sec^{2}}\right]`, method: "write" }),
        ],
        ]
      }
    },
    {
      tabText: "Density",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[\frac{kg}{m^{3}}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{Mg}{m^{3}}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{g}{cm^{3}}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{lbm}{in^{3}}\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{lbm}{feet^{3}}\right]`, method: "write" }),
        ],
        ]
      }
    },
    {
      tabText: "Angle",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[deg\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[rad\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[grad\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[cycle\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[arcsec\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[arcmin\right]`, method: "write" }),
        ],
        ]
      }
    },
    {
      tabText: "Freq",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[Hz\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[kHz\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[MHz\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[GHz\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[\frac{cycles}{sec}\right]`, method: "write" }),
        ],
        ]
      }
    },
    {
      tabText: "Elec",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left[A\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[mA\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[V\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[mV\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[kV\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[F\right]`, method: "write" }),
          new Button({ buttonText: String.raw`\left[nF\right]`, method: "write"}),
          new Button({ buttonText: String.raw`\left[pF\right]`, method: "write"}),
          new Button({ buttonText: String.raw`\left[C\right]`, method: "write"}),
        ],
        [
          new Button({ buttonText: String.raw`\left[ohm\right]`, method: "write"}),
          new Button({ buttonText: String.raw`\left[kohm\right]`, method: "write"}),
          new Button({ buttonText: String.raw`\left[Mohm\right]`, method: "write"}),
          new Button({ buttonText: String.raw`\left[H\right]`, method: "write"}),
          new Button({ buttonText: String.raw`\left[nH\right]`, method: "write"}),
          new Button({ buttonText: String.raw`\left[pH\right]`, method: "write"}),
          new Button({ buttonText: String.raw`\left[Wb\right]`, method: "write"}),
          new Button({ buttonText: String.raw`\left[T\right]`, method: "write"}),
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
          new Button({ buttonText: '\\leftarrow', command: 'Left', method: "keystroke" }),
          new Button({ buttonText: '\\rightarrow', command: 'Right', method: "keystroke" }),
          new Blank('.25fr'),
          new Button({ buttonText: '7', command: '7' }),
          new Button({ buttonText: '8', command: '8' }),
          new Button({ buttonText: '9', command: '9' }),
          new Button({ buttonText: '\\slash', command: '/' }),
          new Blank('0.25fr'),
          new Button({ buttonText: 'x', command: 'x' }),
          new Button({ buttonText: 'y', command: 'y' }),
          new Button({ buttonText: '⌫', command: 'Backspace', method: 'keystroke' }),
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
          new Button({ buttonText: 'x^y', command: '^' }),
          new Button({ buttonText: '\\ln', command: '\\ln\\left([selection]\\right)', method: "write", positionLeft: 1 }),
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
          new Button({ buttonText: 'x_a', command: '_' }),
          new Button({ buttonText: '\\approx', command: '\\approx' })
        ]]
      }
    },
    {
      tabText: "f(x)",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: '\\sin', command: '\\sin\\left([selection]\\right)', method: 'write', positionLeft: 1 }),
          new Button({ buttonText: '\\arcsin', command: '\\arcsin\\left([selection]\\right)', method: 'write', positionLeft: 1, size: '1.4fr' }),
          new Button({ buttonText: '\\sinh', command: '\\sinh\\left([selection]\\right)', method: 'write', positionLeft: 1, size: '1.2fr' }),
          new Button({ buttonText: '\\sec', command: '\\sec\\left([selection]\\right)', method: 'write', positionLeft: 1 }),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\mathrm{real}', command: '\\mathrm{real}\\left([selection]\\right)', method: "write", positionLeft: 1, size: '1.2fr' }),
          new Button({ buttonText: '\\left|x\\right|', command: '\\left|[selection]\\right|', method: "write", positionLeft: 1 }),
          new Blank('0.1fr'),
          new Blank('1fr'),
          new Button({ buttonText: '⌫', command: 'Backspace', method: 'keystroke' }),
        ],
        [
          new Button({ buttonText: '\\cos', command: '\\cos\\left([selection]\\right)', method: 'write', positionLeft: 1 }),
          new Button({ buttonText: '\\arccos', command: '\\arccos\\left([selection]\\right)', method: 'write', positionLeft: 1, size: '1.4fr' }),
          new Button({ buttonText: '\\cosh', command: '\\cosh\\left([selection]\\right)', method: 'write', positionLeft: 1, size: '1.2fr' }),
          new Button({ buttonText: '\\csc', command: '\\csc\\left([selection]\\right)', method: 'write', positionLeft: 1 }),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\mathrm{imag}', command: '\\mathrm{imag}\\left([selection]\\right)', method: "write", positionLeft: 1, size: '1.2fr' }),
          new Button({ buttonText: '\\mathrm{max}', command: '\\mathrm{max}\\left([selection]\\right)', method: "write", positionLeft: 1 }),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\leftarrow', command: 'Left', method: "keystroke" }),
          new Button({ buttonText: '\\rightarrow', command: 'Right', method: "keystroke" }),
        ],
        [
          new Button({ buttonText: '\\tan', command: '\\tan\\left([selection]\\right)', method: 'write', positionLeft: 1 }),
          new Button({ buttonText: '\\arctan', command: '\\arctan\\left([selection]\\right)', method: 'write', positionLeft: 1, size: '1.4fr' }),
          new Button({ buttonText: '\\tanh', command: '\\tanh\\left([selection]\\right)', method: 'write', positionLeft: 1, size: '1.2fr' }),
          new Button({ buttonText: '\\cot', command: '\\cot\\left([selection]\\right)', method: 'write', positionLeft: 1 }),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\mathrm{conj}', command: '\\mathrm{conj}\\left([selection]\\right)', method: "write", positionLeft: 1, size: '1.2fr' }),
          new Button({ buttonText: '\\mathrm{min}', command: '\\mathrm{min}\\left([selection]\\right)', method: "write", positionLeft: 1 }),          
          new Blank('0.1fr'),
          new Button({ buttonText: "x'", command: '\\frac{\\mathrm{d}}{\\mathrm{d}\\left(\\right)}\\left([selection]\\right)', method: 'write', positionLeft: 1 }),
          new Button({ buttonText: '\\int_{\\ }^{\\ }', command: '\\int _{ }^{ }\\left([selection]\\right)\\mathrm{d}\\left(\\right)', method: 'write', positionLeft: 6, fontSize: '6pt' }),
        ],
        [
          new Button({ buttonText: '\\ln', command: '\\ln\\left([selection]\\right)', method: "write", positionLeft: 1 }),
          new Button({ buttonText: '\\log_{10}', command: '\\log\\left([selection]\\right)', method: "write", positionLeft: 1, size: '1.4fr' }),
          new Button({ buttonText: '\\log_{b}', command: '\\log_{}\\left([selection]\\right)', method: "write", positionLeft: 1, size: '1.2fr' }),
          new Blank(),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\mathrm{angle}', command: '\\mathrm{angle}\\left([selection]\\right)', method: "write", positionLeft: 1, size: '1.2fr' }),
          new Blank(),
          new Blank('0.1fr'),
          new Button({ buttonText: "x''", command: '\\frac{\\mathrm{d}^{2}}{\\mathrm{d}\\left(\\right)^{2}}\\left([selection]\\right)', method: 'write', positionLeft: 1 }),
          new Button({ buttonText: "x'''", command: '\\frac{\\mathrm{d}^{3}}{\\mathrm{d}\\left(\\right)^{3}}\\left([selection]\\right)', method: 'write', positionLeft: 1 })
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
          new Button({ buttonText: '⌫', command: 'Backspace', method: 'keystroke' }),
        ],
        [
          new Button({ buttonText: '\\leftarrow', command: 'Left', method: "keystroke" }),
          new Button({ buttonText: 'Z' }),
          new Button({ buttonText: 'X' }),
          new Button({ buttonText: 'C' }),
          new Button({ buttonText: 'V' }),
          new Button({ buttonText: 'B' }),
          new Button({ buttonText: 'N' }),
          new Button({ buttonText: 'M' }),
          new Button({ buttonText: ',' }),
          new Button({ buttonText: '\\rightarrow', command: 'Right', method: "keystroke" }),
        ],
        [
          new Button({ buttonText: '(', command: '(' }),
          new Button({ buttonText: ')', command: ')' }),
          new Button({ buttonText: '[', command: '[' }),
          new Button({ buttonText: ']', command: ']' }),
          new Button({ buttonText: '+', command: '+' }),
          new Button({ buttonText: '-', command: '-' }),
          new Button({ buttonText: '\\times', command: '\\cdot' }),
          new Button({ buttonText: '\\slash', command: '/' }),
          new Button({ buttonText: '=', command: '=' }),
          new Button({ buttonText: 'x_a', command: '_' }),
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
          new Button({ buttonText: '⌫', command: 'Backspace', method: 'keystroke' }),
        ],
        [
          new Button({ buttonText: '\\leftarrow', command: 'Left', method: "keystroke" }),
          new Button({ buttonText: 'z' }),
          new Button({ buttonText: 'x' }),
          new Button({ buttonText: 'c' }),
          new Button({ buttonText: 'v' }),
          new Button({ buttonText: 'b' }),
          new Button({ buttonText: 'n' }),
          new Button({ buttonText: 'm' }),
          new Button({ buttonText: ',' }),
          new Button({ buttonText: '\\rightarrow', command: 'Right', method: "keystroke" }),
        ],
        [
          new Button({ buttonText: '(' }),
          new Button({ buttonText: ')' }),
          new Button({ buttonText: '[' }),
          new Button({ buttonText: ']' }),
          new Button({ buttonText: '+', command: '+' }),
          new Button({ buttonText: '-', command: '-' }),
          new Button({ buttonText: '\\times', command: '\\cdot' }),
          new Button({ buttonText: '\\slash', command: '/' }),
          new Button({ buttonText: '=', command: '=' }),
          new Button({ buttonText: 'x_a', command: '_' }),
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
          new Button({ buttonText: '⌫', command: 'Backspace', method: 'keystroke' }),
        ],
        [
          new Button({ buttonText: '\\leftarrow', command: 'Left', method: "keystroke" }),
          new Button({ buttonText: '\\chi' }),
          new Button({ buttonText: '\\psi' }),
          new Button({ buttonText: '\\omega' }),
          new Button({ buttonText: '\\Gamma' }),
          new Button({ buttonText: '\\Delta' }),
          new Button({ buttonText: '\\Theta' }),
          new Button({ buttonText: '\\Lambda' }),
          new Button({ buttonText: '\\Xi' }),
          new Button({ buttonText: '\\rightarrow', command: 'Right', method: "keystroke" }),
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
          new Button({ buttonText: 'x_a', command: '_' }),
        ]]
      }
    },
    {
      tabText: "Units",
      content: unitsKeyboards
    }
  ]
};




