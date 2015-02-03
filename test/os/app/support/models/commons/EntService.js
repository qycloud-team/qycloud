angular.module("commons.models").service("EntService", [
    EntServiceCreator
]);

function EntServiceCreator() {
    function EntService(attrs) {
        this.serviceType = undefined;
        this.total = undefined;
        this.available = undefined;
        this.used = undefined;
        this.endDate = undefined;
        this.totalEntFileSize = undefined;
        this.totalPersonalFileSize = undefined;
        this.totalRecycleFileSize = undefined;
        attrs && angular.extend(this, attrs);
    }

    EntService.prototype = {};

    return EntService;
}

angular.module("commons.models").factory("EntServiceLoader", [
    '$q',
    'AdminRest',
    'EntService',
    EntServiceLoader
]);

function EntServiceLoader($q, AdminRest, EntService) {
    return {
        getCurrentService: function () {
            var delay = $q.defer();
            AdminRest.serviceInfo.get().then(function (services) {
                delay.resolve(_.map(services, function (service) {
                    return new EntService(service);
                }));
            });
            return delay.promise;
        }
    }
}