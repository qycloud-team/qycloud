angular.module("commons.directives").directive("moveToWindow", [
    '$log',
    'modal',
    'FileRest',
    '$translate',
    'ErrorType',
    moveToWindow
]);

function moveToWindow($log, modal, FileRest, $translate, ErrorType) {
    return {
        restrict: "EA",
        replace: true,
        transclude: false,
        template: __inline("../../templates/file/MoveToWindow.html"),
        scope: {
            param: '='
        },

        link: function (scope, elem, attrs) {
            scope.modal = modal;

            scope.onSelectFolder = function (folder) {
                scope.folder = folder;
            }

            scope.onConfirm = function () {
                FileRest.files.move({
                    toFolderId: scope.folder.fileId,
                    files: _.map(scope.param.files, function (file) {
                        return _.pick(file, 'fileId', 'version', 'fileType');
                    }),
                    fileType: scope.folder.fileType
                }).then(function () {
                    noty.success($translate('msgFileMoveSuccess'));
                    scope.modal.moveToWindow = false;
                    scope.$emit('fileMoved',scope.param.files);
                }).fail(function (err) {
                    noty.alert(ErrorType.moveFileError(err));
                });
            }
        }
    }
}