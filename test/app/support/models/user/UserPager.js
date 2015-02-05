var tag = "UserPager: ";

angular.module("commons.models").service("UserPager", [
    '$q',
    'AdminRest',
    'BasePager',
    'User',
    userPagerService
]);

function userPagerService($q,
                          AdminRest,
                          BasePager,
                          User) {

    function UserPager() {
        this.searchKey = null;
        this.deptId = null;
        this.users = [];
    }

    UserPager.prototype = new BasePager();

    UserPager.prototype.fetchPage = function (param) {
        var self = this,
            delay = $q.defer(),
            param = param || {};

        AdminRest.users.get({
            'deptid': this.deptId,
            'key': this.searchKey,
            'skip': (this.current - 1) * this.perPage,
            'max': this.perPage
        }).then(function (result) {
            self.users = result.userList ? _.map(result.userList, function (userJson) {
                return new User(userJson);
            }) : [];
            self.total = result.resultCount;
            delay.resolve(self.users);
        });
        return delay.promise;
    };

    return UserPager;
}



