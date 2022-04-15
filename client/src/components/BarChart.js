import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { arc } from 'd3';

// pass in as prop.
const width = 400;
const height = 400;
const data = [
  {
    transactionDirection: 'Buy',
    transactionTicker: 'AAPL',
    transactionAmount: '1,000-15,000',
    transactionAmountSimplified: 7000,
    transactionDate: '4-10-22',
  },
  {
    transactionDirection: 'Sell',
    transactionTicker: 'VZ',
    transactionAmount: '1,000-15,000',
    transactionAmountSimplified: 2000,
    transactionDate: '4-8-22',
  },
  {
    transactionDirection: 'Buy',
    transactionTicker: 'BTC',
    transactionAmount: '1,000-15,000',
    transactionAmountSimplified: 8000,
    transactionDate: '4-1-22',
  },
]

function BarChart() {
  useEffect(() => {

    // prevents react from rendering again (Useeffect), if pieChart already exists
    if (!(document.getElementById('pieChartd3'))) {
      /*
          Credit to: https://d3-graph-gallery.com/graph/pie_basic.html and 
          https://stackoverflow.com/questions/58045895/getting-typeerror-d-is-undefined-for-d3-pie-chart-in-react
          and https://d3-graph-gallery.com/graph/pie_annotation.html
          as a placeholder visualization while we develop
          more complex d3 data visualizations
        */

      // generate pie chart
      // generate svg element
      const svg = d3.select('#pieChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('id', 'pieChartd3')
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      // generate color
      var color = d3.scaleOrdinal()
        .domain(data)
        .range(['#C70039', '#1ac0c6', '#581845']);

      const arcs = d3.pie()
        .value(d => d.transactionAmountSimplified)(data);

      const path = d3.arc()
        .innerRadius(0)
        .outerRadius(width / 2);

      svg
        .selectAll('slices')
        .data(arcs)
        .enter()
        .append('path')
          .attr('fill', d => {
            if (d.data) {
              return color(d.data.transactionAmountSimplified);
            }
          })
          .attr('stroke', 'black')
          .attr('d', path)
          .classed('arc', true);

      svg
        .selectAll('slices')
        .data(arcs)
        .enter()
        .append('text')
          .text(function(d) { return d.data.transactionTicker; })
          .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")";})
          .style("text-anchor", "moddle")
          .style("font-size", 17);
    }
  });

  return (
    <div>
      <h1>Owned Stocks</h1>
      <div id='pieChart'>
      </div>
    </div>
  )
}

export default BarChart;