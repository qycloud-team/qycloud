angular.module("commons.filters").filter("mailUrl", [
    function () {
        return function (mail) {
            var suffix = _.strRightBack(mail, "@");
            switch (suffix) {
                case "qq.com":
                    return "https://mail.qq.com/";
                case "163.com":
                    return "http://mail.163.com/";
                case 'vip.163.com':
                    return "http://vip.163.com/";
                case "vip.163.net":
                    return "http://vip.163.net/";
                case "126.com":
                    return "http://mail.126.com/";
                case "vip.126.net":
                    return "http://vip.126.net/";
                case "vip.126.com":
                    return "http://vip.126.com/";
                case "sina.com":
                case "sina.cn":
                    return "https://mail.sina.com.cn/";
                case 'vip.sina.com':
                    return "http://vip.sina.com.cn/";
                case "sohu.com":
                    return "http://mail.sohu.com/";
                case 'sohu.net':
                    return "http://mail.sohu.net/";
                case "vip.sohu.net":
                    return "http://vip.sohu.net/";
                case "vip.sohu.com":
                    return "http://vip.sohu.com/";
                case "gmail.com":
                    return "http://www.gmail.com/";
                case "qycloud.com":
                    return "http://mail.qycloud.com/";
                case "21cn.com":
                    return "http://mail.21cn.com/";
                case "vip.21cn.com":
                    return "http://mail.21cn.com/vip/";
                default:
                    return "#/redirect/" + mail;
            }
        }
    }
])