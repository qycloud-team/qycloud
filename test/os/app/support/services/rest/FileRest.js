angular.module("commons.services").factory("FileRest", [
    'RestHelper',
    FileRest
]);

function FileRest(RestHelper) {
    return RestHelper.publish({

        files: {
            uri: "/sc/files",
            post: true,

            remove: ["post", "/sc/files/delete"],

            move: ["post", "/sc/files/move"],

            copy: ["post", "/sc/files/copy"],

            updateLabels: ["post", "/sc/files/label"],

            zip: ['post', '/sc/files/zip']
        },

        file: {
            uri: "/sc/file",
            get: true,
            remove: true,

            getFileInfo: ["get", "/sc/file/info"],

            updateFileInfo: ["put", "/sc/file/info"],

            move: ["post", "/sc/file/move"],

            rename: ["post", "/sc/file/rename"],

            lock: ["put", "/sc/file/lock"],

            unlock: ["remove", "/sc/file/lock"],

            updateLabel: ["post", "/sc/file/label"],

            save: ["post", "/sc/file/save"],

            view: ["post", "/sc/file/view"],

            download: ["get", "/sc/file/download"],

            /**取文件历史记录*/
            getHistories: ["get", "/sc/file/histories"],

            /**取历史版本更新明细*/
            getHistory: ["get", "/sc/file/history"],

            restoreHistory: ["post", "/sc/file/history"],

            emptyHistory: ["remove", "/sc/file/history"],

            highSearch: ["post", "/sc/file/search"],

            fullTextSearch: ["post", "/sc/file/fulltext"],

            /**取所有父文件夹和自身信息*/
            getParents: ["get", "/sc/file/parents"],

            /**取企业文件夹的父文件夹和子文件夹id*/
            getParentsandSub: ["get", "/sc/file/parentsandsub"],

            /**取系统文件夹*/
            getSysFolder: ["get", "/sc/file/sysfolder"]
        },

        folders: {
            uri: "/sc/folders",
            get: true,
            post: true
        },

        folder: {
            getComplexFolder: ["get", "/sc/folder/complex"],

            getComeplexFileAndFolder: ["post", "/sc/folder/complex"],

            getFolderMaxSize: ['get', 'sc/file/availablemaxsize']
        },

        pictures: {
            uri: "/sc/pictures",
            post: true
        },

        labels: {
            uri: "/sc/labels",
            get: true,
            post: true
        },

        label: {
            uri: "/sc/label",
            remove: true,
            post: true
        },

        comments: {
            uri: "/sc/file/comments",
            get: true,
            post: true
        },

        comment: {
            uri: "/sc/file/comment",
            post: true,
            put: true,
            remove: true
        },

        linkFiles: {
            uri: "/sc/links",
            post: true,
            remove: ["post", "/sc/links/delete"]
        },

        linkFile: {
            uri: "/sc/link",
            get: true,
            post: true,
            put: true,
            remove: true,

            send: ["put", "/sc/link/send"],

            getLinkInfo: ["get", "/pub/link/info"]
        },

        remindFiles: {
            uri: "/sc/reminds",
            post: true,
            put: true,
            remove: ["post", "/sc/reminds/delete"]
        },

        remindFile: {
            uri: "/sc/remind",
            put: true,
            remove: true,

            /**取关注更新*/
            getRemindHistory: ["get", "/sc/remind/history"]
        },

        recycleFiles: {
            uri: "/sc/recyclefiles",
            post: true,
            put: true,

            remove: ["post", "/sc/recyclefiles/delete"],

            empty: ["remove", "/sc/recyclefiles/all"]
        },

        recycleFile: {
            uri: "/sc/recyclefile",
            put: true,
            remove: true
        },

        /**取有权限同步的企业文件夹list*/
        syncFolders: {
            uri: "/sc/file/syncfolders",
            get: true
        }
    })
}