app.factory('UserService', [
    '$rootScope',
    '$facebook',
    '$q',
    '$location',
    function($rootScope, $facebook, $q, $location) {
        return ({
            me: function() {
                var q = $q(function(resolve, reject) {
                    $facebook.api('/me')
                        .then(function(res) {
                            $rootScope.user = res;
                            resolve(res);
                        })
                        .catch(reject);
                });
                return (q);
            },
            login: function() {
                return ($facebook.login());
            },
            logout: function() {
                $rootScope.user = null;
                $facebook.logout()
                    .then(function(res) {
                        $location.path('/');
                    })
                    .catch(function(err) {
                        $location.path('/');
                    });
            },
            checkErrorToken: function(err) {
                if (err.code === 2500 ||
                    err.code === 104) {
                    $location.path("/");
                    return (true);
                }
                else {
                    return (false);
                }
            }
        });
    }
]);
