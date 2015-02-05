angular.module("commons.filters").filter("userNameFilter", function () {
    return function (users, key) {
        if (!users) {
            return [];
        } else if (!key) {
            return users;
        } else {
            return _.filter(users, function (user) {
                return user.contains(key);
            });
        }
    }
});