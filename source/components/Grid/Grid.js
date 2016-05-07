import React from 'react';
import ReactDom from 'react-dom';

class DataCell
{
	constructor(row, column)
	{

		this.row = row;
		this.column = column;

		this.triggers = [];
		this.value = row + ' ' + column;
	}

	commit()
	{
		if (this.callback != undefined)
		{
			this.callback(this);
		}
	}
}

class DataColumn
{
	constructor(column)
	{
		this.index = column;
	}
}

class DataRow
{
	constructor(row)
	{
		this.index = row;
	}
}

class DataTable
{
	constructor (rows, columns)
	{
		this.rows = [];
		this.columns = [];
		this.formulas = [];
		this.triggers = [];
		this.values = [];

		for (var r = 0; r < rows; ++r ) {
			this.rows.push(new DataRow(r));
		}

		for (var c = 0; c < columns; c++) {
			this.columns.push(new DataColumn(c))
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

	cell(row, column, value)
	{
		return this.values[row][column];
	}

	size()
	{
		return {
			rows: this.rows.length,
			columns: this.columns.length
		}
	}

	edit(dataCell)
	{
		if (this.editing) {
			this.editing.commit();
		}
		this.editing = dataCell;
	}
}
// http://adazzle.github.io/react-data-grid/examples.html#/formatters

class DataTrigger
{
	constructor()
	{
		this.formulas = [];
	}

}

class DataFormula
{
	constructor()
	{
		this.row = 0;
		this.column = 0;
		this.formula = [];
	}
}

class Cell extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			editing: false,
			value: props.cell.value
		}

		this.props.cell.callback = this.onCallback.bind(this);
		this.text = props.cell.value;
	}

	onClick()
	{
		this.setState({
			editing: !this.state.editing
		});

		this.props.table.edit(this.props.cell);
	}

	onCallback()
	{
		this.setState({
			editing: !this.state.editing,
			value: this.text
		});

		this.props.cell.value = this.text;
	}

	onChange(event)
	{
		this.text = event.target.value;
		this.setState({
			value: this.text
		});
	}

	onKeyDown(event)
	{
		if (event.keyCode == 13) {
			this.props.table.edit();
		}
	}

	onBlur(event)
	{
		this.props.table.edit();
	}

	render()
	{
		var display;

		if (!this.state.editing) 
		{
			display = <div onClick={this.onClick.bind(this)}>{ this.state.value }</div>;
		}
		else
		{
			display = <input
				onChange={this.onChange.bind(this)}
				onKeyDown={this.onKeyDown.bind(this)}
				onBlur={this.onBlur.bind(this)}
				value={this.state.value}
				autoFocus/>;
		}

		return (
			<div>
				{ display }
			</div>
		)
	}
}

class Grid extends React.Component
{
	constructor(props) 
	{
		super(props);
		this.state = {
			table: new DataTable(10, 10)
		}
	}

	render() 
	{
		var table = this.state.table;

		return (
			<div className="Grid">
				<table>
					<tbody>
						{ table.rows.map(function(row, i) {
							return (
								<tr key={i}>
									{ table.columns.map(function(col, j) {
										return <td key={j}><Cell cell={ table.cell(i, j) } table={table}></Cell></td>;
									}) }
								</tr>
							);
						}) }
					</tbody>
				</table>
			</div>
		);
	}
}

export default Grid;
