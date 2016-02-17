var eventStatusList = ["loading", "loaded", "failed", "pending", "archiving", "archived", "available"];

var indexStatusList = ["indexing", "indexed", "failed", "pending", "none"];

var eventArchivesList = ["archive", "storage", "ip"];

var countryList = ["vietnam", "japan", "china"];

var cityList = ["Hanoi", "DaNang", "HoChiMinh"];

var machineList = ["System 1", "System 2", "System 3", "System 4"]

var compareStatusFunction = function (node1, node2) {
    var text1 = node1.renderData[node1.status].text.toLowerCase();
    var text2 = node2.renderData[node2.status].text.toLowerCase();
    var result;
    if (text1 > text2) {
        result = 1;
    } else if (text1 == text2) {
        result = 0;
    } else {
        result = -1;
    }
    return result;
}

var compareTextFunction = function (node1, node2) {
    if (node1.text > node2.text) {
        return 1;
    } else if (node1.text == node2.text) {
        return 0;
    }
    return -1;
}

var compareEventArchiveFunction = function (node1, node2){
    if(node1.type == "group"){
        var text1 = node1.jobissue + node1.startDate + node1.endDate + node1.action;
        var text2 = node2.jobissue + node2.startDate + node2.endDate + node2.action;
        if (text1 > text2) {
            return 1;
        } else if (text1 == text2) {
            return 0;
        }
        return -1;
    }
    else{
        if (node1.text > node2.text) {
            return 1;
        } else if (node1.text == node2.text) {
            return 0;
        }
        return -1;
    }
}

var compareCheckFunction = function (node1, node2) {
    if (node1.checked && !node2.checked) {
        return 1;
    }
    if (node1.checked == node2.checked) {
        return 0;
    }
    return -1;
}

var filterStatusFunction = function (node, value) {
    var text1 = node.renderData[node.status].text.toLocaleLowerCase();
    var text2 = value.toLowerCase();
    if (text1.indexOf(text2) >= 0) {
        return true;
    }
    return false;
}

var filterImageTextFunction = function (node, value) {
    var text2 = value.toLowerCase();
    if (node.type != null && node.type == "group") {
        if (node.jobissue.toLowerCase().indexOf(text2) >= 0) {
            return true;
        }
        if (node.startDate.toLowerCase().indexOf(text2) >= 0) {
            return true;
        }
        if (node.endDate.toLowerCase().indexOf(text2) >= 0) {
            return true;
        }
        if (node.action.toLowerCase().indexOf(text2) >= 0) {
            return true;
        }
        return false;
    }

    var text1 = node.text.toLowerCase();
    if (text1.indexOf(text2) >= 0) {
        return true;
    }
    return false;
}

