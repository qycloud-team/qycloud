angular.module("commons.filters").filter("ratioFilter", function () {
    return function (input) {
        return input === 1 ? '无折扣' : input * 10 + "折";
    }
});