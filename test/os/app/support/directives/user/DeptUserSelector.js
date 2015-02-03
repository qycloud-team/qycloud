var tag = "deptUserSelector::";

/**
 *
 * settings: {   TODO
 *  'enableShowUsers': true,        // 显示用户
 *  'enableSelectDepts': false,     // 多选部门
 *  'enableSelectUsers': true,      // 多选用户
 *  'enableSelectUser': false,      // 单选用户
 *  'enableSelectDept': false       // 单选部门
 * }
 *
 */
angular.module("commons.directives").directive("deptUserSelector", [
    '$log',
    '$parse',
    deptUserSelector
]);

function deptUserSelector($log, $parse) {

    function postLink($scope, $element, attrs) {
        $scope.directiveName = tag;
        $scope.selectDepts = [];
        $scope.$parent.$on("uncheckAll", function () {
            $scope.selectDepts = [];
            $scope.selectUsers = [];
        });

        $scope.onSelectDept = function (dept) {
            if (_.find($scope.selectDepts, {deptId: dept.deptId})) {
                return false;
            } else {
                $scope.selectDepts.push(dept);
            }
        };

        $scope.onSelectUser = function (user) {
            if (_.find($scope.selectUsers, {userId: user.userId})) {
                return false;
            } else {
                $scope.selectUsers.push(user);
            }
        };

        $scope.$watch("selectDepts", function (latest, old) {
            if (latest != old && $scope.onselectdepts) {
                $scope.onselectdepts({depts: $scope.selectDepts});
            }
        });

        $scope.$watch("selectUsers", function (latest, old) {
            if (latest != old && $scope.onselectusers) {
                $scope.onselectusers({users: $scope.selectUsers})
            }
        });
    }

    return {
        restrict: 'EA',
        replace: true,
        transclude: false,
        template: __inline('../../templates/DeptUserSelector.html'),
        scope: {
            'settings': '=',
            'selectUsers': '=',
            'onselectdepts': '&',
            'onselectusers': '&'
        },
        link: postLink
    }
}
