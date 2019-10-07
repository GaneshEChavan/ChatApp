chatApp.service('chatAppService', function ($http, $location) {
    this.allUsers = function ($scope) {
        var token = localStorage.getItem('Token');
        var user = localStorage.getItem('id')
        console.log("----->5",user);
        
        $http({
            method: 'POST',
            url: "http://localhost:4000/allUsers",
            headers: {
                token: token
            }
        }).then(function (res) {
            console.log("Responce in service--->11", res)
            console.log("Responce in service--->12", $scope)
            var respo = res.data.data
            console.log("----->15",respo);
            
            for(var i=0;i<res.data.data.length;i++){
                if(respo[i]._id === user){
              console.log(respo[i]._id)
              respo.splice(i,1)
              $scope.alluser = respo;
                }
            }
        }).catch(function (err) {
            console.log("Error in service--->15", err)
        })
    }
    this.recvrMsg = function (sndRcvInfo,$scope) {
        $http({
            method: "POST",
            url: "http://localhost:4000/getMsg",
            data: sndRcvInfo
        }).then(function (res) {
            $scope.currUser = localStorage.getItem('id')
            console.log("service responce --->24", $scope,res)
            console.log(res.data.data[0].length);
            var array = [];
            for(var i=0;i<res.data.data.length;i++){
                for(var j=0;j<res.data.data[i].length;j++){
                  var data = res.data.data[i]
                    array.push(data[j])
                    sort(array)
                }
            }
            function sort(ar){
                var arr = ar
                for (let i = 1; i < arr.length; i++) {
                    for (let j = 0; j < i; j++) {
                      if (arr[i].createdAt < arr[j].createdAt) {
                        let temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                      }
                    }
                  }
                  $scope.chats = arr
            }
           console.log("Sorted",array);
           console.log("scope chats",$scope.chats);
        }).catch(function (err) {
            console.log("Error Occured---->27",err);

        })
    }
})