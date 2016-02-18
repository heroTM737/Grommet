import React, {Component} from 'react';

export default class GridRow extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      columnConfig: null
    };
  }

  componentWillMount() {
    this.initDataState();
  }

  initDataState() {
    this.state.data = this.props.data;
    this.state.columnConfig = this.props.columnConfig;
  }

  updateData(data) {
    this.setState({
      data: data
    });
  }

  render() {
    let gridrow = this;
    let data = gridrow.state.data;
    let columnConfig = gridrow.state.columnConfig;

    let cells = null;
    if (data != null) {
      cells = columnConfig.map(function(node, index) {
        let style = {
          width: columnConfig[index].width + "px"
        };

        return (
          <div className="AS-GridCell" style={style} key={index}>
            {data[columnConfig[index].propertyName]}
          </div>
        );
      });
    }


    return (
      <div className="AS-GridRow">{cells}</div>
    );
  }
}
