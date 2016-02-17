//create popup
var showPopupButton = React.createElement(Grommet.Button, {
    label: "Show Popup",
    onClick: function () {
        React.render(
            React.createElement(
                Popup, {
                    position: {
                        top: "100px",
                        left: "200px"
                    }
                }
            ),
            Popup.getPopupContainer()
        );
    }
});
var popup_example = React.render(
    showPopupButton,
    document.getElementById("popuptest")
);