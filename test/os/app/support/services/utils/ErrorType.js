angular.module("commons.services").factory("ErrorType", [
    '$translate',
    ErrorType
]);

function ErrorType($translate) {
    return {
        OK: "OK",
        OK_MARK: "OK",
        error404: 'error404',
        error500: 'error500',
        errorFileQueue: "errorFileQueue",
        errorConvertFail: "errorConvertFail",
        errorCheckToken: 'errorCheckToken',
        errorTokenNotExists: 'errorTokenNotExists',
        errorRequestData: 'errorRequestData',
        errorCheckHashkey: 'errorCheckHashkey',
        errorWrongAccount: 'errorWrongAccount',
        errorWrongPWD: 'errorWrongPWD',
        errorWrongOldPWD: 'errorWrongOldPWD',
        errorConnotSameBuddy: 'errorConnotSameBuddy',
        errorInactive: 'errorInactive',
        errorAlreadyActivated: 'errorAlreadyActivated',
        errorCreateFriedGroup: 'errorCreateFriedGroup',
        errorFriendAlreadyExist: 'errorFriendAlreadyExist',
        errorSameFile: 'errorSameFile',
        errorSameFolder: 'errorSameFolder',
        errorMoveToSubFolder: 'errorMoveToSubFolder',
        errorNoSpace: 'errorNoSpace',
        errorUserIsOffline: 'errorUserIsOffline',
        errorConlectIsExist: 'errorConlectIsExist',
        errorNullOfGroup: 'errorNullOfGroup',
        errorExitMemeber: 'errorExitMemeber',
        errorUserNoOver: 'errorUserNoOver',
        errorUserAlreadyExist: 'errorUserAlreadyExist',
        errorEnterpriseNotExist: 'errorEnterpriseNotExist',
        errorWrongEnterpriseName: 'errorWrongEnterpriseName',
        errorEmployeeAlreadyExist: 'errorEmployeeAlreadyExist',
        errorInvalidProductKey: 'errorInvalidProductKey',
        errorEnterpriseAlreadyExist: 'errorEnterpriseAlreadyExist',
        errorFileNotFound: 'errorFileNotFound',

        errorFileLocked: 'errorFileLocked',
        errorNoPermission: 'errorNoPermission',
        errorUserLocked: 'errorUserLocked',
        errorNotSupported: 'errorNotSupported',
        errorMQDisconnected: 'errorMQDisconnected',
        errorFolderSpaceOver: 'errorFolderSpaceOver',
        errorProductKeyFree: 'errorProductKeyFree',
        errorAccountExpired: 'errorAccountExpired',
        errorConferenceMemberOver: 'errorConferenceMemberOver',
        errorDownCountOver: 'errorDownCountOver',
        errorFlowOver: 'errorFlowOver',
        errorExpirationTimeOver: 'errorExpirationTimeOver',
        errorDiskUsedOver: 'errorDiskUsedOver',
        errorFreeCode: 'errorFreeCode',
        errorTodayApplyOver: 'errorTodayApplyOver',
        errorFolderMaxSize: 'errorFolderMaxSize',
        errorNoParentMaxSize: 'errorNoParentMaxSize',
        errorMoveToOwn: 'errorMoveToOwn',

        /**
         * 个人网盘关闭
         */
        errorPersonalDiskDisabled: 'errorPersonalDiskDisabled',

        /**
         * 版本冲突
         */
        errorVersionConflict: 'errorVersionConflict',
        /** 注册审核中 */
        errorAuditing: 'errorAuditing',
        /**
         * 企业服务已停止
         */
        errorAuditFail: 'errorAuditFail',
        errorSameName: 'errorSameName',
        /**
         * ldap中不存在该用户
         */
        errorUserNoExistInLdap: 'errorUserNoExistInLdap',
        /**
         * 域用户名或密码错误
         */
        errorWrongLDAPAccount: 'errorWrongLDAPAccount',
        /**
         * 域用户已经被锁定
         */
        errorLDAPUserLocked: 'errorLDAPUserLocked',
        /**
         * 购买的增值服务已经到期
         */
        errorPayExpired: 'errorPayExpired',
        /** 企业网盘空间大于免费空间 */
        errorEntDiskGreetThanFreeSize: 'errorEntDiskGreetThanFreeSize',
        /**
         * 订单不存在
         */
        errorOrderNotExist: 'errorOrderNotExist',
        /**
         * 个人网盘空间超出异常
         */
        errorPersonDiskOverflow: 'errorPersonDiskOverflow',
        /**
         * 个人网盘已使用空间超出了分配的大小
         */
        errorPersonDiskUsedExceedAllocSize: 'errorPersonDiskUsedExceedAllocSize',
        /**
         * 当部门员工存在时, 删除部门错误
         */
        errorDeleteDepartUserExist: 'errorDeleteDepartUserExist',
        /**
         * 文件夹已经被删除
         */
        errorFolderDeleted: 'errorFolderDeleted',
        /**
         * 文件已被删除错误
         */
        errorFileDeleted: 'errorFileDeleted',
        errorEditSysFolder: 'errorEditSysFolder',

        errorAdminExists: 'errorAdminExists',
        /**
         * 已经有压缩文件任务正在执行中
         */
        errorZipTaskRunning: "errorZipTaskRunning",
        /**
         * 文件正在压缩中
         */
        errorFileIsZipping: "errorFileIsZipping",
        /**
         * 云电话选号失败 号码已经被使用或号码只能是电信天翼手机号或者固话
         */
        errorChooseIms: "errorChooseIms",

        /**
         *  该邮箱已经存在
         */
        errorAccountUsed: 'errorAccountUsed',
        /**
         * 验证码错误
         */
        errorValidationCode: 'errorValidationCode',

        /**
         * 请等待, 发送验证码中重复发送报错
         */
        errorWaiting: 'errorWaiting',
        /**
         * 压缩的文件夹中没有文件
         */
        errorZipNoFiles: 'errorZipNoFiles',

        /** 压缩的文件大于规定的1G最大值*/
        errorZipMaxSize: 'errorZipMaxSize',

        errorUserNotActive: "errorUserNotActive",
        // 用户已被删除
        errorUserDeleted: "errorUserDeleted",
        /**
         * 邀请会议主持人失败
         */
        errorInviteChairman: 'errorInviteChairman',

        /**
         * 用户未认证
         */
        errorNotAuthed: 'errorNotAuthed',

        /**
         * 邮件发送超出限制
         */
        errorMailOver: "errorMailOver",

        /**
         * 浏览图片文件错误处理
         * @param error
         * @returns {msgServerError|*}
         */
        viewFileAsImgError: function (error) {
            var msg = $translate('msgServerError');
            switch (error) {
                case this.errorFileNotFound:
                    msg = $translate('msg1200');
                    break;
                case this.errorNoPermission:
                    msg = $translate('msgNoPermission2');
                    break;
                case this.errorFileDeleted:
                    msg = $translate('msgAttFileNoExist');
                    break;
                default:
                    msg = $translate('msgServerError');
                    break;
            }
            return msg;
        },

        /**
         * 更新文件错误处理
         * @param error
         * @returns {msgServerError|*}
         */
        updateFileInfoError: function (error) {
            var msg = $translate('msgServerError');
            switch (error) {
                case this.errorNoPermission:
                    msg = $translate('msgNoPermission');
                    break;
                case this.errorFileLocked:
                    msg = $translate('msgFileIsLock');
                    break;
                case this.errorVersionConflict:
                    msg = $translate('msgFileVerConflict');
                    break;
                case this.errorDiskUsedOver:
                    msg = $translate('msgServerError');
                    break;
                case this.errorNoSpace:
                    msg = $translate('msgDiskSizeLack');
                    break;
                case this.errorSameFolder:
                    msg = $translate('msgFolderSaveConflict');
                    break;
                case this.errorSameFile:
                    msg = $translate('msgFileConflict');
                    break;
                case this.errorRequestData:
                    msg = $translate('msgRequestDataError');
                    break;
                case this.errorFolderMaxSize:
                    msg = $translate('msgErrorFolderMaxSize');
                    break;
                case this.errorNoParentMaxSize:
                    msg = $translate('msgErrorNoParentMaxSize');
                    break;
                default:
                    msg = $translate('msgServerError');
                    break;
            }
            return msg;
        },

        /**
         * 预览html/text文件错误处理
         * @param error
         * @returns {msgServerError|*}
         */
        viewAsTxtError: function (error) {
            var msg = $translate('msgServerError');
            switch (error) {
                case this.errorNotSupported:
                    msg = $translate('msgReadUnsupport');
                    break;
                case this.errorFileNotFound:
                    msg = $translate('msgFileNoExist');
                    break;
                case this.errorNoPermission:
                    msg = $translate('msgNoPermission');
                    break;
                default:
                    msg = $translate('msgServerError');
                    break;
            }
            return msg;
        },

        /**
         * 注册完成服务错误处理
         * @param error
         * @returns {msgServerError|*}
         */
        registerDoneError: function (error) {
            var msg = $translate('msgServerError');
            switch (error) {
                case this.errorAccountUsed:
                    msg = $translate('msgAccountUsed');
                    break;
                case this.errorEnterpriseAlreadyExist:
                    msg = $translate('msgEntNameUsed');
                    break;
                default:
                    msg = $translate('msgServerError');
                    break;
            }
            return msg;
        },

        /**
         * 恢复文件(夹)版本错误处理
         * @param error
         * @returns {msgServerError|*}
         */
        restoreFileVersionError: function (error) {
            var msg = $translate('msgServerError');
            switch (error) {
                case this.errorFolderDeleted:
                    msg = $translate('msgFolderDeleted');
                    break;
                case this.errorSameFile:
                    msg = $translate('msgFileConflict');
                    break;
                case this.errorSameFolder:
                    msg = $translate("msgFolderSaveConflict");
                    break;
                case this.error500:
                default:
                    msg = $translate('msgServerError');
                    break;
            }
            return msg;
        },

        /**
         * 还原回收站文件错误提示
         * @param result
         * @returns {*}
         */
        restoreAdminFilesError: function (result) {
            var errMsg = $translate("msgServerError");
            switch (result) {
                case this.errorNoPermission:
                    errMsg = $translate("msgNoPermission2");
                    break;
                case this.errorVersionConflict:
                    errMsg = $translate("msgFileVerConflict");
                    break;
                case this.errorSameFile:
                    errMsg = $translate("msgRecycleFileConflict");
                    break;
                case this.errorSameFolder:
                    errMsg = $translate("msgRecycleFolderConflict");
                    break;
                case this.errorNoSpace:
                    errMsg = $translate("msgDiskSizeLack");
                    break;
                case this.errorFolderSpaceOver:
                    errMsg = $translate("msgFolderSpaceOver");
                    break;
                case "errorFolderDeleted":
                    errMsg = $translate("msgRestoreFolderDel");
                    break;
                default:
                    errMsg = $translate("msgServerError");
                    break;
            }
            return errMsg;
        },

        deleteAdminRecycleFilesError: function (result) {
            var errMsg = $translate('msgServerError');
            switch (result) {
                case this.errorNoPermission:
                    errMsg = $translate('msgNoPermission');
                    break;
                case this.errorVersionConflict:
                    errMsg = $translate('msgDeleteOnVerConflict');
                    break;
                default:
                    errMsg = $translate('msgDeleteFail');
                    break;
            }
            return errMsg;
        },

        /**
         * 复制操作的错误处理
         * @param error
         * @returns {string}
         */
        entDiskCopyError: function (error) {
            var msg = "";
            switch (error) {
                case this.errorNoPermission:
                    msg = $translate('msgNoPermission');
                    break;
                case this.errorSameFile:
                    msg = $translate('msgSameFile');
                    break;
                case this.errorSameFolder:
                    msg = $translate('msgFolderSaveConflict');
                    break;
                case this.errorNoSpace:
                    msg = $translate('msgDiskSizeLack');
                    break;
                case this.errorFolderSpaceOver:
                    msg = $translate('msgFolderSpaceOver');
                    break;
                case this.errorMoveToSubFolder:
                    msg = $translate('msgCopyErrorPath');
                    break;
                default:
                    msg = $translate('msgServerError');
                    break;
            }
            return msg;
        },

        /**
         * 创建部门错误处理
         * @param error
         * @returns {*}
         */
        createDeptError: function (error) {
            var msg;
            switch (error) {
                case this.errorSameName:
                    msg = $translate('msgDeptExisted');
                    break;
                case this.errorNoSpace:
                    msg = $translate('msgDiskLessAssign');
                    break;
                case this.errorNoParentMaxSize:
                    msg = $translate('msgErrorNoParentDeptMaxSize')
                    break;
                default:
                    msg = $translate('msgCreateFail');
            }
            return msg;
        },

        updateDeptMaxSizeError: function (error) {
            var msg = $translate('msgServerError');
            switch (error) {
                case this.errorNoPermission:
                    msg = $translate('msgNoPermission');
                    break;
                case this.errorNoSpace:
                    msg = $translate('msgDiskLessAssign');
                    break;
                case this.errorFolderMaxSize:
                    msg = $translate('msgErrorFolderMaxSize');
                    break;
                case this.errorNoParentMaxSize:
                    msg = $translate('msgErrorNoParentDeptMaxSize')
                    break;
                default:
                    break;
            }
            return msg;
        },

        /**
         * 锁定用户错误处理
         * @param error
         * @returns {msgServerError|*}
         */
        lockUserError: function (error) {
            var msg = $translate('msgServerError');
            switch (error) {
                case this.errorNoPermission:
                    msg = $translate('msgNoPermission');
                    break;
                case this.error500:
                default:
                    break;
            }
            return msg;
        },

        /**
         * 更新同步文件夹的错误处理
         */
        updateSyncFolderError: function (error) {
            var errMsg = $translate('msgServerError');
            switch (error) {
                case this.errorNoPermission:
                    errMsg = $translate('msgNoPermissonTip');
                    break;
                case this.errorFolderDeleted:
                default:
                    errMsg = $translate('msgServerError');
                    break;
            }
            return errMsg;
        },

        /**
         * 重新发送激活信息错误处理
         * @param error
         * @returns {msgServerError|*}
         */
        resendUserActiveMsgError: function (error) {
            var msg = $translate('msgServerError');
            switch (error) {
                case "errorAlreadyActived":
                    msg = $translate('msgUserActiveError');
                    break;
                case this.errorWaiting:
                    msg = $translate('msgErrorWaiting');
                    break;
                case this.error500:
                default:
                    break;
            }
            return msg;
        },

        /**
         * 创建文件夹错误处理
         * @param error
         * @returns {msgSaveFail|*}
         */
        createFolderError: function (error) {
            var msg = $translate('msgSaveFail');
            switch (error) {
                case this.errorSameFolder:
                    msg = $translate('msgFolderSaveConflict');
                    break;
                case this.errorNoPermission:
                    msg = $translate('msgNoPermission');
                    break;
                case this.errorFolderDeleted:
                    msg = $translate('msgParentFolderDeleted');
                    break;
                case this.errorNoSpace:
                    msg = $translate('msgDiskLessAssign');
                    break;
                case  this.errorPersonalDiskDisabled:
                    msg = $translate('msgPersonFolderClosed');
                    break;
                case this.errorNoParentMaxSize:
                    msg = $translate('msgErrorNoParentMaxSize');
                    break;
                default:
                    break;
            }
            return msg;
        },

        /**
         * 保存或更新文本文件的错误处理
         * @param error
         * @returns {msgServerError|*}
         */
        saveOrUpdateFileError: function (error) {
            var errMsg = $translate('msgServerError');
            switch (error) {
                case this.errorSameFile:
                    errMsg = $translate('msgFileConflict');
                    break;
                case this.errorFolderDeleted:
                    errMsg = $translate('msgCreateDestFolderDeleted');
                    break;
                case this.errorVersionConflict:
                    errMsg = $translate('msgVersionEditConflict');
                    break;
                case this.errorNoPermission:
                    errMsg = $translate('msgNoPermissonTip');
                    break;
                default:
                    errMsg = $translate('msgSysBusy');
                    break;
            }

            return errMsg;
        },

        /**
         * 返回删除文件的错误提示
         * @param result
         * @returns {*}
         * @private
         */
        adminDeleteFilesError: function (result) {
            var error = $translate('msgDeleteFail');
            switch (result) {
                case this.errorNoPermission:
                    error = $translate('msgNoPermission');
                    break;
                case this.errorVersionConflict:
                    error = $translate('msgDeleteOnVerConflict');
                    break;
                case this.error500:
                default:
                    error = $translate('msgDeleteFail');
            }
            return error;
        },

        /**
         * 登录错误处理
         * @param result
         * @returns {msgServerError|*}
         */
        loginError: function (result) {
            var error = $translate('msgServerError');
            switch (result) {
                case this.errorWrongPWD:
                    error = $translate('msgPasswordError');
                    break;
                case this.errorWrongAccount:
                    error = $translate('msgAccountErr');
                    break;
                case this.errorUserLocked:
                    error = $translate('msgAccountLocked');
                    break;
                case this.errorAuditFail:
                    error = $translate('msgServiceExpire');
                    break;
                case this.errorUserNotActive:
                    error = $translate('msgAccountNotActive');
                    break;
                case this.errorUserDeleted:
                    error = $translate('msgAccountDeleted');
                    break;
                case this.errorNotAuthed:
                    error = $translate('msgUnAuthErr');
                    break;
                case this.errorExpirationTimeOver:
                    error = $translate('msgActiveUserErr');
                    break;
            }
            return error;
        },

        /**
         * 移动文件错误信息
         * @returns {*}
         */
        moveFileError: function (error) {
            var msg = null;
            switch (error) {
                case this.errorNoPermission:
                    msg = $translate('msgNoPermission');
                    break;
                case this.errorSameFolder:
                    msg = $translate('msgMoveOnFolderConflict');
                    break;
                case this.errorSameFile:
                    msg = $translate('msgMoveOnFileConflict');
                    break;
                case this.errorMoveToSubFolder:
                    msg = $translate('msgMoveToSub');
                    break;
                case this.errorFileLocked:
                    msg = $translate('msgMoveLockFileErr');
                    break;
                case this.errorVersionConflict:
                    msg = $translate('msgMoveOnVersionConflict');
                    break;
                case this.errorFolderSpaceOver:
                    msg = $translate('msgFolderSpaceOver');
                    break;
                case this.error500:
                default:
                    msg = $translate('msgServerError');
            }
            return msg;
        },

        getLinkByCodeError: function (error) {
            var msg = null;
            switch (error) {
                case this.errorExpirationTimeOver:
                    msg = $translate('msgLinkExpire');
                    break;
                case this.errorFileNotFound:
                    msg = $translate('msg1200');
                    break;
                case this.error500:
                default:
                    msg = $translate('msgLinkNoExist');
                    break;
            }
            return msg;
        },

        createLinkError: function (error) {
            var msg = $translate('msgServerError');
            switch (error) {
                case this.errorNoPermission:
                    msg = $translate('msgNoPermission');
                    break;
                case this.errorFileDeleted:
                    msg = $translate('msgFileDeleted');
                    break;
                default:
                    msg = $translate('msgServerError');
                    break;
            }
            return msg;
        },

        showDeleteFileError: function (error) {
            var msg = "";
            switch (error) {
                case this.OK_MARK:
                    break;
                case this.errorNoPermission:
                    msg = $translate('msgNoPermission');
                    break;
                case this.errorFileLocked:
                    msg = $translate('msgDeleteLockFileErr');
                    break;
                case this.errorVersionConflict:
                    msg = $translate('msgFileVerConflict');
                    break;
                case this.error500:
                default:
                    msg = $translate('msgServerError');
                    break;
            }
            return msg;
        },

        followFileError: function (error) {
            var msg = $translate('msgServerError');
            switch (error) {
                case this.errorNoPermission:
                    msg = $translate('msgNoPermission');
                    break;
                case this.errorFileDeleted:
                    msg = $translate('msgFileDeleted');
                    break;
                default:
                    msg = $translate('msgServerError');
                    break;
            }
            return msg;
        },

        lockFileError: function (error) {
            var msg = $translate('msgServerError');
            switch (error) {
                case this.errorNoPermission:
                    msg = $translate('msgNoPermission');
                    break;
                case this.errorFileLocked:
                    msg = $translate('msgFileIsLock');
                    break;
                default:
                    msg = $translate('msgServerError');
                    break;
            }
            return msg;
        },

        saveToPersonDiskError: function (error) {
            var msg = "";
            switch (error) {
                case this.errorSameFile:
                    msg = $translate('msgSameFile');
                    break;
                case this.errorNoSpace:
                    msg = $translate('msgPersonDiskNoSpace');
                    break;
                default:
                    msg = $translate('msgSaveFail');
                    break;
            }
            return msg;
        },

        setPersonDiskSizeError: function (result) {
            var msg = $translate('msgServerError');
            switch (result) {
                case this.errorNoSpace:
                    msg = $translate("msgDiskLessAssign");
                    break;
                case this.errorDiskUsedOver:
                    msg = "个人网盘使用空间超出了当前已经使用的!";
                    break;
                default:
                    msg = $translate("msgServerError");
                    break;
            }
            return msg;
        },

        /**
         *  返回添加账号/导入用户的错误信息
         * @param result
         * @returns {msgSysAbnormal|*}
         */
        addAccountError: function (result) {
            var error = $translate("msgSysAbnormal");
            switch (result) {
                case this.errorAccountUsed:
                    error = $translate("msgAccDuplite");
                    break;
                case this.errorEnterpriseNotExist:
                    error = $translate("msgAccExisted");
                    break;
                case this.errorUserNoOver:
                    error = $translate("msgAccMunbersLimit");
                    break;
                case this.errorPayExpired:
                    error = $translate("msgEntServiceExpire");
                    break;
                case this.errorEmployeeAlreadyExist:
                    error = $translate("msgAccDuplite");
                    break;
                default:
                    error = $translate("msgServerError");
                    break;
            }
            return error;
        },

        zipFilesError: function (result) {
            var msg = $translate("msgServerError");
            switch (result) {
                case this.errorNoPermission:
                    msg = $translate('msgOpenAttNoPermission');
                    break;
                case this.errorZipTaskRunning:
                    msg = $translate('msgDownloadOnCompressing');
                    break;
                case this.errorFileIsZipping:
                    msg = $translate('msgDownloadOnLargeCompressing');
                    break;
                case this.errorZipNoFiles:
                    msg = $translate('msgZipNotFiles');
                    break;
                case this.errorZipMaxSize:
                    msg = $translate('msgZipMaxSize');
                    break;
                default:
                    msg = $translate('msgCompressFail');
                    break;
            }
            return msg;
        },

        copyFileError: function (err) {
            var msg = '';
            switch (err) {
                case this.errorNoPermission:
                    msg = $translate('msgNoPermission2');
                    break;
                case this.errorFileLocked:
                    msg = $translate('msgFileIsLock');
                    break;
                case this.errorSameFile:
                    msg = $translate('msgSameFile');
                    break;
                case this.errorSameFolder:
                    msg = $translate('msgMoveOnFolderConflict');
                    break;
                case this.errorVersionConflict:
                    msg = $translate('msgFileVerConflict');
                    break;
                case this.errorMoveToOwn:
                    msg = $translate('msgErrorCopyToOwn');
                    break;
                case this.errorMoveToSubFolder:
                    msg = $translate('msgMoveToSub');
                    break;
                case this.errorFolderSpaceOver:
                    msg = $translate('msgFolderSpaceOver');
                    break;
                case this.errorPersonalDiskDisabled:
                    msg = $translate('msgPersonFolderClosed');
                    break;
                case this.errorNoSpace:
                    msg = $translate("msgDiskLessAssign");
                    break;
                default:
                    msg = $translate('msgServerError');
                    break;
            }
            return msg;
        },

        /**
         * 导入用户失败
         * @param err
         * @returns {string}
         */
        importUserError: function (err) {
            var msg = "账号导入失败! 系统错误, 请重新尝试!";
            switch (err) {
                case 'errorAccountUsed':
                    msg = "账号导入失败! 您要导入的账号已经存在! ";
                    break;
                case 'errorTaskRunning':
                    msg = "账号导入失败! 已经存在一个导入任务正在执行, 请等待执行完成后再次导入!";
                    break;
                case 'errorUserNoOver':
                    msg = "账号导入失败! 要导入的用户数已经超出最大限制!";
                    break;
                case  'errorNoPermission':
                    msg = "账号导入失败! 没有导入的权限!";
                    break;
                case 'errorDepartmentNotExist':
                    msg = "账号导入失败! 要导入的部门不存在! ";
                    break;
                default:
                    break;
            }
            return msg;
        }
    };
}