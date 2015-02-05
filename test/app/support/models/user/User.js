var tag = "User::";
/**
 *  用户数据模型
 */
angular.module("commons.models").service("User", [
    '$q',
    '$filter',
    'UserRest',
    'constants',
    'AdminRest',
    'Security',
    userCreator
]);

function userCreator($q,
                     $filter,
                     UserRest,
                     constants,
                     AdminRest,
                     Security) {

    function User(attrs) {
        this.deptId = undefined;
        this.deptName = undefined;
        this.userId = undefined;
        this.signature = undefined;
        this.icon = undefined;
        this.realName = undefined;
        this.gender = undefined;
        this.birthday = undefined;
        this.age = undefined;
        this.hobby = undefined;
        this.jobTitle = undefined;
        this.city = undefined;
        this.major = undefined;
        this.mail = undefined;
        this.phone = undefined;
        this.mobile = undefined;
        this.agent = undefined;
        this.devices = undefined;
        attrs && angular.extend(this, attrs);
        if (this.birthday) {
            this.birthday = $filter("dateTime")(this.birthday, "YYYY-MM-DD");
        }
        if (!this.deptId) {
            this.deptId = -1;
            this.deptName = '未分组联系人';
        }
    }

    User.getLoginUser = function () {
        var delay = $q.defer();

        UserRest.currentUserInfo.get().then(function (userInfo) {
            delay.resolve(new User(userInfo));
        }).fail(function (err) {
            delay.reject(err);
        });

        return delay.promise;
    };

    User.prototype = {
        constructor: User,

        isAdmin: function () {
            return this.userType === constants.UserType.Administrator;
        },

        isSecAdmin: function () {
            return this.userType === constants.UserType.SecondAdministrator;
        },

        displayName: function () {
            return this.realName || this.userName;
        },

        /**
         * 管理员修改用户信息
         */
        updateByAdmin: function () {
            var param = {};
            if (this.pwd) {
                param = Security.getNonceDTO(this.userId, this.pwd);
            }
            angular.extend(param, {
                userId: this.userId,
                account: this.account,
                empNum: this.empNum,
                jobTitle: this.jobTitle,
                phone: this.phone
            });
            return AdminRest.user.put(param);
        },

        /**
         * 更改用户信息
         */
        updateUserInfo: function () {
            var param = {
                signature: this.signature,
                realName: this.realName,
                gender: this.gender,
                phone: this.phone,
                mobile: this.mobile
            };
            if (this.birthday) {
                param.birthday = constants.getMillSec(this.birthday, "YYYY-MM-DD");
            }
            if (this.mail && this.userName !== this.mail) {
                param.mail = this.mail;
            }
            if (this.mobile && this.userName !== this.mobile) {
                param.mobile = this.mobile;
            }

            return UserRest.currentUserInfo.post(param);
        },

        getUserDevices: function () {
            var self = this;
            this.devices = [];
            UserRest.user.getUserDevices().then(function (devices) {
                _.each(devices, function (device) {
                    if (device.onlineStatus === 'online') {
                        self.devices.push(device.agent);
                    }
                });
            });
        },

        deleteContact: function () {
            return UserRest.contact.remove({
                userid: this.userId
            });
        },

        addContact: function () {
            return UserRest.contact.post(null, {
                query: {
                    userid: this.userId
                }
            });
        },

        contains: function (searchKey) {
            if (this.userName.indexOf(searchKey) !== -1)
                return true;
            if (this.realName && this.realName.indexOf(searchKey) !== -1)
                return true;
            return false;
        },

        logout: function () {
            return UserRest.user.logout();
        },

        getDisplayName: function () {
            return $filter('displayName')(this);
        },

        changeUserStatus: function (changeStatus) {
            var self = this;
            UserRest.status.post({
                userId: cache.userId,
                entId: cache.entId,
                status: changeStatus,
                agent: webhelper.getAgent()
            }).then(function () {
                angular.extend(self, {
                    onlineStatus: changeStatus,
                    prevOnlineStatus: changeStatus
                });
            });
        },

        isOffline: function () {
            return _.contains(["offline", "leave"], this.onlineStatus);
        }
    };

    User.getAllDeptUsers = function (deptIds, userList) {
        return _.filter(userList, function (user) {
            return _.contains(deptIds, user.deptId);
        });
    };

    User.getOnlineUsers = function (userList) {
        return _.filter(userList, function (user) {
            return _.contains(['online', 'busy'], user.onlineStatus);
        });
    };

    return User;
}

