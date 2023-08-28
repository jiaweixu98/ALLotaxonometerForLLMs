function _1(md){return(
md`# DIY inputs`
)}

function _2(md){return(
md`*Inspired by [jashkenas' inputs.]*
[jashkenas' inputs.]: https://observablehq.com/@jashkenas/inputs`
)}

function _3(md){return(
md`---
Welcome to the toolbo... notebook of easily customizable inputs! It serves as a list of examples, to showcase what's possible to achieve. `
)}

function _4(md){return(
md`I decided to create a tool – instead of a set of predefined functionalities – that can be used to create fantastic inputs with just a little doze of creativity.`
)}

function _5(md){return(
md`Have fun! 🎢`
)}

function _6(md){return(
md`---
## Sliders`
)}

function _7(md){return(
md`
~~~js
import { slider } from "@bartok32/diy-inputs"
~~~`
)}

function _8(slider){return(
slider({
  title: "HOW-ARE-YOU-TODAY SLIDER",
  desc: "TOOLTIP.",
  descStyle: {
    "margin-top": "0px",
    "pointer-events": "none"
  },
  min: 0,
  max: 100,
  step: 1,
  value: 75,
  theme: "white-round",
  background: {
    type: "double",
    colors: ["#7EE5A0", "#FFA5A5"]
  },
  oninput: ({ desc, output, value, progress }) => {
    output.textContent =
      value < 10
        ? "😭"
        : value < 30
        ? "☹️"
        : value < 50
        ? "😐"
        : value < 70
        ? "🙂"
        : value < 90
        ? "😄"
        : value < 99
        ? "🥳"
        : "💯";

    desc.textContent = `${value}%`;

    // tooltip's position: (200px - margins) + exceptions for one- and three-number percentages
    desc.style.marginLeft = `${
      progress * (200 - 15) + (value < 10 ? 5 : value > 99 ? -5 : 0)
    }px`;
  }
})
)}

function _9(slider){return(
slider({
  title: "LIGHTSABER SLIDER",
  desc: "MAY THE FORCE BE WITH YOU.",
  min: 0,
  max: 100,
  step: 1,
  value: 15,
  theme: "default-thin",
  background: {
    type: "double",
    colors: ["#7295FF", "#CCD8FF"]
  }
})
)}

function _10(slider){return(
slider({
  title: "ONLY-LEFT-COLOR SLIDER",
  desc: "SO LEFT-SIDED.",
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  theme: "default-round",
  background: {
    type: "double",
    colors: ["#7295FF", "white"]
  }
})
)}

function _11(slider){return(
slider({
  title: "ONLY-RIGHT-COLOR SLIDER",
  desc: "SO OPPOSITE-SIDED.",
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  theme: "white-round",
  background: {
    type: "double",
    colors: ["white", "#7295FF"]
  },
  oninput: ({ output }) => (output.textContent = "🤔")
})
)}

function _12(slider){return(
slider({
  title: "COLOR-INCREMENTING SLIDER",
  desc: "SO MAJESTIC.",
  min: 0,
  max: 100,
  step: 1,
  value: 20,
  theme: "default",
  background: {
    type: "progress",
    colors: ["#CCD8FF", "#7295FF", "white"]
  }
})
)}

function _13(slider){return(
slider({
  title: "GRADIENT-FADE BACKGROUND SLIDER",
  desc: "SO MANY COLORS.",
  min: 0,
  max: 100,
  step: 1,
  value: 80,
  theme: "default-round",
  background: {
    type: "interpolate",
    colors: ["#FFA5A5", "#7EE5A0"]
  }
})
)}

function _14(slider){return(
slider({
  title: "HIGHLIGHTED SLIDER",
  desc: "👨 : - IS IT FINE TO CROSS THE GREEN LINE?",
  min: 0,
  max: 100,
  step: 1,
  value: 40,
  theme: "default",
  highlight: {
    lower: 60,
    upper: 90,
    colors: {
      normal: "#EDEDED",
      inactive: "#B7E5C6",
      active: "#7EE5A0"
    },
    preventUpdate: false
  },
  oninput: ({ desc, value }) => {
    if (value >= 60 && value <= 90) {
      desc.textContent =
        "🧝‍♀️ : YES, MY SON. THERE IS A LOT OF INTERESTING THINGS THERE!";
    } else {
      desc.textContent = "👨 : IS IT FINE TO CROSS THE GREEN LINE?";
    }
  }
})
)}

function _15(slider){return(
slider({
  title: "RESTRICTED SLIDER",
  desc: "👨 : IS IT FINE TO CROSS THE RED LINE?",
  min: 0,
  max: 100,
  step: 1,
  value: 40,
  theme: "default",
  highlight: {
    lower: 60,
    upper: 90,
    colors: {
      normal: "#EDEDED",
      inactive: "#FFA5A5",
      active: "#FF6666"
    },
    preventUpdate: true
  },
  oninput: ({ desc, value }) => {
    if (value >= 60 && value <= 90) {
      desc.textContent =
        "🧝‍♀️ : NO, MY SON. YOU SHOULD ALWAYS KEEP AWAY FROM IT.";
    } else {
      desc.textContent = "👨 : IS IT FINE TO CROSS THE RED LINE?";
    }
  }
})
)}

