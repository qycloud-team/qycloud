angular.module("commons.directives").directive("qyPager", [
    '$parse',
    '$attrs',
    function ($parse) {
        return {
            restrict: 'A',
            replace: false,
            transclude: false,
            link: function (scope, $elem, $attrs) {
                // nothing

                // TODO
                var pager = attrs['qyPager'];
                log.debug("pager: ", pager);
                //$elem.attr({
                //    'total-items': pager + '.total',
                //    'items-per-page': pager + '.perPage',
                //    'ng-model': pager + '.current',
                //    'max-size': pager + '.max',
                //    'num-pages': pager + '.numPages',
                //    'previous-text': '上一页',
                //    'next-text': '下一页',
                //    'boundary-links': 'false',
                //    'rotate': 'false'
                //});
                //totalItems: '=',
                //    firstText: '@',
                //    previousText: '@',
                //    nextText: '@',
                //    lastText: '@'
            }
        }
    }
]);