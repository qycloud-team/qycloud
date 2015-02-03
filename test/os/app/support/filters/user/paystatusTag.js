angular.module('commons.filters').filter('PayStatusTag', [
    payStatusTag
]);

function payStatusTag() {
    return function (payStatus) {
        switch (payStatus) {
            case "UNPAY":
                return "未支付";
            case "PAY_OK":
                return "已支付";
            case "PAY_FAIL":
                return "支付失败";
            case "ON_PAY" :
                return "验证中";
            case "FREE":
                return "免费";
        }
        return "";
    }
}