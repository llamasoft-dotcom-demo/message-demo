function notificationFactory() {
    var factory = {};
    var toasterTypes = ['success', 'warning', 'error', 'info'];
    window.toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    factory.getSuccessNotification = function (text) {
        window.toastr.success(text);
    };
    factory.getErrorNotification = function (text) {
        window.toastr.error(text);
    };
    factory.getRandomNotification = function (text) {
        window.toastr[_.sample(toasterTypes)](text);
    };
    factory.removeNotifications = function() {
        window.toastr.clear();
    };
    return factory;
}