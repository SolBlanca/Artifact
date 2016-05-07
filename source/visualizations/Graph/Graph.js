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

		this.svg = d3.select(element).append('svg')
		this.colors = d3.scale.category10();
		this.margins = {
			left: 50,
			right: 20,
			top: 20,
			bottom: 40
		};

		this.size = {
			width: 300,
			height: 300
		}

		this.xScale = d3.scale
			.linear()
			.range([this.margins.left, this.size.width - this.margins.right])
			.domain([0, 300]);

		this.yScale = d3.scale
			.linear()
			.range([this.size.height - this.margins.bottom, this.margins.top])
			.domain([0, 300]);

		var xAxis = d3.svg
			.axis()
			.scale(this.xScale)
			.ticks(3)
			.orient("bottom");

		var yAxis = d3.svg
			.axis()
			.scale(this.yScale)
			.ticks(8)
			.tickSize(-(this.size.width - this.margins.right - this.margins.left))
			.orient("left");

		this.svg
			.append("g")
			.attr("class", "x axis")
        	.attr("transform", "translate(0," + ( this.size.height - this.margins.bottom ) + ")")
			.call(xAxis);

		this.svg
			.append("g")
			.attr("class", "y axis")
        	.attr("transform", "translate(" + this.margins.left + ",0)")
			.call(yAxis);

		this.componentDidUpdate();
	}

	componentDidUpdate () {
		var element = ReactDom.findDOMNode(this);
		var data = this.props.data;

		if (!data) return;

		// assign new data to existing DOM for circles and labels
		var circles = this.svg.selectAll('circle')
			.data(data);

		circles
			.transition()
				.duration(500)
				.attr('transform', (d) => 'translate(' + this.xScale(d.x) + ',' + this.yScale(d.y) + ')')
				.attr('r', (d) => Math.random() * 8 + 2);

		if (data.length)
		{
			circles.enter().append('circle')
				.attr('transform', (d) => 'translate(' + this.xScale(d.x) + ',' + this.yScale(d.y) + ')')
				.attr('r', (d) => Math.random() * 8 + 2)
    			.attr("fill", (d,i) => this.colors(i) );
		}
	}

	componentWillUnmount () {
	}

	render() 
	{
		var styles = {
			width: "300px",
			height: "300px"
		};

		return (
			<div className="Graph" style={styles}>
				<div className="header">Asset Classes</div>
			</div>
		);
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