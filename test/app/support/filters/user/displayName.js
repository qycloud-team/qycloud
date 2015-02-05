angular.module("commons.filters").filter("displayName", function displayName() {
    return function (user) {
        if (!user)
            return '';
        return user.realName || user.userName;
    }
});

