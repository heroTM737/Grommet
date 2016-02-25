import './TienNX1Tab.scss';

import React, { Component } from 'react';

//grommet widget
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';

//test components
import FontAwesomeTab from './FontAwesomeTab';
import ButtonTab from './ButtonTab';
import GrommetIconTab from './GrommetIconTab';

export default class TienNX1Tab extends Component {
  constructor () {
    super();
    this.state = {};
  }

  componentDidMount () {
    $.ajax({
      type: "GET",
      url: "http://128.88.242.47:8080/web/ExampleData/tree.json",
      dataType: "text",
      // crossDomain: true,
      success: function (data, textStatus, jqXHR) {
        console.log("success");
        console.log(data);
      },
      error : function (response) {
        console.log("error ");
        console.log(response.responseText);
      }
    });
  }

  render () {
    return (
      <div className="TienNX1Tab">
        <Tabs>
          <Tab title="Test Button">
            <ButtonTab />
          </Tab>
          <Tab title="Font Awesome">
            <FontAwesomeTab />
          </Tab>
          <Tab title="Grommet Icon">
            <GrommetIconTab />
          </Tab>
        </Tabs>
      </div>
    );
  }
};
