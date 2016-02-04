app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'src/page/index/index.html',
            controller: 'IndexCtrl'
        })
        .when('/home', {
            templateUrl: 'src/page/home/home.html',
            controller: 'HomeCtrl'
        })
        .when('/album/:id', {
            templateUrl: 'src/page/album/album.html',
            controller: 'AlbumCtrl'
        })
        .otherwise({redirectTo: '/'});
}]);
