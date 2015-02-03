var tag = "DeptTree: ";

angular.module("commons.directives").directive("deptTree", [
    '$log',
    'constants',
    'DeptLoader',
    'DeptTreeUtils',
    deptTree
]);

function deptTree($log, constants, DeptLoader, DeptTreeUtils) {

    function postLink($scope, $element, attrs) {
        $scope.directiveName = tag;
        $scope.mode = 'normal';
        $scope.deptList = [];
        $scope.searchList = [];
        $scope.searchKey = "";
        $scope.selectDept = undefined;

        $scope.search = function () {
            if ($scope.searchKey.length > 0) {
                $scope.mode = 'search';
                $scope.searchList = _.filter($scope.deptList, function (dept) {
                    return dept.name.toLowerCase().indexOf($scope.searchKey.toLowerCase()) > -1;
                });
            } else {
                $scope.mode = 'normal';
                $scope.searchList = [];
            }
        };

        $scope.doSelectDept = function (deptId) {
            if ($scope.select) {
                $scope.selectDept = _.find($scope.deptList, {deptId: deptId});
                $scope.select({
                    dept: $scope.selectDept
                });
            }
        };

        var settings = initSettings();
        var zTree = initTree(settings);
        fetchDepts();

        function fetchDepts() {
            DeptLoader.fetchManageDepts().then(function (deptList) {
                $scope.deptList = deptList;
                DeptTreeUtils.addDeptNodes(zTree, $scope.deptList);
            });
        }

        function initTree(settings) {
            $element.find("ul.ztree").attr("id", constants.getRandomStr());
            var zTree = $.fn.zTree.init($element.find("ul.ztree"), {
                view: {
                    dblClickExpand: false,
                    showLine: false,
                    selectedMulti: false
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "parentId",
                        rootPId: ""
                    }
                },
                callback: {
                    beforeClick: function (treeId, treeNode) {
                        $scope.doSelectDept(treeNode.id);
                        return true;
                    },

                    onClick: function (event, treeId, treeNode) {
                        if ($(event.target).attr("id")
                            && $(event.target).attr("id").indexOf("_span") > 0) {
                            zTree.expandNode(treeNode);
                        }
                        return false;
                    }
                }
            }, []);
            return zTree;
        }

        function initSettings() {
            return _.defaults($scope.settings || {}, {
                showDeptSettingBtn: false,
                hideUngroup: false
            });
        }
    }

    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require: ["?^select"],
        template: __inline('../../templates/_depttree.html'),
        scope: {
            'settings': '=',
            'select': '&'
        },
        link: postLink
    }
}
