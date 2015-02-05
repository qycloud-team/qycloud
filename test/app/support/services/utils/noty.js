angular.module("commons.services").service("noty", [
    '$translate',
    function ($translate) {
        noty.success = function (a) {
            return noty({
                text: a,
                template: '<div class="noty_message"><i class="icon-custom-noty-success"></i><span class="noty_text"></span></div>',
                type: "success",
                timeout: 3e3,
                maxVisiable: 3
            })
        };
        noty.info = function (a) {
            return noty({text: a, type: "infomation", timeout: 3e3})
        };
        noty.error = function (a, cb) {
            return noty({
                text: a,
                type: "alert",
                modal: !0,
                template: '<div class="noty_header">' + $translate('msgInfoTip') + '<span class="qyc-close-btn">X</span></div><div class="noty_message"><i class="icon-custom-noty-error"></i><span class="noty_text"></span></div>',
                callback: {
                    onClose: function () {
                        cb && cb();
                    }
                },
                buttons: [
                    {
                        addClass: "btn noty-btn-error", text: $translate('msg141'), onClick: function (a) {
                        a.close();
                    }
                    }
                ]
            })
        };
        noty.warn = function (a, b) {
            return noty({
                text: a,
                type: "warning",
                modal: !0,
                template: '<div class="noty_header">' + $translate('msgInfoTip') + '<span class="qyc-close-btn">X</span></div><div class="noty_message"><i class="icon-custom-noty-warn"></i><span class="noty_text"></span></div>',
                buttons: [
                    {
                        addClass: "btn noty-btn-retry", text: $translate('msg199'), onClick: function (a) {
                        a.close(), b && b(!0)
                    }
                    },
                    {
                        addClass: "btn noty-btn-cancel", text: $translate('msg87'), onClick: function (a) {
                        a.close(), b && b(!1)
                    }
                    }
                ]
            })
        };
        noty.confirm = function (a, b) {
            noty({
                text: a,
                type: "confirm",
                modal: !0,
                template: '<div class="noty_header">' + $translate('msgInfoTip') + '<span class="qyc-close-btn">X</span></div><div class="noty_message"><i class="icon-custom-noty-confirm"></i><span class="noty_text"></span></div>',
                buttons: [
                    {
                        addClass: "btn noty-btn-confirm", text: $translate('msg168'), onClick: function (a) {
                        a.close(), b && b(!0)
                    }
                    },
                    {
                        addClass: "btn noty-btn-cancel", text: $translate('msg87'), onClick: function (a) {
                        a.close(), b && b(!1)
                    }
                    }
                ]
            }), $()
        };
        noty.alert = function (a, cb) {
            return noty({
                text: a,
                type: "alert",
                template: '<div class="noty_header">' + $translate('msgInfoTip') + '<span class="qyc-close-btn">X</span></div><div class="noty_message"><i class="icon-custom-noty-alert"></i><span class="noty_text"></span></div>',
                modal: !0,
                callback: {
                    onClose: function () {
                        cb && cb();
                    }
                },
                buttons: [
                    {
                        addClass: "btn noty-btn-alert", text: $translate('msg141'), onClick: function (a) {
                        a.close();
                    }
                    }
                ]
            })
        };
        noty.fail = noty.error;
        return noty;
    }
]);