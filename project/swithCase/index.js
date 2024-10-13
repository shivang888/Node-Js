const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {


  const log = `New Request Recived : ${Date.now()} : ${req.url} \n`;

  fs.appendFile("log.txt", log, (err, data) => {

    switch (req.url) {
      case "/":
        res.end("Home Page Is Ready To Load...");

        break;
      case "/about":
        res.end("Namaste About Page Is Ready To Load...");

        break;

      default:
        res.end("404 Error");
    }
  });
});

myServer.listen(8000, () => {
  console.log("Server Started");
});
  