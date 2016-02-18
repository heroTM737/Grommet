import { Component } from 'react';
export default class MessageTypeEnum extends Component {

  constructor () {
    super();
    this.state = {};
  }
  getInitialState () {
    return {
      ERROR:0,
      WARNING:1,
      CONFIRM:2,
      INFO:3
    };
  }
}
