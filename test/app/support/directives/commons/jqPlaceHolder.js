angular.module("commons.directives").directive("jqPlaceholder", [
    '$parse',
    jqPlaceHolder
]);

function jqPlaceHolder($parse) {
    'use strict';

    return function (scope, elem, attrs) {
        elem.attr("placeholder", attrs.jqPlaceholder);
        elem.placeholder();
    };
}