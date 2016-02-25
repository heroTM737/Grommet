import '../scss/index.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from 'grommet/components/App';
import Sandbox from './sandbox/Sandbox';

class Main extends Component {
  render () {
    return (
      <App centered={false}>
        <Sandbox />
      </App>
    );
  }
};

let element = document.getElementById('content');
ReactDOM.render(React.createElement(Main), element);