function _16(slider){return(
slider({
  title: "LOTR-RESTRICTED SLIDER",
  desc: "👨 : SHALL I PASS?",
  min: 0,
  max: 100,
  step: 1,
  value: 40,
  theme: "default",
  highlight: {
    lower: 60,
    upper: 101,
    colors: {
      normal: "#EDEDED",
      inactive: "#FFA5A5",
      active: "#FF6666"
    },
    preventUpdate: true
  },
  oninput: ({ desc, value }) => {
    if (value >= 60 && value <= 101) {
      desc.textContent = "🧙‍♂️ : YOU SHALL NOT PASS!";
    } else {
      desc.textContent = "👾 : SHALL I PASS?";
    }
  }
})
)}

function _17(slider,d3){return(
slider({
  title: "CUSTOM-DESCRIPTION-AND-OUTPUT SLIDER",
  descStyle: {
    "pointer-events": "none"
  },
  min: 0,
  max: 10,
  step: 1,
  value: 0,
  background: {
    type: "progress",
    colors: ["#F2F2F2", "#7EE5A0", "#F2F2F2"]
  },
  oninput: ({ desc, output, value }) => {
    output.textContent =
      value === 10
        ? "Congrats, you did it! 🎉"
        : "Only " + (10 - value) + " to go!";

    desc.textContent =
      value === 0
        ? "LET'S COUNT TO 10!"
        : d3
            .range(value)
            .map((d) => (d == 9 ? d + 1 + "!" : d + 1 + "..."))
            .reduce((a, b) => a + " " + b, "");
  }
})
)}

function _18(slider){return(
slider({
  title: "TRICKY SLIDER",
  desc: "❌ NEVER TRUST THESE ONES.",
  min: 0,
  max: 100,
  step: 1,
  theme: "default-thin",
  oninput: ({ div: { update }, settings, value }) =>
    update(settings.max - value)
})
)}

function _19(slider,d3){return(
slider({
  title: "EXPANDING RAINBOW SLIDER",
  desc: "BECAUSE WHY NOT?",
  min: 0,
  max: 100,
  step: 1,
  value: 20,
  background: {
    type: "progress",
    interpolation: d3.interpolateRainbow,
    color: "#EDEDED"
  },
  oninput: ({ desc, output, progress, slider, value }) => {
    slider.style.width = `${75 + 0.75 * value + 50 * progress}px`;

    if (progress < 1) {
      output.textContent = "🌈 : Catch me if you can!";
      desc.textContent = "BECAUSE WHY NOT?";
    } else {
      output.textContent = "🧝‍♀️ : You caught the rainbow. Congratulations!";
      desc.textContent = "THE TRUE RAINBOW–CATCHER.";
    }
  }
})
)}

function _20(md){return(
md`**Inline sliders.**`
)}

function _21(md,slider,$0){return(
md`🧝‍♀️: - Have you seen the Inline-Robo-Candy-Slider 9000?
<br>🤖: - <span style = 'font-family: Avenir, Arial; font-size: 15px;'>D1$@BL1NG $T3@LTH M0D3...</span> ${slider(
  {
    titleStyle: {
      "font-size": "11px"
    },
    min: 0,
    max: 15,
    step: 1,
    divStyle: {
      display: "inline-block",
      "text-align": "center",
      "margin-left": "3.5px"
    },
    sliderStyle: {
      width: "130px",
      background: "#FFA5D0"
    },
    theme: "default-thin",
    oninput: ({ value }) =>
      ($0.value = Array(value + 1).join("🍬"))
  }
)}
<br>🧝‍♀️: - Ah, there you are!`
)}

function _S0___MANY___CAND13S(){return(
''
)}

function _23(md){return(
md`**Bonus:** synchronized dance-sliders.`
)}

function _24(slider,d3){return(
slider({
  desc: "'CAUSE PARTY IS NEVER OVER.",
  min: 0,
  max: 100,
  step: 1,
  divAttrs: {
    id: "slider1"
  },
  divStyle: {
    display: "inline-block"
  },
  sliderStyle: {
    width: "150px"
  },
  theme: "default-round",
  oninput: ({ output, progress, slider, value }) => {
    const secondSlider = d3.select("#slider2");

    if (!secondSlider.empty()) {
      secondSlider.node().update(100 - value);
      secondSlider.select("input").node().style.background = d3.interpolateCool(
        1 - progress
      );
      slider.style.background = d3.interpolateCool(progress);

      if (value >= 50) {
        output.textContent = "💃";
        secondSlider.select("span").node().textContent = "🕺";
      } else {
        output.textContent = "🕺";
        secondSlider.select("span").node().textContent = "💃";
      }
    } else {
      slider.style.background = d3.interpolateCool(progress);
      output.textContent = "💃";
    }
  }
})
)}

