import define1 from "./2ba4064b0f058b2d@66.js";
import define2 from "./59a26dd0a3e9841b@902.js";
import define3 from "./84796e32fea82316@924.js";
import define4 from "./fd37c825d59d31ba@451.js";
import define5 from "./6bc3c08c4545a7e2@3827.js";

function _1(md){return(
md`# ALLotaxonometer for all: Open Source v.s. Closed Source LLMs`
)}

function _form_json(Inputs,htl){return(
Inputs.form(
  [
    Inputs.file({label: "", accept: ".json", required: true}),
  ],
  {
    template: (inputs) => htl.html`<div style="display: flex; gap: 1.1em">
  <br>${inputs}
</div>`
  }
)
)}

function _form1(Inputs,htl){return(
Inputs.form(
  [
    Inputs.file({label: "", accept: ".csv,.tsv", required: true}),
    Inputs.file({label: "", accept: ".csv,.tsv", required: true})
  ],
  {
    template: (inputs) => htl.html`<div style="display: flex; gap: 1.1em">
  <br>${inputs} ${inputs}
</div>`
  }
)
)}

function _4(md){return(
md`You can choose differnet datasets below.

Selcet System 1 or System 2 to compare different models. 

Increase α value to weight more on rank. 

Decrease α value to weight more on turbulence. `
)}

function _sel_data(Inputs){return(
Inputs.radio(["LLMs","Girl babynames", "Boy babynames", "Twitter", "Species Abundance"], {label: "", value: "LLMs"})
)}

function _form(Inputs,d3,elem_names,htl){return(
Inputs.form(
  [
    Inputs.select(d3.range(elem_names.length), {label: "System 1", multiple: true, multiple: 3, value: [0], format: x => elem_names[x]}),
    Inputs.select(d3.range(elem_names.length), {label: "System 2", multiple: true, multiple: 3, value: [1], format: x => elem_names[x]}),
  ],
  {
    template: (inputs) => htl.html`<div style="display: flex; gap: 4em">
  <br>${inputs}
</div>`
  }
)
)}

function _toggle_lab(Inputs){return(
Inputs.toggle({label: "Show label", value: true})
)}

function _alpha(Inputs,alphas){return(
Inputs.range([0, alphas.length-1], {step: 1, label: "α", format: x => alphas[x]})
)}

function _metric_type(Inputs){return(
Inputs.select(["rank_turbulence_divergence"], {label: "Word Shifts"})
)}

function _chart(html,tex,title,next_button,alphas,alpha,sum,dat,infinity,zero,not_zero,plot_diamond,plot_word_shift,plot_legend,plot_balance){return(
html`
    <div style="display:flex; align-items:center; gap: 10em; margin-left: -75px; justify-content: center; width: 100%; text-align: center; font-size: 22px; ">
      <div>${ tex`\Omega_1` }: ${ title(0) }</div> 
      <div>${ tex`\Omega_2` }: ${ title(1) }</div>  
    </div>
    <div>${next_button()}</div> 
    <div style="opacity: 0.5;"">
      <div>${ tex`D_{${ alphas[alpha] === Infinity ? 
              "∞" : 
              alphas[alpha] }}^R(\Omega_1 || \Omega_2) = ${ sum(dat.deltas.map(d => +d)).toFixed(3) }` } </div> 
      <div>&nbsp&nbsp&nbsp&nbsp${ alphas[alpha] === Infinity ? infinity : alphas[alpha] === 0 ? zero : not_zero  }  </div>
    </div>
    <div style="display:flex; gap: 18em; ">
      <div>${ plot_diamond() }</div>
      <div>${ plot_word_shift() }</div>
    </div>
    <div style="display:flex; align-items:center; justify-content: space-around; margin:90px; margin-top:-150px; margin-right:270px;">
      <div>${ plot_legend() }</div>
      <div>${ plot_balance() }</div>
    </div>
`
)}

function _11(md){return(
md`## Appendix`
)}

