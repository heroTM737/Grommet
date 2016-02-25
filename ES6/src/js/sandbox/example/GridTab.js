import React, { Component } from 'react';
import Grid from './../../widget/Grid';
import Data from './../Data';

let columnConfig = Data.ArcMCExampleGridData.columnConfig;
let data = Data.ArcMCExampleGridData.gridData(50);

class GridTab extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    let style = {
      padding: "5px"
    };

    return (
      <div style={style}>
        <Grid columnConfig={columnConfig} data={data} ref="grid"/>
      </div>
    );
  }
};

export default GridTab;
