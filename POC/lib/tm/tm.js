/*JavaScript Library created by TM*/
/*Require Jquery from Google*/

/*scrollbar check*/
(function ($) {
    $.fn.hasScrollBar = function () {
        return this.get(0).scrollHeight > this.height();
    }
})(jQuery);
/*end of scrollbar check*/

/*remove inline style*/
(function ($) {
    $.fn.removeStyle = function (style) {
        var search = new RegExp(style + '[^;]+;?', 'g');

        return this.each(function () {
            $(this).attr('style', function (i, style) {
                return style.replace(search, '');
            });
        });
    };
}(jQuery));
/*end of remove inline style*/

/*tab*/
$(document).ready(function () {
    $(".tab-panel .tab-title").height($(window).height());

    var selectTab = function (tab_panel, tab_index) {
        var tab_title_item_list = tab_panel.children(".tab-title").children(".tab-title-item");
        var tab_content_item_list = tab_panel.children(".tab-content").children(".tab-content-item");

        //remove all then add highlight to selected title
        for (var i = 0; i < tab_title_item_list.length; i++) {
            $(tab_title_item_list[i]).removeClass("tab-title-item-selected");
        }
        $(tab_title_item_list[tab_index]).addClass("tab-title-item-selected");

        //hide all then show selected content
        for (var i = 0; i < tab_content_item_list.length; i++) {
            $(tab_content_item_list[i]).addClass("hidden");
        }
        $(tab_content_item_list[tab_index]).removeClass("hidden");
    }

    $(".tab-panel .tab-title .tab-title-item").click(function (event) {
        var tab_index = $(event.target).index();
        var tab_panel = $(event.target).parent().parent();
        selectTab(tab_panel, tab_index);
    });

    //select first tab
//    selectTab($($(".tab-panel")[0]), $(".tab-panel .tab-title .tab-title-item").length - 1);
    selectTab($($(".tab-panel")[0]), 0);

});

$(window).resize(function () {
    $(".tab-panel .tab-title").height($(window).height());
});
/*end of tab*/