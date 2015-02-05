angular.module("commons.models").service("EntFilePager", [
    '$q',
    '$log',
    'noty',
    'ErrorType',
    'FileRest',
    'EntFile',
    'BasePager',
    'constants',
    entFileCreator
]);
function entFileCreator($q,
                        $log,
                        noty,
                        ErrorType,
                        FileRest,
                        EntFile,
                        BasePager,
                        constants) {
    function EntFilePager() {
        this.searchKey = undefined;
        this.folderId = undefined;
        this.total = undefined;
        this.files = [];
        this.fileType = "sharedisk";
        this.linkId = undefined;
    }

    EntFilePager.prototype = new BasePager();

    angular.extend(EntFilePager.prototype, {

        fetchPage: function () {
            var delay = $q.defer(),
                self = this;
            FileRest.files.post({
                fileType: 'sharedisk',
                searchKey: this.searchKey,
                folderId: this.folderId,
                linkId: this.linkId,
                order: {
                    orderBy: 'name'
                },
                skipResults: (this.current - 1) * this.perPage,
                maxResults: this.perPage
            }).then(function (result) {
                var files = _.map(result.files, function (file) {
                    return new EntFile(file);
                });
                //Array.prototype.splice.apply(self.files, [0, $scope.fileMsgs.length].concat(files));
                files.unshift(0, self.files.length);
                Array.prototype.splice.apply(self.files, files);

                self.total = result.resultCount;
                delay.resolve(self);
            });
            return delay.promise;
        },

        clearQuery: function () {
            this.searchKey = undefined;
            this.folderId = undefined;
            this.total = undefined;
            return this;
        },

        remove: function (files) {
            var self = this;
            var filesParam = _.map(files, function (file) {
                return _.pick(file, 'fileId', 'version', 'fileType');
            });
            FileRest.files.remove({
                fileType: this.fileType,
                files: filesParam
            }).then(function () {
                self.fetchPage();
            }).fail(function (err) {
                noty.alert(ErrorType.showDeleteFileError(err));
            });
        },

        followFiles: function (files, isFollow) {
            var self = this;
            var action = isFollow ? 'put' : 'remove';
            var fileIds = _.pluck(files, 'fileId');
            FileRest.remindFiles[action]({
                fileIds: fileIds,
                fileType: this.fileType
            }).then(function () {
                _.each(self.files, function (file) {
                    if (_.contains(fileIds, file.fileId)) {
                        file.remind = isFollow;
                    }
                });
            }).fail(function (err) {
                noty.alert(ErrorType.followFileError(err));
            });
        },

        download: function (files) {
            if (files.length > 1 || files[0].folder) {
                return
            }
            if (files.length == 1 && !files[0].folder) {
                constants.executeFileDownload(files[0]);
                return;
            }
        },

        reset: function (items) {
            var files = [];
            if (_.isArray(arguments[0])) {
                files = items;
            } else {
                files = Array.prototype.slice.call(arguments, 0);
            }
            this.current = 1;
            Array.prototype.splice.apply(this.files, [0, this.files.length].concat(files));
            this.total = this.files.length;
        }
    });

    return EntFilePager;
}
