angular.module("commons.filters").filter("dateTime", [
    'constants',
    dateTime
]);

function dateTime(constants) {
    return function (input, format) {
        return constants.dateStrFromMisc(input, format || 'YYYY-MM-DD HH:mm');
    }
}