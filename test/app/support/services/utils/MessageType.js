angular.module("commons.services").factory("MessageType", function () {
    return {
        // ================ 聊天消息类型 ==================================
        /**
         * chat message
         */
        ChatMessage: "Chat",
        /**
         * 邀请好友回复， 代表被邀请方接受邀请，邀请方处理
         */
        Reply: "Reply",
        /**
         * 强行下线
         */
        ForceOffline: "UserSign",
        /**
         * 用户的个人网盘被关闭
         */
        PersonalDiskDisabled: "PersonalDiskDisabled",

        /**
         * 即时文件传输
         */
        InstantFile: "InsFile",

        /**
         * 音频邀请
         */
        AudioInvite: "AudInv",
        /**
         * 音频开始
         */
        AudioStart: "AudSta",
        /**
         * 拒绝音频
         */
        AudioRefuse: "AudRef",
        /**
         * 音频结束
         */
        AudioEnd: "AudEnd",

        OfflineFile: "OffFile",

        /**
         * 是否是聊天类型的消息
         * @param msgType
         * @returns {boolean|Boolean}
         */
        isChatMsgType: function (msgType) {
            if (!this._chatMsgType) {
                this._chatMsgType = [this.ChatMessage, this.Reply, this.InstantFile, this.OfflineFile];
            }
            return _.contains(this._chatMsgType, msgType);
        },

        // ================ 系统消息类型 ==================================

        /**
         * 用户登入
         */
        UserJoin: "UserJoin",
        /**
         * 用户改变状态，其新状态值由
         * 获取
         */
        UserStatusChange: "UserSCh",
        /**
         * 用户离开
         */
        UserLeave: "UserLea",
        /**
         * 用户信息更新
         */
        UserInfoUpdate: "UserUpd",
        /**
         * 企业用户登录记录
         */
        Login: "Login",
        /**
         * 同事更新
         */
        ColleagueNew: "ColNew",
        /**
         * 系统消息
         */
        SysMsg: "SysMsg",

        /**
         * 是否是通知类消息
         *
         * @param msgType
         * @returns {boolean|Boolean}
         */
        isNoticeMsgType: function (msgType) {
            if (!this._noticeMsgType) {
                this._noticeMsgType = [
                    this.UserJoin, this.UserStatusChange, this.UserLeave,
                    this.UserInfoUpdate, this.Login, this.ColleagueNew,
                    this.ForceOffline, this.PersonalDiskDisabled, this.SysMsg,
                    this.SynLogin, this.NewSyncFolder];
            }
            return _.contains(this._noticeMsgType, msgType);
        },

        /**
         * 文件进入记录
         */
        FileDown: "fd",
        /**
         * 文件输出记录
         */
        FileAccessRecord: "fa",
        /**
         * 共享网盘文件更新
         */
        ShareFileNew: "SFNew",

        /**
         * 共享网盘上传文件
         */
        ShareFileUpload: "SFUpload",

        /**
         * 上传发送文件
         */
        UploadSendFile: "USFile",

        /**
         * 发送文件消息
         */
        DoSendFile: "DSFile",

        /**
         * 文件转换完成通知
         */
        FileConvertDone: "FileConvertDone",

        FileUploadDone: "FileUploadDone",

        /**
         * 返回文件消息类型
         * @return {array}
         *
         */
        getFileMsgType: function () {
            if (!this._fileMsgType)
                this._fileMsgType = [this.FileDown, this.FileAccessRecord, this.ShareFileNew, this.FileConvertDone];
            return this._fileMsgType;
        },

        isFileMsgType: function (msgType) {
            return _.contains(this.getFileMsgType(), msgType);
        },

        /**
         * 是否是聊天中显示的文件消息
         * @param msgType
         * @returns {boolean|Boolean}
         */
        isChatFileMsgType: function (msgType) {
            if (!this._chatFileMsgType)
                this._chatFileMsgType = [this.ShareFileUpload, this.DoSendFile];
            return _.contains(this._chatFileMsgType, msgType);
        },

        getUploadSendFileMsgType: function () {
            if (!this._uploadSendFileMsgType)
                this._uploadSendFileMsgType = [this.UploadSendFile];
            return this._uploadSendFileMsgType;
        },

        /**
         * 同步登陆
         */
        SynLogin: "SynLogin",

        /**
         * 设置文件夹同步消息
         */
        NewSyncFolder: "NewSF"
    };
});