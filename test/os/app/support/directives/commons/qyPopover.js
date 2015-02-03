angular.module("commons.directives").directive("qyPopover", [
    '$log',
    '$parse',
    '$compile',
    modalShow
]);

function modalShow($log, $parse, $compile) {

    return {
        restrict: "A",
        link: function ($scope, $elem, attrs) {
            var $html = $parse($elem.data("content")),
                realhtml = $html($scope);
            $elem.data("content", realhtml);
            $elem.popover().on("shown", function () {
                var $popover = $elem.siblings('.popover');
                $compile($popover.contents())($scope);
            });
        }
    };
}