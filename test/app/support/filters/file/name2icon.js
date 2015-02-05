angular.module("commons.filters").filter("name2icon", [
    'constants',
    '$filter',
    name2icon
]);

function name2icon(constants, $filter) {
    return function (filename) {
        if (_.include(filename, '.') === false) {
            return 'file-folder';
        }
        var fileType = constants.getFileSuffix(filename);
        return $filter("type2icon")(fileType);
    }
}