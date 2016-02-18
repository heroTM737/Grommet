import React, { Component } from 'react';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Intro from './IntroTab';
import TreeTab from './TreeTab';
import MessagesTab from './MessagesTab';
// import Anchor from 'grommet/components/Anchor';
import './popup.css';
import './message.css';
// <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
export default class QuanDH2Tab extends Component {
  constructor () {
    super();
    this.state = {
    };
  }

  render () {
    let tabComponent = (
      <Tabs>
        <Tab title="Introduction">
          <Intro />
        </Tab>
        <Tab title="TreeTab">
          <TreeTab />
        </Tab>
        <Tab title="MessagesTab">
            <MessagesTab />
        </Tab>
      </Tabs>
    );
    return tabComponent;
  }
};
