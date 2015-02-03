var tag = 'shareLinkDirect';
angular.module("commons.directives").directive("shareLink", [
    '$log',
    '$translate',
    '$filter',
    'modal',
    'constants',
    'EntLink',
    'noty',
    shareLink
]);

function shareLink($log,
                   $translate,
                   $filter,
                   modal,
                   constants,
                   EntLink,
                   noty) {
    return {
        restrict: "EA",
        replace: true,
        transclude: false,
        template: __inline("../../templates/share/ShareLink.html"),
        scope: {
            param: '='
        },

        link: function (scope, elem, attrs) {
            scope.directiveName = 'shareLink';

            scope.modal = modal;
            scope.upload = true;
            scope.sendInfo = '';
            scope.constants = constants;

            scope.$watch("modal.shareLink", function (latest, oldValue) {
                if (latest && scope.param.file) {
                    scope.file = scope.param.file;
                    scope.entLink = new EntLink({
                        fileId: scope.file.fileId
                    });
                    scope.tab = 'copy';
                    scope.entLink.receivers = [''];
                    scope.addReceivers = [];
                    if (scope.file.linkDTO) {
                        angular.extend(scope.entLink, scope.file.linkDTO);
                        scope.entLink.href = constants.getShareUrl(scope.entLink.linkCode);
                    } else {
                        scope.entLink.save().then(function () {
                            scope.file.reload();
                        });
                    }
                }
            });

            scope.$watch('entLink.expirationTime', function (newTime) {
                if (newTime) {
                    scope.entLink.expireDate = $filter('dateTime')(newTime, 'YYYY-MM-DD');
                } else {
                    if(scope.entLink) scope.entLink.expireDate = '';
                }
            });

            //设置密码
            scope.updatePwd = function () {
                scope.entLink.password = constants.generateLinkPwd();
                scope.entLink.updateLink().then(function(){
                    scope.file.reload();
                })
            };

            //取消密码设置
            scope.cancelSetPwd = function () {
                scope.entLink.password = undefined;
                scope.entLink.updateLink().then(function(){
                    scope.file.reload();
                })
            };

            //设置到期时间
            scope.updateExpiredTime = function (expireDate) {
                scope.entLink.expirationTime = (moment(expireDate + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss').toDate().getTime() + "");
                scope.entLink.updateLink().then(function(){
                    scope.file.reload();
                })
            };

            //取消设置到期时间
            scope.cancelSetTime = function () {
                scope.entLink.expirationTime = undefined;
                scope.entLink.updateLink().then(function(){
                    scope.file.reload();
                })
            };

            //选择分享类型
            scope.updateType = function () {
                scope.$watch("entLink.type", function (newValue, oldValue) {
                    isType(newValue);
                });
            };

            //isHttps
            scope.updateHttps = function () {
                scope.entLink.https = !scope.entLink.https;
                if (scope.entLink.https === true) {
                    scope.entLink.updateLink().then(function(){
                        scope.file.reload();
                    })
                    scope.entLink.href = constants.getShareUrl(scope.entLink.linkCode, scope.entLink.https);
                } else {
                    scope.entLink.updateLink().then(function (result) {
                        scope.file.reload();
                        scope.entLink.href = constants.getShareUrl(result.linkCode);
                    });
                }
            };

            //取消分享
            scope.deleteLink = function () {
                noty.confirm("取消分享将会使该文件的分享链接失效，" +
                "<br>不能访问。您确定要取消分享吗?", function (confirmed) {
                    if (!confirmed)
                        return false;
                    scope.entLink.deleteLink().then(function (result) {
                        if (constants.isResOK(result)) {
                            scope.file.reload();
                            scope.modal.shareLink = false;
                            noty.success("取消分享成功!");
                        } else {
                            scope.modal.shareLink = false;
                            noty.error("取消分享失败!");
                        }
                    })
                })
            };

            addCopeFlash();
            function addCopeFlash() {
                swfobject.embedSWF("/os/swf/clipboard.swf", "createCopyFlash", '155px', '40px', '11.1.0', 'expressInstall.swf', {
                    id: "createCopyFlash"
                }, {
                    wmode: "transparent"
                }, {});
            };

            //发送链接
            scope.sendLink = function () {
                scope.entLink.sendLink({
                    receivers: scope.addReceivers
                }).then(function (result) {
                    $log.debug(tag, "-----sendLink:", result);
                    noty.success($translate('msgSendSuccess'));
                })
            };

            scope.addReceiver = function ($index) {
                var receiver = scope.entLink.receivers[$index];
                if (!receiver) {
                    scope.sendForm.receiver.$error.required = true;
                } else if (!constants.pattern.emailOrMobile.test(receiver)) {
                    scope.userForm.receiver.$error.pattern = true;
                } else {
                    scope.addReceivers.push(receiver);
                    scope.entLink.receivers.splice($index, 1);
                    if (scope.entLink.receivers.length === 0)
                        scope.entLink.receivers.push('');
                }
                $log.debug('addReceivers:', scope.addReceivers);
            };

            function isType(newValue) {
                switch (newValue) {
                    case "Upload" :
                        scope.entLink.password = undefined;
                        scope.entLink.expirationTime = undefined;
                        scope.upload = false;
                        scope.entLink.updateLink();
                        break;
                    case "Preview":
                    case "Download":
                        scope.upload = true;
                        scope.entLink.updateLink();
                        break;
                }
            }
        }
    }
}