function _plot_diamond(d3,ncells,bin_size,diamond_dat,visWidth,visHeight,margin,xAxis,xAxisLab,title,xGrid,yAxis,yAxisLab,yGrid,canvas_mult_size,rin,chosen_types,Tooltips){return(
() => {

  // Set up
  const buckets = d3.range(0, ncells, bin_size)
  const center_y = d3.scaleThreshold().domain(buckets).range(buckets.map(d => d-(bin_size/2)));
  
  const max_xy   = d3.max(diamond_dat, d => d.x1)          // max_x == max_y
  const max_rank = d3.max(diamond_dat, (d) => d.rank_L[1]); // max_rankL == max_rankL
  const max_val  = d3.max(diamond_dat, d => d.value)
  
  const xy  = d3.scaleBand().domain(diamond_dat.map(d=>d.x1)).range([0, visWidth])
  const xyd = d3.scaleBand().domain(diamond_dat.map(d=>d.cos_dist)).range([0, visWidth])
  const xyc = d3.scaleBand().domain(diamond_dat.map(d=>center_y(d.coord_on_diag))).range([0, visWidth])
  
  const xyDomain   = [1, 10**Math.ceil(Math.max(Math.log10(max_rank)))];
  const xyScale    = d3.scaleLog().domain(xyDomain).range([0, visWidth])
  const xyScaleLin = d3.scaleLinear().domain([0,ncells-1]).range([0, visWidth])
  
  const color_scale = d3.scaleSequentialLog().domain([max_val, 1]).interpolator(d3.interpolateInferno)

  // Start plotting
  const svg = d3.create("svg")
   
  const g = svg.attr("id", "myGraph")   
    .attr('height', visHeight + margin.top + margin.bottom)
    .attr('width', visWidth)
    .attr("viewBox", [0-50, 0, visWidth + margin.top+50, visHeight])
    .append('g');
  
  // Rotate the canvas
  svg.attr('transform', `translate(${ visWidth / 2.5 }, -25)  scale (-1,1) rotate(45)`);

  // Xaxis 
  g.append('g')
    .call(xAxis, xyScale)
    .call(xAxisLab, "Rank r", visWidth, 37) // there must be an easier way to breaklines!?!
    .call(xAxisLab, "for", visWidth, 55)
    .call(xAxisLab, `${title(1)}`, visWidth, 73)
    .call(xAxisLab, "more →", visWidth-200, 40, .4)
    .call(xAxisLab, "frequent", visWidth-200, 60, .4)
    .call(xAxisLab, "← less", visWidth+200, 40, .4)
    .call(xAxisLab, "frequent", visWidth+200, 60, .4)
    .call(xGrid, xyScaleLin);
  
  // // Yaxis 
  g.append('g')
    .call(yAxis, xyScale)
    .call(yAxisLab, "Rank r", 0, 37)
    .call(yAxisLab, "for", 0, 55)
    .call(yAxisLab, `${title(0)}`, 0, 73)
    .call(yAxisLab, "less →", 200, 40, .4)
    .call(yAxisLab, "frequent", 200, 60, .4)
    .call(yAxisLab, "← more", -200, 40, .4)
    .call(yAxisLab, "frequent", -200, 60, .4)
    .call(yGrid, xyScaleLin);
  
  // Background polygons
  function draw_polygon(g, tri_coords, bg_color) {
     g.append("polygon")
        .attr("fill",bg_color)
        .attr("fill-opacity", 0.2)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("points", tri_coords)
   }
  
  const grey_triangle = [
    {"x":max_xy, "y":max_xy}, {"x":0, "y":0}, {"x":max_xy, "y":0}
  ].map(d => [xy(d.x)*canvas_mult_size, xy(d.y)*canvas_mult_size].join(',')).join(" ")
  
  const blue_triangle = [
    {"x":max_xy, "y":max_xy}, {"x":0, "y":0}, {"x":0, "y":max_xy}
  ].map(d => [xy(d.x)*canvas_mult_size, xy(d.y)*canvas_mult_size].join(',')).join(" ")
  
  draw_polygon(g, blue_triangle, "#89CFF0")
  draw_polygon(g, grey_triangle, "grey")
      
  // Heatmap
  const base_hm = svg.selectAll('rect').data(diamond_dat).enter();
  
  const cells = base_hm
    .append('rect')
      .attr('x', (d) => xy(d.x1))
      .attr('y', (d) => xy(d.y1))
      .attr('width', xy.bandwidth())
      .attr('height', xy.bandwidth())
      .attr('fill', (d) => color_scale(d.value))
      .attr('fill-opacity', (d) => d.value === 0 ? 0 : color_scale(d.value))
      .attr('stroke', 'black')
      .attr('stroke-width', (d) => d.value === 0 ? 0 : 0.3)
  

    svg.selectAll('text')
    .data(diamond_dat)
    .enter()
    .append('text')
    .filter(d => rin(chosen_types, d.types.split(",")).some((x) => x === true))
    .text(d => d.types.split(",")[0])
      .attr("x", (d) => xy(d.x1))
      .attr("y", (d) => xyc(center_y(d.coord_on_diag)))
      .attr("font-size", 14)
      .attr("transform", d => `
        scale(1,-1) 
        rotate(-90) 
        rotate(-45, ${xyc(center_y(d.coord_on_diag))}, ${xyc(center_y(d.coord_on_diag))})
        translate(${d.which_sys == "right" ? xyd(d.cos_dist)*1.1 : -xyd(d.cos_dist)*1.1})`)
      .attr("text-anchor", d => d.x1 - d.y1 <= 0 ? "start" : "end")
      .attr("dx", d => d.x1 - d.y1 <= 0 ? 10 : -10)

    // Draw the middle line
    svg.append('line')
     .style("stroke", "black")
     .style("stroke-width", 1)
     .attr("x1", 0)
     .attr("y1", 0)
     .attr("x2", visWidth-7)
     .attr("y2", visHeight-7)

  // Add the tooltip
  const tooltip = d3
    .select("body")
    .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("opacity", 0.9)
    .style("background", "white");
  
  cells.call(Tooltips, tooltip) // not working with labels
  
  return svg.node()

  
}
)}

