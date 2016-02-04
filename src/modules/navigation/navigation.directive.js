app.directive('topNavigation', [
    '$rootScope',
    '$location',
    'UserService',
    '$facebook',
    function($rootScope, $location, UserService, $facebook) {

        $rootScope.logout = function() {
            UserService.logout();
        };

        if (!$rootScope.user)
            UserService.me()
            .catch(function(e) {
                if (!UserService.checkErrorToken(e))
                    ToastService("There is an error, check console");
            });
        return {
            restrict: 'AE',
            templateUrl: 'src/modules/navigation/navigation.html'
        };
    }
]);
