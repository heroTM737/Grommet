var Tooltip = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {
        var popup = this;
        var domnode = this.getDOMNode();
        Popup.closeFunction = function (event) {
            var list = $(event.target).closest(domnode);
            if (list.get(0) != $(domnode).get(0)) {
                if (domnode.parentNode != null) {
                    popup.close();
                }
            }
        }
    },
    close: function () {
        var domnode = this.getDOMNode();
        domnode.parentNode.innerHTML = "";
        var node = document.getElementById("popupContainer");
        if (node != null) {
            node.parentNode.removeChild(node);
        }
    },
    render: function () {
        var widget = this.props.widget;
        if (widget == null) {
            widget = "tootip content";
        }

        var top = "100px";
        var left = "100px";
        if (this.props.position != null) {
            if (this.props.position.top != null) {
                top = this.props.position.top;
            }
            if (this.props.position.left != null) {
                left = this.props.position.left;
            }
        }

        return React.createElement("div", {
            className: "popup " + (popup.props.className != null ? popup.props.className : ""),
            style: {
                top: top,
                left: left
            }
        }, widget);
    }
});
Tooltip.closeFunction = null;
$(document).mouseup(function (event) {
    if (Tooltip.closeFunction != null) {
        Tooltip.closeFunction(event);
    }
});
Tooltip.getTooltipContainer = function () {
    var container = document.getElementById("tooltipContainer");
    if (container == null) {
        var insertID = function () {
            $("body").append("<div id='tooltipContainer'></div>");
        };
        $.when(insertID()).done(function () {
            container = document.getElementById("tooltipContainer");
        });
    }
    return container;
}