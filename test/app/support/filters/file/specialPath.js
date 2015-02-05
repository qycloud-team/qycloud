angular.module("commons.filters").filter("specialPath", [
    '$translate',
    function ($translate) {
        return function (path, fileType) {
            fileType = fileType || 'sharedisk';
            var entPaths = {
                'Share': $translate("msgShareFolder"),
                'share': $translate("msgShareFolder")
            };

            var personPaths = {
                'My documents': $translate("msgMyDoc"),
                'My pictures': $translate("msgMyPic"),
                'Received files': $translate("msgReceiveFiles"),
                'Send files': $translate("msgSendFiles"),
                'My device': $translate("msgMyDevice")
            };

            if (!path || !path.length) {
                return '-';
            }

            switch (fileType) {
                case 'sharedisk':
                    var key, val;
                    val = _.find(entPaths, function (entPath, entKey) {
                        key = entKey;
                        return path === '/' + entKey || _.startsWith(path, "/" + entKey + "/");
                    });
                    return val && key ? path.replace("/" + key, "/" + val) : path;
                case 'onlinedisk':
                    var key, val;
                    val = _.find(personPaths, function (personPath, personKey) {
                        key = personKey;
                        return path === '/' + personKey || _.startsWith(path, "/" + personKey + "/");
                    });
                    return val && key ? path.replace("/" + key, "/" + val) : path;
            }
        }
    }
]);