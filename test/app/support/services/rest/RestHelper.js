var tag = "RestHelper::";

angular.module("commons.services").factory("RestHelper", [
    '$http',
    '$log',
    '$q',
    'cache',
    RestHelper
]);

function RestHelper($http, $log, $q, cache) {

    var APP_JSON_CONTENT_TYPE = "application/json;charset=utf-8",
        TEXT_PLAIN_CONTENT_TYPE = "text/plain; charset=UTF-8";

    var basehttp = location.protocol + "//" + location.host,
        nodeUrl = basehttp + "/os/node",
        javaUrl = basehttp + "/os/java";

    function ajaxAsync(method, uri, data, options) {
        var delay = $q.defer();
        $http(param(method, uri, data, options))
            .success(_success(uri, method, data, delay))
            .error(_error(uri, method, data, delay));
        return delay.promise;
    }

    function param(method, uri, data, options) {
        var isNodeUrl = _.include(uri, '/os/node');
        var url = uri;
        if (_.startsWith(uri, basehttp)) {
            url = uri;
        } else if (isNodeUrl) {
            url = basehttp + uri;
        } else {
            url = javaUrl + uri;
        }
        if (method === 'GET' || method === 'DELETE') {
            url += (data ? "?" + $.param(data) : "");
        }
        if (options && options.query) {
            url += ("?" + $.param(options.query));
        }

        return angular.extend({
            url: url,
            method: method,
            headers: {
                'UT': cache.token || '',
                'Content-Type': isNodeUrl ? APP_JSON_CONTENT_TYPE : TEXT_PLAIN_CONTENT_TYPE,
                'Accept': isNodeUrl ? APP_JSON_CONTENT_TYPE : TEXT_PLAIN_CONTENT_TYPE
            },
            timeout: 60000,
            data: !!data ? (isNodeUrl ? data : {data: data}) : {}
        }, options || {});
    }

    function _error(serviceType, method, data, delay) {
        return function (resp, status, headers, config) {
            errorLog(method, serviceType, resp, data);
            delay.reject("error500");
        }
    }

    function _success(serviceType, method, data, delay) {
        return function (resp, status, headerFn, config) {
            if (_.startsWith(resp, "error")) {
                errorLog(method, serviceType, resp, data);
                delay.reject(resp);
            } else if (_.startsWith(resp.statusCode, "error")) {
                errorLog(method, serviceType, resp, data);
                delay.reject(resp.statusCode);
            } else if ("OK" === resp.statusCode) {
                infoLog(method, serviceType, resp, data);
                delay.resolve(resp.data || resp.statusCode);
            } else if (_.isString(resp)) {
                infoLog(method, serviceType, resp, data);
                delay.resolve(resp.data || resp.statusCode);
            } else {
                infoLog(method, serviceType, resp, data);
                delay.resolve(resp);
            }
        }
    }

    function errorLog(method, serviceType, resp, data) {
        $log.warn(_.sprintf("[ERR]-[REST]-[%s: %s]-[resp]-[%s], [param]: %s", method, serviceType,
            JSON.stringify(resp), JSON.stringify(data)));
    }

    function infoLog(method, serviceType, resp, data) {
        $log.info(_.sprintf("[OK]-[REST]-[%s: %s]-[resp]: %s, [param]: %s ", method, serviceType,
            '...', JSON.stringify(data)));
    }

    function get(uri, data, options) {
        return ajaxAsync('GET', uri, data, options);
    }

    function post(uri, data, options) {
        return ajaxAsync('POST', uri, data, options);
    }

    function put(uri, data, options) {
        return ajaxAsync('PUT', uri, data, options);
    }

    function remove(uri, data, options) {
        return ajaxAsync('DELETE', uri, data, options);
    }

    function _handleArrayConfig(arrayConfig) {
        var method = arrayConfig[0].toLowerCase(),
            _uri = arrayConfig[1];

        switch (method) {
            case 'get':
                return _.partial(get, _uri);
            case 'post':
                return _.partial(post, _uri);
            case 'put':
                return _.partial(put, _uri);
            case 'remove':
                return _.partial(remove, _uri);
        }
    }

    return {
        nodeUrl: nodeUrl,
        get: get,
        post: post,
        put: put,
        remove: remove,

        publish: function (services) {
            var self = this,
                publish = {},
                baseurl = services.baseurl || '',
                uri = null;

            _.each(services, function (serviceConfig, serviceName) {
                publish[serviceName] = {};
                _.each(serviceConfig, function (val, key) {
                    uri = baseurl + serviceConfig['uri'];
                    switch (key) {
                        case 'get':
                            publish[serviceName]['get'] = _.isFunction(val) ? val
                                : _.partial(get, uri);
                            break;
                        case 'post':
                            publish[serviceName]['post'] = _.isFunction(val) ? val
                                : _.partial(post, uri);
                            break;
                        case 'put':
                            publish[serviceName]['put'] = _.isFunction(val) ? val
                                : _.partial(put, uri);
                            break;
                        case 'remove':
                            publish[serviceName]['remove'] = _.isFunction(val) ? val
                                : _.partial(remove, uri);
                            break;
                        default:
                            if (_.isFunction(serviceConfig[key])) {
                                publish[serviceName][key] = serviceConfig[key];
                            } else if (_.isArray(serviceConfig[key])) {
                                publish[serviceName][key] = _handleArrayConfig(serviceConfig[key]);
                            }
                            break;
                    }
                });
            });
            return publish;
        }
    }
}
