angular.module("commons.models").factory("UserLoader", [
    '$q',
    '$translate',
    'AdminRest',
    'User',
    'Dept',
    'UserRest',
    userLoader
]);

function userLoader($q,
                    $translate,
                    AdminRest,
                    User,
                    Dept,
                    UserRest) {
    return {
        getContacts: function () {
            var delay = $q.defer();
            UserRest.contacts.get().then(function (contactList) {
                var contacts = _.map(contactList, function (contact) {
                    return new User(contact);
                });
                delay.resolve(contacts);
            });
            return delay.promise;
        },

        fetchDeptUsers: function (deptId) {
            var delay = $q.defer();

            AdminRest.users.get({
                'deptid': deptId
            }).then(function (result) {
                delay.resolve(result.userList ? _.map(result.userList, function (userJson) {
                    return new User(userJson);
                }) : []);
            });
            return delay.promise;
        },

        searchUsers: function (param) {
            var delay = $q.defer();

            AdminRest.users.get({
                'deptid': param.deptId,
                'key': param.key || param.searchKey,
                'skip': param.skipResults || 0,
                'max': param.maxResults || 30
            }).then(function (result) {
                delay.resolve(result.userList ? _.map(result.userList, function (userJson) {
                    return new User(userJson);
                }) : []);
            });
            return delay.promise;
        },

        fetchDeptAndUsers: function () {
            var delay = $q.defer();

            UserRest.users.get().then(function (result) {
                var userList = _.map(result.users, function (user) {
                    return new User(user);
                });
                var deptList = _.map(result.departments, function (department) {
                    return new Dept(department);
                });
                deptList.sort(Dept.sortFn);
                delay.resolve({
                    deptList: deptList,
                    userList: userList
                });
            }).fail(function (err) {
                noty.alert($translate('msgServerError'));
                delay.reject(err);
            });

            return delay.promise;
        }
    }
}
