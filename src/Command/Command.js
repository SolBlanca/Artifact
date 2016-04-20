import React from 'react';
import Input from '../Input'

class Command extends React.Component
{
	render() 
	{
		var styles = {
			'width': '100%',
			'background': '#000'
		};

		return (
			<div className='Command' style={styles}>
				Ascension
				<Input />
			</div>
		);
	}
}

export default Command;