import React, {Component} from 'react';
import TreeNode from './TreeNode';
import ScrollBar from './ScrollBar';

export default class Tree extends Component {
  constructor() {
    super();
    this.state = {
      isMasking: false,
      data: [],
      treeData: [],
      numberOfRenderNode: 15,
      refsList: [],
      firstVisibleIndex: 0,
      currentVisibleIndex: 0,
      totalVisible: 0
    };
  }

  componentWillMount() {
    this.initDataState(this.props.treeData);
  }

  initDataState(data) {
    this.state.treeData = data;
    let list = [];
    let count = 0;
    let rcs = function(data, depth) {
      for (var i = 0; i < data.length; i++) {
        data[i].wdata = {};

        data[i].wdata.expanded = true;
        data[i].wdata.depth = depth;

        data[i].wdata.index = count;
        data[i].wdata.previous = (count - 1);
        data[i].wdata.next = (count + 1);
        data[i].wdata.visibleCount = (count + 1);
        data[i].wdata.visible = {
          ec: true,
          filter: true
        };

        list.push(data[i]);
        count++;
        if (data[i].children != null && data[i].children.length > 0) {
          rcs(data[i].children, depth + 1);
        }
      }
    };
    rcs(data, 0);

    list[list.length - 1].wdata.next = -1;
    this.state.data = list;

    let tree = this;
    tree.state.currentVisibleIndex = 0;
    tree.state.totalVisible = this.state.data.length;
  }

  expandNode(node) {

    let tree = this;

    let rcs = function(rnode) {
      rnode.wdata.expanded = true;

      if (rnode.children != null && rnode.children.length > 0) {
        for (let i in rnode.children) {
          rnode.children[i].wdata.visible.ec = true;
          if (rnode.children[i].wdata.expanded) {
            rcs(rnode.children[i]);
          }
        }
      }
    };
    rcs(node);

    tree.updateVisibleLink(node.wdata.index);
    tree.updateData(tree.state.currentVisibleIndex);
    tree.updateScrollBar();
  }

  collapseNode(node) {
    let tree = this;

    node.expanded = false;

    let rcs = function(rlist) {
      for (let i = 0; i < rlist.length; i++) {
        rlist[i].wdata.visible.ec = false;
        if (rlist[i].children != null && rlist[i].children.length > 0) {
          rcs(rlist[i].children);
        }
      }
    };
    rcs(node.children);

    tree.updateVisibleLink(node.wdata.index);
    tree.updateData(tree.state.currentVisibleIndex);
    tree.updateScrollBar();
  }

  checkVisible(index) {
    let visible = this.state.data[index].wdata.visible;

    for (let i in visible) {
      if (!visible[i]) {
        return false;
      }
    }

    return true;
  }

  updateScrollBar() {
    let tree = this;
    let data = tree.state.data;

    tree.refs.verticalScrollBar.updateTotal(tree.state.totalVisible, function() {
      let value = data[tree.state.currentVisibleIndex].wdata.visibleCount - 1;
      console.log("value = " + value);
      tree.refs.verticalScrollBar.moveto(value);
    });
  }

  updateVisibleLink(index) {
    let tree = this;
    let data = tree.state.data;

    let previous = index;
    let next = Number(index) + 1;
    while (next < data.length) {
      if (tree.checkVisible(next)) {
        data[previous].wdata.next = next;
        data[next].wdata.previous = previous;
        data[next].wdata.visibleCount = data[previous].wdata.visibleCount + 1;
        previous = next;
      }
      next++;
    }

    data[previous].wdata.next = -1;

    tree.state.totalVisible = data[previous].wdata.visibleCount;
  }