function _plot_balance(DivergingBarChartBalance,balance_dat){return(
() => DivergingBarChartBalance(balance_dat(), {
  x: d => d.frequency,
  y: d => d.y_coord,
  xFormat: "%",
  xDomain: [-1, 1], // [xmin, xmax]
  xLabel: "",
  width: 300,
  yPadding: 0.5,
  colors: ["lightgrey", "lightblue"]
})
)}

function _plot_word_shift(DivergingBarChartWordShift,wordshift_dat,max_shift){return(
() => DivergingBarChartWordShift(wordshift_dat().slice(0, 30), {
  x: d => d.metric,
  y: d => d.type,
  xFormat: "%",
  xDomain: [-max_shift*1.5, max_shift*1.5], // [xmin, xmax]
  width: 300,
  yPadding: 0.2,
  height: 740,
  xLabel: "← System 1 · Divergence contribution · System 2 →",
  colors: ["lightgrey", "lightblue"]
})
)}

function _plot_legend(d3,myLegend,diamond_dat){return(
function plot_legend() {
  const N_CATEGO = 20
  const ramp = d3.range(N_CATEGO).map(i => d3.rgb(d3.interpolateInferno(i / (N_CATEGO - 1))).hex())
  const color = d3.scaleOrdinal(d3.range(N_CATEGO), ramp)
  
  return myLegend(color, {
  tickSize: 0,
  max_count_log: Math.ceil(Math.log10(d3.max(diamond_dat, d => d.value)))+1,
  marginTop:11,
  width: 370
  })
}
)}

function _16(md){return(
md`### Diamond plot metadata`
)}

function _Tooltips(d3){return(
(g, tooltip) =>
  g
    .on("mouseover", (event, d) => {
      d3.select(event.target)
        .style("stroke-width", "2px");
      tooltip.style("visibility", "visible");
      tooltip.html(d.value !== 0 ? `Top types: ${d.types.split(",").length < 50 ? 
          d3.shuffle(d.types.split(",")) :          
          [d3.shuffle(d.types.split(",").slice(0,50))].concat([" ..."])}` : null);

    })
    .on("mousemove", (event, d) => {
      tooltip
        .style("top", event.clientY - 10 + "px")
        .style("left", event.clientX + 10 + "px");
    })
    .on("mouseout", (event, d) => {
      d3.select(event.target)
        .style("stroke-width",  (d) => d.value === 0 ? 0 : 0.3);
      tooltip.style("visibility", "hidden");
    })
)}

