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

function refreshGridExample(numberOfRecord) {
    var f1 = function () {
        console.log("f1");
        grid_example.state.fireNextCallback = true;
        grid_example.mask();
        
//        ASTool.mask($("#tabContent"));
    }

    var f2 = function () {
        console.log("f2");
        setTimeout(function () {
            gridData = ArcMCExampleGridData.gridData(numberOfRecord);
            grid_example.reloadData(gridData);
        }, 100);
    }

    var f3 = function () {
        console.log("f3");
        grid_example.unmask();
        
//        ASTool.unmask($("#tabContent"));
    }

    grid_example.executeCallback([f1, f2, f3]);
    
}

function selectRowGridExample(index) {
    grid_example.selectNode(gridData[index]);
}

//create grid
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
React.render(
    React.createElement(ButtonBar, {
        buttonConfig: gridButtonConfig
    }),
    document.getElementById("gridButtonbar")
);

var reloadNor = function () {
    var nor = $("#numberOfRecordID").val();
    if (nor == null || nor == "" || nor <=0) {
        nor = 100;
    }
    refreshGridExample(nor);
}
var globalMask = function(){
    ASTool.mask(parent.document.body);
    
    setTimeout(function() {
        ASTool.unmask(parent.document.body);
    }, 3000);

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
var loadWithNORGlobalMask = React.createElement(Grommet.Button, {
    key: 2,
    label: "Global Mask",
    onClick: globalMask
})
React.render(
    React.createElement("div", {
        className: "buttonbar"
    }, [loadWithNOR, loadWithNORGlobalMask, numberOfRecord]),
    document.getElementById("gridButtonbar2")
);

gridData = ArcMCExampleGridData.gridData();
grid_example = React.render(
    React.createElement(
        Grid, {
            bodyData: gridData,
            columnConfig: ArcMCExampleGridData.columnConfig,
            handler: {},
            selection: "multiple",
            view: {
                autoResize: true,
                minWidth: "500px",
                maxHeight: "600px"
            }
        }
    ),
    document.getElementById("grid")
);
