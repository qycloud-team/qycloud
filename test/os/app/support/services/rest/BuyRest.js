angular.module("commons.services").factory("BuyRest", [
    'RestHelper',
    buyRest
]);

function buyRest(RestHelper) {
    return RestHelper.publish({

        /**取优惠码列表中奖记录,元旦砸蛋*/
        surprises: {
            uri: "/sc/buy/surprises",
            get: true,
            post: true
        },

        /**取单个优惠码*/
        surprise: {
            uri: "/sc/buy/surprise",
            get: true
        },

        /**取剩余砸蛋次数,增加砸蛋次数*/
        luck: {
            uri: "/sc/buy/luck",
            get: true,
            post: true
        },

        /**取订单记录*/
        orders: {
            uri: "/sc/buy/orders",
            get: true,
            post: true
        },

        order: {
            updateToPaying: ['put', '/pub/buy/pay']
        }
    })
}