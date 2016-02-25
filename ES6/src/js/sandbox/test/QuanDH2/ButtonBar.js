import React, { Component } from 'react';
import Button from 'grommet/components/Button';
export default class ButtonBar extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    var buttons = this.props.buttonConfig.map(function (config, index) {
      if (config.type == null || config.type == "button") {
        return React.createElement(Button, {
          key: index,
          label: config.label,
          onClick: config.onClick
        });
      }
      return React.createElement(
        Button, {
          key: index,
          label: config.label,
          onClick: config.onClick,
          type: config.type == null ? "button" : config.type
        }, [
          React.cloneElement(config.icon, {
            key: 0
          }),
          config.label
        ]
      );
    });
    return React.createElement("div", {className: "buttonbar"}, buttons);
  }
}
