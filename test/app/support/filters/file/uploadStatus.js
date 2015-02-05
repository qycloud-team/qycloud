angular.module("commons.filters").filter("uploadStatus", [
    '$translate',
    function ($translate) {
        return function (status) {
            switch (status) {
                case 'init':
                    return "初始化";
                case 'wait':
                    return $translate('msg1204');
                case 'uploading':
                    return $translate('msg787');
                case 'pause':
                    return $translate('msg781');
                case 'success':
                    return $translate('msg779');
                case 'error':
                    return $translate('msg1205');
                case 'errorNetwork':
                    return $translate('msgNetError');
                case 'errorNoSpace':
                    return $translate('msgDiskSizeFull');
                case "errorFolderSpaceOver":
                    return $translate('msgFolderOverflow');
                case "errorFolderDeleted":
                    return $translate('msgFolderDeleted');
                case 'errorSameFile':
                    return $translate('msgUploadSameName');
                default:
                    return $translate('msg1205');
            }
        }
    }
]);