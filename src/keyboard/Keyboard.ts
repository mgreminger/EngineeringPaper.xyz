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
          new Button({ buttonText: String.raw`\lbrackm\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackmm\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackcm\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackkm\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackum\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackinch\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackfeet\rbrack`, command: "insert" }),
        ],
        [
          
          new Button({ buttonText: String.raw`\lbrackyard\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackmile\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackangstrom\rbrack`, command: "insert" }),
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
          new Button({ buttonText: String.raw`\lbrackN\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackkN\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackmN\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbracklbf\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackkip\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackdyne\rbrack`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Mass",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\lbrackg\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackkg\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbracktonne\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbracklbm\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackton\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackoz\rbrack`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Time",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\lbracksec\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackmin\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackhours\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackdays\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackweeks\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackyears\rbrack`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Area",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\lbrackm^{2}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackcm^{2}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackmm^{2}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackkm^{2}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackhectare\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackin^{2}\rbrack`, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\lbrackfeet^{2}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackyard^{2}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackmile^{2}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackacre\rbrack`, command: "insert" }),
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
          new Button({ buttonText: String.raw`\lbrackPa\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackkPa\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackMPa\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackpsi\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackatm\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbracktorr\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackbar\rbrack`, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\lbrackmmHg\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackmmH2O\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackcmH2O\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{N}{m^{2}}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{N}{mm^{2}}\rbrack`, command: "insert" }),
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
          new Button({ buttonText: String.raw`\lbrackm^{3}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackcm^{3}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackmm^{3}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackkm^{3}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackliter\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackml\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackin^{3}\rbrack`, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\lbrackfeet^{3}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackyard^{3}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackmile^{3}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackgallon\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackfloz\rbrack`, command: "insert" }),
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
          new Button({ buttonText: String.raw`\lbrackJ\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackmJ\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackkJ\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackMJ\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackWh\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackkWh\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackeV\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackBTU\rbrack`, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\lbrackhp\cdot hr\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackN\cdot m\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackin\cdot lbf\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackfoot\cdot lbf\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackerg\rbrack`, command: "insert" }),
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
          new Button({ buttonText: String.raw`\lbrackW\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackmW\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackkW\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackMW\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackhp\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{BTU}{min}\rbrack`, command: "insert"}),
          new Button({ buttonText: String.raw`\lbrack\frac{BTU}{sec}\rbrack`, command: "insert"}),
        ],
        [
          new Button({ buttonText: String.raw`\lbrack\frac{erg}{sec}\rbrack`, command: "insert"}),
          new Button({ buttonText: String.raw`\lbrack\frac{dyne\cdot cm}{sec}\rbrack`, command: "insert"}),
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
          new Button({ buttonText: String.raw`\lbrackK\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackdegC\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackdegF\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackdegR\rbrack`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Vel",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\lbrack\frac{m}{sec}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{km}{hour}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{mm}{min}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{m}{min}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{feet}{sec}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{miles}{hour}\rbrack`, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\lbrack\frac{inch}{min}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{feet}{min}\rbrack`, command: "insert" }),
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
          new Button({ buttonText: String.raw`\lbrack\frac{m}{sec^{2}}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{cm}{sec^{2}}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{feet}{sec^{2}}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{in}{sec^{2}}\rbrack`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Density",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\lbrack\frac{kg}{m^{3}}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{Mg}{m^{3}}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{g}{cm^{3}}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{lbm}{in^{3}}\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{lbm}{feet^{3}}\rbrack`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Angle",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\lbrackdeg\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackrad\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackgrad\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackcycle\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackarcsec\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackarcmin\rbrack`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Freq",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\lbrackHz\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackkHz\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackMHz\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackGHz\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrack\frac{cycles}{sec}\rbrack`, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Elec",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\lbrackA\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackmA\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackV\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackmV\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackkV\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbrackF\rbrack`, command: "insert" }),
          new Button({ buttonText: String.raw`\lbracknF\rbrack`, command: "insert"}),
          new Button({ buttonText: String.raw`\lbrackpF\rbrack`, command: "insert"}),
          new Button({ buttonText: String.raw`\lbrackC\rbrack`, command: "insert"}),
        ],
        [
          new Button({ buttonText: String.raw`\lbrackohm\rbrack`, command: "insert"}),
          new Button({ buttonText: String.raw`\lbrackkohm\rbrack`, command: "insert"}),
          new Button({ buttonText: String.raw`\lbrackMohm\rbrack`, command: "insert"}),
          new Button({ buttonText: String.raw`\lbrackH\rbrack`, command: "insert"}),
          new Button({ buttonText: String.raw`\lbracknH\rbrack`, command: "insert"}),
          new Button({ buttonText: String.raw`\lbrackpH\rbrack`, command: "insert"}),
          new Button({ buttonText: String.raw`\lbrackWb\rbrack`, command: "insert"}),
          new Button({ buttonText: String.raw`\lbrackT\rbrack`, command: "insert"}),
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




