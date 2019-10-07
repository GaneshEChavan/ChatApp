chatApp.controller('loginControl', function ($scope, loginService) {
    console.log("login service called");
    $scope.login = function () {
        let regxEmail = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/g
        let result = regxEmail.test($scope.emailId);
        
        if (result === true) {
            let loginData = {
                "emailId": $scope.emailId,
                "password": $scope.password
            }
            loginService.loginServiceUser(loginData, $scope);
        } else {
            alert("email-id does not exists")
            console.log("Is not email-id");
        }
    }
})