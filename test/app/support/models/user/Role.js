/**
 * 角色管理models
 */
angular.module("commons.models").service('Role', [
    '$q',
    'AdminRest',
    Role
]);

function Role($q, AdminRest) {

    function Role(attrs) {
        this.roleId = undefined;
        this.name = undefined;
        this.permissions = [];
        this.userIds = [];
        attrs && angular.extend(this, attrs);
    }

    Role.prototype = {

        rename: function () {
            return AdminRest.role.put({
                roleId: this.roleId,
                name: this.newName
            });
        },

        deleteRoles: function (roleIds) {
            return AdminRest.roles.remove({
                roleIds: roleIds
            });
        },

        createRole: function () {
            return AdminRest.roles.post({
                name: this.name,
                permissions: this.permissions,
                userIds: this.userIds
            });
        },

        updateAttrs: function (selectUsers, selectFolders) {
            this.permissions = _.map(selectFolders, function (folder) {
                return {
                    folderId: folder.fileId,
                    permission: folder.permission
                }
            });
            this.userIds = _.pluck(selectUsers, 'userId');
        },

        updateRole: function () {
            return AdminRest.role.put({
                roleId: this.roleId,
                name: this.name,
                permissions: this.permissions,
                userIds: this.userIds
            });
        },

        fetchRoleDetail: function (roleId) {
            return AdminRest.role.get({
                roleid: roleId
            });
        }
    };
    return Role;
}

angular.module("commons.models").factory('RoleLoader', [
    '$q',
    'Role',
    'AdminRest',
    RoleLoader
]);

function RoleLoader($q, Role, AdminRest) {
    return {
        getRoles: function () {
            var delay = $q.defer();
            AdminRest.roles.get().then(function (roleResults) {
                var result = _.map(roleResults, function (role) {
                    return new Role(role);
                });
                delay.resolve(result);
            });
            return delay.promise;
        }
    }
}











