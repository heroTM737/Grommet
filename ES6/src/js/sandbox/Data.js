// import ARCSIGHT from './ArcsightTemplate';

// var eventStatusList = ["loading", "loaded", "failed", "pending", "archiving", "archived", "available"];
//
// var indexStatusList = ["indexing", "indexed", "failed", "pending", "none"];
//
// var eventArchivesList = ["archive", "storage", "ip"];
//
// var countryList = ["vietnam", "japan", "china"];
//
// var cityList = ["Hanoi", "DaNang", "HoChiMinh"];
//
// var machineList = ["System 1", "System 2", "System 3", "System 4"];

let ArcMCExampleTreeData = {
  getTree: function(maxDepth, children) {
    var rcs = function(depth) {
      var list = [];
      if (depth < maxDepth) {
        for (var i = 0; i < children; i++) {
          list.push({
            name: "depth" + depth + "index" + i,
            children: rcs(depth + 1)
          });
        }
      }
      return list;
    };

    return rcs(0, children);
  },
  getTreeVR: function(maxDepth, children, prefix) {
    var count = 0;
    var rcs = function(depth) {
      var list = [];
      if (depth < maxDepth) {
        for (var i = 0; i < children; i++) {
          count++;
          // let random = Math.floor(Math.random() * 100);
          // let name = random + " node " + prefix + " " + count;
          let name = "node " + prefix + " " + count;
          while (name.indexOf("  ") >= 0) {
            name = name.replace("  ", " ");
          }
          list.push({
            name: name,
            children: rcs(depth + 1)
          });
        }
      }
      return list;
    };

    return rcs(0);
  },
  getTreeExample: function() {
    var treeData = [{
      name: "Grid",
      children: [{
        name: "Basic Grid",
        children: []
      }, {
        name: "Grouping Grid",
        children: []
      }, {
        name: "Tree Grid",
        children: []
      }]
    }, {
      name: "Tree",
      children: [{
        name: "Basic Tree",
        children: []
      }, {
        name: "Scrollable Tree",
        children: []
      }]
    }, {
      name: "DropDown",
      children: [{
        name: "Basic DropDown",
        children: []
      }, {
        name: "Grid DropDown",
        children: []
      }]
    }, {
      name: "Message"
    }, {
      name: "Search List",
      children: []
    }];

    return treeData;
  },
  getTreeExampleMassive: function() {
    var maxDepth = 4;
    var children = 4;

    var rcs = function(depth) {
      var list = [];
      if (depth < maxDepth) {
        for (var i = 0; i < children; i++) {
          list.push({
            name: "depth" + depth + "index" + i,
            children: rcs(depth + 1)
          });
        }
      }

      return list;
    };

    return rcs(0);
  }
};

let ArcMCExampleGridData = {
  columnConfig: [{
    columnName: "Event Archives",
    propertyName: "eventArchives",
    width: "200"
  }, {
    columnName: "Peers",
    propertyName: "peers",
    width: "200"
  }, {
    columnName: "Event Status",
    propertyName: "eventStatus",
    width: "200"
  }, {
    columnName: "Index Status",
    propertyName: "indexStatus",
    width: "200"
  }, {
    columnName: "Mirror my Selection on Peers",
    propertyName: "peerSelection",
    width: "200"
  }, {
    columnName: "Cancel Action",
    propertyName: "cancelaction",
    width: "200"
  }],
  gridData: function(numberOfRecord) {
    if (numberOfRecord == undefined) {
      numberOfRecord = 50;
    }
    var list = [];
    for (var i = 1; i <= numberOfRecord; i++) {
      list.push({
        eventArchives: "eventArchives" + i,
        peers: "peers" + i,
        eventStatus: "eventStatus" + i,
        indexStatus: "indexStatus" + i,
        peerSelection: "peerSelection" + i,
        cancelaction: "cancelaction" + i
      });
    }
    return list;
  }
};

module.exports = {
  ArcMCExampleTreeData: ArcMCExampleTreeData,
  ArcMCExampleGridData: ArcMCExampleGridData
};
