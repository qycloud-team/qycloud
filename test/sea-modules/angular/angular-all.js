define("angular/angular-all", [], function (require, exports, module) {
    require(__uri("./1.2.25/angular.js"));
    require(__uri("./plugins/route/angular-route.js"));
    require(__uri("./plugins/translate/angular-translate.js"));
    require("angular/plugins/ui-bootstrap/ui-bootstrap");
    //require(__uri('./plugins/infinite-scroll/infinite-scroll.js'));
    // require(__uri('./plugins/ui-bootstrap/ui-bootstrap.js'))
});

__inline("./1.2.25/angular.js");
__inline("./plugins/route/angular-route.js");
__inline("./plugins/translate/angular-translate.js");
//__inline("./plugins/infinite-scroll/infinite-scroll.js");
//__inline("./plugins/ui-bootstrap/ui-bootstrap.js");
define("angular/plugins/ui-bootstrap/ui-bootstrap", [], function (require, exports, module) {
    __inline('./plugins/ui-bootstrap/ui-bootstrap.js');
});
