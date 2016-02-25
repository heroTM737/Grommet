import React, { Component } from 'react';
import Popup from './Popup';
import Button from 'grommet/components/Button';
import MessagesTab from './MessagesTab';
export default class Message extends Component {
  constructor () {
    super();
    this.state = {
      popup: {},
      data: []
    };
  }

  componentDidMount () {
    this.state.popup.center();
  }

  render () {
    let message = this;
    let title = this.props.title;
    let dataObj = MessagesTab.state.data;
    console.log("Get Data from MessageTab: " + dataObj);
    if (title == null) {
      title = "This is a simple message";
    }

        //button ok
    let buttonOK = React.createElement(Button, {
      key: 0,
      label: "OK",
      primary: true,
      onClick: function() {
        message.state.popup.close();
      }
    });
        //button cancel
    let cancelButton = React.createElement(Button, {
      key: 1,
      label: "Cancel",
      secondary: true,
      onClick: function () {
        message.state.popup.close();
      }
    });
        //button yes
    let yesButton = React.createElement(Button, {
      key: 2,
      label: "Yes",
      primary: true,
      onClick: function () {
        message.state.popup.close();
      }
    });
        //button no
    let noButton = React.createElement(Button, {
      key: 3,
      label: "No",
      secondary: true,
      onClick: function () {
        message.state.popup.close();
      }
    });
    let buttons = new Array();
    let icon_src = null;

    // let type = (MessagesTab typeContent= {dataObj.messageEnum[i]});

    // let typeContentMsgTabProp = MessagesTab.props.typeContent;
    // typeContentMsgTabProp = dataObj.messageEnum[i];
    // let type = typeContentMsgTabProp;

    if (type == null) {
      type = dataObj.messageEnum.Info;
    }

    switch (type) {
      case dataObj.messageEnum.Warning:
        icon_src = require('./image/imgMessage/warning_48x42.png');
        buttons.push(cancelButton);
        buttons.push(buttonOK);
        break;
      case dataObj.messageEnum.Error:
        icon_src = require('./image/imgMessage/cancel_512x512.png');
        buttons.push(buttonOK);
        break;
      case dataObj.messageEnum.Confirm:
        icon_src = require('./image/imgMessage/warning_48x42.png');
        buttons.push(cancelButton);
        buttons.push(noButton);
        buttons.push(yesButton);
        break;
      default:
        icon_src = require('./image/imgMessage/info_512x512.png');
        buttons.push(buttonOK);
        break;
    }

    let image = React.createElement("Image", {
      key: 0,
      src: icon_src,
      className: "messageicon"
    });

    let message_content = React.createElement("div", {
      key: 1,
      className: "horizontalcentertext",
      style: {
        minHeight: "50px"
      }
    }, this.props.content);

    let content = React.createElement("div", {
      key: 1
    }, [image, message_content]);

    let buttonBar = React.createElement("div", {
      key: 2,
      className: "messageButtonbar"
    }, buttons);

      //return element
    return React.createElement(Popup, {
      ref: function (rte) {
        message.state.popup = rte;
      },
      title: title,
      widget: content,
      footerWidget: buttonBar,
      className: "message"
    });

  }
}
