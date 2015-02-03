angular.module("commons.models").service("Comment", [
    '$q',
    'FileRest',
    creator
]);

function creator($q, FileRest) {
    function Comment(attrs) {
        this.commentId = undefined;
        this.commentBody = undefined;
        this.createrId = undefined;
        this.createrName = undefined;
        this.createTime = undefined;

        attrs && angular.extend(this, attrs);
    }

    Comment.prototype = {
        save: function (fileType, fileId) {
            var delay = $q.defer();
            var self = this;

            FileRest.comments.post({
                fileType: fileType,
                fileId: fileId,
                commentBody: this.commentBody,
                userName: this.createrName
            }).then(function (result) {
                angular.extend(self, result);
                delay.resolve(self);
            });
            return delay.promise;
        }
    };
    Comment.list = function (fileType, fileId) {
        var delay = $q.defer();

        FileRest.comments.get({
            type: fileType,
            fileid: fileId
        }).then(function (result) {
            delay.resolve(_.map(result.comments, function (json) {
                return new Comment(json);
            }));
        });

        return delay.promise;
    };

    return Comment;
}
