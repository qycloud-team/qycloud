angular.module("commons.models").factory("LoginDataLoader", [
    '$rootScope',
    '$q',
    'cache',
    'User',
    'Enterprise',
    loginDataLoader
]);

function loginDataLoader($rootScope,
                         $q,
                         cache,
                         User,
                         Enterprise) {
    return function () {
        if ($rootScope.currentUser) {
            return $q.when({
                currentUser: $rootScope.currentUser,
                currentEnt: $rootScope.currentEnt
            });
        } else {
            var delay = $q.defer();
            $q.all([
                User.getLoginUser(),
                Enterprise.getEnterpriseInfo()
            ]).then(function (results) {
                log.debug("LoginDataLoader OK!");
                $rootScope.currentUser = results[0];
                $rootScope.currentEnt = results[1];

                angular.extend(cache, {
                    entId: $rootScope.currentEnt.entId,
                    userId: $rootScope.currentUser.userId,
                    displayName: $rootScope.currentUser.getDisplayName()
                });

                delay.resolve({
                    currentUser: results[0],
                    currentEnt: results[1]
                });
            }).fail(function () {
                delay.reject("Fetch user or ent info fail!");
            });
            return delay.promise;
        }
    }
}