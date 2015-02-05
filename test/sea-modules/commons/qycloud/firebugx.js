define("commons/qycloud/firebugx", [], function (require, exports, module) {
    if (typeof console === "undefined" || typeof console.log === "undefined") {
        var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
            "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

        window.console = {};
        for (var i = 0; i < names.length; ++i) {
            window.console[names[i]] = function () {
            }
        }
    }

    function arrayToStr(args) {
        var args = _.values(args), str = '';
        for (var i = 0, length = args.length; i < length; i++) {
            if (_.isString(args[i])) {
                str = str + args[i];
            } else {
                str = str + args[i];
            }
        }
        return str;
    }

    window.log = {};
    log.log = log.debug = function () {
        typeof console.log.apply === 'function' ? console.log.apply(console, arguments) : console.log(arrayToStr(arguments));
    };

    log.info = function () {
        typeof console.info.apply === 'function' ? console.info.apply(console, arguments) : console.info(arrayToStr(arguments));
    };

    log.warn = function () {
        typeof console.warn.apply === 'function' ? console.warn.apply(console, arguments) : console.warn(arrayToStr(arguments));
    };

    log.error = function () {
        typeof console.error.apply === 'function' ? console.error.apply(console, arguments) : console.error(arrayToStr(arguments));
    };
});