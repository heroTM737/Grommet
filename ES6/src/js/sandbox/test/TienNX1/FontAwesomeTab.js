import React, { Component } from 'react';

export default class FontAwesomeTab extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    return (
      <div>
        <i className="fa fa-folder" />
        <i className="fa fa-folder-open" />
        <i className="fa fa-leaf" />
      </div>
    );
  }
};
