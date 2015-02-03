angular.module("commons.filters").filter("type2icon", ['constants', function (constants) {
    return function (value) {
        if (!value)
            return 'file-unknow';
        var lower = value.toLocaleLowerCase();
        if ('folder' === value)
            return 'file-folder';

        if (constants.isTxtType(lower) || constants.isHtmlType(lower))
            return 'file-txt';
        if (_.indexOf(constants.pdfType, lower) !== -1)
            return 'file-pdf';
        if (_.indexOf(constants.imgType, lower) !== -1)
            return 'file-img';
        if (_.indexOf(constants.mp3Type, lower) !== -1)
            return 'file-mp3';
        if (_.indexOf(constants.docType, lower) !== -1)
            return 'file-doc';
        if (_.indexOf(constants.excelType, lower) !== -1)
            return 'file-excel';
        if (_.indexOf(constants.mp4Type, lower) !== -1)
            return 'file-mp4';
        if (_.indexOf(constants.pptType, lower) !== -1)
            return 'file-ppt';
        if (_.indexOf(constants.zipType, lower) !== -1)
            return 'file-zip';
        return 'file-unknow';
    }
}]);