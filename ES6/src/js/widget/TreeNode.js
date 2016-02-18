import React, { Component } from 'react';
import FolderOpen from 'grommet/components/icons/base/FolderOpen';
import Folder from 'grommet/components/icons/base/Folder';
import Article from 'grommet/components/icons/base/Article';

export default class TreeNode extends Component {
  constructor () {
    super();
    this.state = {
      data: {},
      echandler: null
    };
  }

  componentWillMount () {
    this.state.data = this.props.data;
  }

  toggleNode () {
    let data = this.state.data;
    data.wdata.expanded = !data.wdata.expanded;
    let tree = this.props.tree;
    if (data.wdata.expanded) {
      tree.expandNode(data);
    } else {
      tree.collapseNode(data);
    }
  }

  updateData (data) {
    this.setState({
      data: data
    });
  }

  render () {
    let treenode = this;
    let nodeData = this.state.data;
    let checkLeaf, name, rowHandler, style;

    if (nodeData != null ) {
      name = nodeData.name;
      if (nodeData.wdata.expanded == null) {
        nodeData.wdata.expanded = false;
      }
      let depth = 0;
      if (nodeData.wdata.depth != null) {
        depth = Number(nodeData.wdata.depth);
      }

      if (nodeData.children != null && nodeData.children.length > 0) {

        let toggleNodeFunction = (event) => {
          event.stopPropagation();
          treenode.toggleNode();
        };

        checkLeaf = (
          <i onClick={toggleNodeFunction} >
            <FolderOpen className = {nodeData.wdata.expanded == false ? "hidden" : ""} />
            <Folder className = {nodeData.wdata.expanded == true ? "hidden" : ""} />
          </i>
        );

      } else {
        checkLeaf = (
          <i>
            <Article />
          </i>
        );
      }

      rowHandler = (event) => {
        if (treenode.props.handler != null) {
          treenode.props.handler(event, nodeData);
        }
      };

      style = {
        paddingLeft: (depth * 20 + 10) + "px"
      };
    } else {
      style = {
        padding: "0"
      };
    }

    return (
      <div className={"AS-TreeNode"} style = {style} onClick = {rowHandler} >
        {checkLeaf} {name}
      </div>
    );
  }
};
