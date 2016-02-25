var GroupingGridRow = React.createClass({
    getInitialState: function () {
        return {
            expanded: false
        };
    },
    render: function () {
        var rowData = this.props.rowData;
        var columnConfigList = this.props.columnConfig;
        var gridrow = this;
        var grid = this.props.grid;

        var className = "fa fa-minus";
        if (this.state.expanded) {
            className = "fa fa-plus";
        }
        var toogleIcon = React.createElement("i", {
            key: 0,
            className: className,
            style: {
                color: "#8f8f8f",
                margin: "0 10px 0 5px"
            }
        });

        var groupName = React.createElement("span", {
            key: 1,
            style: {
                fontWeight: "bold"
            }
        }, rowData);

        var columnList = React.createElement("td", {
            colSpan: columnConfigList.length,

        }, [toogleIcon, groupName]);

        return React.createElement("div", {
            className: "AS-GridRow groupinggridrow",
            onClick: this.rowClickHandler
        }, columnList);
    },
    rowClickHandler: function () {
        this.state.expanded = !this.state.expanded;
        this.props.rowClickHandler();
    }
});
var GroupingGrid = React.createClass({
    getInitialState: function () {
        return {
            sortState: {},
            filterValue: {},
            ignoreFilter: {},
            selectedList: [],
            eventBus: {},
            contentWidth: 0,
            isMasking: false,
        };
    },
    componentWillMount: function () {
        //group data
        this.groupData();

        //init visible state for each row
        var bodyData = this.props.bodyData;
        for (var i in bodyData) {
            if (bodyData[i].visible == null) {
                bodyData[i].visible = {};
            }
        }
    },
    componentDidMount: function () {
        var grid = this;
        var griddomnode = this.getDOMNode();
        var bodydomnode = this.refs.bodyDiv.getDOMNode();
        var headdomnode = this.refs.headDiv.getDOMNode();
        var contentWidth = 0;
        var columnConfig = this.props.columnConfig;
        for (var i in columnConfig) {
            contentWidth += columnConfig[i].width != null ? Number(columnConfig[i].width) : 150;
        }
        grid.state.contentWidth = contentWidth;
        var cw = grid.state.contentWidth;
        $(bodydomnode).find(".AS-GridRow").css("min-width", cw + "px");
        $(headdomnode).find(".AS-GridRow").css("min-width", cw + "px");
        if (grid.props.view.width != null) {
            $(bodydomnode).width(grid.props.view.width);
            $(headdomnode).width(grid.props.view.width);
        }

        $(bodydomnode).scroll(function (event) {
            var left = $(bodydomnode).scrollLeft();
            $(headdomnode).find(".AS-GridRow").css("transform", "translate3d(" + (-left) + "px, 0px, 0px)");
        });
    },
    render: function () {
        //getting variable
        var grid = this;
        var columnConfigList = this.props.columnConfig;
        var groupField = this.props.groupField;

        //render table head
        var head = function () {
            grid.state.headElement = React.createElement(
                GridHead, {
                    key: 0,
                    grid: grid
                }
            );
            return grid.state.headElement;
        };

        //render table body
        var bodyDataList = this.props.bodyData;
        var body = function () {
            var rowList = [];
            var rowkey = 0;
            rowList.push(
                React.createElement(
                    GroupingGridRow, {
                        key: rowkey,
                        rowData: bodyDataList[0][groupField],
                        columnConfig: columnConfigList,
                        rowClickHandler: function () {
                            grid.toogleGroup(bodyDataList[0][groupField]);
                        },
                        grid: grid
                    }, []
                )
            );
            for (var index = 0; index < bodyDataList.length; index++) {
                rowkey++;
                var node = bodyDataList[index];
                rowList.push(
                    React.createElement(
                        GridRow, {
                            key: rowkey,
                            rowData: node,
                            columnConfig: columnConfigList,
                            rowClickHandler: grid.rowClickHandler,
                            grid: grid
                        }, []
                    )
                );
                if (bodyDataList[index + 1] != null && bodyDataList[index][groupField] != bodyDataList[index + 1][groupField]) {
                    rowkey++;
                    rowList.push(
                        React.createElement(
                            GroupingGridRow, {
                                key: rowkey,
                                rowData: bodyDataList[index + 1][groupField],
                                columnConfig: columnConfigList,
                                rowClickHandler: grid.toogleGroup.bind(null, bodyDataList[index + 1][groupField]),
                                grid: grid
                            }, []
                        )
                    );
                }
            }

            return rowList;
        };

        //compute height for body
        var maxHeight = "auto";
        if (grid.props.view != null && grid.props.view.maxHeight != null) {
            maxHeight = grid.props.view.maxHeight;
        }
        //create result
        var headdiv = React.createElement(
            "div", {
                key: 0,
                className: "AS-GridHead",
                ref: "headDiv"
            }, head()
        );

        var bodyDiv = React.createElement(
            "div", {
                key: 1,
                className: "AS-GridBody",
                style: {
                    maxHeight: maxHeight
                },
                ref: "bodyDiv"
            }, body()
        );

        var maskStyle = "hidden";
        if (grid.state.isMasking) {
            maskStyle = "";
        }
        var maskDiv = React.createElement(
            "div", {
                key: 2,
                className: "mask " + maskStyle,
            }, React.createElement("div", {
                className: "maskInside"
            })
        );

        return React.createElement(
            "div", {
                className: "AS-Grid tree treegrid",
            }, [headdiv, bodyDiv]
        );
    },
    resizeColumn: function (increaseWidth, index) {
        var grid = this;
        var colConfig = grid.props.columnConfig[index];
        colConfig.width = Number(colConfig.width) + increaseWidth;
        if (colConfig.width < 100) {
            colConfig.width = 100;
        }

        var contentWidth = 0;
        var columnConfig = this.props.columnConfig;
        for (var i in columnConfig) {
            contentWidth += columnConfig[i].width != null ? Number(columnConfig[i].width) : 150;
        }
        grid.state.contentWidth = contentWidth;
        var cw = grid.state.contentWidth;
        var bodydomnode = this.refs.bodyDiv.getDOMNode();
        var headdomnode = this.refs.headDiv.getDOMNode();
        $(bodydomnode).find(".AS-GridRow").css("min-width", cw + "px");
        $(headdomnode).find(".AS-GridRow").css("min-width", cw + "px");
        grid.forceUpdate();
    },
    handleFilter: function (name, event) {
        this.state.filterValue[name] = event.target.value;
        this.updateFilter();
    },
    updateFilter: function () {
        var grid = this;
        var columnConfigList = this.props.columnConfig;
        var bodyDataList = this.props.bodyData;

        var filterFunctionList = {};
        for (var c in columnConfigList) {
            if (columnConfigList[c].filterConfig != null && columnConfigList[c].filterConfig != null) {
                filterFunctionList[columnConfigList[c].propertyName] = columnConfigList[c].filterConfig.check;
            } else {
                filterFunctionList[columnConfigList[c].propertyName] = function (node, value) {
                    if (node.indexOf(value) >= 0) {
                        return true;
                    }
                    return false;
                }
            }
        }

        //do filter for all column
        for (var r in bodyDataList) {
            bodyDataList[r].visible.show = true;
            for (var c in columnConfigList) {
                var propertyName = columnConfigList[c].propertyName;
                if (this.state.ignoreFilter[propertyName] == false) {
                    continue;
                }
                var valueToFilt = this.state.filterValue[propertyName];
                if (valueToFilt == null) {
                    continue;
                }
                if (!filterFunctionList[propertyName](bodyDataList[r][propertyName], valueToFilt)) {
                    bodyDataList[r].visible.show = false;
                    break;
                }
            }
        }

        //update ui
        this.forceUpdate();
    },
    toogleGroup: function (groupName) {
        var bodyData = this.props.bodyData;
        var groupField = this.props.groupField;
        for (var i in bodyData) {
            if (bodyData[i][groupField] == groupName) {
                if (bodyData[i].visible.groupVisible == null) {
                    bodyData[i].visible.groupVisible = false;
                } else {
                    bodyData[i].visible.groupVisible = !bodyData[i].visible.groupVisible;
                }
            }
        }

        this.forceUpdate();
    },
    rowClickHandler: function (rowData, selected) {
        var selection = this.props.selection;
        switch (selection) {
        case "none":
            break;
        case "multiple":
            if (selected) {
                this.state.selectedList.push(rowData);
            } else {
                var index = this.state.selectedList.indexOf(rowData);
                this.state.selectedList.splice(index, 1);
            }
            break;
        default:
            if (selected) {
                this.state.selectedList = [rowData];
            } else {
                this.state.selectedList = [];
            }
            break;
        }
        this.forceUpdate();
    },
    sortColumn: function (name, sortDir) {
        var columnConfig = this.props.columnConfig;
        var groupField = this.props.groupField;
        var reserve = this.state.sortState[name];
        for (var i in columnConfig) {
            this.state.sortState[columnConfig[i].propertyName] = null;
        }
        this.state.sortState[name] = reserve;

        if (sortDir == null || sortDir == undefined) {
            if (this.state.sortState[name] == null || this.state.sortState[name] == undefined) {
                this.state.sortState[name] = true;
            } else {
                this.state.sortState[name] = !this.state.sortState[name];
            }
        } else {
            this.state.sortState[name] = sortDir;
        }
        var sortState = this.state.sortState[name];
        var bodyDataList = this.props.bodyData;
        var swap = function (i, j) {
            var tem = bodyDataList[i];
            bodyDataList[i] = bodyDataList[j];
            bodyDataList[j] = tem;
        }

        var defaultSortFunction = function (node1, node2) {
            if (node1 > node2) {
                return 1;
            } else if (node1 == node2) {
                return 0;
            }
            return -1;
        }
        var sortFunction = defaultSortFunction;
        for (var i in columnConfig) {
            if (columnConfig[i].propertyName == name) {
                if (columnConfig[i].sortConfig != null) {
                    sortFunction = columnConfig[i].sortConfig.compare;
                }
                break;
            }
        }

        var groupPoints = [];
        groupPoints.push(0);
        for (var i = 0; i < bodyDataList.length - 1; i++) {
            if (bodyDataList[i][groupField] != bodyDataList[i + 1][groupField]) {
                groupPoints.push(i + 1);
            }
        }
        groupPoints.push(bodyDataList.length);
        //        console.log(sortFunction);
        for (var p = 0; p < groupPoints.length - 1; p++) {
            for (var i = groupPoints[p]; i < groupPoints[p + 1] - 1; i++) {
                for (var j = i; j < groupPoints[p + 1]; j++) {
                    if (sortState) {
                        if (sortFunction(bodyDataList[i][name], bodyDataList[j][name]) < 0) {
                            swap(i, j);
                        }
                    } else {
                        if (sortFunction(bodyDataList[i][name], bodyDataList[j][name]) > 0) {
                            swap(i, j);
                        }
                    }
                }
            }
        }

        this.forceUpdate();
    },
    groupData: function () {
        var bodyData = this.props.bodyData;
        var groupField = this.props.groupField;

        var swap = function (i, j) {
            var tem = bodyData[i];
            bodyData[i] = bodyData[j];
            bodyData[j] = tem;
        }

        var sortFunction = function (node1, node2) {
            if (node1 > node2) {
                return 1;
            } else if (node1 == node2) {
                return 0;
            }
            return -1;
        }

        for (var i = 0; i < bodyData.length - 1; i++) {
            for (var j = i; j < bodyData.length; j++) {
                if (sortFunction(bodyData[i][groupField], bodyData[j][groupField]) > 0) {
                    swap(i, j);
                }
            }
        }

        this.forceUpdate();
    },
    updateSort: function () {
        //future implement
    },
    removeAllSort: function () {
        this.state.sortState = {};
        this.forceUpdate();
    },
    selectNode: function (node) {
        var selectedList = this.state.selectedList;
        var found = false;
        for (var i in selectedList) {
            if (selectedList[i] == node) {
                found = true;
                break;
            }
        }
        if (!found) {
            this.state.selectedList.push(node);
        } else {
            alert("object already selected");
        }
        this.state.sortState = {};
        this.forceUpdate();
    }
});