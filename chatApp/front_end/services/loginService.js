// require("dotenv").config({ path:__dirname+'../../backend/.env'})s

chatApp.service('loginService',function($http,$location,SocketService){
    this.loginServiceUser = function(loginData , $scope){
        console.log("--->3",$scope);
        // console.log(process.env.LOGINHOST);
        
        $http({
            method:"POST",
            url : " http://localhost:4000/login",
            data:loginData
        }).then(function(res){
            console.log('responce is', res);
            if(res.data.bcryptStatus === false){
                alert('email Id or Password is invalid');
                console.log('Log in Failed');
                console.log(res);
            }else{
                alert("Log in successful")
                console.log("Log in Successful");
                // $scope.currUser = res.data.data._id
                localStorage.setItem('Token', res.data.token);
                localStorage.setItem('id',res.data.data._id);
                localStorage.setItem('name',res.data.data.firstName);
                $location.path('/allUsers/'+ res.data.token)
                // console.log("currId--->",$scope.currUser)

            }
            
        }).catch(function(error){
            $scope.login(function(){
                alert('log in failed');
            })
            console.log('log in Failed :',error)
        });
    }
})