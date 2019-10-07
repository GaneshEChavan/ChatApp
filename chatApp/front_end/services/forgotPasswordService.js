// require("dotenv").config({ path:__dirname+'../../backend/.env'})
// console.log(process.env.FORGETHOST);

chatApp.service('forgotPasswordService',function($http,$location){
    this.forgotPasswordServiceUser= function(email,$scope){
        console.log("--->3",$scope);

        $http({
            method:"POST",
            url:"http://localhost:4000/forgotPassword",
            data:email
        }).then(function(res){
            if(res.data.message !== 'Email not found...!'){
            alert("check email for varification")
            // console.log("responce is --->15", res)
            // console.log("responce is --->16", res.data.token)
            localStorage.setItem('token',res.data.token)
            
            }else{
            alert("Email is not registered")
            console.log("Email id not found",res);
            }

        }).catch(function(err){
            alert("Email id not found")
            console.log("Check Email id is correct")
        })
    }
})