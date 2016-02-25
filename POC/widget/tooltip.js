var Tooltip = React.createClass({
    getInitialState: function () {
        return {
            top: "100px",
            left: "100px"
        };
    },
    componentDidMount: function () {
        var tooltip = this;
        var domnode = this.getDOMNode();
        Tooltip.closeFunction = function (event) {
            var list = $(event.target).closest(domnode);
            if (list.get(0) != $(domnode).get(0)) {
                if (domnode.parentNode != null) {
                    tooltip.close();
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
        var tooltip = this;
        
        var widget = this.props.widget;
        if (widget == null) {
            widget = "tootip content";
        }

        if (this.props.position != null) {
            if (this.props.position.top != null) {
                tooltip.state.top = this.props.position.top;
            }
            if (this.props.position.left != null) {
                tooltip.state.left = this.props.position.left;
            }
        }

        return React.createElement("div", {
            className: "popup tooltip " + (tooltip.props.className != null ? tooltip.props.className : ""),
            style: {
                top: tooltip.state.top,
                left: tooltip.state.left
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