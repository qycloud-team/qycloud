angular.module("commons.filters").filter("displayName2", function displayName() {
    return function (user) {
        if (user.name) {
            return user.name;
        }
        if (user.targetName)
            return user.targetName;
        else {
            if (!user)
                return '';
            if (!user.realName)
                return user.userName || '';
            return user.userName ? user.realName + "(" + user.userName + ")" : user.realName;
        }
    }
});

