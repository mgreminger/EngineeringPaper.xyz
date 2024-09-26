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

type Commands = "insert" | "moveToNextChar" | "moveToPreviousChar" | "deleteBackward" |
                "toggleMode" | "typedText" | "customMatrix" | "showMenu";

export class Button {
  static nextId = 0;
  type = "Button";
  id: number;
  buttonText: string;
  content: string | undefined;
  command: Commands;
  size: string;
  fontSize: string;
  rawText: boolean;

  constructor({ buttonText, content, command = "insert",
    size = "1fr", fontSize = "", rawText = false }:
    {
      buttonText: string, content?: string, command?: Commands,
      size?: string, fontSize?: string, rawText?: boolean
    }) {
    if (content === undefined && (command === "insert" || command === "typedText") ) {
      content = buttonText;
    }
    this.id = Button.nextId++;
    this.buttonText = buttonText;
    this.content = content;
    this.command = command;
    this.size = size;
    this.fontSize = fontSize;
    this.rawText = rawText;
  }

  click(activeMathField: MathField): string | undefined {
    if (activeMathField && activeMathField.element) {
      if (get(onMobile) && navigator.vibrate) {
        navigator.vibrate(1);
      }
      
      const mathLiveField = activeMathField.element.getMathField();

      if (this.command === "insert") {
        mathLiveField.executeCommand([this.command, this.content]);
      } else if (this.command === "typedText") {
        mathLiveField.executeCommand(['typedText', this.content, {focus: true, feedback: false, simulateKeystroke: true}]);
      } else if (this.command === "toggleMode") {
        if (mathLiveField.mode === 'text') {
          mathLiveField.executeCommand(['switchMode', 'math', '', '']);
        } else {
          mathLiveField.executeCommand(['switchMode', 'text', '', '']);
        }
      } else if (this.command === "customMatrix") {
        return("customMatrix");
      } else if (this.command === "showMenu") {
        mathLiveField.showMenu();
      } else {
        mathLiveField.executeCommand([this.command]);
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
          new Button({ buttonText: String.raw`\left\lbrack m\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack mm\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack cm\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack km\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack um\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack inch\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack feet\right\rbrack `, command: "insert" }),
        ],
        [
          
          new Button({ buttonText: String.raw`\left\lbrack yard\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack mile\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack angstrom\right\rbrack `, command: "insert" }),
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
          new Button({ buttonText: String.raw`\left\lbrack N\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack kN\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack mN\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack lbf\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack kip\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack dyne\right\rbrack `, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left\lbrack gf\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack kgf\right\rbrack `, command: "insert" }),
          new Blank(),
          new Blank(),
          new Blank(),
          new Blank(),
        ]
        ]
      }
    },
    {
      tabText: "Mass",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left\lbrack g\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack kg\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack tonne\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack lbm\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack ton\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack oz\right\rbrack `, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Time",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left\lbrack sec\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack min\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack hours\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack days\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack weeks\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack years\right\rbrack `, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Area",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left\lbrack m^{2}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack cm^{2}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack mm^{2}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack km^{2}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack hectare\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack in^{2}\right\rbrack `, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left\lbrack feet^{2}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack yard^{2}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack mile^{2}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack acre\right\rbrack `, command: "insert" }),
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
          new Button({ buttonText: String.raw`\left\lbrack Pa\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack kPa\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack MPa\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack psi\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack kpsi\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack atm\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack bar\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack torr\right\rbrack `, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left\lbrack mmHg\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack mmH2O\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack cmH2O\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack inHg\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack inH2O\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack ftH2O\right\rbrack `, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Vol",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left\lbrack m^{3}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack cm^{3}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack mm^{3}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack km^{3}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack liter\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack ml\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack in^{3}\right\rbrack `, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left\lbrack feet^{3}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack yard^{3}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack mile^{3}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack gallon\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack floz\right\rbrack `, command: "insert" }),
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
          new Button({ buttonText: String.raw`\left\lbrack J\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack mJ\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack kJ\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack MJ\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack Wh\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack kWh\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack eV\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack BTU\right\rbrack `, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left\lbrack hp\cdot hr\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack N\cdot m\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack in\cdot lbf\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack foot\cdot lbf\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack erg\right\rbrack `, command: "insert" }),
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
          new Button({ buttonText: String.raw`\left\lbrack W\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack mW\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack kW\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack MW\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack hp\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack \frac{BTU}{min}\right\rbrack `, command: "insert"}),
          new Button({ buttonText: String.raw`\left\lbrack \frac{BTU}{hr}\right\rbrack `, command: "insert"}),
        ],
        [
          new Button({ buttonText: String.raw`\left\lbrack \frac{erg}{sec}\right\rbrack `, command: "insert"}),
          new Button({ buttonText: String.raw`\left\lbrack \frac{dyne\cdot cm}{sec}\right\rbrack `, command: "insert"}),
          new Button({ buttonText: String.raw`\left\lbrack TR\right\rbrack `, command: "insert"}),
          new Button({ buttonText: String.raw`\left\lbrack BHP\right\rbrack `, command: "insert"}),
          new Button({ buttonText: String.raw`\left\lbrack MBH\right\rbrack`, command: "insert"}),
          new Button({ buttonText: String.raw`\left\lbrack MMBH\right\rbrack`, command: "insert"}),
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
          new Button({ buttonText: String.raw`\left\lbrack K\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack degC\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack degF\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack degR\right\rbrack `, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Vel",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left\lbrack \frac{m}{sec}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack \frac{km}{hour}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack \frac{mm}{min}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack \frac{m}{min}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack \frac{feet}{sec}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack \frac{miles}{hour}\right\rbrack `, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left\lbrack \frac{inch}{min}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack \frac{feet}{min}\right\rbrack `, command: "insert" }),
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
          new Button({ buttonText: String.raw`\left\lbrack \frac{m}{sec^{2}}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack \frac{cm}{sec^{2}}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack \frac{feet}{sec^{2}}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack \frac{in}{sec^{2}}\right\rbrack `, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Density",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left\lbrack \frac{kg}{m^{3}}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack \frac{Mg}{m^{3}}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack \frac{g}{cm^{3}}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack \frac{lbm}{in^{3}}\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack \frac{lbm}{feet^{3}}\right\rbrack `, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Angle",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left\lbrack deg\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack rad\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack grad\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack cycle\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack arcsec\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack arcmin\right\rbrack `, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Freq",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left\lbrack Hz\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack kHz\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack MHz\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack GHz\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack \frac{cycles}{sec}\right\rbrack `, command: "insert" }),
        ],
        ]
      }
    },
    {
      tabText: "Elec",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left\lbrack A\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack mA\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack V\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack mV\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack kV\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack F\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack nF\right\rbrack `, command: "insert"}),
          new Button({ buttonText: String.raw`\left\lbrack pF\right\rbrack `, command: "insert"}),
          new Button({ buttonText: String.raw`\left\lbrack C\right\rbrack `, command: "insert"}),
        ],
        [
          new Button({ buttonText: String.raw`\left\lbrack ohm\right\rbrack `, command: "insert"}),
          new Button({ buttonText: String.raw`\left\lbrack kohm\right\rbrack `, command: "insert"}),
          new Button({ buttonText: String.raw`\left\lbrack Mohm\right\rbrack `, command: "insert"}),
          new Button({ buttonText: String.raw`\left\lbrack H\right\rbrack `, command: "insert"}),
          new Button({ buttonText: String.raw`\left\lbrack nH\right\rbrack `, command: "insert"}),
          new Button({ buttonText: String.raw`\left\lbrack pH\right\rbrack `, command: "insert"}),
          new Button({ buttonText: String.raw`\left\lbrack Wb\right\rbrack `, command: "insert"}),
          new Button({ buttonText: String.raw`\left\lbrack T\right\rbrack `, command: "insert"}),
        ],
        ]
      }
    },
    {
      tabText: "Visc",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: String.raw`\left\lbrack P\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack cP\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack Pa\cdot s\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack reyn\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack ureyn\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack St\right\rbrack `, command: "insert" }),
        ],
        [
          new Button({ buttonText: String.raw`\left\lbrack cSt\right\rbrack `, command: "insert" }),
          new Button({ buttonText: String.raw`\left\lbrack\frac{m^2}{s}\right\rbrack `, command: "insert" }),
          new Blank(),
          new Blank(),
          new Blank(),
          new Blank(),
        ]
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
          new Button({ buttonText: '7', content: '7', command: "typedText"}),
          new Button({ buttonText: '8', content: '8', command: "typedText" }),
          new Button({ buttonText: '9', content: '9', command: "typedText" }),
          new Button({ buttonText: '/', content: '\\frac{#@}{#?}' }),
          new Blank('0.25fr'),
          new Button({ buttonText: 'x', content: 'x', command: "typedText" }),
          new Button({ buttonText: 'y', content: 'y', command: "typedText" }),
          new Button({ buttonText: '⌫', command: 'deleteBackward' }),
        ],
        [
          new Button({ buttonText: '(', content: '(', command: "typedText" }),
          new Button({ buttonText: ')', content: ')', command: "typedText" }),
          new Blank('0.25fr'),
          new Button({ buttonText: '4', content: '4', command: "typedText" }),
          new Button({ buttonText: '5', content: '5', command: "typedText" }),
          new Button({ buttonText: '6', content: '6', command: "typedText" }),
          new Button({ buttonText: '\\ast', content: '\\cdot' }),
          new Blank('0.25fr'),
          new Button({ buttonText: '\\pi', content: '\\pi' }),
          new Button({ buttonText: 'e', content: 'e', command: "typedText" }),
          new Button({ buttonText: 'i', content: 'i', command: "typedText" }),
        ],
        [
          new Button({ buttonText: '\\le', content: '\\le' }),
          new Button({ buttonText: '\\ge', content: '\\ge' }),
          new Blank('0.25fr'),
          new Button({ buttonText: '1', content: '1', command: "typedText" }),
          new Button({ buttonText: '2', content: '2', command: "typedText" }),
          new Button({ buttonText: '3', content: '3', command: "typedText" }),
          new Button({ buttonText: '-', content: '-' }),
          new Blank('0.25fr'),
          new Button({ buttonText: '\\sqrt x', content: '\\sqrt{#0}' }),
          new Button({ buttonText: 'x^y', content: '#@^{#?}' }),
          new Button({ buttonText: '\\ln', content: '\\ln\\left(#0\\right)', command: "insert" }),
        ],
        [
          new Button({ buttonText: '<', content: '<', command: "typedText" }),
          new Button({ buttonText: '>', content: '>', command: "typedText" }),
          new Blank('0.25fr'),
          new Button({ buttonText: '0', content: '0', command: "typedText" }),
          new Button({ buttonText: '.', content: '.', command: "typedText" }),
          new Button({ buttonText: '=', content: '=', command: "typedText" }),
          new Button({ buttonText: '+', content: '+', command: "typedText" }),
          new Blank('0.25fr'),
          new Button({ buttonText: '\\cdot 10^{\\mathrm{x}}', content: '#@\\cdot10^{#?}' }),
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
          new Button({ buttonText: '\\mathrm{ceil}', content: '\\mathrm{ceil}\\left(#0\\right)', command: "insert"}),
          new Button({ buttonText: '⌫', command: 'deleteBackward', size: '1.2fr'}),
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
          new Button({ buttonText: '\\mathrm{floor}', content: '\\mathrm{floor}\\left(#0\\right)', command: "insert"}),
          new Button({ buttonText: '\\mathrm{round}', content: '\\mathrm{round}\\left(#0\\right)', command: "insert", size: '1.2fr'}),
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
          new Button({ buttonText: "\\int", content: '\\int \\left(#0\\right)\\mathrm{d}\\left(#?\\right)', command: "insert", fontSize: '10pt' }),
          new Button({ buttonText: '\\int_a^b', content: '\\int _{#?}^{#?}\\left(#0\\right)\\mathrm{d}\\left(#?\\right)', command: "insert", fontSize: '10pt', size: '1.2fr'}),
        ],
        [
          new Button({ buttonText: '\\ln', content: '\\ln\\left(#0\\right)', command: "insert" }),
          new Button({ buttonText: '\\log_{10}', content: '\\log\\left(#0\\right)', command: "insert", size: '1.4fr' }),
          new Button({ buttonText: '\\log_{b}', content: '\\log_{#?}\\left(#0\\right)', command: "insert", size: '1.2fr' }),
          new Button({ buttonText: 'n!', content: '#@!' }),
          new Blank('0.1fr'),
          new Button({ buttonText: '\\mathrm{angle}', content: '\\mathrm{angle}\\left(#0\\right)', command: "insert", size: '1.2fr' }),
          new Blank(),
          new Blank('0.1fr'),
          new Button({ buttonText: "x^{\\prime}", content: '\\frac{\\mathrm{d}}{\\mathrm{d}\\left(#?\\right)}\\left(#0\\right)', command: "insert", fontSize: '12pt' }),
          new Button({ buttonText: "x^{\\prime \\prime}", content: '\\frac{\\mathrm{d}^{2}}{\\mathrm{d}\\left(#?\\right)^{2}}\\left(#0\\right)', command: "insert", fontSize: '12pt', size: '1.2fr'})
        ]]
      }
    },
    {
      tabText: "Matrices",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: '\\mathrm{min}', content: '\\mathrm{min}\\left(#0\\right)', command: "insert", size: "1.2fr"}),
          new Button({ buttonText: '\\mathrm{max}', content: '\\mathrm{max}\\left(#0\\right)', command: "insert", size: "1.6fr"}),
          new Blank('.25fr'),
          new Button({ buttonText: 'M \\times N', command: "customMatrix", fontSize: '11px'}),
          new Button({ buttonText: '1 \\times 2', content: String.raw`\begin{bmatrix} \placeholder{} & \placeholder{}  \end{bmatrix}`, fontSize: '12px'}),
          new Button({ buttonText: '1 \\times 3', content: String.raw`\begin{bmatrix} \placeholder{} & \placeholder{} & \placeholder{}  \end{bmatrix}`, fontSize: '12px'}),
          new Button({ buttonText: '1 \\times 4', content: String.raw`\begin{bmatrix} \placeholder{} & \placeholder{} & \placeholder{} & \placeholder{}  \end{bmatrix}`, fontSize: '12px'}),
          new Blank('0.25fr'),
          new Button({ buttonText: '\\ast', content: '\\cdot' }),
          new Button({ buttonText: 'A_{m,n}', content: '_{#?,#?}' }),
          new Button({ buttonText: '⌫', command: 'deleteBackward' }),
        ],
        [
          new Button({ buttonText: '\\mathrm{range}', content: '\\mathrm{range}\\left(#0\\right)', command: "insert", size: "1.2fr"}),
          new Button({ buttonText: '\\mathrm{count}', content: '\\mathrm{count}\\left(#0\\right)', command: "insert", size: "1.6fr"}),
          new Blank('0.25fr'),
          new Button({ buttonText: '2 \\times 1', content: String.raw`\begin{bmatrix} \placeholder{} \\ \placeholder{}  \end{bmatrix}`, fontSize: '12px'}),
          new Button({ buttonText: '2 \\times 2', content: String.raw`\begin{bmatrix} \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{}  \end{bmatrix}`, fontSize: '12px'}),
          new Button({ buttonText: '2 \\times 3', content: String.raw`\begin{bmatrix} \placeholder{} & \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{} & \placeholder{}  \end{bmatrix}`, fontSize: '12px'}),
          new Button({ buttonText: '2 \\times 4', content: String.raw`\begin{bmatrix} \placeholder{} & \placeholder{} & \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{} & \placeholder{} & \placeholder{}  \end{bmatrix}`, fontSize: '12px'}),
          new Blank('0.25fr'),
          new Button({ buttonText: '\\times', content: '\\times' }),
          new Button({ buttonText: '\\mathrm{dot}', content: '\\mathrm{dot}\\left(#0\\right)', command: "insert"}),
          new Button({ buttonText: 'A^{-1}', content: '^{-1}' }),
        ],
        [
          new Button({ buttonText: '\\mathrm{sum}', content: '\\mathrm{sum}\\left(#0\\right)', command: "insert", size: "1.2fr"}),
          new Button({ buttonText: '\\mathrm{average}', content: '\\mathrm{average}\\left(#0\\right)', command: "insert", size: "1.6fr"}),
          new Blank('0.25fr'),
          new Button({ buttonText: '3 \\times 1', content: String.raw`\begin{bmatrix} \placeholder{} \\ \placeholder{} \\ \placeholder{}  \end{bmatrix}`, fontSize: '12px'}),
          new Button({ buttonText: '3 \\times 2', content: String.raw`\begin{bmatrix} \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{}  \end{bmatrix}`, fontSize: '12px'}),
          new Button({ buttonText: '3 \\times 3', content: String.raw`\begin{bmatrix} \placeholder{} & \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{} & \placeholder{}  \end{bmatrix}`, fontSize: '12px'}),
          new Button({ buttonText: '3 \\times 4', content: String.raw`\begin{bmatrix} \placeholder{} & \placeholder{} & \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{} & \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{} & \placeholder{} & \placeholder{}  \end{bmatrix}`, fontSize: '12px'}),
          new Blank('0.25fr'),
          new Button({ buttonText: '-', content: '-' }),
          new Button({ buttonText: '\\left\\Vert v \\right\\Vert', content: '\\left\\Vert#0\\right\\Vert', command: "insert" }),
          new Button({ buttonText: 'A^{\\mathrm{T}}', content: '^{\\mathrm{T}}'}),
        ],
        [
          new Button({ buttonText: '\\mathrm{stdev}', content: '\\mathrm{stdev}\\left(#0\\right)', command: "insert", size: "1.2fr"}),
          new Button({ buttonText: '\\mathrm{stdevp}', content: '\\mathrm{stdevp}\\left(#0\\right)', command: "insert", size: "1.6fr"}),
          new Blank('0.25fr'),
          new Button({ buttonText: '4 \\times 1', content: String.raw`\begin{bmatrix} \placeholder{} \\ \placeholder{} \\ \placeholder{} \\ \placeholder{}  \end{bmatrix}`, fontSize: '12px'}),
          new Button({ buttonText: '4 \\times 2', content: String.raw`\begin{bmatrix} \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{}  \end{bmatrix}`, fontSize: '12px'}),
          new Button({ buttonText: '4 \\times 3', content: String.raw`\begin{bmatrix} \placeholder{} & \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{} & \placeholder{}  \end{bmatrix}`, fontSize: '12px'}),
          new Button({ buttonText: '4 \\times 4', content: String.raw`\begin{bmatrix} \placeholder{} & \placeholder{} & \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{} & \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{} & \placeholder{} & \placeholder{} \\ \placeholder{} & \placeholder{} & \placeholder{} & \placeholder{}  \end{bmatrix}`, fontSize: '12px'}),
          new Blank('0.25fr'),
          new Button({ buttonText: '+', content: '+', command: "typedText" }),
          new Button({ buttonText: '=', content: '=', command: "typedText" }),
          new Button({ buttonText: '\\mathrm{det}', content: '\\mathrm{det}\\left(#0\\right)', command: "insert"}),
        ]]
      }
    },
    {
      tabText: "ABC",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: 'Q', command: "typedText" }),
          new Button({ buttonText: 'W', command: "typedText" }),
          new Button({ buttonText: 'E', command: "typedText" }),
          new Button({ buttonText: 'R', command: "typedText" }),
          new Button({ buttonText: 'T', command: "typedText" }),
          new Button({ buttonText: 'Y', command: "typedText" }),
          new Button({ buttonText: 'U', command: "typedText" }),
          new Button({ buttonText: 'I', command: "typedText" }),
          new Button({ buttonText: 'O', command: "typedText" }),
          new Button({ buttonText: 'P', command: "typedText" }),
        ],
        [
          new Button({ buttonText: 'A', command: "typedText" }),
          new Button({ buttonText: 'S', command: "typedText" }),
          new Button({ buttonText: 'D', command: "typedText" }),
          new Button({ buttonText: 'F', command: "typedText" }),
          new Button({ buttonText: 'G', command: "typedText" }),
          new Button({ buttonText: 'H', command: "typedText" }),
          new Button({ buttonText: 'J', command: "typedText" }),
          new Button({ buttonText: 'K', command: "typedText" }),
          new Button({ buttonText: 'L', command: "typedText" }),
          new Button({ buttonText: '⌫', command: 'deleteBackward' }),
        ],
        [
          new Button({ buttonText: '\\leftarrow', command: 'moveToPreviousChar' }),
          new Button({ buttonText: 'Z', command: "typedText" }),
          new Button({ buttonText: 'X', command: "typedText" }),
          new Button({ buttonText: 'C', command: "typedText" }),
          new Button({ buttonText: 'V', command: "typedText" }),
          new Button({ buttonText: 'B', command: "typedText" }),
          new Button({ buttonText: 'N', command: "typedText" }),
          new Button({ buttonText: 'M', command: "typedText" }),
          new Button({ buttonText: ',', command: "typedText" }),
          new Button({ buttonText: '\\rightarrow', command: 'moveToNextChar' }),
        ],
        [
          new Button({ buttonText: '(', content: '(', command: "typedText" }),
          new Button({ buttonText: ')', content: ')', command: "typedText" }),
          new Button({ buttonText: '[', content: '[', command: "typedText" }),
          new Button({ buttonText: ']', content: ']', command: "typedText" }),
          new Button({ buttonText: 'Space', content: " ", command: 'typedText', size: '2fr', rawText: true}),
          new Button({ buttonText: 'Comment', command: 'toggleMode', size: '2fr', rawText: true}),
          new Button({ buttonText: '=', content: '=', command: "typedText" }),
          new Button({ buttonText: 'x_a', content: '#@_{#?}' }),
        ]]
      }
    },
    {
      tabText: "abc",
      content: {
        type: "Buttons",
        buttons: [[
          new Button({ buttonText: 'q', command: "typedText" }),
          new Button({ buttonText: 'w', command: "typedText" }),
          new Button({ buttonText: 'e', command: "typedText" }),
          new Button({ buttonText: 'r', command: "typedText" }),
          new Button({ buttonText: 't', command: "typedText" }),
          new Button({ buttonText: 'y', command: "typedText" }),
          new Button({ buttonText: 'u', command: "typedText" }),
          new Button({ buttonText: 'i', command: "typedText" }),
          new Button({ buttonText: 'o', command: "typedText" }),
          new Button({ buttonText: 'p', command: "typedText" }),
        ],
        [
          new Button({ buttonText: 'a', command: "typedText" }),
          new Button({ buttonText: 's', command: "typedText" }),
          new Button({ buttonText: 'd', command: "typedText" }),
          new Button({ buttonText: 'f', command: "typedText" }),
          new Button({ buttonText: 'g', command: "typedText" }),
          new Button({ buttonText: 'h', command: "typedText" }),
          new Button({ buttonText: 'j', command: "typedText" }),
          new Button({ buttonText: 'k', command: "typedText" }),
          new Button({ buttonText: 'l', command: "typedText" }),
          new Button({ buttonText: '⌫', command: 'deleteBackward' }),
        ],
        [
          new Button({ buttonText: '\\leftarrow', command: 'moveToPreviousChar' }),
          new Button({ buttonText: 'z', command: "typedText" }),
          new Button({ buttonText: 'x', command: "typedText" }),
          new Button({ buttonText: 'c', command: "typedText" }),
          new Button({ buttonText: 'v', command: "typedText" }),
          new Button({ buttonText: 'b', command: "typedText" }),
          new Button({ buttonText: 'n', command: "typedText" }),
          new Button({ buttonText: 'm', command: "typedText" }),
          new Button({ buttonText: ',', command: "typedText" }),
          new Button({ buttonText: '\\rightarrow', command: 'moveToNextChar' }),
        ],
        [
          new Button({ buttonText: '(', command: "typedText" }),
          new Button({ buttonText: ')', command: "typedText" }),
          new Button({ buttonText: '[', command: "typedText" }),
          new Button({ buttonText: ']', command: "typedText" }),
          new Button({ buttonText: 'Space', content: " ", command: 'typedText', size: '2fr', rawText: true}),
          new Button({ buttonText: 'Comment', command: 'toggleMode', size: '2fr', rawText: true}),
          new Button({ buttonText: '=', content: '=', command: "typedText" }),
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
          new Button({ buttonText: '\\nu' }),
          new Button({ buttonText: '\\xi' }),
          new Button({ buttonText: '\\pi' }),
          new Button({ buttonText: '\\rho' }),
          new Button({ buttonText: '\\sigma' }),
          new Button({ buttonText: '\\tau' }),
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
          new Button({ buttonText: '(', command: "typedText" }),
          new Button({ buttonText: ')', command: "typedText" }),
          new Button({ buttonText: '\\Pi' }),
          new Button({ buttonText: '\\Sigma' }),
          new Button({ buttonText: '\\Upsilon' }),
          new Button({ buttonText: '\\Phi' }),
          new Button({ buttonText: '\\Psi' }),
          new Button({ buttonText: '\\Omega' }),
          new Button({ buttonText: '=', content: '=', command: "typedText" }),
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
