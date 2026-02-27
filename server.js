require("dotenv").config();

const connectDB = require("./config/db");
let app = require("./config/express");
let http = require("http");

// connect to MongoDB
connectDB().catch(console.dir);

// create server
var server = http.createServer(app);

// listen on port 3000
server.listen(3000);

server.on("listening", function () {
  console.log("Server running at http://localhost:3000/");
});