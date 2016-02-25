var grid_example, gridData;

//grid function
function buttonAlert() {
    if (grid_example.state.selectedList != null && grid_example.state.selectedList.length > 0) {
        var display = "";
        for (var i in grid_example.state.selectedList) {
            var selectedRow = grid_example.state.selectedList[i];
            display += selectedRow.eventArchives.renderData[selectedRow.eventArchives.status].text + "\n";
        }
        alert(display);
    } else {
        alert("No row has been selected!");
    }
}


function updateGridExampleFirstRow() {
    var dataList = grid_example.props;
    dataList.bodyData[0].eventStatus.status = "loaded";
    grid_example.forceUpdate();
}


function selectRowGridExample(index) {
    grid_example.selectNode(gridData[index]);
}

var gridButtonConfig = [
    {
        label: "Alert selected row",
        onClick: buttonAlert
    },
    {
        label: "Select 3rd row",
        onClick: selectRowGridExample.bind(null, 2)
    },
    {
        label: "Update data manually",
        onClick: updateGridExampleFirstRow
    }
];

var buttonBar1 = React.createElement(ButtonBar, {
    key: 0,
    buttonConfig: gridButtonConfig
});

gridData = ArcMCExampleGridData.gridData();
grid_element = React.createElement(
    Grid, {
        key: 1,
        bodyData: gridData,
        columnConfig: ArcMCExampleGridData.columnConfig,
        handler: {},
        selection: "multiple",
        view: {
            autoResize: true,
            minWidth: "500px",
        },
        style: {
            height: "100%"
        },
        ref: function (component) {
            grid_example = component;
        }
    }
);


var reloadNor = function () {
    var nor = $("#numberOfRecordID").val();
    if (nor == null || nor == "" || nor <=0) {
        nor = 100;
    }
//    refreshGridExample(nor);
}
var numberOfRecord = React.createElement("input", {
    key: 0,
    id: "numberOfRecordID",
    type: "number",
    placeholder: "100 records",
    onKeyUp: function (event) {
        if (event.keyCode == 13) {
            reloadNor();
        }
    }
});
var loadWithNOR = React.createElement(Grommet.Button, {
    key: 1,
    label: "Reload Data",
    onClick: reloadNor
});
var buttonBar2 = React.createElement("div", {
    className: "buttonbar"
},[loadWithNOR, numberOfRecord]);

var basicGridContainer = React.createElement(VerticalPanel, {
    children: [buttonBar1, buttonBar2, grid_element]
});