function _xAxis(visHeight,canvas_mult_size,d3){return(
(g, scale) =>
  g
    .attr("transform", `translate(0, ${visHeight*canvas_mult_size})`)
    .call(d3.axisBottom(scale))
    .call((g) => g.select(".domain").remove()) // remove baseline
    // add label
    .selectAll('text')
    .attr('dy', 10)
    .attr('dx', 13)
    .attr('transform', 'scale(-1,1) rotate(45)')
    .attr('font-size', 10)
)}

function _xAxisLab(visWidth){return(
(g, text, dx, dy, alpha) =>
    g
      .append("text")
      .attr("x", visWidth / 2)
      .attr("fill", "black")
      .attr("font-size", 14)
      .attr("opacity", alpha)
      .attr("text-anchor", 'middle')
      .text(text)
      .attr('transform', `rotate(183) scale(1,-1) translate(-${dx}, ${dy})`)
)}

function _xGrid(visHeight,d3,ncells){return(
(g, scale) =>
  g.append('g')
    .attr("transform", `translate(0, ${-visHeight-10})`)
    .call(d3.axisBottom(scale).ticks(ncells/2).tickFormat("")) // rm tick values
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .attr("stroke", "#d3d3d3")
          .style("stroke-dasharray", ("3, 3"))
        .attr("y1", visHeight)
        .attr("y2", 0)
    )
)}

function _yAxis(d3,visHeight,canvas_mult_size){return(
(g, scale) =>
  // add axis
  g
    .call(d3.axisRight(scale))
    .call((g) => g.select(".domain").remove())
    .attr("transform", `translate(${visHeight*canvas_mult_size}, 0) scale(-1, 1)`)
    .selectAll('text')
    .attr('dx', -28) // fiddling with ticks for Left system 
    .attr('dy', 15)  // fiddling with ticks for Left system 
    .attr('transform', 'rotate(45)')
    .attr('font-size', 10)
)}

function _yAxisLab(visWidth){return(
(g, text, dx, dy, alpha) =>
  g
    .append("text")
    .attr("x", visWidth / 2)
    .attr("fill", "black")
    .attr("font-size", 14)
    .attr("opacity", alpha)
    .attr("text-anchor", 'middle')
    .text(text)
    .attr('transform', `rotate(93) translate(${dx},${dy})`)
)}

function _yGrid(d3,ncells,visWidth){return(
(g, scale) =>
  g
    .append("g")
    .call(d3.axisRight(scale).ticks(ncells/2).tickFormat(""))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .attr("stroke", "#d3d3d3")
        .style("stroke-dasharray", ("3, 3"))
        .attr("x1", visWidth+7)
        .attr("x2", 10)
    )
)}

function _margin(){return(
{ top: 100, left: 0, right: 140, bottom: 140 }
)}

function _visHeight(){return(
512
)}

function _visWidth(){return(
512
)}

function _ncells(d3,diamond_dat){return(
d3.max(diamond_dat, d => d.x1)
)}

function _chosen_types(d3,ncells,bin_size,diamond_dat)
{
  const cummulative_bin = d3.range(0, ncells, bin_size)
  const relevant_types = []
  
  
  for (let sys of ["right", "left"]) {
    
    for (let i=1; i < cummulative_bin.length; i++) {
    
      const filtered_dat = diamond_dat.filter(d => d.value > 0 && d.which_sys == sys)
                                      .filter(d => d.coord_on_diag >= cummulative_bin[i-1] && 
                                              d.coord_on_diag < cummulative_bin[i])
      
      
      if (filtered_dat.length > 0) {
        const cos_dists = filtered_dat.map(d => d.cos_dist)
        
        const max_dist = cos_dists.reduce((a, b) => { return Math.max(a, b) })
        const max_dist_idx = cos_dists.indexOf(max_dist)
        const name = d3.shuffle(filtered_dat[max_dist_idx]['types'].split(","))[0]        
        relevant_types.push(name)
      }
  }
  }
  return relevant_types
}


