import React from 'react';
//import SearchInput from 'grommet/components/SearchInput';
import './style.scss';

var SearchList = React.createClass({
  getInitialState: function () {
    return {
      value: "",
      data: []
    };
  },

  componentWillMount: function () {
    var data = this.props.data;
    this.setState({
      data: data
    });
  },

  render: function () {

    var data = this.state.data;
    var list = [];
    for (var i = 0; i < data.length; i++) {
      list.push(
                React.createElement("div", {
                  key: i,
                  className: (data[i].hidden == true) ? "hidden" : "list-item",
                  style: {

                  }
                }, data[i].value)
            );
    }
    let stylex = {
      display: "flex",
      padding: "0px 5px 5px 0px"
    };
    return (
      <div style = {stylex}>
        {list}
      </div>

    );
  }
});

export default SearchList;
