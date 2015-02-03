angular.module("commons.services").factory('toggleCheck', [
    toggleCheck
]);

function toggleCheck() {

    return {
        /**
         *
         * @param items
         * @param checkeds
         * @returns {Array} checkeds
         */
        toggleCheckAll: function (items, checkeds) {
            var checkAll = checkeds.length === items.length;
            log.debug("toggleCheckAll: items length: ", items.length, ", checkeds length: ", checkeds.length);
            _.forEach(items, function (item) {
                item.checked = !checkAll;
            });
            return checkAll ? [] : items;
        },

        /**
         *  toggle 选中
         * @param select
         * @param items
         * @returns {*[]} checkeds
         */
        toggleCheck: function (select, items) {
            select.checked = !select.checked;
            _.forEach(items, function (item) {
                if (item.checked && item != select)
                    item.checked = false;
            });
            return select.checked ? [select] : [];
        },

        /**
         *  toggle 选中
         * @param select
         * @param items
         */
        checkItem: function (select, items) {
            select.checked = true;
            _.forEach(items, function (item) {
                if (item.checked && item != select)
                    item.checked = false;
            });
            return select.checked ? [select] : [];
        },

        /**
         *
         * @param item
         * @param items
         * @returns {*[]} checkeds
         */
        multiCheck: function (item, items) {
            item.checked = !item.checked;
            return _.filter(items, function (item) {
                return item.checked;
            });
        }
    }
}