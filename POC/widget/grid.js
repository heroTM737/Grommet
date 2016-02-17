var GridRow = React.createClass({
    /**
     * React default: define initial state of this class.     
     * @return {object} The initial state of this class.
     */
    getInitialState: function () {
        return {};
    },
    /**
     * React default: render component.
     * @returns {ReactElement} The element to be painted by DOM.
     */
    render: function () {
        var rowData = this.props.rowData;
        var columnConfigList = this.props.columnConfig;
        var gridrow = this;
        var grid = this.props.grid;

        var columnList = columnConfigList.map(function (node, index) {
            var value = "";
            if (rowData[node.propertyName] != null) {
                if (node.template && node.template.cellTemplate != null) {
                    var handler;
                    if (node.handler != null) {
                        handler = node.handler.cellHandler;
                    }
                    value = React.createElement(node.template.cellTemplate, {
                        cellData: rowData[node.propertyName],
                        rowData: rowData,
                        gridrow: gridrow,
                        grid: grid,
                        handler: handler
                    });
                } else {
                    value = rowData[node.propertyName];
                }
            }

            var cellContent = React.createElement("div", {
                className: "AS-GridCellContent"
            }, value);

            return React.createElement("div", {
                key: index,
                className: "AS-GridCell",
                style: {
                    width: node.width != null ? node.width + "px" : "150px"
                }
            }, cellContent);
        });
        var selectedStyle = "";
        if (this.checkSelected()) {
            selectedStyle = "selected";
        }
        var visibleStyle = "";
        if (!gridrow.checkVisible(rowData)) {
            visibleStyle = "hidden";
        }

        return React.createElement("div", {
            className: "AS-GridRow " + visibleStyle + " " + selectedStyle,
            onClick: this.rowClickHandler
        }, [columnList]);
    },
    /**
     * Handle row click.
     * @param {Event} The click event.
     */
    rowClickHandler: function (event) {
        this.props.rowClickHandler(this.props.rowData, !this.checkSelected(), event.shiftKey, event.ctrlKey);
    },
    /**
     * Check whether this row is selected or not.
     * @return {Boolean} True if selected and vice versa.
     */
    checkSelected: function () {
        var selectedList = this.props.grid.state.selectedList;
        var row = this.props.rowData;
        for (var i in selectedList) {
            if (selectedList[i] == row) {
                return true;
            }
        }
        return false;
    },
    /**
     * Check visible state of this row.
     * @param {Object} Node data to be checked.
     * @return {Boolean} True if visible and vice versa.
     */
    checkVisible: function (node) {
        if (node.visible != null) {
            for (var i in node.visible) {
                if (!node.visible[i]) {
                    return false;
                }
            }
        }

        return true;
    }
});
var GridHead = React.createClass({
    /**
     * React default: define initial state of this class.
     * @return {object} The initial state of this class.
     */
    getInitialState: function () {
        return {
            sortState: this.props.grid.state.sortState,
            descriptionState: {},
            headOptionPopup: {},
            headRef: [],
            headResize: false,
            headResizeIndex: -1,
            headResizeRadius: 3,
            headMouseReserve: {},
            hideGridHeadPopupFunction: null,
            hideGridHeadPopupElement: null
        };
    },
    /**
     * React default: be called once when an instance is going to be mounted.
     * Bind clear sort function of grid to removeAllSort of GridHead
     */
    componentWillMount: function () {
        var grid = this.props.grid;
        grid.state.eventBus.removeAllSort = function () {
            this.removeAllSort();
        };
    },
    /**
     * React default: be called after component is mounted.
     * Create listener to hide head popup
     * Create listener for resize function
     */
    componentDidMount: function () {
        var grid = this.props.grid;
        var head = this;

        $(document).mouseup(function (event) {
            var popupElement = head.state.hideGridHeadPopupElement;
            var hideGridHeadPopupFunction = head.state.hideGridHeadPopupFunction;
            if (popupElement != null && hideGridHeadPopupFunction != null) {
                var list = $(event.target).closest(popupElement.getDOMNode());
                if (list.get(0) != $(popupElement.getDOMNode()).get(0)) {
                    hideGridHeadPopupFunction(event);
                    head.forceUpdate();
                }
            }
        });

        $(document).on("mousemove", function (event) {
            if (head.state.headResize) {
                $("#gridheadruler").css("left", event.pageX);
            }
        });

        $(document).on("mouseup", function (event) {
            if (head.state.headResize) {
                var iw = event.pageX - head.state.headMouseReserve.x;
                head.resizeColumn(iw);
                head.state.headResize = false;
                $("#gridheadruler").remove();
            }
        });
    },
    /**
     * React default: render component.
     * @returns {ReactElement} The element to be painted by DOM.
     */
    render: function () {
        var head = this;
        var headOptionPopup = this.state.headOptionPopup;
        var grid = this.props.grid;
        var columnConfig = grid.props.columnConfig;
        var sortState = grid.state.sortState;
        var headList = columnConfig.map(function (node, index) {
            var propertyName;
            if (node.propertyName == null) {
                propertyName = "null" + index;
            } else {
                propertyName = node.propertyName;
            }

            var headOptionPopupElementRef;
            var headOptionIconElementRef;
            var headOptionIconElement = React.createElement(
                "div", {
                    key: 3,
                    className: "head-options",
                    ref: function (component) {
                        headOptionIconElementRef = component;
                    },
                    onClick: function (event) {
                        headOptionPopup[propertyName] = true;
                        event.stopPropagation();
                        head.forceUpdate();

                        var left = $(headOptionIconElementRef.getDOMNode()).offset().left;
                        var pw = $(headOptionPopupElementRef.getDOMNode()).outerWidth();
                        var ww = $(head.getDOMNode()).width();
                        if (left + pw > ww + $(head.getDOMNode()).offset().left) {
                            $(headOptionPopupElementRef.getDOMNode()).css("left", "auto");
                            $(headOptionPopupElementRef.getDOMNode()).css("right", "0px");
                        }

                        head.state.hideGridHeadPopupElement = headOptionPopupElementRef;
                        head.state.hideGridHeadPopupFunction = function (event) {
                            headOptionPopup[propertyName] = false;
                            head.forceUpdate();
                        };
                    }
                }
            );

            var hopStyle = "hidden";
            if (headOptionPopup[propertyName]) {
                hopStyle = "";
            }

            var sortAscending = React.createElement(
                "div", {
                    key: 0,
                    className: "head-options-popup-row",
                    onClick: function (event) {
                        head.headClickHandler(propertyName, true);
                    }
                }, [React.createElement("i", {
                    key: 0,
                    className: "fa fa-caret-up"
                }), "Sort Ascending"]
            );
            var sortDecending = React.createElement(
                "div", {
                    key: 1,
                    className: "head-options-popup-row",
                    onClick: function (event) {
                        head.headClickHandler(propertyName, false);
                    }
                }, [React.createElement("i", {
                    key: 0,
                    className: "fa fa-caret-down"
                }), "Sort Decending"]
            );
            var filter = React.createElement(
                "div", {
                    key: 2,
                    className: "head-options-popup-row",
                    onMouseDown: function (event) {
                        headOptionPopup[propertyName] = false;
                    }
                }, [
//                    React.createElement(
//                        "div", {
//                            key: 0,
//                            style: {
//                                float: "left",
//                                width: "30px",
//                                height: "35px",
//                                position: "relative"
//                            }
//                        },
//                        React.createElement(
//                            Grommet.CheckBox, {
//                                id: "WhyDoINeedIDDamnGrommet",
//                                className: "GridHeadFilterCheckbox",
//                                checked: head.props.grid.state.ignoreFilter[propertyName],
//                                label: "",
//                                onChange: function (event) {
//                                    head.props.grid.state.ignoreFilter[propertyName] = event.target.checked;
//                                    head.props.grid.updateFilter();
//                                }
//                            }
//                        )
//                    ),
                    React.createElement("input", {
                        key: 1,
                        type: "text",
                        placeholder: "Search",
                        value: head.props.grid.state.filterValue[propertyName],
                        style: {
                            float: "left",
//                            width: "calc(100% - 40px)",
                            width: "90%",
                            margin: " 3px 0 0 5%"
                        },
                        onChange: function (event) {
                            if(event.target.value == "")
                                head.props.grid.state.ignoreFilter[propertyName] = false;
                            else
                                head.props.grid.state.ignoreFilter[propertyName] = true;
                            
                            head.props.grid.handleFilter(propertyName, event);
                        }
                    }),
                ]
            );

            var popupChildren = [];
            if (node.sortConfig != null && node.sortConfig.sortable == false) {
                //do something when sort is not allowed
            } else {
                popupChildren.push(sortAscending);
                popupChildren.push(sortDecending);
            };
            if (node.filterConfig != null && node.filterConfig.check != null) {
                popupChildren.push(filter);
            }

            var headOptionPopupElement = React.createElement(
                "div", {
                    key: 4,
                    className: "head-options-popup " + hopStyle,
                    onClick: function (event) {
                        headOptionPopup[propertyName] = true;
                        head.forceUpdate();
                        event.stopPropagation();
                    },
                    ref: function (component) {
                        headOptionPopupElementRef = component;
                    }
                }, popupChildren
            );

            var cellElement = React.createElement("span", {
                key: 0
            }, node.columnName);

            if (node.template != null && node.template.headTemplate != null) {
                var handler;
                if (node.handler != null) {
                    handler = node.handler.headHandler;
                }
                cellElement = React.createElement(node.template.headTemplate, {
                    key: 0,
                    cellData: node.columnName,
                    handler: handler
                });
            }

            var gridCellContent = React.createElement("div", {
                key: 0,
                className: "AS-GridCellContent"
            }, cellElement);

            var childList = [];
            childList.push(gridCellContent);

            if (node.description != null) {
                var tootipRef, descriptionRef;
                var descriptionElement = React.createElement(
                    "div", {
                        key: 1,
                        className: "AS-GridHeadDescription",
                        onMouseOver: function () {
                            var domnode = descriptionRef.getDOMNode();
                            var width = $(domnode).width();
                            tootipRef.setState({
                                top: 0,
                                left: width + 10
                            });

                            head.state.descriptionState[node.propertyName] = true;
                            head.forceUpdate();
                        },
                        onMouseOut: function () {
                            head.state.descriptionState[node.propertyName] = false;
                            head.forceUpdate();
                        },
                        ref: function (component) {
                            descriptionRef = component;
                        }
                    }, [
                        React.createElement("img", {
                            key: 0,
                            src: "image/arc-icons/esm_help_blue_16x16.png",
                        }),
                        React.createElement(Tooltip, {
                            key: 1,
                            widget: node.description,
                            className: head.state.descriptionState[propertyName] == true ? "" : "hidden",
                            ref: function (component) {
                                tootipRef = component;
                            },
                        })
                    ]
                );
                childList.push(descriptionElement);
            }


            if (node.sortConfig != null && node.sortConfig.sortable == false) {
                //do something when sort is not allowed
            } else {
                var sortStyle = "";
                if (sortState[propertyName] != null) {
                    if (sortState[propertyName]) {
                        sortStyle = "fa fa-arrow-up";
                    } else {
                        sortStyle = "fa fa-arrow-down";
                    }
                }
                childList.push(React.createElement("i", {
                    key: 2,
                    className: "AS-GridHeadSortIndicator " + sortStyle
                }));
            }

            var paddingRight = "30px";
            if (node.template != null && node.template.disableHeadOption) {
                paddingRight = "5px";
            } else if (popupChildren.length > 0) {
                childList.push(headOptionIconElement);
                childList.push(headOptionPopupElement);
            }

            var gridCell = React.createElement(
                "div", {
                    key: index,
                    className: "AS-GridCell",
                    style: {
                        width: node.width != null ? node.width + "px" : "150px",
                        paddingRight: paddingRight,
                    },
                    ref: function (component) {
                        head.state.headRef[index] = component;
                    },
                    onClick: function (event) {
                        if (head.state.headResize) {
                            //do something
                        } else {
                            head.headClickHandler(propertyName, null);
                        }
                    },
                    onMouseDown: function (event) {
                        head.state.headMouseReserve.x = event.pageX;
                        var domnode = head.state.headRef[index].getDOMNode();
                        var offset = $(domnode).offset();
                        var width = $(domnode).outerWidth();
                        var height = $(domnode).outerHeight();
                        var relX = event.pageX - offset.left;
                        var relY = event.pageY - offset.top;

                        if (
                            0 <= width - relX &&
                            width - relX <= head.state.headResizeRadius &&
                            0 <= height - relY &&
                            height - relY <= height
                        ) {
                            head.state.headResize = true;
                            head.state.headResizeIndex = index;

                            var gridElement = $(head.state.headRef[index].getDOMNode()).closest(".AS-Grid");
                            var gridTop = gridElement.offset().top;
                            var gridWidth = gridElement.height();
                            $("body").append("<div class='resizemeasure' id='gridheadruler' style='top:" + gridTop + ";left:" + event.pageX + ";height:" + gridWidth + "'><div>");

                        } else {
                            head.state.headResize = false;
                        }
                    },
                    onMouseOut: function (event) {
                        if (head.state.headResize) {
                            //do something
                        } else {
                            var domnode = head.state.headRef[index].getDOMNode();
                            $(domnode).css("cursor", "pointer");
                        }
                    },
                    onMouseMove: function (event) {
                        if (head.state.headResize) {

                        } else {
                            var domnode = head.state.headRef[index].getDOMNode();
                            var offset = $(domnode).offset();
                            var width = $(domnode).outerWidth();
                            var height = $(domnode).outerHeight();
                            var relX = event.pageX - offset.left;
                            var relY = event.pageY - offset.top;

                            if (
                                0 <= width - relX &&
                                width - relX <= head.state.headResizeRadius &&
                                0 <= height - relY &&
                                height - relY <= height
                            ) {
                                $(domnode).css("cursor", "col-resize");
                            } else {
                                $(domnode).removeStyle("cursor");
                            }
                        }
                    }
                }, childList
            );

            return gridCell;
        });

        return React.createElement("div", {
            key: 0,
            className: "AS-GridRow",
            onDragStart: function (event) {
                return false;
            },
            onDrop: function (event) {
                return false;
            }
        }, headList)
    },
    /**
     * Handle head click for each column.
     * @param {String} name The column propertyname.
     * @param {Boolean} sortDir The sort direction.
     */
    headClickHandler: function (name, sortDir) {
        var columnConfig = this.props.grid.props.columnConfig;
        for (var i in columnConfig) {
            if (columnConfig[i].propertyName == name) {
                if (columnConfig[i].sortConfig != null && columnConfig[i].sortConfig.sortable == false) {
                    //do something when sort is not allowed
                } else {
                    this.props.grid.sortColumn(name, sortDir);
                }
                break;
            }
        }

    },
    /**
     * Increase with of the resizing column.
     * @param {int} increaseWidth The width to be increased.
     */
    resizeColumn: function (increaseWidth) {
        var grid = this.props.grid;
        var head = this;
        grid.resizeColumn(increaseWidth, head.state.headResizeIndex);
    },
    /**
     * Clear all sort state
     */
    removeAllSort: function () {
        this.state.sortState = {};
        this.forceUpdate();
    }
});
var firstSelect = -1; //use for first selected row checking in multiple rows selection
var Grid = React.createClass({
    /**
     * React default: define initial state of this class.
     * @return {Object} The initial state of this class.
     */
    getInitialState: function () {
        return {
            sortState: {},
            filterValue: {},
            ignoreFilter: {},
            selectedList: [],
            eventBus: {},
            contentWidth: 0,
            isMasking: false,
            fireNextCallback: false,
            callbackList: []
        };
    },
    /**
     * React default: be called once when an instance is going to be mounted.
     * Init visible state of data
     */
    componentWillMount: function () {
        var bodyData = this.props.bodyData;
        for (var i in bodyData) {
            if (bodyData[i].visible == null) {
                bodyData[i].visible = {};
            }
        }
    },
    /**
     * React default: be called after component is mounted.
     * Bind resize function
     * Bind scroll function
     */
    componentDidMount: function () {
        var grid = this;
        var griddomnode = this.getDOMNode();
        var bodydomnode = this.refs.bodyDiv.getDOMNode();
        var headdomnode = this.refs.headDiv.getDOMNode();
        var columnConfig = this.props.columnConfig;
        var columnMinWidth = 180;
        var recomputeSize = function () {
            var contentWidth = 0;
            if (grid.props.view.autoResize) {
                var gridWidth = $(griddomnode).width();
                if ($(griddomnode).hasScrollBar()) {
                    gridWidth -= 17;
                }
                if (gridWidth < columnConfig.length * columnMinWidth) {
                    gridWidth = columnConfig.length * columnMinWidth
                }
                var columnWidth = gridWidth / columnConfig.length;
                for (var i in columnConfig) {
                    columnConfig[i].width = columnWidth;
                }
                columnConfig[columnConfig.length - 1].width += gridWidth - columnConfig.length * columnWidth;
            }
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

            if (grid.props.view.autoResize) {
                grid.forceUpdate();
            }
        }
        recomputeSize();

        $(bodydomnode).scroll(function (event) {
            var left = $(bodydomnode).scrollLeft();
            $(headdomnode).find(".AS-GridRow").css("transform", "translate3d(" + (-left) + "px, 0px, 0px)");
        });

        if (grid.props.view.autoResize) {
            $(window).on("resize", function (event) {
                recomputeSize();
            });
        }
    },
    /**
     * React default: be called after component is updated.
     * Fire callback, used for loading grid
     */
    componentDidUpdate: function () {
        var grid = this;
        if (grid.state.fireNextCallback) {
            grid.state.fireNextCallback = false;
            if (grid.state.callbackList.length > 0) {
                var callback = grid.state.callbackList.shift();
                setTimeout(function () {
                    callback();
                }, 1);
            }
        }
    },
    /**
     * React default: render component.
     * @returns {ReactElement} The element to be painted by DOM.
     */
    render: function () {
        //render table head
        var grid = this;
        var columnConfig = this.props.columnConfig;
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
        var bodyData = this.props.bodyData;
        var body = function () {
            var rowList = bodyData.map(function (node, index) {
                return React.createElement(
                    GridRow, {
                        key: index,
                        rowData: node,
                        columnConfig: columnConfig,
                        rowClickHandler: grid.rowClickHandler,
                        grid: grid
                    }, []
                );
            });
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
                    height: "calc(100% - 31px)"
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
            },
            React.createElement(
                "div", {
                    className: "mask-align"
                }, React.createElement(
                    "img", {
                        src: "image/widget/arcmc-loading.svg",
                        className: "spinning-icon",
                        style: {
                            width: "48px",
                            height: "48px",
                        }
                    }
                )
            )
        );

        return React.createElement(
            "div", {
                className: "AS-Grid",
                style: grid.props.style ? grid.props.style : {}
            }, [headdiv, bodyDiv, maskDiv]
        );
    },
    /**
     * execute callback list, temporary used for loading mask
     * @param {Array} callbackList Callback list
     */
    executeCallback: function (callbackList) {
        var grid = this;
        if (callbackList != null && callbackList.length > 0) {
            var firstcallback = callbackList.shift();
            grid.state.callbackList = callbackList;
            firstcallback();
        }
    },
    /**
     * Execute callback list, temporary used for loading mask
     * @param {Callback} callback Callback to be called
     * @param {String} text Text to display on mask
     */
    mask: function (callback, text) {
        if (text == undefined || text == null) {
            text = "loading";
        }
        var grid = this;
        this.state.isMasking = true;
        this.forceUpdate();
    },
    /**
     * Remove mask
     */
    unmask: function () {
        this.state.isMasking = false;
        this.forceUpdate();
    },
    /**
     * execute callback list, temporary used for loading mask
     * @param {int} increaseWidth Width to be increased
     * @param {int} index Column index
     */
    resizeColumn: function (increaseWidth, index) {
        var columnMinWidth = 100;
        var grid = this;
        var colConfig = grid.props.columnConfig[index];
        colConfig.width = Number(colConfig.width) + increaseWidth;
        if (colConfig.width < columnMinWidth) {
            colConfig.width = columnMinWidth;
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
    /**
     * buffer function to be called
     * @param {String} name Column property name
     * @param {Event} event ValueChangeEvent
     */
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
            if (bodyDataList[r].visible == null) {
                bodyDataList[r].visible = {};
            }
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
    rowClickHandler: function (rowData, selected, shiftKey, ctrlKey) {
        var listRow = this.props.bodyData;
        var selection = this.props.selection;
        switch (selection) {
        case "none":
            break;
        case "multiple":
            //hold shift key
            if (shiftKey) {
                if (this.state.selectedList.length == 0) {
                    this.state.selectedList.push(rowData);
                    firstSelect = listRow.indexOf(rowData);
                } else {
                    this.state.selectedList = [];
                    var lastSelect = listRow.indexOf(rowData);
                    if (firstSelect < lastSelect) {
                        for (var k = firstSelect; k <= lastSelect; k++) {
                            this.state.selectedList.push(listRow[k]);
                        }
                    } else {
                        for (var k = lastSelect; k <= firstSelect; k++) {
                            this.state.selectedList.push(listRow[k]);
                        }
                    }
                }
            } else if (ctrlKey) { //hold ctrl key
                if (selected) {
                    this.state.selectedList.push(rowData);
                } else {
                    var index = this.state.selectedList.indexOf(rowData);
                    this.state.selectedList.splice(index, 1);
                }
            } else {
                if (selected) {
                    this.state.selectedList = [rowData];
                    firstSelect = listRow.indexOf(rowData);
                } else {
                    this.state.selectedList = [];
                }
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
        console.log(firstSelect);
    },
    sortColumn: function (name, sortDir) {
        var columnConfig = this.props.columnConfig;

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
        var sortFunction;
        for (var i in columnConfig) {
            if (columnConfig[i].propertyName == name) {
                if (columnConfig[i].sortConfig != null) {
                    sortFunction = columnConfig[i].sortConfig.compare;
                } else {
                    sortFunction = function (node1, node2) {
                        if (node1 > node2) {
                            return 1;
                        } else if (node1 == node2) {
                            return 0;
                        }
                        return -1;
                    }
                }
                break;
            }

        }
        //        console.log(sortFunction);
        for (var i = 0; i < bodyDataList.length - 1; i++) {
            for (var j = i; j < bodyDataList.length; j++) {
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
    },
    reloadData: function (data) {
        var grid = this;
        grid.setProps({
            bodyData: data
        });
        grid.updateFilter();
        grid.state.fireNextCallback = true;
        grid.removeAllSort();
    }
});