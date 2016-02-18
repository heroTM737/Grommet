import React, {Component} from 'react';
import GridRow from './GridRow';
import ScrollBar from './ScrollBar';

export default class GridBody extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      columnConfig: null,
      numberOfRenderNode: 15,
      refsList: [],
      firstVisibleIndex: 0,
      currentVisibleIndex: 0,
      totalVisible: 0
    };
  }

  componentWillMount() {
    this.initDataState(this.props.grid.state.data);
  }

  initDataState(data) {
    for (let i = 0; i < data.length; i++) {
      data[i].wdata = {};

      data[i].wdata.index = i;
      data[i].wdata.previous = (i - 1);
      data[i].wdata.next = (i + 1);
      data[i].wdata.visibleCount = (i + 1);
      data[i].wdata.visible = {
        ec: true,
        filter: true
      };
    }

    data[data.length - 1].wdata.next = -1;

    this.state.data = data;
    this.state.columnConfig = this.props.grid.state.columnConfig;
  }

  updateData(startIndex) {
    let gridbody = this;
    gridbody.state.currentVisisibleIndex = startIndex;

    if (startIndex >= 0) {
      let data = gridbody.state.data;
      let next = startIndex;
      let i = 0;
      for (i = 0; i < gridbody.state.numberOfRenderNode; i++) {
        if (0 <= next && next <= data.length) {
          gridbody.state.refsList[i].updateData(data[next]);
          next = data[next].wdata.next;
        } else {
          break;
        }
      }

      while (i < gridbody.state.numberOfRenderNode) {
        gridbody.state.refsList[i].updateData(null);
        i++;
      }
    } else {
      gridbody.state.totalVisible = 0;
      gridbody.state.firstVisibleIndex = -1;
      for (let i = 0; i < gridbody.state.numberOfRenderNode; i++) {
        gridbody.state.refsList[i].updateData(null);
      }
    }
  }

  render() {
    let gridbody = this;
    let columnConfig = gridbody.state.columnConfig;
    let data = gridbody.state.data;
    let numberOfRenderNode = gridbody.state.numberOfRenderNode;

    let rows = [];
    for (let i = 0; i < numberOfRenderNode; i++) {
      let refFn = (component) => {
        gridbody.state.refsList[i] = component;
      };

      rows.push(
        <GridRow data={data[i]} columnConfig={columnConfig} key={i} ref={refFn}/>
      );
    }

    let scrollHandler = (value) => {
      let data = gridbody.state.data;
      let index = gridbody.state.currentVisibleIndex;
      let visibleCountTarget = Math.floor(value) + 1;
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

      gridbody.updateData(index);
    };

    return (
      <div className="AS-GridBody">
        {rows}
        <ScrollBar
          handler={scrollHandler}
          total={data.length}
          visible={gridbody.state.numberOfRenderNode}
          ref="verticalScrollBar"/>
      </div>
    );
  }
};
