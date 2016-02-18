import React, { Component } from 'react';
import DoubleView from './DoubleView';
import './style.css';

import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Image from 'grommet/components/Image';


export default class Sanbox extends Component {
  constructor () {
    super();
    this.state = {
      widget: null,
      anchorlist: [],
      subMenu: [],
      data: [],
      megaMenu: [],
      widgetmap: {}
    };
  }

  componentDidMount () {
    var tree = this;
    $.ajax({
      type: "GET",
      url: "http://128.88.242.47:8080/web/ExampleData/LuanNT9/menu.json",
      dataType: "text",
      cache: false,
      success: function (data) {
        console.log("success");
        var list = JSON.parse(data);

        var subMenu = [];
        var megaMenu = [];
        let megamenulist = [];
        for (var i=0; i<list.length;i++) {
          let onClick  = (i) => {
            let widgetmap = tree.state.widgetmap;
            tree.setState({
              widget : widgetmap[list[i].widget]
            }, function () {
              console.log("dataurl== " + list[i].dataurl);
              tree.refs.widget.loadTreeDataAjax(list[i].dataurl);
            });
          };
          let submenu = [];
          for (var j=0; j<list.length;j++) {
            submenu.push(
              <Anchor key={j} onClick = {onClick.bind(this,j)}>{list[i].submenu[j]}</Anchor>
            );
          }
          let menu = (
            <Menu label={list[i].menu}>
              {submenu}
            </Menu>
          );
          megamenulist.push(menu);

        }
        megaMenu.push(
            megamenulist
        );

        tree.state.megamenulist = megamenulist;
        tree.state.subMenu = subMenu;
        tree.state.megaMenu = megaMenu;
        tree.forceUpdate();
      },
      error : function (response) {
        console.log("error ");
        console.log(response.responseText);
      }
    });
  }

  render () {

    this.state.widgetmap =  {
      "DoubleView": <DoubleView ref="widget"/>
    };
    let homestyle = {
      color: "black",
      padding: "9px"
    };
    let crumbarstyle = {
      color: "#30a2ee"
    };
    return(
      <div>
        <div className="menuSandbox">
            <Menu direction="row" className="megaMenu" >
              <a href="http://localhost:9000/webpack-dev-server/" >
                <Image src = "http://128.88.242.47:8080/web/ExampleData/LuanNT9/arc.png" size="small" className="image"/>
              </a>
              <a className="home" href="http://localhost:9000/webpack-dev-server/" style={homestyle}>
                <h3> Home </h3>
              </a>
              {this.state.megaMenu}
            </Menu>
        </div>
        <div className = "crumBar">
          <a style={crumbarstyle} href="http://localhost:9000/webpack-dev-server/"> <h4> >>home </h4> </a>
        </div>
        <div>
            {this.state.widget}
        </div>

      </div>

    );
  }

};