  updateData(startIndex) {
    let tree = this;
    tree.state.currentVisibleIndex = startIndex;

    if (startIndex >= 0) {
      let data = tree.state.data;
      let next = startIndex;
      let i = 0;
      for (i = 0; i < tree.state.numberOfRenderNode; i++) {
        if (0 <= next && next <= data.length) {
          tree.state.refsList[i].updateData(data[next]);
          next = data[next].wdata.next;
        } else {
          break;
        }
      }

      while (i < tree.state.numberOfRenderNode) {
        tree.state.refsList[i].updateData(null);
        i++;
      }
    } else {
      tree.state.totalVisible = 0;
      tree.state.firstVisibleIndex = -1;
      for (let i = 0; i < tree.state.numberOfRenderNode; i++) {
        tree.state.refsList[i].updateData(null);
      }
    }
  }

  expandAllNode() {
    let tree = this;
    let data = tree.state.data;

    for (let i in data) {
      data[i].wdata.expanded = true;
      data[i].wdata.visible.ec = true;
    }

    tree.state.firstVisibleIndex = 0;
    tree.updateVisibleLink(0);
    tree.updateData(tree.state.currentVisibleIndex);
    tree.updateScrollBar();
  }

  collapseAllNode() {
    let tree = this;
    let data = tree.state.data;

    for (let i in data) {
      data[i].wdata.expanded = false;
      if (data[i].wdata.depth > 0) {
        data[i].wdata.visible.ec = false;
      } else {
        data[i].wdata.visible.ec = true;
      }
    }

    tree.state.firstVisibleIndex = 0;
    tree.updateVisibleLink(0);
    tree.updateData(0);
    tree.refs.verticalScrollBar.updateTotal(tree.state.totalVisible);
    tree.refs.verticalScrollBar.reset();
  }

  reloadData(data) {
    var tree = this;
    tree.initDataState(data);

    tree.refs.verticalScrollBar.reset();
    tree.refs.verticalScrollBar.updateTotal(tree.state.data.length);

    tree.updateData(0);
  }

  updateFilter(value) {
    let tree = this;
    let data = tree.state.data;

    let rcs = function(rdata) {
      let check = false;
      for (let i = 0; i < rdata.length; i++) {
        rdata[i].wdata.visible.filter = tree.filter(value, rdata[i]);

        if (rdata[i].children != null && rdata[i].children.length > 0) {
          if (rcs(rdata[i].children)) {
            rdata[i].wdata.visible.filter = true;
          }
        }

        check = (check || rdata[i].wdata.visible.filter);
      }

      return check;
    };
    rcs(tree.state.treeData);

    tree.state.firstVisibleIndex = -1;
    for (let i in data) {
      let check = tree.checkVisible(i);
      if (check) {
        tree.state.firstVisibleIndex = i;
        break;
      }
    }

    if (tree.state.firstVisibleIndex >= 0) {
      data[tree.state.firstVisibleIndex].wdata.previous = -1;
      data[tree.state.firstVisibleIndex].wdata.visibleCount = 1;
      tree.updateVisibleLink(tree.state.firstVisibleIndex);
    }

    tree.updateData(tree.state.firstVisibleIndex);
    tree.updateScrollBar();
  }

  filter(value, node) {
    value = value.trim();

    let v1 = value.toLocaleLowerCase();
    let v2 = node.name.toLocaleLowerCase();

    if (v2.indexOf(v1) >= 0) {
      return true;
    }
    return false;
  }

