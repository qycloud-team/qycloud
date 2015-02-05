var tag = "[RoleUserTree:]";

angular.module("commons.directives").directive('roleUserTree', [
    '$log',
    '$filter',
    'constants',
    'Role',
    'RoleLoader',
    'UserLoader',
    roleUserTree
]);

function roleUserTree($log,
                      $filter,
                      constants,
                      Role,
                      RoleLoader,
                      UserLoader) {

    function postLink($scope, $element, attrs) {
        $scope.directiveName = tag;
        $scope.mode = 'normal';
        $scope.roleList = [];
        $scope.userList = [];
        $scope.searchList = [];
        $scope.selectRole = undefined;
        $scope.role = new Role();

        var settings = initSettings();
        var zTree = initTree(settings);
        fectchRoles();

        $scope.$parent.$on("uncheckAll", function (event, data) {
            zTree.checkAllNodes(false);
        });

        $scope.onSearch = function (searchKey) {
            $scope.mode = 'search';
            UserLoader.searchUsers({
                key: searchKey
            }).then(function (users) {
                $scope.searchList = users;
            });
            $scope.roles = _.filter($scope.roleList, function (role) {
                return role.name.indexOf(searchKey) > -1;
            });
        };

        $scope.goBack = function () {
            $scope.mode = 'normal';
            $scope.searchList = [];
        };

        $scope.doSelectRole = function (role) {
            if ($scope.onselectrole) {
                $scope.selectRole = _.find($scope.roleList, {roleId: role.roleId});
                $scope.onselectrole({
                    role: $scope.selectRole
                });
            }
        };

        $scope.doSelectUser = function (user) {
            if ($scope.onselectuser) {
                $scope.onselectuser({user: user});
            }
        };


        function fectchRoles() {
            RoleLoader.getRoles().then(function (roleList) {
                $scope.roleList = roleList;
                addRoleNodes();
            });
        }

        function addRoleNodes() {
            _.each($scope.roleList, function (role) {
                addRoleNode(role);
            });
        }

        function addRoleNode(role) {
            if (!role)
                return;
            var currentNode = zTree.getNodeByParam("id", role.roleId);
            if (currentNode)
                return currentNode;

            var parentNode = null;
            if (role.parentId) {
                parentNode = zTree.getNodeByParam("id", role.parentId);
                if (!parentNode) {
                    parentNode = addRoleNode(_.find($scope.roleList, {roleId: role.parentId}));
                }
            }
            var nodes = zTree.addNodes(parentNode, {
                id: role.roleId,
                parentId: role.parentId || 0,
                name: role.name,
                open: false,
                type: 'role',
                isParent: true
            }, true);
            return nodes[0];
        }

        function addUserNodes(userList, roleId, parentNode) {
            var userNodes = _.map(userList, function (user) {
                return {
                    id: user.userId,
                    parentId: roleId,
                    name: user.userName,
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
                            !settings.dblclick && doSelectRole(treeNode.id);
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
                        } else if (treeNode.type === 'role') {
                            settings.dblclick && doSelectRole(treeNode.id);
                        }
                    },

                    onExpand: function (event, treeId, treeNode) {
                        if (!treeNode) {
                            return false;
                        } else if (treeNode.isParent) {
                            selectRole(treeNode.id);
                        }
                    }
                }
            }, []);
            return zTree;
        }

        function selectRole(roleId) {
            var selectRole = _.find($scope.roleList, {roleId: roleId});
            if (selectRole.fetched) {
                return false;
            }
            selectRole.fetched = true;
            selectRole.fetchRoleDetail(roleId).then(function (result) {
                var users = result.users;
                if (users.length) {
                    Array.prototype.splice.apply($scope.userList, [$scope.userList.length, 0].concat(users));
                    var parentNode = zTree.getNodeByParam('id', roleId);
                    users.length && addUserNodes(users, roleId, parentNode);
                }
            });
        }

        function doSelectRole(roleId) {
            var role = _.find($scope.roleList, {roleId: roleId});
            if ($scope.onselectrole) {
                $scope.$apply(function () {
                    $scope.onselectrole({role: role});
                })
            }
        }

        function doSelectUser(userId) {
            var user = _.find($scope.userList, {userId: userId});
            if ($scope.onselectuser) {
                $scope.$apply(function () {
                    $scope.onselectuser({user: user});
                })
            }
        }

        function initSettings() {
            return _.defaults($scope.settings || {}, {
                showRoleSettingBtn: false,
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
        template: __inline('../../templates/RoleUserTree.html'),
        scope: {
            'settings': '=',
            'onselectrole': '&',
            'onselectuser': '&'
        },
        link: postLink
    }
}