angular.module("commons.services").service("modal", [
    function () {
        return {
            compress: false,
            createFile: false,
            createFolder: false,
            fileproerty: false,
            shareLink: false,
            fileLabel: false,
            fileComment: false,

            zipDownload: false,

            personFolderSelector: false,
            loginBox: false, // 显示登录框,

            setPermission: false,
            selectUsers: false, // 选择用户
            setSyncFolder: false
        }
    }
]);