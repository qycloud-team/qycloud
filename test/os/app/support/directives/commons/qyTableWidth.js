angular.module("commons.directives").directive("qyTableWidth", [
    'constants',
    qyTableWidth
]);

function qyTableWidth(constants) {
    'use strict';

    return {
        restrict: 'EA',
        replace: false,
        transclude: false,
        link: function (scope, elem, attrs) {
            var width = $(window).width(),
                height = $(window).height(),
                mainboxHeight = height - 80 - 20;

            function contentRightWidth() {
                return width - 207 - (!!scope.slideType ? 271 : 0) - 4;
            }

            function fileNameCellWidth() {
                return contentRightWidth() - 37 - 80 - 60 - 100 - 150;
            }

            elem.css({
                'width': fileNameCellWidth()
            })

            scope.$watch('slideType', function () {
                elem.css({
                    'width': fileNameCellWidth()
                });
            })
        }
    };
}