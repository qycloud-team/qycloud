angular.module("commons.models").service("LoginBean", function (UserRest, Security) {

    function LoginBean() {
        this.entName = undefined;
        this.account = $.cookie("ua");
        this.password = undefined;   //加密的密码，接口中使用
        this.agent = webhelper.getAgent();
        this.clientId = webhelper.guid();
        this.domainUser = false;
        this.mode = "Quick";
    }

    LoginBean.prototype = {
        signin: function () {
            return seajs.isPrivate ? this.prilogin() : this.publogin();
        },

        prilogin: function () {
            var param = Security.getNonceDTO(this.account, this.password);
            angular.extend(param, {
                agent: this.agent,
                entName: this.entName,
                userName: this.account,
                clientId: this.clientId,
                mode: "Account"
            });

            if (this.account === 'admin' || !this.domainUser) {
                return UserRest.user.logon(param);
            } else {
                param.realPwd = this.password;
                param.mode = 'Ldap';
                return UserRest.user.logon(param);
            }
        },

        publogin: function () {
            var param = Security.getNonceDTO(this.account, this.password);
            angular.extend(param, {
                agent: this.agent,
                entName: this.entName,
                userName: this.account,
                clientId: this.clientId,
                mode: this.entName ? "Account" : "Quick"
            });

            return UserRest.user.logon(param);
        }
    };

    return LoginBean;
});

