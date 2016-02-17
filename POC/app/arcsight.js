var ARCSIGHT = {};
//head template
ARCSIGHT.HeadTemplateGrommetCheckbox = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        var template = this;
        var cellData = this.props.cellData;

        var checkboxElement = React.createElement(Grommet.CheckBox, {
            key: 0,
            id: "0",
            label: "",
            checked: cellData.checked,
            onChange: function (event) {
                cellData.checked = event.target.checked;
                if (template.props.handler != null && template.props.handler.click != null) {
                    template.props.handler.click(event);
                }
            }
        });

        return React.createElement(
            "div", {}, [checkboxElement, cellData.text]
        );
    }
});
ARCSIGHT.CustomHeadTemplate = React.createClass({
    render: function () {
        var template = this;
        var text = this.props.cellData;
        var customTag = React.createElement("span", {
            key: 0,
            style: {
                color: "red"
            }
        }, "Custom + ");
        var clickHandler = function () {
            if (template.props.handler != null && template.props.handler.click != null) {
                template.props.handler.click();
            }
        }
        return React.createElement("span", {
            onClick: clickHandler
        }, [customTag, text]);
    }
});
//cel template
ARCSIGHT.GridCellImageText = React.createClass({
    render: function () {
        var cellData = this.props.cellData;
        var renderData = cellData.renderData;

        return React.createElement(
            "div", {

            }, [
                React.createElement("img", {
                    key: 0,
                    src: renderData[cellData.status].src,
                    style: {
                        verticalAlign: "middle",
                        marginRight: "5px"
                    }
                }),
                renderData[cellData.status].text
            ]
        );
    }
});
ARCSIGHT.CellTemplateHyperlink = React.createClass({
    render: function () {
        var template = this;
        var cellData = this.props.cellData;

        if(cellData.text == "0" || cellData.text == 0){
            return React.createElement(
                "div", {}, cellData.text
            );
        }else {
            return React.createElement(
                "a", {
                    //                href: "#" + cellData.href,
                    style: {
                        textDecoration: "underline !important"
                    },
                    onClick: function () {
                        var domnode = template.getDOMNode();
                        var top = $(domnode).offset().top;
                        var left = $(domnode).offset().left;
                        var height = $(domnode).height();

                        var list = [];
                        for (var i = 0; i < 5; i++) {
                            list.push({
                                value: "Value " + Math.floor(Math.random() * 1000)
                            });
                        }
                        var searchlist = React.createElement(
                            SearchList, {
                                data: list
                            }
                        );

                        React.render(
                            React.createElement(Popup, {
                                title: "Peer Loggers",
                                widget: searchlist,
                                position: {
                                    top: top + height,
                                    left: left
                                }
                            }),
                            Popup.getPopupContainer()
                        );
                    }
                }, cellData.text
            );
        }
    }
});
ARCSIGHT.CellTemplateCheckbox = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        var cellTemplate = this;
        var cellData = this.props.cellData;

        return React.createElement(
            "div", {
                style: {
//                    textAlign: "center"
                    paddingLeft: "75px"
                }
            },
            React.createElement(
                Grommet.CheckBox, {
                    id: "xxx",
                    checked: cellData.checked,
                    label: "",
                    onChange: function (event) {
                        cellData.checked = event.target.checked;

                        var text = "new status : " + cellData.checked + "\n\n";
                        var rowData = cellTemplate.props.rowData;
                        for (var prop in rowData) {
                            var value = "";
                            if (rowData[prop].text != null) {
                                value += rowData[prop].text;
                            }
                            if (rowData[prop].checked != null) {
                                value += rowData[prop].checked;
                            }
                            text += prop + " : " + value + "\n";
                        }
                        alert(text);

                        cellTemplate.forceUpdate();
                    },
                    onClick: function (event) {
                        event.stopPropagation();
                    }
                }
            )
        );
    }
});
ARCSIGHT.CellTemplateGrommetCheckbox = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        var cellTemplate = this;
        var cellData = this.props.cellData;

        var checked = cellData.checked;
        var text = cellData.text;
        var src = cellData.src;
        if (src == null || src.length == 0) {
            src = "image/example/empty.png";
        }

        var checkboxElement = React.createElement(Grommet.CheckBox, {
            key: 0,
            id: "0",
            label: "",
            checked: checked,
            onChange: function (event) {
                cellData.checked = event.target.checked;
                cellTemplate.props.handler.click(event);
            }
        });

        var imgElement = React.createElement("img", {
            key: 1,
            style: {
                verticalAlign: "middle",
                marginRight: "5px"
            },
            src: src
        });

        var textElement = text;

        return React.createElement("div", {
            style: {
                float: "left"
            }
        }, [checkboxElement, imgElement, textElement]);
    }
});
ARCSIGHT.CellTemplateActionImage = React.createClass({
    render: function () {
        var cellData = this.props.cellData;
        var rowData = this.props.rowData;
        var actionImage = this;
        if (rowData["eventStatus"].status == "pending") {
            var image = React.createElement(
                "img", {
                    src: cellData.src,
                    style: {
                        borderRadius: "100%",
                        border: "2px solid rgba(0,0,0,0)"
                    },
                    onClick: function (event) {
                        rowData["eventStatus"].status = "failed";
                        actionImage.props.gridrow.forceUpdate();
                        event.stopPropagation();
                    },
                    onMouseOver: function (event) {
                        event.target.style.borderColor = "#ff454f";
                    },
                    onMouseOut: function (event) {
                        event.target.style.borderColor = "rgba(0,0,0,0)";
                    }
                }
            );

            return React.createElement("div", {
                style: {
                    width: "100px",
                    textAlign: "center"
                }
            }, image);
        }
        return null;
    }
});
ARCSIGHT.TreeGridCellImageText = React.createClass({
    render: function () {
        var cellData = this.props.cellData;
        var text = cellData.text;
        var src = cellData.src;
        if (src == null || src.length == 0) {
            src = "image/example/empty.png";
        }
        return React.createElement("div", {
            style: {
                float: "left"
            }
        }, [
            React.createElement("img", {
                key: 0,
                style: {
                     margin: "-3px 5px 0 0"
                },
                src: src
            }),
            text
        ]);
    }
});
ARCSIGHT.CustomEventArchives = React.createClass({
    render: function () {
        var cellData = this.props.cellData;
        var type = cellData.type;
        switch (type) {
        case "tree":
            var cellData = this.props.cellData;
            var text = cellData.text;
            var src = cellData.src;
            if (src == null || src.length == 0) {
                src = "image/example/empty.png";
            }
            return React.createElement("div", {
                style: {
                    float: "left"
                }
            }, [
            React.createElement("img", {
                    key: 0,
                    style: {
                       margin: "-3px 5px 0 0"
                    },
                    src: src
                }),
            text
        ]);
        case "group":
            var html1 = "<b>Job Issued:</b> " + cellData.jobissue;
            var html2 = " <b> - Start Date:</b> " + cellData.startDate;
            var html3 = " <b>End Date:</b> " + cellData.endDate;
            var color;
            if (cellData.action == "Load") {
                color = "00b388";
            } else {
                color = "99311c";
            }
            var html4 = " <b>(Action: <span style='color:#" + color + "'>" + cellData.action + "</span> )</b>";

            var html = html1 + html2 + html3 + html4;
            return React.createElement(
                "div", {
                    style: {
                        float: "left"
                    },
                    dangerouslySetInnerHTML: {
                        __html: html
                    }
                }
            );
            break;
        }

    }
});