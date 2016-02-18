import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';
import Message from './Message';
import ButtonBar from './ButtonBar';
export default class MessagesTab extends Component {

  constructor () {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount () {
    let mgs = this;
    $.ajax({
      type: "GET",
      url: "http://128.88.242.47:8080/web/ExampleData/QuanDH2/dataMessage.json",
      dataType: "text",
      cache: false,
      success: function (data) {
      // getData from server
        var list = JSON.parse(data);
        mgs.setState({
          data : list
        });
      },
      error: function (response) {
        console.log("error ");
        console.log(response.responseText);
      }
    });
  }
  render () {
    // let tab = Message.state.data;

    // for (var i = 0; i < tab.length; i++) {
    //   obj.push(tab[i].messageEnum);
    //   console.log(" " + tab[i].messageEnum);
    //   obj.push(tab[i].label);
    //   obj.push(tab[i].title);
    //   obj.push(tab[i].content);
    // }

    //--------------------------------------------------------------------------
    // var objData = [];
    let messTab = this.state.data;
    var messEnumData;
    var labelData;
    var titleData;
    var contentData;
    // console.log("" + messTab);
    // let messageTab = this;
    // let label = (
    //   <div key = {0}>{messageTab.props.labelContent}</div>
    // );
    // let titleCon = (
    //   <div key = {1}>{messageTab.props.titleContent}</div>
    // );
    // let msg = (
    //   <div key = {2}>{messageTab.props.msgContent}</div>
    // );

    // let typeEnum = (
    //   <div key = {0}>{this.props.typeContent}</div>
    // );
    var obj= [];
    for (var i = 0; i < messTab.length; i++) {
      messEnumData = messTab[i].messageEnum;
      labelData = messTab[i].label;
      titleData = messTab[i].title;
      contentData = messTab[i].content;
      obj.push(messEnumData, labelData, titleData, contentData);
    }

    console.log(""+obj.messEnumData);
    let messageButtonList = [
      {
        label: messTab.label,
        onClick: function (event) {
          let elementContainer = Popup.getPopupContainer();
          let element = React.createElement(
            Message, {
              // title: obj.titleData,
              // content: obj.contentData,
              // type: obj.messEnumData
              title: messTab.title,
              content: messTab.content,
              type: messTab.messageEnum
            }
          );
          ReactDOM.render(element, elementContainer);
        }
      }

      // ,{
      //   label: "Show Info Message",
      //   onClick: function (event) {
      //         let elementContainer = Popup.getPopupContainer();
      //     let element = React.createElement(
      //       Message, {
      //         title: "Event History \"Failed\" Info",
      //         content: "Logger get config backup status web service exception"
      //       }
      //     );
      //     ReactDOM.render(element, elementContainer);
      //   }
      // },
      // {
      //   label: "Show Warning Message",
      //   onClick: function (event) {
      //     let elementContainer = Popup.getPopupContainer();
      //     let element = React.createElement(
      //       Message, {
      //         title: "Push Association Warning",
      //         content: "Pushing an association with many nodes or many users can cause a significant performance impact. Are you sure you want to continue?",
      //         type: tab.state.MessageTypeEnum.WARNING
      //       }
      //     );
      //     ReactDOM.render(element, elementContainer);
      //   }
      // },
      // {
      //   label: "Show Error Message",
      //   onClick: function (event) {
      //     let elementContainer = Popup.getPopupContainer();
      //     let element = React.createElement(Message, {
      //       title: "Invalid Data Entry Error",
      //       content: "Selected User(s) & User List(s) cannot be empty. Please select at least one User or User List.",
      //       type: tab.state.MessageTypeEnum.ERROR
      //     });
      //     ReactDOM.render(element, elementContainer);
      //   }
      // },
      // {
      //   label: "Show Confirm Message",
      //   onClick: function (event) {
      //     let elementContainer = Popup.getPopupContainer();
      //     let element = React.createElement(Message, {
      //       title: "Confirm message box",
      //       content: "Are you sure to delete this folder?",
      //       type: tab.state.MessageTypeEnum.CONFIRM
      //     });
      //     ReactDOM.render(element, elementContainer);
      //   }
      // }
    ];

    return (
      React.createElement(ButtonBar, {buttonConfig: messageButtonList})
    );
  }
}
