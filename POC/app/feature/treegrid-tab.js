var treegrid_example, treeGridData;
//treegrid function
function expand_all_treegrid() {
    treegrid_example.expandAllNode();
}

function collapse_all_treegrid() {
    treegrid_example.collapseAllNode();
}

function refreshTreeGridExample() {
    treeGridData = ArcMCExampleTreeGridData3.treegridData();
    treegrid_example.setProps({
        treeData: treeGridData
    });
    //    treegrid_example.updateFilter();
    //    treegrid_example.removeAllSort();
}

function alertSelectedRowInTreeGridExample() {
    if (treegrid_example.state.selectedList != null && treegrid_example.state.selectedList.length > 0) {
        var display = "";
        for (var i in treegrid_example.state.selectedList) {
            var selectedRow = treegrid_example.state.selectedList[i];
            display += selectedRow.eventArchives.text + "\n";
        }
        alert(display);
    } else {
        alert("No row has been selected!");
    }
}

function selectRowTreeGridExample(index) {
    treegrid_example.selectNode(treeGridData[index]);
}

function updateTreeGridExampleFirstRow() {
    var dataList = treegrid_example.props;
    dataList.treeData[0].eventArchives.text = "generated in code";
    treegrid_example.forceUpdate();
}

//create treegrid
var treeGridButtonConfig = [
    {
        label: "Expand All",
        onClick: expand_all_treegrid,
        type: "icon",
        icon: React.createElement("img", {
            src: "image/arc-icons/exp_expandall_orng_16x16.png",
            style:{
                margin: "0 5px 3px 5px"
            }
        })
    },
    {
        label: "Collapse All",
        onClick: collapse_all_treegrid,
        type: "icon",
        icon: React.createElement("img", {
            src: "image/arc-icons/exp_collapseall_orng_16x16.png",
            style:{
                margin: "0 5px 3px 5px"
            }
        })
    },
    /*{
        label: "Alert selected row",
        onClick: alertSelectedRowInTreeGridExample
    },
    {
        label: "Select 1st model",
        onClick: selectRowTreeGridExample.bind(null, 0)
    },
    {
        label: "Reload data from database",
        onClick: refreshTreeGridExample
    },
    {
        label: "Update data manually",
        onClick: updateTreeGridExampleFirstRow
    },*/
];

React.render(
    React.createElement(ButtonBar, {
        buttonConfig: treeGridButtonConfig
    }),
    document.getElementById("treegridButtonbar")
);

treeGridData = ArcMCExampleTreeGridData3.treegridData();
treegrid_example = React.render(
    React.createElement(
        TreeGrid, {
            columnConfig: ArcMCExampleTreeGridData3.columnConfig,
            treeData: treeGridData,
            options: {
                expandDepth: 2
            },
            view:{
                maxHeight: "500px",
//				width: "1100px"
            },
			selection: "multiple"
        }
    ),
    document.getElementById("treegrid")
);