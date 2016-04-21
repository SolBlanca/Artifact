import React from 'react';
import ReactDom from 'react-dom';
import d3 from 'd3';

class Graph extends React.Component
{
	constructor(props) 
	{
		super(props);
	}

	componentDidMount () {
		var element = ReactDom.findDOMNode(this);
		var props = this.props;

		// reference to svg element containing circles
		this.svg = d3.select(element).append('svg')
			.attr('class', 'bubble-chart-d3');

		// reference to html element containing text
		this.html = d3.select(element).append('div')
			.attr('class', 'bubble-chart-text');

		var margins = {
			left: 50,
			right: 20,
			top: 20,
			bottom: 40
		};

		var size = {
			width: 300,
			height: 300
		}

		var xScale = d3.scale
			.linear()
			.range([margins.left, size.width - margins.right])
			.domain([0,300]);

		var yScale = d3.scale
			.linear()
			.range([size.height - margins.bottom, margins.top])
			.domain([0, 300]);

		var xAxis = d3.svg
			.axis()
			.scale(xScale)
			.ticks(3)
			.orient("bottom");

		var yAxis = d3.svg
			.axis()
			.scale(yScale)
			.ticks(8)
			.orient("left");

		this.svg
			.append("g")
			.attr("class", "axis")
        	.attr("transform", "translate(0," + ( size.height - margins.bottom ) + ")")
			.call(xAxis);

		this.svg
			.append("g")
			.attr("class", "axis")
        	.attr("transform", "translate(" + margins.left + ",0)")
			.call(yAxis);

		this.componentDidUpdate();
	}

	componentDidUpdate () {
		var element = ReactDom.findDOMNode(this);
		var data = this.props.data;

		if (!data) return;

		var margins = {
			left: 50,
			right: 20,
			top: 20,
			bottom: 40
		};

		var size = {
			width: 300,
			height: 300
		}

		var xScale = d3.scale
			.linear()
			.range([margins.left, size.width - margins.right])
			.domain([0,300]);

		var yScale = d3.scale
			.linear()
			.range([size.height - margins.bottom, margins.top])
			.domain([0, 300]);

		// assign new data to existing DOM for circles and labels
		var circles = this.svg.selectAll('circle')
			.data(data);

		circles
			.transition()
				.duration(500)
				.attr('transform', (d) => 'translate(' + xScale(d.x) + ',' + yScale(d.y) + ')')
				.attr('r', (d) => Math.random() * 8 + 2);

		if (data.length)
		{
			circles.enter().append('circle')
				.attr('transform', (d) => 'translate(' + xScale(d.x) + ',' + yScale(d.y) + ')')
				.attr('r', (d) => Math.random() * 8 + 2);
		}

		// code to handle update
		// code code code code code

		// code to handle initial render
		// code code code code code

		// code to handle exit
		// code code code code code
	}

	componentWillUnmount () {
	}

	render() 
	{
		var styles = {
			width: "300px",
			height: "300px"
		};

		return <div className="hello" style={styles}></div>;
	}

	getDOMNode () {
		return ReactDom.findDOMNode(this);
	}

	static create(e, s)
	{

	}

	static update(e, s)
	{

	}
}

export default Graph;