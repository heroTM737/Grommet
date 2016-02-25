import React, { Component } from 'react';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Sidebar from 'grommet/components/Sidebar';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Split from 'grommet/components/Split';
import './LuanNT9Tab/style.scss';

import IntroductionTab from './LuanNT9Tab/IntroductionTab';
import TreeExampleTab from './LuanNT9Tab/TreeExampleTab.jsx';
import SearchListTab from './LuanNT9Tab/SearchListTab.jsx';
import TextArea from './textArea/textArea';
import DoubleTab from './../../../widget/DoubleView';

import Sandbox from './luannt9/Sandbox';
export default class LuanNT9Tab extends Component {

  constructor () {
    super();
    this.state = {
      widget: null,
      anchorlist: [],
      data: [],
      widgetmap: {}
    };
  }

  componentDidMount () {
    var tree = this;
    $.ajax({
      type: "GET",
      url: "http://128.88.242.47:8080/web/ExampleData/LuanNT9/tree.json",
      dataType: "text",
      cache: false,
      success: function (data) {
        console.log("success");
        var list = JSON.parse(data);

        var anchorlist = [];
        let onClick  = (i) => {
          let widgetmap = tree.state.widgetmap;
          tree.setState({
            widget : widgetmap[list[i].widget]
          }, function () {
            console.log("dataurl = " + list[i].dataurl);
            tree.refs.widget.loadDataAjax(list[i].dataurl);
          });
        };
        for (var i=0; i<list.length;i++) {
          anchorlist.push(
            <Anchor key={i} onClick = {onClick.bind(this,i)}> {list[i].value} </Anchor>
          );
        }

        tree.state.anchorlist = anchorlist;
        tree.forceUpdate();
      },
      error : function (response) {
        console.log("error ");
        console.log(response.responseText);
      }
    });
  }
  render () {

    let style = {
      display: "flex",
      padding: "5px 5px 5px 10px"
    };

    this.state.widgetmap =  {
      "IntroductionTab": <IntroductionTab ref="widget"/>,
      "TreeTab": <TreeExampleTab ref="widget"/>,
      "SearchListTab": <SearchListTab ref="widget"/>,
      "DoubleTab": <DoubleTab ref="widget"/>,
      "TextArea": <TextArea ref="widget"/>
    };

    return (
      <div>
        <Tabs>
          <Tab title="LoadJson">
            <div style={style}>
              <Split>
                <Sidebar colorIndex="light-2">
                  <Menu primary = {true} >
                    {this.state.anchorlist}
                  </Menu>
                </Sidebar>
              </Split>
              <div>
                  {this.state.widget}
              </div>
            </div>
          </Tab>
          <Tab title="Menu">
            <Sandbox />
          </Tab>
        </Tabs>

      </div>
    );
  }
};
