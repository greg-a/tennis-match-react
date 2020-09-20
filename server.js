require("dotenv").config();
var express = require("express");
var session = require('express-session');
var app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const path = require("path");
var db = require("./models");


var PORT = process.env.PORT || 3001;

// socket io initialization for chat
io.on('connection', (socket) => {

  //user joins a room
  socket.on("joinRoom", ({ username, room, userId }) => {
    const user = { socketId: socket.id, username: username, room: room, userid: userId };

    io.in(parseInt(userId)).emit("output", "update");
    socket.join(user.room);

    console.log(user.username + " has joined " + user.room);

    //updates number of users connected to room when someone joins
    if (io.sockets.adapter.rooms[room]) {
      io.in(user.room).emit("active", io.sockets.adapter.rooms[room].length);
    }

    //updates number of users connected to room when someone leaves
    socket.on("disconnect", () => {
      if (io.sockets.adapter.rooms[room]) {
        io.in(user.room).emit("active", io.sockets.adapter.rooms[room].length);
      }
    })
  });

  socket.on("notifyMe", userid => {
    console.log(userid)
    const user = { socketId: socket.id, room: userid, userid: userid };
    socket.join(user.room);
    console.log(user.userid + " is listening for notifications.")
  })

  //Receives a new message
  socket.on("input", data => {
    const user = { socketId: socket.id, username: data.user, room: data.room, recipientid: data.recipientId };

    //emits new message to specific room
    io.in(user.room).in(user.recipientid).emit("output", data);
    console.log("New message: " + JSON.stringify(data))
  });

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })

});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

app.use(session({
  secret: "tennis123",
  resave: true,
  saveUninitialized: true
}));

// Routes
require("./routes/apiRoutes")(app);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
// { force: true }
db.sequelize.sync().then(function () {
  server.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
