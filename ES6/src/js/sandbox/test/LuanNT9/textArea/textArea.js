import React, { Component } from 'react';

import Button from 'grommet/components/Button';
import FormFields from 'grommet/components/FormFields';

export default class textArea extends Component {

  constructor () {
    super();
    this.state = {
      data: ""
    };
  }

  render () {
    let clickHandler = () => {
      window.alert(this.refs.textarea1.value + " " + this.refs.textarea2.value);
    };

    return (
      <div>
        <div>
          <FormFields>
                <textarea id="id1" type="text" ref="textarea1"> </textarea>
                <textarea id="id2" type="text" ref="textarea2"> </textarea>
          </FormFields>
        </div>
        <div>
          <Button label="Get Content" onClick={clickHandler}/>
        </div>
      </div>

    );
  }

};