var ArcMCExampleGridData = {
    columnConfig: [
        {
            columnName: "Event Archives",
            propertyName: "eventArchives",
            sortConfig: {
                compare: compareStatusFunction
            },
            filterConfig: {
                check: filterStatusFunction
            },
            template: {
                cellTemplate: ARCSIGHT.GridCellImageText,
                //headTemplate: ARCSIGHT.CustomHeadTemplate,
                disableHeadOption: true
            },
            handler: {
                headHandler: {
                    click: function () {
                        console.log("outside head function");
                    }
                },
                cellHandler: {
                    click: function () {
                        console.log("outside cell function");
                    }
                }
            },
            width: "200"
        },
        {
            columnName: "Peers",
            propertyName: "peers",
            template: {
                cellTemplate: ARCSIGHT.CellTemplateHyperlink,
            },
            sortConfig: {
                compare: compareTextFunction
            },
            width: "200"
        },
        {
            columnName: "Event Status",
            propertyName: "eventStatus",
            template: {
                cellTemplate: ARCSIGHT.GridCellImageText,
            },
            sortConfig: {
                compare: compareStatusFunction
            },
            filterConfig: {
                check: filterStatusFunction
            },
            width: "200"
        },
        {
            columnName: "Index Status",
            propertyName: "indexStatus",
            template: {
                cellTemplate: ARCSIGHT.GridCellImageText,
            },
            sortConfig: {
                compare: compareStatusFunction
            },
            filterConfig: {
                check: filterStatusFunction
            },
            width: "200"
        },
        {
            columnName: "Mirror my Selection on Peers",
            propertyName: "peerSelection",
            description: React.createElement("div", {}, [
				React.createElement("div", {
                    key: 0,
                    style: {
                        fontFamily: "Tahoma, Arial, Verdana, sans-serif",
                        fontSize: "12",
                        fontStyle: "normal",
                        fontWeight: "bold"
                    }
                }, "Example Info:"),
				React.createElement("div", {
                    key: 1,
                    style: {
                        width: "300"
                    }
                }, "This examples includes resizable panel, reorderable columns and grid state. Text selection is allowed.")
            ]),
            template: {
                cellTemplate: ARCSIGHT.CellTemplateCheckbox,
            },
            sortConfig: {
                compare: compareCheckFunction
            },
            width: "400"
},
        {
            columnName: "Cancel Action",
            propertyName: "cancelaction",
            template: {
                cellTemplate: ARCSIGHT.CellTemplateActionImage,
            },
            sortConfig: {
                sortable: false
            },
            width: "200"
        }
    ],
    gridData: function (numberOfRecord) {
        if (numberOfRecord == undefined) {
            numberOfRecord = 50;
        }
        var list = [];
        for (var i = 0; i < numberOfRecord; i++) {
            var eventArchivesIndex = Math.floor((Math.random() * eventArchivesList.length));
            var eventStatusIndex = Math.floor((Math.random() * eventStatusList.length));
            var indexStatusIndex = Math.floor((Math.random() * indexStatusList.length));
            var indexCountry = Math.floor((Math.random() * countryList.length));
            var indexCity = Math.floor((Math.random() * cityList.length));
            list.push({
                country: countryList[indexCountry],
                city: cityList[indexCity],
                eventArchives: {
                    status: eventArchivesList[eventArchivesIndex],
                    renderData: eventArchivesRenderData
                },
                peers: {
                    href: "",
                    text: Math.floor((Math.random() * 100))
                },
                eventStatus: {
                    status: eventStatusList[eventStatusIndex],
                    renderData: eventStatusRenderData
                },
                indexStatus: {
                    status: indexStatusList[indexStatusIndex],
                    renderData: indexStatusRenderData
                },
                peerSelection: {
                    checked: Math.floor((Math.random() * 2)) % 2 == 0 ? true : false
                },
                cancelaction: {
                    src: "image/example/cancel_16x16.png"
                }
            });
        }
        return list;
    }
};

