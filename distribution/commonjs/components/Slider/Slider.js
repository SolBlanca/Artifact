'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = function (_React$Component) {
	_inherits(Slider, _React$Component);

	function Slider(props) {
		_classCallCheck(this, Slider);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this, props));

		var min = props.min;
		var max = props.max;

		var defaultValue = 'defaultValue' in props ? props.defaultValue : min;
		var value = props.value !== undefined ? props.value : defaultValue;

		_this.state = {
			value: value
		};
		return _this;
	}

	_createClass(Slider, [{
		key: 'element',
		value: function element() {
			return _reactDom2.default.findDOMNode(this);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { className: 'Slider' });
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var element = this.element();

			this.drag = _d2.default.behavior.drag();
			this.scale = _d2.default.scale.linear().domain([this.props.min, this.props.max]).range([0, element.offsetWidth - 20]);
			this.axis = _d2.default.svg.axis().scale(this.scale).tickSize(8);

			this.slider = _d2.default.select(element);
			this.selection = this.slider.append('div').classed('Selection', true);

			this.track = this.slider.append('div').classed('Track', true).call(this.drag).on('mousedown', this.onMouseDown.bind(this)).on('mousemove', this.onMouseMove.bind(this)).on('mouseout', this.onMouseOut.bind(this));

			this.progress = this.slider.append('div').classed('Progress', true).style('width', 4 + 'px').call(this.drag).on('mousedown', this.onMouseDown.bind(this));

			this.handle = this.slider.append('div').classed('Handle', true).call(this.drag);

			this.slider.append('svg').attr("width", '100%').append("g").attr("transform", "translate(10,6)").call(this.axis);

			this.drag.on('dragstart', this.onDragStart.bind(this));
			this.drag.on('dragend', this.onDragEnd.bind(this));
			this.drag.on('drag', this.onDrag.bind(this));

			this.currentWidth = element.offsetWidth;

			this.resideHandler = this.onResize.bind(this);
			window.addEventListener('resize', this.resideHandler);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var percent = (Math.round(this.state.value) - this.props.min) / (this.props.max - this.props.min);
			var position = (this.slider.node().offsetWidth - 20) * percent;

			this.handle.style('left', position + 'px');
			this.progress.style('width', position + 4 + 'px');

			if (this.props.onchange != undefined) {
				this.props.onchange(this.state.value);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('resize', this.resideHandler);
		}
	}, {
		key: 'onResize',
		value: function onResize(e) {
			var element = this.element();

			if (element.offsetWidth == this.currentWidth) return;

			this.currentWidth = element.offsetWidth;
			this.scale.range([0, element.offsetWidth - 20]);
			_d2.default.select(element).select('svg').select('g').call(this.axis);
		}
	}, {
		key: 'onMouseDown',
		value: function onMouseDown() {
			this.percent = _d2.default.event.layerX / this.track.node().offsetWidth;
			var position = (this.slider.node().offsetWidth - 20) * this.percent;

			this.slider.classed('tracking', true);
			this.handle.style('left', position + 'px');
			this.progress.style('width', position + 4 + 'px');
		}
	}, {
		key: 'onMouseMove',
		value: function onMouseMove() {
			var percent = _d2.default.event.layerX / this.track.node().offsetWidth;
			var position = (this.slider.node().offsetWidth - 20) * percent;

			this.selection.style('width', position + 'px');
		}
	}, {
		key: 'onMouseOut',
		value: function onMouseOut() {
			this.selection.style('width', '0px');
		}
	}, {
		key: 'onDragStart',
		value: function onDragStart() {
			this.slider.classed('tracking', true);
			_d2.default.event.sourceEvent.preventDefault();
		}
	}, {
		key: 'onDrag',
		value: function onDrag() {
			var width = this.element().offsetWidth - 20;
			var position = Math.max(0, Math.min(width, _d2.default.event.x - 10));
			this.percent = position / width;

			this.handle.style('left', position + 'px');
			this.progress.style('width', position + 4 + 'px');
		}
	}, {
		key: 'onDragEnd',
		value: function onDragEnd() {
			var value = this.props.min + this.percent * (this.props.max - this.props.min);
			this.slider.classed('tracking', false);

			this.setState({
				value: value
			});
		}
	}]);

	return Slider;
}(_react2.default.Component);

Slider.propTypes = {
	min: _react2.default.PropTypes.number,
	max: _react2.default.PropTypes.number
};

Slider.defaultProps = {
	min: 0,
	max: 830
};

exports.default = Slider;