angular.module("commons.directives").directive("spaceListener", [
    '$parse',
    function ($parse) {
        return function ($scope, $elem, $attrs) {
            $elem.bind('keydown', "space", function (event) {
                $scope.$apply(function () {
                    $parse($attrs.spaceListener)($scope);
                });
                event.preventDefault();
                event.stopPropagation();
            })
        }
    }
]);