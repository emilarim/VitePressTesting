import {
  parse
} from "./chunk-2OGG3UGK.js";
import "./chunk-4A2FEAM7.js";
import "./chunk-PDXIW367.js";
import "./chunk-PPE4PMQV.js";
import "./chunk-6KKASCZQ.js";
import "./chunk-YGV4RF7B.js";
import "./chunk-FARRHXBJ.js";
import "./chunk-JOBV2KEO.js";
import "./chunk-VIMKCNLL.js";
import {
  selectSvgElement
} from "./chunk-DSHMTRSH.js";
import "./chunk-Y7G5ETLD.js";
import "./chunk-LAOUMOYT.js";
import {
  configureSvgSize
} from "./chunk-YWZBQDQX.js";
import "./chunk-556QAFCJ.js";
import {
  __name,
  log
} from "./chunk-6HWEMQCT.js";
import "./chunk-FOQIPI7F.js";

// node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-LFFYTUFH.mjs
var parser = {
  parse: __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};
var DEFAULT_INFO_DB = {
  version: "11.13.0" + (true ? "" : "-tiny")
};
var getVersion = __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
//# sourceMappingURL=infoDiagram-LFFYTUFH-AMDG4YGD.js.map
