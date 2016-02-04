app.factory('AlbumService', [
    '$facebook',
    '$q',
    'PhotoService',
    function($facebook, $q, PhotoService) {
        return ({
            getCover: function(albumList, resolve, reject) {
                var nbAlbum = albumList.length,
                    nbLoaded = 0,
                    albums = [];

                function isFinish() {
                    nbLoaded++;
                    if (nbLoaded === nbAlbum)
                        resolve(albums);
                }

                angular.forEach(albumList, function(elem) {
                    $facebook
                        .api('/' + elem.id + '?fields=cover_photo,name,description')
                        .then(function(dataCover) {
                            albums.push(dataCover);
                            if (dataCover.cover_photo) {
                                PhotoService
                                    .getImage(dataCover.cover_photo.id)
                                    .then(function(dataImage) {
                                        dataCover.images = dataImage.images;
                                        isFinish();
                                    })
                                    .catch(reject);
                            } else
                                isFinish();
                        })
                });
            },
            loadAlbums: function() {
                var self = this;

                var q = $q(function(resolve, reject) {
                    $facebook.api('/me/albums')
                        .then(function(res) {
                            self.getCover(res.data, resolve, reject)
                        })
                        .catch(reject)
                });

                return (q);
            },
            loadAlbum: function(id) {
                var q = $q(function(resolve, reject) {
                    $facebook
                        .api("/" + id)
                        .then(function(res) {
                            resolve(res);
                        })
                        .catch(reject);
                });

                return (q);
            },
            loadPhotosAlbum: function(id) {
                var q = $q(function(resolve, reject) {
                    $facebook
                        .api("/" + id + "/photos?fields=images,name,created_time")
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
