function _1(md){return(
md`# Legend Diamond Plot`
)}

function _2(){return(
""
)}

function _3(htl,plot_legend){return(
htl.html`<div style="display:flex; align-items:center; justify-content: space-around; margin:110px; margin-top:150px; margin-right:270px;">
      <div>${ plot_legend() }</div>
    </div>`
)}

function _plot_legend(d3,myLegend){return(
function plot_legend() {
  const N_CATEGO = 20
  const ramp = d3.range(N_CATEGO).map(i => d3.rgb(d3.interpolateInferno(i / (N_CATEGO - 1))).hex())
  const color = d3.scaleOrdinal(d3.range(N_CATEGO), ramp)
  
  return myLegend(color, {
  tickSize: 0,
  marginTop:11,
  width: 370
})
}
)}

function _myLegend(d3){return(
function myLegend(color, {
  tickSize = 6,
  max_count_log = 4,
  width = 320, 
  height = 44 + tickSize,
  marginTop = 18,
  marginRight = 0,
  marginBottom = 16 + tickSize,
  marginLeft = 0,
  ticks = width / 64,
  tickFormat,
  tickValues
} = {}) {

  function ramp(color, n = 256) {
    const canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible")
      .style("display", "block");

  let tickAdjust = g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
  
  let x;
  x = d3.scaleBand()
     .domain(color.domain())
     .rangeRound([marginLeft, width - 100]);
  
  svg.append("g")
   .selectAll("rect")
   .data(color.domain())
   .join("rect")
     .attr("x", x)
     .attr("y", marginTop)
     .attr("width", Math.max(0, x.bandwidth() - 1))
     .attr("height", height - marginTop - marginBottom)
     .attr("fill", color)
     .attr("transform", "rotate(-90) translate(-70,0)");

  tickAdjust = () => {};

  let x2;
  x2 = d3.scaleBand()
     .domain(d3.range(max_count_log).map(i => 10**i).sort(d3.descending))
     .rangeRound([marginLeft-40, width-90]);

  svg.append("g")
      .call(d3.axisBottom(x2).tickSize(tickSize)).attr("text-anchor", "start")
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text") 
        .attr("x", marginLeft - 25) // magic number moving legend title left and right 
        .attr("y", marginTop + marginBottom) // magic number moving legend title up and down
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-size", 14)
        .attr("class", "title")
        .text("Counts per cell"))
      .attr("transform", "rotate(-90) translate(-60,5)") // magic number moving ticks and title up and down and left and right
        .selectAll('text')
        .attr("dx", 30) // magic number moving ticks left and right
        .attr("dy", -5) // magic number
        .attr('transform', 'rotate(90)') // rotating ticks and title

  return svg.node();
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(_2);
  main.variable(observer()).define(["htl","plot_legend"], _3);
  main.variable(observer("plot_legend")).define("plot_legend", ["d3","myLegend"], _plot_legend);
  main.variable(observer("myLegend")).define("myLegend", ["d3"], _myLegend);
  return main;
}
