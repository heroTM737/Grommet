var groupinggrid_example, groupinggridData;
//create grouping grid
groupinggridData = ArcMCExampleGroupingGridData.gridData();
groupinggrid_example = React.render(
    React.createElement(
        GroupingGrid, {
            bodyData: groupinggridData,
            columnConfig: ArcMCExampleGroupingGridData.columnConfig,
            handler: {},
            selection: "single",
            groupField: "machine",
            view: {
                maxHeight: "600px"
            }
        }
    ),
    document.getElementById("groupinggrid")
);