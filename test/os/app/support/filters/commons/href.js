angular.module("commons.filters").filter("href", function () {
    return function (input) {
        return input ? '#!/' + input : '#!';
    }
});