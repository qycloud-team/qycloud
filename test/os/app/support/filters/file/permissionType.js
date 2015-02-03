angular.module("commons.filters").filter("permissionType", [
    function () {
        return function (type) {
            if (!type)
                return '';

            switch (type) {
                case 'user':
                    return '用户';
                case 'department':
                    return '部门';
                case 'group':
                    return '角色';
                case 'admin':
                    return '管理员';
            }
        }
    }
]);