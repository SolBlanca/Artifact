import React from 'react';
import ReactDom from 'react-dom';
import d3 from 'd3';

class Slider extends React.Component
{
	constructor(props) 
	{
		super(props);

		const {min, max} = props;
		const defaultValue = ('defaultValue' in props ? props.defaultValue : min);
		const value = (props.value !== undefined ? props.value : defaultValue );

		this.state = {
			value: value,
		};
	}

	element()
	{
		return ReactDom.findDOMNode(this);
	}

	render() 
	{
		var styles = {
			
		};

		var classes = [
			'Button'
		];

		return (
			<div className='Slider'>
			</div>
		);
	}

	componentWillReceiveProps () {

	}

	componentDidMount () {
		var element = this.element();
		var drag = d3.behavior.drag();
		var scale = d3.scale.linear()
			.domain([0, 100])
			.range([0, element.offsetWidth - 20]);
		var axis = d3.svg.axis()
			.scale(scale)
			.tickSize(8);

		var slider = d3.select(element);
		var track = slider.append('div')
			.classed('Track', true);
		var progress = slider.append('div')
			.classed('Progress', true)
			.style('width', 4 + 'px');
		var handle = slider.append('div')
			.classed('Handle', true)
        	.on("click", () => {})
			.call(drag);

		slider.append('svg')
    		.attr("width", '100%')
			.append("g")
				.attr("transform", "translate(10,6)")
				.call(axis);


		drag.on('dragend', (() => {
        	var pos = Math.max(0, Math.min(element.offsetWidth - 20, d3.event.x));
        	var percent = pos / (element.offsetWidth - 20);
        	var value = +this.props.min + percent * (+this.props.max - +this.props.min);

        	console.log(value);

			this.setState({
				value: value
			})
		}).bind(this));

		drag.on('drag', () => {
        	var pos = Math.max(0, Math.min(element.offsetWidth - 20, d3.event.x));
        	handle.style('left', pos + 'px');
        	progress.style('width', (pos + 4) + 'px')
		});


	}

	componentDidUpdate () {
		console.log('update');
	}
}

Slider.propTypes = {
	min: React.PropTypes.number,
	max: React.PropTypes.number,
}

Slider.defaultProps = {
	min: 0,
	max: 100,
}

export default Slider;