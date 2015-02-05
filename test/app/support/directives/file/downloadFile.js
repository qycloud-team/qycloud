var tag = "downloadFile::";

angular.module("commons.directives").directive("downloadFile", [
    '$compile',
    'modal',
    viewFile
]);

function viewFile($compile, modal) {
    'use strict';

    return {
        restrict: 'EA',
        replace: false,
        transclude: false,
        link: function postLink(scope, elem, attrs) {
            elem.click(function () {
                log.debug("scope: ", scope);
                var checkedFiles = scope.checkedFiles;
                log.debug("checkFiles: ", checkedFiles);
                switch (checkedFiles.length) {
                    case 0:
                        throw new Error("You must select files to download!");
                        break;
                    case 1:
                        var file = checkedFiles[0];
                        file.isFolder ? downloadZip() : downloadSingle();
                        break;
                    case 2:
                        downloadZip();
                        break;
                }
            });


            function downloadZip() {
                log.debug(tag, "downloadZip");
                modal.zipDownload = true;
                elem.append($compile(__inline("../../templates/ZipDownloadView.html"))(scope));
            }

            function downloadSingle() {
                $("#downloadFrame").remove();
                var param = {
                    fileId: scope.file.fileId,
                    fileType: scope.file.fileType
                };
                if (scope.file.linkId) {
                    param.linkId = scope.file.linkId;
                }
                var url = "/os/fm/sc/download/zipfile?" + $.param(param);

                log.debug(tag, "downloadSingle: ", url);
                $("body").append("<iframe id='downloadFrame' style='width:1px;height:1px;' src='" + url + "'></iframe>");
            }
        }
    };
}