function _bin_size(){return(
1.5
)}

function _canvas_mult_size(){return(
1.02
)}

function _31(md){return(
md`### Misc plot metadata`
)}

function _balance_dat(me_class){return(
() => {
  const setdiff = (x,y) => {
    let a = new Set(x);
    let b = new Set(y);
    return new Set(
      [...a].filter(x => !b.has(x)));
  } 
  const union = (x,y) => {
    let a = new Set(x);
    let b = new Set(y);
    return new Set([...a, ...b]);
  }
  const types_1 = me_class['elem1'].map(d => d.types)
  const types_2 = me_class['elem2'].map(d => d.types)
  
  const union_types = union(types_1, types_2)
  const tot_types = types_1.length+types_2.length

  return [ 
    { y_coord: "total count",     frequency: +(types_2.length / tot_types).toFixed(3) },
    { y_coord: "total count",     frequency: -(types_1.length / tot_types).toFixed(3) },
    { y_coord: "all names",       frequency: +(types_2.length / union_types.size).toFixed(3) },
    { y_coord: "all names",       frequency: -(types_1.length / union_types.size).toFixed(3) },
    { y_coord: "exclusive names", frequency: +(setdiff(types_2, types_1).size / types_2.length).toFixed(3) },
    { y_coord: "exclusive names", frequency: -(setdiff(types_1, types_2).size / types_1.length).toFixed(3) } 
  ]
}
)}

function _wordshift_dat(me,dat,d3){return(
() => { 
  const out = []
  for (let i=0; i < me[0]['types'].length; i++) {
    const rank_diff = me[0]['ranks'][i]-me[1]['ranks'][i]
    out.push({
      'type': `${me[0]['types'][i]} (${me[0]['ranks'][i]} ⇋ ${me[1]['ranks'][i]})` ,
      'rank_diff': rank_diff,
      'metric': rank_diff < 0 ? -dat.deltas[i] : dat.deltas[i], 
    })
  }
  
  return out.slice().sort((a, b) => d3.descending(Math.abs(a.metric), Math.abs(b.metric)))
}
)}

function _max_shift(d3,wordshift_dat){return(
d3.max(wordshift_dat(), d => Math.abs(d.metric))
)}

function _alphas(d3){return(
d3.range(0,18).map(v => +(v/12).toFixed(2)).concat([1, 2, 5, Infinity])
)}

function _clicks(){return(
0
)}

function _next_button(button,$0,d3){return(
() => button({
  title: "",
  value: "Next",
  desc: "",
  buttonStyle: {
    background: "#7295FF",
    color: "white"
  },
  onclick: (objs) => {
    $0.value += 1;

    d3.select(objs.button)
      .style("background", "#6786E5")
      .interrupt()
      .transition()
      .duration(300)
      .style("background", "#7295FF");

    if ($0.value > 0 && objs.output === "") {
      objs.output = d3
        .select(objs.div)
        .insert("a", "div.desc")
        .attr("class", "output")
        .style("margin-left", "5px")
        .style("font-size", "11px")
        .style("cursor", "pointer")
        .style("border", "0.5px solid black")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .on("click", function () {
          this.remove();
          objs.output = "";
          $0.value = 0;
        })
        .html("RESET");
    }
  }
})
)}

function _title(uploaded_json_file,form_json,uploaded_csv_file_1,uploaded_csv_file_2,form1,sel_sys1,sel_sys2){return(
(sys) => {
  function get_fname() {
    if (uploaded_json_file !== "") {
      return form_json[0]['name'] 
    } else if (sys == 0 ? uploaded_csv_file_1  !== "" : uploaded_csv_file_2  !== "") {
      return form1[sys]['name']
    } else {
      return sys == 0 ? sel_sys1 : sel_sys2
    }
  }
  
  return get_fname().replace(/.((c|t)sv|json)/i, "")
}
)}

