import {
  selectSvgElement
} from "./chunk-DSHMTRSH.js";
import {
  JSON_SCHEMA,
  load
} from "./chunk-HUZO5QXA.js";
import {
  registerLayoutLoaders
} from "./chunk-NY5TI7ZG.js";
import {
  Fragment,
  computed,
  createApp,
  createBaseVNode,
  createCommentVNode,
  createElementBlock,
  createStaticVNode,
  createVNode,
  defineComponent,
  getCurrentInstance,
  h,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onMounted,
  onUnmounted,
  openBlock,
  ref,
  toDisplayString,
  unref,
  watch
} from "./chunk-NPGVKGNX.js";
import "./chunk-KMARITAY.js";
import "./chunk-AEPHF6QE.js";
import "./chunk-2FWXLMCS.js";
import "./chunk-V76AZFQ4.js";
import "./chunk-D2Z3KRER.js";
import "./chunk-WGPVAJBU.js";
import {
  dedent,
  registerIconPacks
} from "./chunk-JA5X3R2O.js";
import {
  isEmpty_default
} from "./chunk-LAOUMOYT.js";
import {
  cleanAndMerge,
  decodeEntities,
  encodeEntities,
  isDetailedError,
  removeDirectives,
  utils_default
} from "./chunk-ITZIQN4P.js";
import "./chunk-CS2GJMNR.js";
import {
  UnknownDiagramError,
  addDirective,
  assignWithDepth_default,
  configureSvgSize,
  defaultConfig,
  detectType,
  detectors,
  evaluate,
  frontMatterRegex,
  getConfig,
  getDiagram,
  getDiagramLoader,
  getEffectiveHtmlLabels,
  getSiteConfig,
  purify,
  registerDiagram,
  registerLazyLoadedDiagrams,
  reset,
  saveConfigFromInitialize,
  setConfig,
  setSiteConfig,
  styles_default,
  themes_default,
  updateSiteConfig
} from "./chunk-YWZBQDQX.js";
import "./chunk-556QAFCJ.js";
import {
  __name,
  log,
  select_default,
  setLogLevel
} from "./chunk-6HWEMQCT.js";
import {
  __publicField
} from "./chunk-FOQIPI7F.js";

// node_modules/stylis/src/Enum.js
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var NAMESPACE = "@namespace";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";

// node_modules/stylis/src/Utility.js
var abs = Math.abs;
var from = String.fromCharCode;
function trim(value) {
  return value.trim();
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search, position2) {
  return value.indexOf(search, position2);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}

// node_modules/stylis/src/Tokenizer.js
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2, siblings) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "", siblings };
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}

// node_modules/stylis/src/Parser.js
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f", abs(index ? points[index - 1] : 0)) != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
            if ((token(previous || 1) == 5 || token(peek() || 1) == 5) && strlen(characters2) && substr(characters2, -1, void 0) !== " ") characters2 += " ";
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (ampersand == -1) characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && (strlen(characters2) - length2 || variable === 0 && previous === 47))
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1, declarations) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2, declarations), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2, rulesets), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else {
                switch (atrule) {
                  case 99:
                    if (charat(characters2, 3) === 110) break;
                  case 108:
                    if (charat(characters2, 2) === 97) break;
                  default:
                    offset = 0;
                  case 100:
                  case 109:
                  case 115:
                }
                if (offset) parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2, children), children), rules, children, length2, points, rule ? props : children);
                else parse(characters2, reference, reference, reference, [""], children, 0, points, children);
              }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2, siblings) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2, siblings);
}
function comment(value, root, parent, siblings) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
function declaration(value, root, parent, length2, siblings) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2, siblings);
}

// node_modules/stylis/src/Serializer.js
function serialize(children, callback) {
  var output = "";
  for (var i = 0; i < children.length; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length) break;
    case IMPORT:
    case NAMESPACE:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      if (!strlen(element.value = element.props.join(","))) return "";
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}

