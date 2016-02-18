import React, { Component } from 'react';
import Section from 'grommet/components/Section';
import Sandbox from './../sandbox/Sandbox';

export default class TodoAppDashboard extends Component {

  constructor () {
    super();
    this.state = {};
  }

  render () {
    return (
      <Section primary={true}>
        <Sandbox />
      </Section>
    );
  }
};
