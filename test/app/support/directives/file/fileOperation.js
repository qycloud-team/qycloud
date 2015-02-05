var tag = "(directives/fileOperation) ";

angular.module("commons.directives").directive("fileOperation", [
    '$log',
    'constants',
    fileOperation
]);

function fileOperation($log, constants) {

    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        link: function (scope, elem, attrs) {
            scope.directiveName = "fileOperation";

            scope.$watch("checkedFiles", _getViewOperations, true);

            /**
             * 获取界面操作按钮
             * @returns {Array}
             * @private
             */
            function _getViewOperations() {
                var operations = [];
                if (scope.checkedFiles) {
                    var length = scope.checkedFiles.length;
                    if (length === 1) {
                        operations = scope.checkedFiles[0].getOperations();
                    } else if (length > 1) {
                        if (scope.currentFolder.fileType === 'sharedisk') {
                            operations = _getEntFilesOperations();
                        } else if (scope.currentFolder.fileType === 'onlinedisk') {
                            operations = _getPersonFilesOperations();
                        }
                    }
                }
                scope.operations = operations;

                var lowoperations = _.without(operations, 'upload', 'create', 'permission', 'sync');  // 移除高级的操作
                _ctrlBtnShow(lowoperations);
                return operations;
            }

            /**
             * 控制按钮显示
             * @param operates
             * @param showNoBtn
             */
            function _ctrlBtnShow(userops) {
                if (userops.length <= 4) {
                    return;
                }

                var highops = _.intersection(userops, ['download', 'share', 'unshare', 'attention', 'unattention']); // 高优先级的操作
                var lowops = _.difference(userops, highops);// 低优先级的操作
                if (highops.length < 3) {
                    lowops.splice(0, 3 - highops.length);
                }

                var opclass = "";
                var lowSelector = _.reduce(lowops, function (str, op) {
                    opclass = constants.OperateBtnMap[op];
                    return str.length ? str + ", ." + opclass : "." + opclass;
                }, "");
                elem.find(lowSelector).appendTo(elem.find(".more-dropdown-menu")).removeClass("btn-clear").addClass("btn-link");
            }

            function _getPersonFilesOperations() {
                var operations = ['download'];
                var hasSysFolder = _.some(scope.checkedFiles, function (file) {
                    return file.sysFolder;
                });
                !hasSysFolder && operations.push('delete', 'move', 'copyto');
                return operations;
            }

            function _getEntFilesOperations() {
                // 企业网盘多文件/文件夹操作
                var attentCount = 0,
                    operations = ['download', 'copy', 'delete', 'move', 'attention', 'unattention'];

                _.each(scope.checkedFiles, function (file) {                                    //遍历文件
                    file.remind && attentCount++;
                    operations = _.intersection(file.getMultiFilesOperations(), operations);
                });
                if (_.indexOf(operations, 'attention') > -1)
                    webhelper.without(operations, attentCount === length ? ['unattention'] : ['attention']);
                return operations;
            }
        }
    };
}