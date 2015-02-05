angular.module("commons.models").service("BasePager", [
    basePagerService
]);

function basePagerService() {
    function BasePager() {
        this.total = 0;
        this.perPage = 30;
        this.maxSize = 5;
        this.current = 1;
        this.numPages = 0;
        this.itemsName = undefined;
    }

    BasePager.prototype = {
        fetchPage: function () {
            throw new Error("pls override fetchPage()");
        },

        setItemsName: function (itemsName) {
            this.itemsName = itemsName;
        }
    };

    return BasePager;
}