function _25(slider,d3){return(
slider({
  desc: "CHEERS TO THAT!",
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  divAttrs: {
    id: "slider2"
  },
  divStyle: {
    display: "inline-block"
  },
  sliderStyle: {
    width: "150px"
  },
  theme: "default-round",
  oninput: ({ output, progress, slider, value }) => {
    const secondSlider = d3.select("#slider1");

    if (!secondSlider.empty()) {
      secondSlider.node().update(100 - value);
      secondSlider.select("input").node().style.background = d3.interpolateCool(
        1 - progress
      );
      slider.style.background = d3.interpolateCool(progress);

      if (value <= 50) {
        output.textContent = "🕺";
        secondSlider.select("span").node().textContent = "💃";
      } else {
        output.textContent = "💃";
        secondSlider.select("span").node().textContent = "🕺";
      }
    } else {
      slider.style.background = d3.interpolateCool(progress);
      output.textContent = "🕺";
    }
  }
})
)}

function _26(md){return(
md`---
## API`
)}

function _27(md){return(
md`
~~~js
function slider({
~~~
~~~js
  min: 0,
  max: 1,
  step: 0.1,
  value: 0.5, // initial value
  title: 'some title',
  desc: 'some description',
~~~
**[element]**

For the next two arguments, replace <code>[element]</code> with one of the following: <code>[title, slider, output, desc, div</code> *(element that ties the others together)*<code>].</code>
~~~js
  [element]Style: {
    width: '150px',
    color: 'white',
    ... // other CSS styles
  },
  [element]Attrs: {
    id: 'slider1',
    class: 'cool-slider',
    ... // other attributes
  },
~~~
<hr>
**theme**

~~~js
  theme: 'white-round',
~~~

Choose one from <code>[default, white].</code> You can change the slider's thumb appearance by adding <code>-thin</code> or <code>-round</code> to the theme, e.g. <code>white-round.</code>
<hr>
**background**

~~~js
  background: {
    type: 'progress',
    colors: [yourColors]
  },
~~~
<code>type:</code> one of <code>[normal, double, interpolate, progress]</code>

~~~js
if (type === 'normal') use color: yourColor instead of colors: [yourColors]
~~~

~~~js
if (type === 'progress') use a list of three colors – starting one, final one
and optional right-most solid color (see color-incrementing-slider)
~~~

~~~js
if (type === 'interpolate') use a list of two colors (left and right) or
completely omit colors argument and use some d3 color interpolator
(see gradient–fade background)
~~~
<hr>
**highlight**

~~~js
  highlight: {
    lower: 60,
    upper: 90,
    colors: {
      normal: '#EDEDED',
      inactive: '#B7E5C6',
      active: '#7EE5A0'
    },
    preventUpdate: false
  },
~~~
If <code>preventUpdate</code> is set to <code>true</code>, then the slider won't be updated when inside of highlighted area *(see restricted slider)*.
<hr>
~~~js
  initialize: true, // if false, oninput won't be triggered when slider is created
~~~
<hr>
**oninput**

~~~js
  oninput: (objs) => {
    // 🧙‍♀️ magic stuff happens here 🧙‍♂️ \\\\
  }
~~~
<code>objs</code> object holds <code>title, slider, output, desc,</code> and <code>div</code> elements. Additionally, you have an access to current value of the slider <code>(objs.value)</code>, progress <code>[0-1] (objs.progress)</code> and <code>settings (objs.settings)</code>, so you can access the <code>min</code> and <code>max</code> values for example <code>(objs.settings.min, objs.settings.max)</code>.

You can also change the behavior of slider by using <code>div's update</code> method *(which also updates the div's value and output text)*, for example by using <code>objs.div.update(objs.settings.max - objs.slider.value)</code> to create a *tricky slider.*
~~~js
})
~~~

<hr>
**DOM interactions**

<code>div</code> also holds the *min*, *max* and *step* attributes which can be accessed from outside of the slider.

~~~js
const mySlider = slider({ min: 0, max: 1, step: 0.1 });

mySlider.min  // 0
mySlider.max  // 1
mySlider.step // 0.1
~~~`
)}

function _28(md){return(
md`---
## Selects`
)}

function _29(md){return(
md`~~~js
import { select } from "@bartok32/diy-inputs"
~~~`
)}

