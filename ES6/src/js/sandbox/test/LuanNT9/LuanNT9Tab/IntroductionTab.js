import React, { Component } from 'react';
//import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';

export default class IntroductionTab extends Component {
  constructor () {
    super();
    this.state = {
      text : "I am a ",
      data : [],
      anchorlist : []
    };
  }

componentDidMount () {
  console.log("interaction>>>>>");
}

  render () {
    // let handlerClick = () =>{
    //   this.setState({
    //     data : "Men"
    //   });
    // };
    return (
      <div>
        <Menu label="Node Management">
            <Anchor href="#">Link 1</Anchor>
        </Menu>
      </div>
    );
  }
};
