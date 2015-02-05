angular.module("commons.models").service("PersonFile", [
    '$translate',
    'constants',
    'BaseFile',
    personFileCreator
]);

function personFileCreator($translate,
                           constants,
                           BaseFile) {

    function PersonFile(attrs) {
        this.fileType = constants.fileType.onlineDisk;
        attrs && angular.extend(this, BaseFile.parsePersonFile(attrs));
    }

    PersonFile.prototype = new BaseFile();
    PersonFile.rootFolder = new PersonFile({
        fileType: 'onlinedisk',
        fileId: -1,
        folder: true,
        name: $translate('msg879')
    });
    PersonFile.createFolder = function (parentId, name) {
        return new PersonFile({
            parentId: parentId,
            fileName: name,
            folder: true
        });
    };


    angular.extend(PersonFile.prototype, {

        getOperations: function () {
            var operations = ['move', 'copyto', 'rename', 'delete', 'download', 'upload', 'create', 'edit', 'property'];
            if (this.sysFolder)
                webhelper.without(operations, ['rename', 'move', 'delete']);
            if (this.isFolder || !constants.isEditType(this.type))
                webhelper.without(operations, ['edit']);
            return operations;
        }
    });

    return PersonFile;
}
