angular.module("commons.filters").filter("gbSizeFilter", [
    function () {
        return function (size) {
            if (!size || size === '--')
                return "-";

            var unit = 'B';
            if (size === 0)
                return 0;

            if (size >= 1024) {
                size = size / 1024;
                unit = 'K';
            }
            if (size >= 1024) {
                size = size / 1024;
                unit = 'M';
            }
            if (size >= 1024) {
                size = size / 1024;
                unit = 'G';
            }
            if (unit !== 'G')
                return 0;
            return _.numberFormat(size, 1);
        }
    }
]);