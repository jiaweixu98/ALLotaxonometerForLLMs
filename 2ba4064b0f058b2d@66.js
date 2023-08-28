function _1(md){return(
md`# allotaxonometer helpers

Easy way to import allotaxonometer functions in Observable.`
)}

function _utils(){return(
import('https://cdn.skypack.dev/allotaxonometer@1.1.4?min')
)}

function _dot(utils){return(
utils.dot
)}

function _rin(utils){return(
utils.rin
)}

function _tiedrank(utils){return(
utils.tiedrank
)}

function _sum(utils){return(
utils.sum
)}

function _mixedElems(utils){return(
utils.mixedElems
)}

function _diamond(utils){return(
utils.diamond
)}

function _matlab_sort(utils){return(
utils.matlab_sort
)}

function _rank_turbulence_divergence(utils){return(
utils.rank_turbulence_divergence
)}

function _zeros(utils){return(
utils.zeros
)}

function _which(utils){return(
utils.which
)}

function _rank_maxlog10(utils){return(
utils.rank_maxlog10
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("utils")).define("utils", _utils);
  main.variable(observer("dot")).define("dot", ["utils"], _dot);
  main.variable(observer("rin")).define("rin", ["utils"], _rin);
  main.variable(observer("tiedrank")).define("tiedrank", ["utils"], _tiedrank);
  main.variable(observer("sum")).define("sum", ["utils"], _sum);
  main.variable(observer("mixedElems")).define("mixedElems", ["utils"], _mixedElems);
  main.variable(observer("diamond")).define("diamond", ["utils"], _diamond);
  main.variable(observer("matlab_sort")).define("matlab_sort", ["utils"], _matlab_sort);
  main.variable(observer("rank_turbulence_divergence")).define("rank_turbulence_divergence", ["utils"], _rank_turbulence_divergence);
  main.variable(observer("zeros")).define("zeros", ["utils"], _zeros);
  main.variable(observer("which")).define("which", ["utils"], _which);
  main.variable(observer("rank_maxlog10")).define("rank_maxlog10", ["utils"], _rank_maxlog10);
  return main;
}
