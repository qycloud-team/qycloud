var tag = "datetimepicker: ";

angular.module("commons.directives").directive("shareTime", [
    '$log',
    'constants',

    function ($log,
              constants) {
        return {
            restrict: "EA",
            replace: true,
            transclude: false,
            template: __inline("../../templates/share/ShareTime.html"),
            scope: {
                entLink: '=',
                updateExpiredTime: '&'
            },

            link: function ($scope, elem, attrs) {

                elem.datetimepicker({
                    autoclose: true,
                    pickerPosition: "bottom-left",
                    startDate: new Date()
                }).on("hide", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }).on('changeDate', function (ev) {
                    var expireDate = constants.date_format(new Date(ev.date.valueOf() - 3600 * 8 * 1000), "YYYY-MM-DD");//datepickerBUG,时区问题,时间快8个小时;
                    if ($scope.updateExpiredTime) {
                        $scope.updateExpiredTime({
                            expireDate: expireDate
                        });
                    }
                })
            }
        }
    }
]);