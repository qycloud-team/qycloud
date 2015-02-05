angular.module("commons.filters").filter("adminName", [
    '$translate',
    adminName
]);

function adminName($translate) {
    return function (input) {
        if (!input)
            return input;
        return input === 'Admin' ? $translate("msgSuperAdmin") : input;
    }
}