function _30(select,d3){return(
select({
  title: "JUMPING SELECT",
  desc: "AAAAND HOP!",
  options: {
    GREEN: "#A1E8CC",
    APRICOT: "#FAC9B8",
    BLUE: "#BFD4FF"
  },
  selectStyle: {
    background: "#A1E8CC"
  },
  onchange: ({ select, value }) =>
    d3
      .select(select)
      .style("font-size", "0px")
      .interrupt()
      .transition()
      .ease(d3.easePoly)
      .duration(250)
      .style("width", "100px")
      .style("height", "35px")
      .style("margin", "15px")
      .transition()
      .ease(d3.easeBounce)
      .duration(250)
      .style("width", "100px")
      .style("height", "30px")
      .style("margin", "0px")
      .style("background", value)
      .style("font-size", "12px")
})
)}

function _31(select,d3){return(
select({
  title: "SHRINKING SELECT",
  desc: "AAAAND SHRINK!",
  options: {
    APRICOT: "#FAC9B8",
    GREEN: "#A1E8CC",
    BLUE: "#BFD4FF"
  },
  selectStyle: {
    background: "#FAC9B8"
  },
  onchange: ({ select, value }) =>
    d3
      .select(select)
      .style("font-size", "0px")
      .interrupt()
      .transition()
      .ease(d3.easePoly)
      .duration(250)
      .style("width", "10px")
      .style("height", "90px")
      .transition()
      .ease(d3.easeBounce)
      .duration(250)
      .style("width", "100px")
      .style("height", "30px")
      .style("background", value)
      .style("font-size", "12px")
})
)}

function _32(select,d3){return(
select({
  title: "MY-FATHER-WAS-A-CIRCLE SELECT",
  desc: "NO JOKES.",
  options: {
    BLUE: "#BFD4FF",
    GREEN: "#A1E8CC",
    APRICOT: "#FAC9B8"
  },
  selectStyle: {
    background: "#BFD4FF"
  },
  onchange: ({ select, value }) =>
    d3
      .select(select)
      .style("font-size", "0px")
      .interrupt()
      .transition()
      .ease(d3.easePoly)
      .duration(350)
      .style("width", "100px")
      .style("height", "100px")
      .style("border-radius", "50px")
      .transition()
      .ease(d3.easeBounce)
      .duration(250)
      .style("width", "100px")
      .style("height", "30px")
      .style("border-radius", "5px")
      .style("background", value)
      .style("font-size", "12px")
})
)}

function _33(select,d3){return(
select({
  title: "SPINNING SELECT",
  desc: "LET'S ROLL!",
  options: {
    I: "SPIN",
    LIKE: "TO",
    TOOOOO: "LIKE",
    SPIN: "I"
  },
  selectStyle: {
    background: "#FF72AF"
  },
  divStyle: {
    width: "160px",
    "font-size": "1px"
  },
  theme: "white",
  onchange: ({ div }) =>
    d3
      .select(div)
      .transition()
      .duration(250)
      .style("transform", `rotate(300deg)`)
      .transition()
      .ease(d3.easeBounce)
      .duration(750)
      .style("transform", `rotate(0deg)`)
})
)}

function _34(md){return(
md`---
## API`
)}

function _35(md){return(
md`
~~~js
function select({
~~~
**options**
~~~js
  options: {
    option1: value1,
    option2: value2,
    ...
  },
~~~
Either dict or list, e.g. <code>['a', 'b', 'c']</code> will become <code>{'a': 'a', 'b': 'b', 'c': 'c'}.</code>
<hr>
~~~js
  selected: option1, // initially selected option
  title: 'some title',
  desc: 'some description',
~~~
<hr>
**[element]**

For the next two arguments, replace <code>[element]</code> with one of the following: <code>[title, select, additionalElement (caret), desc, div</code> *(element that ties the others together)*<code>].</code>
~~~js
  [element]Style: {
    width: '150px',
    color: 'white',
    ... // other CSS styles
  },
  [element]Attrs: {
    id: 'select1',
    cla‎ss: 'cool-select',
    ... // other attributes
  },
~~~
<hr>
~~~js
  theme: 'white', // one of [default, white],
  initialize: true, // if false, onchange won't be triggered when input is created
~~~
<hr>
**onchange**
~~~js
  onchange: (objs) => {
    // 🧙‍♀️ magic stuff happens here 🧙‍♂️ \\\\
  }
~~~
<code>objs</code> object holds <code>title, button, desc, additionalElement (caret), div</code> elements. You can also update the select's value by using <code>objs.div.update</code> method.
~~~js
})
~~~ 
`
)}

function _36(md){return(
md`---
## Buttons`
)}

function _37(md){return(
md`~~~js
import { button } from "@bartok32/diy-inputs"
~~~`
)}

function _38(button){return(
button({
  value: "REGULAR BUTTON",
  desc: "SO REGULAR.",
  buttonStyle: {
    background: "#7EE5A0",
    color: "#1A1A26"
  }
})
)}

