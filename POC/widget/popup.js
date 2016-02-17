var Popup = React.createClass({
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
    center: function () {
        var domnode = this.getDOMNode();

        var alignCenter = function () {
            var w = $(window).width();
            var h = $(window).height();
            var we = $(domnode).width();
            var he = $(domnode).height();
            //console.log(w + " " + h + " " + we + " " + he);

            $(domnode).css("top", ((h - he) / 2) + "px");
            $(domnode).css("left", ((w - we) / 2) + "px");
        }

        $(window).resize(function () {
            alignCenter();
        });
        alignCenter();
    },
    close: function () {
        var domnode = this.getDOMNode();
        domnode.parentNode.innerHTML = "";
        var node = document.getElementById("popupContainer");
        if (node != null) {
            node.parentNode.removeChild(node);
        }

        //guy who creates React is not clever enough to handle this exception
        //var unmounted = React.unmountComponentAtNode(domnode.parentNode);
        //if (!unmounted) {
        //    alert("Something wrong happened, we can not close this popup");
        //}
    },
    render: function () {
        var popup = this;
        var title = this.props.title;
        if (title == null) {
            title = "put title here";
        }

        var titleContainer = React.createElement("div", {
            key: 0
        }, title);
        var closeIcon = React.createElement("img", {
            key: 1,
            src: "image/widget/close_20x20.png",
            className: "closeicon",
            onClick: function () {
                popup.close();
            }
        });
        var headContainer = React.createElement("div", {
            key: 0,
            className: "popup-header",
        }, [titleContainer, closeIcon]);

        var widgetContainer = this.props.widget;
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
        
        var footerContainer = this.props.footerWidget;
        if(footerContainer != null){
            footerContainer = React.cloneElement(footerContainer, {
                key: 2
            });
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
        var childrenElement = [headContainer, widgetContainer];
        if(footerContainer!=null){
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
});
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
}