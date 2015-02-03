angular.module("commons.filters").filter("deptPath", [
    '$translate',
    function ($translate) {
        return function (deptId, deptList) {

            function getDeptRelation(dept, deptList, deptNames) {
                deptNames.unshift(dept.name);
                if (dept.parentId) {
                    var parent = _.find(deptList, {deptId: dept.parentId});
                    if (parent) {
                        getDeptRelation(parent, deptList, deptNames);
                    }
                }
                return deptNames;
            }

            if (!deptId) {
                return '/' + $translate('msgUngrpContact');
            } else {
                var dept = _.find(deptList, {deptId: deptId});
                if (dept) {
                    var deptNames = getDeptRelation(dept, deptList, []);
                    return _.reduce(deptNames, function (total, deptName) {
                        return total + '/' + deptName;
                    }, "");
                } else {
                    return "";
                }
            }
        }
    }
])