import React, { Component } from 'react';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

export default class ExampleMockup extends Component {
  constructor () {
    super();
    this.state = {
      menuData: []
    };
  }

  componentDidMount () {
    let menu = this;
    $.ajax({
      type: "GET",
      url: "http://128.88.242.47:8080/web/ExampleData/QuyetNV1/MockupData.json",
      dataType: "text",
      cache: false,
      success: function (data) {
        let list = JSON.parse(data);

        console.log(list);
        menu.setState({
          menuData : list.menudata
        });
      },
      error : function (response) {
        console.log("error ");
        console.log(response.responseText);
      }
    });
  }

  render () {
    let menu = this.state.menuData;
    let list = [];
    for (let i = 0; i < menu.length; i++ ) {
      list.push(<Anchor href="#" className="abc">{menu[i]}</Anchor>);
    }

    return (
      <div>
        <Menu label="Label">
          {list}
        </Menu>
        <Menu label="Label2">
          {list}
        </Menu>
        <Menu label="Node Management">
          {list}
        </Menu>
      </div>
    );
  }
};
