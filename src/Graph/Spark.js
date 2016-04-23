import React from 'react';
import ReactDom from 'react-dom';
import d3 from 'd3';

class Spark extends React.Component
{
	constructor(props) 
	{
		super(props);
	}

	componentDidMount () {
		var element = ReactDom.findDOMNode(this);
		var props = this.props;

		this.data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 9];

		for (var i = 1; i < this.data.length; i++) {
			this.data[i] = this.data[i - 1] + Math.random() * 2 - 1;
		}

		// reference to svg element containing circles
		this.svg = d3.select(element)
			.append('svg')
			.attr("width", "100%")
			.attr("height", "100%");

		// reference to html element containing text
		this.html = d3.select(element).append('div')
			.attr('class', 'bubble-chart-text');

		var size = {
			width: element.offsetWidth,
			height: element.offsetHeight
		}

		this.xScale = d3.scale
			.linear()
			.domain([0, this.data.length])
			.range([3, size.width - 3]);

		this.yScale = d3.scale
			.linear()
			.domain([-5, 15])
			.range([0, size.height]);

		this.svg.append("svg:circle")
			.attr("cx", this.xScale(this.data.length - 1) + 0.5)
			.attr("cy", this.yScale(this.data[ this.data.length - 1]))
			.attr("r", 2);

		/*
		this.svg.append("svg:circle")
			.attr("cx", this.xScale(0) - 0.5)
			.attr("cy", this.yScale(this.data[ 0 ]))
			.attr("r", 2)
			.style("fill", "blue")
			.style("stroke", "white");
		*/

		this.componentDidUpdate();
	}

	componentDidUpdate () {
		var element = ReactDom.findDOMNode(this);
		var data = this.data;

		if (!data) return;

		// assign new data to existing DOM for circles and labels
		var line = d3.svg.line()
			.x((d, i) => this.xScale(i))
			.y((d, i) => this.yScale(d))
			.interpolate("monotone");

		this.svg.insert("svg:path", ":first-child").attr("d", line(data));



	}

	componentWillUnmount () {
	}

	render() 
	{
		return <div className="Spark"></div>;
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

export default Spark;