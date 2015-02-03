define("bootstrap/bootstrap-all", [], function (require, exports, module) {
    require("bootstrap/2.2.2/bootstrap");
    //require('bootstrap-editable');
    require("bootstrap/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker");
    require("bootstrap/plugins/bootstrap-contextmenu/bootstrap-contextmenu");

    $.fn.modal.Constructor.prototype.enforceFocus = function () {
    };
});
__inline("./2.2.2/bootstrap.js");
__inline("./plugins/bootstrap-contextmenu/bootstrap-contextmenu.js");
__inline("./plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.js");

