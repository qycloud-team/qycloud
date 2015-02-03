var tag = "datetimepicker: ";

angular.module("commons.directives").directive("datetimepicker", [
    function () {
        return function ($scope, $elem, $attrs) {
            $elem.datetimepicker({
                autoclose: true,
                pickerPosition: "bottom-left"
            }).on("hide", function (event) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            });
        }
    }
]);