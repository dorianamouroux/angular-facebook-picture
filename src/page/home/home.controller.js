app.controller('HomeCtrl', [
    '$rootScope',
    '$scope',
    '$facebook',
    '$location',
    'AlbumService',
    'UserService',
    function(
        $rootScope,
        $scope,
        $facebook,
        $location,
        AlbumService,
        UserService) {

        var errorApi = function(err) {
            $scope.loading.user = false;
            $scope.loading.album = false;
            if (!UserService.checkErrorToken(err)) {
                console.log(err);    
                ToastService("There is an error, check console");
            }
        }
        var errorApi = function(err) {
            $scope.loading = setAllLoading(false);
        };

        $scope.loading = {
            user: true,
            album: true
        };

        $scope.albums = [];

        $scope.loadAlbums = function() {
            $scope.loadingAlbum = true;
            AlbumService.loadAlbums()
                .then(function(res) {
                    $scope.albums = res;
                    $scope.loading.album = false;
                }).catch(errorApi);
        };

        $scope.loadAlbums();

    }
]);
