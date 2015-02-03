angular.module("commons.filters").filter("gender", [
    '$translate',
    function ($translate) {
        return function (input) {
            input = input || 'm';
            return input === 'f' ? $translate("msg94") : $translate("msg93");
        }
    }
]);