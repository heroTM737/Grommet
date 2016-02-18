import React, { Component } from 'react';
import DoubleView from './DoubleView';
import './style.css';


export default class DoubleViewTab extends Component {
  constructor () {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let tree = this;
    $.ajax({
      type: "GET",
      url: "http://128.88.242.47:8080/web/ExampleData/LuanNT9/DoubleView.json",
      dataType: "text",
      cache: false,
      success: function (data) {
        let list = JSON.parse(data);

        console.log(list);
        tree.setState({
          data : list
        });
      },
      error : function (response) {
        console.log("error ");
        console.log(response.responseText);
      }
    });
  }

  render () {
    let view = this.state.data;
    let listDV = [];
    for (let i = 0; i < view.numberOfView; i++) {
      let dView = (
        <div ><DoubleView leftContent={view.content[i].leftContent} /></div>
      );
      listDV.push(dView);
    }

    return (
      <div>{listDV}</div>
    );
  }
}
