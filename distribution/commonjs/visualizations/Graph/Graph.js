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

var Graph = function (_React$Component) {
	_inherits(Graph, _React$Component);

	function Graph(props) {
		_classCallCheck(this, Graph);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Graph).call(this, props));
	}

	_createClass(Graph, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var element = _reactDom2.default.findDOMNode(this);
			var props = this.props;

			this.svg = _d2.default.select(element).append('svg');
			this.colors = _d2.default.scale.category10();
			this.margins = {
				left: 50,
				right: 20,
				top: 20,
				bottom: 40
			};

			this.size = {
				width: 300,
				height: 300
			};

			this.xScale = _d2.default.scale.linear().range([this.margins.left, this.size.width - this.margins.right]).domain([0, 300]);

			this.yScale = _d2.default.scale.linear().range([this.size.height - this.margins.bottom, this.margins.top]).domain([0, 300]);

			var xAxis = _d2.default.svg.axis().scale(this.xScale).ticks(3).orient("bottom");

			var yAxis = _d2.default.svg.axis().scale(this.yScale).ticks(8).tickSize(-(this.size.width - this.margins.right - this.margins.left)).orient("left");

			this.svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + (this.size.height - this.margins.bottom) + ")").call(xAxis);

			this.svg.append("g").attr("class", "y axis").attr("transform", "translate(" + this.margins.left + ",0)").call(yAxis);

			this.componentDidUpdate();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var _this2 = this;

			var element = _reactDom2.default.findDOMNode(this);
			var data = this.props.data;

			if (!data) return;

			// assign new data to existing DOM for circles and labels
			var circles = this.svg.selectAll('circle').data(data);

			circles.transition().duration(500).attr('transform', function (d) {
				return 'translate(' + _this2.xScale(d.x) + ',' + _this2.yScale(d.y) + ')';
			}).attr('r', function (d) {
				return Math.random() * 8 + 2;
			});

			if (data.length) {
				circles.enter().append('circle').attr('transform', function (d) {
					return 'translate(' + _this2.xScale(d.x) + ',' + _this2.yScale(d.y) + ')';
				}).attr('r', function (d) {
					return Math.random() * 8 + 2;
				}).attr("fill", function (d, i) {
					return _this2.colors(i);
				});
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {}
	}, {
		key: 'render',
		value: function render() {
			var styles = {
				width: "300px",
				height: "300px"
			};

			return _react2.default.createElement(
				'div',
				{ className: 'Graph', style: styles },
				_react2.default.createElement(
					'div',
					{ className: 'header' },
					'Asset Classes'
				)
			);
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

	return Graph;
}(_react2.default.Component);

exports.default = Graph;