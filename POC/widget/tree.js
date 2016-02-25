var TreeNode = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        var treenode = this;
        var nodeData = this.props.data;

        if (nodeData.expanded == null) {
            nodeData.expanded = false;
        }
        var depth = 0;
        if (this.props.depth != null) {
            depth = Number(this.props.depth);
        }

        var classFolder;
        if (nodeData.expanded) {
            classFolder = "fa fa-folder-open";
        } else {
            classFolder = "fa fa-folder";
        }

        var checkLeaf;
        if (nodeData.children != null && nodeData.children.length > 0) {
            checkLeaf = React.createElement("i", {
                key: 0,
                className: classFolder,
                onClick: function (event) {
                    event.stopPropagation();
                    treenode.toggleNode();
                }
            });
        } else {
            checkLeaf = React.createElement("i", {
                key: 0,
                className: "fa fa-leaf"
            });
        }

        var visibleStyle = "";
        if (!treenode.checkVisible(nodeData)) {
            visibleStyle = "hidden";
        }

        return React.createElement("div", {
            className: "AS-TreeNode " + visibleStyle,
            style: {
                paddingLeft: (depth * 20 + 10) + "px"
            },
            onClick: function (event) {
                if (treenode.props.handler != null) {
                    treenode.props.handler(event, nodeData);
                }
            }
        }, [checkLeaf, nodeData.name]);
    },
    toggleNode: function () {
        var data = this.props.data;
        data.expanded = !data.expanded;
        var tree = this.props.tree;
        if (data.expanded) {
            tree.expandNode(data);
        } else {
            tree.collapseNode(data);
        }

    },
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
var Tree = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentWillMount: function () {
        var treeData = this.props.treeData;
        var rcs = function (data) {
            for (var i in data) {
                if (data[i].visible == null) {
                    data[i].visible = {};
                }
                data[i].expanded = true;
                if (data[i].children != null && data[i].children.length > 0) {
                    rcs(data[i].children);
                }
            }
        }
        rcs(treeData);
    },
    render: function () {
        var tree = this;
        var treeData = this.props.treeData;
        var handler = this.props.handler;
        if (handler == null) {
            handler = {};
        }

        var nodeList = [];
        var key = 0;
        var rcs = function (data, depth) {
            for (var i in data) {
                var row = React.createElement(TreeNode, {
                    key: key,
                    data: data[i],
                    depth: depth,
                    tree: tree,
                    handler: handler.rowClickHandler
                });
                nodeList.push(row);
                key++;
                if (data[i].children != null && data[i].children.length > 0) {
                    rcs(data[i].children, depth + 1);
                }
            }
        }
        rcs(treeData, 0);
        return React.createElement("div", {
            className: "AS-Tree"
        }, nodeList);
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
    }
});