  updateSort(sortState) {
    let tree = this;

    let compare = function(node1, node2) {
      if (node1.name > node2.name) {
        return 1;
      } else if (node1.name == node2.name) {
        return 0;
      }
      return -1;
    };

    let swap = function (i, j, dataList) {
      var tem = dataList[i];
      dataList[i] = dataList[j];
      dataList[j] = tem;
    };

    let data = [];
    let rcs = function(rdata) {
      for (var i = 0; i < rdata.length; i++) {
        for (var j = i; j < rdata.length; j++) {
          if (sortState) {
            if (compare(rdata[i], rdata[j]) < 0) {
              swap(i, j, rdata);
            }
          } else {
            if (compare(rdata[i], rdata[j]) > 0) {
              swap(i, j, rdata);
            }
          }
        }
      }

      for (var i = 0; i < rdata.length; i++) {
        data.push(rdata[i]);
        if (rdata[i].children != null && rdata[i].children.length > 0) {
          rcs(rdata[i].children);
        }
      }
    };
    rcs(tree.state.treeData);

    tree.state.data = data;

    let checkVisible = function(node) {
      let visible = node.visible;

      for (let i in visible) {
        if (!visible[i]) {
          return false;
        }
      }

      return true;
    };

    let i = 0;
    while (i < data.length) {
      if (checkVisible(data[i])) {
        tree.state.firstVisibleIndex = i;
        tree.state.currentVisibleIndex = i;

        tree.state.data[i].wdata.visibleCount = 1;
        tree.updateVisibleLink(i);
        tree.updateData(i);
        tree.updateScrollBar();
        break;
      }
    }

    for (let i in tree.state.data) {
      console.log("index = " + i);
      console.log("name = " + tree.state.data[i].name);
      console.log("visibleCount = " + tree.state.data[i].wdata.visibleCount);
      console.log("next = " + tree.state.data[i].wdata.next);
      console.log("previous = " + tree.state.data[i].wdata.previous);
      console.log("");
    }

    // if (i >= data.length) {
    //   tree.state.totalVisible = 0;
    //   tree.state.firstVisibleIndex = -1;
    //   for (let i = 0; i < tree.state.numberOfRenderNode; i++) {
    //     tree.state.refsList[i].updateData(null);
    //   }
    // }
  }

  render() {
    let tree = this;
    let handler = this.props.handler;
    if (handler == null) {
      handler = {};
    }

    let nodeList = [];
    let data = tree.state.data;

    for (let i = 0; i < tree.state.numberOfRenderNode; i++) {
      let refFn = (component) => {
        tree.state.refsList[i] = component;
      };
      let row = (<TreeNode key={i} data={data[i]} tree={tree} handler={handler.rowClickHandler} ref={refFn}/>);
      nodeList.push(row);
    }

    var maskStyle = "hidden";
    if (this.state.isMasking) {
      maskStyle = "";
    }

    let maskDiv = (
      <div className={"mask " + maskStyle}>
        <div className="mask-align">
          <img className="spinning-icon" src="img/loading.svg"/>
        </div>
      </div>
    );

    let scrollHandler = (value) => {
      let data = tree.state.data;

      let index = tree.state.currentVisibleIndex;
      let visibleCountTarget = Math.floor(value) + 1;
      console.log("count = " + visibleCountTarget);
      let visibleCount = data[index].wdata.visibleCount;
      if (visibleCount < visibleCountTarget) {
        while (visibleCount < visibleCountTarget) {
          index = data[index].wdata.next;
          visibleCount = data[index].wdata.visibleCount;
        }
      } else {
        while (visibleCount > visibleCountTarget) {
          index = data[index].wdata.previous;
          if (index == -1) {
            break;
          }
          visibleCount = data[index].wdata.visibleCount;
        }
      }
      if (index < 0) {
        index = 0;
      }
      tree.updateData(index);
    };

    let mouseWheel = (event) => {
      let data = tree.state.data;
      let visibleIndex = tree.state.currentVisibleIndex;
      let next = tree.state.firstVisibleIndex;
      if (event.deltaY > 0) {
        next = data[visibleIndex].wdata.next;
      } else {
        next = data[visibleIndex].wdata.previous;
      }

      if (0 <= next && next < data.length) {
        tree.updateData(next);

        tree.updateScrollBar();
      }
    };

    let treeStyle = {
      height: "562px"
    };

    return (
      <div className="AS-Tree" style={treeStyle} onWheel={mouseWheel}>
        {nodeList}
        {maskDiv}
        <ScrollBar
          handler={scrollHandler}
          total={data.length}
          visible={tree.state.numberOfRenderNode}
          ref="verticalScrollBar"/>
      </div>
    );
  }
};
