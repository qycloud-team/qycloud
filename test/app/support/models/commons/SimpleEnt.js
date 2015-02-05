/**
 * 企业model
 */
var tag = "SimpleEnt: ";

angular.module("commons.models").service("SimpleEnt", [
    '$q',
    'UserRest',
    simpleEntService
]);

function simpleEntService($q, UserRest) {

    return function () {
        var delay = $q.defer();

        UserRest.entInfo.get().then(function (entInfo) {
            delay.resolve(entInfo);
        }).fail(function (error) {
            log.debug(tag, "getEnterpriseInfo: ", error);
            delay.reject(error);
        });
        return delay.promise;
    }
}