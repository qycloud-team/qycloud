angular.module("commons.models").service("EntLink", [
    "$q",
    "FileRest",
    'constants',
    linkCreator
]);

function linkCreator($q, FileRest, constants) {

    function EntLink(attrs) {
        this.linkId = undefined;
        this.linkCode = undefined;
        this.fileId = undefined;
        this.password = undefined;
        this.expirationTime = undefined;
        this.https = undefined;
        this.createrName = undefined;
        this.createTime = undefined;
        this.type = undefined;
        this.href = undefined;
        this.linkUrl = undefined;
        this.receivers = undefined;

        attrs && angular.extend(this, attrs);
    }

    EntLink.prototype = {

        //创建外链
        save: function () {
            var self = this,
                delay = $q.defer();
            FileRest.linkFile.post({
                fileId: this.fileId
            }).then(function (result) {
                angular.extend(self, result);
                self.href = constants.getShareUrl(self.linkCode);
                delay.resolve(self);
            });
            return delay.promise;
        },

        //跟改外链
        updateLink: function () {
            var delay = $q.defer(),
                self = this;
            FileRest.linkFile.put({
                linkId: this.linkId,
                password: this.password,
                expirationTime: this.expirationTime,
                type: this.type,
                https: this.https
            }).then(function (result) {
                angular.extend(self, result);
                delay.resolve(result);
            });
            return delay.promise;
        },

        //删除外链
        deleteLink: function () {
            var delay = $q.defer();
            FileRest.linkFile.remove(null, {
                query: {
                    linkid: this.linkId,
                    type: 'sharedisk'
                }
            }).then(function (result) {
                delay.resolve(result);
            });
            return delay.promise;
        },

        //发送邮件或短信
        sendLink: function (param) {
            var delay = $q.defer(),
                self = this;
            FileRest.linkFile.send({
                linkId:this.linkId,
                fileType:'sharedisk',
                linkUrl: constants.getShareUrl(self.linkCode),
                receivers: param.receivers
            }).then(function (result) {
                angular.extend(self, result);
                self.href = constants.getShareUrl(self.linkCode);
                delay.resolve(result);
            });
            return delay.promise;
        }
    };

    return EntLink;
}