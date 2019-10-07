// require("dotenv").config({ path: __dirname + '../../backend/.env' })

chatApp.service('resetPasswordService', function ($http, $location) {
    this.resetPasswordServiceUser = function (password, $scope) {
   var token = localStorage.getItem('token');
   console.log(token);
        $http({
            method: 'POST',
            url:" http://localhost:4000/reset",
            headers:{
                token: token
            },
            data: password
        }).then(function (res) {
            if (res) {
                alert("Password Reset Successfully !")
                console.log("responce is --->13", res);
            } else {
                alert("Password not set try again !")
                console.log("responce is --->16", res);
                $location.path('/#/login');
            }
        }).catch(function (err) {
            console.log("Error occured..", err);
            alert("Something went Wrong !")
        })
    }
})