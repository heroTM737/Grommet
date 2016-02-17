var scriptList = [
    "app/arcsightdata.js",
    "app/arcsight.js",
    "app/data.js",
    "js/tool.js"
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
        return React.createElement("div", {className: "buttonbar"}, buttons);
    }
});

//create component
$(document).ready(function () {
    var widgetExampleList = [
        "app/feature/grid-tab.js",
        "app/feature/tree-tab.js",
        "app/feature/treegrid-tab.js",
        "app/feature/grouping-tab.js",
        "app/feature/dropdown-tab.js",
        "app/feature/search-tab.js",
        "app/feature/popup-tab.js",
        "app/feature/message-tab.js",
    ];

    widgetExampleList.forEach(function (entry) {
        $.ajax({
            url: entry,
            dataType: "script",
        });
    });

});