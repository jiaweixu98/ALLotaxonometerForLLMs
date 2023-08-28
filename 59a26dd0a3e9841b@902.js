function _1(md){return(
md`# Wordshift Plot`
)}

function _plot_balance(DivergingBarChartWordShift,bal_dat,width){return(
DivergingBarChartWordShift(bal_dat, {
  x: d => d.metric,
  y: d => d.type,
  xFormat: "%",
  xLabel: "← System 1 · Divergence contribution· System 2 →",
  width,
  yPadding: 0.04,
  colors: ["lightgrey", "lightblue"]
})
)}

function _DivergingBarChartWordShift(d3){return(
function DivergingBarChartWordShift(data, {
  x = d => d, // given d in data, returns the (quantitative) x-value
  y = (d, i) => i, // given d in data, returns the (ordinal) y-value
  title, // given d in data, returns the title text
  marginTop = 30, // top margin, in pixels
  marginRight = 40, // right margin, in pixels
  marginBottom = 10, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 640, // outer width of chart, in pixels
  height, // the outer height of the chart, in pixels
  xType = d3.scaleLinear, // type of x-scale
  xDomain, // [xmin, xmax]
  xRange = [marginLeft, width - marginRight], // [left, right]
  xFormat, // a format specifier string for the x-axis
  xLabel, // a label for the x-axis
  yPadding = 0.5, // amount of y-range to reserve to separate bars
  yDomain, // an array of (ordinal) y-values
  yRange, // [top, bottom]
  colors = d3.schemePiYG[3] // [negative, …, positive] colors
} = {}) {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);

  // Compute default domains, and unique the y-domain.
  if (xDomain === undefined) xDomain = d3.extent(X);
  if (yDomain === undefined) yDomain = Y;
  yDomain = new d3.InternSet(yDomain);

  // Omit any data not present in the y-domain.
  // Lookup the x-value for a given y-value.
  const I = d3.range(X.length).filter(i => yDomain.has(Y[i]));
  const YX = d3.rollup(I, ([i]) => X[i], i => Y[i]);

  // Compute the default height.
  if (height === undefined) height = Math.ceil((yDomain.size + yPadding) * 25) + marginTop + marginBottom;
  if (yRange === undefined) yRange = [marginTop, height - marginBottom];

  // Construct scales, axes, and formats.
  const xScale = xType(xDomain, xRange);
  const yScale = d3.scaleBand(yDomain, yRange).padding(yPadding);
  const xAxis = d3.axisTop(xScale).ticks(width / 80, xFormat);
  const yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(6);
  const format = xScale.tickFormat(100, xFormat);

  // Compute titles.
  if (title === undefined) {
    title = i => `${Y[i]}\n${format(X[i])}`;
  } else if (title !== null) {
    const O = d3.map(data, d => d);
    const T = title;
    title = i => T(O[i], i, data);
  }

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("y2", height - marginTop - marginBottom)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text") // actual title
          .attr("x", xScale(0))
          .attr("y", -22)
          .attr("fill", "currentColor")
          .attr("text-anchor", "center")
          .text(xLabel));

  const bar = svg.append("g")
    .selectAll("rect")
    .data(I)
    .join("rect")
      .attr("fill", i => colors[X[i] > 0 ? colors.length - 1 : 0])
      .attr("x", i => Math.min(xScale(0), xScale(X[i])))
      .attr("y", i => yScale(Y[i]))
      .attr("width", i => Math.abs(xScale(X[i]) - xScale(0)))
      .attr("height", yScale.bandwidth());

  if (title) bar.append("title")
      .text(title);

  // name labels on the opposite side of the bar
  svg.append("g")
      .attr("transform", `translate(${xScale(0)},0)`)
      .call(yAxis)
      .call(g => g.selectAll(".tick text")
        .filter(y => YX.get(y) > 0 ? -YX.get(y) : YX.get(y))
          .attr("text-anchor", y => YX.get(y) > 0 ? "start" : "end" )
          .attr("x",  y => YX.get(y) > 0 ? 6 : -6 ));

  return svg.node();
}
)}

function _bal_dat(){return(
JSON.parse(`[{"type":"Mary","metric":-0.009,"tot_rank":2},{"type":"Anna","metric":0.0014,"tot_rank":4},{"type":"Emma","metric":-0.0015,"tot_rank":6},{"type":"Elizabeth","metric":-0.0019,"tot_rank":8},{"type":"Minnie","metric":-0.0028,"tot_rank":11},{"type":"Margaret","metric":-0.0007,"tot_rank":11},{"type":"Ida","metric":-0.0023,"tot_rank":16},{"type":"Bertha","metric":-0.0005,"tot_rank":17},{"type":"Clara","metric":0.0009,"tot_rank":19},{"type":"Alice","metric":-0.0029,"tot_rank":19},{"type":"Annie","metric":-0.001,"tot_rank":21},{"type":"Florence","metric":0.0008,"tot_rank":26},{"type":"Sarah","metric":-0.0035,"tot_rank":28},{"type":"Ella","metric":-0.0022,"tot_rank":32},{"type":"Grace","metric":0.001,"tot_rank":33},{"type":"Martha","metric":-0.0007,"tot_rank":33},{"type":"Nellie","metric":-0.0001,"tot_rank":34},{"type":"Bessie","metric":0.0032,"tot_rank":36},{"type":"Cora","metric":-0.0021,"tot_rank":38},{"type":"Laura","metric":-0.0011,"tot_rank":38},{"type":"Carrie","metric":-0.0008,"tot_rank":42},{"type":"Mabel","metric":0.0012,"tot_rank":42},{"type":"Maude","metric":-0.0002,"tot_rank":45},{"type":"Ethel","metric":0.0042,"tot_rank":53},{"type":"Gertrude","metric":-0.0004,"tot_rank":54},{"type":"Rose","metric":0.001,"tot_rank":55},{"type":"Jennie","metric":-0.0008,"tot_rank":57}]`)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("plot_balance")).define("plot_balance", ["DivergingBarChartWordShift","bal_dat","width"], _plot_balance);
  main.variable(observer("DivergingBarChartWordShift")).define("DivergingBarChartWordShift", ["d3"], _DivergingBarChartWordShift);
  main.variable(observer("bal_dat")).define("bal_dat", _bal_dat);
  return main;
}