function _not_zero(tex,alphas,alpha){return(
tex`\propto \sum_\tau \Big| \frac{1}{r_{\tau,1}^{ ${ alphas[alpha] }} } - \frac{1}{r_{\tau,2}^{ ${ alphas[alpha] }}} \Big| `
)}

function _zero(tex){return(
tex`\propto \sum_\tau \Big|\ln \frac{r_{\tau,1}}{r_{\tau,2}}\Big| `
)}

function _infinity(tex){return(
tex`\propto \sum_\tau (1 - \delta_{r_{\tau,1}, r_{\tau,2}}) \times\max\Big\{\frac{1}{r_{\tau,1}},\frac{1}{r_{\tau,2}} \Big\} `
)}

function _42(md){return(
md`### Data`
)}

function _uploaded_json_file(form_json){return(
form_json[0] === undefined ? "" : form_json[0].json({typed: true})
)}

function _ExempleData(FileAttachment){return(
function ExempleData(x) {
    switch (x) {
      case 'LLMs': {  return FileAttachment("LLMs.json").json(); }
      case 'Girl babynames': { return FileAttachment("elem_girls@2.json").json() }
      case 'Boy babynames': {  return FileAttachment("elem_boys.json").json(); }
      case 'Twitter': {  return FileAttachment("twitter_data@15.json").json(); }
      case 'Species Abundance': {  return FileAttachment("tree_species_counts@1.json").json(); }
  }
}
)}

function _elem(uploaded_json_file,ExempleData,sel_data,FileAttachment)
{
  if (uploaded_json_file !== "") { // if uploaded json file use that 
    return uploaded_json_file
  } else if (ExempleData(sel_data) === false) { // if no default example are selected just use elem_boys 
    return FileAttachment("LLMs.json").json()
  } else {
    return ExempleData(sel_data) // if one of the default examples is selected use that
  }
}


function _elem_names(elem){return(
Object.keys(elem)
)}

function _sel_sys1(elem_names,form,clicks){return(
elem_names[(form[0][0]+clicks) % elem_names.length]
)}

function _sel_sys2(elem_names,form,clicks){return(
elem_names[(form[1][0]+clicks) % elem_names.length]
)}

function _uploaded_csv_file_1(form1){return(
form1[0] === undefined ? "" : form1[0].csv({typed: true})
)}

function _uploaded_csv_file_2(form1){return(
form1[1] === undefined ? "" : form1[1].csv({typed: true})
)}

function _elems1(form1,elem,sel_sys1,uploaded_csv_file_1){return(
form1[0] === undefined ? elem[sel_sys1] : uploaded_csv_file_1
)}

function _elems2(form1,elem,sel_sys2,uploaded_csv_file_2){return(
form1[1] === undefined ? elem[sel_sys2] : uploaded_csv_file_2
)}

function _53(md){return(
md`#### Combining both systems`
)}

function _me_class(mixedElems,elems1,elems2){return(
new mixedElems(elems1, elems2)
)}

function _me(me_class){return(
me_class.combElems()
)}

function _rtd(rank_turbulence_divergence,me,alphas,alpha){return(
rank_turbulence_divergence(me, alphas[alpha])
)}

function _dat(diamond,me,rtd){return(
diamond(me, rtd)
)}

function _diamond_dat(dat){return(
dat.counts
)}

