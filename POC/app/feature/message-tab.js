//create message
var messageButtonList = [
    {
        label: "Show Info Message",
        onClick: function (event) {
            React.render(
                React.createElement(
                    Message, {
                        title: "Event History \"Failed\" Info",
                        content: "Logger get config backup status web service exception"
                    }
                ),
                Popup.getPopupContainer()
            );
        }
    },
    {
        label: "Show Warning Message",
        onClick: function (event) {
            React.render(
                React.createElement(
                    Message, {
                        title: "Push Association Warning",
                        content: "Pushing an association with many nodes or many users can cause a significant performance impact. Are you sure you want to continue?",
                        type: MessageTypeEnum.WARNING
                    }
                ),
                Popup.getPopupContainer()
            );
        }
    },
    {
        label: "Show Error Message",
        onClick: function (event) {
            React.render(
                React.createElement(Message, {
                    title: "Invalid Data Entry Error",
                    content: "Selected User(s) & User List(s) cannot be empty. Please select at least one User or User List.",
                    type: MessageTypeEnum.ERROR
                }),
                Popup.getPopupContainer()
            );
        },
        type: "icon",
        icon: React.createElement(Grommet.Icons.Base.Alert, {
            colorIndex: "brand"
        })
    },
    {
        label: "Show Confirm Message",
        onClick: function (event) {
            React.render(
                React.createElement(Message, {
                    title: "Confirm message box",
                    content: "Are you sure to delete this folder?",
                    type: MessageTypeEnum.CONFIRM
                }),
                Popup.getPopupContainer()
            );
        },
    },
]

React.render(
    React.createElement(ButtonBar, {
        buttonConfig: messageButtonList
    }),
    document.getElementById("messageButtonbar")
);