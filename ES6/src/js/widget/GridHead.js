import React, { Component } from 'react';

class GridHead extends Component {
  constructor() {
    super();
    console.log("it is in GridHead");
  }

  render() {
    let grid = this.props.grid;
    let columnConfig = grid.props.columnConfig;

    let headList = columnConfig.map(function (node, index) {
      let style = {
        width: node.width + "px",
        borderRight: "1px solid #ededed"
      };

      return (
        <div className="AS-GridCell" style={style} key={index}>
          {node.columnName}
        </div>
      );
    });

    return (
      <div className="AS-GridHead AS-GridRow" >{headList}</div>
    );
  }
}

export default GridHead;
