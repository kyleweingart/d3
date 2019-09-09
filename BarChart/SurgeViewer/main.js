var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var dirs = [
        'S',
        'SSW',
        'SW',
        'WSW',
        'W',
        'WNW',
        'NW',
        'NNW',
        'N',
        'NNE',
        'NE',
        'ENE',
        'E',
        'ESE',
        'SE',
        'SSE',
        'PAR'
      ];

// var x = d3.scale.ordinal()
//     .rangeRoundBands([0, width], .1);

// var y = d3.scale.linear()
//     .range([height, 0]);

// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom");

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left");

// var chart = d3.select(".chart")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// d3.tsv("data.tsv", type, function(error, data) {
//   x.domain(data.map(function(d) { return d.name; }));
//   y.domain([0, d3.max(data, function(d) { return d.value; })]);

//   chart.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis);

//   chart.append("g")
//       .attr("class", "y axis")
//       .call(yAxis);

//   chart.selectAll(".bar")
//       .data(data)
//     .enter().append("rect")
//       .attr("class", "bar")
//       .attr("x", function(d) { return x(d.name); })
//       .attr("y", function(d) { return y(d.value); })
//       .attr("height", function(d) { return height - y(d.value); })
//       .attr("width", x.rangeBand());
// });

// function type(d) {
//   d.value = +d.value; // coerce to number
//   return d;
// }

// var width = 490;
// var subWidth = width - 15;
// var height = 300;

function makeFrame() {
    var topGraphPadding = 10;

    // Create the svg to draw on
    var svg = d3.select('.chart').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    //   .style('width', '100%')
    //   .style('height', '100%');

    svg.append('g')
      .attr('id', 'surge-chart-group')
      .attr("transform", "translate(100,10)");
    //   .attr('transform', 'translate(100, ' + topGraphPadding + ')');
          
    // Draw a box to contain the chart
    var chartBox = svg.append('rect')
      .attr('id', 'surge-chart-box')
      .attr('width', width - 100)
      .attr('height', height)
      .attr('x', 100)
      .attr('y', topGraphPadding)
      .style('fill', 'rgba(0,0,0,0)')
      .style('stroke', 'black');

    // Add the y-axis label
    var yLabel = svg.append('text')
      .style('text-anchor', 'middle')
      .attr('fill', 'black')
      .style('font-size', '14px')
      .style('font-family', 'sans-serif')
      .style('font-weight', 'bold')
      .text('Surge Height (ft. - AGL)');

    console.log(chartBox);

    yLabel.attr('transform', 'translate(48,' +
        (+chartBox.attr('height') / 1.75) + ')rotate(-90)');

    // Add the x-axis label
    svg.append('text')
      .attr('transform', 'translate(' + 12 + ',' + (+chartBox.attr('height') + 31) + ')')
      .attr('fill', 'black')
      .style('font-size', '14px')
      .style('font-family', 'sans-serif')
      .style('font-weight', 'bold')
      .text('Direction:');
  }

  function makeGraph() {
    var g = d3.select('#surge-chart-group');

    g.selectAll('*').remove();

    // Setup x
    var xScale = d3.scalePoint()
      .domain(dirs)
      .range([0, width - 100]);
    this.xMap = function(d) {
      d = d.direction ? d.direction.toUpperCase() : d;
      return xScale(d);
    };
    var xAxis = d3.axisBottom().scale(xScale)
      .tickSize(height, 0)
      .tickPadding(12);

    // Setup y
    var yScale = d3.scaleLinear()
    //   .domain([-1, this.maxSurge + 3])
      .domain([-1, 20 + 3])
      .range([height, 0]);
    this.yMap = function(d) {
      return yScale(d.surge || d);
    };
    var yAxis = d3.axisLeft().scale(yScale)
      .ticks(4)
      .tickPadding(12)
      .tickSize(-width + 100, 1);

    // Create the axes
    g.append('g')
      .attr('class', 'x axis')
      .call(xAxis);
    g.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    g.selectAll('.axis')
      .selectAll('.tick:nth-last-child(n+2)')
      .selectAll('line')
      .style('stroke', 'black');

    g.selectAll('.x.axis')
      .selectAll('line')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '2,4')
      .style('stroke', 'grey');
  }

  

  makeFrame();
  makeGraph();