var ArcMCExampleGroupingGridData = {
    columnConfig: [
        {
            columnName: "Machine",
            propertyName: "machine",
            width: "200"
        },
        {
            columnName: "Event Archives",
            propertyName: "eventArchives",
            sortConfig: {
                compare: compareStatusFunction
            },
            filterConfig: {
                check: filterStatusFunction
            },
            template: {
                cellTemplate: ARCSIGHT.GridCellImageText,
                //headTemplate: ARCSIGHT.CustomHeadTemplate,
                disableHeadOption: true
            },
            handler: {
                headHandler: {
                    click: function () {
                        console.log("outside head function");
                    }
                },
                cellHandler: {
                    click: function () {
                        console.log("outside cell function");
                    }
                }
            },
            width: "200"
        },
        {
            columnName: "Peers",
            propertyName: "peers",
            template: {
                cellTemplate: ARCSIGHT.CellTemplateHyperlink,
            },
            sortConfig: {
                compare: compareTextFunction
            },
            width: "200"
        },
        {
            columnName: "Event Status",
            propertyName: "eventStatus",
            template: {
                cellTemplate: ARCSIGHT.GridCellImageText,
            },
            sortConfig: {
                compare: compareStatusFunction
            },
            filterConfig: {
                check: filterStatusFunction
            },
            width: "200"
        },
        {
            columnName: "Index Status",
            propertyName: "indexStatus",
            template: {
                cellTemplate: ARCSIGHT.GridCellImageText,
            },
            sortConfig: {
                compare: compareStatusFunction
            },
            filterConfig: {
                check: filterStatusFunction
            },
            width: "200"
        },
        {
            columnName: "Mirror my Selection on Peers",
            propertyName: "peerSelection",
            description: React.createElement("div", {}, [
				React.createElement("div", {
                    key: 0,
                    style: {
                        fontFamily: "Tahoma, Arial, Verdana, sans-serif",
                        fontSize: "12",
                        fontStyle: "normal",
                        fontWeight: "bold"
                    }
                }, "Example Info:"),
				React.createElement("div", {
                    key: 1,
                    style: {
                        width: "300"
                    }
                }, "This examples includes resizable panel, reorderable columns and grid state. Text selection is allowed.")
            ]),
            template: {
                cellTemplate: ARCSIGHT.CellTemplateCheckbox,
            },
            sortConfig: {
                compare: compareCheckFunction
            },
            width: "400"
},
        {
            columnName: "Cancel Action",
            propertyName: "cancelaction",
            template: {
                cellTemplate: ARCSIGHT.CellTemplateActionImage,
            },
            sortConfig: {
                sortable: false
            },
            width: "200"
        }
    ],
    gridData: function (numberOfRecord) {
        if (numberOfRecord == undefined) {
            numberOfRecord = 50;
        }
        var list = [];
        for (var i = 0; i < numberOfRecord; i++) {
            var eventArchivesIndex = Math.floor((Math.random() * eventArchivesList.length));
            var eventStatusIndex = Math.floor((Math.random() * eventStatusList.length));
            var indexStatusIndex = Math.floor((Math.random() * indexStatusList.length));
            var indexMachine = Math.floor((Math.random() * machineList.length));
            list.push({
                machine: machineList[indexMachine],
                eventArchives: {
                    status: eventArchivesList[eventArchivesIndex],
                    renderData: eventArchivesRenderData
                },
                peers: {
                    href: "",
                    text: Math.floor((Math.random() * 100))
                },
                eventStatus: {
                    status: eventStatusList[eventStatusIndex],
                    renderData: eventStatusRenderData
                },
                indexStatus: {
                    status: indexStatusList[indexStatusIndex],
                    renderData: indexStatusRenderData
                },
                peerSelection: {
                    checked: Math.floor((Math.random() * 2)) % 2 == 0 ? true : false
                },
                cancelaction: {
                    src: "image/example/cancel_16x16.png"
                }
            });
        }
        return list;
    }
};

var ArcMCExampleTreeData = {
    getTree: function (depth) {
        var maxDepth = 3;
        var list = [];
        if (depth < maxDepth) {
            for (var i = 0; i < 3; i++) {
                list.push({
                    name: "depth" + depth + "index" + i,
                    children: ArcMCExampleTreeData.getTree(depth + 1)
                });
            }
        }

        return list;
    },
    getTreeExample: function () {
        var treeData = [
            {
                name: "Grid",
                children: [
                    {
                        name: "Basic Grid",
                        children: []
                    },
                    {
                        name: "Grouping Grid",
                        children: []
                    },
                    {
                        name: "Tree Grid",
                        children: []
                    }
                ]
            },
            {
                name: "Tree",
                children: [
                    {
                        name: "Basic Tree",
                        children: []
                    },
                    {
                        name: "Scrollable Tree",
                        children: []
                    },
                ]
            },
            {
                name: "DropDown",
                children: [
                    {
                        name: "Basic DropDown",
                        children: []
                    },
                    {
                        name: "Grid DropDown",
                        children: []
                    },
                ]
            },
            {
                name: "Message"
            },
            {
                name: "Search List",
                children: []
            },
        ];

        return treeData;
    }
}

var ArcMCExampleTreeGridData = {
    columnConfig: [
        {
            columnName: "Name",
            propertyName: "name",
        },
        {
            columnName: "Age",
            propertyName: "age",
        },
        {
            columnName: "Email",
            propertyName: "email",
        }
    ],
    treegridData: function () {
        var maxDepth = 3;
        var rcs = function (depth) {
            var list = [];
            if (depth < maxDepth) {
                for (var i = 0; i < 3; i++) {
                    var random = Math.floor((Math.random() * 10));
                    list.push({
                        name: "name" + random,
                        age: "age" + random,
                        email: "email" + random,
                        children: rcs(depth + 1)
                    });
                }
            }

            return list;
        }

        return rcs(0);
    }
}

