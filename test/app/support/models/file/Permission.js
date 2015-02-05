angular.module("commons.models").service("Permission", [
    '$q',
    'constants',
    permissionCreator
]);

function permissionCreator($q, constants) {

    function Permission(attrs) {
        this['read'] = true;
        this['write'] = false;
        this['delete'] = false;
        this['upload'] = false;
        this['download'] = false;
        this['share'] = false;
        this['local'] = false;
        this['manage'] = false;
        this['createFolder'] = false;
        this.mode = 'read';
        if (attrs) {
            this.reset(attrs);
        }
    }

    Permission.attrs = ['read', 'write', 'delete', 'upload', 'download', 'share', 'local', 'createFolder'];

    Permission.prototype = {

        getChecked: function () {
            return _.filter(Permission.attrs, function (key) {
                return this[key];
            }, this);
        },

        uncheckAll: function () {
            _.each(Permission.attrs, function (key) {
                this[key] = false;
            }, this);
            this.mode = this.getMode();
        },

        checkAll: function () {
            _.each(Permission.attrs, function (key) {
                this[key] = true;
            }, this);
            this.mode = this.getMode();
        },

        toggleAll: function () {
            this.hasAll() ? this.uncheckAll() : this.checkAll();

            this.mode = this.getMode();
        },

        checkAttrs: function () {
            return _.filter(Permission.attrs, function (attr) {
                return !!this[attr];
            }, this);
        },

        has: function () {
            return _.all(_.toArray(arguments), function (key) {
                return this[key];
            }, this);
        },

        hasAll: function () {
            return _.all(Permission.attrs, function (key) {
                return !!this[key];
            }, this);
        },

        hasNone: function () {
            return _.all(Permission.attrs, function (key) {
                return !this[key];
            }, this);
        },

        check: function () {
            this.uncheckAll();
            _.each(_.toArray(arguments), function (key) {
                this[key] = true;
            }, this);
            this.mode = this.getMode();
        },

        reset: function (permission) {
            angular.extend(this, permission);
            this.mode = this.getMode();
        },

        toggle: function () {
            if (this.mode !== 'user') {
                return false;
            }
            _.each(_.toArray(arguments), function (key) {
                this[key] = !this[key];
            }, this);
        },

        getMode: function () {
            var checkeds = this.getChecked();
            switch (checkeds.length) {
                case 0:
                    return 'user';
                case 1:
                    return checkeds[0];
                case 2:
                    if (_.contains(checkeds, 'upload')) {
                        return 'read,upload';
                    }
                    if (_.contains(checkeds, 'download')) {
                        return 'read,download';
                    }
                    return 'user';
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    return 'user';
                case 8:
                    return 'all';
            }
        },

        changeMode: function (mode) {
            switch (mode) {
                case 'read':
                    this.check("read");
                    break;
                case 'upload':
                    this.check("upload");
                    break;
                case 'download':
                    this.check("download");
                    break;
                case 'read,upload':
                    this.check("read", "upload");
                    break;
                case 'read,download':
                    this.check("read", "download");
                    break;
                case 'all':
                    this.checkAll();
                    break;
                case 'user':
                    this.uncheckAll();
                    break;
            }
        },

        toJSON: function () {
            return _.pick(this, Permission.attrs);
        }
    };

    return Permission;
}