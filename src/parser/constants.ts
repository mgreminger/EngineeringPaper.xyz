export const GREEK_CHARS = new Set(['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta',
  'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu',
  'xi', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi',
  'psi', 'omega', 'Gamma', 'Delta', 'Theta', 'Lambda',
  'Xi', 'Pi', 'Sigma', 'Upsilon', 'Phi', 'Psi', 'Omega']);

export const LATEX_TO_UNICODE = new Map([
  // special accent commands (need to map to something that is not a valid variable)
  ["\\hat", "_hat_"],
  ["\\bar", "_bar_"],
  ["\\vec", "_vec_"],
  ["\\dot", "_dot_"],
  ["\\ddot", "_ddot_"],
  ["\\prime", "_prime_"],
  // the rest are latex commands that map to a specific unicode character
  ["\\ell", "ℓ"],
  ["\\hbar", "ℏ"],
  ["\\alpha", "α"],
  ["\\beta", "β"],
  ["\\gamma", "γ"],
  ["\\delta", "δ"],
  ["\\epsilon", "ϵ"],
  ["\\varepsilon", "ε"],
  ["\\zeta", "ζ"],
  ["\\eta", "η"],
  ["\\theta", "θ"],
  ["\\vartheta", "ϑ"],
  ["\\iota", "ι"],
  ["\\kappa", "κ"],
  ["\\varkappa", "ϰ"],
  ["\\lambda", "λ"],
  ["\\mu", "μ"],
  ["\\nu", "ν"],
  ["\\xi", "ξ"],
  ["\\omicron", "o"],
  ["\\pi", "π"],
  ["\\varpi", "ϖ"],
  ["\\rho", "ρ"],
  ["\\varrho", "ϱ"],
  ["\\sigma", "σ"],
  ["\\varsigma", "ς"],
  ["\\tau", "τ"],
  ["\\phi", "ϕ"],
  ["\\varphi", "φ"],
  ["\\upsilon", "υ"],
  ["\\chi", "χ"],
  ["\\psi", "ψ"],
  ["\\omega", "ω"],
  ["\\Gamma", "Γ"],
  ["\\Delta", "Δ"],
  ["\\Theta", "Θ"],
  ["\\Lambda", "Λ"],
  ["\\Xi", "Ξ"],
  ["\\Pi", "Π"],
  ["\\Sigma", "Σ"],
  ["\\Upsilon", "Υ"],
  ["\\Phi", "Φ"],
  ["\\Psi", "Ψ"],
  ["\\Omega", "Ω"],
  ["\\digamma", "ϝ"],
  ["\\varkappa", "ϰ"],
  ["\\coppa", "ϙ"],
  ["\\koppa", "ϙ"],
  ["\\Coppa", "Ϙ"],
  ["\\Koppa", "Ϙ"],
  ["\\sampi", "ϡ"],
  ["\\Sampi", "Ϡ"],
  ["\\wp", "℘"],
  ["\\aleph", "ℵ"],
  ["\\hslash", "ℏ"],
  ["\\Finv", "Ⅎ"],
  ["\\eth", "ð"],
  ["\\Bbbk", "k"],
  ["\\beth", "ℶ"],
  ["\\daleth", "ℸ"],
  ["\\gimel", "ℷ"],
  ["\\imath", "ı"],
  ["\\jmath", "ȷ"]
]);

export const UNASSIGNABLE = new Set(["I", "E", "pi"]);

export const ZERO_PLACEHOLDER = "implicit_param__zero";

export const BUILTIN_FUNCTION_MAP = new Map([
  ['max', '_Max'],
  ['min', '_Min'],
  ['real', '_re'],
  ['imag', '_im'],
  ['conj', '_conjugate'],
  ['angle', '_arg'],
  ['inv', '_Inverse'],
  ['det', '_Determinant'],
  ['transpose', '_Transpose'],
  ['norm', '_norm'],
  ['dot', '_dot'],
  ['floor', '_floor'],
  ['ceil', '_ceil'],
  ['round', '_round'],
  ['range', '_range'],
  ['count', '_count'],
  ['sum', '_sum'],
  ['average', '_average'],
  ['stdev', '_stdev'],
  ['stdevp', '_stdevp'],
  ['numrows', '_numrows'],
  ['numcols', '_numcols']
]);

export const COMPARISON_MAP = new Map([
  ["<", "_StrictLessThan"],
  ["\\le", "_LessThan"],
  [">", "_StrictGreaterThan"],
  ["\\ge", "_GreaterThan"]
])

export const UNITS_WITH_OFFSET = new Set(['degC', 'degF', 'celsius', 'fahrenheit']);

export const TYPE_PARSING_ERRORS = {
  math: "This field must contain an assignment (e.g., x=y*z) or a query (e.g., x=). To delete an unwanted math cell, click the trash can on the right.",
  plot: "This field must contain a function query with an input parameter range using the format y(-10 ≤ x ≤ 10)=, a query with a pair of scalars or vectors separated by a comma using the format (a,b)=, or a query with a parametric expression using the format (sin(s), cos(s)) for (0 ≤ s ≤ 2*pi)=",
  parameter: "A variable name is required in this field.",
  units: "This field may only contain units in square brackets or may be left blank to indicate no units.",
  expression: "This field may only contain a valid expression or number without an equals sign or it may be blank.",
  expression_no_blank: "This field may only contain a valid expression or number without an equals sign.",
  number: "This field may only contain a number since units are specified for this column.",
  condition: "This field may only contain a condition statement such as x>1. The expression corresponding to the first satisfied condition will be used.",
  piecewise: "Syntax Error",
  equality: "An equation is required in this field.",
  id_list: "A variable name, or a list of variable names separated by commas, is required in this field (x,y for example). If a numerical solve is required, the variables must be given initial guess values with a tilde (x~1, y~2, for example).",
  data_table_expression: "A variable name or an assignment is required in this field."
};

