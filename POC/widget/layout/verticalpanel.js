var VerticalPanel = React.createClass({
    /**
     * React default: define initial state of this class.
     * @return {Object} The initial state of this class.
     */
    getInitialState: function () {
        return {
            children: []
        };
    },
    /**
     * React default: be called once when an instance is going to be mounted.
     * init children
     */
    componentWillMount: function () {
        var panel = this;
        var children = panel.props.children;
        if (children == null || children == undefined) {
            panel.state.children = [];
        } else {
            panel.state.children = children;
        }
    },
    /**
     * React default: be called once when an instance is  mounted.
     * calculate last element height to stretch window height
     */
    componentDidMount: function () {
        var panel = this;
        var paneldomnode = panel.getDOMNode();
        var children = $(paneldomnode).children();
        var calHeight = 0;
        for (var i = 0; i < children.length - 1; i++) {
            calHeight += $(children[i]).outerHeight();
        }
        
        $(children[children.length - 1]).height("calc(100% - " + calHeight + "px)");
    },
    /**
     * React default: render component.
     * @returns {ReactElement} The element to be painted by DOM.
     */
    render: function () {
        var panel = this;
        return React.createElement("div", {
            className: "AS-VerticalPanel"
        }, panel.state.children);
    },
    /**
     * Add element to this panel
     */
    add: function (element) {
        this.state.children.push(element);
        this.forceUpdate();
    }
});