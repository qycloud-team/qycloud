angular.module("commons.filters").filter("validPermissions", function () {
    return function (items) {
        return _.filter(items, function (item) {
            if (item.hasNone) {
                return !item.hasNone();
            } else {
                return !item.permission.hasNone();
            }
        });
    }
});