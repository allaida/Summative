document.addEventListener("DOMContentLoaded", function(event) {
    var svg = d3.select("#chart1"),
        margin = 80,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

  
        d3.csv("Dataset 1.csv", 

        // When reading the csv, I must format variables:
        function(d){
          return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
        },
      
        // Now I can use this dataset:
        function(data) {
      
          // Add X axis --> it is a date format
          var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([ 0, width ]);
          svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
      
          // Add Y axis
          var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return +d.value; })])
            .range([ height, 0 ]);
          svg.append("g")
          .attr("transform", "translate(40,10)")
            .call(d3.axisLeft(y));
      
          // Add the line
          svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
              .x(function(d) { return x(d.date) })
              .y(function(d) { return y(d.value) })
              )
        svg.append("text")
            .attr("x", width/2)
            .attr("y", margin/2)
            .attr("text-anchor","middle")
            .style("font-size","16px")
            .style("text-decoration", "underline")
            .style("color", "black")
            .text("A graph depicting the rise in sea level across the years")
      
            
      })

      
});

document.addEventListener("DOMContentLoaded", function(event) {
  var margin = {top: 0, right: 30, bottom: 40, left: 100},
  width = 600 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  // appending the svg object to the body of the page
  var svg = d3.select("#chart2")
  // .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)

  d3.csv("fossil-fuel-co2-emissions-by-nation_csv.csv", function(data) {

    // Add X axis
    var x = d3.scaleLinear()
      .domain([0, 2806634])
      .range([ 120, width+120]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Y axis
    var y = d3.scaleBand()
      .range([ 0, height ])
      .domain(data.map(function(d) { return d.Country; }))
      .padding(.1);
    svg.append("g")
    .attr("transform", "translate(120,0)")
      .call(d3.axisLeft(y))

    //Bars
    svg.selectAll("myRect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0) )
      .attr("y", function(d) { return y(d.Country); })
      .attr("width", function(d) { return x(d.Total); })
      .attr("height", y.bandwidth() )
      .attr("fill", "#69b3a2")
      .attr("transform", "translate(0,0)")

  })


      
});
