var tag = "directives/uploader => ";

angular.module("commons.directives").directive("qyUploader", [
    '$log',
    '$rootScope',
    'constants',
    uploader
]);

function uploader($log, $rootScope, constants) {

    return {
        restrict: 'EA',
        replace: false,
        transclude: false,
        scope: {
            'settings': '=',
            'uploadloaded': '&',
            'dialogstart': '&',
            'queued': '&',
            'queueerror': '&',
            'dialogcomplete': '&',
            'start': '&',
            'uploadprogress': '&',
            'complete': '&',
            'success': '&',
            'error': '&'
        },
        link: function (scope, element, attrs) {
            var settings = _getDefaulsSettings(scope.settings);
            $log.debug('settings: ', settings);

            var swfupload = _initUploader(settings);
            _addListeners(swfupload);

            function _addListeners(swfupload) {
                var listeners = {
                    swfuploadLoaded: function (event) {
                        if (scope.uploadloaded) {
                            scope.$apply(function () {
                                scope.uploadloaded({event: event, swfupload: swfupload});
                            });
                        }
                    },

                    fileDialogStart: function (event) {
                        if (scope.dialogstart) {
                            scope.$apply(function () {
                                scope.dialogstart({event: event});
                            });
                        }
                    },

                    fileQueued: function (event, file) {
                        if (scope.queued) {
                            scope.$apply(function () {
                                scope.queued({
                                    event: event,
                                    file: file,
                                    swfupload: swfupload
                                });
                            })
                        }
                    },

                    fileQueueError: function (event, file, errorCode, message) {
                        $log.error('File queue error', message, ", errorCode: ", errorCode);
                        if (scope.queueerror) {
                            scope.$apply(function () {
                                scope.queueerror({event: event, file: file, code: errorCode});
                            });
                        }
                    },

                    fileDialogComplete: function (event, numFilesSelected, numFilesQueued) {
                        if (scope.dialogcomplete) {
                            scope.$apply(function () {
                                scope.dialogcomplete({
                                    event: event,
                                    selectedNum: numFilesSelected,
                                    queuedNum: numFilesQueued
                                });
                            });
                        }
                    },

                    uploadStart: function (event, file) {
                        if (scope.start) {
                            scope.$apply(function () {
                                scope.start({event: event, file: file, swfupload: swfupload});
                            });
                        }
                    },

                    uploadProgress: function (event, file, complete) {
                        if (scope.uploadprogress) {
                            scope.$apply(function () {
                                scope.uploadprogress({event: event, file: file, complete: complete});
                            });
                        }
                    },

                    uploadSuccess: function (event, file, result) {
                        if (scope.success) {
                            scope.$apply(function () {
                                scope.success({event: event, file: file, result: result});
                            });
                        }
                    },

                    uploadComplete: function (event, file) {
                        if (scope.complete) {
                            scope.$apply(function () {
                                scope.complete({event: event, file: file});
                            });
                        }
                    },

                    uploadError: function (event, file, errorCode, message) {
                        $log.warn(tag, "uploadError> file: ", file, ", errorCode: ", errorCode, ",message: ", message);
                        if (scope.error) {
                            scope.$apply(function () {
                                scope.error({event: event, file: file, code: errorCode});
                            });
                        }
                    }
                };

                $.each(listeners, function (event, listener) {
                    element.bind(event, listener);
                });
            }

            function _initUploader(settingObj) {

                element.swfupload({
                    upload_url: settingObj.uploadUrl,
                    use_query_string: false,
                    file_post_name: "file", // 对应controller中的参数
                    file_types: settingObj.fileTypes,
                    file_types_description: "All Files",
                    // file_upload_limit: constants.uploadFileSizeLimit,
                    file_size_limit: "500 MB",
                    flash_url: __uri("../../../../sea-modules/swf/swfupload/swfupload.swf"),
                    button_image_url: settingObj.btnImg,
                    button_width: settingObj.btnWith,
                    button_height: settingObj.btnHeight,
                    button_placeholder: element.find(settingObj.placeholder)[0],
                    button_text: settingObj.btnText,
                    button_text_style: settingObj.btnTextStyle,
                    button_text_left_padding: 8,
                    button_text_top_padding: 4,
                    debug: false,
                    custom_settings: {something: "here"},
                    button_window_mode: 'transparent'
                });

                return element.data('__swfu');
            }

            /**
             * 设置默认的项
             * @param settingObj
             * @returns {Object}
             * @private
             */
            function _getDefaulsSettings(settingObj) {
                return _.defaults(settingObj, {
                    placeholder: null, // placeholder元素选择器
                    btnImg: '',
                    btnWith: 65,
                    btnHeight: 27,
                    btnText: '',
                    btnTextStyle: '',
                    fileTypes: '*.*'
                });
            }
        }
    };
}