var treegrid_example, treeGridData;

treeGridData = ArcMCExampleTreeGridData3.treegridData();
treegrid_example = React.createElement(
    TreeGrid, {
        columnConfig: ArcMCExampleTreeGridData3.columnConfig,
        treeData: treeGridData,
        view: {
            maxHeight: "500px"
        }
    }
);