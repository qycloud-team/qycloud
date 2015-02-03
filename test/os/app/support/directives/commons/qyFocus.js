angular.module("commons.directives").directive("qyFocus", [
    modalShow
]);

function modalShow() {

    return {
        restrict: "A",
        link: function ($scope, $elem, attrs) {
            $elem.focus();
        }
    };
}