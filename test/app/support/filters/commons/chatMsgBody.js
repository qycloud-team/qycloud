angular.module("commons.filters").filter("chatMsgBody", [
    chatMsgBody
]);

function chatMsgBody() {
    return function (message) {
        try {
            switch (message.msgType) {
                case 'SFUpload':
                    var bodyJson = JSON.parse(message.msgBody);
                    return _.reduce(bodyJson.msgList, function (memo, msg) {
                        return memo + "" + '上传文件通知: ' + msg.name + ". ";
                    }, "");
                case 'DSFile':
                    var bodyJson = JSON.parse(message.msgBody);
                    return _.reduce(bodyJson.msgList, function (memo, msg) {
                        return memo + "" + '发送文件: ' + msg.name + ". ";
                    }, "");
                case 'Chat':
                    return message.msgBody;
                default:
                    return message.msgBody;
            }
        } catch (e) {
            return message.msgBody;
        }
    }
}