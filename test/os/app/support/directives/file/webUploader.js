var tag = "webUploader::";

angular.module("commons.directives").directive("webUploader", [
    '$log',
    'constants',
    'safeApply',
    uploader
]);

function uploader($log, constants, safeApply) {

    return {
        restrict: 'EA',
        replace: false,
        transclude: false,
        scope: {
            'settings': '=',
            'uploadhook': '&',
            'queued': '&',
            'beforesend': '&',
            'start': '&',
            'uploadprogress': '&',
            'complete': '&',
            'success': '&',
            'uploaderror': '&',
            'error': '&'
        },
        link: function ($scope, element, attrs) {
            // TODO
            var settings = _getDefaulsSettings($scope.settings),
                $dndArea = settings.dnd && $(settings.dnd);
            // $log.info(tag, 'settings: ', settings);

            if ($scope.uploadhook) {
                WebUploader.Uploader.register({
                    'before-send-file': 'preupload'
                }, {
                    preupload: $scope.uploadhook()
                });
            }

            var uploader = WebUploader.create(settings);
            $scope.$parent.uploader = uploader;
            var uploadHandlers = {
                beforeFileQueued: function (file) {
                    $log.info(tag, "beforeFileQueued: ", file);
                    if ($scope.queued) {
                        $scope.$apply(function () {
                            $scope.queued({file: file});
                        });
                    }
                    return true;
                },

                uploadBeforeSend: function (object, body, headers) {
                    $log.info(tag, "uploadBeforeSend: object: ", object, ", body: ", body, ", headers: ", headers);
                    if ($scope.beforesend) {
                        $scope.$apply(function () {
                            $scope.beforesend({
                                object: object,
                                body: body,
                                headers: headers
                            });
                        });
                    }
                },

                uploadProgress: function (file, percentage) {
                    $log.info(tag, " uploadProgress: file: ", file.name, ", percent: ", percentage);
                    if ($scope.uploadprogress) {
                        $scope.$apply(function () {
                            $scope.uploadprogress({
                                file: file,
                                percent: percentage
                            });
                        });
                    }
                },

                uploadError: function (file, reason) {
                    $log.warn(tag, "uploadError: file: ", file.name, ", reason: ", reason);
                    if ($scope.uploaderror) {
                        $scope.$apply(function () {
                            $scope.uploaderror({
                                file: file,
                                reason: reason
                            });
                        });
                    }
                },

                uploadSuccess: function (file, jsonRes) {
                    log.info(tag, "uploadSuccess: ", file, ", response: ", jsonRes);
                    uploader.removeFile(file);
                    if ($scope.success) {
                        safeApply($scope, function () {
                            $scope.success({
                                file: file,
                                jsonres: jsonRes
                            });
                        });
                    }
                },

                uploadFinished: function () {
                    if ($scope.complete) {
                        safeApply($scope, function () {
                            $scope.complete();
                        });
                    }
                },

                error: function (type) {
                    log.warn(tag, "error: ", type);
                    if ($scope.error) {
                        $scope.$apply(function () {
                            $scope.error({
                                type: type
                            });
                        });
                    }
                }
            };

            _.each(uploadHandlers, function (handler, eventName) {
                uploader.on(eventName, handler);
            });

            $dndArea && _ctrlDnd();

            function _ctrlDnd() {
                if (webhelper.isIE8()) {
                    $dndArea.removeClass("placeholder");
                } else {
                    $dndArea.on("dragenter dragover", function () {
                        $dndArea.addClass("placeholder-hover");
                    }).on("dragleave drop", function () {
                        $dndArea.removeClass("placeholder-hover");
                    });
                }
            }

            /**
             * 设置默认的项
             * @param settingObj
             * @returns {Object}
             * @private
             */
            function _getDefaulsSettings(settingObj) {
                return _.defaults(settingObj, {
                    auto: true,
                    // swf文件路径
                    swf: __uri('../../../../sea-modules/jquery/plugins/webuploader/Uploader.swf'),

                    pick: {
                        id: '#filePicker',
                        label: '添加文件'
                    },
                    // dnd: '#dndArea',
                    // disableGlobalDnd: true,
                    // runtimeOrder: 'flash',
                    fileNumLimit: 200,
                    fileSingleSizeLimit: 1024 * 1024 * 1024,    // 1 G
                    // 文件接收服务端。
                    server: "/upload/single"
                });
            }
        }
    };
}