var username = '';

var main = function(){
    "use strict";

    var socket = io();
    var request = function(name, socket){
    var room = name+"-chat";
        socket.emit("join chat", room);

    };

    function createUserHTML(name, socket){
        var $user = $("<li>").text(name),
            $request = $("<button>").text("Chat");

        $request.click(request(name));
        $user.append($request);

        return $request;
    }

    socket.emit("user join", {name: username});
    $("#username").text(username);

    $.post("users", function(res){
        var users = res.users;
        console.log("Loading users for "+username);
        users.forEach(function(user){
            $("#active-users").append(createUserHTML(user, socket));
        });
    });

    $("form").submit(function(){
        socket.emit("chat message", $("#m").val());
        $("#m").val("");
        return false;
    });

    socket.on("user join", function(user){
        $("#active-users").append(createUserHTML(user.name, socket));
    });
};



username = prompt("Username", username);

$(document).ready(function(){
    if (username === ""){
        username = prompt("Username", username);
    }    
    main();
});