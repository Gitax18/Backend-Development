const http = require("http");
const fs = require("fs");
const readline = require("readline");

// this will create a middleware to convert stream format in input and output.
const rl = readline.createInterface({
  input: fs.createReadStream("index.html"),
  output: process.stdout,
  terminal: false,
});

// to store output stream as array of strings
const arr = [];

// reading stream of data from index.html
rl.on("line", (line) => arr.push(line));

// function to handle request from client
function reqHandler(req, res) {
  console.log(req.method, req.headers.host + req.url);
  res.setHeader("Content-Type", "text/html");
  arr.forEach((line) => res.write(line));
  res.end();
}

// server
const server = http.createServer(reqHandler);

// where to listen server: localhost:3030
server.listen(3030);

//itna hi hai.
