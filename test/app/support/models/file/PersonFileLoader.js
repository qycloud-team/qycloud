angular.module("commons.models").factory("PersonFileLoader", [
    '$q',
    '$translate',
    'FileRest',
    'constants',
    'PersonFile',
    personFileLoader
]);

function personFileLoader($q,
                          $translate,
                          FileRest,
                          constants,
                          PersonFile) {

    return {

        /**
         * 加载文件夹
         * @param folderId
         * @param callback
         */
        fetchFolder: function (folderId) {
            var delay = $q.defer();

            FileRest.files.post({
                fileType: 'onlinedisk',
                folderId: folderId,
                order: {
                    orderBy: 'name'
                }
            }).then(function (result) {
                var personFiles = _.map(_.filter(result.files, function (file) {
                    return file.folder
                }), function (file) {
                    return new PersonFile(file);
                });
                delay.resolve(personFiles);
            });
            return delay.promise;
        }
    }
}