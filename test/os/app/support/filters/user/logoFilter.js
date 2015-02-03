angular.module("commons.filters").filter("logoFilter", [
    'constants',
    logoFilter
]);

function logoFilter(constants) {
    return function (entlogo) {
        if (!entlogo) {
            return __uri('../../../../assets/img/common/logo.png');
        }

        return _.startsWith(entlogo, "res/") ? entlogo : 'res/' + entlogo;
    }
}