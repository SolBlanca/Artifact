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

		var props = this.props;

		var px = 0;

		var slider = this.slider = d3.select(element);
		var track = this.track = slider.append('div')
			.classed('Track', true)
			.call(drag)
        	.on('mousedown', () =>{
	        	var percent = d3.event.layerX / track.node().offsetWidth;
				var position = ( this.slider.node().offsetWidth - 20 ) * percent;
				px = percent;

				slider.classed('tracking', true);
	        	handle.style('left', position + 'px');
	        	progress.style('width', (position + 4) + 'px');
			});
		var progress = this.progress = slider.append('div')
			.classed('Progress', true)
			.style('width', 4 + 'px')
			.call(drag)
        	.on('mousedown', () =>{
	        	var percent = d3.event.layerX / track.node().offsetWidth;
				var position = ( this.slider.node().offsetWidth - 20 ) * percent;
				px = percent;

				slider.classed('tracking', true);
	        	handle.style('left', position + 'px');
	        	progress.style('width', (position + 4) + 'px');
			});
		var handle = this.handle =  slider.append('div')
			.classed('Handle', true)
			.call(drag);

		slider.append('svg')
    		.attr("width", '100%')
			.append("g")
				.attr("transform", "translate(10,6)")
				.call(axis);



		drag.on('dragstart', () =>{
			slider.classed('tracking', true);
			d3.event.sourceEvent.preventDefault();
		});

		drag.on('dragend', () => {
        	var percent = px;
        	var value = props.min + percent * (props.max - props.min);

			this.setState({
				value: value
			})

			slider.classed('tracking', false);
		});

		drag.on('drag', () => {
        	var pos = Math.max(0, Math.min(element.offsetWidth - 20, d3.event.x - 10));
        	var percent = pos / (element.offsetWidth - 20);
        	px = percent;

        	handle.style('left', pos + 'px');
        	progress.style('width', (pos + 4) + 'px')
		});


	}

	componentDidUpdate () {
		var percent = ( Math.round(this.state.value) - this.props.min ) / (this.props.max - this.props.min);
		var position = ( this.slider.node().offsetWidth - 20 ) * percent;

    	this.handle.style('left', position + 'px');
    	this.progress.style('width', (position + 4) + 'px')
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