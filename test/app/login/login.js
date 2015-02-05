var tag = "[LoginCtrl]-";

angular.module("login").controller("LoginCtrl",
    function loginCtrl($scope, $log, $translate, constants, LoginBean) {

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
                    var from = webhelper.getUrlEncodedKey("from") || '';
                    if (location.host === 'app.oatos.com' && result.vip) {
                        location.assign('http://vip.oatos.com/auth-oatos?' + $.param({
                            ut: result.token,
                            v: result.vip ? 1 : 0,
                            ci: $scope.loginBean.clientId,
                            from: from
                        }));
                    } else {
                        $log.debug('login result:', result);
                        setLoginTokens(result.token);
                        if (!from) {
                            location.assign(constants.getWebsiteUrl());
                            return true;
                        }

                        switch (from) {
                            case 'admin':
                                location.assign(constants.getAdminUrl());
                                break;
                            case 'buy':
                                location.assign(constants.getBuyUrl());
                                break;
                            case '2015':
                                location.assign(constants.getPromoteUrl());
                                break;
                            case 'meeting':
                                location.assign(constants.getMeetingUrl());
                                break;
                        }
                    }
                }).fail(function (result) {
                    updateFormError(result);
                    $scope.commit = false;
                    $scope.loginBtnText = $translate('msg1');
                });
            return false;
        };

        $scope.onSwitchLang = function (lang) {
            $translate.uses(lang);
            $scope.$parent.lang = lang;
            constants.setCookie("lang", lang);
            $("body").removeClass("zh_CN zh_TW en_US").addClass(lang);
        };

        $scope.onSwitchLogin = function () {
            if ($scope.loginBean.mode === 'Quick') {
                $scope.loginBean.mode = "Account";
                $scope.switchLoginTxt = 'msgNewLogin';
            } else {
                $scope.loginBean.mode = "Quick";
                $scope.switchLoginTxt = 'msgOldLogin';
            }
        };

        $scope.errorMap = {
            "errorWrongPWD": "登录密码输入有误!",
            "errorWrongAccount": $translate('msgAccountErr'),
            "errorUserLocked": "无法登录！帐号被锁定，请联系管理员解锁后正常使用!",
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
            if (latest || old) checkForm();
        }

        function checkForm() {
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

        $("body").removeClass("zh_CN zh_TW en_US").addClass($scope.lang);

        function updateFormError(errorKey) {
            var error = $scope.errorMap[errorKey];
            if (error) {
                $scope.formError = error;
            }
        }
    }
);
