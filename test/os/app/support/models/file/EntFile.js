angular.module("commons.models").service("EntFile", function ($q,
                                                              $translate,
                                                              constants,
                                                              FileRest,
                                                              BaseFile,
                                                              cache) {

    function EntFile(attrs) {
        this.fileType = 'sharedisk';
        this.name = undefined;
        this.entId = undefined;
        this.userId = undefined;
        this.parentId = undefined;
        this.fileId = undefined;
        this.type = undefined;
        this.size = undefined;
        this.guid = undefined;
        this.version = undefined;
        this.createTime = undefined;
        this.updateTime = undefined;
        this.thumb = undefined;
        this.shareLinkId = undefined;
        this.lockByUserId = undefined;
        this.lockByUser = undefined;
        this.remark = undefined;
        this.favorite = undefined;
        this.remind = undefined;
        this.linkDTO = undefined;
        this.permissionDTO = undefined;
        this.path = undefined;
        this.isFolder = undefined;
        this.folder = undefined;
        this.updateUserName = undefined;

        var _attrs = BaseFile.parseEntFile(attrs);
        angular.extend(this, _attrs);
    }

    EntFile.prototype = new BaseFile();
    EntFile.rootFolder = new EntFile({
        fileId: -1,
        folder: true,
        name: $translate('msg878'),
        fileType: 'sharedisk'
    });
    EntFile.createFolder = function (parentId, name) {
        return new EntFile({
            fileType: 'sharedisk',
            parentId: parentId,
            fileName: name,
            folder: true
        })
    };


    angular.extend(EntFile.prototype, {
        constructor: EntFile,

        remindFile: function () {
            return FileRest.remindFile.put(null, {
                query: {
                    fileid: this.fileId
                }
            });
        },

        cancalRemind: function () {
            return FileRest.remindFile.remove(null, {
                query: {
                    fileid: this.fileId
                }
            });
        },

        getVersion: function (version) {
            var defer = $q.defer();
            FileRest.file.getHistory({
                fileid: this.fileId,
                type: this.fileType,
                v: version
            }).then(function (result) {
                defer.resolve(_.map(result, function (file) {
                    return new EntFile(file);
                }));
            });
            return defer.promise;
        },

        /**清空文件历史版本*/
        deleteVersions: function (version) {
            return FileRest.history.remove(null, {
                query: {
                    fileid: this.fileId,
                    type: this.fileType,
                    v: version
                }
            })
        },

        lock: function () {
            var delay = $q.defer();
            FileRest.file.lock(null, {
                query: {
                    fileid: this.fileId
                }
            }).then(function (result) {
                delay.resolve(result);
            }).fail(function (err) {
                delay.reject(err);
            });
            return delay.promise;
        },

        unlock: function () {
            var delay = $q.defer();
            FileRest.file.unlock({
                fileid: this.fileId
            }).then(function (result) {
                delay.resolve(result);
            }).fail(function (err) {
                delay.reject(err);
            });
            return delay.promise;
        },

        follow: function () {
            var delay = $q.defer();
            FileRest.remindFile.put(null, {
                query: {
                    fileid: this.fileId
                }
            }).then(function (result) {
                delay.resolve(result);
            }).fail(function (err) {
                delay.reject(err);
            });
            return delay.promise;
        },

        unFollow: function () {
            var delay = $q.defer();
            FileRest.remindFile.remove({
                fileid: this.fileId
            }).then(function (result) {
                delay.resolve(result);
            }).fail(function (err) {
                delay.reject(err);
            });
            return delay.promise;
        },

        /**
         * 返回企业文件/文件夹权限所包含的操作
         * @private
         */
        getPermissionOperations: function () {
            var operates = [], permission = this.permissionDTO;
            if (!permission)
                return operates;

            permission['read'] && operates.push(constants.PermissionOperateMap['read']);
            permission['upload'] && operates.push(constants.PermissionOperateMap['upload']);
            permission['download'] && operates.push(constants.PermissionOperateMap['download']);
            permission['write'] && operates.push(constants.PermissionOperateMap['write']);
            permission['share'] && operates.push(constants.PermissionOperateMap['share']);
            permission['delete'] && operates.push(constants.PermissionOperateMap['delete']);
            permission['local'] && operates.push(constants.PermissionOperateMap['local']);
            permission['manage'] && operates.push(constants.PermissionOperateMap['manage']);
            return _.uniq(_.flatten(operates));
        },

        /**
         * 获取企业文件/文件夹的操作
         * @returns {*}
         */
        getOperations: function () {
            var operates = this.getPermissionOperations();

            webhelper.without(operates, this.remind ? ['attention'] : ['unattention']);
            if (this.lockByUserId) {
                webhelper.without(operates, ['lock']);
                if (!this.hasLockByMe()) {
                    webhelper.without(operates, ['rename', 'move', 'delete', 'edit']);
                }
            } else {
                webhelper.without(operates, ['unlock']);
            }
            webhelper.without(operates, this.isFolder ? ['lock', 'unlock'] : ['permission', 'sync']);
            this.sysFolder && webhelper.without(operates, ['rename', 'move', 'delete']);
            webhelper.without(operates, !this.isFolder && constants.isEditType(this.type) ? [] : ['edit']);

            return operates;
        },

        /**
         * 获取多个企业文件/文件夹的操作   后续还需对 关注/取消关注 收藏/取消收藏  做处理
         * @returns {*}  返回值中 如果没有attention 则一定不能 关注/取消关注
         */
        getMultiFilesOperations: function () {
            var operates = this.getPermissionOperations();
            webhelper.without(operates, ['share', 'rename', 'lock', 'unlock', 'edit', 'permission', 'property']);  //多文件 一定没有的
            webhelper.without(operates, this.sysFolder ? ['move', 'copy', 'delete'] : []);
            return operates;
        },

        canUpload: {},

        hasLockByMe: function () {
            return this.lockByUserId && this.lockByUserId === cache.userId;
        }

    });
    return EntFile;
});




