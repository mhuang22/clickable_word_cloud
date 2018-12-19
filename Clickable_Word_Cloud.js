var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Read data
data = d3.json("Word_Value_Original.json").then(function (d) {
    words = d.text
    url = d.url
    /* If the size is not defined, randomly generate a number for the size of a word */
    // for (var i = 0; i < d.length; i++) {
    //     d[i].size = 10 + Math.abs(Math.random()) * 90;
    // }
    size = (+d.size) * 1000

    // console.log("wc3-d: ")
    // console.log(d)

    /* Construct a new cloud layout instance
    layout is created by Jason Davies, https://www.jasondavies.com/wordcloud/
    */
    var layout = d3.layout.cloud()
        .size([width, height])
        .timeInterval(200)
        .words(d)
        .rotate(function () { return ~~(Math.random() * 2) * 90; }) // every word is either vertical or horizontal, not diagonal
        .font("Impact")
        .fontSize(function (d) { return d.size * 300; }) // adjust the fontsize depends on d.size
        .fontWeight(["bold"])
        .text(function (d) { return d.text; })
        .spiral("archimedean") // these are the 2 built-in spirals: "archimedean" or "rectangular"
        .on("end", draw)
        .start();
});


function draw(words) {
    var color = d3.scaleOrdinal(d3.schemePaired);
    d3.select("#wc_json")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
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




