var tag = "PermissionSelector: ";

angular.module("commons.directives").directive("permissionSelector", [
    '$log',
    'constants',
    permissionSelector
]);

function permissionSelector($log, constants) {

    function postLink($scope, $element, attrs) {
        $scope.directiveName = tag;
    }

    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require: ["^?onselect"],
        template: __inline('../../templates/_permissionselector.html'),
        scope: {
            'permission': '=permission'
        },
        link: postLink
    }
}
