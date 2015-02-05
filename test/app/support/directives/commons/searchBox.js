angular.module("commons.directives").directive("searchBox", [
    SearchBox
]);

function SearchBox() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        template: __inline('../../templates/searchBox.html'),
        scope: {
            'placeholder': '@',
            'search': '&',
            'cancel': '&'
        },
        controller: [
            '$scope',
            'noty',
            function ($scope, noty) {
                $scope.searchKey = '';

                $scope.onSearch = function () {
                    if ($scope.searchKey) {
                        $scope.search && $scope.search({
                            searchKey: $scope.searchKey
                        })
                    } else {
                        $scope.cancel && $scope.cancel();
                    }
                };

                $scope.cancelSearch = function () {
                    $scope.searchKey = '';
                    if ($scope.cancel) {
                        $scope.cancel();
                    }
                };
            }
        ],
        link: function ($scope, $elem, attrs) {

        }
    };
}