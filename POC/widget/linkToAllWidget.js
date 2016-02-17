//$.getScript("js/widget/grid.js",function(){});
//$.getScript("js/widget/tree.js",function(){});

//define link all widgets available
var scriptList = [
    "widget/grid.js",
    "widget/tree.js",
    "widget/treegrid.js",
    "widget/dropdown.js",
    "widget/popup.js",
    "widget/searchlist.js",
    "widget/message.js",
    "widget/groupinggrid.js",
    "widget/messagetypeenum.js",
    "widget/tooltip.js",
    "widget/doubleview.js",
    "widget/layout/verticalpanel.js"
];

//load all widgets in scriptList
scriptList.forEach(function (entry) {
    $.ajax({
        url: entry,
        dataType: "script",
        async: false
    });
});