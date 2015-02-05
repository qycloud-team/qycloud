/**
 * Created by Administrator on 2014-09-22.
 */
seajs.devMode = location.href.indexOf("?dev") !== -1 ? true : false;
seajs.isPrivate = seajs.data.isPrivate;

angular.module("commons.services", []);
angular.module("commons.filters", []);
angular.module("commons.directives", []);
angular.module("commons.models", []);

require(__uri('./services/index.js'));
require(__uri('./filters/index.js'));
require(__uri('./directives/index.js'));
require(__uri('./models/index.js'));

var messageTranslate = require(__uri('./services/utils/message.js'));

angular.module("commons.services").config(['$httpProvider', function ($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}]);


angular.module("commons.services").config(['$translateProvider', function ($translateProvider) {
    messageTranslate($translateProvider);
    $translateProvider.uses('zh_CN');
}]);