function _59(md){return(
md`### Imports`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["tree_species_counts@1.json", {url: new URL("./files/061a8fb6fde6ee3f8b8aaf72aaa72b55dba151c69cb79b3943cbd0d991eeee728f4b427bdde8d044d9ecf48d5b9276c0b9a1242ac24a1bc1598552c999c3c07d.json", import.meta.url), mimeType: "application/json", toString}],
    ["twitter_data@15.json", {url: new URL("./files/5344398205c45a19291121a421c394ff50059a62416a508a2847008a17ee3912eeeb7ad58249211cc9cadff3a3c74dd76d64ee40cad77ba014eb9697e24e9292.json", import.meta.url), mimeType: "application/json", toString}],
    ["elem_boys.json", {url: new URL("./files/e3c46222c3e10884e361ef7b43f3f5b17a9f8294e15392aaee8d251f065eb351b520cd2d467e902a96bd9ebe8ebc7cbad01cea0d2ca2e08602fc3a7785c466cd.json", import.meta.url), mimeType: "application/json", toString}],
    ["elem_girls@2.json", {url: new URL("./files/9278a62c84551e67df222db45e0926c1f662cfad0fb88129aeac7222d3529c1da7ef8408ba01c54ca21f856b2d875f973e3d3862c0fecbed2d35db0412d2d1ce.json", import.meta.url), mimeType: "application/json", toString}],
    ["LLMs.json", {url: new URL("./files/9989f52d3236c84c2c6b3d74f5d0340e4f877386ba5d6b501a83f2dd261a3e6e2ac0d4b0c9b4e1563638e545ea439f815c14c46e25ec8782cde4a4a909769648.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof form_json")).define("viewof form_json", ["Inputs","htl"], _form_json);
  main.variable(observer("form_json")).define("form_json", ["Generators", "viewof form_json"], (G, _) => G.input(_));
  main.variable(observer("viewof form1")).define("viewof form1", ["Inputs","htl"], _form1);
  main.variable(observer("form1")).define("form1", ["Generators", "viewof form1"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof sel_data")).define("viewof sel_data", ["Inputs"], _sel_data);
  main.variable(observer("sel_data")).define("sel_data", ["Generators", "viewof sel_data"], (G, _) => G.input(_));
  main.variable(observer("viewof form")).define("viewof form", ["Inputs","d3","elem_names","htl"], _form);
  main.variable(observer("form")).define("form", ["Generators", "viewof form"], (G, _) => G.input(_));
  main.variable(observer("viewof toggle_lab")).define("viewof toggle_lab", ["Inputs"], _toggle_lab);
  main.variable(observer("toggle_lab")).define("toggle_lab", ["Generators", "viewof toggle_lab"], (G, _) => G.input(_));
  main.variable(observer("viewof alpha")).define("viewof alpha", ["Inputs","alphas"], _alpha);
  main.variable(observer("alpha")).define("alpha", ["Generators", "viewof alpha"], (G, _) => G.input(_));
  main.variable(observer("viewof metric_type")).define("viewof metric_type", ["Inputs"], _metric_type);
  main.variable(observer("metric_type")).define("metric_type", ["Generators", "viewof metric_type"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["html","tex","title","next_button","alphas","alpha","sum","dat","infinity","zero","not_zero","plot_diamond","plot_word_shift","plot_legend","plot_balance"], _chart);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("plot_diamond")).define("plot_diamond", ["d3","ncells","bin_size","diamond_dat","visWidth","visHeight","margin","xAxis","xAxisLab","title","xGrid","yAxis","yAxisLab","yGrid","canvas_mult_size","rin","chosen_types","Tooltips"], _plot_diamond);
  main.variable(observer("plot_balance")).define("plot_balance", ["DivergingBarChartBalance","balance_dat"], _plot_balance);
  main.variable(observer("plot_word_shift")).define("plot_word_shift", ["DivergingBarChartWordShift","wordshift_dat","max_shift"], _plot_word_shift);
  main.variable(observer("plot_legend")).define("plot_legend", ["d3","myLegend","diamond_dat"], _plot_legend);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("Tooltips")).define("Tooltips", ["d3"], _Tooltips);
  main.variable(observer("xAxis")).define("xAxis", ["visHeight","canvas_mult_size","d3"], _xAxis);
  main.variable(observer("xAxisLab")).define("xAxisLab", ["visWidth"], _xAxisLab);
  main.variable(observer("xGrid")).define("xGrid", ["visHeight","d3","ncells"], _xGrid);
  main.variable(observer("yAxis")).define("yAxis", ["d3","visHeight","canvas_mult_size"], _yAxis);
  main.variable(observer("yAxisLab")).define("yAxisLab", ["visWidth"], _yAxisLab);
  main.variable(observer("yGrid")).define("yGrid", ["d3","ncells","visWidth"], _yGrid);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("visHeight")).define("visHeight", _visHeight);
  main.variable(observer("visWidth")).define("visWidth", _visWidth);
  main.variable(observer("ncells")).define("ncells", ["d3","diamond_dat"], _ncells);
  main.variable(observer("chosen_types")).define("chosen_types", ["d3","ncells","bin_size","diamond_dat"], _chosen_types);
  main.variable(observer("bin_size")).define("bin_size", _bin_size);
  main.variable(observer("canvas_mult_size")).define("canvas_mult_size", _canvas_mult_size);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("balance_dat")).define("balance_dat", ["me_class"], _balance_dat);
  main.variable(observer("wordshift_dat")).define("wordshift_dat", ["me","dat","d3"], _wordshift_dat);
  main.variable(observer("max_shift")).define("max_shift", ["d3","wordshift_dat"], _max_shift);
  main.variable(observer("alphas")).define("alphas", ["d3"], _alphas);
  main.define("initial clicks", _clicks);
  main.variable(observer("mutable clicks")).define("mutable clicks", ["Mutable", "initial clicks"], (M, _) => new M(_));
  main.variable(observer("clicks")).define("clicks", ["mutable clicks"], _ => _.generator);
  main.variable(observer("next_button")).define("next_button", ["button","mutable clicks","d3"], _next_button);
  main.variable(observer("title")).define("title", ["uploaded_json_file","form_json","uploaded_csv_file_1","uploaded_csv_file_2","form1","sel_sys1","sel_sys2"], _title);
  main.variable(observer("not_zero")).define("not_zero", ["tex","alphas","alpha"], _not_zero);
  main.variable(observer("zero")).define("zero", ["tex"], _zero);
  main.variable(observer("infinity")).define("infinity", ["tex"], _infinity);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("uploaded_json_file")).define("uploaded_json_file", ["form_json"], _uploaded_json_file);
  main.variable(observer("ExempleData")).define("ExempleData", ["FileAttachment"], _ExempleData);
  main.variable(observer("elem")).define("elem", ["uploaded_json_file","ExempleData","sel_data","FileAttachment"], _elem);
  main.variable(observer("elem_names")).define("elem_names", ["elem"], _elem_names);
  main.variable(observer("sel_sys1")).define("sel_sys1", ["elem_names","form","clicks"], _sel_sys1);
  main.variable(observer("sel_sys2")).define("sel_sys2", ["elem_names","form","clicks"], _sel_sys2);
  main.variable(observer("uploaded_csv_file_1")).define("uploaded_csv_file_1", ["form1"], _uploaded_csv_file_1);
  main.variable(observer("uploaded_csv_file_2")).define("uploaded_csv_file_2", ["form1"], _uploaded_csv_file_2);
  main.variable(observer("elems1")).define("elems1", ["form1","elem","sel_sys1","uploaded_csv_file_1"], _elems1);
  main.variable(observer("elems2")).define("elems2", ["form1","elem","sel_sys2","uploaded_csv_file_2"], _elems2);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("me_class")).define("me_class", ["mixedElems","elems1","elems2"], _me_class);
  main.variable(observer("me")).define("me", ["me_class"], _me);
  main.variable(observer("rtd")).define("rtd", ["rank_turbulence_divergence","me","alphas","alpha"], _rtd);
  main.variable(observer("dat")).define("dat", ["diamond","me","rtd"], _dat);
  main.variable(observer("diamond_dat")).define("diamond_dat", ["dat"], _diamond_dat);
  main.variable(observer()).define(["md"], _59);
  const child1 = runtime.module(define1);
  main.import("sum", child1);
  main.import("diamond", child1);
  main.import("mixedElems", child1);
  main.import("rank_turbulence_divergence", child1);
  main.import("rank_maxlog10", child1);
  main.import("which", child1);
  main.import("matlab_sort", child1);
  main.import("zeros", child1);
  main.import("rin", child1);
  main.import("tiedrank", child1);
  const child2 = runtime.module(define2);
  main.import("DivergingBarChartWordShift", child2);
  const child3 = runtime.module(define3);
  main.import("DivergingBarChartBalance", child3);
  const child4 = runtime.module(define4);
  main.import("myLegend", child4);
  const child5 = runtime.module(define5);
  main.import("button", child5);
  return main;
}
