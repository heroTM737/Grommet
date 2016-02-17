//create searchList
var list = [];
for (var i = 0; i < 10; i++) {
    list.push({
        value: "Value " + Math.floor(Math.random() * 1000)
    });
}
var searchList_example = React.render(
    React.createElement(
        SearchList, {
            data: list
        }
    ),
    document.getElementById("searchlist")
);