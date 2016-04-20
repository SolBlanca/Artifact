import React from 'react';
import {render} from 'react-dom';
import * as I from '..';

class App extends React.Component {
  render () {
    return (
      <div>
      	<I.Command />
        <I.Card> Hello React!</I.Card>
        <I.Button />
        <I.Tree nodeLabel='Hello World'>
	        <I.Tree nodeLabel='Bye'>
	        	moo
	        </I.Tree>
	        hey
        </I.Tree>
      </div>
    );
  }
}

render(<App/>, document.getElementById('root'));