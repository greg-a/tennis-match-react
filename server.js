require("dotenv").config();
var express = require("express");
var session = require('express-session');
var app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);

var db = require("./models");


var PORT = process.env.PORT || 3001;

// socket io initialization for chat
io.on('connection', (socket) => {
  console.log("user connected");

  socket.on("message", (data) => {
    console.log("Message received: ", data);
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
