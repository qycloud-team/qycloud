define(function (require, exports, module) {
    window.$ = window.jQuery = require('jquery/1.9.1/jquery');
    require('jquery/plugins/cookie/1.3/cookie');
    require("jquery/plugins/jquery-hotkeys/jquery-hotkeys");
    require("jquery/plugins/jquery-placeholder/jquery.placeholder");
    require("jquery/plugins/noty/jquery.noty.packaged");
    require("jquery/plugins/select2/select2");
    require("jquery/plugins/jqueryztree/jquery.ztree.all-3.5.min");
    // require(__uri('../fex/webuploader/webuploader.js'));
});

__inline("./1.9.1/jquery.js");
__inline("./plugins/cookie/1.3/cookie.js");
__inline("./plugins/jquery-hotkeys/jquery-hotkeys.js");
__inline("./plugins/jquery-placeholder/jquery.placeholder.js");
__inline("./plugins/noty/jquery.noty.packaged.js");
__inline("./plugins/jqueryztree/jquery.ztree.all-3.5.min.js");
__inline("./plugins/select2/select2.js");
__inline('../fex/webuploader/webuploader.js');
