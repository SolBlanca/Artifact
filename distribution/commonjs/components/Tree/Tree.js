'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree = function (_React$Component) {
	_inherits(Tree, _React$Component);

	function Tree(props) {
		_classCallCheck(this, Tree);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tree).call(this, props));

		_this.state = { collapsed: _this.props.defaultCollapsed };
		return _this;
	}

	_createClass(Tree, [{
		key: 'handleClick',
		value: function handleClick() {
			this.setState({ collapsed: !this.state.collapsed });
			if (this.props.onClick) {
				var _props;

				(_props = this.props).onClick.apply(_props, arguments);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props;
			var _props2$collapsed = _props2.collapsed;
			var collapsed = _props2$collapsed === undefined ? this.state.collapsed : _props2$collapsed;
			var _props2$className = _props2.className;
			var className = _props2$className === undefined ? '' : _props2$className;
			var _props2$itemClassName = _props2.itemClassName;
			var itemClassName = _props2$itemClassName === undefined ? '' : _props2$itemClassName;
			var nodeLabel = _props2.nodeLabel;
			var children = _props2.children;

			var rest = _objectWithoutProperties(_props2, ['collapsed', 'className', 'itemClassName', 'nodeLabel', 'children']);

			className = 'Tree';
			if (collapsed) {
				className += ' Tree-collapsed';
			}

			var arrow = _react2.default.createElement('div', _extends({}, rest, {
				className: 'Tree-handle',
				onClick: this.handleClick.bind(this) }));

			return _react2.default.createElement(
				'div',
				{ className: className },
				_react2.default.createElement(
					'div',
					{ className: 'Tree-label' },
					arrow,
					nodeLabel
				),
				_react2.default.createElement(
					'div',
					{ className: 'Tree-container' },
					children
				)
			);
		}
	}]);

	return Tree;
}(_react2.default.Component);

Tree.propTypes = {
	collapsed: _react.PropTypes.bool,
	defaultCollapsed: _react.PropTypes.bool,
	nodeLabel: _react.PropTypes.node.isRequired,
	className: _react.PropTypes.string,
	itemClassName: _react.PropTypes.string
};

exports.default = Tree;