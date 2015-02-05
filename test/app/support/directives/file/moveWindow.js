var tag = "moveWindow::";

angular.module("commons.directives").directive("moveWindow", [
    '$log',
    'modal',
    'FileRest',
    '$translate',
    'ErrorType',
    moveWindow
]);

function moveWindow($log, modal, FileRest, $translate, ErrorType) {
    return {
        restrict: "EA",
        replace: true,
        transclude: false,
        template: __inline("../../templates/file/MoveWindow.html"),
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
                        scope.modal.moveWindow = false;
                        scope.$emit('fileMoved',scope.param.files);
                    }).fail(function (err) {
                        log.debug(tag, "err: ", err);
                        noty.alert(ErrorType.moveFileError(err));
                    });
            }
        }
    }
}