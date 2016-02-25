import './Sandbox.scss';

import React, { Component } from 'react';

//grommet widget
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';

//example
import TreeTab from './example/TreeTab.jsx';
import TreeGridTab from './example/TreeGridTab';
import GridTab from './example/GridTab';

//personal test
import LuanNT9Tab from './test/LuanNT9/LuanNT9Tab';
import QuyetNV1Tab from './test/QuyetNV1/QuyetNV1Tab';
import TienNX1Tab from './test/TienNX1/TienNX1Tab.jsx';

export default class Sandbox extends Component {
  constructor () {
    super();
    this.state = {
      name: "TienTM",
      status: "handsome",
      sex: "guy",
      extend: ""
    };
  }

  render () {
    let myComponent = (
      <div className="Sandbox">
        <Tabs initialIndex={2}>
          <Tab title="Test">
            <Tabs>
              <Tab title="LuanNT9">
                <LuanNT9Tab />
              </Tab>
              <Tab title="QuyetNV1">
                <QuyetNV1Tab />
              </Tab>
              <Tab title="TienNX1">
                <TienNX1Tab />
              </Tab>
            </Tabs>
          </Tab>
          <Tab title="Tree">
            <div>
              <TreeTab />
            </div>
          </Tab>
          <Tab title="Grid">
            <div>
              <GridTab />
            </div>
          </Tab>
          <Tab title="Tree Grid">
            <TreeGridTab />
          </Tab>
        </Tabs>
      </div>
    );

    return myComponent;
  }
};
