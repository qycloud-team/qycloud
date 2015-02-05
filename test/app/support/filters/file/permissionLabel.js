angular.module("commons.filters").filter("permissionLabel", [
    '$translate',
    function ($translate) {
        return function (permission) {
            if (!permission)
                return "";
            if (permission.hasNone())
                return "";

            var checkedAttrs = permission.checkAttrs();

            switch (checkedAttrs.length) {
                case 1:
                    var key = checkedAttrs[0];
                    switch (key) {
                        case 'read':
                            return $translate('msg421');
                        case 'download':
                            return $translate('msg423');
                        case 'upload':
                            return $translate('msg422');
                        default:
                            return $translate('msg427');
                    }
                case 2:
                    if (_.difference(checkedAttrs, ['read', 'upload']).length === 0)
                        return $translate('msg424');
                    else if (_.difference(checkedAttrs, ['read', 'download']).length === 0)
                        return $translate('msg425');
                    else
                        return $translate('msg427');
                case 3:
                case 4:
                case 5:
                case 6:
                    return $translate('msg427');
                case 7:
                default:
                    return $translate('msg426');
            }
        }
    }
]);