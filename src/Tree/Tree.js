import React, {PropTypes} from 'react';

class Tree extends React.Component
{
	constructor(props)
	{ 
		super(props);
		this.state = {collapsed: this.props.defaultCollapsed};
	}

	handleClick(...args) {
		this.setState({collapsed: !this.state.collapsed});
		if (this.props.onClick) {
			this.props.onClick(...args);
		}
	}
 
	render() {
		var {
			collapsed = this.state.collapsed,
			className = '',
			itemClassName = '',
			nodeLabel,
			children,
			...rest,
		} = this.props;

		className = 'Tree';
		if (collapsed) {
			className += ' Tree-collapsed';
		}

		const arrow =
			(<div
				{...rest}
				className='Tree-handle'
				onClick={this.handleClick.bind(this)}>
			</div>);

		return (
			<div className={className}>
				<div className='Tree-label'>
					{arrow}
					{nodeLabel}
				</div>
				<div className='Tree-container'>
					{children}
				</div>
			</div>
		);
	}
}

Tree.propTypes = {
	collapsed: PropTypes.bool,
	defaultCollapsed: PropTypes.bool,
	nodeLabel: PropTypes.node.isRequired,
	className: PropTypes.string,
	itemClassName: PropTypes.string,
};

export default Tree;