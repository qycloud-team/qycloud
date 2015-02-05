angular.module("commons.filters").filter("previewUrl", [
    'constants',
    function (constants) {
        return function (file) {
            log.debug("filter: previewUrl: ", file)
            if (file.type === 'folder') {
                return "#!";
            } else {
                return constants.getItemPreviewUrl(file);
            }
        }
    }
]);