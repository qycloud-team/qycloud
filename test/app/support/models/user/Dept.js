var tag = "Dept::";

angular.module("commons.models").service("Dept", [
    '$q',
    'AdminRest',
    'Permission',
    DeptCreator
]);

function DeptCreator($q,
                     AdminRest,
                     Permission) {

    function Dept(attrs) {
        this.deptId = undefined;
        this.name = undefined;
        this.parentId = undefined;
        this.maxSize = undefined;
        this.permission = undefined;
        // 应用到所有子文件夹
        this.appalyToSubFolder = undefined;
        this.folderId = undefined;
        attrs && angular.extend(this, attrs);
    }

    Dept.prototype = {

        getDept: function () {
            var self = this;
            AdminRest.dept.get({
                deptid: this.deptId
            }).then(function (result) {
                result && angular.extend(self, result);
            });
        },

        createDept: function (isCreateFolder) {
            var self = this,
                delay = $q.defer();

            AdminRest.depts.post({
                parentId: this.parentId,
                deptName: this.name,
                createFolder: isCreateFolder
            }).then(function (result) {
                self.deptId = result.deptId;
                delay.resolve(self);
            }).fail(delay.reject);
            return delay.promise;
        },

        deleteDept: function () {
            return AdminRest.dept.remove({
                'deptid': this.deptId
            });
        },

        getDetail: function () {
            var self = this,
                delay = $q.defer();

            this.permission = new Permission();
            AdminRest.dept.get({'deptid': this.deptId})
                .then(function (result) {
                    self.permission = new Permission(result.permission);
                    delay.resolve(self);
                });
            return delay.promise;
        },

        update: function (other) {
            var self = this,
                the = other || this,
                delay = $q.defer();

            AdminRest.dept.put({
                deptId: the.deptId,
                deptName: the.name,
                parentId: the.parentId,
                appalyToSubFolder: the.appalyToSubFolder,
                permission: the.permission.toJSON()
            }).then(function () {
                angular.extend(self, {
                    name: the.name,
                    permission: the.permission
                });
                delay.resolve(self);
            }).fail(function () {
                delay.reject("error500");
            });
            return delay.promise;
        }
    };

    Dept.sortFn = function (dept1, dept2) {
        var val1 = dept1.orderValue || 0,
            val2 = dept2.orderValue || 0;
        if (!dept1.parentId) {
            return dept2.parentId ? -1 : val1 - val2;
        } else if (!dept2.parentId) {
            return 1;
        } else {
            return val1 - val2;
        }
    };

    /**
     * 获取子部门id
     * @param deptList
     * @param deptId
     * @returns {Array}
     */
    Dept.getSonDeptIds = _.memoize(function (deptId, deptList) {
        return _.pluck(_.filter(deptList, {parentId: deptId}), 'deptId');
    });

    /**
     * 获取所有的子孙部门id
     * @param deptList
     * @param deptId
     * @returns {Array}
     */
    Dept.getChildrenDeptIds = _.memoize(function (deptId, deptList) {
        var deptIds = [];
        var sonDeptIds = Dept.getSonDeptIds(deptId, deptList);
        if (sonDeptIds.length) {
            deptIds = deptIds.concat(sonDeptIds);

            _.each(sonDeptIds, function (deptId) {
                deptIds = deptIds.concat(Dept.getChildrenDeptIds(deptId, deptList));
            });
        }

        return deptIds;
    });

    return Dept;
}

angular.module("commons.models").factory("DeptLoader", [
    '$q',
    '$translate',
    'Dept',
    'AdminRest',
    DeptLoader
]);

function DeptLoader($q,
                    $translate,
                    Dept,
                    AdminRest) {
    return {
        fetchManageDepts: function (hideNoDept) {
            var delay = $q.defer();
            AdminRest.depts.get().then(function (departments) {
                if (!departments) {
                    delay.resolve([]);
                } else {
                    var deptList = _.map(departments, function (department) {
                        return new Dept(department);
                    });
                    deptList.sort(Dept.sortFn);
                    if (!hideNoDept) {
                        deptList.push(new Dept({
                            deptId: -1,
                            parentId: null,
                            name: $translate('msgUngroupContact'),
                            orderValue: '100000000'
                        }));
                    }
                    delay.resolve(deptList);
                }
            });
            return delay.promise;
        }
    }
}