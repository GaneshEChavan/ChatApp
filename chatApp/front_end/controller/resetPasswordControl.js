chatApp.controller('resetPasswordControl',function($scope,resetPasswordService){
    console.log("resetControl--->2",$scope);
    
    $scope.resetPassword = function(){
        let password = {
            "password" : $scope.password
        }        
        resetPasswordService.resetPasswordServiceUser(password,$scope)
    }
})