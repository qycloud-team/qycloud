angular.module("commons.directives").directive("fileItem", [
    fileItem
]);

function fileItem() {
    return {
        restrict: "EA",
        replace: true,
        transclude: false,
        template: __inline("../../templates/file/FileItem.html"),
        scope: {
            'fileInfo': '=',
            'files': '=',
            'checkedFiles': '='
        },

        link: function () {

        }
    }
}