function _39(button,d3){return(
button({
  value: "PRESS-VISIBLE BUTTON",
  desc: "SO CLICKY.",
  buttonStyle: {
    background: "#6B6B99",
    color: "white"
  },
  onclick: ({ button }) =>
    d3
      .select(button)
      .style("background", "#505072")
      .interrupt()
      .transition()
      .duration(300)
      .style("background", "#6B6B99")
})
)}

function _40(button,$0,d3){return(
button({
  title: "COUNTER-IMITATING BUTTON",
  value: "CLICK ME!",
  desc: "SO MANY CLICKS...",
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

function _count(){return(
0
)}

function _42(md){return(
md`**Inline buttons.**`
)}

function _43(html,button,$0,d3){return(
html`
${button({
  title: "🐟",
  value: "JUST",
  divStyle: {
    display: "inline-block"
  },
  buttonStyle: {
    background: "#CCE9FF"
  },
  titleStyle: {
    "text-align": "center"
  },
  onclick: ({ button }) => {
    $0.value = "FIN...";

    d3.select(button)
      .style("background", "#B2DFFF")
      .interrupt()
      .transition()
      .duration(300)
      .style("background", "#CCE9FF");
  }
})}

${button({
  title: "🐬🐬",
  value: "KEEP",
  divStyle: {
    display: "inline-block",
    "margin-left": "5px"
  },
  buttonStyle: {
    background: "#B2DFFF"
  },
  titleStyle: {
    "text-align": "center"
  },
  onclick: ({ button }) => {
    $0.value = "FINDING...";

    d3.select(button)
      .style("background", "#99D4FF")
      .interrupt()
      .transition()
      .duration(300)
      .style("background", "#B2DFFF");
  }
})}

${button({
  title: "🐠🐠🐠",
  value: "SWIMMING",
  divStyle: {
    display: "inline-block",
    "margin-left": "5px"
  },
  buttonStyle: {
    background: "#99D4FF"
  },
  titleStyle: {
    "text-align": "center"
  },
  onclick: ({ button }) => {
    $0.value = "FINDING NEMO";

    d3.select(button)
      .style("background", "#7FC9FF")
      .interrupt()
      .transition()
      .duration(300)
      .style("background", "#99D4FF");
  }
})}
`
)}

function _guessTheMovie(){return(
''
)}

function _45(md){return(
md`**Bonus:** single-use button. Click only after a careful consideration!`
)}

function _singleUseButton(button,d3){return(
button({
  value: "YOCO*!",
  buttonStyle: {
    background: "#F4ED47",
    "font-weight": 600,
    width: "70px",
    height: "70px",
    border: "1px solid black",
    "border-radius": "50%"
  },
  divStyle: {
    width: "125px",
    "text-align": "center"
  },
  onclick: ({ button, div }) =>
    d3
      .select(button)
      .transition()
      .duration(400)
      .style("width", "0px")
      .style("height", "0px")
      .style("font-size", "0px")
      .style("opacity", 0)
      .on("end", () => {
        div.update("it was nice to meet yooooou...");
        div.remove();
      })
})
)}

function _47(md,singleUseButton){return(
md`Button says: **${singleUseButton}**

<small>*You Only Click Once.</small>`
)}

function _48(md){return(
md`---
## API`
)}

function _49(md){return(
md`
~~~js
function button({
~~~
~~~js
  value: "button's label",
  title: 'some title',
  desc: 'some description',
~~~
<hr>
**[element]**

For the next two arguments, replace <code>[element]</code> with one of the following: <code>[title, button, desc, div</code> *(element that ties the others together)*<code>].</code>
~~~js
  [element]Style: {
    width: '150px',
    color: 'white',
    ... // other CSS styles
  },
  [element]Attrs: {
    id: 'button1',
    class: 'cool-button',
    ... // other attributes
  },
~~~
<hr>
~~~js
  theme: 'white', // one of [default, white]
  initialize: false, // if true, onclick will be triggered when input is created
~~~
<hr>
**onclick**

~~~js
  onclick: (objs) => {
    // 🧙‍♀️ magic stuff happens here 🧙‍♂️ \\\\
  }
~~~
<code>objs</code> object holds <code>title, button, desc, div</code> elements. You can also update the button's value by using <code>objs.div.update</code> method.

Check the code of the examples above, to see how you can use all of them!
~~~js
})
~~~ 
`
)}

function _50(md){return(
md`If you have any thoughts or suggestions please leave a comment or fork this notebook!`
)}

function _51(md){return(
md`---
## Appendix`
)}

function _52(md){return(
md`---
### Functions`
)}

function _input(setGlobalStyles,createElement){return(
(settings = {}, type) => {
  if (typeof settings !== "object") {
    return "Please provide a value!";
  }

  const theme = settings.theme ? settings.theme : "default",
    initialize =
      settings.initialize != undefined
        ? settings.initialize
        : type === "button"
        ? false
        : true,
    on =
      type == "button" ? "onclick" : type === "select" ? "onchange" : "oninput";

  setGlobalStyles(theme);

  const objs = {
    title: createElement("title", settings.title, theme, settings),
    desc: createElement("desc", settings.desc, theme, settings),
    output:
      type === "slider"
        ? createElement("output", settings.value, theme, settings)
        : type == "checkbox"
        ? createElement("output", settings.label, theme, settings)
        : "",
    settings,
    value: settings.value
  };

  objs.additionalElement = settings.additionalElement
    ? createElement(
        settings.additionalElement.name,
        settings.additionalElement.value,
        theme,
        settings
      )
    : "";

  (objs[type] = createElement(type, settings.value, theme, settings)),
    (objs.div = createElement(
      "div",
      [objs.title, objs[type], objs.output, objs.additionalElement, objs.desc],
      theme,
      settings
    ));

  if (type === "slider") {
    objs.div.min = settings.min;
    objs.div.max = settings.max;
    objs.div.step = settings.step;
  }

  objs[type][on] = () => {
    if (!settings.preventUpdate) {
      objs.div.update();
    }
    if (type === "slider")
      objs.progress =
        (objs.value - settings.min) / (settings.max - settings.min);
    if (settings.utilities) {
      for (let [key, func] of Object.entries(settings.utilities)) {
        func(settings[key], objs);
      }
    }
    if (settings[on]) settings[on](objs);
  };

  objs.div.update = (value = objs[type].value || settings.value) => {
    value = isNaN(value) ? value : +value;

    if (type === "checkbox" && objs.value != false) {
      value = false;
    } else if (type === "checkbox") {
      value = settings.value;
    }

    objs.value = value;
    if (type != "select") {
      objs[type].value = value;
    }

    objs.div.value = objs.value;
    if (type != "checkbox" && objs.output) {
      objs.output.textContent = objs.value;
    }

    objs.div.dispatchEvent(new CustomEvent("input", { bubbles: true }));
  };

  if (settings.preventUpdate) objs.div.update();
  if (initialize) {
    objs[type][on]();
  } else if (!settings.preventUpdate) {
    objs.div.update();
  }

  return objs.div;
}
)}

function _button(input){return(
(settings = {}) => {
  if (typeof settings == "string") {
    return input({ value: settings }, "button");
  } else {
    return input(settings, "button");
  }
}
)}

function _checkbox(input){return(
(settings = {}) => {
  if (typeof settings == "string") {
    return input({ value: settings }, "checkbox");
  } else {
    return input(settings, "checkbox");
  }
}
)}

function _select(input){return(
(settings = {}) => {
  if (
    typeof settings.options != "object" ||
    Object.keys(settings.options).length == 0
  ) {
    return "Please provide at least one option!";
  }

  if (Array.isArray(settings.options)) {
    settings.options = settings.options.reduce(
      (obj, key) => Object.assign(obj, { [key]: key }),
      {}
    );
  }

  let options = "";
  for (let [key, value] of Object.entries(settings.options)) {
    options += `<option ${
      key == settings.selected ? "selected" : ""
    } value = '${value}'>${key}</option>`;
  }

  settings.value = options;
  settings.additionalElement = {
    name: "caret",
    value: `<path d = 'M0,1.5 6,8.5 12,1.5'>`
  };

  return input(settings, "select");
}
)}

function _slider(setSliderBackground,highlightSlider,input){return(
(settings = {}) => {
  settings.min =
    settings.min == undefined ? settings.max - 1 || 0 : settings.min;
  settings.max =
    settings.max == undefined ? settings.min + 1 || 1 : settings.max;
  settings.value =
    settings.value == undefined
      ? (settings.min + settings.max) / 2
      : settings.value;
  settings.step =
    settings.step ||
    (settings.max > settings.min
      ? (settings.max - settings.min) / 10
      : (settings.min - settings.max) / 10) ||
    0.1;

  settings.utilities = {};

  if (settings.background) {
    settings.utilities.background = setSliderBackground;
  }

  if (settings.highlight) {
    settings.utilities.highlight = highlightSlider;
  }

  return input(settings, "slider");
}
)}

function _createElement(html){return(
(type, text = "", theme = "", settings = "") => {
  if (text == undefined) return "";
  text = type != "slider" && type != "checkbox" ? text : "";

  let typesMapping = {
    title: {
      tag: "div",
      mandatoryAttrs: { class: "title" }
    },
    button: {
      tag: "button",
      mandatoryAttrs: {}
    },
    checkbox: {
      tag: "input",
      mandatoryAttrs: {
        type: "checkbox",
        value: settings.value
      }
    },
    select: {
      tag: "select",
      mandatoryAttrs: {}
    },
    slider: {
      tag: "input",
      mandatoryAttrs: {
        type: "range",
        min: settings.min,
        max: settings.max,
        step: settings.step,
        value: settings.value
      }
    },
    output: {
      tag: "span",
      mandatoryAttrs: { class: "output" }
    },
    desc: {
      tag: "div",
      mandatoryAttrs: { class: "desc" }
    },
    div: {
      tag: "div",
      mandatoryAttrs: { class: `input-${theme}` }
    },
    caret: {
      tag: "svg",
      mandatoryAttrs: { class: "caret" }
    }
  };

  let el = html`<${typesMapping[type].tag}>${text}</${typesMapping[type].tag}>`;
  Object.entries(typesMapping[type].mandatoryAttrs).forEach((d) =>
    el.setAttribute(d[0], d[1])
  );

  if (typeof settings[type + "Attrs"] == "object")
    Object.entries(settings[type + "Attrs"]).forEach((d) => {
      if (d[0] == "class") el.classList.add(d[1]);
      else el.setAttribute(d[0], d[1]);
    });

  if (typeof settings[type + "Style"] == "object")
    Object.entries(settings[type + "Style"]).forEach(
      (d) => (el.style[d[0]] = d[1])
    );

  return el;
}
)}

function _setGlobalStyles(d3,themes){return(
function (style) {
  d3.selectAll(".inputStyles")
    .data([style])
    .enter()
    .append("style")
    .attr("class", "inputStyles")
    .html(themes);
}
)}

function _highlightSlider(){return(
(settings, objs) => {
  settings.lowerAdj =
    (100 * (settings.lower - objs.settings.min)) /
    (objs.settings.max - objs.settings.min);
  settings.upperAdj =
    (100 * (settings.upper - objs.settings.min)) /
    (objs.settings.max - objs.settings.min);

  if (settings.preventUpdate) objs.settings.preventUpdate = true;

  if (
    +objs.slider.value == settings.lower ||
    +objs.slider.value == settings.upper
  ) {
    objs.div.update(objs.slider.value);
  }

  if (
    +objs.slider.value < settings.lower ||
    +objs.slider.value > settings.upper
  ) {
    objs.div.update(objs.slider.value);

    objs.slider.style.background = `linear-gradient(90deg,
      ${settings.colors.normal} ${settings.lowerAdj}%,
      ${settings.colors.inactive} ${settings.lowerAdj}%,
      ${settings.colors.inactive} ${settings.upperAdj}%,
      ${settings.colors.normal} 0%)`;
  } else {
    objs.slider.style.background = `linear-gradient(90deg,
      ${settings.colors.normal} ${settings.lowerAdj}%,
      ${settings.colors.active} ${settings.lowerAdj}%,
      ${settings.colors.active} ${settings.upperAdj}%,
      ${settings.colors.normal} 0%)`;
  }
}
)}

function _setSliderBackground(d3){return(
(settings, objs) => {
  let type = settings.type,
    color = settings.color,
    colors = settings.colors,
    progress = objs.progress,
    interpolation = settings.interpolation,
    custom = false;

  if (!interpolation) interpolation = d3.interpolate;
  else custom = true;

  type == "normal"
    ? (objs.slider.style.background = color)
    : type == "double"
    ? (objs.slider.style.background = `linear-gradient(90deg, ${colors[0]} ${
        progress * 100
      }%, ${colors[1]} 0%)`)
    : type == "interpolate"
    ? (objs.slider.style.background = custom
        ? interpolation(progress)
        : interpolation(colors[0], colors[1])(progress))
    : type == "progress"
    ? custom
      ? (objs.slider.style.background = `linear-gradient(90deg, ${interpolation(
          progress
        )} ${progress * 100}%, ${color || interpolation(0)} 0%)`)
      : (objs.slider.style.background = `linear-gradient(90deg, ${interpolation(
          colors[0],
          colors[1]
        )(progress)} ${progress * 100}%, ${colors[2] || colors[0]} 0%)`)
    : 0;
}
)}

function _62(md){return(
md`---
### CSS`
)}

function _themes(){return(
`
.input-default button, .input-white button, .input-default select, .input-white select {
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  opacity: 0.9;
  height: 30px;
  margin-left: 0px;
  padding: 5px 10px 5px 10px;
  background: #EFEFEF;
  border: 0.5px solid white;
  border-radius: 5px;
  color: #262626;
  font-family: Avenir, Arial;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.input-white button, .input-white select {
  color: white;
}

.input-default select, .input-white select {
  padding-right: 29px;
}

.input-default .caret, .input-white .caret {
  width: 12px;
  height: 10px;
  margin-left: -24px;
  fill: black;
  pointer-events: none;
  opacity: 0.75;
}

.input-white .caret {
  fill: white;
}

.input-default input[type = 'range'], .input-default-thin input[type = 'range'], .input-default-round input[type = 'range'], .input-white input[type = 'range'], .input-white-thin input[type = 'range'], .input-white-round input[type = 'range'] {
  appearance: none;
  -webkit-appearance: none;
  width: 200px;
  height: 5px;
  border-radius: 1px;
  background: #E5E5E5;
}

.input-default input[type = 'range']::-webkit-slider-thumb, .input-white input[type = 'range']::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  background: #545454;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.input-white input[type = 'range']::-webkit-slider-thumb {
  background: #FCFCFC;
  border: 1px solid #545454;
}

.input-default-thin input[type = 'range']::-webkit-slider-thumb, .input-white-thin input[type = 'range']::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 7.5px;
  height: 20px;
  background: #545454;
  cursor: pointer;
  border: none;
  border-radius: 2.5px;
}

.input-white-thin input[type = 'range']::-webkit-slider-thumb {
  background: #FCFCFC;
  border: 1px solid #545454;
}

.input-default-round input[type = 'range']::-webkit-slider-thumb, .input-white-round input[type = 'range']::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  background: #545454;
  cursor: pointer;
  border: none;
  border-radius: 7.5px;
}

.input-white-round input[type = 'range']::-webkit-slider-thumb {
  background: #FCFCFC;
  border: 1px solid #545454;
}

input[type = 'range']:focus {
  outline: none;
}

.output {
  margin-left: 5px;
  color: #262626;
  font-family: Courier;
  font-size: 14px;
}

.title {
  margin-bottom: 3.5px;
  margin-left: 2.5px;
  color: black;
  font-family: Avenir, Arial;
  font-size: 14px;
  font-weight: 600;
}

.desc {
  margin-top: 6px;
  margin-left: 2.5px;
  color: #4C4C4C;
  font-family: Avenir, Arial;
  font-size: 12px;
}
`
)}

function _64(md){return(
md`---
### Imports`
)}

function _d3(require){return(
require('d3@5')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["slider"], _8);
  main.variable(observer()).define(["slider"], _9);
  main.variable(observer()).define(["slider"], _10);
  main.variable(observer()).define(["slider"], _11);
  main.variable(observer()).define(["slider"], _12);
  main.variable(observer()).define(["slider"], _13);
  main.variable(observer()).define(["slider"], _14);
  main.variable(observer()).define(["slider"], _15);
  main.variable(observer()).define(["slider"], _16);
  main.variable(observer()).define(["slider","d3"], _17);
  main.variable(observer()).define(["slider"], _18);
  main.variable(observer()).define(["slider","d3"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md","slider","mutable S0___MANY___CAND13S"], _21);
  main.define("initial S0___MANY___CAND13S", _S0___MANY___CAND13S);
  main.variable(observer("mutable S0___MANY___CAND13S")).define("mutable S0___MANY___CAND13S", ["Mutable", "initial S0___MANY___CAND13S"], (M, _) => new M(_));
  main.variable(observer("S0___MANY___CAND13S")).define("S0___MANY___CAND13S", ["mutable S0___MANY___CAND13S"], _ => _.generator);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["slider","d3"], _24);
  main.variable(observer()).define(["slider","d3"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["select","d3"], _30);
  main.variable(observer()).define(["select","d3"], _31);
  main.variable(observer()).define(["select","d3"], _32);
  main.variable(observer()).define(["select","d3"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["button"], _38);
  main.variable(observer()).define(["button","d3"], _39);
  main.variable(observer()).define(["button","mutable count","d3"], _40);
  main.define("initial count", _count);
  main.variable(observer("mutable count")).define("mutable count", ["Mutable", "initial count"], (M, _) => new M(_));
  main.variable(observer("count")).define("count", ["mutable count"], _ => _.generator);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["html","button","mutable guessTheMovie","d3"], _43);
  main.define("initial guessTheMovie", _guessTheMovie);
  main.variable(observer("mutable guessTheMovie")).define("mutable guessTheMovie", ["Mutable", "initial guessTheMovie"], (M, _) => new M(_));
  main.variable(observer("guessTheMovie")).define("guessTheMovie", ["mutable guessTheMovie"], _ => _.generator);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("viewof singleUseButton")).define("viewof singleUseButton", ["button","d3"], _singleUseButton);
  main.variable(observer("singleUseButton")).define("singleUseButton", ["Generators", "viewof singleUseButton"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","singleUseButton"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("input")).define("input", ["setGlobalStyles","createElement"], _input);
  main.variable(observer("button")).define("button", ["input"], _button);
  main.variable(observer("checkbox")).define("checkbox", ["input"], _checkbox);
  main.variable(observer("select")).define("select", ["input"], _select);
  main.variable(observer("slider")).define("slider", ["setSliderBackground","highlightSlider","input"], _slider);
  main.variable(observer("createElement")).define("createElement", ["html"], _createElement);
  main.variable(observer("setGlobalStyles")).define("setGlobalStyles", ["d3","themes"], _setGlobalStyles);
  main.variable(observer("highlightSlider")).define("highlightSlider", _highlightSlider);
  main.variable(observer("setSliderBackground")).define("setSliderBackground", ["d3"], _setSliderBackground);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer("themes")).define("themes", _themes);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
