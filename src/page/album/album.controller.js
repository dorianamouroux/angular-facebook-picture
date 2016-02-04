setAllLoading = function(value) {
    return ({
        album: value,
        photos: value,
        photoLikes: value,
        photoComments: value
    })
}

app.controller('AlbumCtrl', [
    '$scope',
    '$location',
    '$routeParams',
    '$facebook',
    'PhotoService',
    'AlbumService',
    'ToastService'
,    'UserService',
    function($scope,
        $location,
        $routeParams,
        $facebook,
        PhotoService,
        AlbumService,
        ToastService,
        UserService) {

        $scope.loading = setAllLoading(true);
        $scope.album = {};
        $scope.photos = [];
        $scope.modal = false;
        $scope.focused = null;

        var modal = $('#modalPhoto');

        var errorApi = function(err) {
            $scope.loading = setAllLoading(false);
            if (!UserService.checkErrorToken(err)) {
                console.log(err);
                ToastService("There is an error, check console");
            }
        };

        $scope.openPhoto = function(photo) {
            $scope.focused = photo;
            modal.openModal();

            PhotoService.getNbLikes(photo.id)
                .then(function(res) {
                    $scope.focused.likes = res;
                    $scope.loading.photoLikes = false;
                }).catch(errorApi);

            PhotoService.getComments(photo.id)
                .then(function(res) {
                    $scope.focused.comments = res;
                    $scope.loading.photoComments = false;
                }).catch(errorApi);
        };

        $scope.closePhoto = function(photo) {
            modal.closeModal();
            $scope.focused = null;
        }

        $scope.loadAll = function() {
            AlbumService.loadAlbum($routeParams.id)
                .then(function(res) {
                    $scope.album = res;
                    $scope.loading.album = false;
                }).catch(errorApi);

            AlbumService.loadPhotosAlbum($routeParams.id)
                .then(function(res) {
                    $scope.photos = res;
                    $scope.loading.photos = false;
                }).catch(errorApi);
        };

        $scope.loadAll();
    }
])
