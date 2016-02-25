import React, {Component} from 'react';

class ScrollBar extends Component {
  constructor() {
    super();
    this.state = {
      isScrolling: false,
      mouseDownY: 0,
      mouseDownTop: 0,
      handler: null,
      total: 0,
      visible: 0,
      minThumbHeight: 30
    };
  }

  componentWillMount() {
    this.state.handler = this.props.handler;
    if (this.state.handler == null) {
      this.state.handler = (value) => {
        console.log("do something " + value);
      };
    }

    if (this.props.total == null) {
      this.state.total = 0;
    } else {
      this.state.total = this.props.total;
    }

    if (this.props.visible == null) {
      this.state.visible = 0;
    } else {
      this.state.visible = this.props.visible;
    }
  }

  componentDidMount() {
    let scrollbar = this;
    let scrollHeight, thumbHeight, maxTop;

    $(document).on("mousedown", function(event) {
      scrollHeight = $(scrollbar.refs.container).outerHeight();
      thumbHeight = $(scrollbar.refs.thumb).outerHeight();
      maxTop = scrollHeight - thumbHeight;
    });

    $(document).on("mousemove", function(event) {
      if (scrollbar.state.isScrolling) {
        var top = scrollbar.state.mouseDownTop + event.pageY - scrollbar.state.mouseDownY;
        if (top < 0) {
          top = 0;
        }
        if (top > maxTop) {
          top = maxTop;
        }

        scrollbar.refs.thumb.style.top = top + "px";
        let nodeCount = scrollbar.state.total - scrollbar.state.visible + 1;
        let value = nodeCount * top / maxTop;
        scrollbar.state.handler(value);
      }
    });

    $(document).on("mouseup", function(event) {
      scrollbar.state.isScrolling = false;
    });
  }

  moveto(value) {
    let scrollbar = this;
    let scrollHeight = $(scrollbar.refs.container).outerHeight();
    let thumbHeight = $(scrollbar.refs.thumb).outerHeight();
    let maxTop = scrollHeight - thumbHeight;
    let nodeCount = scrollbar.state.total - scrollbar.state.visible + 1;
    let top = value / nodeCount * maxTop;
    top = Math.floor(top);
    $(scrollbar.refs.thumb).css("top", top + "px");
  }

  reset() {
    let scrollbar = this;
    this.state.isScrolling = false;
    $(scrollbar.refs.thumb).css("top", "0px");
  }

  updateTotal(total, callback) {
    this.update(total, this.state.visible, callback);
  }

  updateVisible(visible, callback) {
    this.update(this.state.total, visible, callback);
  }

  update(total, visible, callback) {
    let scrollbar = this;

    scrollbar.setState({
      total: total,
      visible: visible
    }, callback);

    if (total - visible > 0) {
      let scrollHeight = $(scrollbar.refs.container).outerHeight();
      let thumbHeight = scrollbar.state.minThumbHeight;
      let ratio = 1;
      if ((scrollHeight - thumbHeight) * ratio > (total - visible)) {
        thumbHeight = scrollHeight - (total - visible) / ratio;
      }

      scrollbar.refs.thumb.style.height = thumbHeight + "px";
      scrollbar.refs.thumb.style.display = "block";
    } else {
      scrollbar.refs.thumb.style.display = "none";
    }

  }

  render() {
    var scrollbar = this;

    let total = scrollbar.state.total;
    let visible = scrollbar.state.visible;
    let thumbStyle;
    let thumbHeight = scrollbar.state.minThumbHeight;

    if (total >  visible) {
      let scrollHeight = 560;
      let ratio = 1;
      if ((scrollHeight - thumbHeight) * ratio > (total - visible)) {
        thumbHeight = Math.floor(scrollHeight - (total - visible) / ratio);
      }

      thumbStyle = {
        height: thumbHeight + "px"
      };
    } else {
      thumbStyle = {
        display: "none",
        height: thumbHeight + "px"
      };
    }


    let onMouseDown = (event) => {
      scrollbar.state.isScrolling = true;
      scrollbar.state.mouseDownY = event.pageY;
      scrollbar.state.mouseDownTop = $(scrollbar.refs.thumb).position().top;
    };

    return (
      <div className="AS-ScrollBar" ref="container">
        <div className="AS-ScrollBar-Thumb"
          ref="thumb"
          style={thumbStyle}
          onMouseDown={onMouseDown}></div>
      </div>
    );
  }
}

export default ScrollBar;
