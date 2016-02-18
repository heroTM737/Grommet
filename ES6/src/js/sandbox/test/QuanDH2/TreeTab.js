import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import Tree from './../../../widget/Tree';
import Data from './../../Data';
let treeData = Data.ArcMCExampleTreeData.getTreeExample();

export default class TreeTab extends Component  {
  constructor() {
    super();
    this.state = {
      extend:""
    };
  }
  render () {
    let treetab = this;

    let expandAll = () => {
      treetab.refs.tree.expandAllNode();
    };

    let collapseAll = () => {
      treetab.refs.tree.collapseAllNode();
    };

    let style1={width:"50%",float:"left"};
    let style2={width:"50%", float:"left"};
    let handlerClick = {
      rowClickHandler: (event, data) => {
        this.setState({
          extend:data.name
        });
      }
    };
    return (

      <div>
        <div className="buttonbar">
          <Button label="Expand All" onClick={expandAll}/>
          <Button label="Collapse All" onClick={collapseAll}/>
        </div>
        <div style={style1}>
          <Tree treeData={treeData} handler={handlerClick} ref="tree"/>
        </div>
        <div style={style2}> {this.state.extend} </div>
      </div>
    );

  }
};
