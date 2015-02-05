angular.module("commons.filters").filter("jobTitle", [
    '$translate',
    function ($translate) {
        return function (user) {
            var adminTitle = '';
            if (user.isAdmin())
                adminTitle = $translate("msgSuperAdmin");
            else if (user.isSecAdmin())
                adminTitle = $translate("msgAdmin");
            else
                adminTitle = '';

            return !!user.jobTitle ? user.jobTitle + (adminTitle ? '(' + adminTitle + ")" : '') : adminTitle;
        }
    }
]);