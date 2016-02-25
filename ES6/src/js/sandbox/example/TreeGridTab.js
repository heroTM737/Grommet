import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import TreeGrid from './../../widget/TreeGrid';
import Data from './../Data';

let treeData = Data.ArcMCExampleTreeData.getTreeExampleMassive();

class TreeGridTab extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    let treetab = this;

    let handler = {
      rowClickHandler : (event, data) => {
        console.log(data.name);
      }
    };

    let expandAll = () => {
      treetab.refs.tree.expandAllNode();
    };

    let collapseAll = () => {
      treetab.refs.tree.collapseAllNode();
    };

    return (
      <div>
        <div className="buttonbar">
          <Button label="Expand All" onClick={expandAll}/>
          <Button label="Collapse All" onClick={collapseAll}/>
        </div>
        <TreeGrid treeData={treeData} handler={handler} ref="tree"/>
      </div>
    );
  }
};

export default TreeGridTab;
