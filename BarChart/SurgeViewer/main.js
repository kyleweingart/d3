

var margin = { top: 20, right: 30, bottom: 30, left: 40 },
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

var data = [
  {
    "name": "S",
    "value": 2
  },
  {
    "name": "SSW",
    "value": 4
  },
  {
    "name": "SW",
    "value": 8
  },
  {
    "name": "WSW",
    "value": 5
  },
  {
    "name": "W",
    "value": 11
  },
  {
    "name": "WNW",
    "value": 16
  },
  {
    "name": "NW",
    "value": 6
  },
  {
    "name": "NNW",
    "value": 17
  },
  {
    "name": "N",
    "value": 21
  },
  {
    "name": "NNE",
    "value": 2
  },
  {
    "name": "NE",
    "value": 3
  },
  {
    "name": "ENE",
    "value": 3
  },
  {
    "name": "E",
    "value": 4
  },
  {
    "name": "ESE",
    "value": 17
  },
  {
    "name": "SE",
    "value": 22
  },
  {
    "name": "SSE",
    "value": 18
  },
  {
    "name": "PAR",
    "value": 5
  }
];

var topGraphPadding = 10;

// Create the svg to draw on
var svg = d3.select('.chart').append('svg')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)

svg.append('g')
  .attr('id', 'surge-chart-group')
  .attr("transform", "translate(100,10)");


// Draw a box to contain the chart
var chart = svg.append('rect')
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


yLabel.attr('transform', 'translate(48,' +
  (+chart.attr('height') / 1.75) + ')rotate(-90)');

// Add the x-axis label
svg.append('text')
  .attr('transform', 'translate(' + 12 + ',' + (+chart.attr('height') + 31) + ')')
  .attr('fill', 'black')
  .style('font-size', '14px')
  .style('font-family', 'sans-serif')
  .style('font-weight', 'bold')
  .text('Direction:');


var g = d3.select('#surge-chart-group');

// Setup x
var x = d3.scaleBand()
  .rangeRound([0,width])
  // .paddingInner(.1)
  .padding(0.2)
  .domain(data.map(function (d) { return d.name; }))
  
  // .range([5, width- 100]);
  .range([25, width - 125]);
this.xMap = function (d) {
  d = d.direction ? d.direction.toUpperCase() : d;
  return x(d);
};

var xAxis = d3.axisBottom().scale(x)
//   .tickSize(height, 0)
  .tickPadding(10);

//     // Setup y
var y = d3.scaleLinear()
  .domain([0, d3.max(data, function (d) { return d.value + 3; })])
  // .domain([-1, 20 + 3])
  .range([height, 0]);
this.yMap = function (d) {
  return y(d.surge || d);
};
var yAxis = d3.axisLeft().scale(y)
  .ticks(4)
  .tickPadding(12)
  .tickSize(-width + 100, 1);

// g.selectAll('.axis')
  // .selectAll('.tick:nth-last-child(n+2)')
  // .selectAll('line')
  // .style('stroke', 'black');


        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            // .attr("transform", "translate(-5, 0)")
            .call(xAxis);

        g.append("g")
            .attr("class", "y axis")
            .call(yAxis);

      g.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { console.log(d.name); return x(d.name); })
            .attr("y", function(d) { console.log(d.value); return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })
            .attr("width", x.bandwidth())
            .attr("stroke", gray);


         var tick =   g.selectAll('.tick');
          console.log(tick);


            
     

     












