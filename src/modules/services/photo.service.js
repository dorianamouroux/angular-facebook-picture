app.factory('PhotoService', [
    '$facebook',
    '$q',
    function($facebook, $q) {
        return ({
            getImage: function(id) {
                var q = $q(function(resolve, reject) {
                    $facebook.api("/" + id + "?fields=images")
                        .then(resolve)
                        .catch(reject);
                });
                return (q);
            },
            getNbLikes: function(id) {
                var q = $q(function(resolve, reject) {
                        $facebook
                            .api("/" + id + "/likes?summary=total_count")
                            .then(function(res) {
                                resolve(res.summary.total_count);
                            })
                            .catch(reject);
                });
                return (q);
            },
            getComments: function(id) {
                var q = $q(function(resolve, reject) {
                        $facebook
                            .api("/" + id + "/comments")
                            .then(function(res) {
                                resolve(res.data);
                            })
                            .catch(reject);
                });
                return (q);
            }
        });
    }
])
