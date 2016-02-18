import React, { Component } from 'react';

export default class Popup extends Component {
  constructor () {
    super();
    this.state = {};
  }

  componentDidMount () {
    let popup = this;
    let domnode = React.findDOMNode(this);
    Popup.closeFunction = function (event) {
      let list = $(event.target).closest(domnode);
      if (list.get(0) != $(domnode).get(0)) {
        if (domnode.parentNode != null) {
          popup.close();
        }
      }
    };
  }

  center () {
    let domnode = React.findDOMNode(this);

    let alignCenter = function () {
      let w = $(window).width();
      let h = $(window).height();
      let we = $(domnode).width();
      let he = $(domnode).height();

      $(domnode).css("top", ((h - he) / 2) + "px");
      $(domnode).css("left", ((w - we) / 2) + "px");
    };

    $(window).resize(function () {
      alignCenter();
    });
    alignCenter();
  }

  close () {
    let domnode = React.findDOMNode(this);
    domnode.parentNode.innerHTML = "";
    let node = document.getElementById("popupContainer");
    if (node != null) {
      node.parentNode.removeChild(node);
    }
  }

  render () {
    let popup = this;
    let title = this.props.title;

    if (title == null) {
      title = "put title here";
    }

    let titleContainer = React.createElement("div", {
      key: 0
    }, title);

    let closeIcon = React.createElement("Image", {
      key: 1,
      src: require('./image/imgMessage/close_20x20.png'),
      className: "closeicon",
      onClick: function () {
        popup.close();
      }
    });

    let headContainer = React.createElement("div", {
      key: 0,
      className: "popup-header"
    }, [titleContainer, closeIcon]);

    let widgetContainer = this.props.widget;
    if (widgetContainer == null) {
      widgetContainer = React.createElement("div", {
        key: 1,
        className: "popup-body"
      }, "widget here");
    } else {
      widgetContainer = React.cloneElement(widgetContainer, {
        key: 1,
        className: "popup-body"
      });
    }

    let footerContainer = this.props.footerWidget;
    if (footerContainer != null) {
      footerContainer = React.cloneElement(footerContainer, {
        key: 2
      });
    }

    let top = "100px";
    let left = "100px";
    if (this.props.position != null) {
      if (this.props.position.top != null) {
        top = this.props.position.top;
      }
      if (this.props.position.left != null) {
        left = this.props.position.left;
      }
    }

    let childrenElement = [headContainer, widgetContainer];
    if (footerContainer!=null) {
      childrenElement.push(footerContainer);
    }

    return React.createElement("div", {
      className: "popup " + (popup.props.className != null ? popup.props.className : ""),
      style: {
        top: top,
        left: left
      }
    }, childrenElement);
  }
}

Popup.closeFunction = null;
$(document).mouseup(function (event) {
  if (Popup.closeFunction != null) {
    Popup.closeFunction(event);
  }
});

Popup.getPopupContainer = function () {
  var container = document.getElementById("popupContainer");
  if (container == null) {
    var insertID = function () {
      $("body").append("<div id='popupContainer'></div>");
    };
    $.when(insertID()).done(function () {
      container = document.getElementById("popupContainer");
    });
  }
  return container;
};
