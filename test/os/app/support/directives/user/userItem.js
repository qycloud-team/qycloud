angular.module("commons.directives").directive("userItem", [
    userItem
]);

function userItem() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        template: __inline("../../templates/user/userItem.html"),
        scope: {
            'user': '='
        },
        link: function () {

        }
    }
}