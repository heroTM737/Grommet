import React, {Component} from 'react';
import GridHead from './GridHead';
import GridBody from './GridBody';

export default class Grid extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      columnConfig: null
    };
  }

  componentWillMount() {
    this.initDataState(this.props.data);
  }

  initDataState(data) {
    this.state.data = data;
    this.state.columnConfig = this.props.columnConfig;
  }

  render() {
    let grid = this;
    return (
      <div className="AS-Grid">
        <GridHead grid={grid}/>
        <GridBody grid={grid}/>
      </div>
    );
  }
};