var ArcMCExampleTreeGridData2 = {
    columnConfig: [
        {
            columnName: "Event Archives",
            propertyName: "eventArchives",
            sortConfig: {
                compare: compareTextFunction
            },
            filterConfig: {
                check: filterImageTextFunction
            },
            template: {
                cellTemplate: ARCSIGHT.TreeGridCellImageText,
                headTemplate: ARCSIGHT.CustomHeadTemplate,
                disableHeadOption: false
            },
            handler: {
                headHandler: {
                    click: function () {
                        console.log("outside head function");
                    }
                },
                cellHandler: {
                    click: function () {
                        console.log("outside cell function");
                    }
                }
            }
        },
        {
            columnName: "Peers",
            propertyName: "peers",
            sortConfig: {
                compare: compareTextFunction
            },
            template: {
                cellTemplate: ARCSIGHT.CellTemplateHyperlink
            }
        },
        {
            columnName: "Event Status",
            propertyName: "eventStatus",
            template: {
                cellTemplate: ARCSIGHT.TreeGridCellImageText,
            },
            sortConfig: {
                compare: compareTextFunction
            },
            filterConfig: {
                check: filterImageTextFunction
            }
        },
        {
            columnName: "Index Status",
            propertyName: "indexStatus",
            template: {
                cellTemplate: ARCSIGHT.TreeGridCellImageText
            },
            sortConfig: {
                compare: compareTextFunction
            },
            filterConfig: {
                check: filterImageTextFunction
            }
        },
        {
            columnName: "Mirror my Selection on Peers",
            propertyName: "peerSelection",
            template: {
                cellTemplate: ARCSIGHT.CellTemplateCheckbox
            },
            sortConfig: {
                compare: compareCheckFunction
            }
        }
    ],
    treegridData: function () {
        var list_i = [];
        for (var i = 0; i < 8; i++) {
            var list_j = [];
            for (var j = 0; j < 1; j++) {
                var list_k = [];
                for (var k = 0; k < 5; k++) {
                    var eventStatusIndex = Math.floor((Math.random() * eventStatusList.length));
                    var indexStatusIndex = Math.floor((Math.random() * indexStatusList.length));
                    list_k.push({
                        eventArchives: {
                            text: "Archive " + k + " random " + Math.floor((Math.random() * 100)),
                            src: "image/example/archivel_16x16.png"
                        },
                        eventStatus: {
                            text: eventStatusRenderData[eventStatusList[eventStatusIndex]].text,
                            src: eventStatusRenderData[eventStatusList[eventStatusIndex]].src,
                        },
                        indexStatus: {
                            text: indexStatusRenderData[indexStatusList[indexStatusIndex]].text,
                            src: indexStatusRenderData[indexStatusList[indexStatusIndex]].src,
                        }
                    });
                }
                list_j.push({
                    eventArchives: {
                        text: "Storage Group " + j + " random " + Math.floor((Math.random() * 100)),
                        src: "image/example/storage_16x16.png"
                    },
                    children: list_k
                });
            }
            list_i.push({
                eventArchives: {
                    text: "132.14.58." + i + " random " + Math.floor((Math.random() * 100)),
                    src: "image/example/IP_16x16.png"
                },
                peers: {
                    href: "",
                    text: Math.floor((Math.random() * 100))
                },
                peerSelection: {
                    checked: Math.floor((Math.random() * 2)) % 2 == 0 ? true : false
                },
                children: list_j
            });
        }
        return list_i;
    }
};

