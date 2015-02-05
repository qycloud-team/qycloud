angular.module("commons.directives").directive("copyToWindow", [
    '$log',
    '$translate',
    'modal',
    'ErrorType',
    'FileRest',
    copyToWindow
]);

function copyToWindow($log, $translate, modal, ErrorType, FileRest) {
    return {
        restrict: "EA",
        replace: true,
        transclude: false,
        template: __inline("../../templates/file/CopyToWindow.html"),
        scope: {
            param: '='
        },

        link: function (scope, elem, attrs) {
            scope.modal = modal;

            scope.onSelectFolder = function (folder) {
                scope.folder = folder;
            };

            scope.onConfirm = function () {
                FileRest.files.copy({
                    folderId: scope.folder.fileId,
                    type: scope.folder.fileType,
                    folderIds: _.pluck(_.filter(scope.param.files, function (file) {
                        return file.isFolder
                    }), 'fileId'),
                    fileIds:  _.pluck(_.filter(scope.param.files, function (file) {
                        return !file.isFolder
                    }), 'fileId')
                }).then(function () {
                        noty.success($translate('msgFileCopySuccess'));
                        scope.modal.copyToWindow = false;
                    }).fail(function (err) {
                    noty.alert(ErrorType.entDiskCopyError(err));
                });
            }
        }
    }
}