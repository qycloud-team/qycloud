angular.module("commons.directives").directive("modalShow", [
    '$log',
    '$parse',
    modalShow
]);

function modalShow($log, $parse) {

    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var attrModel = $parse(attrs.modalShow);

            function showModal(visible) {
                if (visible) {
                    element.modal({
                        keyboard: true,
                        backdrop: 'static'
                    });
                } else {
                    element.modal("hide");
                }
            }

            scope.$watch(attrModel, function (newValue, oldValue) {
                //$log.debug("modal visible, newValue: ", newValue, ", oldValue: ", oldValue);
                showModal(newValue);
            });

            //Update the visible value when the dialog is closed through UI actions (Ok, cancel, etc.)
            element.bind("hide.bs.modal", function () {
                //$log.debug("hide.bs.modal: ", attrModel(scope));
                if (!attrModel(scope)) {
                    // if false , just ignored
                    return;
                }
                scope.$apply(function () {
                    // $log.debug("before: attrModel: ", attrModel(scope));
                    attrModel.assign(scope, false);
                    // $log.debug("after: attrModel: ", attrModel(scope));
                });
            });
        }
    };
}