angular.module("commons.directives").directive("qyFilehref", [
    'constants',
    fileHref
]);

function fileHref() {
    'use strict';

    return {
        restrict: 'EA',
        replace: false,
        transclude: false,

        link: function (scope, elem, attrs) {
            var file = scope.historie;
            if (file.folderId) {
                var folederHref = '#sharedisk/forwardfloder/' + file.folderId;
                attrs.$set("ngClick", undefined);
                elem.unbind('click');
                elem.attr("href", folederHref);
            } else {
                var fileHref = '#sharedisk/forwardfile/' + file.fileId;
                attrs.$set("ngClick", undefined);
                elem.unbind('click');
                elem.attr("href", fileHref);
            }
        }
    };
}