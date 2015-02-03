angular.module("commons.directives").directive("qyViewfile", [
    '$parse',
    '$translate',
    '$log',
    'constants',
    viewFile
]);

function viewFile($parse, $translate, $log, constants) {
    'use strict';

    return {
        restrict: 'EA',
        replace: false,
        transclude: false,

        link: function (scope, elem, attrs) {
            var file = $parse(attrs['qyViewfile'])(scope);
            if (file && file.type !== 'folder') {
                if (webhelper.isIE8()) {
                    if (file.getViewType() === 'pdf') {
                        // TODO 显示提示信息
                        return false;
                    }
                } else if (file.isNeedConvert()) {
                    if (!file.hasConvDone()) {
                        elem.click(function () {
                            file.viewFile().then(function () {
                                noty.success($translate('msgFileDealComplete'));
                            }).fail(function () {
                                noty.success($translate('msgFileDealing'))
                            });
                        });
                        return false;
                    }
                }
                setHref();
            }

            function setHref() {
                attrs.$set("ngClick", undefined);
                elem.unbind('click');
                elem.attr("target", "_blank");
                elem.attr("href", constants.getItemPreviewUrl(file));
            }
        }
    };
}