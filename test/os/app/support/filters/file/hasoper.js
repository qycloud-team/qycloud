angular.module("commons.filters").filter("hasoper", function () {
    return  function (operations, specify) {
        return _.indexOf(operations, specify) !== -1;
    }
});