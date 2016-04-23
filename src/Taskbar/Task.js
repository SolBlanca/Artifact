import React from 'react';

class Task extends React.Component
{
	render() 
	{
		var classes = [
			'Task'
		];

		return (
			<div className={classes}>
				<div className='group'>Market / Nyse</div>
				<div className='name'>Microsoft</div>
			</div>
		);
	}
}

export default Task;