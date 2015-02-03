var tag = "deptUserTree: ";

angular.module("commons.directives").directive("deptUserTree", [
    '$log',
    '$filter',
    'constants',
    'DeptLoader',
    'UserLoader',
    'DeptTreeUtils',
    deptUserTree
]);

function deptUserTree($log,
                      $filter,
                      constants,
                      DeptLoader,
                      UserLoader,
                      DeptTreeUtils) {

    function postLink($scope, $element, attrs) {
        $scope.directiveName = tag;
        $scope.mode = 'normal';
        $scope.deptList = [];
        $scope.userList = [];
        $scope.searchList = [];
        $scope.searchKey = "";
        $scope.selectDept = undefined;

        $scope.onSearch = function (searchKey) {
            $scope.mode = 'search';
            UserLoader.searchUsers({
                key: searchKey
            }).then(function (users) {
                $scope.searchList = users;
            });
        };

        $scope.goBack = function () {
            $scope.mode = 'normal';
            $scope.searchList = [];
        };

        $scope.doSelectDept = function (deptId) {
            if ($scope.onselectdept) {
                $scope.selectDept = _.find($scope.deptList, {deptId: deptId});
                $scope.onselectdept({
                    dept: $scope.selectDept
                });
            }
        };

        $scope.doSelectUser = function (user) {
            if ($scope.onselectuser) {
                $scope.onselectuser({user: user});
            }
        };

        var settings = initSettings();
        var zTree = initTree(settings);
        fetchDepts();

        $scope.$parent.$on("uncheckAll", function (event, data) {
            zTree.checkAllNodes(false);
        });

        function fetchDepts() {
            DeptLoader.fetchManageDepts().then(function (deptList) {
                $scope.deptList = deptList;
                DeptTreeUtils.addDeptNodes(zTree, $scope.deptList);
            });
        }

        function addUserNodes(userList, parentNode) {
            var userNodes = _.map(userList, function (user) {
                return {
                    id: user.userId,
                    parentId: user.deptId || 0,
                    name: $filter("displayName")(user),
                    open: false,
                    type: 'user',
                    isParent: false,
                    iconSkin: "user_avatar"
                }
            });

            zTree.addNodes(parentNode, userNodes, true);
        }

        function initTree(settings) {
            $element.find("ul.ztree").attr("id", constants.getRandomStr());
            var zTree = $.fn.zTree.init($element.find("ul.ztree"), {
                view: {
                    dblClickExpand: false,
                    showLine: false,
                    selectedMulti: false,
                    addDiyDom: function (treeId, treeNode) {
                        showAvatar(treeNode);
                    }
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
                    onClick: function (event, treeId, treeNode) {
                        if (!treeNode) {
                            return false;
                        } else if (treeNode.isParent) {
                            zTree.expandNode(treeNode, true, false, true, true);
                        } else if (treeNode.type === 'user') {
                            !settings.dblclick && doSelectUser(treeNode.id);
                        }
                        return false;
                    },

                    onDblClick: function (event, treeId, treeNode) {
                        if (!treeNode) {
                            return false;
                        } else if (treeNode.type === 'user') {
                            settings.dblclick && doSelectUser(treeNode.id);
                        } else if (treeNode.type === 'dept') {
                            doSelectDept(treeNode.id);
                        }
                    },

                    onExpand: function (event, treeId, treeNode) {
                        if (!treeNode) {
                            return false;
                        } else if (treeNode.isParent) {
                            selectDept(treeNode.id);
                        }
                    }
                }
            }, []);
            return zTree;
        }

        function selectDept(deptId) {
            log.debug(tag, "selectDept: deptId: ", deptId);
            var firstUser = _.find($scope.userList, {deptId: deptId});
            if (firstUser) {
                return false;
            }

            UserLoader.fetchDeptUsers(deptId).then(function (users) {
                var _first = users[0],
                    hasAdded = _first && !!_.findWhere($scope.userList, {userId: _first.userId});
                if (_first && !hasAdded) {
                    var filterUsers = _.filter(users, {'deptId': deptId}); // java bugfix FIXME
                    _.each(filterUsers, function (user) {
                        if (settings.showDeptPath) {
                            user.deptPath = $filter("deptPath")(user.deptId, $scope.deptList);
                        }
                    });
                    $scope.userList = $scope.userList.concat(filterUsers);
                    var parentNode = zTree.getNodeByParam('id', deptId);
                    filterUsers.length && addUserNodes(filterUsers, parentNode);
                }
            });
        }

        function doSelectUser(userId) {
            var user = _.find($scope.userList, {userId: userId});
            if ($scope.onselectuser) {
                $scope.$apply(function () {
                    $scope.onselectuser({user: user});
                });
            }
        }

        function doSelectDept(deptId) {
            var dept = _.find($scope.deptList, {deptId: deptId});
            if ($scope.onselectdept) {
                $scope.$apply(function () {
                    $scope.onselectdept({dept: dept});
                });
            }
        }

        function initSettings() {
            return _.defaults($scope.settings || {}, {
                showDeptSettingBtn: false,
                hideUngroup: false,
                dblclick: true
            });
        }

        function showAvatar(treeNode) {
            if (treeNode.type === 'user') {
                var currentUser = _.find($scope.userList, {userId: treeNode.id});
                var anchor = $element.find("#" + treeNode.tId + "_a .button");
                anchor.append("<img alt='avatar' src='" + $filter("usericon")(currentUser.icon, currentUser.gender) + "'>");
            }

        }
    }

    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: __inline('../../templates/user/DeptUserTree.html'),
        scope: {
            'settings': '=',
            'onselectdept': '&',
            'onselectuser': '&'
        },
        link: postLink
    }
}
