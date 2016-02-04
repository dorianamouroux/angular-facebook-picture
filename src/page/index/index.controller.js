app.controller('IndexCtrl', [
    '$rootScope',
    '$scope',
    '$facebook',
    '$location',
    'UserService',
    function($rootScope, $scope, $facebook, $location, UserService) {

        $scope.loading = false;

        if ($rootScope.user)
            $location.path('/home');

        $scope.login = function() {
            $scope.loading = true;

            UserService.login()
                .then(function(data) {
                    UserService.me();
                    $location.path("/home");
                })
                .catch(function(err) {
                    $scope.loading = false;
                    ToastService("There is an error, check console");
                    console.log(err);
                });

        };

    }
]);
