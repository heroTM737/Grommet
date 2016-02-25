var TreeGridRow = React.createClass({
	getInitialState: function () {
		return {
			selected: false
		};
	},
	render: function () {
		var treegridrow = this;
		var columnConfig = this.props.treegrid.props.columnConfig;
		var nodeData = this.props.nodeData;
		var treegrid = this.props.treegrid;
		var depth = this.props.depth;

		var columnList = columnConfig.map(function (node, index) {
			var tdElement = "";
			if (node.template != null && node.template.cellTemplate != null && nodeData[node.propertyName] != null) {
				var handler = null;
				if (node.handler != null) {
					handler = node.handler.cellHandler;
				}
				tdElement = React.createElement(node.template.cellTemplate, {
					key: 1,
					cellData: nodeData[node.propertyName],
					rowData: nodeData,
					gridrow: treegridrow,
					grid: treegrid,
					handler: handler
				});
			} else {
				tdElement = nodeData[node.propertyName];
			}

			var toggleIcon;
			var paddingLeft = "";
			if (index == 0) {
				if (nodeData.children != null && nodeData.children.length > 0) {
					if (nodeData.expanded == false) {
						toggleIcon = React.createElement("i", {
							key: 0,
							style: {
								float: "left",
							},
							className: "fa fa-caret-right",
							onClick: function (event) {
								treegridrow.props.treegrid.expandNode(nodeData);
								event.stopPropagation();
							}
						});
					} else {
						toggleIcon = React.createElement("i", {
							key: 0,
							style: {
								float: "left"
							},
							className: "fa fa-caret-down",
							onClick: function (event) {
								treegridrow.props.treegrid.collapseNode(nodeData);
								event.stopPropagation();
							}
						});
					}

				} else {
					toggleIcon = React.createElement("i", {
						key: 0,
						className: "fa fa-leaf",
						style: {
							float: "left",
							opacity: "0"
						}
					});
				}
				paddingLeft = (19 + depth * 20) + "px";
			}



			return React.createElement("div", {
				key: index,
				className: "AS-GridCell",
				style: {
					paddingLeft: paddingLeft,
					width: node.width != null ? node.width + "px" : "150px",
				}
			}, [toggleIcon, tdElement]);
		});

		var selectedStyle = "";
		this.state.selected = this.checkSelected();
		if (treegridrow.state.selected) {
			selectedStyle = "selected";
		}

		var visibleStyle = "";
		if (!treegridrow.checkVisible(nodeData)) {
			visibleStyle = "hidden";
		}

		return React.createElement("div", {
			className: "AS-GridRow AS-TreeNode " + visibleStyle + " " + selectedStyle,
			onClick: treegridrow.rowClickHandler,
		}, columnList);
	},
	rowClickHandler: function (event) {
		this.props.treegrid.rowClickHandler(this.props.nodeData, !this.checkSelected(), event.shiftKey, event.ctrlKey);
	},
	checkSelected: function () {
		var selectedList = this.props.treegrid.state.selectedList;
		var row = this.props.nodeData;
		for (var i in selectedList) {
			if (selectedList[i] == row) {
				return true;
			}
		}
		return false;
	},
	checkVisible: function (node) {
		if (node.visible != null) {
			if (node.visible.show || node.visible.branch) {
				node.visible.show = true;
				node.visible.branch = true;
			}
			for (var i in node.visible) {
				if (!node.visible[i]) {
					return false;
				}
			}
		}

		return true;
	}
});

