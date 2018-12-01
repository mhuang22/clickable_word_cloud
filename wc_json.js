// var margin = { top: 100, right: 40, bottom: 20, left: 40 },
//     width = 800 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

var width = 800
var height = 500   

data = d3.json("wordcloud.json").then(function (d) {
    words = d.text
    url = d.url
    size = +d.size
    // randomly assign the size to a word 
    // for (var i = 0; i < d.length; i++) {
    //     d[i].size = 10 + Math.abs(Math.random()) * 90;
    // }

console.log("wc3-d: ")
console.log(d)

var layout = d3.layout.cloud()
    .size([width, height])
    // .timeInterval(20)
    .words(d)
    .rotate(function () { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function (d) { return d.size; })
    .fontWeight(["bold"])
    .text(function (d) { return d.text; })
    .spiral("archimedean") // "archimedean" or "rectangular"
    .on("end", draw)
    .start();
});


function draw(words) {
    var color = d3.scaleOrdinal(d3.schemePaired);
    d3.select("#wc_json")
        .append("svg")
        .attr("width",width)
        .attr("height", height)
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", function (d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function (d, i) { return color(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) { return d.text; })
        .on("click", function (d, i) {
            window.open(d.url, "_blank");
        });
};