// node_modules/mermaid/dist/mermaid.core.mjs
var id = "c4";
var detector = __name((txt) => {
  return /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(txt);
}, "detector");
var loader = __name(async () => {
  const { diagram: diagram2 } = await import("./c4Diagram-IC4MRINW-HCZYKAMI.js");
  return { id, diagram: diagram2 };
}, "loader");
var plugin = {
  id,
  detector,
  loader
};
var c4Detector_default = plugin;
var id2 = "flowchart";
var detector2 = __name((txt, config) => {
  var _a2, _b;
  if (((_a2 = config == null ? void 0 : config.flowchart) == null ? void 0 : _a2.defaultRenderer) === "dagre-wrapper" || ((_b = config == null ? void 0 : config.flowchart) == null ? void 0 : _b.defaultRenderer) === "elk") {
    return false;
  }
  return /^\s*graph/.test(txt);
}, "detector");
var loader2 = __name(async () => {
  const { diagram: diagram2 } = await import("./flowDiagram-PKNHOUZH-UHBBZQNR.js");
  return { id: id2, diagram: diagram2 };
}, "loader");
var plugin2 = {
  id: id2,
  detector: detector2,
  loader: loader2
};
var flowDetector_default = plugin2;
var id3 = "flowchart-v2";
var detector3 = __name((txt, config) => {
  var _a2, _b, _c;
  if (((_a2 = config == null ? void 0 : config.flowchart) == null ? void 0 : _a2.defaultRenderer) === "dagre-d3") {
    return false;
  }
  if (((_b = config == null ? void 0 : config.flowchart) == null ? void 0 : _b.defaultRenderer) === "elk") {
    config.layout = "elk";
  }
  if (/^\s*graph/.test(txt) && ((_c = config == null ? void 0 : config.flowchart) == null ? void 0 : _c.defaultRenderer) === "dagre-wrapper") {
    return true;
  }
  return /^\s*flowchart/.test(txt);
}, "detector");
var loader3 = __name(async () => {
  const { diagram: diagram2 } = await import("./flowDiagram-PKNHOUZH-UHBBZQNR.js");
  return { id: id3, diagram: diagram2 };
}, "loader");
var plugin3 = {
  id: id3,
  detector: detector3,
  loader: loader3
};
var flowDetector_v2_default = plugin3;
var id4 = "er";
var detector4 = __name((txt) => {
  return /^\s*erDiagram/.test(txt);
}, "detector");
var loader4 = __name(async () => {
  const { diagram: diagram2 } = await import("./erDiagram-INFDFZHY-F253HZJ2.js");
  return { id: id4, diagram: diagram2 };
}, "loader");
var plugin4 = {
  id: id4,
  detector: detector4,
  loader: loader4
};
var erDetector_default = plugin4;
var id5 = "gitGraph";
var detector5 = __name((txt) => {
  return /^\s*gitGraph/.test(txt);
}, "detector");
var loader5 = __name(async () => {
  const { diagram: diagram2 } = await import("./gitGraphDiagram-K3NZZRJ6-TCVLQKUQ.js");
  return { id: id5, diagram: diagram2 };
}, "loader");
var plugin5 = {
  id: id5,
  detector: detector5,
  loader: loader5
};
var gitGraphDetector_default = plugin5;
var id6 = "gantt";
var detector6 = __name((txt) => {
  return /^\s*gantt/.test(txt);
}, "detector");
var loader6 = __name(async () => {
  const { diagram: diagram2 } = await import("./ganttDiagram-A5KZAMGK-RLBTVQCO.js");
  return { id: id6, diagram: diagram2 };
}, "loader");
var plugin6 = {
  id: id6,
  detector: detector6,
  loader: loader6
};
var ganttDetector_default = plugin6;
var id7 = "info";
var detector7 = __name((txt) => {
  return /^\s*info/.test(txt);
}, "detector");
var loader7 = __name(async () => {
  const { diagram: diagram2 } = await import("./infoDiagram-LFFYTUFH-AMDG4YGD.js");
  return { id: id7, diagram: diagram2 };
}, "loader");
var info = {
  id: id7,
  detector: detector7,
  loader: loader7
};
var id8 = "pie";
var detector8 = __name((txt) => {
  return /^\s*pie/.test(txt);
}, "detector");
var loader8 = __name(async () => {
  const { diagram: diagram2 } = await import("./pieDiagram-SKSYHLDU-PBCKRGSH.js");
  return { id: id8, diagram: diagram2 };
}, "loader");
var pie = {
  id: id8,
  detector: detector8,
  loader: loader8
};
var id9 = "quadrantChart";
var detector9 = __name((txt) => {
  return /^\s*quadrantChart/.test(txt);
}, "detector");
var loader9 = __name(async () => {
  const { diagram: diagram2 } = await import("./quadrantDiagram-337W2JSQ-363UN7ZF.js");
  return { id: id9, diagram: diagram2 };
}, "loader");
var plugin7 = {
  id: id9,
  detector: detector9,
  loader: loader9
};
var quadrantDetector_default = plugin7;
var id10 = "xychart";
var detector10 = __name((txt) => {
  return /^\s*xychart(-beta)?/.test(txt);
}, "detector");
var loader10 = __name(async () => {
  const { diagram: diagram2 } = await import("./xychartDiagram-JWTSCODW-4JD55PKQ.js");
  return { id: id10, diagram: diagram2 };
}, "loader");
var plugin8 = {
  id: id10,
  detector: detector10,
  loader: loader10
};
var xychartDetector_default = plugin8;
var id11 = "requirement";
var detector11 = __name((txt) => {
  return /^\s*requirement(Diagram)?/.test(txt);
}, "detector");
var loader11 = __name(async () => {
  const { diagram: diagram2 } = await import("./requirementDiagram-Z7DCOOCP-CKFPKVPS.js");
  return { id: id11, diagram: diagram2 };
}, "loader");
var plugin9 = {
  id: id11,
  detector: detector11,
  loader: loader11
};
var requirementDetector_default = plugin9;
var id12 = "sequence";
var detector12 = __name((txt) => {
  return /^\s*sequenceDiagram/.test(txt);
}, "detector");
var loader12 = __name(async () => {
  const { diagram: diagram2 } = await import("./sequenceDiagram-2WXFIKYE-ZOMPATXK.js");
  return { id: id12, diagram: diagram2 };
}, "loader");
var plugin10 = {
  id: id12,
  detector: detector12,
  loader: loader12
};
var sequenceDetector_default = plugin10;
var id13 = "class";
var detector13 = __name((txt, config) => {
  var _a2;
  if (((_a2 = config == null ? void 0 : config.class) == null ? void 0 : _a2.defaultRenderer) === "dagre-wrapper") {
    return false;
  }
  return /^\s*classDiagram/.test(txt);
}, "detector");
var loader13 = __name(async () => {
  const { diagram: diagram2 } = await import("./classDiagram-VBA2DB6C-RNKSFNQC.js");
  return { id: id13, diagram: diagram2 };
}, "loader");
var plugin11 = {
  id: id13,
  detector: detector13,
  loader: loader13
};
var classDetector_default = plugin11;
var id14 = "classDiagram";
var detector14 = __name((txt, config) => {
  var _a2;
  if (/^\s*classDiagram/.test(txt) && ((_a2 = config == null ? void 0 : config.class) == null ? void 0 : _a2.defaultRenderer) === "dagre-wrapper") {
    return true;
  }
  return /^\s*classDiagram-v2/.test(txt);
}, "detector");
var loader14 = __name(async () => {
  const { diagram: diagram2 } = await import("./classDiagram-v2-RAHNMMFH-DXRPSL3N.js");
  return { id: id14, diagram: diagram2 };
}, "loader");
var plugin12 = {
  id: id14,
  detector: detector14,
  loader: loader14
};
var classDetector_V2_default = plugin12;
var id15 = "state";
var detector15 = __name((txt, config) => {
  var _a2;
  if (((_a2 = config == null ? void 0 : config.state) == null ? void 0 : _a2.defaultRenderer) === "dagre-wrapper") {
    return false;
  }
  return /^\s*stateDiagram/.test(txt);
}, "detector");
var loader15 = __name(async () => {
  const { diagram: diagram2 } = await import("./stateDiagram-RAJIS63D-3YAM7LQF.js");
  return { id: id15, diagram: diagram2 };
}, "loader");
var plugin13 = {
  id: id15,
  detector: detector15,
  loader: loader15
};
var stateDetector_default = plugin13;
var id16 = "stateDiagram";
var detector16 = __name((txt, config) => {
  var _a2;
  if (/^\s*stateDiagram-v2/.test(txt)) {
    return true;
  }
  if (/^\s*stateDiagram/.test(txt) && ((_a2 = config == null ? void 0 : config.state) == null ? void 0 : _a2.defaultRenderer) === "dagre-wrapper") {
    return true;
  }
  return false;
}, "detector");
var loader16 = __name(async () => {
  const { diagram: diagram2 } = await import("./stateDiagram-v2-FVOUBMTO-UWOJXAWE.js");
  return { id: id16, diagram: diagram2 };
}, "loader");
var plugin14 = {
  id: id16,
  detector: detector16,
  loader: loader16
};
var stateDetector_V2_default = plugin14;
var id17 = "journey";
var detector17 = __name((txt) => {
  return /^\s*journey/.test(txt);
}, "detector");
var loader17 = __name(async () => {
  const { diagram: diagram2 } = await import("./journeyDiagram-4ABVD52K-HCUHOTYC.js");
  return { id: id17, diagram: diagram2 };
}, "loader");
var plugin15 = {
  id: id17,
  detector: detector17,
  loader: loader17
};
var journeyDetector_default = plugin15;
var draw = __name((_text, id30, version) => {
  log.debug("rendering svg for syntax error\n");
  const svg = selectSvgElement(id30);
  const g = svg.append("g");
  svg.attr("viewBox", "0 0 2412 512");
  configureSvgSize(svg, 100, 512, true);
  g.append("path").attr("class", "error-icon").attr(
    "d",
    "m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"
  );
  g.append("path").attr("class", "error-icon").attr(
    "d",
    "m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"
  );
  g.append("path").attr("class", "error-icon").attr(
    "d",
    "m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"
  );
  g.append("path").attr("class", "error-icon").attr(
    "d",
    "m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"
  );
  g.append("path").attr("class", "error-icon").attr(
    "d",
    "m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"
  );
  g.append("path").attr("class", "error-icon").attr(
    "d",
    "m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"
  );
  g.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in text");
  g.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text(`mermaid version ${version}`);
}, "draw");
var renderer = { draw };
var errorRenderer_default = renderer;
var diagram = {
  db: {},
  renderer,
  parser: {
    parse: __name(() => {
      return;
    }, "parse")
  }
};
var errorDiagram_default = diagram;
var id18 = "flowchart-elk";
var detector18 = __name((txt, config = {}) => {
  var _a2;
  if (
    // If diagram explicitly states flowchart-elk
    /^\s*flowchart-elk/.test(txt) || // If a flowchart/graph diagram has their default renderer set to elk
    /^\s*(flowchart|graph)/.test(txt) && ((_a2 = config == null ? void 0 : config.flowchart) == null ? void 0 : _a2.defaultRenderer) === "elk"
  ) {
    config.layout = "elk";
    return true;
  }
  return false;
}, "detector");
var loader18 = __name(async () => {
  const { diagram: diagram2 } = await import("./flowDiagram-PKNHOUZH-UHBBZQNR.js");
  return { id: id18, diagram: diagram2 };
}, "loader");
var plugin16 = {
  id: id18,
  detector: detector18,
  loader: loader18
};
var detector_default = plugin16;
var id19 = "timeline";
var detector19 = __name((txt) => {
  return /^\s*timeline/.test(txt);
}, "detector");
var loader19 = __name(async () => {
  const { diagram: diagram2 } = await import("./timeline-definition-YZTLITO2-BTYL53DY.js");
  return { id: id19, diagram: diagram2 };
}, "loader");
var plugin17 = {
  id: id19,
  detector: detector19,
  loader: loader19
};
var detector_default2 = plugin17;
var id20 = "mindmap";
var detector20 = __name((txt) => {
  return /^\s*mindmap/.test(txt);
}, "detector");
var loader20 = __name(async () => {
  const { diagram: diagram2 } = await import("./mindmap-definition-YRQLILUH-6MXU6O7A.js");
  return { id: id20, diagram: diagram2 };
}, "loader");
var plugin18 = {
  id: id20,
  detector: detector20,
  loader: loader20
};
var detector_default3 = plugin18;
var id21 = "kanban";
var detector21 = __name((txt) => {
  return /^\s*kanban/.test(txt);
}, "detector");
var loader21 = __name(async () => {
  const { diagram: diagram2 } = await import("./kanban-definition-K7BYSVSG-CF2WUIQM.js");
  return { id: id21, diagram: diagram2 };
}, "loader");
var plugin19 = {
  id: id21,
  detector: detector21,
  loader: loader21
};
var detector_default4 = plugin19;
var id22 = "sankey";
var detector22 = __name((txt) => {
  return /^\s*sankey(-beta)?/.test(txt);
}, "detector");
var loader22 = __name(async () => {
  const { diagram: diagram2 } = await import("./sankeyDiagram-WA2Y5GQK-QGJYFREK.js");
  return { id: id22, diagram: diagram2 };
}, "loader");
var plugin20 = {
  id: id22,
  detector: detector22,
  loader: loader22
};
var sankeyDetector_default = plugin20;
var id23 = "packet";
var detector23 = __name((txt) => {
  return /^\s*packet(-beta)?/.test(txt);
}, "detector");
var loader23 = __name(async () => {
  const { diagram: diagram2 } = await import("./diagram-P4PSJMXO-DOUIS76G.js");
  return { id: id23, diagram: diagram2 };
}, "loader");
var packet = {
  id: id23,
  detector: detector23,
  loader: loader23
};
var id24 = "radar";
var detector24 = __name((txt) => {
  return /^\s*radar-beta/.test(txt);
}, "detector");
var loader24 = __name(async () => {
  const { diagram: diagram2 } = await import("./diagram-IFDJBPK2-CWZEONGF.js");
  return { id: id24, diagram: diagram2 };
}, "loader");
var radar = {
  id: id24,
  detector: detector24,
  loader: loader24
};
var id25 = "block";
var detector25 = __name((txt) => {
  return /^\s*block(-beta)?/.test(txt);
}, "detector");
var loader25 = __name(async () => {
  const { diagram: diagram2 } = await import("./blockDiagram-WCTKOSBZ-EMVBFAVA.js");
  return { id: id25, diagram: diagram2 };
}, "loader");
var plugin21 = {
  id: id25,
  detector: detector25,
  loader: loader25
};
var blockDetector_default = plugin21;
var id26 = "architecture";
var detector26 = __name((txt) => {
  return /^\s*architecture/.test(txt);
}, "detector");
var loader26 = __name(async () => {
  const { diagram: diagram2 } = await import("./architectureDiagram-2XIMDMQ5-RDMJC6BM.js");
  return { id: id26, diagram: diagram2 };
}, "loader");
var architecture = {
  id: id26,
  detector: detector26,
  loader: loader26
};
var architectureDetector_default = architecture;
var id27 = "ishikawa";
var detector27 = __name((txt) => {
  return /^\s*ishikawa(-beta)?\b/i.test(txt);
}, "detector");
var loader27 = __name(async () => {
  const { diagram: diagram2 } = await import("./ishikawaDiagram-PHBUUO56-3YYW3TF3.js");
  return { id: id27, diagram: diagram2 };
}, "loader");
var ishikawa = {
  id: id27,
  detector: detector27,
  loader: loader27
};
var id28 = "venn";
var detector28 = __name((txt) => {
  return /^\s*venn-beta/.test(txt);
}, "detector");
var loader28 = __name(async () => {
  const { diagram: diagram2 } = await import("./vennDiagram-LZ73GAT5-HVSGZT72.js");
  return { id: id28, diagram: diagram2 };
}, "loader");
var plugin22 = {
  id: id28,
  detector: detector28,
  loader: loader28
};
var vennDetector_default = plugin22;
var id29 = "treemap";
var detector29 = __name((txt) => {
  return /^\s*treemap/.test(txt);
}, "detector");
var loader29 = __name(async () => {
  const { diagram: diagram2 } = await import("./diagram-E7M64L7V-57UFXO2O.js");
  return { id: id29, diagram: diagram2 };
}, "loader");
var treemap = {
  id: id29,
  detector: detector29,
  loader: loader29
};
var hasLoadedDiagrams = false;
var addDiagrams = __name(() => {
  if (hasLoadedDiagrams) {
    return;
  }
  hasLoadedDiagrams = true;
  registerDiagram("error", errorDiagram_default, (text) => {
    return text.toLowerCase().trim() === "error";
  });
  registerDiagram(
    "---",
    // --- diagram type may appear if YAML front-matter is not parsed correctly
    {
      db: {
        clear: __name(() => {
        }, "clear")
      },
      styles: {},
      // should never be used
      renderer: {
        draw: __name(() => {
        }, "draw")
      },
      parser: {
        parse: __name(() => {
          throw new Error(
            "Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks"
          );
        }, "parse")
      },
      init: __name(() => null, "init")
      // no op
    },
    (text) => {
      return text.toLowerCase().trimStart().startsWith("---");
    }
  );
  if (true) {
    registerLazyLoadedDiagrams(detector_default, detector_default3, architectureDetector_default);
  }
  registerLazyLoadedDiagrams(
    c4Detector_default,
    detector_default4,
    classDetector_V2_default,
    classDetector_default,
    erDetector_default,
    ganttDetector_default,
    info,
    pie,
    requirementDetector_default,
    sequenceDetector_default,
    flowDetector_v2_default,
    flowDetector_default,
    detector_default2,
    gitGraphDetector_default,
    stateDetector_V2_default,
    stateDetector_default,
    journeyDetector_default,
    quadrantDetector_default,
    sankeyDetector_default,
    packet,
    xychartDetector_default,
    blockDetector_default,
    radar,
    ishikawa,
    treemap,
    vennDetector_default
  );
}, "addDiagrams");
var loadRegisteredDiagrams = __name(async () => {
  log.debug(`Loading registered diagrams`);
  const results = await Promise.allSettled(
    Object.entries(detectors).map(async ([key, { detector: detector30, loader: loader30 }]) => {
      if (!loader30) {
        return;
      }
      try {
        getDiagram(key);
      } catch {
        try {
          const { diagram: diagram2, id: id30 } = await loader30();
          registerDiagram(id30, diagram2, detector30);
        } catch (err) {
          log.error(`Failed to load external diagram with key ${key}. Removing from detectors.`);
          delete detectors[key];
          throw err;
        }
      }
    })
  );
  const failed = results.filter((result) => result.status === "rejected");
  if (failed.length > 0) {
    log.error(`Failed to load ${failed.length} external diagrams`);
    for (const res of failed) {
      log.error(res);
    }
    throw new Error(`Failed to load ${failed.length} external diagrams`);
  }
}, "loadRegisteredDiagrams");
var SVG_ROLE = "graphics-document document";
function setA11yDiagramInfo(svg, diagramType) {
  svg.attr("role", SVG_ROLE);
  if (diagramType !== "") {
    svg.attr("aria-roledescription", diagramType);
  }
}
__name(setA11yDiagramInfo, "setA11yDiagramInfo");
function addSVGa11yTitleDescription(svg, a11yTitle, a11yDesc, baseId) {
  if (svg.insert === void 0) {
    return;
  }
  if (a11yDesc) {
    const descId = `chart-desc-${baseId}`;
    svg.attr("aria-describedby", descId);
    svg.insert("desc", ":first-child").attr("id", descId).text(a11yDesc);
  }
  if (a11yTitle) {
    const titleId = `chart-title-${baseId}`;
    svg.attr("aria-labelledby", titleId);
    svg.insert("title", ":first-child").attr("id", titleId).text(a11yTitle);
  }
}
__name(addSVGa11yTitleDescription, "addSVGa11yTitleDescription");
var _a;
var Diagram = (_a = class {
  constructor(type, text, db, parser, renderer2) {
    this.type = type;
    this.text = text;
    this.db = db;
    this.parser = parser;
    this.renderer = renderer2;
  }
  static async fromText(text, metadata = {}) {
    var _a2, _b;
    const config = getConfig();
    const type = detectType(text, config);
    text = encodeEntities(text) + "\n";
    try {
      getDiagram(type);
    } catch {
      const loader30 = getDiagramLoader(type);
      if (!loader30) {
        throw new UnknownDiagramError(`Diagram ${type} not found.`);
      }
      const { id: id30, diagram: diagram2 } = await loader30();
      registerDiagram(id30, diagram2);
    }
    const { db, parser, renderer: renderer2, init: init2 } = getDiagram(type);
    if (parser.parser) {
      parser.parser.yy = db;
    }
    (_a2 = db.clear) == null ? void 0 : _a2.call(db);
    init2 == null ? void 0 : init2(config);
    if (metadata.title) {
      (_b = db.setDiagramTitle) == null ? void 0 : _b.call(db, metadata.title);
    }
    await parser.parse(text);
    return new _a(type, text, db, parser, renderer2);
  }
  async render(id30, version) {
    await this.renderer.draw(this.text, id30, version, this);
  }
  getParser() {
    return this.parser;
  }
  getType() {
    return this.type;
  }
}, __name(_a, "Diagram"), _a);
var interactionFunctions = [];
var attachFunctions = __name(() => {
  interactionFunctions.forEach((f) => {
    f();
  });
  interactionFunctions = [];
}, "attachFunctions");
var cleanupComments = __name((text) => {
  return text.replace(/^\s*%%(?!{)[^\n]+\n?/gm, "").trimStart();
}, "cleanupComments");
function extractFrontMatter(text) {
  const matches = text.match(frontMatterRegex);
  if (!matches) {
    return {
      text,
      metadata: {}
    };
  }
  let parsed = load(matches[1], {
    // To support config, we need JSON schema.
    // https://www.yaml.org/spec/1.2/spec.html#id2803231
    schema: JSON_SCHEMA
  }) ?? {};
  parsed = typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  const metadata = {};
  if (parsed.displayMode) {
    metadata.displayMode = parsed.displayMode.toString();
  }
  if (parsed.title) {
    metadata.title = parsed.title.toString();
  }
  if (parsed.config) {
    metadata.config = parsed.config;
  }
  return {
    text: text.slice(matches[0].length),
    metadata
  };
}
__name(extractFrontMatter, "extractFrontMatter");
var cleanupText = __name((code) => {
  return code.replace(/\r\n?/g, "\n").replace(
    /<(\w+)([^>]*)>/g,
    (match2, tag, attributes) => "<" + tag + attributes.replace(/="([^"]*)"/g, "='$1'") + ">"
  );
}, "cleanupText");
var processFrontmatter = __name((code) => {
  const { text, metadata } = extractFrontMatter(code);
  const { displayMode, title, config = {} } = metadata;
  if (displayMode) {
    if (!config.gantt) {
      config.gantt = {};
    }
    config.gantt.displayMode = displayMode;
  }
  return { title, config, text };
}, "processFrontmatter");
var processDirectives = __name((code) => {
  const initDirective = utils_default.detectInit(code) ?? {};
  const wrapDirectives = utils_default.detectDirective(code, "wrap");
  if (Array.isArray(wrapDirectives)) {
    initDirective.wrap = wrapDirectives.some(({ type }) => type === "wrap");
  } else if ((wrapDirectives == null ? void 0 : wrapDirectives.type) === "wrap") {
    initDirective.wrap = true;
  }
  return {
    text: removeDirectives(code),
    directive: initDirective
  };
}, "processDirectives");
function preprocessDiagram(code) {
  const cleanedCode = cleanupText(code);
  const frontMatterResult = processFrontmatter(cleanedCode);
  const directiveResult = processDirectives(frontMatterResult.text);
  const config = cleanAndMerge(frontMatterResult.config, directiveResult.directive);
  code = cleanupComments(directiveResult.text);
  return {
    code,
    title: frontMatterResult.title,
    config
  };
}
__name(preprocessDiagram, "preprocessDiagram");
function toBase64(str) {
  const utf8Bytes = new TextEncoder().encode(str);
  const utf8Str = Array.from(utf8Bytes, (byte) => String.fromCodePoint(byte)).join("");
  return btoa(utf8Str);
}
__name(toBase64, "toBase64");
var MAX_TEXTLENGTH = 5e4;
var MAX_TEXTLENGTH_EXCEEDED_MSG = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa";
var SECURITY_LVL_SANDBOX = "sandbox";
var SECURITY_LVL_LOOSE = "loose";
var XMLNS_SVG_STD = "http://www.w3.org/2000/svg";
var XMLNS_XLINK_STD = "http://www.w3.org/1999/xlink";
var XMLNS_XHTML_STD = "http://www.w3.org/1999/xhtml";
var IFRAME_WIDTH = "100%";
var IFRAME_HEIGHT = "100%";
var IFRAME_STYLES = "border:0;margin:0;";
var IFRAME_BODY_STYLE = "margin:0";
var IFRAME_SANDBOX_OPTS = "allow-top-navigation-by-user-activation allow-popups";
var IFRAME_NOT_SUPPORTED_MSG = 'The "iframe" tag is not supported by your browser.';
var DOMPURIFY_TAGS = ["foreignobject"];
var DOMPURIFY_ATTR = ["dominant-baseline"];
function processAndSetConfigs(text) {
  const processed = preprocessDiagram(text);
  reset();
  addDirective(processed.config ?? {});
  return processed;
}
__name(processAndSetConfigs, "processAndSetConfigs");
async function parse2(text, parseOptions) {
  addDiagrams();
  try {
    const { code, config } = processAndSetConfigs(text);
    const diagram2 = await getDiagramFromText(code);
    return { diagramType: diagram2.type, config };
  } catch (error) {
    if (parseOptions == null ? void 0 : parseOptions.suppressErrors) {
      return false;
    }
    throw error;
  }
}
__name(parse2, "parse");
var cssImportantStyles = __name((cssClass, element, cssClasses = []) => {
  return `
.${cssClass} ${element} { ${cssClasses.join(" !important; ")} !important; }`;
}, "cssImportantStyles");
var createCssStyles = __name((config, classDefs = /* @__PURE__ */ new Map()) => {
  let cssStyles = "";
  if (config.themeCSS !== void 0) {
    cssStyles += `
${config.themeCSS}`;
  }
  if (config.fontFamily !== void 0) {
    cssStyles += `
:root { --mermaid-font-family: ${config.fontFamily}}`;
  }
  if (config.altFontFamily !== void 0) {
    cssStyles += `
:root { --mermaid-alt-font-family: ${config.altFontFamily}}`;
  }
  if (classDefs instanceof Map) {
    const htmlLabels = getEffectiveHtmlLabels(config);
    const cssHtmlElements = ["> *", "span"];
    const cssShapeElements = ["rect", "polygon", "ellipse", "circle", "path"];
    const cssElements = htmlLabels ? cssHtmlElements : cssShapeElements;
    classDefs.forEach((styleClassDef) => {
      if (!isEmpty_default(styleClassDef.styles)) {
        cssElements.forEach((cssElement) => {
          cssStyles += cssImportantStyles(styleClassDef.id, cssElement, styleClassDef.styles);
        });
      }
      if (!isEmpty_default(styleClassDef.textStyles)) {
        cssStyles += cssImportantStyles(
          styleClassDef.id,
          "tspan",
          ((styleClassDef == null ? void 0 : styleClassDef.textStyles) || []).map((s) => s.replace("color", "fill"))
        );
      }
    });
  }
  return cssStyles;
}, "createCssStyles");
var createUserStyles = __name((config, graphType, classDefs, svgId) => {
  const userCSSstyles = createCssStyles(config, classDefs);
  const allStyles = styles_default(graphType, userCSSstyles, config.themeVariables);
  return serialize(compile(`${svgId}{${allStyles}}`), stringify);
}, "createUserStyles");
var cleanUpSvgCode = __name((svgCode = "", inSandboxMode, useArrowMarkerUrls) => {
  let cleanedUpSvg = svgCode;
  if (!useArrowMarkerUrls && !inSandboxMode) {
    cleanedUpSvg = cleanedUpSvg.replace(
      /marker-end="url\([\d+./:=?A-Za-z-]*?#/g,
      'marker-end="url(#'
    );
  }
  cleanedUpSvg = decodeEntities(cleanedUpSvg);
  cleanedUpSvg = cleanedUpSvg.replace(/<br>/g, "<br/>");
  return cleanedUpSvg;
}, "cleanUpSvgCode");
var putIntoIFrame = __name((svgCode = "", svgElement) => {
  var _a2, _b;
  const height = ((_b = (_a2 = svgElement == null ? void 0 : svgElement.viewBox) == null ? void 0 : _a2.baseVal) == null ? void 0 : _b.height) ? svgElement.viewBox.baseVal.height + "px" : IFRAME_HEIGHT;
  const base64encodedSrc = toBase64(`<body style="${IFRAME_BODY_STYLE}">${svgCode}</body>`);
  return `<iframe style="width:${IFRAME_WIDTH};height:${height};${IFRAME_STYLES}" src="data:text/html;charset=UTF-8;base64,${base64encodedSrc}" sandbox="${IFRAME_SANDBOX_OPTS}">
  ${IFRAME_NOT_SUPPORTED_MSG}
</iframe>`;
}, "putIntoIFrame");
var appendDivSvgG = __name((parentRoot, id30, enclosingDivId, divStyle, svgXlink) => {
  const enclosingDiv = parentRoot.append("div");
  enclosingDiv.attr("id", enclosingDivId);
  if (divStyle) {
    enclosingDiv.attr("style", divStyle);
  }
  const svgNode = enclosingDiv.append("svg").attr("id", id30).attr("width", "100%").attr("xmlns", XMLNS_SVG_STD);
  if (svgXlink) {
    svgNode.attr("xmlns:xlink", svgXlink);
  }
  svgNode.append("g");
  return parentRoot;
}, "appendDivSvgG");
function sandboxedIframe(parentNode, iFrameId) {
  return parentNode.append("iframe").attr("id", iFrameId).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
__name(sandboxedIframe, "sandboxedIframe");
var removeExistingElements = __name((doc, id30, divId, iFrameId) => {
  var _a2, _b, _c;
  (_a2 = doc.getElementById(id30)) == null ? void 0 : _a2.remove();
  (_b = doc.getElementById(divId)) == null ? void 0 : _b.remove();
  (_c = doc.getElementById(iFrameId)) == null ? void 0 : _c.remove();
}, "removeExistingElements");
var render = __name(async function(id30, text, svgContainingElement) {
  var _a2, _b, _c, _d, _e2, _f;
  addDiagrams();
  const processed = processAndSetConfigs(text);
  text = processed.code;
  const config = getConfig();
  log.debug(config);
  if (text.length > ((config == null ? void 0 : config.maxTextSize) ?? MAX_TEXTLENGTH)) {
    text = MAX_TEXTLENGTH_EXCEEDED_MSG;
  }
  const idSelector = "#" + id30;
  const iFrameID = "i" + id30;
  const iFrameID_selector = "#" + iFrameID;
  const enclosingDivID = "d" + id30;
  const enclosingDivID_selector = "#" + enclosingDivID;
  const removeTempElements = __name(() => {
    const tmpElementSelector = isSandboxed ? iFrameID_selector : enclosingDivID_selector;
    const node2 = select_default(tmpElementSelector).node();
    if (node2 && "remove" in node2) {
      node2.remove();
    }
  }, "removeTempElements");
  let root = select_default("body");
  const isSandboxed = config.securityLevel === SECURITY_LVL_SANDBOX;
  const isLooseSecurityLevel = config.securityLevel === SECURITY_LVL_LOOSE;
  const fontFamily = config.fontFamily;
  if (svgContainingElement !== void 0) {
    if (svgContainingElement) {
      svgContainingElement.innerHTML = "";
    }
    if (isSandboxed) {
      const iframe = sandboxedIframe(select_default(svgContainingElement), iFrameID);
      root = select_default(iframe.nodes()[0].contentDocument.body);
      root.node().style.margin = 0;
    } else {
      root = select_default(svgContainingElement);
    }
    appendDivSvgG(root, id30, enclosingDivID, `font-family: ${fontFamily}`, XMLNS_XLINK_STD);
  } else {
    removeExistingElements(document, id30, enclosingDivID, iFrameID);
    if (isSandboxed) {
      const iframe = sandboxedIframe(select_default("body"), iFrameID);
      root = select_default(iframe.nodes()[0].contentDocument.body);
      root.node().style.margin = 0;
    } else {
      root = select_default("body");
    }
    appendDivSvgG(root, id30, enclosingDivID);
  }
  let diag;
  let parseEncounteredException;
  try {
    diag = await Diagram.fromText(text, { title: processed.title });
  } catch (error) {
    if (config.suppressErrorRendering) {
      removeTempElements();
      throw error;
    }
    diag = await Diagram.fromText("error");
    parseEncounteredException = error;
  }
  const element = root.select(enclosingDivID_selector).node();
  const diagramType = diag.type;
  const svg = element.firstChild;
  const firstChild = svg.firstChild;
  const diagramClassDefs = (_b = (_a2 = diag.renderer).getClasses) == null ? void 0 : _b.call(_a2, text, diag);
  const rules = createUserStyles(config, diagramType, diagramClassDefs, idSelector);
  const style1 = document.createElement("style");
  style1.innerHTML = rules;
  svg.insertBefore(style1, firstChild);
  try {
    await diag.renderer.draw(text, id30, "11.13.0", diag);
  } catch (e) {
    if (config.suppressErrorRendering) {
      removeTempElements();
    } else {
      errorRenderer_default.draw(text, id30, "11.13.0");
    }
    throw e;
  }
  const svgNode = root.select(`${enclosingDivID_selector} svg`);
  const a11yTitle = (_d = (_c = diag.db).getAccTitle) == null ? void 0 : _d.call(_c);
  const a11yDescr = (_f = (_e2 = diag.db).getAccDescription) == null ? void 0 : _f.call(_e2);
  addA11yInfo(diagramType, svgNode, a11yTitle, a11yDescr);
  root.select(`[id="${id30}"]`).selectAll("foreignobject > *").attr("xmlns", XMLNS_XHTML_STD);
  let svgCode = root.select(enclosingDivID_selector).node().innerHTML;
  log.debug("config.arrowMarkerAbsolute", config.arrowMarkerAbsolute);
  svgCode = cleanUpSvgCode(svgCode, isSandboxed, evaluate(config.arrowMarkerAbsolute));
  if (isSandboxed) {
    const svgEl = root.select(enclosingDivID_selector + " svg").node();
    svgCode = putIntoIFrame(svgCode, svgEl);
  } else if (!isLooseSecurityLevel) {
    svgCode = purify.sanitize(svgCode, {
      ADD_TAGS: DOMPURIFY_TAGS,
      ADD_ATTR: DOMPURIFY_ATTR,
      HTML_INTEGRATION_POINTS: { foreignobject: true }
    });
  }
  attachFunctions();
  if (parseEncounteredException) {
    throw parseEncounteredException;
  }
  removeTempElements();
  return {
    diagramType,
    svg: svgCode,
    bindFunctions: diag.db.bindFunctions
  };
}, "render");
function initialize(userOptions = {}) {
  var _a2;
  const options = assignWithDepth_default({}, userOptions);
  if ((options == null ? void 0 : options.fontFamily) && !((_a2 = options.themeVariables) == null ? void 0 : _a2.fontFamily)) {
    if (!options.themeVariables) {
      options.themeVariables = {};
    }
    options.themeVariables.fontFamily = options.fontFamily;
  }
  saveConfigFromInitialize(options);
  if ((options == null ? void 0 : options.theme) && options.theme in themes_default) {
    options.themeVariables = themes_default[options.theme].getThemeVariables(
      options.themeVariables
    );
  } else if (options) {
    options.themeVariables = themes_default.default.getThemeVariables(options.themeVariables);
  }
  const config = typeof options === "object" ? setSiteConfig(options) : getSiteConfig();
  setLogLevel(config.logLevel);
  addDiagrams();
}
__name(initialize, "initialize");
var getDiagramFromText = __name((text, metadata = {}) => {
  const { code } = preprocessDiagram(text);
  return Diagram.fromText(code, metadata);
}, "getDiagramFromText");
function addA11yInfo(diagramType, svgNode, a11yTitle, a11yDescr) {
  setA11yDiagramInfo(svgNode, diagramType);
  addSVGa11yTitleDescription(svgNode, a11yTitle, a11yDescr, svgNode.attr("id"));
}
__name(addA11yInfo, "addA11yInfo");
var mermaidAPI = Object.freeze({
  render,
  parse: parse2,
  getDiagramFromText,
  initialize,
  getConfig,
  setConfig,
  getSiteConfig,
  updateSiteConfig,
  reset: __name(() => {
    reset();
  }, "reset"),
  globalReset: __name(() => {
    reset(defaultConfig);
  }, "globalReset"),
  defaultConfig
});
setLogLevel(getConfig().logLevel);
reset(getConfig());
var handleError = __name((error, errors, parseError) => {
  log.warn(error);
  if (isDetailedError(error)) {
    if (parseError) {
      parseError(error.str, error.hash);
    }
    errors.push({ ...error, message: error.str, error });
  } else {
    if (parseError) {
      parseError(error);
    }
    if (error instanceof Error) {
      errors.push({
        str: error.message,
        message: error.message,
        hash: error.name,
        error
      });
    }
  }
}, "handleError");
var run = __name(async function(options = {
  querySelector: ".mermaid"
}) {
  try {
    await runThrowsErrors(options);
  } catch (e) {
    if (isDetailedError(e)) {
      log.error(e.str);
    }
    if (mermaid.parseError) {
      mermaid.parseError(e);
    }
    if (!options.suppressErrors) {
      log.error("Use the suppressErrors option to suppress these errors");
      throw e;
    }
  }
}, "run");
var runThrowsErrors = __name(async function({ postRenderCallback, querySelector, nodes } = {
  querySelector: ".mermaid"
}) {
  const conf = mermaidAPI.getConfig();
  log.debug(`${!postRenderCallback ? "No " : ""}Callback function found`);
  let nodesToProcess;
  if (nodes) {
    nodesToProcess = nodes;
  } else if (querySelector) {
    nodesToProcess = document.querySelectorAll(querySelector);
  } else {
    throw new Error("Nodes and querySelector are both undefined");
  }
  log.debug(`Found ${nodesToProcess.length} diagrams`);
  if ((conf == null ? void 0 : conf.startOnLoad) !== void 0) {
    log.debug("Start On Load: " + (conf == null ? void 0 : conf.startOnLoad));
    mermaidAPI.updateSiteConfig({ startOnLoad: conf == null ? void 0 : conf.startOnLoad });
  }
  const idGenerator = new utils_default.InitIDGenerator(conf.deterministicIds, conf.deterministicIDSeed);
  let txt;
  const errors = [];
  for (const element of Array.from(nodesToProcess)) {
    log.info("Rendering diagram: " + element.id);
    if (element.getAttribute("data-processed")) {
      continue;
    }
    element.setAttribute("data-processed", "true");
    const id30 = `mermaid-${idGenerator.next()}`;
    txt = element.innerHTML;
    txt = dedent(utils_default.entityDecode(txt)).trim().replace(/<br\s*\/?>/gi, "<br/>");
    const init2 = utils_default.detectInit(txt);
    if (init2) {
      log.debug("Detected early reinit: ", init2);
    }
    try {
      const { svg, bindFunctions } = await render2(id30, txt, element);
      element.innerHTML = svg;
      if (postRenderCallback) {
        await postRenderCallback(id30);
      }
      if (bindFunctions) {
        bindFunctions(element);
      }
    } catch (error) {
      handleError(error, errors, mermaid.parseError);
    }
  }
  if (errors.length > 0) {
    throw errors[0];
  }
}, "runThrowsErrors");
var initialize2 = __name(function(config) {
  mermaidAPI.initialize(config);
}, "initialize");
var init = __name(async function(config, nodes, callback) {
  log.warn("mermaid.init is deprecated. Please use run instead.");
  if (config) {
    initialize2(config);
  }
  const runOptions = { postRenderCallback: callback, querySelector: ".mermaid" };
  if (typeof nodes === "string") {
    runOptions.querySelector = nodes;
  } else if (nodes) {
    if (nodes instanceof HTMLElement) {
      runOptions.nodes = [nodes];
    } else {
      runOptions.nodes = nodes;
    }
  }
  await run(runOptions);
}, "init");
var registerExternalDiagrams = __name(async (diagrams, {
  lazyLoad = true
} = {}) => {
  addDiagrams();
  registerLazyLoadedDiagrams(...diagrams);
  if (lazyLoad === false) {
    await loadRegisteredDiagrams();
  }
}, "registerExternalDiagrams");
var contentLoaded = __name(function() {
  if (mermaid.startOnLoad) {
    const { startOnLoad } = mermaidAPI.getConfig();
    if (startOnLoad) {
      mermaid.run().catch((err) => log.error("Mermaid failed to initialize", err));
    }
  }
}, "contentLoaded");
if (typeof document !== "undefined") {
  window.addEventListener("load", contentLoaded, false);
}
var setParseErrorHandler = __name(function(parseErrorHandler) {
  mermaid.parseError = parseErrorHandler;
}, "setParseErrorHandler");
var executionQueue = [];
var executionQueueRunning = false;
var executeQueue = __name(async () => {
  if (executionQueueRunning) {
    return;
  }
  executionQueueRunning = true;
  while (executionQueue.length > 0) {
    const f = executionQueue.shift();
    if (f) {
      try {
        await f();
      } catch (e) {
        log.error("Error executing queue", e);
      }
    }
  }
  executionQueueRunning = false;
}, "executeQueue");
var parse22 = __name(async (text, parseOptions) => {
  return new Promise((resolve, reject) => {
    const performCall = __name(() => new Promise((res, rej) => {
      mermaidAPI.parse(text, parseOptions).then(
        (r) => {
          res(r);
          resolve(r);
        },
        (e) => {
          var _a2;
          log.error("Error parsing", e);
          (_a2 = mermaid.parseError) == null ? void 0 : _a2.call(mermaid, e);
          rej(e);
          reject(e);
        }
      );
    }), "performCall");
    executionQueue.push(performCall);
    executeQueue().catch(reject);
  });
}, "parse");
var render2 = __name((id30, text, container) => {
  return new Promise((resolve, reject) => {
    const performCall = __name(() => new Promise((res, rej) => {
      mermaidAPI.render(id30, text, container).then(
        (r) => {
          res(r);
          resolve(r);
        },
        (e) => {
          var _a2;
          log.error("Error parsing", e);
          (_a2 = mermaid.parseError) == null ? void 0 : _a2.call(mermaid, e);
          rej(e);
          reject(e);
        }
      );
    }), "performCall");
    executionQueue.push(performCall);
    executeQueue().catch(reject);
  });
}, "render");
var getRegisteredDiagramsMetadata = __name(() => {
  return Object.keys(detectors).map((id30) => ({
    id: id30
  }));
}, "getRegisteredDiagramsMetadata");
var mermaid = {
  startOnLoad: true,
  mermaidAPI,
  parse: parse22,
  render: render2,
  init,
  run,
  registerExternalDiagrams,
  registerLayoutLoaders,
  initialize: initialize2,
  parseError: void 0,
  contentLoaded,
  setParseErrorHandler,
  detectType,
  registerIconPacks,
  getRegisteredDiagramsMetadata
};
var mermaid_default = mermaid;

// node_modules/vitepress-mermaid-renderer/dist/vitepress-mermaid-renderer.js
var qe = {
  key: 1,
  class: "zoom-level"
};
var je = {
  key: 0,
  class: "copied-notification"
};
var He = { class: "mobile-utility-controls" };
var Ze = {
  key: 1,
  class: "zoom-level mobile-zoom-level"
};
var Ge = {
  key: 0,
  class: "copied-notification"
};
var Qe = defineComponent({
  __name: "MermaidControls",
  props: {
    scale: {},
    code: {},
    isFullscreen: { type: Boolean },
    toolbar: {}
  },
  emits: ["zoomIn", "zoomOut", "resetView", "toggleFullscreen", "panUp", "panDown", "panLeft", "panRight", "download"],
  setup(t, { expose: e, emit: o }) {
    const n = t, i = () => n.isFullscreen ? n.toolbar.fullscreen : n.toolbar.desktop, w = () => n.isFullscreen ? n.toolbar.fullscreen : n.toolbar.mobile, m = (l) => i().buttons[l] === "enabled", y = (l) => w().buttons[l] === "enabled", L = o, C = ref(null), M = ref(null), F = ref(false), v = (l) => [
      `toolbar-vertical-${l.vertical}`,
      `toolbar-horizontal-${l.horizontal}`
    ], h2 = computed(() => {
      const l = i().positions;
      return v(l);
    }), z = computed(() => {
      const l = w().positions;
      return v(l);
    }), B = (l) => Object.values(l).some((a) => a === "enabled"), k = computed(() => i().zoomLevel === "enabled"), D = computed(() => w().zoomLevel === "enabled"), c = computed(() => {
      const l = i();
      return B(l.buttons) || k.value;
    }), I = computed(() => {
      const l = w();
      return B(l.buttons) || D.value;
    }), S = async () => {
      try {
        if (!navigator.clipboard)
          throw new Error("Clipboard API not available in this browser.");
        await navigator.clipboard.writeText(n.code), F.value = true, setTimeout(() => {
          F.value = false;
        }, 1e3);
      } catch (l) {
        console.error("Failed to copy diagram code:", l), alert(
          "Failed to copy to clipboard. Your browser might not support this feature."
        );
      }
    }, R = () => {
      L("download", n.toolbar.downloadFormat);
    }, j = () => {
      try {
        n.isFullscreen ? (C.value && C.value.classList.add("force-show"), M.value && M.value.classList.add("force-show")) : (C.value && C.value.classList.remove("force-show"), M.value && M.value.classList.remove("force-show"));
      } catch (l) {
        console.error("Error updating fullscreen controls:", l);
      }
    };
    return onMounted(() => {
      C.value && (C.value.style.opacity = "1", C.value.style.visibility = "visible"), M.value && (M.value.style.opacity = "1", M.value.style.visibility = "visible");
    }), e({
      updateFullscreenControls: j
    }), (l, a) => (openBlock(), createElementBlock("div", null, [
      c.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["desktop-controls controls visible-controls", h2.value]),
        ref_key: "controls",
        ref: C
      }, [
        m("zoomIn") ? (openBlock(), createElementBlock("button", {
          key: 0,
          onClick: a[0] || (a[0] = (O) => l.$emit("zoomIn")),
          title: "Zoom In"
        }, [...a[8] || (a[8] = [
          createStaticVNode('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>', 1)
        ])])) : createCommentVNode("", true),
        k.value ? (openBlock(), createElementBlock("span", qe, toDisplayString(Math.round(t.scale * 100)) + "% ", 1)) : createCommentVNode("", true),
        m("zoomOut") ? (openBlock(), createElementBlock("button", {
          key: 2,
          onClick: a[1] || (a[1] = (O) => l.$emit("zoomOut")),
          title: "Zoom Out"
        }, [...a[9] || (a[9] = [
          createBaseVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor"
          }, [
            createBaseVNode("circle", {
              cx: "11",
              cy: "11",
              r: "8"
            }),
            createBaseVNode("line", {
              x1: "21",
              y1: "21",
              x2: "16.65",
              y2: "16.65"
            }),
            createBaseVNode("line", {
              x1: "8",
              y1: "11",
              x2: "14",
              y2: "11"
            })
          ], -1)
        ])])) : createCommentVNode("", true),
        m("resetView") ? (openBlock(), createElementBlock("button", {
          key: 3,
          onClick: a[2] || (a[2] = (O) => l.$emit("resetView")),
          title: "Reset View"
        }, [...a[10] || (a[10] = [
          createBaseVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor"
          }, [
            createBaseVNode("path", { d: "M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.9 3.2L21 8" }),
            createBaseVNode("path", { d: "M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.9-3.2L3 16" })
          ], -1)
        ])])) : createCommentVNode("", true),
        m("copyCode") ? (openBlock(), createElementBlock("button", {
          key: 4,
          onClick: S,
          title: "Copy Code"
        }, [
          a[11] || (a[11] = createBaseVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor"
          }, [
            createBaseVNode("rect", {
              x: "9",
              y: "9",
              width: "13",
              height: "13",
              rx: "2",
              ry: "2"
            }),
            createBaseVNode("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
          ], -1)),
          F.value ? (openBlock(), createElementBlock("span", je, "Copied")) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        m("download") ? (openBlock(), createElementBlock("button", {
          key: 5,
          onClick: R,
          title: "Download Diagram"
        }, [...a[12] || (a[12] = [
          createBaseVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor"
          }, [
            createBaseVNode("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
            createBaseVNode("polyline", { points: "7 10 12 15 17 10" }),
            createBaseVNode("line", {
              x1: "12",
              y1: "15",
              x2: "12",
              y2: "3"
            })
          ], -1)
        ])])) : createCommentVNode("", true),
        m("toggleFullscreen") ? (openBlock(), createElementBlock("button", {
          key: 6,
          onClick: a[3] || (a[3] = (O) => l.$emit("toggleFullscreen")),
          title: "Toggle Fullscreen"
        }, [...a[13] || (a[13] = [
          createBaseVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor"
          }, [
            createBaseVNode("path", { d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" })
          ], -1)
        ])])) : createCommentVNode("", true)
      ], 2)) : createCommentVNode("", true),
      I.value ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(["mobile-controls controls visible-controls", z.value]),
        ref_key: "mobileControls",
        ref: M
      }, [
        createBaseVNode("div", He, [
          y("zoomIn") ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: a[4] || (a[4] = (O) => l.$emit("zoomIn")),
            title: "Zoom In"
          }, [...a[14] || (a[14] = [
            createStaticVNode('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>', 1)
          ])])) : createCommentVNode("", true),
          D.value ? (openBlock(), createElementBlock("span", Ze, toDisplayString(Math.round(t.scale * 100)) + "% ", 1)) : createCommentVNode("", true),
          y("zoomOut") ? (openBlock(), createElementBlock("button", {
            key: 2,
            onClick: a[5] || (a[5] = (O) => l.$emit("zoomOut")),
            title: "Zoom Out"
          }, [...a[15] || (a[15] = [
            createBaseVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor"
            }, [
              createBaseVNode("circle", {
                cx: "11",
                cy: "11",
                r: "8"
              }),
              createBaseVNode("line", {
                x1: "21",
                y1: "21",
                x2: "16.65",
                y2: "16.65"
              }),
              createBaseVNode("line", {
                x1: "8",
                y1: "11",
                x2: "14",
                y2: "11"
              })
            ], -1)
          ])])) : createCommentVNode("", true),
          y("resetView") ? (openBlock(), createElementBlock("button", {
            key: 3,
            onClick: a[6] || (a[6] = (O) => l.$emit("resetView")),
            title: "Reset View"
          }, [...a[16] || (a[16] = [
            createBaseVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor"
            }, [
              createBaseVNode("path", { d: "M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.9 3.2L21 8" }),
              createBaseVNode("path", { d: "M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.9-3.2L3 16" })
            ], -1)
          ])])) : createCommentVNode("", true),
          y("copyCode") ? (openBlock(), createElementBlock("button", {
            key: 4,
            onClick: S,
            title: "Copy Code"
          }, [
            a[17] || (a[17] = createBaseVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor"
            }, [
              createBaseVNode("rect", {
                x: "9",
                y: "9",
                width: "13",
                height: "13",
                rx: "2",
                ry: "2"
              }),
              createBaseVNode("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
            ], -1)),
            F.value ? (openBlock(), createElementBlock("span", Ge, "Copied")) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          y("download") ? (openBlock(), createElementBlock("button", {
            key: 5,
            onClick: R,
            title: "Download Diagram"
          }, [...a[18] || (a[18] = [
            createBaseVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor"
            }, [
              createBaseVNode("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              createBaseVNode("polyline", { points: "7 10 12 15 17 10" }),
              createBaseVNode("line", {
                x1: "12",
                y1: "15",
                x2: "12",
                y2: "3"
              })
            ], -1)
          ])])) : createCommentVNode("", true),
          y("toggleFullscreen") ? (openBlock(), createElementBlock("button", {
            key: 6,
            onClick: a[7] || (a[7] = (O) => l.$emit("toggleFullscreen")),
            title: "Toggle Fullscreen"
          }, [...a[19] || (a[19] = [
            createBaseVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor"
            }, [
              createBaseVNode("path", { d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" })
            ], -1)
          ])])) : createCommentVNode("", true)
        ])
      ], 2)) : createCommentVNode("", true)
    ]));
  }
});
var Ke = {
  key: 0,
  class: "diagram-error"
};
var Je = { class: "error-message" };
var _e = {
  key: 0,
  class: "error-details"
};
var et = defineComponent({
  __name: "MermaidError",
  props: {
    renderError: { type: Boolean },
    renderErrorDetails: {}
  },
  setup(t) {
    const e = ref(false), o = () => {
      e.value = !e.value;
    };
    return (n, i) => t.renderError ? (openBlock(), createElementBlock("div", Ke, [
      createBaseVNode("div", Je, [
        i[0] || (i[0] = createBaseVNode("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor"
        }, [
          createBaseVNode("circle", {
            cx: "12",
            cy: "12",
            r: "10"
          }),
          createBaseVNode("line", {
            x1: "12",
            y1: "8",
            x2: "12",
            y2: "12"
          }),
          createBaseVNode("line", {
            x1: "12",
            y1: "16",
            x2: "12.01",
            y2: "16"
          })
        ], -1)),
        i[1] || (i[1] = createBaseVNode("span", null, "Failed to render diagram", -1)),
        createBaseVNode("button", {
          onClick: o,
          class: "error-toggle-button"
        }, toDisplayString(e.value ? "Hide Details" : "Show Details"), 1)
      ]),
      e.value ? (openBlock(), createElementBlock("pre", _e, toDisplayString(t.renderErrorDetails), 1)) : createCommentVNode("", true)
    ])) : createCommentVNode("", true);
  }
});
var tt = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [n, i] of e)
    o[n] = i;
  return o;
};
var ot = tt(et, [["__scopeId", "data-v-9995635f"]]);
function nt() {
  const t = ref(1), e = ref(0), o = ref(0), n = ref(false), i = ref(false), w = ref(0), m = ref(0), y = ref(0), L = ref(false), C = ref(0), M = ref(0), F = () => typeof window > "u" ? false : window.matchMedia("(max-width: 768px)").matches && !i.value, v = 50;
  return {
    // State
    scale: t,
    translateX: e,
    translateY: o,
    isPanning: n,
    isFullscreen: i,
    // Actions
    zoomIn: () => {
      t.value = t.value * 1.2;
    },
    zoomOut: () => {
      t.value > 0.2 && (t.value = t.value / 1.2);
    },
    resetView: () => {
      t.value = 1, e.value = 0, o.value = 0;
    },
    toggleFullscreen: (r, u = "browser") => {
      try {
        if (u === "dialog") {
          i.value = !i.value;
          return;
        }
        if (document.fullscreenElement)
          document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen(), i.value = false;
        else {
          if (r == null ? void 0 : r.requestFullscreen)
            r.requestFullscreen();
          else if (r == null ? void 0 : r.webkitRequestFullscreen)
            r.webkitRequestFullscreen();
          else if (r == null ? void 0 : r.mozRequestFullScreen)
            r.mozRequestFullScreen();
          else if (r == null ? void 0 : r.msRequestFullscreen)
            r.msRequestFullscreen();
          else
            throw new Error("Fullscreen API not available");
          i.value = true;
        }
      } catch (g) {
        console.error("Fullscreen error:", g), alert("Fullscreen mode is not supported in this browser.");
      }
    },
    startPan: (r) => {
      n.value = true, w.value = r.clientX, m.value = r.clientY;
    },
    pan: (r) => {
      if (!n.value) return;
      const u = r.clientX - w.value, g = r.clientY - m.value;
      e.value += u / t.value, o.value += g / t.value, w.value = r.clientX, m.value = r.clientY;
    },
    endPan: () => {
      n.value = false;
    },
    handleWheel: (r) => {
      if (!(r.ctrlKey || i.value))
        return;
      r.preventDefault();
      const g = -Math.sign(r.deltaY) * 0.1, T = t.value * (1 + g);
      T >= 0.2 && T <= 10 && (t.value = T);
    },
    handleTouchStart: (r) => {
      if (F()) {
        if (r.touches.length === 2) {
          r.preventDefault(), L.value = false;
          const u = r.touches[0], g = r.touches[1];
          y.value = Math.hypot(
            g.clientX - u.clientX,
            g.clientY - u.clientY
          ), C.value = (u.clientX + g.clientX) / 2, M.value = (u.clientY + g.clientY) / 2;
        }
        return;
      }
      if (r.touches.length === 1)
        L.value = true, C.value = r.touches[0].clientX, M.value = r.touches[0].clientY;
      else if (r.touches.length === 2) {
        L.value = false;
        const u = r.touches[0], g = r.touches[1];
        y.value = Math.hypot(
          g.clientX - u.clientX,
          g.clientY - u.clientY
        );
      }
    },
    handleTouchMove: (r) => {
      if (F()) {
        if (r.touches.length === 1)
          return;
        if (r.touches.length === 2) {
          r.preventDefault();
          const u = r.touches[0], g = r.touches[1], T = Math.hypot(
            g.clientX - u.clientX,
            g.clientY - u.clientY
          );
          if (y.value > 0) {
            const H = T / y.value, Z = t.value * (1 + (H - 1) * 0.2);
            Z >= 0.2 && Z <= 10 && (t.value = Z), y.value = T;
          }
          const U = (u.clientX + g.clientX) / 2, P = (u.clientY + g.clientY) / 2;
          e.value += (U - C.value) / t.value, o.value += (P - M.value) / t.value, C.value = U, M.value = P;
        }
        return;
      }
      if (r.preventDefault(), L.value && r.touches.length === 1) {
        const u = r.touches[0], g = u.clientX - C.value, T = u.clientY - M.value;
        e.value += g / t.value, o.value += T / t.value, C.value = u.clientX, M.value = u.clientY;
      } else if (r.touches.length === 2) {
        const u = r.touches[0], g = r.touches[1], T = Math.hypot(
          g.clientX - u.clientX,
          g.clientY - u.clientY
        );
        if (y.value > 0) {
          const U = T / y.value, P = t.value * (1 + (U - 1) * 0.2);
          P >= 0.2 && P <= 10 && (t.value = P), y.value = T;
        }
      }
    },
    handleTouchEnd: () => {
      L.value = false, y.value = 0;
    },
    panUp: () => {
      o.value -= v / t.value;
    },
    panDown: () => {
      o.value += v / t.value;
    },
    panLeft: () => {
      e.value -= v / t.value;
    },
    panRight: () => {
      e.value += v / t.value;
    },
    updateFullscreenControls: (r) => {
      try {
        document.fullscreenElement ? (i.value = true, r.controls && r.controls.classList.add("force-show"), r.mobileControls && r.mobileControls.classList.add("force-show")) : (i.value = false, r.controls && r.controls.classList.remove("force-show"), r.mobileControls && r.mobileControls.classList.remove("force-show"));
      } catch (u) {
        console.error("Error updating fullscreen controls:", u);
      }
    }
  };
}
var xe = Promise.resolve();
var rt = (t) => {
  const e = xe.catch(() => {
  }).then(() => t());
  return xe = e.catch(() => {
  }), e;
};
function it(t = {}) {
  const e = ref(false), o = ref(false), n = ref(false), i = ref(""), w = ref({ width: 0, height: 0 }), m = ref(null), y = {
    theme: "default",
    securityLevel: "loose",
    startOnLoad: false,
    flowchart: {
      useMaxWidth: false,
      htmlLabels: true
    },
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 10,
      actorMargin: 50,
      width: 150,
      height: 65,
      boxMargin: 10,
      boxTextMargin: 5,
      noteMargin: 10,
      messageMargin: 35,
      mirrorActors: true,
      bottomMarginAdj: 1,
      useMaxWidth: false,
      rightAngles: false,
      showSequenceNumbers: false
    },
    gantt: {
      useMaxWidth: false,
      topPadding: 50,
      leftPadding: 50,
      rightPadding: 50,
      gridLineStartPadding: 35,
      barHeight: 50,
      barGap: 40,
      displayMode: "compact",
      axisFormat: "%Y-%m-%d",
      topAxis: false,
      tickInterval: "day",
      useWidth: 2048
    },
    class: {
      arrowMarkerAbsolute: false,
      useMaxWidth: false
    },
    journey: {
      useMaxWidth: false
    },
    pie: {},
    c4: {
      useMaxWidth: false,
      diagramMarginX: 20,
      diagramMarginY: 20
    },
    gitGraph: {
      useMaxWidth: false,
      rotateCommitLabel: false,
      showBranches: true,
      showCommitLabel: true,
      mainBranchName: "main"
    }
  }, L = (v) => {
    const h2 = {
      ...y,
      ...t.config,
      ...v
    };
    mermaid_default.initialize({
      ...h2
    });
  }, C = (v) => {
    L(v.detail);
    const z = m.value;
    z && (o.value = false, nextTick(() => {
      F(z.id, z.code);
    }));
  }, M = (v) => {
    const h2 = v.trim().toLowerCase();
    return h2.startsWith("c4context") || h2.startsWith("c4container") || h2.startsWith("c4component") || h2.startsWith("c4dynamic") || h2.startsWith("c4deployment") ? "c4" : h2.startsWith("gitgraph") || h2.includes("gitgraph:") ? "gitgraph" : h2.startsWith("flowchart") || h2.startsWith("graph") ? "flowchart" : h2.startsWith("sequencediagram") || h2.startsWith("sequenceDiagram") ? "sequence" : h2.startsWith("gantt") ? "gantt" : "unknown";
  }, F = async (v, h2, z = 0, B = 3) => {
    var _a2;
    try {
      let k = document.getElementById(v);
      if (!k) {
        if (console.warn(
          `[Mermaid] Diagram container element not found, attempt ${z + 1}/${B + 1}`
        ), z < B) {
          const D = 100 * Math.pow(2, z);
          return await new Promise((c) => setTimeout(c, D)), F(v, h2, z + 1, B);
        }
        throw new Error("Failed to find diagram container element");
      }
      m.value = { id: v, code: h2 }, k.textContent = h2, k.removeAttribute("data-processed"), n.value = false, i.value = "", o.value = false, k.classList.add("mermaid-rendering"), await rt(async () => {
        var _a3, _b, _c;
        const D = typeof window < "u";
        try {
          if (await mermaid_default.run({
            nodes: [k],
            suppressErrors: false
          }), await new Promise(
            (c) => setTimeout(c, D ? 150 : 50)
          ), k.firstElementChild) {
            const c = k.querySelector("svg");
            if (c) {
              if (await new Promise(
                (S) => setTimeout(S, D ? 150 : 50)
              ), (_a3 = k.parentElement) == null ? void 0 : _a3.querySelector(".diagram-wrapper")) {
                const S = M(h2);
                if (k.classList.add(`mermaid-${S}`), S === "c4" || S === "gitgraph") {
                  if (c.style.width = "100%", c.style.height = "auto", c.style.maxWidth = "100%", c.style.display = "block", c.removeAttribute("width"), c.removeAttribute("height"), !c.getAttribute("viewBox"))
                    try {
                      const R = c.getBBox();
                      R.width && R.height && (c.setAttribute(
                        "viewBox",
                        `0 0 ${R.width} ${R.height}`
                      ), c.setAttribute(
                        "preserveAspectRatio",
                        "xMidYMid meet"
                      ));
                    } catch (R) {
                      console.warn("Could not set viewBox for diagram:", R);
                    }
                  c.style.display = "none", c.offsetHeight, c.style.display = "block";
                }
              }
              w.value = {
                width: c.getBoundingClientRect().width,
                height: c.getBoundingClientRect().height
              };
            }
          }
          o.value = true, n.value = false, (_b = t.onRenderComplete) == null ? void 0 : _b.call(t, { id: v, success: true });
        } catch (c) {
          console.error("Failed to render mermaid diagram:", c), n.value = true, i.value = c instanceof Error ? c.toString() : "Unknown error rendering diagram", o.value = true, (_c = t.onRenderComplete) == null ? void 0 : _c.call(t, { id: v, success: false, error: c }), D && z === 0 && setTimeout(() => {
            F(v, h2, z + 1, B);
          }, 1e3);
        } finally {
          k.classList.remove("mermaid-rendering");
        }
      });
    } catch (k) {
      console.error("Error in diagram initialization:", k), n.value = true, i.value = k instanceof Error ? k.toString() : "Unknown error initializing component", (_a2 = t.onRenderComplete) == null ? void 0 : _a2.call(t, { id: v, success: false, error: k });
    }
  };
  return onMounted(() => {
    e.value = true, L(), document.addEventListener(
      "vitepress-mermaid:config-updated",
      C
    );
  }), onUnmounted(() => {
    document.removeEventListener(
      "vitepress-mermaid:config-updated",
      C
    );
  }), {
    // State
    mounted: e,
    isRendered: o,
    renderError: n,
    renderErrorDetails: i,
    originalDiagramSize: w,
    // Actions
    renderMermaidDiagram: F,
    detectDiagramType: M
  };
}
var at = (t) => {
  const e = t;
  return !!(e && e.desktop && typeof e.desktop == "object" && "buttons" in e.desktop && "positions" in e.desktop && "zoomLevel" in e.desktop && typeof e.showLanguageLabel == "boolean" && typeof e.downloadFormat == "string" && typeof e.fullscreenMode == "string");
};
var X = {
  desktop: {
    buttons: {
      zoomIn: "enabled",
      zoomOut: "enabled",
      resetView: "enabled",
      copyCode: "enabled",
      toggleFullscreen: "enabled",
      download: "disabled"
    },
    positions: {
      vertical: "bottom",
      horizontal: "right"
    },
    zoomLevel: "enabled"
  },
  mobile: {
    buttons: {
      zoomIn: "disabled",
      zoomOut: "disabled",
      resetView: "enabled",
      copyCode: "enabled",
      toggleFullscreen: "enabled",
      download: "disabled"
    },
    positions: {
      vertical: "bottom",
      horizontal: "right"
    },
    zoomLevel: "enabled"
  },
  fullscreen: {
    buttons: {
      zoomIn: "disabled",
      zoomOut: "disabled",
      resetView: "disabled",
      copyCode: "disabled",
      toggleFullscreen: "enabled",
      download: "disabled"
    },
    positions: {
      vertical: "bottom",
      horizontal: "right"
    },
    zoomLevel: "enabled"
  },
  showLanguageLabel: true,
  downloadFormat: "svg",
  fullscreenMode: "browser"
};
var st = (t, e) => ({
  vertical: (e == null ? void 0 : e.vertical) ?? t.vertical,
  horizontal: (e == null ? void 0 : e.horizontal) ?? t.horizontal
});
var Ee = (t) => t === "enabled" || t === "disabled";
var lt = (t, e) => {
  if (!e)
    return { ...t };
  const o = { ...t };
  return Object.keys(e).forEach((n) => {
    if (n === "positions" || n === "zoomLevel")
      return;
    const i = n, w = e[i];
    Ee(w) && (o[i] = w);
  }), o;
};
var re = (t, e) => ({
  buttons: lt(t.buttons, e),
  positions: st(t.positions, e == null ? void 0 : e.positions),
  zoomLevel: (e == null ? void 0 : e.zoomLevel) && Ee(e.zoomLevel) ? e.zoomLevel : t.zoomLevel
});
var se = (t) => {
  const e = (t == null ? void 0 : t.showLanguageLabel) ?? X.showLanguageLabel, o = (t == null ? void 0 : t.downloadFormat) ?? X.downloadFormat, n = (t == null ? void 0 : t.fullscreenMode) ?? X.fullscreenMode;
  return {
    desktop: re(
      X.desktop,
      t == null ? void 0 : t.desktop
    ),
    mobile: re(X.mobile, t == null ? void 0 : t.mobile),
    fullscreen: re(
      X.fullscreen,
      t == null ? void 0 : t.fullscreen
    ),
    showLanguageLabel: e,
    downloadFormat: o,
    fullscreenMode: n
  };
};
var ct = defineComponent({
  __name: "MermaidDiagram",
  props: {
    code: {},
    config: {},
    toolbar: {}
  },
  emits: ["renderComplete"],
  setup(t, { emit: e }) {
    var _a2;
    const o = e, n = t, i = (d) => d && at(d) ? d : se(d), w = ref(
      i(n.toolbar)
    ), m = nt(), y = it({
      config: n.config,
      onRenderComplete: (d) => o("renderComplete", d)
    }), {
      scale: L,
      translateX: C,
      translateY: M,
      isPanning: F,
      isFullscreen: v,
      zoomIn: h2,
      zoomOut: z,
      resetView: B,
      toggleFullscreen: k,
      startPan: D,
      pan: c,
      endPan: I,
      handleWheel: S,
      handleTouchStart: R,
      handleTouchMove: j,
      handleTouchEnd: l,
      panUp: a,
      panDown: O,
      panLeft: de,
      panRight: ue,
      updateFullscreenControls: me
    } = m, {
      mounted: r,
      isRendered: u,
      renderError: g,
      renderErrorDetails: T,
      renderMermaidDiagram: U
    } = y, P = ref(null), H = ref(null), te = `mermaid-${((_a2 = getCurrentInstance()) == null ? void 0 : _a2.uid) ?? Math.random().toString(36).slice(2)}`, he = computed(() => w.value.fullscreenMode), oe = computed(
      () => v.value && he.value === "dialog"
    ), ge = (d) => {
      const ne = d;
      w.value = i(ne.detail);
    }, ve = () => {
      k(H.value, he.value);
    }, ze = async (d) => {
      var _a3;
      const G = (_a3 = document.getElementById(te)) == null ? void 0 : _a3.querySelector("svg");
      if (!G) {
        console.error("SVG element not found for download");
        return;
      }
      const pe = G.cloneNode(true);
      d !== "svg" && (pe.style.backgroundColor = "white");
      const Ye = new XMLSerializer().serializeToString(pe), Ae = new Blob([Ye], { type: "image/svg+xml;charset=utf-8" }), V = URL.createObjectURL(Ae), Y = document.createElement("a");
      if (Y.download = `diagram.${d}`, d === "svg") {
        Y.href = V, document.body.appendChild(Y), Y.click(), document.body.removeChild(Y), URL.revokeObjectURL(V);
        return;
      }
      const Q = new Image();
      Q.onload = () => {
        const W = document.createElement("canvas"), fe = G.viewBox.baseVal;
        let K = fe == null ? void 0 : fe.width, J = fe == null ? void 0 : fe.height;
        if (!K || !J) {
          const ee = G.getBoundingClientRect();
          K = ee.width, J = ee.height;
        }
        W.width = K, W.height = J;
        const _ = W.getContext("2d");
        if (_) {
          _.fillStyle = "white", _.fillRect(0, 0, K, J), _.drawImage(Q, 0, 0);
          const ee = d === "png" ? "image/png" : "image/jpeg", Ne = W.toDataURL(ee);
          Y.href = Ne, document.body.appendChild(Y), Y.click(), document.body.removeChild(Y);
        }
        URL.revokeObjectURL(V);
      }, Q.onerror = (W) => {
        console.error("Failed to load SVG for conversion", W), URL.revokeObjectURL(V);
      }, Q.src = V;
    }, Fe = (d) => D(d), Te = (d) => c(d), Re = () => I(), De = () => I(), Se = (d) => S(d), Be = (d) => R(d), Oe = (d) => j(d), Pe = () => l(), A = () => {
      var _a3, _b;
      const d = {
        controls: (_a3 = P.value) == null ? void 0 : _a3.$refs.controls,
        mobileControls: (_b = P.value) == null ? void 0 : _b.$refs.mobileControls
      };
      me(d);
    };
    return onMounted(async () => {
      try {
        await nextTick(), await U(te, n.code), document.addEventListener("fullscreenchange", A), document.addEventListener("webkitfullscreenchange", A), document.addEventListener("mozfullscreenchange", A), document.addEventListener("MSFullscreenChange", A), document.addEventListener(
          "vitepress-mermaid:toolbar-updated",
          ge
        );
      } catch (d) {
        console.error("Error in component initialization:", d);
      }
    }), watch(oe, (d) => {
      typeof document > "u" || document.body.classList.toggle("mermaid-dialog-open", d);
    }), onUnmounted(() => {
      typeof document < "u" && document.body.classList.remove("mermaid-dialog-open"), document.removeEventListener("fullscreenchange", A), document.removeEventListener(
        "webkitfullscreenchange",
        A
      ), document.removeEventListener("mozfullscreenchange", A), document.removeEventListener("MSFullscreenChange", A), document.removeEventListener(
        "vitepress-mermaid:toolbar-updated",
        ge
      );
    }), (d, ne) => (openBlock(), createElementBlock(Fragment, null, [
      unref(r) && oe.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "mermaid-dialog-backdrop",
        onClick: ve,
        "aria-hidden": "true"
      })) : createCommentVNode("", true),
      unref(r) ? (openBlock(), createElementBlock("div", {
        key: 1,
        ref_key: "fullscreenWrapper",
        ref: H,
        class: normalizeClass(["mermaid-container", { "dialog-fullscreen-active": oe.value }]),
        "data-fullscreen-wrapper": ""
      }, [
        createVNode(Qe, {
          ref_key: "controlsRef",
          ref: P,
          scale: unref(L),
          code: t.code,
          "is-fullscreen": unref(v),
          toolbar: w.value,
          onZoomIn: unref(h2),
          onZoomOut: unref(z),
          onResetView: unref(B),
          onToggleFullscreen: ve,
          onPanUp: unref(a),
          onPanDown: unref(O),
          onPanLeft: unref(de),
          onPanRight: unref(ue),
          onDownload: ze
        }, null, 8, ["scale", "code", "is-fullscreen", "toolbar", "onZoomIn", "onZoomOut", "onResetView", "onPanUp", "onPanDown", "onPanLeft", "onPanRight"]),
        createVNode(ot, {
          "render-error": unref(g),
          "render-error-details": unref(T)
        }, null, 8, ["render-error", "render-error-details"]),
        createBaseVNode("div", {
          class: "diagram-wrapper",
          onMousedown: Fe,
          onMousemove: Te,
          onMouseup: Re,
          onMouseleave: De,
          onWheel: Se,
          onTouchstart: Be,
          onTouchmove: Oe,
          onTouchend: Pe
        }, [
          createBaseVNode("div", {
            id: te,
            class: "mermaid",
            style: normalizeStyle({
              opacity: unref(u) ? 1 : 0,
              transform: `scale(${unref(L)}) translate(${unref(C)}px, ${unref(M)}px)`,
              cursor: unref(F) ? "grabbing" : "grab"
            })
          }, toDisplayString(t.code), 5)
        ], 32)
      ], 2)) : createCommentVNode("", true)
    ], 64));
  }
});
var _$ = class _$ {
  /**
   * Private constructor enforcing the singleton pattern.
   *
   * Initialises the Mermaid configuration, resolves the default toolbar
   * settings, and kicks off the {@link initialize} lifecycle that wires
   * DOM readiness hooks and navigation listeners.
   *
   * @param config - Optional initial Mermaid configuration object.
   *   When provided, its values are shallow-merged into the defaults.
   */
  constructor(e) {
    /** Active Mermaid library configuration merged from defaults and user overrides. */
    __publicField(this, "config");
    /** Fully-resolved toolbar configuration passed to every diagram mount. */
    __publicField(this, "toolbarConfig");
    /** Guards against re-running the {@link initialize} lifecycle. */
    __publicField(this, "initialized", false);
    /** Counter tracking how many retry iterations have been attempted in the current render pass. */
    __publicField(this, "renderAttempts", 0);
    /**
     * Maximum number of exponential-backoff retry iterations before the
     * renderer gives up looking for Mermaid blocks. Set to `15` to
     * accommodate slow production builds and CDN latency.
     */
    __publicField(this, "maxRenderAttempts", 15);
    /** Handle returned by `setTimeout` for the active retry timer, used for cancellation on route changes. */
    __publicField(this, "retryTimeout", null);
    /** FIFO queue of `<pre>` elements waiting to be replaced by diagram components. */
    __publicField(this, "renderQueue", []);
    /** Mutex flag preventing concurrent queue processing. */
    __publicField(this, "isRendering", false);
    /** Becomes `true` after every element in the initial render queue has been processed. */
    __publicField(this, "initialPageRenderComplete", false);
    /** Becomes `true` once VitePress client-side hydration is considered complete. */
    __publicField(this, "hydrationComplete", false);
    /** DOM observer that watches for dynamically-added Mermaid code blocks. */
    __publicField(this, "mutationObserver", null);
    this.config = e ? { ...e } : {}, this.toolbarConfig = se(), this.initialize();
  }
  /**
   * Returns the singleton renderer instance, creating it on first call.
   *
   * If the instance already exists and a `config` object is supplied, the
   * new settings are shallow-merged into the active configuration via
   * {@link setConfig}, and a `vitepress-mermaid:config-updated` event is
   * dispatched so that already-mounted diagrams can re-render.
   *
   * @param config - Optional partial Mermaid configuration. Merged into
   *   the running config on every call (not just the first).
   * @returns The shared {@link MermaidRenderer} instance.
   *
   * @example
   * ```ts
   * // First call creates the singleton
   * const renderer = MermaidRenderer.getInstance({ theme: "dark" });
   *
   * // Subsequent calls return the same instance but can update config
   * MermaidRenderer.getInstance({ securityLevel: "strict" });
   * ```
   */
  static getInstance(e) {
    return _$.instance ? e && _$.instance.setConfig(e) : _$.instance = new _$(e), _$.instance;
  }
  /**
   * Shallow-merges the provided Mermaid options into the runtime config
   * and dispatches a `vitepress-mermaid:config-updated` custom event so
   * that already-mounted `<MermaidDiagram>` components can re-initialise
   * `mermaid.initialize()` and re-render with the new settings.
   *
   * @param config - Partial Mermaid configuration object to merge.
   */
  setConfig(e) {
    this.config = { ...this.config, ...e }, this.dispatchConfigUpdate();
  }
  /**
   * Resolves and stores the toolbar options that will be passed to every
   * diagram component mounted after this call.
   *
   * If called without arguments, the toolbar reverts to the canonical
   * defaults defined in {@link DEFAULT_TOOLBAR_CONFIG}.
   *
   * Already-mounted diagrams are **not** affected retroactively. To
   * update them, dispatch a `vitepress-mermaid:toolbar-updated` custom
   * event that `MermaidDiagram.vue` listens for.
   *
   * @param toolbar - Optional consumer-provided toolbar overrides.
   *
   * @example
   * ```ts
   * const renderer = MermaidRenderer.getInstance();
   * renderer.setToolbar({
   *   downloadFormat: "png",
   *   desktop: { download: "enabled" },
   * });
   * ```
   */
  setToolbar(e) {
    this.toolbarConfig = se(e);
  }
  /**
   * Dispatches a `vitepress-mermaid:config-updated` custom event on the
   * document, carrying the current Mermaid configuration as the event
   * `detail`.
   *
   * This event is consumed by the `useMermaidRenderer` composable which
   * re-initialises the Mermaid library and re-renders the active diagram
   * whenever the configuration changes at runtime.
   *
   * Errors during dispatch are caught and logged to prevent unhandled
   * exceptions from breaking the rendering pipeline.
   *
   * @fires vitepress-mermaid:config-updated
   */
  dispatchConfigUpdate() {
    try {
      document.dispatchEvent(
        new CustomEvent("vitepress-mermaid:config-updated", {
          detail: { ...this.config }
        })
      );
    } catch (e) {
      console.error("Failed to dispatch Mermaid config update:", e);
    }
  }
  /**
   * Removes unnecessary UI elements from a Mermaid code-block wrapper
   * that VitePress renders by default (e.g. the "copy" button and the
   * `"mermaid"` language label badge).
   *
   * The language label is only removed when
   * `toolbarConfig.showLanguageLabel` is `false`.
   *
   * Called once per wrapper before the `<pre>` element is queued for
   * rendering.
   *
   * @param wrapper - The `.language-mermaid` DOM element containing the
   *   original fenced code block.
   */
  cleanupMermaidWrapper(e) {
    const o = e.getElementsByClassName("copy");
    if (Array.from(o).forEach((n) => n.remove()), !this.toolbarConfig.showLanguageLabel) {
      const n = e.getElementsByClassName("lang");
      Array.from(n).forEach((i) => i.remove());
    }
  }
  /**
   * Creates a Virtual DOM node for the `<MermaidDiagram>` component using
   * Vue's `h()` function, together with a fresh wrapper `<div>` that will
   * replace the original `<pre>` element in the DOM.
   *
   * The wrapper receives a unique, random id (e.g.
   * `mermaid-wrapper-x7k3f2`) and the CSS class `"mermaid-wrapper"`,
   * which is used by the `MutationObserver` to skip already-processed
   * blocks.
   *
   * @param code - The raw Mermaid source code string extracted from the
   *   code block's `textContent`.
   * @returns An object with `wrapper` (the DOM node) and `component`
   *   (the Vue VNode), or `null` if creation fails.
   */
  createMermaidComponent(e) {
    try {
      const o = document.createElement("div");
      return o.id = `mermaid-wrapper-${Math.random().toString(36).slice(2)}`, o.className = "mermaid-wrapper", {
        wrapper: o,
        component: h(ct, {
          code: e,
          config: this.config,
          toolbar: this.toolbarConfig
        })
      };
    } catch (o) {
      return console.error("Failed to create mermaid component:", o), null;
    }
  }
  /**
   * Processes the next `<pre>` element in the FIFO {@link renderQueue}.
   *
   * Diagrams are rendered **sequentially** (one at a time) to avoid
   * parallel `mermaid.run()` calls that can cause race conditions or
   * heavy CPU spikes on lower-end devices.
   *
   * When the queue is drained after the first batch, the method sets
   * `initialPageRenderComplete` and `hydrationComplete` to `true`,
   * signalling that the initial page load is done.
   *
   * @returns A promise that resolves when the current element (and any
   *   remaining elements triggered recursively) has been processed.
   */
  async renderNextDiagram() {
    if (this.renderQueue.length === 0 || this.isRendering)
      return;
    this.isRendering = true;
    const e = this.renderQueue.shift();
    if (e)
      try {
        await this.renderMermaidDiagram(e);
      } catch (o) {
        console.error("Failed to render diagram:", o);
      }
    this.isRendering = false, this.renderQueue.length > 0 ? await this.renderNextDiagram() : this.initialPageRenderComplete || (this.initialPageRenderComplete = true, this.hydrationComplete = true);
  }
  /**
   * Renders a single Mermaid diagram by replacing its original `<pre>`
   * element with a freshly-mounted Vue application containing the
   * `<MermaidDiagram>` component.
   *
   * Steps:
   * 1. Extract the raw Mermaid source from the element's `textContent`.
   * 2. Create a wrapper `<div>` and a Vue VNode via
   *    {@link createMermaidComponent}.
   * 3. Replace the `<pre>` node in the DOM with the wrapper.
   * 4. Mount a new Vue app onto the wrapper. A 200 ms delay is added
   *    after mounting to allow the SVG to be fully painted in production
   *    environments.
   *
   * @param element - The `<pre>` element containing the Mermaid source code.
   * @returns A promise that resolves once the component is mounted and
   *   the rendering delay has elapsed.
   */
  async renderMermaidDiagram(e) {
    var _a2;
    try {
      if (!e || !e.parentNode) return;
      const o = ((_a2 = e.textContent) == null ? void 0 : _a2.trim()) || "", n = this.createMermaidComponent(o);
      if (!n) return;
      const { wrapper: i, component: w } = n;
      return e.parentNode.replaceChild(i, e), new Promise((m) => {
        createApp({
          render: () => w
        }).mount(i), setTimeout(m, 200);
      });
    } catch (o) {
      console.error("Failed to render mermaid diagram:", o);
    }
  }
  /**
   * Initialises the renderer lifecycle **exactly once**.
   *
   * Depending on `document.readyState`, the method either waits for
   * `DOMContentLoaded` or runs immediately. It:
   * - Sets up a `MutationObserver` via {@link setupDomMutationObserver}.
   * - Calls {@link initializeRenderer} to start the first render pass.
   * - Registers `popstate` and `vitepress:routeChanged` listeners to
   *   re-render after client-side navigation.
   * - Listens for the one-shot `vitepress:ready` event.
   * - Schedules a fallback `renderWithRetry()` after 500 ms for
   *   deployment scenarios where VitePress events may not fire.
   *
   * If initialisation fails, the error is re-thrown so the caller can
   * handle it, and the `initialized` flag remains `false` to allow a
   * future retry.
   */
  initialize() {
    if (!this.initialized)
      try {
        const e = () => {
          if (!document || !document.body) {
            console.warn(
              "MermaidRenderer initialization failed: document or body not available"
            );
            return;
          }
          Promise.resolve().then(() => {
            requestAnimationFrame(() => {
              try {
                this.setupDomMutationObserver(), this.initializeRenderer();
              } catch (n) {
                console.error(
                  "Failed to initialize MermaidRenderer:",
                  n instanceof Error ? n.message : "Unknown error"
                );
              }
            });
          });
        };
        switch (document.readyState) {
          case "loading":
            document.addEventListener("DOMContentLoaded", e, {
              once: true
            });
            break;
          case "interactive":
          case "complete":
            e();
            break;
          default:
            console.warn(
              `MermaidRenderer: Unexpected document.readyState: ${document.readyState}`
            ), e();
        }
        const o = () => {
          try {
            this.handleRouteChange();
          } catch (n) {
            console.error(
              "Error handling route change:",
              n instanceof Error ? n.message : "Unknown error"
            );
          }
        };
        window.addEventListener("popstate", o), document.addEventListener(
          "vitepress:routeChanged",
          o
        ), document.addEventListener(
          "vitepress:ready",
          () => {
            this.renderWithRetry();
          },
          { once: true }
        ), typeof window < "u" && setTimeout(() => {
          this.renderWithRetry();
        }, 500), this.initialized = true;
      } catch (e) {
        throw console.error(
          "Critical error during MermaidRenderer initialization:",
          e instanceof Error ? e.message : "Unknown error"
        ), e;
      }
  }
  /**
   * Sets up a `MutationObserver` on the VitePress application root
   * (falling back to `document.body`) to detect when new Mermaid code
   * blocks are dynamically added to the DOM.
   *
   * This is essential for two scenarios:
   * 1. **Client-side navigation** — VitePress swaps page content without
   *    a full reload, so new `language-mermaid` blocks appear via DOM
   *    mutations rather than a fresh `DOMContentLoaded`.
   * 2. **Lazy / async content** — Content loaded after initial hydration
   *    (e.g. via JavaScript) is picked up automatically.
   *
   * The observer uses `requestAnimationFrame` debouncing to batch rapid
   * successive mutations into a single render pass.
   */
  setupDomMutationObserver() {
    if (typeof window > "u" || typeof MutationObserver > "u" || typeof document > "u")
      return;
    const e = document.getElementById("app") || document.querySelector(".Layout") || document.body;
    if (!e) return;
    this.mutationObserver && this.mutationObserver.disconnect();
    let o = false;
    this.mutationObserver = new MutationObserver((n) => {
      this.hasNewMermaidNodes(n) && (o || (o = true, requestAnimationFrame(() => {
        o = false, this.handleRouteChange();
      })));
    });
    try {
      this.mutationObserver.observe(e, {
        childList: true,
        subtree: true
      });
    } catch (n) {
      console.error("Failed to observe DOM mutations for Mermaid:", n);
    }
  }
  /**
   * Checks whether any of the given DOM mutations contain newly-added
   * Mermaid code blocks by delegating to {@link nodeContainsMermaidCode}.
   *
   * Used by the `MutationObserver` callback to avoid triggering a
   * re-render pass when the mutations are unrelated to Mermaid content
   * (e.g. VitePress updating the sidebar or search index).
   *
   * @param mutations - The list of `MutationRecord` objects received
   *   from the observer.
   * @returns `true` if at least one added node is or contains a Mermaid
   *   code element; `false` otherwise.
   */
  hasNewMermaidNodes(e) {
    return e.some(
      (o) => Array.from(o.addedNodes).some(
        (n) => this.nodeContainsMermaidCode(n)
      )
    );
  }
  /**
   * Recursively checks whether a DOM node (or any of its descendants)
   * represents an un-processed Mermaid code block.
   *
   * A node is considered a Mermaid block when it matches one of:
   * - `.language-mermaid` class
   * - `code.mermaid` selector
   * - Contains a descendant matching the above selectors
   *
   * Nodes inside `.mermaid-wrapper` are skipped because they have
   * already been processed by a previous render pass.
   *
   * @param node - The DOM node to inspect (may be `null`).
   * @returns `true` if the node is or contains an unprocessed Mermaid
   *   code element; `false` otherwise.
   */
  nodeContainsMermaidCode(e) {
    var _a2;
    if (!e) return false;
    if (e.nodeType === Node.ELEMENT_NODE) {
      const o = e;
      if (o.closest(".mermaid-wrapper"))
        return false;
      if (o.classList.contains("language-mermaid") || ((_a2 = o.matches) == null ? void 0 : _a2.call(o, "code.mermaid")) || o.querySelector(
        ".language-mermaid, pre.language-mermaid, code.language-mermaid, code.mermaid"
      ))
        return true;
    }
    return e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && e.hasChildNodes() ? Array.from(e.childNodes).some(
      (o) => this.nodeContainsMermaidCode(o)
    ) : false;
  }
  /**
   * Resets rendering state counters and kicks off the render-with-retry
   * loop via {@link renderWithRetry}.
   *
   * Called during the initial page load (from {@link initialize}) and
   * is the starting point of every render pass.
   */
  initializeRenderer() {
    this.renderAttempts = 0, this.initialPageRenderComplete = false, this.renderWithRetry();
  }
  /**
   * Handles route changes in the VitePress SPA router.
   *
   * Clears any active retry timeout, resets the attempt counter, and
   * starts a fresh render pass to process Mermaid blocks on the new
   * page. Called by the `popstate` and `vitepress:routeChanged` event
   * listeners registered in {@link initialize}.
   */
  handleRouteChange() {
    this.renderAttempts = 0, this.initialPageRenderComplete = false, this.retryTimeout && (clearTimeout(this.retryTimeout), this.retryTimeout = null), this.renderWithRetry();
  }
  /**
   * Attempts to discover and render all Mermaid diagrams on the current
   * page. If no diagrams are found and the retry budget has not been
   * exhausted, schedules another attempt using exponential backoff.
   *
   * **Backoff formula:**
   * `delay = min(300 × 1.4^attempt, 10 000)` milliseconds.
   *
   * This ensures quick first retries (300 ms, 420 ms, 588 ms, …) while
   * capping at 10 seconds for later attempts, accommodating slow CDN
   * networks and heavy SSR hydration.
   */
  renderWithRetry() {
    if (!this.renderMermaidDiagrams() && this.renderAttempts < this.maxRenderAttempts) {
      const o = Math.min(
        300 * Math.pow(1.4, this.renderAttempts),
        1e4
      );
      this.retryTimeout && clearTimeout(this.retryTimeout), this.retryTimeout = setTimeout(() => {
        this.renderAttempts++, this.renderWithRetry();
      }, o);
    }
  }
  /**
   * Searches the current document for un-processed Mermaid code blocks,
   * cleans their VitePress wrappers (removing copy buttons and optional
   * language labels), and pushes the underlying `<pre>` elements onto
   * the {@link renderQueue} for sequential processing.
   *
   * Two discovery strategies are used:
   * 1. **Primary** — `getElementsByClassName("language-mermaid")`.
   * 2. **Fallback** — Iterates all `<pre>` elements and checks for a
   *    child `<code>` with a `mermaid` or `language-mermaid` class.
   *    This handles edge-cases in certain SSR output formats.
   *
   * @returns `true` if at least one `<pre>` element was discovered and
   *   queued; `false` otherwise.
   */
  renderMermaidDiagrams() {
    try {
      let e = document.getElementsByClassName("language-mermaid");
      if (e.length === 0) {
        const n = document.querySelectorAll("pre"), i = Array.from(n).filter((w) => {
          const m = w.querySelector("code");
          return !!(m && (m.className.includes("mermaid") || m.className.includes("language-mermaid")));
        });
        i.length > 0 && (e = {
          length: i.length,
          item(m) {
            return m >= 0 && m < i.length ? i[m] : null;
          },
          namedItem(m) {
            return null;
          },
          // Implement Symbol.iterator using the array iterator to satisfy disposal typing
          [Symbol.iterator]() {
            return i[Symbol.iterator]();
          },
          // Add indexed access
          ...i.reduce(
            (m, y, L) => ({ ...m, [L]: y }),
            {}
          )
        });
      }
      if (e.length === 0) return false;
      Array.from(e).forEach(
        (n) => this.cleanupMermaidWrapper(n)
      );
      const o = Array.from(e).map((n) => {
        let i = n.querySelector("pre");
        return !i && n.tagName.toLowerCase() === "pre" && (i = n), i;
      }).filter(
        (n) => n instanceof HTMLPreElement
      );
      return o.length > 0 && (this.renderQueue.push(...o), this.isRendering || this.renderNextDiagram()), o.length > 0;
    } catch (e) {
      return console.error("Error rendering Mermaid diagrams:", e), false;
    }
  }
};
/** Singleton instance reference. */
__publicField(_$, "instance");
var $ = _$;
var dt = '.mermaid-container{position:relative;min-height:20rem;max-height:50vh;width:100%;overflow:hidden!important}.mermaid-container.dialog-fullscreen-active{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:min(94vw,1200px);height:min(90vh,860px);max-height:none;z-index:1002;border-radius:.75rem;border:1px solid var(--vp-c-border);background:var(--vp-c-bg);box-shadow:0 24px 60px #00000040}.mermaid-dialog-backdrop{position:fixed;inset:0;z-index:1001;background:color-mix(in srgb,var(--vp-c-bg) 40%,transparent);-webkit-backdrop-filter:blur(4px) saturate(115%);backdrop-filter:blur(4px) saturate(115%)}body.mermaid-dialog-open{overflow:hidden}.controls{--control-padding: .375rem;--control-gap: .25rem;--control-radius: .375rem;--control-shadow: 0 2px 4px rgba(0, 0, 0, .1);position:absolute;bottom:.75rem;right:.75rem;top:auto;left:auto;z-index:20;padding:var(--control-padding);border-radius:var(--control-radius);box-shadow:var(--control-shadow);opacity:0;visibility:visible;pointer-events:auto;transition:all .2s ease;background:var(--vp-c-bg)}.controls.toolbar-vertical-top{top:.75rem;bottom:auto}.controls.toolbar-vertical-bottom{bottom:.75rem;top:auto}.controls.toolbar-horizontal-left{left:.75rem;right:auto}.controls.toolbar-horizontal-right{right:.75rem;left:auto}.desktop-controls{display:inline-flex;align-items:center;gap:.375rem}.desktop-controls button{position:relative;padding:.375rem;border:none;background:var(--vp-c-bg);border-radius:.25rem;cursor:pointer;display:grid;place-items:center;color:var(--vp-c-text-1);transition:all .2s ease}.desktop-controls button:hover{background:var(--vp-c-bg-soft);transform:translateY(-1px);color:var(--vp-c-brand)}.desktop-controls button:active{transform:translateY(0)}.desktop-controls button svg{width:18px;height:18px;transition:transform .2s ease}.desktop-controls button:hover svg{transform:scale(1.1)}.mobile-controls{display:none;flex-direction:row;justify-content:center;gap:.5rem;padding:.75rem;width:auto;z-index:8}.mobile-utility-controls{display:flex;align-items:center;justify-content:center;gap:.5rem}.mobile-controls button{width:40px;height:40px;background:var(--vp-c-bg);border:1px solid var(--vp-c-border);border-radius:.25rem;display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;transition:background .2s ease,transform .2s ease}.mobile-controls button:hover{background:var(--vp-c-bg-soft);transform:translateY(-1px)}.mobile-controls button:active{transform:translateY(0)}.mobile-controls button svg{width:20px;height:20px;stroke:var(--vp-c-text-1)}.zoom-level{min-width:3.25rem;text-align:center;font-size:.75rem;font-weight:500;color:var(--vp-c-text-2);-webkit-user-select:none;user-select:none;padding:.25rem .375rem;background:var(--vp-c-bg);border-radius:.25rem}.mobile-controls .zoom-level{margin-right:.5rem;min-width:3rem}.mobile-controls .mobile-zoom-level{order:-1}@media(max-width:768px){.desktop-controls{display:none}.mobile-controls{display:flex}}@media(min-width:769px){.mobile-controls{display:none}.desktop-controls{display:inline-flex}}.mermaid-container:hover .controls:not(.force-show){opacity:1;transform:translateY(0)}.mermaid-container:fullscreen .controls{opacity:1!important;transform:translateY(0)!important}.mermaid-container.dialog-fullscreen-active .controls{opacity:1!important;transform:translateY(0)!important}.diagram-wrapper{overflow:hidden;position:relative;width:100%;height:100%;min-height:20rem;z-index:1}.mermaid-container:fullscreen .diagram-wrapper{background:var(--vp-c-bg);color:var(--vp-c-text-1);padding:20px;display:flex;align-items:center;justify-content:center;max-height:none;touch-action:none}.mermaid-container:fullscreen::backdrop{background:var(--vp-c-bg-soft)}.mermaid-container.dialog-fullscreen-active .diagram-wrapper{background:var(--vp-c-bg);color:var(--vp-c-text-1);max-height:none;min-height:100%;padding:20px;display:flex;align-items:center;justify-content:center;touch-action:none}@media(max-width:768px){.mermaid-container.dialog-fullscreen-active{width:96vw;height:88vh;border-radius:.5rem}}.mermaid{transition:opacity .3s ease-in-out;transform-origin:center center;display:inline-block}.mermaid-rendering{opacity:.5;position:relative}.mermaid-rendering:after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:30px;height:30px;border:3px solid var(--vp-c-brand);border-top-color:transparent;border-radius:50%;animation:mermaid-spinner .8s linear infinite}@keyframes mermaid-spinner{to{transform:translate(-50%,-50%) rotate(360deg)}}.copied-notification{position:absolute;bottom:100%;left:50%;transform:translate(-50%);background:var(--vp-c-bg);color:var(--vp-c-text-1);padding:.375rem .75rem;border-radius:var(--control-radius);font-size:.75rem;font-weight:500;white-space:nowrap;margin-block-end:.5rem;opacity:0;animation:fadeInOut 2s ease-in-out;box-shadow:0 2px 4px #0000001a}@keyframes fadeInOut{0%{opacity:0;transform:translate(-50%,.5rem)}10%{opacity:1;transform:translate(-50%)}90%{opacity:1;transform:translate(-50%)}to{opacity:0;transform:translate(-50%,-.5rem)}}.visible-controls{opacity:1!important;visibility:visible!important;pointer-events:auto!important}.mobile-only{display:none!important}@media(max-width:768px){.mobile-only{display:grid!important}.controls{flex-direction:column;align-items:stretch}.zoom-level{text-align:center}}.diagram-error{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--vp-c-bg-soft);border:1px solid var(--vp-c-border);border-radius:.5rem;padding:1rem;max-width:90%;width:max-content;box-shadow:0 4px 8px #0000001a;z-index:10}.error-message{display:flex;align-items:center;gap:.75rem;color:var(--vp-c-danger);font-weight:500}.diagram-error .error-message svg{stroke:var(--vp-c-danger);flex-shrink:0}.error-toggle-button{margin-left:auto;background:var(--vp-c-bg);border:1px solid var(--vp-c-border);border-radius:.25rem;padding:.25rem .5rem;font-size:.75rem;cursor:pointer;transition:all .2s ease}.error-toggle-button:hover{background:var(--vp-c-bg-mute);transform:translateY(-1px)}.error-details{margin-top:1rem;padding:1rem;background:var(--vp-c-bg);border-radius:.25rem;white-space:pre-wrap;font-family:monospace;font-size:.85rem;overflow-x:auto;color:var(--vp-c-text-2);border:1px solid var(--vp-c-border);max-height:200px;overflow-y:auto}';
var ke = "vitepress-mermaid-renderer-styles";
var ie = false;
var ut = () => {
  if (ie || typeof document > "u")
    return;
  if (document.getElementById(ke)) {
    ie = true;
    return;
  }
  const t = document.createElement("style");
  t.id = ke, t.textContent = dt, document.head.appendChild(t), ie = true;
};
var Le = typeof window < "u" && typeof document < "u";
var mt = {
  setToolbar: () => {
  }
};
Le && ut();
var vt = (t) => Le ? $.getInstance(t) : mt;
export {
  vt as createMermaidRenderer
};
/*! Bundled license information:

mermaid/dist/mermaid.core.mjs:
  (*! Check if previously processed *)
  (*!
   * Wait for document loaded before starting the execution
   *)
*/
//# sourceMappingURL=vitepress-mermaid-renderer.js.map
