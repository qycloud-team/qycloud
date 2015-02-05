angular.module("commons.services").factory("UserRest", [
    'RestHelper',
    UserRest
]);

function UserRest(RestHelper) {
    return RestHelper.publish({

        serviceStatus: {
            uri: "/pub/modulestatus",
            get: true
        },

        /**校验验证码,发送验证码*/
        validationCode: {
            uri: "/pub/validation",
            get: true,
            post: true
        },

        /**企业完成注册*/
        register: {
            uri: "/pub/ent/register",
            post: true
        },

        entInfo: {
            uri: "/sc/entinfo",
            get: true
        },

        currentUserInfo: {
            uri: "/sc/user/current",
            get: true,
            post: true
        },

        user: {
            uri: "/sc/user",
            get: true,

            logon: ["post", "/pub/user/logon"],

            relogon: ["post", "/pub/user/relogon"],

            logout: ["post", "/sc/user/logout"],

            bind: ["post", "/sc/user/binding"],

            resetPwd: ["post", "/pub/user/resetpwd"],

            getColleagueStatus: ["get", "/sc/user/status"],

            updateStatus: ["post", "/sc/user/status"],

            getAdminInfo: ["get", "/sc/user/admin"],

            changePwd: ["post", "/sc/user/password"],

            checkPwd: ["post", "/sc/user/checkpwd"],

            checkToken: ["post", "/sc/user/checktoken"],

            getUserDevices: ['get', '/sc/user/devices']
        },

        users: {
            uri: "/sc/users",
            get: true
        },

        contacts: {
            uri: "/sc/user/contacts",
            get: true,
            post: true,

            remove: ["post", "/sc/user/contacts/delete"]
        },

        contact: {
            uri: "/sc/user/contact",
            post: true,
            remove: true
        },

        messages: {
            getUnread: ["get", "/sc/msg/unread"],

            confirm: ["post", "/sc/msg/unread"]
        },

        chat: {
            uri: "/sc/chat",
            get: true,

            chatHistory: ["get", "/sc/chat/history"]
        },

        /**取系统消息历史*/
        sysmsg: {
            uri: "/sc/sysmsg",
            get: true
        },

        mail: {
            uri: "/sc/mail",
            post: true
        },

        /**问题反馈*/
        feedBack: {
            uri: "/pub/feed",
            post: true
        },

        /**取缓存的内容,将内容放入缓存,更新缓存的内容,删除缓存的内容*/
        memc: {
            uri: "/memc",
            get: true,
            post: true,
            put: true,
            remove: true
        }
    })
}