// The most important part of application 
// Notification factory is used to dependency injection to be injected into any other component of application such as MessageController.
// Factory itself is responsible for setting constructor options for toastr messages and create/remove messages.
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