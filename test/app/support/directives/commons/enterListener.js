angular.module("commons.directives").directive("enterListener", [
    '$parse',
    function ($parse) {
        return function ($scope, $elem, $attrs) {
            $elem.bind('keydown', "return", function (event) {
                $scope.$apply(function () {
                    $parse($attrs.enterListener)($scope);
                });
                event.preventDefault();
                event.stopPropagation();
            })
        }
    }
]);