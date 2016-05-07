import React from 'react';
import ReactDom from 'react-dom';
import d3 from 'd3';

class Slider extends React.Component {
	constructor( props ) {
		super( props );

		const {
			min,
			max
		} = props;
		const defaultValue = ( 'defaultValue' in props ? props.defaultValue : min );
		const value = ( props.value !== undefined ? props.value : defaultValue );

		this.state = {
			value: value,
		};
	}

	element() {
		return ReactDom.findDOMNode( this );
	}

	render() {
		return (
			<div className='Slider'>
			</div>
		);
	}

	componentWillReceiveProps() {

	}

	componentDidMount() {
		var element = this.element();

		this.drag = d3.behavior.drag();
		this.scale = d3.scale.linear()
			.domain( [ this.props.min, this.props.max ] )
			.range( [ 0, element.offsetWidth - 20 ] );
		this.axis = d3.svg.axis()
			.scale( this.scale )
			.tickSize( 8 );

		this.slider = d3.select( element );
		this.selection = this.slider.append( 'div' )
			.classed( 'Selection', true );

		this.track = this.slider.append( 'div' )
			.classed( 'Track', true )
			.call( this.drag )
			.on( 'mousedown', this.onMouseDown.bind( this ) )
			.on( 'mousemove', this.onMouseMove.bind( this ) )
			.on( 'mouseout', this.onMouseOut.bind( this ) );

		this.progress = this.slider.append( 'div' )
			.classed( 'Progress', true )
			.style( 'width', 4 + 'px' )
			.call( this.drag )
			.on( 'mousedown', this.onMouseDown.bind( this ) );

		this.handle = this.slider.append( 'div' )
			.classed( 'Handle', true )
			.call( this.drag );

		this.slider.append( 'svg' )
			.attr( "width", '100%' )
			.append( "g" )
			.attr( "transform", "translate(10,6)" )
			.call( this.axis );

		this.drag.on( 'dragstart', this.onDragStart.bind( this ) );
		this.drag.on( 'dragend', this.onDragEnd.bind( this ) );
		this.drag.on( 'drag', this.onDrag.bind( this ) );

		this.currentWidth = element.offsetWidth;

		this.resideHandler = this.onResize.bind( this );
		window.addEventListener( 'resize', this.resideHandler );
	}

	componentDidUpdate() {
		var percent = ( Math.round( this.state.value ) - this.props.min ) / ( this.props.max - this.props.min );
		var position = ( this.slider.node().offsetWidth - 20 ) * percent;

		this.handle.style( 'left', position + 'px' );
		this.progress.style( 'width', ( position + 4 ) + 'px' );

		if (this.props.onchange != undefined)
		{
			this.props.onchange(this.state.value);
		}

	}

	componentWillUnmount() {
		window.removeEventListener( 'resize', this.resideHandler );
	}

	onResize( e ) {
		var element = this.element();

		if ( element.offsetWidth == this.currentWidth )
			return;

		this.currentWidth = element.offsetWidth;
		this.scale
			.range( [ 0, element.offsetWidth - 20 ] );
		d3.select( element ).select( 'svg' ).select( 'g' ).call( this.axis );
	}

	onMouseDown() {
		this.percent = d3.event.layerX / this.track.node().offsetWidth;
		var position = ( this.slider.node().offsetWidth - 20 ) * this.percent;

		this.slider.classed( 'tracking', true );
		this.handle.style( 'left', position + 'px' );
		this.progress.style( 'width', ( position + 4 ) + 'px' );
	}

	onMouseMove() {
		var percent = d3.event.layerX / this.track.node().offsetWidth;
		var position = ( this.slider.node().offsetWidth - 20 ) * percent;

		this.selection.style( 'width', position + 'px' );
	}

	onMouseOut() {
		this.selection.style( 'width', '0px' );
	}

	onDragStart() {
		this.slider.classed( 'tracking', true );
		d3.event.sourceEvent.preventDefault();
	}

	onDrag() {
		var width = this.element().offsetWidth - 20;
		var position = Math.max( 0, Math.min( width, d3.event.x - 10 ) );
		this.percent = position / width;

		this.handle.style( 'left', position + 'px' );
		this.progress.style( 'width', ( position + 4 ) + 'px' );
	}

	onDragEnd() {
		var value = this.props.min + this.percent * ( this.props.max - this.props.min );
		this.slider.classed( 'tracking', false );

		this.setState( {
			value: value
		} );
	}
}

Slider.propTypes = {
	min: React.PropTypes.number,
	max: React.PropTypes.number,
}

Slider.defaultProps = {
	min: 0,
	max: 830,
}

export default Slider;