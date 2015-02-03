angular.module("commons.services").factory("AdminRest", [
    'RestHelper',
    AdminRest
]);

function AdminRest(RestHelper) {
    return RestHelper.publish({

        serviceInfo: {
            uri: "/sc/admin/serviceinfo",
            get: true
        },

        entInfo: {
            uri: "/sc/admin/entinfo",
            get: true,
            put: true
        },

        depts: {
            uri: "/sc/admin/depts",
            get: true,
            post: true,
            put: true, // order depts
            order: ["put", "/sc/admin/depts"]
        },

        dept: {
            uri: "/sc/admin/dept",
            get: true,
            put: true,
            remove: true
        },

        users: {
            uri: "/sc/admin/users",
            get: true,
            post: true,

            deleteUsers: ["post", "/sc/admin/users/delete"],

            lock: ["post", "/sc/admin/users/lock"],

            unlock: ["post", "/sc/admin/users/unlock"],

            move: ["post", "/sc/admin/users/move"],

            setDiskSize: ["put", "/sc/admin/users/disk"],

            // never used
            importUser: ["post", "/pub/admin/users/import"],

            getImportStatus: ["get", "/pub/admin/users/import"]
        },

        userPermission: {
            uri: "/sc/admin/user/permission",
            get: true,
            put: true
        },

        user: {
            uri: "/sc/admin/user",
            put: true,
            remove: true,

            lock: ["put", "/sc/admin/user/lock"],

            unlock: ["remove", "/sc/admin/user/lock"],

            move: ["put", "/sc/admin/user/move"],

            setDiskSize: ["put", "/sc/admin/user/disk"],

            getPermission: ["get", "/sc/admin/user/permission"],

            updatePermission: ["put", "/sc/admin/user/permission"],

            deletePermission: ["remove", "/sc/admin/user/permission"],

            resetPwd: ["post", "/sc/admin/user/resetUsersPwd"],

            sendActiveMsg: ["post", "/sc/admin/user/activemsg"]
        },

        admins: {
            uri: "/sc/admin/admins",
            post: true,
            remove: ["post", "/sc/admin/admins/delete"]
        },


        roles: {
            uri: "/sc/admin/roles",
            get: true,
            post: true,
            remove: ["post", "/sc/admin/roles/delete"]
        },

        role: {
            uri: "/sc/admin/role",
            get: true,
            put: true,
            remove: true
        },

        groups: {
            uri: "/sc/admin/groups",
            get: true
        },

        syncFolders: {
            uri: "/sc/admin/syncfolders",
            get: true,
            post: true,

            remove: ["post", "/sc/admin/syncfolders/delete"]
        },

        syncFolder: {
            uri: "/sc/admin/syncfolder",
            get: true,
            put: true,
            remove: true
        },

        recycleFiles: {
            uri: "/sc/admin/recyclefiles",
            put: true,
            post: true,

            deleteFiles: ["post", "/sc/admin/recyclefiles/delete"],

            restoreAll: ["put", "/sc/admin/recyclefiles/all"],

            empty: ["remove", "/sc/admin/recyclefiles/all"]
        },

        recycleFile: {
            uri: "/sc/admin/recyclefile",
            put: true,
            remove: true
        },

        operateLogs: {
            uri: "/sc/admin/operationlog",
            post: true,

            download: ["get", "/sc/admin/operationlog"],

            exportLog: ["post", "/sc/admin/operationlog/export"],

            getExportStatus: ["get", "/sc/admin/operationlog/export"]
        },


        chatLogs: {
            uri: "/sc/admin/chatlog",
            post: true,
            get: true,

            getChatUsers: ["get", "/sc/admin/chatlog/users"],

            exportLog: ["post", "/sc/admin/chatlog/export"],

            getExportStatus: ["get", "/sc/admin/chatlog/export"]
        },

        versionConfig: {
            uri: "/sc/admin/historyconfig",
            get: true,
            put: true
        },

        ldapConfig: {
            uri: "/sc/admin/ldapconfig",
            get: true,
            put: true,

            test: ["post", "/sc/admin/ldapconfig/test"]
        },

        mailConfig: {
            uri: "/sc/admin/mailconfig",
            get: true,
            put: true
        },

        folders: {
            uri: "/sc/admin/folders",
            get: true


        },

        folder: {
            getFolderPermission: ["get", "/sc/admin/folder/permission"],

            updatePermission: ["put", "/sc/admin/folder/permission"]
        },

        hides: {
            uri: "/sc/admin/hides",
            get: true
        },

        hide: {
            uri: "/sc/admin/hide",
            get: true,
            post: true,
            remove: true
        }
    });
}