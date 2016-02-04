var app = angular.module('facebook-img', [
  'ngRoute',
  'ngFacebook'
]);

app.config(function($facebookProvider) {
  $facebookProvider
  .setAppId('1674739856099736')
  .setPermissions("user_photos");
});

app.run(function($rootScope) {
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
});
