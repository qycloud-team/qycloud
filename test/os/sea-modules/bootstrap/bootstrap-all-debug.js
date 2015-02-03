define("bootstrap/bootstrap-all-debug", [
    'bootstrap',
    'bootstrap-editable',
    'bootstrap-datetimepicker',
    'bootstrap-contextmenu'
], function (require, exports, module) {
    require("bootstrap");
    require('bootstrap-editable');
    require("bootstrap-datetimepicker");
    require("bootstrap-contextmenu");
});