import React, { Component } from 'react';
import Button from 'grommet/components/Button';

export default class ButtonTab extends Component {
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
    var tientest = this;
    let clickHandler = () => {
      tientest.setState({
        extend: "and he is talent too"
      });
    };

    return (
      <div>
        <div>
          {this.state.name} is a {this.state.status} {this.state.sex} {this.state.extend}
        </div>
        <div>
          <Button label="Click me to reveal more" onClick={clickHandler}/>
        </div>
      </div>
    );
  }
};
