/**
 * web前端工具类
 */
define("commons/qycloud/webhelper", [], function (require, exports, module) {

    var reg_url = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

    module.exports = {
        getCookie: function (name) {
            var arr = document.cookie
                .match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null)
                return unescape(arr[2]);
            return null;
        },

        /**
         * Get locale
         */
        getLocale: function () {
            var locale = this.getCookie('lang');
            locale = locale || this.getUrlEncodedKey('locale');
            locale = locale ? locale : (navigator.language || navigator.browserLanguage
            || navigator.systemLanguage || navigator.userLanguage).replace(
                /-/g, '_');
            var index = locale.indexOf('_');
            if (index != -1) {
                var lang, region;
                lang = locale.substring(0, index);
                region = locale.substring(index, locale.length).toUpperCase();
                locale = lang + region;
            }
            return locale;
        },

        getLang: function () {
            var lang = 'zh_CN', locale = "zh_CN"; // tianqing required
            if (locale) {
                locale = locale.toLowerCase();
                _.include(locale, 'cn') && (lang = 'zh_CN');
                _.include(locale, 'en') && (lang = 'en_US');
                _.include(locale, 'tw') && (lang = 'zh_TW');
                _.include(locale, 'hk') && (lang = 'zh_TW');
            }
            return lang;
        },

        loadExternalFiles: function (settings) {
            var fileUrlStrs = [];
            var i;
            for (i in settings.fileUrls) {
                fileUrlStrs.push(settings.prefix + settings.fileUrls[i] + "?t="
                + settings.version + settings.suffix);
            }
            document.write(fileUrlStrs.join(""));
        },

        escapeRegExp: function (str) {
            if (str)
                return str.replace(/[.*+?^${}()|[\]\/\\]/g, "\\$0");
            return null;
        },

        trimEnd: function (str, c) {
            if (str && c)
                return str.replace(new RegExp(this.escapeRegExp(c) + "*$"), '');
            return str.replace(/\s+$/, '');
        },
        trimStart: function (str, c) {
            if (str && c)
                return str.replace(new RegExp("^" + this.escapeRegExp(c) + "*"), '');
            return str.replace(/^\s+/, '');
        },

        /**
         * set
         */
        setUrlEncodedKey: function (key, value, query) {
            query = query || window.location.search;
            var q = query + "&";
            var re = new RegExp("[?|&]" + key + "=.*?&");
            if (!re.test(q))
                q += key + "=" + encodeURI(value);
            else
                q = q.replace(re, "&" + key + "=" + encodeURIComponent(value) + "&");
            q = this.trimEnd(this.trimStart(q, "&"), "&");
            return q.charAt(0) == "?" ? q : q = "?" + q;
        },

        getUrlEncodedKey: function (key, query) {
            if (!query)
                query = window.location.search;
            var re = new RegExp("[?|&]" + key + "=(.*?)&");
            var matches = re.exec(query + "&");
            if (!matches || matches.length < 2)
                return null;
            return decodeURIComponent(matches[1].replace("+", " "));
        },
        isSupportBrowser: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (function () {
                    return ua.indexOf('msie 9') != -1;
                }())
                return true;
            if (function () {
                    return ua.indexOf('msie 8') != -1;
                }())
                return true;
            if (function () {
                    return ua.indexOf('msie 6') != -1 || ua.indexOf('msie 7') != -1;
                }()) {
                return false;
            }
            return true;
        },

        getBrowserAndVersions: function () {
            var Sys = {};
            var ua = navigator.userAgent.toLowerCase();
            var s;
            (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
            if (Sys.ie) { //Js判断为IE浏览器
                return ('IE' + Sys.ie);
            }
            if (Sys.firefox) { //Js判断为火狐(firefox)浏览器
                return ('firefox' + Sys.firefox);
            }
            if (Sys.chrome) { //Js判断为谷歌chrome浏览器
                return ('chrome' + Sys.chrome);
            }
            if (Sys.opera) { //Js判断为opera浏览器
                return ('opera' + Sys.opera);
            }
            if (Sys.safari) { //Js判断为苹果safari浏览器
                return ('safari' + Sys.safari);
            }
        },

        isCompatiableMode: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('msie') !== -2) {
                var iereg = /msie\s*(\d)/i;
                ua.match(iereg);
                var ieversion = RegExp.$1;
                var mode = document.documentMode;
                if (ieversion != mode && (ieversion >= 8 || mode >= 8) && !(ieversion >= 8 && mode >= 8)) {
                    return true;
                }
                // ie9 兼容视图
                if (ieversion == 7 && ua.indexOf('trident/5.0') != -1) {
                    return true;
                }
            }
            return false;
        },

        isIE: function () {
            var ua = navigator.userAgent.toLowerCase();
            return ua.indexOf('msie') != -1 || ua.indexOf("trident") != -1;
        },

        isIE9: function () {
            var ua = navigator.userAgent.toLowerCase();
            var iereg = /msie\s*(\d)/i;
            ua.match(iereg);
            var ieversion = RegExp.$1;
            return ua.indexOf('msie') != -1 && ieversion == 9;
        },

        isIE8: function () {
            var ua = navigator.userAgent.toLowerCase();
            var iereg = /msie\s*(\d+)/i;
            ua.match(iereg);
            var ieversion = RegExp.$1;
            return ua.indexOf('msie') != -1 && ieversion == 8;
        },

        isLessIE8: function () {
            var ua = navigator.userAgent.toLowerCase();
            var iereg = /msie\s*(\d+)/i;
            ua.match(iereg);
            var ieversion = RegExp.$1;
            return ua.indexOf('msie') != -1 && ieversion < 8;
        },

        getIEVersion: function () {
            var ua = navigator.userAgent.toLowerCase();
            var iereg = /msie\s*(\d+)/i;
            ua.match(iereg);
            var ieversion = RegExp.$1;
            return ua.indexOf('msie') != -1 && ieversion;
        },

        isMobile: function () {
            return this.isIPhone() || this.isAndroidPhone() || this.isIPad()
                || this.isAndroidPad();
        },
        isIPad: function () {
            var platForm = navigator.platform.toLowerCase();
            if (platForm.indexOf("ipad") != -1) {
                return true;
            }
            return false;
        },
        isIPhone: function () {
            var platForm = navigator.platform.toLowerCase();
            if (platForm.indexOf("iphone") != -1 || platForm.indexOf("ipod") != -1) {
                return true;
            }
            return false;
        },
        isAndroidPhone: function () {
            var platForm = navigator.platform.toLowerCase();
            if (platForm.indexOf("android") != -1
                || platForm.indexOf("linux armv7l") != -1) {
                return true;
            }
            return false;
        },
        isAndroidPad: function () {
            var platForm = navigator.platform.toLowerCase();
            if (platForm.indexOf("android") != -1
                || platForm.indexOf("linux armv7l") != -1) {
                return true;
            }
            return false;
        },

        S4: function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        },

        guid: function () {
            var S4 = this.S4;
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4()
            + S4() + S4());
        },

        getAgent: function () {
            var agent = "web";
            if (this.isIPad() || this.isIPhone()) {
                agent = "pad";
            }
            return agent;
        },

        getFileSuffix: function (fileName) {
            if (!fileName || fileName.indexOf('.') === -1)
                return "";
            return fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
        },

        /**
         * 返回请求的url前缀: http://192.168.1.68/
         *
         * @returns {string}
         */
        getUrlPrefix: function () {
            return location.protocol + "//" + location.host;
        },

        loadJs: function (scriptId, file) {
            var scriptTag = document.getElementById(scriptId);
            var head = document.getElementsByTagName('head').item(0);
            if (scriptTag) head.removeChild(scriptTag);
            var script = document.createElement('script');
            script.src = file;
            script.type = 'text/javascript';
            script.id = scriptId;
            head.appendChild(script);
        },

        loadCss: function (cssId, file) {
            var cssTag = document.getElementById(cssId);
            var head = document.getElementsByTagName('head').item(0);
            if (cssTag) head.removeChild(cssTag);
            var css = document.createElement('link');
            css.href = file;
            css.rel = 'stylesheet';
            css.type = 'text/css';
            css.id = cssId;
            head.appendChild(css);
        },

        loadJsByJq: function (scriptId, file) {
            var head = $('head').remove('#' + scriptId);
            $("<scri" + "pt>" + "</scr" + "ipt>").attr({
                src: file,
                type: 'text/javascript',
                id: scriptId
            }).appendTo(head);
        },

        without: function (operates, withouts) {
            var index = -1;
            _.each(withouts, function (each) {
                index = _.indexOf(operates, each);
                index !== -1 && operates.splice(index, 1);
            });
        },

        becomeLink: function (str) {
            if (reg_url.test(str)) {
                var httpPos = str.indexOf("http");
                var hasHttp = httpPos !== -1;
                var linkStr = str.substring(httpPos);
                var url = hasHttp ? linkStr : 'http://' + linkStr;
                return str.substring(0, httpPos) + "<a href='" + url + "' target='_blank'>" + url + "</a>";
            } else {
                return str;
            }
        },

        /**
         * 初始化web
         */
        initOatosWeb: function () {
            var lang = this.getLang();
            window.lang = lang;
            $("body").addClass(lang);
            seajs.isPrivate && $('body').addClass("private");

            _.extend(window, {
                model: {},
                modelbinder: {},
                tpl: {},
                view: {},
                tplpre: {},
                cache: {},
                collection: {},
                setting: {}
            });
        },

        getBrowerInfo: function () {
            var Sys = {};
            var ua = navigator.userAgent.toLowerCase();
            var s;
            (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
                (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
                    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                        (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                            (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

            //以下进行测试
            //if (Sys.ie) document.write('IE: ' + Sys.ie);
            //if (Sys.firefox) document.write('Firefox: ' + Sys.firefox);
            //if (Sys.chrome) document.write('Chrome: ' + Sys.chrome);
            //if (Sys.opera) document.write('Opera: ' + Sys.opera);
            //if (Sys.safari) document.write('Safari: ' + Sys.safari);
            return Sys;
        }
    }
});
