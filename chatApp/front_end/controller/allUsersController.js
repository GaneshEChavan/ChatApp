chatApp.controller('chatAppControl', function ($scope, chatAppService, SocketService, $location) {
    console.log("Chat controller called");
    $scope.getAllUsers = function ($scope) {
        console.log("---->4", $scope);

        chatAppService.allUsers($scope);
    }
    $scope.getAllUsers($scope);
    console.log("controller---->9", $scope);
    var senderId = localStorage.getItem('id');
    var senderName = localStorage.getItem('name')
    $scope.receiverPerson = function (receiver) {
        console.log("controller---->13", $scope);
        console.log("controller---->14", receiver);
        $scope.receiverId = receiver._id
        localStorage.setItem('receiverId', receiver._id)
        localStorage.setItem('receiverName', receiver.firstName)
        let recver = {
            senderId: senderId,
            receiverId: receiver._id
        }
        chatAppService.recvrMsg(recver, $scope)
    }

    $scope.saveMsg = function () {
        let receiverId = localStorage.getItem('receiverId')
        let receiverName = localStorage.getItem('receiverName')
        var senderId = localStorage.getItem('id');
        var senderName = localStorage.getItem('name')
 
        let message = {
            senderId: senderId,
            senderName: senderName,
            receiverId: receiverId,
            receiverName: receiverName,
            messages : $scope.messages
        }
      SocketService.emit("sendMessage", message)
    }

    $scope.clearTextArea = function(){
        $scope.messages = ''
    }

    SocketService.on("messages", function(data){
        console.log("in alluserController--->41",data);
        $scope.chats.push(data);
    })
})