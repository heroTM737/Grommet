var Message = React.createClass({
    getInitialState: function () {
        return {
            popup: {}
        };
    },
    componentDidMount: function () {
        this.state.popup.center();
    },
    render: function () {
        var message = this;

        //create title
        var title = this.props.title;
        if (title == null) {
            title = "This is a simple message";
        }

        //create content
        var type = this.props.type;
        if (type == null) {
            type = MessageTypeEnum.INFO;
        }
        //button ok
        var buttonOK = React.createElement(Grommet.Button, {
            key: 0,
            label: "OK",
            primary: true,
            onClick: function () {
                message.state.popup.close();
            }
        });
        //button cancel
        var cancelButton = React.createElement(Grommet.Button, {
            key: 1,
            label: "Cancel",
            secondary: true,
            onClick: function () {
                message.state.popup.close();
            }
        });
        //button yes
        var yesButton = React.createElement(Grommet.Button, {
            key: 2,
            label: "Yes",
            primary: true,
            onClick: function () {
                message.state.popup.close();
            }
        });
        //button no
        var noButton = React.createElement(Grommet.Button, {
            key: 3,
            label: "No",
            secondary: true,
            onClick: function () {
                message.state.popup.close();
            }
        });
        var buttons = new Array();
        var icon_src = null;
        switch (type) {
        case MessageTypeEnum.WARNING:
            icon_src = "image/widget/warning_48x42.png";
            buttons.push(cancelButton);
            buttons.push(buttonOK);
            break;
        case MessageTypeEnum.ERROR:
            icon_src = "image/widget/cancel_512x512.png";
            buttons.push(buttonOK);
            break;
        case MessageTypeEnum.CONFIRM:
            icon_src = "image/widget/warning_48x42.png";
            buttons.push(cancelButton);
            buttons.push(noButton);
            buttons.push(yesButton);

            break;
        default:
            icon_src = "image/widget/info_512x512.png";
            buttons.push(buttonOK);
            break;
        }
        var image = React.createElement("img", {
            key: 0,
            src: icon_src,
            className: "messageicon"
        });

        var message_content = React.createElement("div", {
            key: 1,
            className: "horizontalcentertext",
            style: {
                minHeight: "50px"
            }
        }, this.props.content);

        var buttonBar = React.createElement("div", {
            key: 2,
            className: "messageButtonbar"
        }, buttons);

        var content = React.createElement("div", {
            key: 1,
        }, [image, message_content]);

        //positioning
        var top = "100px";
        var left = "100px";

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
});