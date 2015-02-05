angular.module("commons.filters").filter("specialName", [
    '$translate',
    function ($translate) {
        return function (fileName, fileType) {
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

            if (!fileName || !fileName.length) {
                return '-';
            }

            switch (fileType) {
                case 'sharedisk':
                    var key, val;
                    val = _.find(entPaths, function (entPath, entKey) {
                        key = entKey;
                        return fileName === entKey;
                    });
                    return val && key ? fileName.replace(key, val) : fileName;
                case 'onlinedisk':
                    var key, val;
                    val = _.find(personPaths, function (personPath, personKey) {
                        key = personKey;
                        return fileName === personKey;
                    });
                    return val && key ? fileName.replace(key, val) : fileName;
            }
        }
    }
]);