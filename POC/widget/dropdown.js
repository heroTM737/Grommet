var DropDown = React.createClass({
    /**
     * React default: define initial state of this class.
     * @return {Object} The initial state of this class.
     */
    getInitialState: function () {
        return {
            value: "selected here",
            showDrop: false
        };
    },
    /**
     * React default: be called after component is mounted.
     * Adds listener to hide dropdown.
     */
    componentDidMount: function () {
        var dropdown = this;
        $(document).mouseup(function (event) {
            var list = $(event.target).closest(dropdown.getDOMNode());
            if (list.get(0) != $(dropdown.getDOMNode()).get(0)) {
//                dropdown.state.showDrop = false;
                dropdown.forceUpdate();
            }
        });
    },
    /**
     * React default: render component.
     * @returns {ReactElement} The element to be painted by DOM.
     */
    render: function () {
        var dropdown = this;
        var widget = this.props.widget;

        //selected box
        var text = this.state.value;
        var valueElement = React.createElement("div", {
            key: 0,
            className: "valueContainer",
            style: {
                paddingLeft: "5px"
            },
            onClick: function () {
                dropdown.state.showDrop = !dropdown.state.showDrop;
                dropdown.forceUpdate();
            }
        }, text);

        //widget container
        var widgetContainerStyle = "hidden";
        if (dropdown.state.showDrop) {
            widgetContainerStyle = "";
        }

        var widgetContainer = React.createElement("div", {
            key: 1,
            className: "widgetContainer " + widgetContainerStyle
        }, widget);

        //return element
        return React.createElement("div", {
            className: "grommet_dropdown"
        }, [
            valueElement,
            widgetContainer
        ]);
    },
    /**
     * Update selected (visible) value.
     * @param {Object} The value.
     */
    updateValue: function (value) {
        this.state.value = value;
        this.forceUpdate();
    }
});