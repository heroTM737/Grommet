import React, { Component } from 'react';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Intro from './IntroTab';
import DoubleView from './../../../widget/DoubleView';
import TreeGridTab from './../../example/TreeGridTab';
import ExampleMockup from './ExampleMockup';

export default class QuyetNV1Tab extends Component {
  constructor () {
    super();
    this.state = {};
  }

  dosomething () {
  }

  render () {
    let tree = (<TreeGridTab />);
    return (
      <Tabs>
        <Tab title="Introduction">
          <Intro />
        </Tab>
        <Tab title="Double View">
          <DoubleView leftContent={tree} rightContent={tree}/>
        </Tab>
        <Tab title="Double View Tab">
          <ExampleMockup />
        </Tab>
      </Tabs>
    );
  }
};
