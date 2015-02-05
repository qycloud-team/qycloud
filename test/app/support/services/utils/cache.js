angular.module("commons.services").factory("cache", [
    function cache() {
        return {
            token: $.cookie('ut') || webhelper.getUrlEncodedKey("UT"),
            userName: $.cookie("un") || $.cookie("ua"),
            displayName: undefined, // current user displayname
            entId: undefined,
            userId: undefined,
            clientId: $.cookie("ci"),
            fileType: undefined,
            folderId: undefined,
            fileId: undefined,
            linkId: undefined,
            searchKey: undefined,
            viewType: undefined,

            showType: $.cookie("stp") || 'list',

            parseQueryString: function () {
                this.entId = webhelper.getUrlEncodedKey("ei");
                this.userId = webhelper.getUrlEncodedKey("ui");
                this.folderId = webhelper.getUrlEncodedKey("fi");
                this.fileId = webhelper.getUrlEncodedKey("fid");
                if (this.fileId)
                    this.fileId = parseInt(this.fileId);
                this.linkId = webhelper.getUrlEncodedKey("li");
                this.shared = !!this.linkId;
                this.fileType = webhelper.getUrlEncodedKey("dp");
                this.searchKey = webhelper.getUrlEncodedKey("sk");
                this.viewType = webhelper.getUrlEncodedKey("fp"); // 浏览类型, mp3/mp4/html/pic
            },

            ensureCookieToken: function () {
                var cookieToken = $.cookie('ut');
                if (!cookieToken && this.token) {
                    $.cookie("ut", this.token);
                }
            }
        }
    }
]);