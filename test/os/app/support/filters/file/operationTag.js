angular.module("commons.filters").filter("operationTag", [
    '$translate',
    operationTag
]);

function operationTag($translate) {

    return function (operation, module) {

        function entdisk(operation) {
            switch (operation) {
                case 'Upload':
                    return '上传文件';
                case 'Download':
                    return '下载';
                case 'DeleteToRecycle':
                    return '删除到回收站';
                case 'Move':
                    return '移动';
                case 'Create':
                    return '新建';
                case 'Preview':
                    return '预览';
                case 'Rename':
                    return '重命名';
                case 'EditFile':
                    return '在线编辑文件';
                case 'SetRemark':
                    return '设置备注';
                case 'DeleteFromRecycle':
                    return '从回收站删除';
                case 'RestoreFromRecycle':
                    return '从回收站恢复';
                case 'RestoreVersion':
                    return '恢复版本';
                case 'LockFile':
                    return '锁定文件';
                case 'UnlockFile':
                    return '解锁文件';
                case 'UpdateFileInfo':
                    return '修改';
                case 'UpdateFolderPermission':
                    return '修改文件夹权限';
                case 'Backup':
                    return '备份';
                case 'RenameFolder':
                case  'RenameFile':
                    return '重命名';
                case 'UploadFile' :
                    return '上传';
                case 'Delete':
                    return '删除';
                case 'NewFolder':
                    return '新建文件夹';
                case 'NewFile':
                    return '新建文件';
            }
            return '';
        }

        function entlink(operation) {
            switch (operation) {
                case 'CreateLink':
                    return '创建外链';
                case 'UpdateLink':
                    return '修改外链';
                case 'DeleteLink':
                    return '删除外链';
                case 'Download':
                    return '下载';
                case 'Preview':
                    return '预览';
                case 'Visit':
                    return '访问';
            }
            return '';
        }

        function user(operation) {
            switch (operation) {
                case 'Logon':
                    return '登录';
                case 'CreateUser':
                    return '新建账号';
                case 'UpdateUserPermission':
                    return '修改用户权限';
                case 'ChangeUserPwd':
                    return '修改用户登录密码';
                case 'UpdateUserInfo':
                    return '修改用户信息';
                case 'MoveUser':
                    return '更换部门';
                case 'LockUser':
                    return '锁定用户';
                case 'UnlockUser':
                    return '解锁用户';
                case 'DeleteUser':
                    return '删除用户';
                case 'UpdateUserDisk':
                    return '修改个人文件夹设置';
                case 'CreateDept':
                    return '新建部门';
                case 'RenameDept':
                    return '重命名部门';
                case 'DeleteDept':
                    return '删除部门';
                case 'UpdateDeptOrder':
                    return '修改部门排序';
                case 'UpdateDeptUser':
                    return '设置部门成员';
            }
            return null;
        }

        function enterprise(operation) {
            switch (operation) {
                case 'UpdateEntInfo':
                    return '修改企业信息';
                case 'UpdateEntLogo' :
                    return '修改企业logo';
            }
            return '';
        }

        function rolePermission(operation) {
            switch (operation) {
                case 'CreateRole':
                    return '创建角色';
                case 'UpdateRole':
                    return '修改角色';
                case 'RenameRole':
                    return '重命名角色';
                case 'DeleteRole':
                    return '删除角色';
                case 'UpdateRolePermission':
                    return '修改角色权限';
                default:
                    return '';
            }
        }

        function admin(operation) {
            switch (operation) {
                case 'CreateAdmin':
                    return '新建管理员';
                case 'UpdateAdmin':
                    return '修改管理员';
                case 'ChangeAdmin':
                    return '更换管理员';
                case 'LockAdmin':
                    return '锁定管理员';
                case 'UnlockAdmin':
                    return '解锁管理员';
                case 'DeleteAdmin':
                    return '删除管理员';
                default:
                    return '';
            }
        }

        function ldap(operation) {
            switch (operation) {
                case 'UpdateLdap':
                    return '修改域设置';
                default:
                    return '';
            }
        }

        switch (module) {
            case 'EntDisk':
                return entdisk(operation);
            case 'Link':
                return entlink(operation);
            case "User" :
                return user(operation);
            case "Enterprise":
                return enterprise(operation);
            case "Role":
                return rolePermission(operation);
            case "Admin":
                return admin(operation);
            case "Ldap":
                return ldap(operation);
            case "silde":
                return silde(operation);
            case "FileVersion":
                return FileVersion(operation);
            case "PayStatus":
                return PayStatus(operation);
        }
        log.debug("unknow operation: ", operation, ", module: ", module);
        return '未知操作';
    }
}