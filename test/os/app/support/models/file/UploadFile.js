angular.module("commons.models").service("UploadFile", [
    '$q',
    'NodeRest',
    'ErrorType',
    Creator
]);

function Creator($q, NodeRest, ErrorType) {

    function UploadFile(attrs) {
        this.id = undefined;
        this.name = undefined;
        this.size = undefined;
        this.ext = undefined;
        this.status = undefined; // init, checking, wait, upload, success, error*
        this.statusText = undefined;
        this.fileType = undefined;

        this.queueFile = undefined; // 上传组件队列中文件,

        attrs && angular.extend(this, UploadFile.parse(attrs));
    }

    UploadFile.parse = function (baiduFile) {
        return {
            id: baiduFile.id,
            name: baiduFile.name,
            size: baiduFile.size,
            statusText: baiduFile.statusText,
            ext: baiduFile.ext
        }
    };

    UploadFile.prototype = {
        constructor: UploadFile,


        checkUpload: function () {
            return NodeRest.file.checkUpload({
                fileType: this.fileType,
                folderId: this.parentId,
                name: this.name,
                size: this.size,
                fileMd5: this.fileMd5
            });
        },

        isComplete: function () {
            return this.status === 'success' || _.startsWith(this.status, 'error');
        },

        isEntDisk: function () {
            return this.fileType === 'sharedisk';
        },

        getStatusText: function () {
            switch (this.status) {
                case ErrorType.errorSameFile:
                    return "文件名重复";
                case ErrorType.errorNoSpace:
                    return "网盘空间不足";
                case ErrorType.errorFolderSpaceOver:
                    return "文件夹空间不足";
                case ErrorType.errorFolderDeleted:
                    return "文件夹已被删除";
                case ErrorType.errorNoPermission:
                    return "无权上传文件";
                case ErrorType.errorCheckToken:
                case ErrorType.error500:
                default:
                    return "网络错误";
                    break;
            }
        },
    };

    return UploadFile;
}