var tree_example;
//create tree
//var treeData = ArcMCExampleTreeData.getTree(0);
var treeData = ArcMCExampleTreeData.getTreeExample();
console.log(treeData);
tree_example = React.render(
    React.createElement(
        Tree, {
            treeData: treeData,
            handler: {
                rowClickHandler: function (event, data) {
                    console.log("click me + " + data.name);
                }
            }
        }
    ),
    document.getElementById("tree")
);