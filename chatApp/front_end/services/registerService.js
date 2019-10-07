// require("dotenv").config({ path:__dirname+'../../backend/.env'})

chatApp.service('registerService', function ($http, $location) {
    this.registerServicesUser = function (registerData, $scope) {
        $http({
            method: 'POST',
            url: " http://localhost:4000/register",
            data: registerData
        }).then(function(res) {
            console.log("response in register server---", res);

            if (res.data.content == false) {
                alert('Registration failed ,Try again with valid information');
                console.log('Registration Failed', res);
                // $scope.register=function(){
                //     alert('email already exist');
                // }
            } else {
                alert('registration Successful..!');
                console.log('Registration done Successfully');
                //console.log('response date :'+JSON.stringify(response));

                // $scope.register=function(){
                //     alert('registartion done successfully');
                // }
                $location.path('/#/login');
            }

        }).catch(function(error) {
            // $scope.register=()=>{
            //     alert('registration failed');
            // }
            alert("Give proper email id and mobile number")
            console.log('registration failed :', error)
        });
    }
});