define(function (require) {
    var _ = require("commons/lodash/2.4.1/lodash");
    window._ = _;
    window._.str = require('commons/underscore-string/underscore.string');
    _.mixin(_.str);

    require('commons/json/1.0.3/json');
    window.moment = require('commons/moment/2.0.0/moment');
    require('commons/qycloud/firebugx');
    window.webhelper = require('commons/qycloud/webhelper');
    require("bootstrap/bootstrap-all");
    window.swfobject = require('commons/swfobject/2.2.0/swfobject');
});

__inline("./lodash/2.4.1/lodash.js");
__inline("./underscore-string/underscore.string.js");
__inline("./json/1.0.3/json.js");
__inline("./moment/2.0.0/moment.js");
__inline("./qycloud/firebugx.js");
__inline("./qycloud/webhelper.js");
__inline("./crypto-sha256/crypto-sha256.js");
__inline("./socket-io-client/socket.io.js");
__inline("./swfobject/2.2.0/swfobject.js");
__inline("../bootstrap/bootstrap-all.js");










