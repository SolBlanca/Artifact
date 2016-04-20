import React from 'react';
import {render} from 'react-dom';
import {Button, Command} from '..';

class App extends React.Component {
  render () {
    return (
      <div>
      	<Command />
        <p> Hello React!</p>
        <Button />
      </div>
    );
  }
}

render(<App/>, document.body);