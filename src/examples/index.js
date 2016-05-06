import React from 'react';
import {render} from 'react-dom';
import * as I from '..';
import '../styles.less'

class App extends React.Component {
	render () {
		return (
			<div>
				<I.Taskbar>
					<I.Task></I.Task>
					<I.Task></I.Task>
					<I.Task></I.Task>
					<I.Task></I.Task>
					<I.Task></I.Task>
					<I.Task></I.Task>
				</I.Taskbar>

				<I.Slider/>
				<I.Command />
				<I.Button />
				<I.Tree nodeLabel='Hello World'>
					<I.Tree nodeLabel='Bye'>
						moo
						<I.Spark>
						</I.Spark>
					</I.Tree>
					hey
				</I.Tree>
				<I.DataSource>
					<I.Graph></I.Graph>
				</I.DataSource>
				<I.Spark>
				</I.Spark>

				<I.Grid>
				</I.Grid>

				<table>
					<thead>
						<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Strike Price</th>
						<th>Value (USD)</th>
						</tr>
					</thead>
					<tbody>
						<tr>
						  <td>Microsoft Corporation</td>
						  <td>Productivity software &amp; cloud services</td>
						  <td><I.Spark></I.Spark></td>
						  <td>3532.41</td>
						</tr>
					  <tr>
						<td>Intel Corporation</td>
						<td>Computer processors &amp; components</td>
						<td><I.Spark></I.Spark></td>
						<td>32632.24</td>
					  </tr>
					  <tr>
						<td>Amazon.com Inc.</td>
						<td>Online shopping &amp; cloud services</td>
						<td><I.Spark></I.Spark></td>
						<td>9039.96</td>
					  </tr>
					<tr>
					  <td>Apple Inc.</td>
					  <td>Consumer electronics</td>
					  <td><I.Spark></I.Spark></td>
					  <td>12040.45</td>
					</tr>
					</tbody>
				</table>

			</div>
		);
	}
}

render(<App/>, document.getElementById('root'));