var firstSelect = -1;
var TreeGrid = React.createClass({
	getInitialState: function () {
		return {
			sortState: {},
			filterValue: {},
			ignoreFilter: {},
			selectedList: [],
			eventBus: {},
			contentWidth: 0,
			bodyDivRef: {},
			isMasking: false,
		};
	},
	componentWillMount: function () {
		var treeData = this.props.treeData;
		var rcs = function (data) {
			for (var i in data) {
				if (data[i].visible == null) {
					data[i].visible = {};
				}
				if (data[i].children != null && data[i].children.length > 0) {
					rcs(data[i].children);
				}
			}
		}
		rcs(treeData);

		/**
		 * This function for expanding the tree grid 
		 * at a specific level
		 */
		var recur = function (nodeList, depth) {
			for (var i in nodeList) {
				if (depth > 0) {
					nodeList[i].expanded = true;
					if (nodeList[i].children != null && nodeList[i].children.length > 0) {
						recur(nodeList[i].children, depth - 1);
					}
				} else {
					nodeList[i].expanded = false;
				}
			}
		}

		var expandDepth = this.props.options.expandDepth;

		if (expandDepth != null && expandDepth != undefined) {
			recur(treeData, expandDepth);
			for (var i in treeData) {
				this.computeECStatus(treeData[i], true);
			}
			this.forceUpdate();
		}
	},
	componentDidMount: function () {
		var grid = this;
		var griddomnode = this.getDOMNode();
		var bodydomnode = this.refs.bodyDiv.getDOMNode();
		var headdomnode = this.refs.headDiv.getDOMNode();

		if (grid.props.view == null) {
			grid.props.view = {};
		}

		var contentWidth = 0;
		var columnConfig = this.props.columnConfig;
		for (var i in columnConfig) {
			contentWidth += columnConfig[i].width != null ? Number(columnConfig[i].width) : 150;
		}
		grid.state.contentWidth = contentWidth;
		var cw = grid.state.contentWidth;
		$(bodydomnode).find(".AS-GridRow").css("min-width", cw + "px");
		$(headdomnode).find(".AS-GridRow").css("min-width", cw + "px");
		if (grid.props.view.width != null && grid.props.view.width != undefined) {
			$(headdomnode).width(grid.props.view.width);
			$(bodydomnode).width(grid.props.view.width);
		}

		$(bodydomnode).scroll(function (event) {
			var left = $(bodydomnode).scrollLeft();
			$(headdomnode).find(".AS-GridRow").css("transform", "translate3d(" + (-left) + "px, 0px, 0px)");
		});
	},
	render: function () {
		var treegrid = this;
		var columnConfig = this.props.columnConfig;

		//create head
		var head = function () {
			treegrid.state.headElement = React.createElement(
				GridHead, {
					key: 0,
					grid: treegrid
				}
			);
			return treegrid.state.headElement;
		};

		//create body
		var body = function () {
				var nodeList = [];
				var rnode, element;
				var count = 0;
				var rcs = function (rnodeList, depth) {
					for (i in rnodeList) {
						rnode = rnodeList[i];
						element = React.createElement(TreeGridRow, {
							key: count,
							nodeData: rnode,
							depth: depth,
							treegrid: treegrid
						});
						nodeList.push(element);
						count++;
						if (rnode.children != null && rnode.children.length > 0) {
							rcs(rnode.children, depth + 1);
						}
					}
				}
				rcs(treegrid.props.treeData, 0);

				return nodeList;
			}
			//compute height for body
		var maxHeight = "auto";
		if (treegrid.props.view != null && treegrid.props.view.maxHeight != null) {
			maxHeight = treegrid.props.view.maxHeight;
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
		if (treegrid.state.isMasking) {
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
				className: "AS-Grid AS-Tree AS-TreeGrid",
			}, [headdiv, bodyDiv, maskDiv]
		);
	},
	expandNode: function (node) {
		node.expanded = true;
		this.computeECStatus(node, true);
		this.forceUpdate();
	},
	collapseNode: function (node) {
		node.expanded = false;
		this.computeECStatus(node, true);
		this.forceUpdate();
	},
	computeECStatus: function (node, ecstatus) {
		node.visible.ecstatus = ecstatus;
		var status = false;
		if (ecstatus && node.expanded != false) {
			status = true;
		}

		if (node.children != null && node.children.length > 0) {
			for (var i in node.children) {
				this.computeECStatus(node.children[i], status)
			}
		}
	},
	expandAllNode: function () {
		var treeData = this.props.treeData;
		var rcs = function (nodeList) {
			for (var i in nodeList) {
				nodeList[i].expanded = true;
				if (nodeList[i].children != null && nodeList[i].children.length > 0) {
					rcs(nodeList[i].children);
				}
			}
		}
		rcs(treeData);
		for (var i in treeData) {
			this.computeECStatus(treeData[i], true);
		}

		this.forceUpdate();
	},
	collapseAllNode: function () {
		var treeData = this.props.treeData;
		var rcs = function (nodeList) {
			for (var i in nodeList) {
				nodeList[i].expanded = false;
				if (nodeList[i].children != null && nodeList[i].children.length > 0) {
					rcs(nodeList[i].children);
				}
			}
		}
		rcs(treeData);
		for (var i in treeData) {
			this.computeECStatus(treeData[i], true);
		}
		this.forceUpdate();
	},
	rowClickHandler: function (rowData, selected, shiftKey, ctrlKey) {
		var listRow;
		var selection = this.props.selection;
		switch (selection) {
		case "none":
			break;
		case "multiple":
			//hold shift key
			var nodeList = [];
			var rcs = function (rnodeList) {
				for (i in rnodeList) {
					var rnode = rnodeList[i];
					nodeList.push(rnode);
					if (rnode.children != null && rnode.children.length > 0) {
						rcs(rnode.children);
					}
				}
			}
			rcs(this.props.treeData);
			listRow = nodeList;
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
		var bodyDataList = this.props.treeData;
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
		var swap = function (i, j, dataList) {
			var tem = dataList[i];
			dataList[i] = dataList[j];
			dataList[j] = tem;
		}
		var rcs = function (dataList) {
			if (dataList[0][name] != null) {
				for (var i = 0; i < dataList.length; i++) {
					for (var j = i; j < dataList.length; j++) {
						if (sortState) {
							if (sortFunction(dataList[i][name], dataList[j][name]) < 0) {
								swap(i, j, dataList);
							}
						} else {
							if (sortFunction(dataList[i][name], dataList[j][name]) > 0) {
								swap(i, j, dataList);
							}
						}
					}
				}
			}

			for (var i = 0; i < dataList.length; i++) {
				if (dataList[i].children != null && dataList[i].children.length > 0) {
					rcs(dataList[i].children);
				}
			}
		}
		rcs(bodyDataList);

		this.forceUpdate();
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

		var rcsBranch = function (data) {
			for (var i in data) {
				data[i].visible.branch = true;
				if (data[i].children != null && data[i].children.length > 0) {
					rcsBranch(data[i].children);
				}
			}
		}

		//do filter for all column
		var rcs = function (bodyDataList) {
			var listStatus = false;
			for (var r in bodyDataList) {
				var col_pass = {};
				for (var c in columnConfigList) {
					var propertyName = columnConfigList[c].propertyName;
					var valueToFilt = grid.state.filterValue[propertyName];

					if (valueToFilt == null || valueToFilt == "") {
						col_pass[c] = true;
						continue;
					}

					if (grid.state.ignoreFilter[propertyName] == false) {
						col_pass[c] = true;
						continue;
					}

					if (bodyDataList[r][propertyName] != null) {
						if (filterFunctionList[propertyName](bodyDataList[r][propertyName], valueToFilt)) {
							col_pass[c] = true;
						} else {
							col_pass[c] = false;
						}
					} else {
						col_pass[c] = false;
					}
				}

				bodyDataList[r].visible.branch = false;
				bodyDataList[r].visible.show = true;
				for (var c in columnConfigList) {
					if (col_pass[c] == false) {
						bodyDataList[r].visible.show = false;
						break;
					}
				}

				if (bodyDataList[r].visible.show) {
					bodyDataList[r].visible.branch = true;
					listStatus = true;
					if (bodyDataList[r].children != null && bodyDataList[r].children.length > 0) {
						rcsBranch(bodyDataList[r].children);
					}
					continue;
				}

				if (bodyDataList[r].children != null && bodyDataList[r].children.length > 0) {
					var childStatus = rcs(bodyDataList[r].children);
					bodyDataList[r].visible.branch = childStatus;
					if (childStatus) {
						listStatus = true;
					}
				}

			}

			return listStatus;
		}
		rcs(this.props.treeData);

		//update ui
		this.forceUpdate();
	},
	updateSort: function () {
		//future implement
	},
	removeAllSort: function () {
		this.state.sortState = {};
		this.forceUpdate();
	},
});