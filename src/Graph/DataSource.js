import React from 'react';
import ReactDom from 'react-dom';
import d3 from 'd3';

class DataSource extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			data: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ]
		}

		setTimeout(this.increment.bind(this), 1000);
	}

	increment()
	{
		var d = [];
		for (var i = 0; i < this.state.data.length; i++) {
			d.push({
				x: Math.random() * 300,
				y: Math.random() * 300
			});
		}

		this.setState({data: d});

		setTimeout(this.increment.bind(this), 1000);
	}

	render()
	{
		return (
			<div>
				{React.cloneElement(this.props.children, { data: this.state.data })}
			</div>
		);
	}
}

export default DataSource;