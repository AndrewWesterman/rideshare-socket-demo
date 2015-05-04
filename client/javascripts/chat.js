var username = '';

var main = function(){
    "use strict";

    var socket = io();

    $.post("user", function(res){
        console.log(res);
        $("#username").text(username);
    });
};

$(document).ready(function(){
    username = prompt("Username", username);
    main();
});