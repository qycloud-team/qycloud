angular.module("commons.services").factory("NodeRest", [
    'RestHelper',
    NodeRest
]);

function NodeRest(RestHelper) {
    return RestHelper.publish({
        baseurl: RestHelper.nodeUrl,

        messages: {
            /**
             * 发送JMS消息
             * @param MsgDTO
             */
            post: function (data, option) {
                return RestHelper.post("/sendmsgs", data, option);
            }
        },

        message: {
            /**
             * 发送JMS消息
             * @param MsgDTO
             */
            post: function (data, option) {
                return RestHelper.post("/sendmsg", data, option);
            }
        },

        /**
         * 获取网盘套餐和云电话套餐信息
         */
        packages: {
            uri: '/buy/packages',
            get: true
        },

        /**
         * 单价信息
         */
        unitPrice: {
            uri: '/buy/unitPrice',
            get: true
        },

        file: {
            /**
             * 返回mp3/mp4文件的预览url
             */
            getPreviewUrl: function (data, option) {
                return RestHelper.post("/os/node/v28/file/preview/url", data, option);
            },

            /**
             * 通过转换为不同的文件类型来预览文件
             */
            viewFile: function (fileType, fileId, viewType, data) {
                var uri = _.sprintf("/os/node/%s/%s/view-as-%s", fileType, fileId, viewType);
                return RestHelper.get(uri, data);
            },

            checkUpload: function (data, option) {
                return RestHelper.post("/os/node/upload/single/check", data, option);
            }
        }
    });
}
