var scriptList = [
    "app/arcsightdata.js",
    "app/arcsight.js",
    "app/data.js"
];

scriptList.forEach(function (entry) {
    $.ajax({
        url: entry,
        dataType: "script",
        async: false
    });
});

var ButtonBar = React.createClass({
    render: function () {
        var buttons = this.props.buttonConfig.map(function (config, index) {
            if (config.type == null || config.type == "button") {
                return React.createElement(Grommet.Button, {
                    key: index,
                    label: config.label,
                    onClick: config.onClick,
                });
            }
            return React.createElement(
                Grommet.Button, {
                    key: index,
                    label: config.label,
                    onClick: config.onClick,
                    type: config.type == null ? "button" : config.type,
                }, [
                    React.cloneElement(config.icon, {
                        key: 0
                    }),
                    config.label
                ]
            );

        });
        return React.createElement("div", {
            className: "buttonbar"
        }, buttons);
    }
});

function loadAllExample() {
    var widgetExampleList = [
        "app2/example/basicgrid.js",
        "app2/example/treegrid.js"
    ];

    widgetExampleList.forEach(function (entry) {
        $.ajax({
            url: entry,
            dataType: "script",
            async: false
        });
    });
}

//create component
$(document).ready(function () {
    loadAllExample();

    var example_view;
    
    var widget_example = basicGridContainer;

    var left_tree = React.createElement(
        Tree, {
            treeData: ArcMCExampleTreeData.getTreeExample(),
            handler: {
                rowClickHandler: function (event, data) {
                    if (data.name == "Basic Grid") {
                        example_view.setProps({
                            rightWidget: basicGridContainer
                        });
                        example_view.forceUpdate();
                    } else if (data.name == "Tree Grid") {
                        example_view.setProps({
                            rightWidget: treegrid_example
                        });
                        example_view.forceUpdate();
                    } else {
                        console.log(" not yet support");
                    }
                }
            }
        }
    )

    example_view = React.render(React.createElement(DoubleView, {
        leftWidget: left_tree,
        rightWidget: widget_example
    }), document.getElementById("AS-Window"));
});