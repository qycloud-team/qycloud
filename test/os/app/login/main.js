var tag = "[main]-";

angular.module('login', [
    'ngRoute',
    'ngTranslate',
    'commons.services',
    'commons.models',
    'commons.filters',
    'commons.directives'
]);

require('app/login/login');
require('app/login/header');

angular.module('login').config(function ($routeProvider, $logProvider, $translateProvider) {
    'use strict';
    $logProvider.debugEnabled(true);
    $translateProvider.uses(webhelper.getLang());

    $routeProvider.when("/", {
        controller: "LoginCtrl",
        templateUrl: "loginform.html"
    }).otherwise({
        redirectTo: '/'
    })
});

angular.module("login").run(function ($rootScope, constants) {
    $rootScope._ = _;
    $rootScope.constants = constants;

    window.cache = {
        token: constants.getCookie("ut"),
        userId: undefined,
        showType: constants.getCookie("stp") || 'list',
        clientId: constants.getCookie("ci") || webhelper.guid()
    };
});

angular.bootstrap(document, ['login']);


