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

var Spark = function (_React$Component) {
	_inherits(Spark, _React$Component);

	function Spark(props) {
		_classCallCheck(this, Spark);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Spark).call(this, props));
	}

	_createClass(Spark, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var element = _reactDom2.default.findDOMNode(this);
			var props = this.props;

			this.data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 9];

			for (var i = 1; i < this.data.length; i++) {
				this.data[i] = this.data[i - 1] + Math.random() * 2 - 1;
			}

			// reference to svg element containing circles
			this.svg = _d2.default.select(element).append('svg').attr("width", "100%").attr("height", "100%");

			// reference to html element containing text
			this.html = _d2.default.select(element).append('div').attr('class', 'bubble-chart-text');

			var size = {
				width: element.offsetWidth,
				height: element.offsetHeight
			};

			this.xScale = _d2.default.scale.linear().domain([0, this.data.length]).range([3, size.width - 3]);

			this.yScale = _d2.default.scale.linear().domain([-5, 15]).range([0, size.height]);

			this.svg.append("svg:circle").attr("cx", this.xScale(this.data.length - 1) + 0.5).attr("cy", this.yScale(this.data[this.data.length - 1])).attr("r", 2);

			/*
   this.svg.append("svg:circle")
   	.attr("cx", this.xScale(0) - 0.5)
   	.attr("cy", this.yScale(this.data[ 0 ]))
   	.attr("r", 2)
   	.style("fill", "blue")
   	.style("stroke", "white");
   */

			this.componentDidUpdate();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var _this2 = this;

			var element = _reactDom2.default.findDOMNode(this);
			var data = this.data;

			if (!data) return;

			// assign new data to existing DOM for circles and labels
			var line = _d2.default.svg.line().x(function (d, i) {
				return _this2.xScale(i);
			}).y(function (d, i) {
				return _this2.yScale(d);
			}).interpolate("monotone");

			this.svg.insert("svg:path", ":first-child").attr("d", line(data));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { className: 'Spark' });
		}
	}, {
		key: 'getDOMNode',
		value: function getDOMNode() {
			return _reactDom2.default.findDOMNode(this);
		}
	}], [{
		key: 'create',
		value: function create(e, s) {}
	}, {
		key: 'update',
		value: function update(e, s) {}
	}]);

	return Spark;
}(_react2.default.Component);

exports.default = Spark;