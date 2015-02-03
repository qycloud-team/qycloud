angular.module("commons.filters").filter("byte2mb", function () {
    return function (size) {
        if (size === 0)
            return 0;
        if (size >= 1024) {
            size = size / 1024;
        }
        if (size >= 1024) {
            size = size / 1024;
        }
        return size;
    }
});