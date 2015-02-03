angular.module("commons.filters").filter("usericon", [
    'constants',
    usericon
]);

function usericon(constants) {
    return function (icon, gender) {
        //设置默认头像
        if (!icon) {
            return gender && "f" === gender ? constants.defaultWomenIcon : constants.defaultIcon;
        }
        //修复旧的默认头像
        if (_.include(icon, "defaultAvatar64woman") || _.include(icon, "man.png"))
            return constants.defaultIcon;
        if (_.include(icon, "defaultAvatar64woman") || _.include(icon, "woman.png"))
            return constants.defaultWomenIcon;

        //性别为女 头像为男默认  修改
        if (icon == constants.defaultIcon && "f" === gender)
            return constants.defaultWomenIcon;

        return _.startsWith(icon, "res/") ? icon : 'res/' + icon;
    }
}