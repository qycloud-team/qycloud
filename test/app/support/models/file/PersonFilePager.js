angular.module("commons.models").factory("PersonFilePager", [
    '$q',
    'BasePager',
    'FileRest',
    'PersonFile',
    'constants',
    personFilePager
]);

function personFilePager($q,
                         BasePager,
                         FileRest,
                         PersonFile,
                         constants) {

    function PersonFilePager() {
        this.searchKey = undefined;
        this.folderId = undefined;
        this.total = undefined;
        this.files = [];
        this.fileType = 'onlinedisk';
        this.linkId = undefined;
    }

    PersonFilePager.prototype = new BasePager();

    angular.extend(PersonFilePager.prototype, {

        fetchPage: function () {
            var self = this,
                delay = $q.defer();

            FileRest.files.post({
                fileType: 'onlinedisk',
                folderId: this.folderId,
                searchKey: this.searchKey,
                order: {
                    orderBy: 'name'
                },
                skipResults: (this.current - 1) * this.perPage,
                maxResults: this.perPage,
                linkId: this.linkId
            }).then(function (result) {
                var files = _.map(result.files, function (file) {
                    return new PersonFile(file);
                });
                files.unshift(0, self.files.length);
                Array.prototype.splice.apply(self.files, files);

                self.total = result.resultCount;
                delay.resolve(self);
            });
            return delay.promise;
        },

        clearQuery: function () {
            this.folderId = undefined;
            this.searchKey = undefined;
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

    return PersonFilePager;
}