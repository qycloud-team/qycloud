var tag = "loginBox::";
angular.module("commons.directives").directive("loginBox", [
    loginBox
]);

function loginBox() {

    function loginBoxCtrl($scope,
                          $log,
                          $translate,
                          constants,
                          LoginBean) {
        $scope.loginBean = new LoginBean();
        $scope.login = false;
        $scope.formError = "";
        $scope.lang = webhelper.getLang();
        $scope.switchLoginTxt = 'msgOldLogin';
        $scope.loginBtnText = $translate('msg1');

        $scope.onUserLogin = function () {
            if ($scope.formError && !_.startsWith($scope.formError, "error")) {
                return false;
            }
            $scope.commit = true;
            $scope.loginBtnText = "登录中...";
            $scope.loginBean.signin()
                .then(function (result) {
                    setLoginTokens(result.token || result);
                    if ($scope.loginsucc) {
                        $scope.loginsucc({
                            token: result.token || result
                        });
                    }
                    $scope.toggleby = false;
                }).fail(function (result) {
                $log.error(tag, "login result: ", result);
                updateFormError(result);
                $scope.commit = false;
                $scope.loginBtnText = $translate('msg1');
            });
            return false;
        };

        $scope.errorMap = {
            "errorWrongPWD": "密码错误",
            "errorWrongAccount": "账号不存在",
            "errorUserLocked": "用户被锁定，禁止登陆",
            "error500": "登录失败! 请稍后重试",
            "entNameRequire": "企业名称不能为空",
            "accountRequire": "账号不能为空",
            "passwordRequire": "密码不能为空",
            "errorAuditFail": $translate('msgServiceExpire'),
            "errorUserNotActive": $translate('msgAccountNotActive'),
            "errorUserDeleted": $translate('msgAccountDeleted'),
            "errorNotAuthed": $translate('msgUnAuthErr'),
            "errorExpirationTimeOver": $translate('msgActiveUserErr')
        };

        $scope.$watch("loginBean.entName", watchCallback);
        $scope.$watch("loginBean.account", watchCallback);
        $scope.$watch("loginBean.password", watchCallback);

        function watchCallback(latest, old) {
            //$log.debug('watch property: latest: ', latest, ", old: ", old);
            if (latest || old) checkForm();
        }

        function checkForm() {
            //$log.debug(tag, "checkForm()");
            if ($scope.loginBean.mode !== "Quick"
                && $scope.loginForm.entName.$error.required) {
                updateFormError("entNameRequire");
            } else if (!$scope.loginBean.account && $scope.loginForm.account.$error.required) {
                updateFormError("accountRequire");
            } else if ($scope.loginForm.password.$error.required) {
                updateFormError("passwordRequire");
            } else {
                $scope.formError = "";
            }
        }

        function setLoginTokens(token) {
            constants.setUserLoginCookies(
                $scope.loginBean.mode === 'Quick',
                $scope.loginBean.entName,
                $scope.loginBean.account,
                $scope.loginBean.clientId,
                token
            );
        }

        function updateFormError(errorKey) {
            var error = $scope.errorMap[errorKey];
            if (error) {
                $scope.formError = error;
            }
        }
    }

    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        template: __inline("../../templates/user/loginBox.html"),
        scope: {
            'loginsucc': '&',
            'toggleby': '='
        },
        controller: [
            '$scope',
            '$log',
            '$translate',
            'constants',
            'LoginBean',
            loginBoxCtrl
        ],
        link: function (scope, $elem, $attrs) {

        }
    }
}