var tag = "DownloadBean::";

angular.module("commons.models").service("DownloadBean", [
    '$log',
    '$q',
    '$filter',
    'FileRest',
    Creator
]);

function Creator($log, $q, $filter, FileRest) {

    function DownloadBean(currentFolder, files, linkId) {
        this.currentFolder = currentFolder;
        this.files = files;
        this.linkId = linkId;
        log.debug(tag, "currentFolder: ", currentFolder, ", files: ", files, ", linkId: ", linkId);
        this.status = 'zipping';  // zipping success error
        this.error = undefined;
        this.downloadUrl = undefined;
        this.fileType = undefined;

        if (this.currentFolder) {
            this.userId = this.currentFolder.userId;
            this.entId = this.currentFolder.entId;
        } else {
            var firstFile = this.files[0];
            this.userId = firstFile.userId;
            this.entId = firstFile.entId;
        }

    }

    DownloadBean.prototype = {
        constructor: DownloadBean,

        zipFiles: function () {
            var self = this,
                delay = $q.defer(),
                param = {fileType: this.fileType};

            if (this.files.length === 1) {
                var selectFolder = this.files[0];
                param.folderName = $filter("specialName")(selectFolder.name, selectFolder.fileType);
                param.folderIds = [param.folderId];
            } else {
                param.folderName = $filter("specialName")(this.currentFolder.name, this.currentFolder.fileType);

                var fileGrp = _.groupBy(this.files, function (file) {
                    return file.isFolder ? 'folder' : 'file';
                });
                param.folderIds = _.pluck(fileGrp['folder'], 'fileId');
                param.fileIds = _.pluck(fileGrp['file'], "fileId");
            }
            if (this.linkId)
                param.linkId = this.linkId;

            $log.debug("download param: ", param);
            FileRest.files.zip(param, {timeout: 60000}).then(function (result) {
                $log.debug(tag, "zip files result: ", result);

                var downloadParam = {
                    ei: self.entId,
                    ui: self.userId,
                    path: result
                };
                if (self.linkId) {
                    downloadParam.li = self.linkId;
                }
                self.downloadUrl = "/os/fm/sc/download/zipfile?" + $.param(downloadParam);
                delay.resolve(self);
            }).fail(delay.reject);
            return delay.promise;
        }
    };

    return DownloadBean;
}