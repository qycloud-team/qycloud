var tag = "DeptTreeUtils::";

angular.module("commons.services").factory("DeptTreeUtils", [
    '$log',
    deptTreeUtils
]);

function deptTreeUtils($log) {

    function addDeptNode(zTree, deptList, dept) {
        if (!dept)
            return;

        var currentNode = zTree.getNodeByParam("id", dept.deptId);
        if (currentNode) return currentNode;

        var parentNode = null;
        if (dept.parentId) {
            parentNode = zTree.getNodeByParam("id", dept.parentId);
            if (!parentNode) {
                parentNode = addDeptNode(zTree, deptList, _.find(deptList, {deptId: dept.parentId}));
            }
        }

        var nodes = zTree.addNodes(parentNode, {
            id: dept.deptId,
            parentId: dept.parentId || 0,
            name: dept.name,
            open: false,
            type: 'dept',
            isParent: true
        }, true);
        return nodes[0];
    }

    function addDeptNodes(zTree, deptList) {
        _.each(deptList, function (dept) {
            addDeptNode(zTree, deptList, dept);
        });
    }

    // TODO 惰性加载
    function _lazy(zTree, deptList) {
        var deptBlocks = [];
        var count = 0;
        while (deptList.length > count) {
            deptBlocks.push(deptList.slice(0, 300));
            count += 300;
        }

        _.each(deptBlocks, function (users, index) {
            setTimeout(function () {
                //var start = new Date().valueOf();
                _.each(deptBlocks, function (dept) {
                    addDeptNode(zTree, deptList, dept);
                });
                // log.debug((index + 1) + " =>  1000 users, cost: ", new Date().valueOf() - start);
            }, index * 2000);
        });
    }

    return {
        addDeptNode: addDeptNode,
        addDeptNodes: addDeptNodes
    }
}