import React, { Component } from 'react';

export default class DoubleView extends Component  {
  constructor() {
    super();
    this.state = {
      widgetMinWidth: 150,

      resizeState: {
        isResizing: false,
        rulerWidth: 5,
        firstPosition: {}
      }
    };
  }

  componentDidMount () {
    let doubleView = this;
    let minLeftWidth =  doubleView.state.widgetMinWidth;
    let minRightWidth = minLeftWidth;
    let leftdomnode = this.refs.leftRef;

    $(document).on("mousemove", function (event) {
      let leftPos = event.pageX - $(leftdomnode).parent().offset().left;
      let rightPos = $(leftdomnode).parent().outerWidth() + $(leftdomnode).parent().offset().left - event.pageX;
      if (doubleView.state.resizeState.isResizing) {
        let resize = leftPos > minLeftWidth ? (rightPos > minRightWidth ? leftPos : $(leftdomnode).parent().outerWidth() - minRightWidth) : minLeftWidth;
        doubleView.resizeColumn(resize);
        $(".AS-DoubleView").css("cursor", "col-resize");
      }
    });

    $(document).on("mouseup", function (event) {
      doubleView.state.resizeState.isResizing = false;
      $(".AS-DoubleView").css("cursor", "default");
    });
  }

  resizeColumn (leftSize) {
    let leftdomnode = this.refs.leftRef;
    let rightdomnode = this.refs.rightRef;
    $(leftdomnode).css("width", leftSize + "px");
    $(rightdomnode).css("width", "calc(100% - " + (leftSize + 5) +  "px)");
  }

  render () {
    let doubleView = this;

    let onMouseDown = (event) => {
      doubleView.state.firstPosition = event.pageX;

      let domnode = doubleView.refs.rulerRef;
      let offset = $(domnode).offset();
      let height = $(domnode).outerHeight();
      let relX = event.pageX - offset.left;
      let relY = event.pageY - offset.top;

      if (
        0 <= relX && relX <= doubleView.state.resizeState.rulerWidth &&
        0 <= relY && relY <= height
      ) {
        doubleView.state.resizeState.isResizing = true;
      } else {
        doubleView.state.resizeState.isResizing = false;
      }
    };

    let leftView = (
      <div key={0} className="AS-DoubleViewLeft" ref="leftRef">
       {doubleView.props.leftContent}
      </div>
    );

    let ruler = (
      <div
        className="AS-DoubleViewRuler"
        key={1}
        ref="rulerRef"
        onMouseDown={onMouseDown}>
      </div>
    );

    let rightView = (
      <div key={2} className="AS-DoubleViewRight" ref="rightRef">
        {doubleView.props.rightContent}
      </div>
    );

    let view = (
      <div className="AS-DoubleView">
        {[leftView, ruler, rightView]}
      </div>
    );

    return view;
  }
}
