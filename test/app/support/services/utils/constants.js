angular.module("commons.services").factory("constants", [
    '$interval',
    '$translate',
    'ErrorType',
    'cache',
    constants
]);

function constants($interval,
                   $translate,
                   ErrorType,
                   cache) {
    return {
        ERROR_MARK: 'error',
        OK_MARK: 'OK',
        lang: webhelper.getLang(),
        QUEUED: "QUEUED",
        // 最多上传文件限制
        uploadFileSizeLimit: 200,
        LINK_PWD_STR: "ABCDEFGHIGKLMNPQRSTUVWXYabcdefghigkmnprstuvwxy",

        docType: ['doc', 'docx', 'wps', 'dot', 'dotx', 'odt', 'DOC', 'DOCX', 'WPS', 'DOT', 'DOTX', 'ODT'],
        excelType: ['xls', 'xlsx', 'xlt', 'csv', 'XLS', 'XLSX', 'XLT', 'CSV'],
        imgType: ['png', 'jpg', 'gif', 'jpeg', 'bmp', 'ico', 'wbmp', 'tif', 'TIF', 'PNG', 'JPG', 'GIF', 'JPEG', 'BMP', 'ICO', 'WBMP'],
        pptType: ['ppt', 'pptx', 'PPT', 'PPTX'],
        pdfType: ['pdf', 'PDF'],
        txtType: ['txt', 'TXT'],
        htmlType: ['html', 'htm', 'HTML', 'HTM'],
        mp4Type: ['mp4', 'mov', 'flv', 'webm', 'm4v', 'avi', 'ogv', 'f4v', 'wmv', 'MP4', 'MOV', 'FLV', 'WEBM', 'M4V', 'AVI', 'OGV', 'F4V', 'WMV'],
        mp3Type: ['mp3', 'aac', 'm4a', 'f4a', 'ogg', 'oga', 'MP3', 'AAC', 'M4A', 'F4A', 'OGG', 'OGA'],
        zipType: ['zip', '7z', 'war', 'tar', 'rar', 'ZIP', '7Z', 'WAR', 'TAR', 'RAR'],
        invalidType: ['exe', 'bat', 'cmd', 'EXE', 'BAT', 'CMD'],
        departIdNull: -1,

        defaultIcon: __uri("../../../../assets/img/defaultAvatar64man.png"),
        defaultWomenIcon: __uri("../../../../assets/img/defaultAvatar64woman.png"),
        defaultImgThumb: __uri("../../../../assets/img/default-img-thumb.png"),

        /** 文件默认分页值*/
        FILE_PAGE_SIZE: 50,

        pattern: {
            digits: /^\d+$/,
            integer: /^[1-9]+\d*$/,
            number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,
            email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
            url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
            Phone: /^0\d{2,3}(\-)?\d{7,8}$/,
            Mobile: /^(1(([35][\d])|(47)|[8][\d]|(70)))\d{8}$/,
            entName: /^[\u0391-\uFFE5a-zA-Z0-9][\u0391-\uFFE5a-zA-Z0-9\s\.\-]{0,48}[\u0391-\uFFE5a-zA-Z0-9\.\-]$/,
            userName: /^[\u0391-\uFFE5a-zA-Z0-9\s]{2,20}$/,
            fileName: /[\/\\:\*\?"<>\|]/,
            emailOrMobile: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))|(1(([35][\d])|(47)|[8][\d]|(70)))\d{8}$/i,
            password: /^\S{6,30}$/,
            phoneOrMobile: /(^0\d{2,3}(\-)?\d{7,8}$)|(^(1(([35][\d])|(47)|[8][\d]|(70)))\d{8}$)/
        },

        isEmail: function (str) {
            return this.pattern.email.test(str);
        },

        timeUnit: {
            year: 'year',
            month: 'month'
        },

        CallState: {
            /** 拨打失败*/
            failed: "FAILED",
            /** 正在接听*/
            answered: "ANSWERED",
            /**正在呼叫*/
            ringing: "RINGING",
            /**已经挂断*/
            disconnected: "DISCONNECTED"
        },

        permissionType: {
            user: 'user',
            department: 'department',
            group: 'group',
            admin: 'admin'
        },

        /**
         * 权限与操作字典
         */
        PermissionOperateMap: {
            'read': ['view', 'attention', 'unattention', 'property', 'label'],
            'upload': ['upload', 'create-file', 'create'],
            'download': ['download'],
            'write': ['view', 'edit', 'lock', 'unlock', 'attention', 'unattention', 'copy', 'move', 'rename', 'create', 'create-file', 'collect'],
            'share': ['share'],
            'delete': ['delete'],
            'local': ['lock', 'unlock', 'attention', 'unattention'],
            'manage': ['permission', 'sync'],
            'createFolder': ['create-folder', 'create']
        },

        /**
         * 操作按钮映射
         */
        OperateBtnMap: {
            'move': 'move-btn',
            'copy': 'copy-btn',
            'copyto': 'copyto-btn',
            'rename': 'rename-btn',
            'delete': 'delete-btn',
            'download': 'download-btn',
            'upload': 'upload-btn',
            'create-file': 'create-file',
            'create-folder': 'create-folder',
            'edit': 'edit-btn',

            'lock': 'lock-btn',
            'unlock': 'unlock-btn',
            'attention': 'attention-btn',
            'unattention': 'del-attention-btn',
            'share': 'share-btn',
            'permission': 'permission-btn',
            'sync': 'sync-btn',
            'property': 'property-btn',
            'label': 'label-btn'
        },

        /**
         * 文件权限常量
         */
        FilePermission: {
            /**
             * 可以在文件列表中看到文件夹下的子文件夹和文件，查看文件的内容
             */
            Read: 'Read',
            /**
             * 写，可以编辑文件，创建文件夹，修改文件或文件夹名字
             */
            Write: 'Write',
            /**
             * 可以下载
             */
            Download: 'Download',
            /**
             * 上传文件
             */
            Upload: 'Upload',
            /**
             * 删除子文件夹或者子文件
             */
            Delete: 'Delete',
            /**
             * 共享
             */
            Share: 'Share',
            /**
             * 本地交互
             */
            Local: 'Local',

            /**
             * 管理权限
             */
            manage: 'Manage'
        },

        /**
         * 电话会议状态
         */
        PhoneMeetingStatus: {
            /**
             *预定状态
             */
            Schedule: "Schedule",
            /**
             * 正在创建中
             */
            Creating: "Creating",
            /**
             * 会议已经创建, 并正在召开
             */
            Created: "Created",
            /**
             * 会议已经关闭
             */
            Destroyed: "Destroyed"
        },

        // 成员的会议状态
        ConferenceMemberStatus: {
            Invited: "invited",         //会议邀请中
            Accepted: "accepted",       //接受会议邀请
            Refused: 'refused',         //拒绝会议邀请
            Attended: 'attended'        //出席会议
        },

        ConferenceType: {
            appointment: 0,             //预约会议
            immediate: 1                //即时会议
        },

        ConferenceStatus: {
            Created: "new",             //未召开会议
            Held: "held",               //会议正在召开
            Ended: "ended"              //会议召开结束
        },

        // 用户在线状态
        UserStatus: {
            Online: "online",           //在线
            Busy: "busy",               //忙碌
            Corbet: "corbet",           //隐身
            Offline: "offline"              //离开
        },

        DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm',
        TIME_FORMAT: 'HH:mm:ss',

        specialFolderMap: {
            'Share': $translate("msgShareFolder"),
            'share': $translate("msgShareFolder"),
            'My documents': $translate("msgMyDoc"),
            'My pictures': $translate("msgMyPic"),
            'Received files': $translate("msgReceiveFiles"),
            'Send files': $translate("msgSendFiles")
        },

        entSpecialFolderNames: {
            'Share': $translate("msgShareFolder"),
            'share': $translate("msgShareFolder")
        },

        personSpecialFolderNames: {
            'My documents': $translate("msgMyDoc"),
            'My pictures': $translate("msgMyPic"),
            'Received files': $translate("msgReceiveFiles"),
            'Send files': $translate("msgSendFiles"),
            'My device': $translate("msgMyDevice")
        },

        entSystemFolderNames: [
            $translate("msgSimShareFolder"),
            $translate("msgTraShareFolder"),
            $translate("msgEngShareFolder")
        ],

        personSystemFolderNames: [
            $translate("msgSimMyDoc"),
            $translate("msgSimMyPic"),
            $translate("msgSimReceiveFiles"),
            $translate("msgSimSendFiles"),
            $translate("msgTraMyDoc"),
            $translate("msgTraMyPic"),
            $translate("msgTraReceiveFiles"),
            $translate("msgTraSendFiles"),
            $translate("msgEngMyDoc"),
            $translate("msgEngMyPic"),
            $translate("msgEngReceiveFiles"),
            $translate("msgEngSendFiles")
        ],

        rootFolderId: {
            entDisk: 'entRoot',
            personDisk: 'personRoot'
        },

        fileDeleteStatus: {
            active: 0,
            /*删除到回收站*/
            recycle: 1,
            /*已删除*/
            deleted: -1
        },

        /** 消息状态*/
        MsgStatus: {
            New: 'New',
            Read: 'Read'
        },

        /** 管理员状态 **/
        adminStatus: {
            active: 'act',
            locked: 'lock'
        },

        /**
         * 服务类型
         */
        serviceType: {
            userAdd: 'USER_ADD',
            entDisk: 'ENT_DISK',
            tel: 'TEL',
            search: 'search'
        },


        /**
         * 用户数量转换
         * @param direction
         * @param num
         * @returns {string}
         */
        userNumConvert: function (num) {
            if (!num || num.length <= 0 || num === '--')
                return "0";
            return _.numberFormat(num, 0) + " " + $translate("msgPerson");
        },

        /**
         * 时间分钟数
         * @param value
         * @returns {string}
         */
        timeConvertMinutes: function (value) {
            if (!value)
                return "0 " + $translate("msgMinute");
            return value + " " + $translate("msgMinute");
        },

        /**
         *  用户类型
         */

        UserType: {
            /**
             * 个人用户
             */
            PersonalUser: 0,
            /**
             * 企业用户
             */
            BusinessUser: 1,

            /**
             * 企业管理员
             */
            Administrator: 2,

            /**
             * 企业二级管理员
             */
            SecondAdministrator: 3
        },

        Cookies: {
            COOKIE_ENTERPRISE_NAME: 'en',
            COOKIE_USER_ACCOUNT: 'ua',
            COOKIE_USER_TOKEN: 'ut',
            COOKIE_KEEP_SIGN_IN: 'ksi',
            COOKIE_SIGN_IN: 'si',
            COOKIE_ENTADMIN_TOKEN: 'eat'
        },

        FileCollectionType: {
            entDisk: 'entDisk',
            personDisk: 'personDisk',
            /**外链的文件列表*/
            shareList: "shareList",
            /**关注的文件列表*/
            remindList: "remindList"
        },

        shareType: {
            download: 'Download',
            upload: 'Upload',
            preview: 'Preview'
        },

        FilePermissionErrorMsg: {
            /**
             * 读，查看文件的内容
             */
            Read: '无此权限!',
            /**
             * 写，可以编辑文件，创建文件夹，修改文件或文件夹名字
             */
            Write: '无此权限!',
            /**
             * 可以下载
             */
            Download: '无此权限!',
            /**
             * 上传文件
             */
            Upload: '无此权限!',
            /**
             * 删除子文件夹或者子文件
             */
            Delete: '无此权限!',
            /**
             * 共享
             */
            Share: '无此权限!',
            /**
             * 预览，可以在文件列表中看到文件夹下的子文件夹和文件
             */
            List: '无此权限!',
            /**
             * 本地交互
             */
            Local: '无此权限!'
        },

        // file type
        fileType: {
            shareDisk: "sharedisk",
            onlineDisk: "onlinedisk",
            sendFile: "sendfile",
            sendVoice: "sendvoice",
            confDoc: "conferenceDoc",
            icon: 'icon',
            temp: 'tempfile'
        },

        fileStatus: {
            active: 0,
            recycle: 1,
            deleted: -1
        },

        FileConvertStatus: {
            /**
             * 上传到文件cache
             */
            UPLOAD_TO_CACHE: "0",
            /**
             * 同步到文件服务器
             */
            UPLOAD_TO_FS: "1",
            /**
             * 正在处理转换
             */
            CONVERT_START: "2",
            /**
             * 转换完成
             *
             */
            CONVERT_DONE: "3",
            /**
             * 转换失败
             */
            CONVERT_ERROR: "4"
        },

        FileLeftNav: {
            RemindFileView: 'RemindFileView',
            LinkFileView: 'LinkFileView',
            FavFileView: 'FavFileView',
            RecycleView: 'RecycleView'
        },

        menu: {
            "entDiskView": 'entDiskView',
            "personDiskView": 'personDiskView',
            "remindFileView": "remindFileView",
            "favFileView": "favFileView",
            "linkFileView": "linkFileView",
            "entRecycleView": "entRecycleView",
            "personRecycleView": "personRecycleView"
        },

        operates: {
            'move': 'move',
            'copy': 'copy',
            'copyto': 'copyto',
            "rename": 'rename',
            'delete': 'delete',
            "download": 'download',
            upload: 'upload',
            create: 'create',
            edit: 'edit',

            lock: 'lock',
            unlock: 'unlock',
            attention: 'attention',
            unattention: 'del-attention',
            share: 'share',
            editShare: 'edit-share',
            unshare: 'del-share',
            permission: 'permission'
        },

        getDefuaultLogo: function () {
            var value;
            switch (this.lang) {
                case 'zh_TW':
                    value = __uri("../../../../assets/img/common/logo-tw.png");
                    break;
                case 'en_US':
                    value = __uri("../../../../assets/img/common/logo-en.png");
                    break;
                case 'zh_CN':
                default:
                    value = __uri("../../../../assets/img/common/logo.png");
                    break;
            }
            return value;
        },

        /**
         * 是否支持文档转换的类型
         * @returns {*}
         */
        isFileConvertSupport: function (type) {
            if (!this._convertTypes) {
                this._convertTypes = [];
                _.each([this.docType, this.pptType, this.excelType], function (each) {
                    this._convertTypes = this._convertTypes.concat(each);
                }, this);
            }
            return _.indexOf(this._convertTypes, type) !== -1;
        },

        /**
         * 是否支持预览
         *
         * @param type
         * @returns {*}
         */
        isPreviewSupport: function (type) {
            if (!this._previewTypes) {
                var that = this;
                this._previewTypes = [];
                _.each([
                    this.docType,
                    this.excelType,
                    this.imgType,
                    this.pptType,
                    this.pdfType,
                    this.txtType,
                    this.htmlType,
                    this.mp3Type,
                    this.mp4Type], function (each) {
                    that._previewTypes = that._previewTypes.concat(each);
                });
            }
            return _.indexOf(this._previewTypes, type) !== -1;
        },

        /**
         * 是否可以直接打开, 不需要经过转换
         */
        canDirectOpenFile: function (type) {
            if (!this._directViewTypes) {
                var self = this;
                this._directViewTypes = [];
                _.each([this.imgType, this.htmlType, this.mp3Type, this.mp4Type], function (each) {
                    self._directViewTypes = self._directViewTypes.concat(each);
                });
            }
            return _.indexOf(this._directViewTypes, type) !== -1;
        },

        isResponseError: function (result) {
            return _.startsWith(result, this.ERROR_MARK);
        },

        isResError: function (result) {
            return _.startsWith(result, this.ERROR_MARK);
        },

        isResponseOK: function (result) {
            return result === this.OK_MARK;
        },

        isResOK: function (result) {
            return result === this.OK_MARK;
        },

        isHtmlType: function (type) {
            return _.indexOf(this.htmlType, type) !== -1;
        },

        isTxtType: function (type) {
            return _.indexOf(this.txtType, type) !== -1;
        },

        isDocType: function (type) {
            return type && _.indexOf(this.docType, type.toLowerCase()) !== -1;
        },

        isPptType: function (type) {
            return type && _.indexOf(this.pptType, type.toLowerCase()) !== -1;
        },

        isPdfType: function (type) {
            return type && type.toLowerCase() === 'pdf';
        },

        isExcelType: function (type) {
            return type && _.indexOf(this.excelType, type.toLowerCase()) !== -1;
        },

        isMp4Type: function (type) {
            return _.indexOf(this.mp4Type, type) !== -1;
        },

        isInvalidFile: function (fileName) {
            var fileType = this.getFileType(fileName);
            return _.some(this.invalidType, function (invalidType) {
                return invalidType === fileType;
            });
        },

        isMp3Type: function (type) {
            return _.indexOf(this.mp3Type, type) !== -1;
        },

        isImgType: function (type) {
            return _.indexOf(this.imgType, type) !== -1;
        },

        /**
         * 是否可编辑
         * @param type
         * @returns {Boolean}
         */
        isEditType: function (type) {
            return _.indexOf(['txt', 'TXT'], type) !== -1;
        },

        isDocSupport: function (type) {
            return _.indexOf(this.docType.concat(this.excelType).concat(this.pptType), type) !== -1;
        },

        isLocalOpen: function (type) {
            return this.isDocSupport(type) || this.isPdfType(type) || this.isMp3Type(type) || this.isMp4Type(type);
        },

        searchFileType: function () {
            if (!this._fileMap) {
                var that = this;
                this._fileMap = [];
                _.each([this.docType, this.excelType, this.pptType, this.pdfType, this.txtType], function (each) {
                    that._fileMap = that._fileMap.concat(each);
                });
            }

            return this._fileMap;
        },

        isEntDisk: function (fileType) {
            return fileType === this.fileType.shareDisk;
        },

        /**
         * 文件是否转换中...
         * @param fileType
         * @param fileStatus
         * @returns {*}
         */
        isFileConverting: function (fileStatus) {
            if (!fileStatus)
                return true;
            return _.indexOf([this.FileConvertStatus.UPLOAD_TO_CACHE
                    , this.FileConvertStatus.UPLOAD_TO_FS
                    , this.FileConvertStatus.CONVERT_START], fileStatus) !== -1;
        },

        /**
         * 判断是否是特殊文件夹
         * @param {EntFileDTO} file
         * @returns {boolean|*}
         */
        isSpecialFolder: function (file) {
            var parentId = file.get("parentId");
            if (file.isEntDisk() && parentId === 'entRoot') {
                return this.isSpecialEntFolder(file.get("realname"));
            }
            if (parentId === 'personRoot' && !file.isEntDisk())
                return this.isSpecialPersonFolder(file.get("realname"));
            return false;
        },

        /**
         * 是否是特殊的企业文件夹
         * @param folderName
         * @returns {Boolean}
         */
        isSpecialEntFolder: function (folderName) {
            return _.some(_.keys(this.entSpecialFolderNames), function (name) {
                return name === folderName;
            });
        },

        /**
         * 是否是特殊的个人文件夹
         * @returns {Boolean}
         */
        isSpecialPersonFolder: function (folderName) {
            return _.some(_.keys(this.personSpecialFolderNames), function (name) {
                return name === folderName;
            });
        },

        getUserStatusTip: function (status) {
            var result = '未知';
            switch (status) {
                case this.UserStatus.Online:
                    result = "在线";
                    break;
                case this.UserStatus.Busy:
                    result = "忙碌";
                    break;
                case this.UserStatus.Offline:
                    result = "离开";
                    break;
                case this.UserStatus.Corbet:
                    result = "隐身";
                    break;
                default:
                    result = "离开";
                    break;
            }
            return result;
        },

        /**
         * 返回文件下载链接地址
         * @param file
         * @returns {}
         */
        getFileDownloadUrl: function (file) {
            return file.isEntDisk() ? '#sharedisk/download/' + file.id : '#onlinedisk/download/' + file.id;
        },

        getDownloadUrl: function (fileId, diskType) {
            var param = {
                'fileId': fileId,
                'fileType': diskType
            }

            return '/os/node/v27/download/file?' + $.param(param);
        },

        /**
         * 格式化时间
         * @param {date} date
         * @param {string} [format]
         * @return {string}
         */
        date_format: function (date, format) {
            return moment(date).format(format || this.DATE_TIME_FORMAT);
        },

        /**
         * 从字符串时间格式化为毫秒数
         *
         * @param []
         */
        getMillSec: function (strTime, format) {
            var format = format || this.DATE_TIME_FORMAT;
            return moment(strTime, format).toDate().getTime();
        },

        /**
         * 返回格式化的日期
         */
        dateFromMisc: function (millsec, format) {
            var format = format || this.DATE_TIME_FORMAT;
            var date = moment(parseInt(millsec)).toDate();
            if (format)
                date = moment(date).format(format);
            return date;
        },

        /**
         *  格式化毫秒数日期时间
         * @param [int] millsec
         * @return [] date
         */
        dateStrFromMisc: function (millsec, format) {
            var format = format || this.DATE_TIME_FORMAT;
            return moment(parseInt(millsec)).format(format);
        },

        dateAfterYear: function (date, year) {
            return moment(date).add(year, 'y').toDate().getTime();
        },

        /**
         *  格式化毫秒数时间
         * @param [int] millsec
         * @return [] time  HH:mm:ss
         */
        timeFromMillSec: function (millsec, format) {
            var format = format || this.TIME_FORMAT;
            return moment(parseInt(millsec)).format(format);
        },

        /**
         * 倒计时函数
         * @param time:倒计时时间:秒
         * @param callback:倒计时后的回调函数
         */
        timeCount: function (time, callback) {
            var self = this;
            self._timer = time;
            callback && callback(time);
            if (--time > 0) {
                setTimeout(function () {
                    self.timeCount(time, callback)
                }, 1000);
            } else {
                callback && callback(time);
                return;
            }
        },

        getRenameFileMsg: function (result) {
            var msg = null;
            switch (result) {
                case ErrorType.OK_MARK:
                    msg = "重命名成功!";
                    break;
                case ErrorType.errorNoPermission:
                    msg = "无此权限!";
                    break;
                case ErrorType.errorSameFile:
                    msg = "文件夹下存在同名文件!";
                    break;
                case ErrorType.errorSameFolder:
                    msg = "文件夹下存在同名文件夹!";
                    break;
                case ErrorType.errorFileLocked:
                    msg = "文件被锁定!";
                    break;
                case ErrorType.errorVersionConflict:
                    msg = "版本冲突!";
                    break;
                case ErrorType.error500:
                    //msg = "error500!";
                    msg = "系统错误!";
                    break;
            }
            return msg;
        },

        clearLoginCookies: function () {
            this.setCookie("ut", null);
            this.setCookie("ci", null);
        },

        /**
         * 设置登陆的cookie
         * @param loginDTO
         * @param userToken
         */
        setUserLoginCookies: function (isQuickMode, entName, userName, clientId, token) {
            // 清除旧的cookie
            this.clearLoginCookies();

            this.setCookie("ci", clientId);
            this.setCookie("ut", token);
            if (isQuickMode) {
                this.setCookie("en", entName);
                this.setCookie("ua", userName);
            } else {
                this.setCookie("un", userName);
            }
        },

        setCookie: function (key, val) {
            $.cookie(key, val, {path: "/"});
        },

        getCookie: function (key) {
            return $.cookie(key);
        },

        /**
         * 返回文件后缀
         * @returns {*}
         */
        getFileSuffix: function (filename) {
            return _.include(filename, '.') ? _.strRightBack(filename, '.') : '';
        },

        getFileType: function (filename) {
            return this.getFileSuffix(filename);
        },

        getFolderName: function (path) {
            if (!path)
                return '';
            if (path.indexOf('/') === -1)
                return path;
            return path.substr(_.lastIndexOf(path, '/') + 1);
        },

        /**
         * 返回文件前缀
         * @returns {*}
         */
        getFilePrefix: function (filename) {
            return _.strLeftBack(filename, ".");
        },

        /**
         * 判断文件夹DTO是否有预览权限
         *
         * @param folderDTO
         * @returns {*}
         */
        hasPreviewPermission: function (folderDTO) {
            var permission = folderDTO.get("permissionDTO");
            if (!permission)
                return false;

            return permission['read'] || permission['write'] || permission['local'];
        },

        checkPermission: function (file) {
            var unBtn = {};
            if (file.isFolder()) {
                if (file.get("permissionDTO")) {
                    if (file.get("permissionDTO").download)
                        unBtn.aldown = true;
                    if (file.get("permissionDTO")['delete'])
                        unBtn.aldel = true;
                    if (file.get("permissionDTO").share)
                        unBtn.alshare = true;
                    if (file.get("permissionDTO").write)
                        unBtn.alwrite = true;
                    if (file.get("permissionDTO").read)
                        unBtn.alread = true;
                    if (file.get("permissionDTO").manage)
                        unBtn.almanage = true;
                    if (file.get("permissionDTO").local)
                        unBtn.allocal = true;
                }
            } else {
                if (model.currentFolder && model.currentFolder.get("permissionDTO")) {
                    if (model.currentFolder.get("permissionDTO").download)
                        unBtn.aldown = true;
                    if (model.currentFolder.get("permissionDTO")['delete'])
                        unBtn.aldel = true;
                    if (model.currentFolder.get("permissionDTO").share)
                        unBtn.alshare = true;
                    if (model.currentFolder.get("permissionDTO").write)
                        unBtn.alwrite = true;
                    if (model.currentFolder.get("permissionDTO").read)
                        unBtn.alread = true;
                    if (model.currentFolder.get("permissionDTO").manage)
                        unBtn.almanage = true;
                    if (model.currentFolder.get("permissionDTO").local)
                        unBtn.allocal = true;
                }
            }
            return unBtn;
        },

        hasUnlockPermissin: function (lockByUserId) {
            return lockByUserId && (lockByUserId === cache.userId);
        },

        /**
         * 是否是根文件夹
         * @param fileId
         * @returns {boolean}
         */
        isRootFolder: function (fileId) {
            return fileId === 'entRoot' || fileId === 'personRoot';
        },

        asBaseParam: function () {
            var param = {
                entId: cache.entId,
                userId: cache.userId
            }
            return param;
        },

        /**
         * 创建文件Guid
         * @param fileName
         * @returns {string}
         */
        createGuid: function (fileName) {
            return webhelper.guid() + "." + this.getFileSuffix(fileName);
        },

        /**
         * 返回指定秒数的时钟
         * @param length
         */
        getClock: function (length) {
            var hour = 0, minute = 0, second = 0;
            if (length >= 3600) {
                hour = Math.floor(length / 3600);
                length = length % 3600;
            }
            if (length >= 60) {
                minute = Math.floor(length / 60);
                length = length % 60;
            }
            second = length;

            var str = "";
            str = str + (hour >= 10 ? hour : "0" + hour) + ":";
            str = str + ( minute >= 10 ? minute : "0" + minute) + ":";
            str += ( second >= 10 ? second : "0" + second);
            return str;
        },

        /**
         * 返回当前上传的文件夹的id
         * @return folderId
         */
        getCurrentUploadFolderId: function () {
            var folderId = model.currentFolder.get("fileId");
            if (_.indexOf(['entRoot', 'personRoot'], model.currentFolder.get("fileId")) !== -1) {
                var defaultFolder = model.currentFolder.isEntDisk() ?
                    collection.entFileList.findWhere({'realname': 'Share', parentId: 'entRoot'})
                    : collection.personFileList.findWhere({'realname': 'My documents', parentId: 'personRoot'});
                folderId = defaultFolder.get("fileId");
            }
            return folderId;
        },

        /**
         * 判断是否是手机或者座机的电话号码
         */
        isTeleNum: function (teleNum) {
            return this.pattern.Phone.test(teleNum) || this.pattern.Mobile.test(teleNum);
        },

        /**
         * 是否手机号码
         * @param num
         * @returns {boolean}
         */
        isMobileNum: function (num) {
            return this.pattern.Mobile.test(num);
        },

        /**
         * 返回各类url
         * @param html
         * @param [locale]
         * @returns {string}
         * @private
         */
        _getUrl: function (html, locale, hash) {
            var url,
                path = location.pathname,
                locale = locale || this.lang,
                isHttps = (_.include(html, "login.html") || _.include(html, "register.html"))
                    && location.host === 'app.oatos.com'
                    && !seajs.isPrivate;

            url = (isHttps ? "https:" : "http:") + '//' + location.host + path.substring(0, path.lastIndexOf('/'));
            url = url + '/' + html + (seajs.devMode ? '?dev' : "");
            if (locale !== 'zh_CN')
                url += (_.include(url, '?') ? '&locale=' + locale : '?locale=' + locale);
            if (hash)
                url += '#' + hash;
            return url;
        },

        _getUri: function (html, locale, hash) {
            var path = location.pathname;
            uri = path.substring(0, path.lastIndexOf('/'));
            uri = uri + '/' + html + (seajs.devMode ? '?dev' : "");
            if (locale && locale !== 'zh_CN')
                uri += (_.include(uri, '?') ? '&locale=' + locale : '?locale=' + locale);
            if (hash)
                uri += '#' + hash;
            return uri;
        },

        /**
         * 获取登陆后的网站url
         * @returns {*}
         */
        getWebsiteUrl: function (/** ? */ locale) {
            return this._getUrl('home.html', locale);
        },

        /**
         * 获取登陆url
         * @param [locale]
         * @param [paramStr]
         * @returns {*}
         */
        getLoginUrl: function (locale, paramStr) {
            var url = this._getUrl('login.html', locale);
            if (paramStr) {
                url += (url.indexOf("?") == -1 ? '?' : '&');
                url += paramStr;
            }
            return url;
        },

        /**
         * 获取注册url
         * @returns {*}
         */
        getRegisterUrl: function (locale, hash) {
            return this._getUrl('register.html', locale, hash);
        },

        /**
         * 获取后台管理url
         * @returns {*}
         */
        getAdminUrl: function (hash) {
            return this._getUrl('admin.html', null, hash);
        },

        /**
         * 获取外链浏览界面url
         * @param [linkCode]
         */
        getShareUrl: function (linkCode, https) {
            var protocol = 'http://';
            if (https) {
                protocol = 'https://';
            }
            if (/(?:app|vip)\.oatos\.com/.test(location.host)) {
                return protocol + (https ? "app.oatos.com/os/share.html?lc=" : "s.oatos.com/") + linkCode;
            }
            var url = protocol + location.host + this._getUri('share.html');

            if (!linkCode)
                return url;
            url = url + (_.include(url, "?") ? "&" : "?") + "lc=" + linkCode;
            return url;
        },

        /**
         * 返回文件浏览的路径
         */
        getViewUrl: function () {
            return this._getUrl('fileviewer.html');
        },

        getBuyUrl: function () {
            return this._getUrl('buy.html');
        },

        getMeetingUrl: function () {
            return "http://" + location.host + "/meeting/index.html";
        },

        getPromoteUrl: function () {
            return this._getUrl('2015.html');
        },

        /**
         * 打开所在文件夹的路径地址
         */
        getOpenFolderUrl: function (isEntDisk, isFolder, fileId) {
            var pathForward = isEntDisk ? 'sharedisk/forward' : 'onlinedisk/forward';
            return pathForward + (isFolder ? 'folder' : 'file') + "/" + fileId;
        },

        getViewType: function (type) {
            if (this.isImgType(type)) {
                return "pic";
            } else if (this.isExcelType(type)) {
                return "excel";
            } else if (this.isPdfType(type) || this.isDocSupport(type)) {
                return "pdf";
            } else if (this.isHtmlType(type)) {
                return "html";
            } else if (this.isMp4Type(type)) {
                return "vid";
            } else if (this.isMp3Type(type)) {
                return "aud";
            } else if (this.isTxtType(type)) {
                return "txt";
            } else {
                return "unknow";
            }
        },

        /**
         * 返回文件浏览路径
         * @param file
         * @returns {string}
         */
        getPreviewUrl: function (file) {
            var viewType = this.getViewType(file.type),
                url = this.getViewUrl(),
                param = {
                    'ei': cache.entId,
                    'ui': cache.userId,
                    'fi': file.parentId,
                    'fid': file.fileId,
                    'dp': file.fileType,
                    'sk': file.searchKey,
                    'fp': viewType
                };

            switch (viewType) {
                case 'pic':
                case 'aud':
                case 'vid':
                case 'html':
                case 'txt':
                    break;
                case 'pdf':
                    url = this.getPdfViewerUrl();
                    if (webhelper.isIE8()) {
                        return "#pdf/not/support";
                    } else if (this.isPdfType(file.type)) {
                        param.file = encodeURIComponent("res/" + file.guid);
                    } else {
                        param.file = encodeURIComponent("/os/node/" + file.fileType + "/" + file.fileId + "/as-pdf-stream"
                        + (file.linkId ? '?linkId=' + file.linkId : ''));
                    }
                    if (cache.linkId) {
                        url = url + (url.indexOf("?") !== -1 ? '&' : "?") + 'li=' + cache.linkId;
                    }
                    break;
            }
            if (cache.linkId) {
                param.li = cache.linkId;
            }

            url = _.include(url, '?') ? url + '&' : url + '?';
            return url + $.param(param);
        },

        getPdfViewerUrl: function () {
            return this._getUrl('pdfviewer.html');
        },

        /**
         *  返回文件列表中每一项的浏览路径
         * @param file
         * @returns {string}
         */
        getItemPreviewUrl: function (file) {
            if (!this.isPreviewSupport(file.type))
                return '#!';
            /*if (this.isTxtType(file.type)) {
             return "#/file/preview/" + file.fileId;
             }*/
            return this.getPreviewUrl(file);
        },

        convertSize: function (size) {
            var unit = 'B';
            if (size === 0) return 0;
            if (size >= 1024) {
                size = size / 1024;
                unit = 'K';
            }
            if (size >= 1024) {
                size = size / 1024;
                unit = 'M';
            }
            if (size >= 1024) {
                size = size / 1024;
                unit = 'G';
            }
            if (size >= 1024) {
                size = size / 1024;
                unit = 'T';
            }
            return _.numberFormat(size, 1) + unit;
        },

        /**
         *  文件大小转换器
         * @param direction
         * @param size
         * @returns {string}
         */
        sizeConverter: function (direction, size) {
            var size = arguments.length === 1 ? direction : size;
            if (arguments.length === 1 || direction === 'ModelToView') {
                if (!size || size.length <= 0 || size === '--')
                    return "-";

                return this.convertSize(size);
            }
        },

        convertMSize: function (direction, size) {
            size = (size ? size : 0);
            return parseInt(size / 1024 / 1024);
        },

        byteConvertGb: function (size) {
            size = (size ? parseInt(size / 1024 / 1024 / 1024) : undefined);
            return size;
        },

        gbConvertByte: function (size) {
            size = (size ? parseInt(size * 1024 * 1024 * 1024) : undefined);
            return size;
        },

        uploadedSizePercent: function (uploadSize, size) {
            var percent = Math.round(uploadSize * 100 / size);
            return (percent >= 100 ? 100 : percent) + "%";
        },

        sendDateConverter: function (direction, value) {
            return this.sendDateFromMs(value);
        },

        sendDateFromMs: function (ms) {
            var date = new Date(parseInt(ms));
            var today = moment().format("YYYY-MM-DD");
            var sendTime = moment(date).format("YYYY-MM-DD");
            if (today == sendTime) {
                sendTime = moment(date).format("HH:mm:ss");
            } else {
                sendTime = moment(date).format("YYYY-MM-DD HH:mm:ss");
            }

            return sendTime;
        },

        permissionConverter: function (direction, permission) {
            var permissionKeys = _.keys(_.pick(permission, function (val, key) {
                return !!val;
            }));
            if (permissionKeys.length === 0)
                return "";

            if (permissionKeys.length === 1) {
                var key = permissionKeys[0];
                switch (key) {
                    case 'read':
                        return $translate("msg421");
                    case 'download':
                        return $translate("msg423");
                    case 'upload':
                        return $translate("msg422");
                    default:
                        return $translate("msg427");
                }
            }

            if (permissionKeys.length === 2) {
                if (_.difference(permissionKeys, ['read', 'upload']).length === 0)
                    return $translate("msg424");

                if (_.difference(permissionKeys, ['read', 'download']).length === 0)
                    return $translate("msg425");

                return $translate("msg427");
            }

            if (permissionKeys.length >= 7)
                return $translate("msg426");

            return $translate("msg427");
        },

        typeConverter: function (value) {
            if (!value)
                return 'file-unknow';
            var lower = value.toLocaleLowerCase();
            if ('folder' === value)
                return 'file-folder';

            if (this.isTxtType(lower) || this.isHtmlType(lower))
                return 'file-txt';
            if (_.indexOf(this.pdfType, lower) !== -1)
                return 'file-pdf';
            if (_.indexOf(this.imgType, lower) !== -1)
                return 'file-img';
            if (_.indexOf(this.mp3Type, lower) !== -1)
                return 'file-mp3';
            if (_.indexOf(this.docType, lower) !== -1)
                return 'file-doc';
            if (_.indexOf(this.excelType, lower) !== -1)
                return 'file-excel';
            if (_.indexOf(this.mp4Type, lower) !== -1)
                return 'file-mp4';
            if (_.indexOf(this.pptType, lower) !== -1)
                return 'file-ppt';
            if (_.indexOf(this.zipType, lower) !== -1)
                return 'file-zip';
            return 'file-unknow';
        },

        dateConverter: function (direction, value) {
            if (value)
                return this.dateStrFromMisc(parseInt(value));
            else
                return ' - ';
        },

        checkConverter: function (direction, value) {
            if (direction === "ModelToView")
                return value + ' ' + (value && 'entFileItemSelect');
        },

        getAdminStatus: function (direction, value) {
            if (value == this.adminStatus.active) {
                return $translate("msgNormal");
            } else {
                return $translate("msg337");
            }
        },

        /**
         * 聊天的颜色
         * @param direction
         * @param value
         * @returns {string}
         */
        convertColor: function (direction, value) {
            return value == cache.userId ? 'my-title' : 'other-title';
        },

        getUserStatusTip: function (direction, status) {
            var result;
            switch (status) {
                case this.UserStatus.Online:
                    result = $translate("msgStatusOnline");
                    break;
                case this.UserStatus.Busy:
                    result = $translate("msgStatusBusy");
                    break;
                case this.UserStatus.Leave:
                    result = $translate("msgStatusLeave");
                    break;
                case this.UserStatus.Corbet:
                    result = $translate("msgStatusCorbet");
                    break;
                default:
                    result = $translate("msgStatusLeave");
                    break;
            }
            return result;
        },

        getFileName: function (fileName) {
            if (!fileName || fileName.indexOf('.') === -1)
                return fileName;
            return fileName.substring(0, fileName.lastIndexOf('.')).toLowerCase();
        },

        setUsualContactTitle: function (direction, value) {
            var result = $translate("msg1135");
            if (value) {
                result = $translate("msg1137");
            }
            return result;
        },

        setUsualContactClass: function (direction, value) {
            return "icon-custom-contact-" + (value ? 'remove' : 'add');
        },

        initLoading: function ($panel) {
            var $loadingIndicator = $(".loading-indicator").length ? $(".loading-indicator") : $("<span class='loading-indicator'><label>加载中...</label></span>").appendTo(document.body);
            $loadingIndicator.css({
                'position': 'absolute',
                'top': $panel.position().top + $panel.height() / 2 - $loadingIndicator.height() / 2,
                'left': $panel.position().left + $panel.width() / 2 - $loadingIndicator.width() / 2
            });
            return $loadingIndicator;
        },

        toggleLoading: function ($loading, show) {
            if (!$loading) return;
            show ? $loading.show() : $loading.fadeOut();
        },

        /**
         * 获取文件/文件夹的id数组
         * @param files
         * @returns {{fileIds: (*|Array), folderIds: (*|Array)}}
         */
        getFileFolderIds: function (files) {
            var fileGrp = _.groupBy(files, function (each) {
                return each.isFolder() ? 'folders' : 'files';
            });
            var fileIds = _.map(fileGrp.files, function (file) {
                return file.id;
            });
            var folderIds = _.map(fileGrp.folders, function (file) {
                return file.id;
            });
            return {
                'fileIds': fileIds,
                'folderIds': folderIds
            };
        },

        ValidationType: {
            Register: "Register",
            FindPassword: "FindPassword",
            VerifyAccount: "VerifyAccount"
        },

        /**
         * 转换福建电话的号码
         * @param tel
         * @returns {*}
         */
        convertCloudTelNum: function (tel) {
            if (tel && _.startsWith(tel, '865')) {
                return '0' + tel.substr(2, 3) + '-' + tel.substr(5);
            }
            return tel;
        },

        /**
         * 从响应中拼接出下载的url
         * @param downloadRes
         * @returns {string}
         */
        getViewUrlFromRes: function (downloadRes) {
            var url = downloadRes.url;
            return url.replace("http:", location.protocol);
        },

        /**
         * 执行文件下载
         *
         * @param file
         */
        executeFileDownload: function (file) {
            $("#downloadFrame").remove();
            var param = {
                fileId: file.fileId,
                fileType: file.fileType,
                port: location.port
            }
            file.linkId && _.extend(param, {linkId: file.linkId});
            var url = "/os/fm/sc/download/zipfile?" + $.param(param);
            $("body").append("<iframe id='downloadFrame' style='width:1px;height:1px;' src='" + url + "'></iframe>");
        },

        convertCallStatus: function (callStatus) {
            switch (callStatus) {
                case "0": // NotConnected
                    return "未接通";
                case "1":   // Online
                case "2": // HangUp
                    return "通话成功";
            }
        },

        /**
         * 给'复制'falsh添加回调函数
         */
        addClipboardCallback: function () {
            /**
             * flash拷贝组件的回调函数, 用于获取要拷贝的值
             * @param id
             */
            window.getClipboardContent = function (id) {
                try {
                    var val = "拷贝错误";
                    switch (id) {
                        case 'createCopyFlash':
                            val = $("#linkHref").attr('href');
                            break;
                        case 'linkViewCopy' :
                            val = $(".link-url").html();
                            break;
                        default:
                            val = $("#file-detail #fileDetailShareLink").text();
                            break;
                    }
                    log.debug(tag, "addClipboardCallback: id::", id, ", val: ", val);
                    noty.success($translate("msgCopySuccess"));
                    return val;
                } catch (e) {
                    log.error("[getClipboardContent]  err:", e.stack);
                }
            }
        },


        dealEntSpecialPath: function (path) {
            _.find(this.entSpecialFolderNames, function (value, key) {
                if (path.indexOf("/" + key) === 0) {
                    path = path.replace(key, this.entSpecialFolderNames[key]);
                    return true;
                }
            });
            return path;
        },


        dealEntSpecialFolder: function (folder) {
            _.find(this.entSpecialFolderNames, function (value, key) {
                if (folder === key) {
                    folder = this.entSpecialFolderNames[key];
                    return true;
                }
            });
            return folder;
        },

        /**
         * 处理个人系统文件名
         * @param path
         * @returns {*}
         */
        dealPersonSpecialPath: function (path) {
            _.find(this.personSpecialFolderNames, function (value, key) {
                if (path.indexOf("/" + key) === 0) {
                    path = path.replace(key, this.personSpecialFolderNames[key]);
                    return true;
                }
            }, this);
            return path;
        },

        dealPersonSpecialFolder: function (folder) {
            var self = this;
            _.find(this.personSpecialFolderNames, function (value, key) {
                if (folder === key) {
                    folder = self.personSpecialFolderNames[key];
                    return true;
                }
            });
            return folder;
        },

        /**
         * 显示恢复错误提示
         * @param result
         * @private
         */
        showRestoreErrMsg: function (result) {
            var errMsg = $translate("msgServerError");
            switch (result) {
                case ErrorType.errorNoPermission:
                    errMsg = $translate("msgNoPermission2");
                    break;
                case ErrorType.errorVersionConflict:
                    errMsg = $translate("msgFileVerConflict");
                    break;
                case ErrorType.errorSameFile:
                    errMsg = $translate("msgRecycleFileConflict");
                    break;
                case ErrorType.errorSameFolder:
                    errMsg = $translate("msgRecycleFolderConflict");
                    break;
                case ErrorType.errorNoSpace:
                    errMsg = $translate("msgDiskSizeLack");
                    break;
                case ErrorType.errorFolderSpaceOver:
                    errMsg = $translate("msgFolderSpaceOver");
                    break;
                case "errorFolderDeleted":
                    errMsg = $translate("msgRestoreFolderDel");
                    break;
                default:
                    errMsg = $translate("msgServerError");
            }
            noty.alert(errMsg);
        },

        /**
         * 生成订单编号
         * @returns {string}
         */
        generateTradeNo: function () {
            var tradeNo = "QY" + this.date_format(new Date(), "YYYYMMDD");
            return tradeNo + _.random(100000, 999999);
        },

        generateLinkPwd: function () {
            var str = this.LINK_PWD_STR;
            return str.charAt(_.random(0, 46)) + str.charAt(_.random(0, 46)) + _.random(10, 99);
        },

        /**
         * 返回随机数
         * @param [num]
         * @returns {string}
         */
        getRandomStr: function (num) {
            var str = this.LINK_PWD_STR,
                num = num || 4,
                retVal = '';
            for (var i = 0; i < num; i++) {
                retVal += str.charAt(_.random(0, 46));
            }
            return retVal;
        },

        /**
         * 选中INPUT中的部分文本
         * @param $input
         * @private
         */
        selectTextRange: function ($input, name) {
            var inputDom = $input.get(0),
                fileSuffix = this.getFileSuffix(name),
                textEnd = name.length;

            if (fileSuffix) {
                textEnd = name.length - fileSuffix.length - 1;
            }

            if (inputDom.setSelectionRange) {
                inputDom.setSelectionRange(0, textEnd);
            } else if (inputDom.createTextRange) {
                var range = inputDom.createTextRange();
                range.collapse(true);
                range.moveStart('character', 0);
                range.moveEnd('character', textEnd);
                range.select();
            }
            $input.focus();
        },

        getMailUrl: function (mail) {
            var suffix = _.strRightBack(mail, "@");
            switch (suffix) {
                case "qq.com":
                    return "https://mail.qq.com/";
                case "163.com":
                    return "http://mail.163.com/";
                case 'vip.163.com':
                    return "http://vip.163.com/";
                case "vip.163.net":
                    return "http://vip.163.net/";
                case "126.com":
                    return "http://mail.126.com/";
                case "vip.126.net":
                    return "http://vip.126.net/";
                case "vip.126.com":
                    return "http://vip.126.com/";
                case "sina.com":
                case "sina.cn":
                    return "https://mail.sina.com.cn/";
                case 'vip.sina.com':
                    return "http://vip.sina.com.cn/";
                case "sohu.com":
                    return "http://mail.sohu.com/";
                case 'sohu.net':
                    return "http://mail.sohu.net/";
                case "vip.sohu.net":
                    return "http://vip.sohu.net/";
                case "vip.sohu.com":
                    return "http://vip.sohu.com/";
                case "gmail.com":
                    return "http://www.gmail.com/";
                case "qycloud.com":
                    return "http://mail.qycloud.com/";
                case "21cn.com":
                    return "http://mail.21cn.com/";
                case "vip.21cn.com":
                    return "http://mail.21cn.com/vip/";
                default:
                    return "#/redirect/" + mail;
            }
        },

        redirectToLogin: function () {
            this.clearLoginCookies();
            location.assign(this.getLoginUrl());
        },

        /**
         * 定时器，倒数多少秒
         * @param $scope
         * @param seconds
         */
        startTimer: function ($scope, seconds) {
            $scope.time = seconds;
            $interval(function () {
                $scope.time--;
            }, 1000, seconds);
        },

        isValidLabel: function (label) {
            if (!label)
                return false;
            var zhChars = label.match(/[\u0391-\uFFE5]/g),
                zhLength = zhChars ? zhChars.length : 0,
                enLength = label.length - zhLength;
            return zhLength * 2 + enLength <= 16;
        }
    };
}


