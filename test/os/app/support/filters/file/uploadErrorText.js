angular.module("commons.filters").filter("uploadErrorText", [
    'ErrorType',
    function (ErrorType) {
        return function (status) {
            switch (status) {
                case ErrorType.errorSameFile:
                    return "文件名重复";
                case ErrorType.errorNoSpace:
                    return "网盘空间不足";
                case ErrorType.errorFolderSpaceOver:
                    return "文件夹空间不足";
                case ErrorType.errorFolderDeleted:
                    return "文件夹已被删除";
                case ErrorType.errorCheckToken:
                case ErrorType.error500:
                default:
                    return "网络错误";
                    break;
            }
        }
    }
]);