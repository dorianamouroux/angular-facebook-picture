app.filter('facebookUrl', function() {
    return (function(input) {
        return ('https://graph.facebook.com/' + input + '/picture?type=large');
    });
})
