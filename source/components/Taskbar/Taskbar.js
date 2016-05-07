import React from 'react';

class Taskbar extends React.Component
{
	render() 
	{
		var classes = [
			'Taskbar'
		];

		return (
			<div className={classes}>
				{ this.props.children }
			</div>
		);
	}
}

export default Taskbar;