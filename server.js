var express = require("express"),
    http = require("http"),
    app = express(),
    server = http.createServer(app),
    io = require("socket.io")(server),
    rides = [],
    users = [];


server.listen(3000, function(){
    console.log("Server listening on http://localhost:3000");
});

app.use(express.static(__dirname + "/client"));

app.get("/", function(req, res){
    res.sendFile("index.html");
});

app.get("/chat/:user", function(req,res){
    res.sendFile("chat.html");
});

app.post("/users", function(req, res){
    res.json({users: users});
});

app.post("/rides", function(req, res){
    //replace with actual DB call
    res.json({rides: rides});
});

io.on("connection", function(socket){

    console.log("user has connected");
    socket.on("disconnect", function(){
        console.log('user disconnected');
    });

    socket.on("chat message", function(msg){
        var room = msg.room;
        socket.broadcast.to(room).emit("private message", {

        });
    });

    socket.on("user join", function(user){
        users.push(user);
        socket.broadcast.emit("user join", user);
    });

    socket.on("join chat", function(room){
        socket.join(room); 
        console.log("User has joined "+room);      
    });

    socket.on("add ride", function(ride){

        //Add ride to database
        //ride should have a room name associated with it.
        rides.push(ride);

        socket.broadcast.emit("add ride", ride);

    });
});