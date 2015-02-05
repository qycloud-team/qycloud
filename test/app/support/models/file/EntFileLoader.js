angular.module("commons.models").factory("EntFileLoader", [
    '$q',
    'EntFile',
    'AdminRest',
    'FileRest',
    entFileLoader
]);

function entFileLoader($q,
                       EntFile,
                       AdminRest,
                       FileRest) {

    return {

        fetchAdminFolders: function (folderId) {
            var delay = $q.defer();

            AdminRest.folders.get({
                'type': 'sharedisk',
                'fileid': folderId
            }).then(function (result) {
                delay.resolve(_.map(result.files, function (folder) {
                    return new EntFile(folder);
                }));
            });

            return delay.promise;
        },

        /**
         * 加载根文件夹下的文件夹
         */
        fetchRootFolder: function () {
            var delay = $q.defer();

            FileRest.folder.get({
                'type': 'sharedisk'
            }).then(function (result) {
                delay.resolve(_.map(result.files, function (file) {
                    return new EntFile(file);
                }));
            });
            return delay.promise;
        },

        /**
         * 加载文件夹
         * @param folderId
         * @param callback
         */
        fetchFolder: function (folderId) {
            var delay = $q.defer();

            FileRest.folder.get({
                'type': 'sharedisk',
                'fileid': folderId
            }).then(function (result) {
                delay.resolve(_.map(result.files, function (file) {
                    return new EntFile(file);
                }));
            });
            return delay.promise;
        }
    }
}