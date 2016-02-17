var SearchList = React.createClass({
    getInitialState: function () {
        return {
            value: ""
        };
    },
    render: function () {
        var searchlist = this;
        var data = this.props.data;
        var list = [];
        for (var i = 0; i < data.length; i++) {
            list.push(
                React.createElement("div", {
                    key: i,
                    className: (data[i].hidden == true) ? "hidden" : "list-item",
                    style: {
                        
                    }
                }, data[i].value)
            );
        }

        var searchElement = React.createElement(Grommet.SearchInput, {
            key: 0,
//            inline: true,
            placeHolder: "Search...",
            value: searchlist.state.value,
            onChange: function (text) {
                searchlist.state.value = text;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].value.indexOf(text) < 0) {
                        data[i].hidden = true;
                    } else {
                        data[i].hidden = false;
                    }
                }
                searchlist.forceUpdate();
            }
        });
        var clearButton = React.createElement("img", {
            key: 1,
            src: "image/widget/clear.png",
            className: "clearSearch",
            onClick: function () {
                searchlist.state.value = "";
                for (var i = 0; i < data.length; i++) {
                    data[i].hidden = false;
                }
                searchlist.forceUpdate();
            }
        });
        var searchContainer = React.createElement("div", {
            key: 0,
            className: "searchContainer",
        }, [searchElement]);

        var listContainer = React.createElement("div", {
            key: 1
        }, list);

        return React.createElement("div", {}, [searchContainer, listContainer]);
    }
});