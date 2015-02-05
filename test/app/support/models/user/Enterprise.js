/**
 * 企业model
 */
var tag = "Enterprise: ";

angular.module("commons.models").service("Enterprise", [
    '$q',
    'AdminRest',
    'cache',
    enterpriseCreator
]);

function enterpriseCreator($q, AdminRest, cache) {

    function Enterprise(attrs) {
        attrs && angular.extend(this, attrs);
    }

    Enterprise.getEnterpriseInfo = function () {
        var delay = $q.defer();

        AdminRest.entInfo.get().then(function (entInfo) {
            delay.resolve(new Enterprise(entInfo));
        }).fail(function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };

    Enterprise.prototype = {

        constructor: Enterprise,

        save: function () {
            var delay = $q.defer();
            var param = _.pick(this, "entId", 'contact', 'phone', 'fax', 'mobile', 'address', "mail", "postcode", "website", "logo", 'txtLogo');
            param.userId = cache.userId;
            AdminRest.entInfo.put(param).then(function (result) {
                delay.resolve(result);
            }).fail(function (error) {
                delay.reject(error);
            });
            return delay.promise;
        }
    };

    return Enterprise;
}