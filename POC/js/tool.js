var ASTool = {};
ASTool.mask = function (element) {
    var $element = $(element);
    if ($element.css("position") != "relative") {
        $element.css("position", "relative");
    }

    $element.append(
        "<div id='maskGlobal' class='mask' style='top: 0px; left: 0px'><div class='mask-align'><img class='spinning-icon' src='image/widget/arcmc-loading.svg'></div></div>"
    );
    
//    $(parent.document.body).append(
//        "<div id='maskGlobal' class='mask' style='top: 0px; left: 0px;'><div class='mask-align'><img class='spinning-icon' src='image/widget/arcmc-loading.svg'></div></div>"
//    );
};
ASTool.unmask = function (element) {
    var $element = $(element);
    $element.children().last().remove();
//    $(parent.document.body).children().last().remove();
};

ASTool.getTopBodyLevel = function(element){
    
};