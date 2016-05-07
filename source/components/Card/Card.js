import React from 'react';

class Card extends React.Component
{
	render() 
	{
		var styles = {
			
		};

		var classes = [
			'Card'
		];

		return (
			<div className={classes} style={styles}>
				<div className='Card-inner'>
					{ this.props.children }
				</div>
			</div>
		);
	}
}

export default Card;