var dropdowngrid, dropdowngridData;
//create dropdowngrid
var dropdowngridData = DropDownGridData.gridData();
var columnConfig = DropDownGridData.columnConfig;
var updateSelected = function () {
    var count = 0;
    for (var i in dropdowngridData) {
        if (dropdowngridData[i].eventArchives.checked) {
            count++;
        }
    }
    if (count == dropdowngridData.length) {
        columnConfig[0].columnName.checked = true;
    } else {
        columnConfig[0].columnName.checked = false;
    }

    var value = ""
    switch (count) {
    case 0:
        value = "no item was selected";
        break;
    case 1:
        value = "1 item was selected";
        break;
    default:
        value = count + " items was selected";
        break;
    }
    dropdowngrid.updateValue(value);
};
columnConfig[0].handler.cellHandler.click = function (event) {
    updateSelected();
};
columnConfig[0].handler.headHandler.click = function (event) {
    var checked = event.target.checked;
    for (var i in dropdowngridData) {
        dropdowngridData[i].eventArchives.checked = checked;
    }
    updateSelected();
};
var exampletable = React.createElement(Grid, {
    bodyData: dropdowngridData,
    columnConfig: columnConfig,
    selection: "none",
    view:{
        maxHeight: "500px"
    }
});

dropdowngrid = React.render(
    React.createElement(
        DropDown, {
            widget: exampletable
        }
    ),
    document.getElementById("dropdowngrid")
);

updateSelected();