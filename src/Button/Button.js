import React from 'react';

class Button extends React.Component
{
	render() 
	{
		var styles = {
			border: 'none',
			fontSize: '40px'
		};

		return (
			<button style={styles}>Heyyy</button>
		);
	}
}

export default Button;