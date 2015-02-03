angular.module("commons.filters").filter("langFilter", function () {
    return function (input) {
        input = input || "zh_CN";
        switch (input) {
            case "zh_TW":
                return "中文繁体";
            case "en_US":
                return "English";
            case "zh_CN":
            default:
                return "中文简体";
        }
    }
});