chatApp.controller('forgotPasswordControl', function ($scope, forgotPasswordService) {
    console.log("forgot password service called", $scope)
    $scope.forgotPassword = function () {
        console.log("----------->3", $scope.emailId);
        let email = {
            "emailId": $scope.emailId
        }
        forgotPasswordService.forgotPasswordServiceUser(email, $scope)
    }
})