var ArcMCExampleTreeGridData3 = {
    columnConfig: [
        {
            columnName: "Event Archives",
            propertyName: "eventArchives",
            sortConfig: {
                compare: compareEventArchiveFunction
            },
            filterConfig: {
                check: filterImageTextFunction
            },
            template: {
                cellTemplate: ARCSIGHT.CustomEventArchives,
                disableHeadOption: false
            },
            handler: {
                headHandler: {
                    click: function () {
                        console.log("outside head function");
                    }
                },
                cellHandler: {
                    click: function () {
                        console.log("outside cell function");
                    }
                }
            },
            width: 800
        },
        {
            columnName: "Event Status",
            propertyName: "eventStatus",
            template: {
                cellTemplate: ARCSIGHT.TreeGridCellImageText,
            },
            sortConfig: {
                compare: compareTextFunction
            },
            filterConfig: {
                check: filterImageTextFunction
            },
            width: 200
        },
        {
            columnName: "Index Status",
            propertyName: "indexStatus",
            template: {
                cellTemplate: ARCSIGHT.TreeGridCellImageText
            },
            sortConfig: {
                compare: compareTextFunction
            },
            filterConfig: {
                check: filterImageTextFunction
            },
            width: 200
        }
    ],
    treegridData: function () {
        var list_h = [];
        for (var h = 0; h < 15; h++) {
            var list_i = [];
            for (var i = 0; i < 2; i++) {
                var list_j = [];
                for (var j = 0; j < 3; j++) {
                    var list_k = [];
                    for (var k = 0; k < 5; k++) {
                        var eventStatusIndex = Math.floor((Math.random() * eventStatusList.length));
                        var indexStatusIndex = Math.floor((Math.random() * indexStatusList.length));
                        list_k.push({
                            eventArchives: {
                                type: "tree",
                                text: "Archive " + (k + 1),
                                src: "image/example/archivel_16x16.png"
                            },
                            eventStatus: {
                                text: eventStatusRenderData[eventStatusList[eventStatusIndex]].text,
                                src: eventStatusRenderData[eventStatusList[eventStatusIndex]].src,
                            },
                            indexStatus: {
                                text: indexStatusRenderData[indexStatusList[indexStatusIndex]].text,
                                src: indexStatusRenderData[indexStatusList[indexStatusIndex]].src,
                            }
                        });
                    }
                    list_j.push({
                        eventArchives: {
                            type: "tree",
                            text: "Storage Group " + (j + 1),
                            src: "image/example/storage_16x16.png"
                        },
                        children: list_k
                    });
                }
                list_i.push({
                    eventArchives: {
                        type: "tree",
                        text: "132.14.58." + (i + 1) + (Math.floor(Math.random() * 10)),
                        src: "image/example/IP_16x16.png"
                    },
                    peers: {
                        href: "",
                        text: Math.floor((Math.random() * 100))
                    },
                    peerSelection: {
                        checked: Math.floor((Math.random() * 2)) % 2 == 0 ? true : false
                    },
                    children: list_j
                });
            }
            list_h.push({
                eventArchives: {
                    type: "group",
                    jobissue: "Oct " + (h + 10) + ",2015",
                    startDate: (h + 10) + ",2015",
                    endDate: "Sept " + (h + 10) + ",2015",
                    action: Math.floor((Math.random() * 2)) % 2 == 0 ? "Load" : "UnLoad"
                },
                children: list_i
            });
        }

        return list_h;
    }
};

var DropDownGridData = {
    columnConfig: [
        {
            columnName: {
                checked: false,
                text: "Event Archives"
            },
            propertyName: "eventArchives",
            sortConfig: {
                compare: compareTextFunction,
                sortable: false
            },
            filterConfig: {
                check: filterImageTextFunction,
                disableFilter: true
            },
            template: {
                cellTemplate: ARCSIGHT.CellTemplateGrommetCheckbox,
                headTemplate: ARCSIGHT.HeadTemplateGrommetCheckbox,
                disableHeadOption: true
            },
            handler: {
                headHandler: {
                    click: function () {
                        console.log("outside head function");
                    }
                },
                cellHandler: {
                    click: function () {
                        console.log("outside cell function");
                    }
                }
            },
            width: 300,
        },
        {
            columnName: "Peers",
            propertyName: "peers",
            sortConfig: {
                compare: compareTextFunction
            },
            template: {
                cellTemplate: ARCSIGHT.CellTemplateHyperlink
            },
            width: 150,
        },
        {
            columnName: "Select all my peers",
            propertyName: "peerSelection",
            template: {
                cellTemplate: ARCSIGHT.CellTemplateCheckbox
            },
            sortConfig: {
                compare: compareCheckFunction
            },
            width: 300,
        }
    ],
    gridData: function () {
        var list = [];
        for (var i = 0; i < 50; i++) {
            list.push({
                eventArchives: {
                    checked: Math.floor((Math.random() * 2)) % 2 == 0 ? true : false,
                    text: "Archive " + i + " random " + Math.floor((Math.random() * 100)),
                    src: "image/example/IP_16x16.png"
                },
                peers: {
                    href: "",
                    text: Math.floor((Math.random() * 100))
                },
                peerSelection: {
                    checked: Math.floor((Math.random() * 2)) % 2 == 0 ? true : false
                }
            });
        }
        return list;
    }
};