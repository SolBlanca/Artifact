'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataCell = function () {
	function DataCell(row, column) {
		_classCallCheck(this, DataCell);

		this.row = row;
		this.column = column;

		this.triggers = [];
		this.value = row + ' ' + column;
	}

	_createClass(DataCell, [{
		key: 'commit',
		value: function commit() {
			if (this.callback != undefined) {
				this.callback(this);
			}
		}
	}]);

	return DataCell;
}();

var DataColumn = function DataColumn(column) {
	_classCallCheck(this, DataColumn);

	this.index = column;
};

var DataRow = function DataRow(row) {
	_classCallCheck(this, DataRow);

	this.index = row;
};

var DataTable = function () {
	function DataTable(rows, columns) {
		_classCallCheck(this, DataTable);

		this.rows = [];
		this.columns = [];
		this.formulas = [];
		this.triggers = [];
		this.values = [];

		for (var r = 0; r < rows; ++r) {
			this.rows.push(new DataRow(r));
		}

		for (var c = 0; c < columns; c++) {
			this.columns.push(new DataColumn(c));
		}

		for (var r = 0; r < rows; r++) {
			var row = [];

			for (var c = 0; c < columns; c++) {
				var cell = new DataCell(r, c);

				row.push(cell);
			}

			this.values.push(row);
		}
	}

	_createClass(DataTable, [{
		key: 'cell',
		value: function cell(row, column, value) {
			return this.values[row][column];
		}
	}, {
		key: 'size',
		value: function size() {
			return {
				rows: this.rows.length,
				columns: this.columns.length
			};
		}
	}, {
		key: 'edit',
		value: function edit(dataCell) {
			if (this.editing) {
				this.editing.commit();
			}
			this.editing = dataCell;
		}
	}]);

	return DataTable;
}();
// http://adazzle.github.io/react-data-grid/examples.html#/formatters

var DataTrigger = function DataTrigger() {
	_classCallCheck(this, DataTrigger);

	this.formulas = [];
};

var DataFormula = function DataFormula() {
	_classCallCheck(this, DataFormula);

	this.row = 0;
	this.column = 0;
	this.formula = [];
};

var Cell = function (_React$Component) {
	_inherits(Cell, _React$Component);

	function Cell(props) {
		_classCallCheck(this, Cell);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Cell).call(this, props));

		_this.state = {
			editing: false,
			value: props.cell.value
		};

		_this.props.cell.callback = _this.onCallback.bind(_this);
		_this.text = props.cell.value;
		return _this;
	}

	_createClass(Cell, [{
		key: 'onClick',
		value: function onClick() {
			this.setState({
				editing: !this.state.editing
			});

			this.props.table.edit(this.props.cell);
		}
	}, {
		key: 'onCallback',
		value: function onCallback() {
			this.setState({
				editing: !this.state.editing,
				value: this.text
			});

			this.props.cell.value = this.text;
		}
	}, {
		key: 'onChange',
		value: function onChange(event) {
			this.text = event.target.value;
			this.setState({
				value: this.text
			});
		}
	}, {
		key: 'onKeyDown',
		value: function onKeyDown(event) {
			if (event.keyCode == 13) {
				this.props.table.edit();
			}
		}
	}, {
		key: 'onBlur',
		value: function onBlur(event) {
			this.props.table.edit();
		}
	}, {
		key: 'render',
		value: function render() {
			var display;

			if (!this.state.editing) {
				display = _react2.default.createElement(
					'div',
					{ onClick: this.onClick.bind(this) },
					this.state.value
				);
			} else {
				display = _react2.default.createElement('input', {
					onChange: this.onChange.bind(this),
					onKeyDown: this.onKeyDown.bind(this),
					onBlur: this.onBlur.bind(this),
					value: this.state.value,
					autoFocus: true });
			}

			return _react2.default.createElement(
				'div',
				null,
				display
			);
		}
	}]);

	return Cell;
}(_react2.default.Component);

var Grid = function (_React$Component2) {
	_inherits(Grid, _React$Component2);

	function Grid(props) {
		_classCallCheck(this, Grid);

		var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).call(this, props));

		_this2.state = {
			table: new DataTable(10, 10)
		};
		return _this2;
	}

	_createClass(Grid, [{
		key: 'render',
		value: function render() {
			var table = this.state.table;

			return _react2.default.createElement(
				'div',
				{ className: 'Grid' },
				_react2.default.createElement(
					'table',
					null,
					_react2.default.createElement(
						'tbody',
						null,
						table.rows.map(function (row, i) {
							return _react2.default.createElement(
								'tr',
								{ key: i },
								table.columns.map(function (col, j) {
									return _react2.default.createElement(
										'td',
										{ key: j },
										_react2.default.createElement(Cell, { cell: table.cell(i, j), table: table })
									);
								})
							);
						})
					)
				)
			);
		}
	}]);

	return Grid;
}(_react2.default.Component);

exports.default = Grid;