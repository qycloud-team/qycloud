var tag = "PersonFolderSelector: ";

angular.module("commons.directives").directive("personFolderSelector", [
    '$log',
    'constants',
    personFolderSelector
]);

function personFolderSelector($log, constants) {

    function postLink($scope, $element, attrs) {
    }

    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        template: __inline('../../templates/file/personFolderSelector.html'),
        scope: {
            'modalTitle': '@',
            'toggleby': '=',
            'onselect': '&'
        },
        controller: [
            '$scope',
            function ($scope) {
                $scope.ctrlName = tag;

                $scope.onSelectFolder = function (selectFolder) {
                    $scope.selectFolder = selectFolder;
                };

                $scope.confirmSelect = function () {
                    if ($scope.selectFolder && $scope.onselect) {
                        $scope.onselect({
                            selectFolder: $scope.selectFolder
                        });
                    }
                    $scope.toggleby = false;
                };
            }
        ],
        link: postLink
    }
}
