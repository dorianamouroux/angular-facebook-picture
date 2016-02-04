app.factory('ToastService', function() {
    return (function(message, timer) {
        timer = timer ? timer : 4000;
        Materialize.toast(message, timer);
    })
});
