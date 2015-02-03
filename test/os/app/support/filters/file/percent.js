angular.module("commons.filters").filter("percent",
    function () {
        return function (completed, size) {
            if (!completed)
                return 0;
            var percent = Math.round(completed * 100 / size);
            if (percent >= 100) {
                return "100%";
            } else if (percent < 1) {
                return "2%";
            } else {
                return percent + "%";
            }
        }
    });