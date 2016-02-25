var DoubleView = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount: function(){
    },
    render: function () {
        var leftWidget = this.props.leftWidget;
        var leftView = React.createElement("div", {
            key: 0,
            className: "AS-DoubleViewLeft",
            ref: "leftView"
        }, leftWidget);

        var rightWidget = this.props.rightWidget;
        var rightView = React.createElement("div", {
            key: 1,
            className: "AS-DoubleViewRight",
            ref: "rightView"
        }, rightWidget);

        var view = React.createElement("div", {
            className: "AS-DoubleView"
        }, [leftView, rightView]);

        return view;
    }
});