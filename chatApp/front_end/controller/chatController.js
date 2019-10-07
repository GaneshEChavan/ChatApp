chatApp.controller('SocketService',function($scope, chatSocket){
    $scope.message = [];
    
    chatSocket.on
})

// app.controller("chatController", function ($scope, SocketService, $location, chatService) {
//     console.log("chat controller called...");

//     $scope.allMessage = '';
//     $scope.getallMessages = [];

//     $scope._id = localStorage.getItem('_id');
//     $scope.firstname = localStorage.getItem('firstname');
//     $scope.emailid = localStorage.getItem('emailid');
//     var token = $scope.token = localStorage.getItem('token')
//     console.log(" token ======= ", token);


//     $scope.allUser = function () {
//         // console.log("get all users token inside " + token);
//         chatService.allUser($scope);
//         // chatServices.
//     }
//     $scope.allUser();

//     //select user from list
//     $scope.person = function (receiver) {
//         console.log("user--> ", receiver, "emailid of sender", $scope.emailid);

//         $scope.getallMessages = '';

//         localStorage.setItem('receiverfirstname', receiver.firstname);
//         localStorage.setItem('receiverid', receiver._id);

//         $scope.receiverName = localStorage.getItem('receiverfirstname');
//         $scope.getReceiverMessage();
//     }

//     //get all message
//     $scope.getReceiverMessage = function () {
//         console.log(" get receiver message called");
//         chatService.getReceiverMessage($scope, token);
//     }

//     //sending new message
//     try {
//         $scope.send = function () {
//             var senderId = localStorage.getItem('_id');
//             var senderName = localStorage.getItem('firstname');
//             var receiverId = localStorage.getItem('receiverid')
//             var receiverName = localStorage.getItem('receiverfirstname');
//             var msg = {
//                 'senderid': senderId,
//                 'sendername': senderName,
//                 'receiverid': receiverId,
//                 'receivername': receiverName,
//                 'message': $scope.message
//             };

//             console.log("message display with details--> ", msg)
//             SocketService.emit('new message', msg);
//             $scope.message = '';
//             // alert("Message send successfully...");
//         }
//     }
//     catch (err) {
//         console.log("Error in sending message");
//     }

//     try {
//         SocketService.on($scope.firstname, (message) => {
//             console.log(" New Message ", message);
//             if (localStorage.getItem('_id') == message.senderid || localStorage.getItem('receiverid') == message.receiverid || localStorage.getItem('firstname') == message.sendername || localStorage.getItem('receiverfirstname') == message.receivername) {
//                 if ($scope.getallMessages === undefined) {
//                     $scope.getallMessages = message;//assighning message to variable
//                 }
//                 else {
//                     $scope.getallMessages.push(message);
//                 }
//             }
//         })
//     }
//     catch (err) {
//         console.log("Error in displaying messages")
//     }

//     try {
//         $scope.logout = function () {
//             localStorage.clear();
//             $location.path('/login')
//         }
//     } catch (err) {
//         console.log("error in logging out")
//     }
// })