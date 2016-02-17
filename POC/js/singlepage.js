$(document).ready(function () {
    var wh = $(window).height();
    var treegridButtonbarHeight = $("#treegridButtonbar").outerHeight();
    var gridButtonbarHeight = $("#gridButtonbar").outerHeight();

    $("#grid").height(wh - gridButtonbarHeight);
    $("#treegrid").height(wh - treegridButtonbarHeight);

    $("#treegrid").scroll(function () {
        var head = $("#treegrid").children("table").children("thead");
        var st = $("#treegrid").scrollTop();
        if (st > 0) {
            $.map(head.children("tr").children("th"), function (node, index) {
                var w = $(node).outerWidth();
                var style = "width:" + w + "px;";
                $(node).attr("style", style);
            });
            head.addClass("onscroll");
            head.css("top", st + "px");
        } else {
            $.map(head.children("tr").children("th"), function (node, index) {
                $(node).attr("style", "");
            });
            head.css("top", "0");
            head.removeClass("onscroll");
        }
    });
});

$(window).resize(function () {
    var wh = $(window).height();
    var treegridButtonbarHeight = $("#treegridButtonbar").outerHeight();
    var gridButtonbarHeight = $("#gridButtonbar").outerHeight();
    $("#grid").height(wh - gridButtonbarHeight);
    $("#treegrid").height(wh - treegridButtonbarHeight);

    var head = $("#treegrid").children("table").children("thead");
    $.map(head.children("tr").children("th"), function (node, index) {
        $(node).attr("style", "");
    });
    head.css("top", "0");
    head.removeClass("onscroll");
    var st = $("#treegrid").scrollTop();
    $("#treegrid").scrollTop(st+1);
    $("#treegrid").scrollTop(st);
});


//use for index2.html
var AsBigAsWindow = function(){
    var w = $(window).width();
    var h = $(window).height();
    $("#AS-Window").width(w);
    $("#AS-Window").height(h);
}
$(document).ready(function () {
    AsBigAsWindow();
});

$(window).resize(function () {
    AsBigAsWindow();
});
