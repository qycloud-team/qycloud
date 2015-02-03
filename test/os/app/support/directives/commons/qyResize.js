angular.module("commons.directives").directive("qyResize", [
    '$window',
    '$rootScope',
    qyResize
]);

function qyResize($window, $rootScope) {
    'use strict';

    return {
        restrict: 'EA',
        replace: false,
        transclude: false,
        link: function (scope, elem, attrs) {
            var resizeType = attrs['qyResize'],
                winWidth = $(window).width(),
                winHeight = $(window).height(),
                resizeTimeout = null;

            log.debug("resizeType: ", resizeType);

            $(window).resize(function () {
                var onResize = function () {
                    //The method which alter some css properties triggers
                    //window.resize again and it ends in an infinite loop
                    var $resizes = $("*[" + resizeType + "]");
                    $resizes.each(function () {
                        $rootScope.$emit(resizeType, $(this));
                        // adminResizeDelegate($(this));
                    });
                    // log.debug(resizeTimeout + " elements: ", $resizes);
                };

                //New height and width
                var winNewWidth = $(window).width(),
                    winNewHeight = $(window).height();

                // compare the new height and width with old one
                if (winWidth != winNewWidth || winHeight != winNewHeight) {
                    window.clearTimeout(resizeTimeout);
                    resizeTimeout = window.setTimeout(onResize, 10);
                }
                //Update the width and height
                winWidth = winNewWidth;
                winHeight = winNewHeight;
            });
        }
    };
}