var tag = "BaseFile::";

angular.module("commons.models").service("BaseFile", function ($q, $log, cache, FileRest, constants, NodeRest) {

    function BaseFile() {
        this.fileId = undefined;
        this.name = undefined;
        this.labels = [];
        this.convStatus = undefined;
    }

    BaseFile.prototype = {

        isEntFile: function () {
            return this.fileType == constants.fileType.shareDisk;
        },

        reload: function () {
            return this.getFile();
        },

        getFile: function () {
            var self = this,
                delay = $q.defer();

            FileRest.file.get({
                fileid: this.fileId,
                type: this.fileType
            }).then(function (result) {
                var latest = self.fileType === 'sharedisk' ?
                    BaseFile.parseEntFile(result) : BaseFile.parsePersonFile(result);
                angular.extend(self, latest);
                delay.resolve(self);
            }).fail(function (result) {
                delay.reject(result);
            });
            return delay.promise;
        },

        getFileProperties: function () {
            var delay = $q.defer();
            FileRest.file.getFileInfo({
                fileid: this.fileId,
                type: this.fileType
            }).then(function (result) {
                var fileInfo = result.fileType === 'sharedisk' ?
                    BaseFile.parseEntFile(result) : BaseFile.parsePersonFile(result);
                delay.resolve(fileInfo);
            });
            return delay.promise;
        },

        rename: function (newName) {
            var self = this,
                delay = $q.defer();
            FileRest.file.rename({
                name: newName,
                fileId: this.fileId,
                version: this.version,
                fileType: this.fileType
            }).then(function () {
                self.reload().then(function () {
                    delay.resolve(self);
                });
            }).fail(function (err) {
                delay.reject(err);
            });
            return delay.promise;
        },

        /**修改标签*/
        modifyLabels: function (labels) {
            var delay = $q.defer();
            FileRest.file.updateLabel({
                fileId: this.fileId,
                fileType: this.fileType,
                labels: labels,
                version: this.version
            }).then(function (result) {
                delay.resolve(result);
            });
            return delay.promise;
        },

        /**取评论列表*/
        getComments: function () {
            var delay = $q.defer();
            FileRest.comments.get({
                fileid: this.fileId,
                type: this.fileType
            }).then(function (result) {
                delay.resolve(result);
            });
            return delay.promise;
        },

        /**添加评论*/
        addComment: function (createrName, commentBody) {
            var delay = $q.defer();
            FileRest.comments.post({
                fileId: this.fileId,
                fileType: this.fileType,
                commentBody: commentBody,
                userName: createrName,
                version: this.version
            }).then(function (result) {
                delay.resolve(result);
            });
            return delay.promise;
        },

        deleteComment: function (commentId) {
            var delay = $q.defer();
            FileRest.comment.remove(null, {
                query: {
                    commentid: commentId
                }
            }).then(function (result) {
                delay.resolve(result);
            });
            return delay.promise;
        },

        updateFileComment: function (commentBody, commentId) {
            var delay = $q.defer();
            FileRest.comment.put({
                fileId: this.fileId,
                fileType: this.fileType,
                commentBody: commentBody,
                commentId: commentId,
                version: this.version
            }).then(function (result) {
                delay.resolve(result);
            });
            return delay.promise;
        },

        isNeedConvert: function () {
            return constants.isFileConvertSupport(this.type);
        },

        hasConvDone: function () {
            if (!this.isNeedConvert())
                return true;
            return this.convStatus === '3'; // CONVERT_DONE
        },

        createFolder: function (linkId) {
            var self = this,
                delay = $q.defer();

            FileRest.folders.post({
                fileType: this.fileType,
                parentId: this.parentId,
                name: this.name,
                linkId: linkId
            }).then(function (result) {
                angular.extend(self, BaseFile.parseFile(this.fileType, result));
                delay.resolve(self);
            }).fail(function (err) {
                delay.reject(err);
            });
            return delay.promise;
        },

        viewFile: function (linkId) {
            var self = this,
                delay = $q.defer();

            var data = linkId ? {linkId: linkId} : {};

            this.converting = true;
            var viewType = constants.isPdfType(this.type) ? 'pdf' : 'html';

            NodeRest.file.viewFile(this.fileType, this.fileId, viewType, data).then(function (result) {
                log.debug(tag, "viewFile: result:", result);
                if (result.msg === 'OK') {
                    self.converting = false;
                    self.convStatus = 3;
                    delay.resolve(result);
                } else {
                    delay.reject();
                }
            }).fail(function () {
                delay.reject();
            });
            return delay.promise;
        },

        filePreview: function (type) {
            var self = this,
                delay = $q.defer();

            FileRest.file.view({
                viewType: type,
                fileId: this.fileId,
                fileType: this.fileType
            }).then(function (result) {
                self.fileUrl = result.fileUrl;
                delay.resolve(result);
            }).fail(function (err) {
                $log.debug('filePreview err', err);
                delay.reject(err);
            });

            return delay.promise;
        },

        saveFile: function () {
            var self = this,
                delay = $q.defer();

            FileRest.file.save({
                fileId: this.fileId,
                folderId: this.parentId,
                name: this.name,
                content: this.content,
                version: this.version,
                fileType: this.fileType
            }).then(function (result) {
                self.reload();
                delay.resolve(result);
            }).fail(function (err) {
                $log.debug('saveFile err', err);
                delay.reject(err);
            });

            return delay.promise;
        },

        isRoot: function () {
            return this.fileId === -1;
        },

        getViewType: function () {
            return constants.getViewType(this.type);
        }
    };

    BaseFile.parseFile = function (fileType, attrs) {
        return fileType === 'sharedik' ? BaseFile.parseEntFile(attrs) : BaseFile.parsePersonFile(attrs);
    };

    BaseFile.parsePersonFile = function (attrs) {
        attrs = attrs || {};
        attrs.name = attrs.name || attrs.fileName;

        return {
            fileType: 'onlinedisk',
            name: attrs.name,
            type: attrs.folder ? 'folder' : constants.getFileSuffix(attrs.name),
            guid: attrs.fileGuid,
            size: attrs.fileSize,
            entId: attrs.entId,
            userId: attrs.userId,
            fileId: attrs.fileId,
            parentId: attrs.parentId,
            isFolder: attrs.folder,
            createTime: attrs.createTime,
            md5: attrs.md5,
            path: attrs.path,
            sysFolder: attrs.sysFolder,
            updateUserName: attrs.upadteUserName,
            updateTime: attrs.updateTime,
            folder: attrs.folder,
            labels: attrs.labels,
            convStatus: attrs.convStatus,
            comments: attrs.comments,
            fileCount: attrs.fileCount,
            folderCount: attrs.folderCount,
            upadteUserName: attrs.upadteUserName,
            createrName: attrs.createrName,
        }
    };

    BaseFile.parseEntFile = function (attrs) {
        attrs = attrs || {};
        attrs.name = attrs.name || attrs.fileName;
        return {
            'fileType': 'sharedisk',
            'entId': attrs.entId,
            'userId': attrs.userId,
            'parentId': attrs.parentId,
            'fileId': attrs.fileId,
            'name': attrs.name,
            'type': attrs.folder ? 'folder' : constants.getFileSuffix(attrs.name),
            'size': attrs.fileSize,
            'guid': attrs.fileGuid,
            'version': attrs.version,
            'createTime': attrs.createTime,
            'updateTime': attrs.updateTime,
            'thumb': attrs.thumb,
            'shareLinkId': attrs.linkDTO && attrs.linkDTO.linkId,
            'lockByUserId': attrs.lockByDTO && attrs.lockByDTO.lockByUserId,    // 锁定文件的用户ID
            'lockByUser': attrs.lockByDTO && attrs.lockByDTO.lockByUser,
            'remark': attrs.remark,
            'favorite': attrs.favorite,
            'convStatus': attrs.convStatus,
            'remind': attrs.remind,
            'linkDTO': attrs.linkDTO,
            'permissionDTO': attrs.permissionDTO,
            "path": attrs.path,
            "isFolder": attrs.folder,
            "folder": attrs.folder,
            'updateUserName': attrs.upadteUserName,
            'createrName': attrs.createrName,
            'histories': attrs.histories,
            'labels': attrs.labels,
            'comments': attrs.comments,
            'fileCount': attrs.fileCount,
            'folderCount': attrs.folderCount,
            'sysFolder': attrs.sysFolder,
            'usedSize': attrs.usedSize,
            'availableSize': attrs.availableSize,
            'upadteUserName': attrs.upadteUserName,
            'maxSize': attrs.maxSize
        };
    };

    return BaseFile;
});

