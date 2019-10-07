var chatApp = angular.module('chatApp',['ui.router','btford.socket-io']);

chatApp.config(function($stateProvider, $urlRouterProvider){
    $stateProvider

    .state('register',{
        url:'/register',
        templateUrl:"templates/registration_page.html",
        controller:'registerControl'
    })

    .state('login',{
        url:'/login',
        templateUrl:'templates/login_page.html',
        controller:'loginControl'
    })
    
    .state('forgotPassword',{
        url:'/forgotPassword',
        templateUrl:'templates/forgot_page.html',
        controller : 'forgotPasswordControl'
    })

    .state('resetPassword',{
        url:'/reset/:token',
        templateUrl:'templates/reset_page.html',
        controller:'resetPasswordControl'
    })

    .state('allUser',{
       url:'/allUsers',
       templateUrl:'templates/chat_space.html',
       controller:'chatAppControl'
    })

    $urlRouterProvider.otherwise('/login');
})

chatApp.service('SocketService', ['socketFactory', function(socketFactory) {
    return socketFactory({
    ioSocket: io.connect('http://localhost:4000')
    });
    }]);