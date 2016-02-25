import React, {Component} from 'react';
import Button from 'grommet/components/Button';
import Tree from './../../widget/Tree';
import Data from './../Data';

let depth = 3;
let children = 5;
let totalRecordFn = (depth, children) => {
  let r = children;
  for (let i = 0; i < depth - 1; i++) {
    r = r * children + children;
  }
  return r;
}
let treeData = Data.ArcMCExampleTreeData.getTreeVR(depth, children, "");

class TreeTab extends Component {
  constructor() {
    super();
    this.state = {
      depth: depth,
      children: children,
      totalRecords: totalRecordFn(depth, children),
      prefix: ""
    };
  }

  render() {
    let treetab = this;

    let handler = {
      rowClickHandler: (event, data) => {
        console.log("name = " + data.name);
        console.log("sibling = " + data.nextSibling);
      }
    };

    let expandAll = () => {
      treetab.refs.tree.expandAllNode();
    };

    let collapseAll = () => {
      treetab.refs.tree.collapseAllNode();
    };

    let sortAscending = () => {
      treetab.refs.tree.updateSort(true);
    }

    let sortDescending = () => {
      treetab.refs.tree.updateSort(false);
    }

    let filter = () => {
      var inputFilter = treetab.refs.inputFilter.value;
      treetab.refs.tree.updateFilter(inputFilter);
    }

    let formatNumber = (number) => {
      var number = number.toFixed(2) + '';
      var x = number.split('.');
      var x1 = x[0];
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1;
    }

    let reloadhandler = () => {
      var inputDepth = treetab.refs.inputDepth.value;
      var inputChildren = treetab.refs.inputChildren.value;
      var inputPrefix = treetab.refs.inputPrefix.value;
      var totalRecords = totalRecordFn(Number(inputDepth), Number(inputChildren));
      treetab.setState({totalRecords: formatNumber(totalRecords), prefix: inputPrefix});

      var data = Data.ArcMCExampleTreeData.getTreeVR(inputDepth, inputChildren, inputPrefix);
      treetab.refs.tree.reloadData(data);
    }

    let style = {
      display: "flex"
    }

    return (
      <div style={style}>
        <div>
          <div className="buttonbar">
            <div><input type="text" ref="inputFilter" onChange={filter}/>
              <span>filter</span>
            </div>
          </div>
          <div className="buttonbar">
            <Button label="Sort up" onClick={sortAscending}/>
            <Button label="Sort down" onClick={sortDescending}/>
          </div>
          <div className="buttonbar">
            <Button label="Expand All" onClick={expandAll}/>
            <Button label="Collapse All" onClick={collapseAll}/>
          </div>
          <div className="buttonbar">
            <div><input type="text" ref="inputDepth"/>
              <span>depth</span>
            </div>
            <div><input type="text" ref="inputChildren"/>
              <span>children</span>
            </div>
            <div><input type="text" ref="inputPrefix"/>
              <span>prefix</span>
            </div>
            <div>Depth = {this.state.depth}</div>
            <div>Children = {this.state.children}</div>
            <div>Total records = {this.state.totalRecords}</div>
            <div>Prefix = "{this.state.prefix}"</div>
            <Button label="Reload" onClick={reloadhandler}/>
          </div>
        </div>
        <Tree treeData={treeData} handler={handler} ref="tree"/>
      </div>
    );
  }
};

export default TreeTab;
