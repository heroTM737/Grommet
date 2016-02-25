import React, { Component } from 'react';
import Tree from './../../../../widget/Tree';
import Data from './../../../Data';
import Button from 'grommet/components/Button';

let treeData = Data.ArcMCExampleTreeData.getTreeExample();

export default class TreeExampleTab extends Component {
  constructor () {
    super();
    this.state = {
      extend : ""
    };
  }


  render () {
    let a = this;

    let treeHandler = {
      rowClickHandler : (event, data) => {
        a.setState({
          extend:data.name
        });
      }

    };
    /////style
    let divStyle1 = {
      width:"50%",float:"left"
    };
    let divStyle2 = {
      width:"50%", float:"right"
    };
    ///expandAll
    let expandAll = () => {
      a.refs.trees.expandAllNode();
    };
    ///conllapseAll
    let collapseAll = () => {
      a.refs.trees.collapseAllNode();
    }

    return (
      <div>
          <div className="buttonTree">
            <Button label="Expand All" onClick={expandAll}/>
            <Button label="Collapse All" onClick={collapseAll} />
          </div>

          <div style = {divStyle1}>
            <Tree treeData={treeData} handler = {treeHandler} ref="trees"/>
          </div>
          <div style = {divStyle2}>
            {this.state.extend}
          </div>
      </div>

    );
  }
};

export default TreeExampleTab;
