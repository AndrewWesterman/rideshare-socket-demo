var username = '';

var main = function(){
    "use strict";

    var socket = io();
    var chat_room = null;

    var request = function(name){
        
    };

    function createUserHTML(name){
        var $user = $("<li>").text(name),
            $request = $("<button>").text("Chat");

        $request.click(function(){
            var room = name+"-chat";
            chat_room = room;
            console.log(username+" is joining "+room);
            socket.emit("join chat", room);
        });
        $user.append($request);

        return $user;
    }

    socket.emit("user join", {name: username});
    $("#username").text(username);

    // $.post("users", function(res){
    //     var users = res.users;
    //     console.log("Loading users for "+username);
    //     users.forEach(function(user){
    //         $("#active-users").append(createUserHTML(user));
    //     });
    // });

    $.post("rides", function(res){
        var rides = res.rides;
        rides.forEach(function(ride){
            $("#active-users").append(createUserHTML(ride.user));
        });
    });

    $("form").submit(function(){
        socket.emit("chat message", {user: username, room: chat_room, msg: $("#m").val()});
        $("#chat").append($("<div>").text(username+": "+$("#m").val()));
        $("#m").val("");
        return false;
    });

    $("#add-ride").on("click", function(){
        var ride = {user : username};
        chat_room = username+"-chat";
        console.log(username + " has created a ride");
        socket.emit("add ride", ride);
    });

    // socket.on("user join", function(user){
    //     $("#active-users").append(createUserHTML(user.name));
    // });

    socket.on("add ride", function(ride){
        console.log(ride.user+" has created a ride");
        $("#active-users").append(createUserHTML(ride.user));
    });

    socket.on("chat message", function(msg){
        $("#chat").append($("<div>").text(msg.user+": "+msg.msg));
    });

};



username = prompt("Username", username);

$(document).ready(function(){
    if (username === ""){
        username = prompt("Username", username);
    }    
    main();
});